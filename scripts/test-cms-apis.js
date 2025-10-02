#!/usr/bin/env node

/**
 * CMS API Testing Script
 * Tests the CMS API endpoints to verify they are working correctly
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TEST_COURSES = [
  'samkhya-darshan',
  'yoga-darshan', 
  'tantra-darshan',
  'nyaya-darshan',
  'vaisheshik-darshan',
  'kashmir-shaivism'
];

const TEST_PACKAGES = [
  'hindu-philosophies-upanishads-bundle',
  'sanskrit-basics'
];

// Test results storage
const testResults = {
  courses: {},
  packages: {},
  errors: [],
  summary: {
    total: 0,
    passed: 0,
    failed: 0
  }
};

/**
 * Make HTTP request
 */
async function makeRequest(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      success: response.ok,
      status: response.status,
      data: data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Test course API endpoint
 */
async function testCourseAPI(courseId) {
  console.log(`Testing course: ${courseId}`);
  const url = `${BASE_URL}/api/cms/course/${courseId}`;
  const result = await makeRequest(url);
  
  testResults.summary.total++;
  
  if (result.success && result.data.success) {
    testResults.courses[courseId] = {
      status: 'PASS',
      data: result.data.data
    };
    testResults.summary.passed++;
    console.log(`✅ ${courseId}: PASS`);
  } else {
    testResults.courses[courseId] = {
      status: 'FAIL',
      error: result.error || 'API call failed'
    };
    testResults.summary.failed++;
    testResults.errors.push(`Course ${courseId}: ${result.error || 'API call failed'}`);
    console.log(`❌ ${courseId}: FAIL - ${result.error || 'API call failed'}`);
  }
}

/**
 * Test package API endpoint
 */
async function testPackageAPI(packageId) {
  console.log(`Testing package: ${packageId}`);
  const url = `${BASE_URL}/api/cms/package/${packageId}`;
  const result = await makeRequest(url);
  
  testResults.summary.total++;
  
  if (result.success && result.data.success) {
    testResults.packages[packageId] = {
      status: 'PASS',
      data: result.data.data
    };
    testResults.summary.passed++;
    console.log(`✅ ${packageId}: PASS`);
  } else {
    testResults.packages[packageId] = {
      status: 'FAIL',
      error: result.error || 'API call failed'
    };
    testResults.summary.failed++;
    testResults.errors.push(`Package ${packageId}: ${result.error || 'API call failed'}`);
    console.log(`❌ ${packageId}: FAIL - ${result.error || 'API call failed'}`);
  }
}

/**
 * Check if data files exist
 */
function checkDataFiles() {
  console.log('\n📁 Checking data files...');
  const dataDir = path.join(__dirname, '..', 'data');
  
  const requiredFiles = [
    'samkhya-darshan-course.json',
    'yoga-darshan-course.json',
    'tantra-darshan-course.json',
    'nyaya-darshan-course.json',
    'vaisheshik-darshan-course.json',
    'kashmir-shaivism-course.json',
    'hindu-philosophies-upanishads-bundle-package.json'
  ];
  
  const missingFiles = [];
  const existingFiles = [];
  
  requiredFiles.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
      existingFiles.push(file);
      console.log(`✅ ${file}: EXISTS`);
    } else {
      missingFiles.push(file);
      console.log(`❌ ${file}: MISSING`);
    }
  });
  
  return {
    existing: existingFiles,
    missing: missingFiles,
    total: requiredFiles.length,
    found: existingFiles.length
  };
}

/**
 * Validate JSON structure
 */
function validateJSONStructure(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Check required fields for courses
    if (filePath.includes('-course.json')) {
      const requiredFields = ['id', 'title', 'instructor', 'price', 'duration', 'level'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        return {
          valid: false,
          error: `Missing required fields: ${missingFields.join(', ')}`
        };
      }
    }
    
    // Check required fields for packages
    if (filePath.includes('-package.json')) {
      const requiredFields = ['id', 'title', 'price', 'courses'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        return {
          valid: false,
          error: `Missing required fields: ${missingFields.join(', ')}`
        };
      }
    }
    
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: `Invalid JSON: ${error.message}`
    };
  }
}

/**
 * Main test execution
 */
async function runTests() {
  console.log('🚀 Starting CMS API Tests...\n');
  
  // Check if server is running
  console.log('🔍 Checking if server is running...');
  const healthCheck = await makeRequest(`${BASE_URL}/api/health-check`);
  if (!healthCheck.success) {
    console.log('❌ Server is not running. Please start the development server with: npm run dev');
    process.exit(1);
  }
  console.log('✅ Server is running\n');
  
  // Check data files
  const fileCheck = checkDataFiles();
  console.log(`\n📊 Data Files: ${fileCheck.found}/${fileCheck.total} found`);
  
  if (fileCheck.missing.length > 0) {
    console.log('⚠️  Missing files:', fileCheck.missing.join(', '));
  }
  
  // Test course APIs
  console.log('\n🧪 Testing Course APIs...');
  for (const courseId of TEST_COURSES) {
    await testCourseAPI(courseId);
  }
  
  // Test package APIs
  console.log('\n🧪 Testing Package APIs...');
  for (const packageId of TEST_PACKAGES) {
    await testPackageAPI(packageId);
  }
  
  // Validate JSON files
  console.log('\n🔍 Validating JSON files...');
  const dataDir = path.join(__dirname, '..', 'data');
  fileCheck.existing.forEach(file => {
    const filePath = path.join(dataDir, file);
    const validation = validateJSONStructure(filePath);
    
    if (validation.valid) {
      console.log(`✅ ${file}: Valid JSON structure`);
    } else {
      console.log(`❌ ${file}: ${validation.error}`);
      testResults.errors.push(`JSON validation failed for ${file}: ${validation.error}`);
    }
  });
  
  // Print summary
  console.log('\n📊 Test Summary:');
  console.log(`Total Tests: ${testResults.summary.total}`);
  console.log(`Passed: ${testResults.summary.passed}`);
  console.log(`Failed: ${testResults.summary.failed}`);
  console.log(`Success Rate: ${((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1)}%`);
  
  if (testResults.errors.length > 0) {
    console.log('\n❌ Errors:');
    testResults.errors.forEach(error => console.log(`  - ${error}`));
  }
  
  // Save results to file
  const resultsFile = path.join(__dirname, '..', 'test-results-cms.json');
  fs.writeFileSync(resultsFile, JSON.stringify(testResults, null, 2));
  console.log(`\n💾 Results saved to: ${resultsFile}`);
  
  // Exit with appropriate code
  process.exit(testResults.summary.failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});
