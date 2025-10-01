#!/usr/bin/env node

/**
 * Comprehensive test script for all CMS functionality
 * Run with: node scripts/test-all-cms.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Test data for donation page
const donationTestData = {
  hero: {
    title: "💝 Support Ancient Wisdom - CMS TEST",
    subtitle: "Help us preserve and share the timeless knowledge of our ancestors - UPDATED VIA CMS",
    backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop"
  },
  impact: {
    title: "🌟 Your Impact - CMS EDITED",
    subtitle: "See how your donations make a difference - UPDATED VIA CMS",
    stats: [
      {
        id: "students",
        number: "15,000+",
        label: "Students Helped - UPDATED",
        description: "Learners who have benefited from our programs - ENHANCED VIA CMS"
      }
    ]
  }
};

// Helper function to make HTTP requests
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// Test function
async function testAllCMS() {
  console.log('🧪 Testing All CMS Functionality...\n');

  const tests = [
    {
      name: 'Homepage CMS',
      url: '/cms',
      apiUrl: '/api/cms/content',
      expectedStatus: 200
    },
    {
      name: 'Donation Page',
      url: '/donation',
      apiUrl: '/api/cms/donation',
      expectedStatus: 200
    },
    {
      name: 'Donation CMS',
      url: '/cms/donation',
      apiUrl: '/api/cms/donation',
      expectedStatus: 200
    },
    {
      name: 'CMS Homepage',
      url: '/cms-homepage',
      apiUrl: '/api/cms/content',
      expectedStatus: 200
    }
  ];

  let allTestsPassed = true;

  for (const test of tests) {
    console.log(`📋 Testing ${test.name}...`);
    
    try {
      // Test page accessibility
      const pageResponse = await makeRequest(`${BASE_URL}${test.url}`);
      if (pageResponse.status === test.expectedStatus) {
        console.log(`   ✅ ${test.name} page accessible (${pageResponse.status})`);
      } else {
        console.log(`   ❌ ${test.name} page failed (${pageResponse.status})`);
        allTestsPassed = false;
      }

      // Test API endpoint
      const apiResponse = await makeRequest(`${BASE_URL}${test.apiUrl}`);
      if (apiResponse.status === 200) {
        console.log(`   ✅ ${test.name} API working (${apiResponse.status})`);
      } else {
        console.log(`   ❌ ${test.name} API failed (${apiResponse.status})`);
        allTestsPassed = false;
      }

    } catch (error) {
      console.log(`   ❌ ${test.name} error: ${error.message}`);
      allTestsPassed = false;
    }
    
    console.log('');
  }

  // Test donation page content updates
  console.log('📝 Testing Donation Page Content Updates...');
  try {
    // Update donation content
    const updateResponse = await makeRequest(
      `${BASE_URL}/api/cms/donation`,
      'PUT',
      donationTestData
    );
    
    if (updateResponse.status === 200) {
      console.log('   ✅ Donation content updated successfully');
      
      // Verify the update
      const verifyResponse = await makeRequest(`${BASE_URL}/api/cms/donation`);
      if (verifyResponse.status === 200 && verifyResponse.data.data) {
        const updatedContent = verifyResponse.data.data;
        if (updatedContent.hero.title === donationTestData.hero.title) {
          console.log('   ✅ Donation content verification passed');
        } else {
          console.log('   ❌ Donation content verification failed');
          allTestsPassed = false;
        }
      } else {
        console.log('   ❌ Failed to verify donation content');
        allTestsPassed = false;
      }
    } else {
      console.log('   ❌ Failed to update donation content');
      allTestsPassed = false;
    }
  } catch (error) {
    console.log(`   ❌ Donation content test error: ${error.message}`);
    allTestsPassed = false;
  }

  // Summary
  console.log('\n📊 Test Summary:');
  if (allTestsPassed) {
    console.log('   🎉 All CMS tests passed!');
    console.log('\n🔗 Available CMS Pages:');
    console.log('   - Homepage CMS: http://localhost:3000/cms');
    console.log('   - Donation CMS: http://localhost:3000/cms/donation');
    console.log('   - CMS Homepage: http://localhost:3000/cms-homepage');
    console.log('   - Donation Page: http://localhost:3000/donation');
    console.log('\n🔗 API Endpoints:');
    console.log('   - Homepage API: http://localhost:3000/api/cms/content');
    console.log('   - Donation API: http://localhost:3000/api/cms/donation');
  } else {
    console.log('   ❌ Some tests failed. Check the output above for details.');
  }

  return allTestsPassed;
}

// Run the test
testAllCMS().then(success => {
  process.exit(success ? 0 : 1);
});
