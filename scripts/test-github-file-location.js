#!/usr/bin/env node

/**
 * Test GitHub File Location
 * Shows exactly where changes will be saved in your GitHub repository
 */

const BASE_URL = 'http://localhost:3001';

// Your GitHub repository information
const GITHUB_INFO = {
  owner: 'bhoglu050622',
  repo: 'shikshanam_final',
  branch: 'main',
  changesFolder: 'changes'
};

/**
 * Test where files will be saved
 */
async function testGitHubFileLocation() {
  console.log('🔍 GitHub Changes File Location Test\n');

  console.log('📋 Your GitHub Repository Information:');
  console.log(`   Owner: ${GITHUB_INFO.owner}`);
  console.log(`   Repository: ${GITHUB_INFO.repo}`);
  console.log(`   Branch: ${GITHUB_INFO.branch}`);
  console.log(`   Changes Folder: ${GITHUB_INFO.changesFolder}\n`);

  console.log('📍 Where Changes Will Be Saved:');
  console.log(`   Repository URL: https://github.com/${GITHUB_INFO.owner}/${GITHUB_INFO.repo}`);
  console.log(`   Changes Folder: https://github.com/${GITHUB_INFO.owner}/${GITHUB_INFO.repo}/tree/${GITHUB_INFO.branch}/${GITHUB_INFO.changesFolder}\n`);

  console.log('📁 File Naming Convention:');
  console.log('   Format: YYYY-MM-DDTHH-mm-ss_contentType_contentId_action.json');
  console.log('   Examples:');
  console.log('   - 2024-01-15T10-30-00-000Z_course_samkhya-darshan_update.json');
  console.log('   - 2024-01-15T10-31-00-000Z_package_sanskrit-basics_create.json');
  console.log('   - 2024-01-15T10-32-00-000Z_course_yoga-darshan_delete.json\n');

  console.log('🔗 Direct Links to Check Changes:');
  console.log(`   1. Repository: https://github.com/${GITHUB_INFO.owner}/${GITHUB_INFO.repo}`);
  console.log(`   2. Changes Folder: https://github.com/${GITHUB_INFO.owner}/${GITHUB_INFO.repo}/tree/${GITHUB_INFO.branch}/${GITHUB_INFO.changesFolder}`);
  console.log(`   3. Recent Commits: https://github.com/${GITHUB_INFO.owner}/${GITHUB_INFO.repo}/commits/${GITHUB_INFO.branch}\n`);

  // Test API endpoint
  try {
    console.log('🧪 Testing API Endpoint...');
    const response = await fetch(`${BASE_URL}/api/cms/github-changes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contentType: 'course',
        contentId: 'test-location-001',
        action: 'update',
        changes: [
          {
            field: 'title',
            oldValue: 'Test Old Title',
            newValue: 'Test New Title'
          }
        ],
        editor: {
          name: 'Test Editor',
          email: 'test@shikshanam.in',
          userId: 'test-editor'
        },
        metadata: {
          userAgent: 'Test User Agent',
          sessionId: 'test-session-123'
        }
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ API Test Successful');
      console.log(`   Change ID: ${result.changeId}`);
      console.log(`   Expected File: ${GITHUB_INFO.changesFolder}/[timestamp]_course_test-location-001_update.json`);
      console.log(`   Status: ${result.commitHash ? 'Committed to GitHub' : 'Development mode (not committed)'}`);
    } else {
      console.log('❌ API Test Failed');
      console.log(`   Error: ${result.error}`);
    }
  } catch (error) {
    console.log('❌ API Test Error:', error.message);
  }

  console.log('\n📝 Next Steps:');
  console.log('   1. Set up GitHub Personal Access Token');
  console.log('   2. Add environment variables to Vercel');
  console.log('   3. Deploy to production');
  console.log('   4. Make a test edit in CMS');
  console.log('   5. Check the changes/ folder in your GitHub repository');
  console.log('   6. Verify the commit appears in your repository history');
}

// Run the test
testGitHubFileLocation().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});
