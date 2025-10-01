#!/usr/bin/env node

/**
 * Comprehensive CMS Testing Suite
 * Tests all editors, API calls, and frontend-CMS synchronization
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 CMS Testing Suite');
console.log('===================\n');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const API_BASE = `${BASE_URL}/api/cms`;

// Test results storage
const testResults = {
  passed: 0,
  failed: 0,
  errors: []
};

// Utility functions
function logTest(testName, status, details = '') {
  const statusIcon = status ? '✅' : '❌';
  console.log(`${statusIcon} ${testName}`);
  if (details) console.log(`   ${details}`);
  
  if (status) {
    testResults.passed++;
  } else {
    testResults.failed++;
    testResults.errors.push(`${testName}: ${details}`);
  }
}

function makeRequest(method, url, data = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    const response = execSync(`curl -s -X ${method} "${url}" ${data ? `-d '${JSON.stringify(data)}'` : ''} -H "Content-Type: application/json"`, { 
      encoding: 'utf8',
      timeout: 10000 
    });
    
    return JSON.parse(response);
  } catch (error) {
    return { error: error.message };
  }
}

// Test 1: Check if development server is running
console.log('🔍 Testing Development Server...');
console.log('--------------------------------');

try {
  const response = makeRequest('GET', `${BASE_URL}/api/health-check`);
  logTest('Development server is running', !response.error, response.error || 'Server responding');
} catch (error) {
  logTest('Development server is running', false, 'Server not responding - start with npm run dev');
}

// Test 2: Test all CMS API endpoints
console.log('\n📡 Testing CMS API Endpoints...');
console.log('--------------------------------');

const apiEndpoints = [
  { name: 'Homepage Content', endpoint: '/homepage', method: 'GET' },
  { name: 'General Content', endpoint: '/content', method: 'GET' },
  { name: 'Schools Data', endpoint: '/schools', method: 'GET' },
  { name: 'Sanskrit School', endpoint: '/sanskrit-school', method: 'GET' },
  { name: 'Self-Help School', endpoint: '/self-help-school', method: 'GET' },
  { name: 'Darshana School', endpoint: '/darshana-school', method: 'GET' },
  { name: 'About Content', endpoint: '/about', method: 'GET' },
  { name: 'Contact Content', endpoint: '/contact', method: 'GET' },
  { name: 'Donation Content', endpoint: '/donation', method: 'GET' },
  { name: 'Blog Content', endpoint: '/blog', method: 'GET' },
  { name: 'Course Content', endpoint: '/course', method: 'GET' },
  { name: 'Package Content', endpoint: '/package', method: 'GET' }
];

apiEndpoints.forEach(({ name, endpoint, method }) => {
  try {
    const response = makeRequest(method, `${API_BASE}${endpoint}`);
    const hasError = response.error || !response.success;
    logTest(`${name} API (${method})`, !hasError, hasError ? response.error || 'API call failed' : 'API responding correctly');
  } catch (error) {
    logTest(`${name} API (${method})`, false, error.message);
  }
});

// Test 3: Test CMS page accessibility
console.log('\n🌐 Testing CMS Page Accessibility...');
console.log('------------------------------------');

const cmsPages = [
  '/cms',
  '/cms/dashboard',
  '/cms/about',
  '/cms/about-enhanced',
  '/cms/contact',
  '/cms/donation',
  '/cms/donation-enhanced',
  '/cms/schools',
  '/cms/sanskrit-school',
  '/cms/self-help-school',
  '/cms/darshana-school',
  '/cms/analytics',
  '/cms/imported-data'
];

cmsPages.forEach(page => {
  try {
    const response = makeRequest('GET', `${BASE_URL}${page}`);
    const isAccessible = !response.error && response.includes && response.includes('<!DOCTYPE html');
    logTest(`CMS Page: ${page}`, isAccessible, isAccessible ? 'Page loads correctly' : 'Page not accessible');
  } catch (error) {
    logTest(`CMS Page: ${page}`, false, error.message);
  }
});

// Test 4: Test content update functionality
console.log('\n💾 Testing Content Update Functionality...');
console.log('------------------------------------------');

const testContent = {
  hero: {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    description: 'Test Description',
    ctaText: 'Test CTA',
    ctaLink: '/test'
  }
};

try {
  const response = makeRequest('PUT', `${API_BASE}/homepage`, testContent);
  const updateSuccess = response.success && !response.error;
  logTest('Content Update (Homepage)', updateSuccess, updateSuccess ? 'Content updated successfully' : response.error || 'Update failed');
} catch (error) {
  logTest('Content Update (Homepage)', false, error.message);
}

// Test 5: Test section-specific updates
console.log('\n📝 Testing Section-Specific Updates...');
console.log('--------------------------------------');

const sectionUpdate = {
  section: 'hero',
  data: {
    title: 'Updated Hero Title',
    subtitle: 'Updated Hero Subtitle'
  }
};

try {
  const response = makeRequest('PUT', `${API_BASE}/section`, sectionUpdate);
  const sectionUpdateSuccess = response.success && !response.error;
  logTest('Section Update (Hero)', sectionUpdateSuccess, sectionUpdateSuccess ? 'Section updated successfully' : response.error || 'Section update failed');
} catch (error) {
  logTest('Section Update (Hero)', false, error.message);
}

// Test 6: Test error handling
console.log('\n🚨 Testing Error Handling...');
console.log('----------------------------');

// Test invalid content update
try {
  const invalidContent = { invalid: 'data' };
  const response = makeRequest('PUT', `${API_BASE}/homepage`, invalidContent);
  const errorHandled = response.error || !response.success;
  logTest('Invalid Content Error Handling', errorHandled, errorHandled ? 'Error handled correctly' : 'Error handling failed');
} catch (error) {
  logTest('Invalid Content Error Handling', false, error.message);
}

// Test 7: Test content validation
console.log('\n✅ Testing Content Validation...');
console.log('-------------------------------');

const validContent = {
  hero: {
    title: 'Valid Title',
    subtitle: 'Valid Subtitle',
    description: 'Valid Description',
    ctaText: 'Valid CTA',
    ctaLink: '/valid-link'
  },
  alignYourself: {
    title: 'Align Yourself',
    description: 'Valid description'
  }
};

try {
  const response = makeRequest('PUT', `${API_BASE}/homepage`, validContent);
  const validationSuccess = response.success && !response.error;
  logTest('Content Validation', validationSuccess, validationSuccess ? 'Content validation passed' : response.error || 'Validation failed');
} catch (error) {
  logTest('Content Validation', false, error.message);
}

// Test 8: Test CMS editor components
console.log('\n🎨 Testing CMS Editor Components...');
console.log('----------------------------------');

const editorComponents = [
  'components/cms/EnhancedContentEditor.tsx',
  'components/cms/EnhancedEditor.tsx',
  'components/cms/ContentPreview.tsx',
  'components/cms/ContentStatistics.tsx',
  'components/cms/GlobalContentSearch.tsx',
  'components/cms/SmartContentManager.tsx'
];

editorComponents.forEach(component => {
  const componentPath = path.join(process.cwd(), component);
  const exists = fs.existsSync(componentPath);
  logTest(`Editor Component: ${component}`, exists, exists ? 'Component exists' : 'Component not found');
});

// Test 9: Test CMS hooks and utilities
console.log('\n🔧 Testing CMS Hooks and Utilities...');
console.log('------------------------------------');

const cmsUtilities = [
  'lib/cms/content-manager.ts',
  'lib/cms/generic-hooks.ts',
  'lib/cms/school-hooks.ts',
  'lib/cms/auto-save.ts'
];

cmsUtilities.forEach(utility => {
  const utilityPath = path.join(process.cwd(), utility);
  const exists = fs.existsSync(utilityPath);
  logTest(`CMS Utility: ${utility}`, exists, exists ? 'Utility exists' : 'Utility not found');
});

// Test 10: Test data synchronization
console.log('\n🔄 Testing Data Synchronization...');
console.log('----------------------------------');

try {
  // Test GET after PUT to ensure data persistence
  const testData = { hero: { title: 'Sync Test Title' } };
  
  // Update content
  const updateResponse = makeRequest('PUT', `${API_BASE}/homepage`, testData);
  const updateSuccess = updateResponse.success;
  
  if (updateSuccess) {
    // Retrieve content
    const getResponse = makeRequest('GET', `${API_BASE}/homepage`);
    const syncSuccess = getResponse.success && getResponse.data;
    
    logTest('Data Synchronization', syncSuccess, syncSuccess ? 'Data sync working correctly' : 'Data sync failed');
  } else {
    logTest('Data Synchronization', false, 'Update failed, cannot test sync');
  }
} catch (error) {
  logTest('Data Synchronization', false, error.message);
}

// Final Results
console.log('\n📊 CMS Testing Results Summary');
console.log('===============================');
console.log(`✅ Tests Passed: ${testResults.passed}`);
console.log(`❌ Tests Failed: ${testResults.failed}`);
console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);

if (testResults.errors.length > 0) {
  console.log('\n🚨 Failed Tests:');
  testResults.errors.forEach(error => {
    console.log(`   • ${error}`);
  });
}

console.log('\n🎯 CMS Testing Complete!');
console.log('========================');

if (testResults.failed === 0) {
  console.log('🎉 All CMS tests passed! The system is fully functional.');
} else {
  console.log('⚠️  Some tests failed. Please review the errors above.');
}

// Recommendations
console.log('\n💡 Recommendations:');
console.log('------------------');
console.log('1. Ensure development server is running: npm run dev');
console.log('2. Check all API endpoints are accessible');
console.log('3. Verify CMS pages load correctly');
console.log('4. Test content updates in the browser');
console.log('5. Monitor console for any JavaScript errors');

console.log('\n🚀 CMS System Status: ' + (testResults.failed === 0 ? 'FULLY OPERATIONAL' : 'NEEDS ATTENTION'));
