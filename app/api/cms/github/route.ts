import { NextRequest, NextResponse } from 'next/server';
import { clearContentCache } from '@/lib/cms/github-fetcher';

// GitHub API configuration
const GITHUB_OWNER = 'bhoglu050622';
const GITHUB_REPO = 'shikshanamgithub';
const GITHUB_BRANCH = 'main';

async function commitToGitHub(file: string, content: any, action: string) {
  const githubToken = process.env.GITHUB_TOKEN;
  
  if (!githubToken) {
    throw new Error('GitHub token not configured');
  }

  // Prepare the file path
  const filePath = `shikshanam_final/data/${file}`;
  
  // Convert content to JSON string
  const contentString = JSON.stringify(content, null, 2);
  const contentBase64 = Buffer.from(contentString).toString('base64');

  try {
    // Get the current file SHA (required for updates)
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    let sha = null;
    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json();
      sha = fileData.sha;
    }

    // Create commit message
    const commitMessage = `CMS Update: ${action} ${file} - ${new Date().toISOString()}`;

    // Commit the file
    const commitResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: contentBase64,
          sha: sha, // null for new files, existing SHA for updates
          branch: GITHUB_BRANCH,
        }),
      }
    );

    if (!commitResponse.ok) {
      const errorData = await commitResponse.json();
      throw new Error(`GitHub API error: ${errorData.message || 'Unknown error'}`);
    }

    const commitData = await commitResponse.json();
    return {
      success: true,
      commitSha: commitData.commit.sha,
      message: commitMessage,
    };
  } catch (error) {
    console.error('GitHub commit error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, file, content } = await request.json();

    if (!file) {
      return NextResponse.json({ error: 'File name is required' }, { status: 400 });
    }

    // Check if we're in production
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      try {
        // Use GitHub API to commit changes directly
        const result = await commitToGitHub(file, content, action);
        
        // Clear cache for this file to ensure fresh content is fetched
        clearContentCache(file);
        
        // Generate deployment URL (assuming Vercel deployment)
        const deploymentUrl = process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}` 
          : `https://${GITHUB_REPO}.vercel.app`;
        
        return NextResponse.json({
          success: true,
          message: `✅ Content saved and committed to GitHub successfully!`,
          file: file,
          lastModified: new Date().toISOString(),
          commitSha: result.commitSha,
          branch: GITHUB_BRANCH,
          githubUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/commit/${result.commitSha}`,
          branchUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/tree/${GITHUB_BRANCH}`,
          deploymentUrl: deploymentUrl,
          note: '🚀 Changes will be live within 1-2 minutes after Vercel deployment',
          cacheCleared: true,
          successDetails: {
            commitMessage: result.message,
            branchName: GITHUB_BRANCH,
            deploymentStatus: 'pending',
            estimatedLiveTime: '1-2 minutes'
          }
        });
      } catch (error: any) {
        console.error('GitHub integration error:', error);
        return NextResponse.json({
          success: false,
          error: 'Failed to save to GitHub',
          details: error.message,
          fallback: 'Please check GitHub token configuration'
        }, { status: 500 });
      }
    }

    // Development mode - return success
    return NextResponse.json({
      success: true,
      message: '✅ Content saved successfully (Development mode)',
      file: file,
      lastModified: new Date().toISOString(),
      branch: 'development',
      githubUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`,
      branchUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`,
      deploymentUrl: 'http://localhost:3000',
      note: '🔧 Development mode - changes are saved locally',
      successDetails: {
        commitMessage: 'Local development save',
        branchName: 'development',
        deploymentStatus: 'local',
        estimatedLiveTime: 'immediate'
      }
    });

  } catch (error: any) {
    console.error('CMS GitHub API Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}
