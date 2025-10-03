import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
require('dotenv').config();

const GITHUB_OWNER = process.env.GITHUB_OWNER!;
const GITHUB_REPO = process.env.GITHUB_REPO!;

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  owner: GITHUB_OWNER,
  repo: GITHUB_REPO,
  baseUrl: 'https://api.github.com',
});
const BASE_BRANCH = 'main';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'save') {
      return await handleSave(body);
    }

    if (action === 'publish') {
      return await handlePublish(body);
    }

    return NextResponse.json({ success: false, error: 'Invalid action.' }, { status: 400 });

  } catch (error: any) {
    console.error('Error in Git API:', error);
    return NextResponse.json({ success: false, error: error.message || 'An unknown error occurred.' }, { status: 500 });
  }
}

async function handleSave(body: { file: string; content: object; commitMessage: string; }) {
  const { file, content, commitMessage } = body;

  if (!file || !content || !commitMessage) {
    return NextResponse.json({ success: false, error: 'File, content, and commitMessage are required.' }, { status: 400 });
  }

  // 1. Get the latest commit SHA of the base branch
  const { data: baseBranch } = await octokit.repos.getBranch({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    branch: BASE_BRANCH,
  });
  const baseSha = baseBranch.commit.sha;

  const newBranchName = `cms/update-${file.replace('.json', '')}-${Date.now()}`;
  const contentString = JSON.stringify(content, null, 2);

  // 2. Create a new branch from the base SHA
  await octokit.git.createRef({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    ref: `refs/heads/${newBranchName}`,
    sha: baseSha,
  });

  // 3. Get the current tree
  const { data: commitData } = await octokit.git.getCommit({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    commit_sha: baseSha,
  });
  const treeSha = commitData.tree.sha;

  // 4. Create a new blob with the file content
  const { data: blobData } = await octokit.git.createBlob({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    content: contentString,
    encoding: 'utf-8',
  });

  // 5. Create a new tree with the new file
  const { data: newTree } = await octokit.git.createTree({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    base_tree: treeSha,
    tree: [
      {
        path: `data/${file}`,
        mode: '100644',
        type: 'blob',
        sha: blobData.sha,
      },
    ],
  });

  // 6. Create a new commit
  const { data: newCommit } = await octokit.git.createCommit({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    message: commitMessage,
    tree: newTree.sha,
    parents: [baseSha],
  });

  // 7. Update the new branch to point to the new commit
  await octokit.git.updateRef({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    ref: `heads/${newBranchName}`,
    sha: newCommit.sha,
  });

  return NextResponse.json({
    success: true,
    message: `Successfully saved changes to new branch: ${newBranchName}`,
    branch: newBranchName,
  });
}

async function handlePublish(body: { branch: string; }) {
  const { branch } = body;

  if (!branch || !branch.startsWith('cms/')) {
    return NextResponse.json({ success: false, error: 'A valid branch name is required.' }, { status: 400 });
  }

  // 1. Create a Pull Request
  const { data: pullRequest } = await octokit.pulls.create({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    title: `CMS Publish: ${branch}`,
    head: branch,
    base: BASE_BRANCH,
    body: 'Automated publish from the CMS.',
  });

  // 2. Merge the Pull Request
  await octokit.pulls.merge({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    pull_number: pullRequest.number,
    commit_title: `Merge CMS changes from ${branch}`,
  });

  // 3. Delete the branch
  await octokit.git.deleteRef({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    ref: `heads/${branch}`,
  });

  return NextResponse.json({
    success: true,
    message: `Successfully published changes from branch: ${branch}`,
  });
}