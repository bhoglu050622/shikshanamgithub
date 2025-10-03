require('dotenv').config();
const { Octokit } = require('@octokit/rest');

const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  owner: GITHUB_OWNER,
  repo: GITHUB_REPO,
  baseUrl: 'https://api.github.com',
});
const BASE_BRANCH = 'main';

async function createBranch() {
  try {
    // 1. Get the latest commit SHA of the base branch
    console.log(`Fetching base branch: ${BASE_BRANCH}...`);
    const { data: baseBranch } = await octokit.repos.getBranch({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      branch: BASE_BRANCH,
    });
    const baseSha = baseBranch.commit.sha;
    console.log(`Base branch SHA: ${baseSha}`);

    // 2. Create a new branch
    const newBranchName = `cms/test-branch-${Date.now()}`;
    console.log(`Creating new branch: ${newBranchName}...`);
    await octokit.git.createRef({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      ref: `refs/heads/${newBranchName}`,
      sha: baseSha,
    });

    console.log(`Successfully created branch: ${newBranchName}`);

  } catch (error) {
    console.error('Error creating branch:', error.status, error.response?.data || error.message);
  }
}

createBranch();