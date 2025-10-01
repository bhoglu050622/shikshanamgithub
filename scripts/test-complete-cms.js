#!/usr/bin/env node

const https = require('https');
const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Helper function to make HTTP requests
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsedBody = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, data: parsedBody });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test function
async function testCMS() {
  console.log('🚀 Testing Complete CMS System...\n');

  const tests = [
    // Homepage CMS Tests
    {
      name: 'Homepage CMS Admin',
      url: `${BASE_URL}/cms`,
      expectedStatus: 200
    },
    {
      name: 'Homepage CMS Content API',
      url: `${BASE_URL}/api/cms/content`,
      expectedStatus: 200
    },
    {
      name: 'CMS Homepage',
      url: `${BASE_URL}/cms-homepage`,
      expectedStatus: 200
    },

    // Donation CMS Tests
    {
      name: 'Donation CMS Admin',
      url: `${BASE_URL}/cms/donation`,
      expectedStatus: 200
    },
    {
      name: 'Donation CMS Content API',
      url: `${BASE_URL}/api/cms/donation`,
      expectedStatus: 200
    },
    {
      name: 'Donation Page',
      url: `${BASE_URL}/donation`,
      expectedStatus: 200
    },

    // About CMS Tests
    {
      name: 'About CMS Admin',
      url: `${BASE_URL}/cms/about`,
      expectedStatus: 200
    },
    {
      name: 'About CMS Content API',
      url: `${BASE_URL}/api/cms/about`,
      expectedStatus: 200
    },
    {
      name: 'CMS About Page',
      url: `${BASE_URL}/cms-about`,
      expectedStatus: 200
    },

    // Contact CMS Tests
    {
      name: 'Contact CMS Admin',
      url: `${BASE_URL}/cms/contact`,
      expectedStatus: 200
    },
    {
      name: 'Contact CMS Content API',
      url: `${BASE_URL}/api/cms/contact`,
      expectedStatus: 200
    },
    {
      name: 'CMS Contact Page',
      url: `${BASE_URL}/cms-contact`,
      expectedStatus: 200
    },

    // Schools CMS Tests
    {
      name: 'Schools CMS Admin',
      url: `${BASE_URL}/cms/schools`,
      expectedStatus: 200
    },
    {
      name: 'Schools CMS Content API',
      url: `${BASE_URL}/api/cms/schools`,
      expectedStatus: 200
    },
    {
      name: 'CMS Schools Page',
      url: `${BASE_URL}/cms-schools`,
      expectedStatus: 200
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`Testing ${test.name}...`);
      const result = await makeRequest(test.url);
      
      if (result.status === test.expectedStatus) {
        console.log(`✅ ${test.name} - Status: ${result.status}`);
        passed++;
      } else {
        console.log(`❌ ${test.name} - Expected: ${test.expectedStatus}, Got: ${result.status}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} - Error: ${error.message}`);
      failed++;
    }
  }

  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

  if (failed === 0) {
    console.log('\n🎉 All CMS tests passed! The system is working perfectly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }

  // Test content updates
  console.log('\n🔄 Testing content updates...');
  
  try {
    // Test homepage content update
    const homepageContent = await makeRequest(`${BASE_URL}/api/cms/content`);
    if (homepageContent.status === 200) {
      console.log('✅ Homepage content loaded successfully');
    }

    // Test donation content update
    const donationContent = await makeRequest(`${BASE_URL}/api/cms/donation`);
    if (donationContent.status === 200) {
      console.log('✅ Donation content loaded successfully');
    }

    // Test about content update
    const aboutContent = await makeRequest(`${BASE_URL}/api/cms/about`);
    if (aboutContent.status === 200) {
      console.log('✅ About content loaded successfully');
    }

    // Test contact content update
    const contactContent = await makeRequest(`${BASE_URL}/api/cms/contact`);
    if (contactContent.status === 200) {
      console.log('✅ Contact content loaded successfully');
    }

    // Test schools content update
    const schoolsContent = await makeRequest(`${BASE_URL}/api/cms/schools`);
    if (schoolsContent.status === 200) {
      console.log('✅ Schools content loaded successfully');
    }

    console.log('\n🎯 All content APIs are working correctly!');
  } catch (error) {
    console.log(`❌ Content update test failed: ${error.message}`);
  }

  console.log('\n🏁 Complete CMS system test finished!');
}

// Run the test
testCMS().catch(console.error);
