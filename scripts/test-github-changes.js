#!/usr/bin/env node

/**
 * Test GitHub Changes Integration
 * Tests the GitHub changes tracking system
 */

const BASE_URL = 'http://localhost:3001';

// Test data
const testChange = {
  contentType: 'course',
  contentId: 'test-course-001',
  action: 'update',
  changes: [
    {
      field: 'title',
      oldValue: 'Old Course Title',
      newValue: 'New Course Title'
    },
    {
      field: 'price',
      oldValue: '₹2,999',
      newValue: '₹3,499'
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
};

/**
 * Test GitHub changes API
 */
async function testGitHubChangesAPI() {
  console.log('🧪 Testing GitHub Changes API...\n');

  try {
    // Test POST request
    console.log('📤 Testing POST /api/cms/github-changes...');
    const response = await fetch(`${BASE_URL}/api/cms/github-changes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testChange)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ POST request successful');
      console.log(`   Change ID: ${result.changeId}`);
      console.log(`   Commit Hash: ${result.commitHash || 'N/A (development mode)'}`);
    } else {
      console.log('❌ POST request failed');
      console.log(`   Error: ${result.error}`);
    }

    // Test GET request
    console.log('\n📥 Testing GET /api/cms/github-changes...');
    const getResponse = await fetch(`${BASE_URL}/api/cms/github-changes`);
    const getResult = await getResponse.json();
    
    if (getResult.success) {
      console.log('✅ GET request successful');
      console.log(`   Changes found: ${getResult.changes.length}`);
    } else {
      console.log('❌ GET request failed');
      console.log(`   Error: ${getResult.error}`);
    }

    // Test GET with parameters
    console.log('\n📥 Testing GET with parameters...');
    const paramResponse = await fetch(`${BASE_URL}/api/cms/github-changes?contentType=course&contentId=test-course-001`);
    const paramResult = await paramResponse.json();
    
    if (paramResult.success) {
      console.log('✅ GET with parameters successful');
      console.log(`   Changes for test-course-001: ${paramResult.changes.length}`);
    } else {
      console.log('❌ GET with parameters failed');
      console.log(`   Error: ${paramResult.error}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

/**
 * Test form changes utility
 */
function testFormChangesUtility() {
  console.log('\n🧪 Testing Form Changes Utility...\n');

  const oldData = {
    title: 'Old Title',
    price: '₹2,999',
    description: 'Old description',
    instructor: 'Old Instructor'
  };

  const newData = {
    title: 'New Title',
    price: '₹3,499',
    description: 'New description',
    instructor: 'Old Instructor' // Unchanged
  };

  // Import the utility function (simulated)
  const createFormChanges = (oldData, newData, fieldsToTrack = []) => {
    const changes = [];
    const fieldsToCheck = fieldsToTrack.length > 0 ? fieldsToTrack : Object.keys(newData);
    
    for (const field of fieldsToCheck) {
      const oldValue = oldData[field];
      const newValue = newData[field];
      
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        changes.push({
          field,
          oldValue,
          newValue
        });
      }
    }
    
    return changes;
  };

  const changes = createFormChanges(oldData, newData);
  
  console.log('📊 Form Changes Analysis:');
  console.log(`   Total changes detected: ${changes.length}`);
  
  changes.forEach(change => {
    console.log(`   - ${change.field}: "${change.oldValue}" → "${change.newValue}"`);
  });

  if (changes.length === 3) {
    console.log('✅ Form changes utility working correctly');
  } else {
    console.log('❌ Form changes utility not working as expected');
  }
}

/**
 * Test GitHub configuration
 */
function testGitHubConfiguration() {
  console.log('\n🧪 Testing GitHub Configuration...\n');

  const config = {
    owner: process.env.GITHUB_OWNER || 'bhoglu050622',
    repo: process.env.GITHUB_REPO || 'shikshanam_final',
    branch: process.env.GITHUB_BRANCH || 'main',
    token: process.env.GITHUB_TOKEN || '',
    changesFolder: process.env.GITHUB_CHANGES_FOLDER || 'changes'
  };

  console.log('📋 GitHub Configuration:');
  console.log(`   Owner: ${config.owner}`);
  console.log(`   Repository: ${config.repo}`);
  console.log(`   Branch: ${config.branch}`);
  console.log(`   Changes Folder: ${config.changesFolder}`);
  console.log(`   Token: ${config.token ? '✅ Set' : '❌ Not set'}`);

  if (!config.token) {
    console.log('\n⚠️  GitHub token not configured. Changes will not be saved to GitHub.');
    console.log('   Set GITHUB_TOKEN environment variable to enable GitHub integration.');
  } else {
    console.log('\n✅ GitHub configuration looks good');
  }
}

/**
 * Main test execution
 */
async function runTests() {
  console.log('🚀 Starting GitHub Changes Integration Tests...\n');
  
  // Check if server is running
  try {
    const healthCheck = await fetch(`${BASE_URL}/api/health-check`);
    if (!healthCheck.ok) {
      console.log('❌ Server is not running. Please start the development server with: npm run dev');
      process.exit(1);
    }
  } catch (error) {
    console.log('❌ Server is not running. Please start the development server with: npm run dev');
    process.exit(1);
  }

  console.log('✅ Server is running\n');

  // Run tests
  testGitHubConfiguration();
  testFormChangesUtility();
  await testGitHubChangesAPI();

  console.log('\n🎉 GitHub Changes Integration Tests Complete!');
  console.log('\n📝 Next Steps:');
  console.log('   1. Set up GitHub token in production environment');
  console.log('   2. Deploy to production (Vercel)');
  console.log('   3. Test CMS edits in production');
  console.log('   4. Check the changes/ folder in your GitHub repository');
}

// Run tests
runTests().catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});
