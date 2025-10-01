#!/usr/bin/env node

/**
 * Test CMS functionality with production URL
 * This script tests both localhost and production URLs
 */

const https = require('https');
const http = require('http');

// Configuration
const PRODUCTION_URL = 'https://shikshanam-final.vercel.app';
const LOCALHOST_URL = 'http://localhost:3000';

// Test endpoints
const ENDPOINTS = [
  '/api/cms/content',
  '/api/cms/donation',
  '/api/cms/about',
  '/api/cms/contact',
  '/api/cms/schools'
];

// Helper function to make HTTP requests
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = client.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve({
            status: res.statusCode,
            data: result,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: body,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(data);
    }
    req.end();
  });
}

// Test function
async function testEndpoint(baseUrl, endpoint) {
  try {
    const url = `${baseUrl}${endpoint}`;
    console.log(`\n🔍 Testing: ${url}`);
    
    const response = await makeRequest(url);
    
    if (response.status === 200) {
      console.log(`✅ Success: ${response.status}`);
      if (response.data.success) {
        console.log(`   📊 Data received: ${Object.keys(response.data.data || {}).length} properties`);
      } else {
        console.log(`   ⚠️  API returned success: false`);
        console.log(`   📝 Error: ${response.data.error || 'Unknown error'}`);
      }
    } else {
      console.log(`❌ Failed: ${response.status}`);
      console.log(`   📝 Response: ${JSON.stringify(response.data).substring(0, 200)}...`);
    }
  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting CMS Production Tests');
  console.log('=====================================');
  
  // Test production URLs
  console.log('\n🌐 Testing Production URLs');
  console.log('----------------------------');
  
  for (const endpoint of ENDPOINTS) {
    await testEndpoint(PRODUCTION_URL, endpoint);
  }
  
  // Test localhost URLs (if available)
  console.log('\n🏠 Testing Localhost URLs');
  console.log('-------------------------');
  
  for (const endpoint of ENDPOINTS) {
    await testEndpoint(LOCALHOST_URL, endpoint);
  }
  
  console.log('\n✨ Test completed!');
  console.log('\n📋 Summary:');
  console.log(`   Production URL: ${PRODUCTION_URL}`);
  console.log(`   Localhost URL: ${LOCALHOST_URL}`);
  console.log(`   Endpoints tested: ${ENDPOINTS.length}`);
}

// Run the tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { makeRequest, testEndpoint, runTests };
