#!/usr/bin/env node

/**
 * CMS Courses, Packages & Blogs Testing Suite
 * Tests specific CMS functionality for courses, packages, and blogs
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📚 CMS Courses, Packages & Blogs Testing Suite');
console.log('==============================================\n');

// Test results
const testResults = {
  passed: 0,
  failed: 0,
  errors: []
};

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

// Test 1: Test Course CMS Pages
console.log('📖 Testing Course CMS Pages...');
console.log('-------------------------------');

const coursePages = [
  { path: '/cms/edit/sanskrit-course', name: 'Sanskrit Course CMS' },
  { path: '/cms/edit/advaita-vedanta-course', name: 'Advaita Vedanta Course CMS' },
  { path: '/cms/edit/samkhya-darshan-course', name: 'Samkhya Darshan Course CMS' },
  { path: '/cms/edit/nyaya-darshan-course', name: 'Nyaya Darshan Course CMS' },
  { path: '/cms/edit/vaisheshik-darshan-course', name: 'Vaisheshik Darshan Course CMS' },
  { path: '/cms/edit/yoga-darshan-course', name: 'Yoga Darshan Course CMS' },
  { path: '/cms/edit/tantra-darshan-course', name: 'Tantra Darshan Course CMS' },
  { path: '/cms/edit/kashmir-shaivism-course', name: 'Kashmir Shaivism Course CMS' },
  { path: '/cms/edit/emotional-intelligence-course', name: 'Emotional Intelligence Course CMS' },
  { path: '/cms/edit/sanskrit-live-class-course', name: 'Sanskrit Live Class Course CMS' }
];

coursePages.forEach(({ path, name }) => {
  try {
    const response = execSync(`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${path}`, { encoding: 'utf8' });
    const isAccessible = response.trim() === '200';
    logTest(`${name} (${path})`, isAccessible, isAccessible ? 'Course CMS page accessible' : `HTTP ${response.trim()}`);
  } catch (error) {
    logTest(`${name} (${path})`, false, error.message);
  }
});

// Test 2: Test Package CMS Pages
console.log('\n📦 Testing Package CMS Pages...');
console.log('--------------------------------');

const packagePages = [
  { path: '/cms/edit/sanskrit-darshan-upanishad-bundle', name: 'Sanskrit Darshan Upanishad Bundle CMS' },
  { path: '/cms/edit/sanskrit-philosophy-bundle', name: 'Sanskrit Philosophy Bundle CMS' },
  { path: '/cms/edit/hindu-philosophies-upanishads-bundle', name: 'Hindu Philosophies Upanishads Bundle CMS' }
];

packagePages.forEach(({ path, name }) => {
  try {
    const response = execSync(`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${path}`, { encoding: 'utf8' });
    const isAccessible = response.trim() === '200';
    logTest(`${name} (${path})`, isAccessible, isAccessible ? 'Package CMS page accessible' : `HTTP ${response.trim()}`);
  } catch (error) {
    logTest(`${name} (${path})`, false, error.message);
  }
});

// Test 3: Test Blog CMS Pages
console.log('\n📝 Testing Blog CMS Pages...');
console.log('-----------------------------');

const blogPages = [
  { path: '/cms/edit/blog', name: 'Blog Posts CMS' },
  { path: '/cms/edit/events', name: 'Events & Workshops CMS' }
];

blogPages.forEach(({ path, name }) => {
  try {
    const response = execSync(`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${path}`, { encoding: 'utf8' });
    const isAccessible = response.trim() === '200';
    logTest(`${name} (${path})`, isAccessible, isAccessible ? 'Blog CMS page accessible' : `HTTP ${response.trim()}`);
  } catch (error) {
    logTest(`${name} (${path})`, false, error.message);
  }
});

// Test 4: Test Course API Endpoints
console.log('\n🔌 Testing Course API Endpoints...');
console.log('----------------------------------');

const courseAPIs = [
  { endpoint: '/api/cms/sanskrit-course', name: 'Sanskrit Course API' },
  { endpoint: '/api/cms/advaita-vedanta-course', name: 'Advaita Vedanta Course API' },
  { endpoint: '/api/cms/samkhya-darshan-course', name: 'Samkhya Darshan Course API' },
  { endpoint: '/api/cms/nyaya-darshan-course', name: 'Nyaya Darshan Course API' },
  { endpoint: '/api/cms/vaisheshik-darshan-course', name: 'Vaisheshik Darshan Course API' },
  { endpoint: '/api/cms/yoga-darshan-course', name: 'Yoga Darshan Course API' },
  { endpoint: '/api/cms/tantra-darshan-course', name: 'Tantra Darshan Course API' },
  { endpoint: '/api/cms/kashmir-shaivism-course', name: 'Kashmir Shaivism Course API' },
  { endpoint: '/api/cms/emotional-intelligence-course', name: 'Emotional Intelligence Course API' },
  { endpoint: '/api/cms/sanskrit-live-class-course', name: 'Sanskrit Live Class Course API' }
];

courseAPIs.forEach(({ endpoint, name }) => {
  try {
    const response = execSync(`curl -s "http://localhost:3000${endpoint}"`, { encoding: 'utf8' });
    const data = JSON.parse(response);
    const apiSuccess = data.success && !data.error;
    logTest(`${name} (GET)`, apiSuccess, apiSuccess ? 'Course API responding correctly' : data.error || 'Course API failed');
  } catch (error) {
    logTest(`${name} (GET)`, false, error.message);
  }
});

// Test 5: Test Package API Endpoints
console.log('\n📦 Testing Package API Endpoints...');
console.log('------------------------------------');

const packageAPIs = [
  { endpoint: '/api/cms/sanskrit-darshan-upanishad-bundle', name: 'Sanskrit Darshan Upanishad Bundle API' },
  { endpoint: '/api/cms/sanskrit-philosophy-bundle', name: 'Sanskrit Philosophy Bundle API' },
  { endpoint: '/api/cms/hindu-philosophies-upanishads-bundle', name: 'Hindu Philosophies Upanishads Bundle API' }
];

packageAPIs.forEach(({ endpoint, name }) => {
  try {
    const response = execSync(`curl -s "http://localhost:3000${endpoint}"`, { encoding: 'utf8' });
    const data = JSON.parse(response);
    const apiSuccess = data.success && !data.error;
    logTest(`${name} (GET)`, apiSuccess, apiSuccess ? 'Package API responding correctly' : data.error || 'Package API failed');
  } catch (error) {
    logTest(`${name} (GET)`, false, error.message);
  }
});

// Test 6: Test Blog API Endpoints
console.log('\n📝 Testing Blog API Endpoints...');
console.log('--------------------------------');

const blogAPIs = [
  { endpoint: '/api/cms/blog', name: 'Blog Posts API' },
  { endpoint: '/api/cms/events', name: 'Events & Workshops API' }
];

blogAPIs.forEach(({ endpoint, name }) => {
  try {
    const response = execSync(`curl -s "http://localhost:3000${endpoint}"`, { encoding: 'utf8' });
    const data = JSON.parse(response);
    const apiSuccess = data.success && !data.error;
    logTest(`${name} (GET)`, apiSuccess, apiSuccess ? 'Blog API responding correctly' : data.error || 'Blog API failed');
  } catch (error) {
    logTest(`${name} (GET)`, false, error.message);
  }
});

// Test 7: Test Course Content Updates
console.log('\n💾 Testing Course Content Updates...');
console.log('------------------------------------');

try {
  const courseUpdateData = {
    hero: {
      title: 'Test Course Title',
      subtitle: 'Test Course Subtitle',
      description: 'Test course description',
      ctaText: 'Enroll Now',
      ctaLink: '/enroll'
    },
    syllabus: {
      title: 'Course Syllabus',
      modules: [
        { title: 'Module 1', description: 'Introduction' },
        { title: 'Module 2', description: 'Advanced Topics' }
      ]
    }
  };
  
  const updateResponse = execSync(`curl -s -X PUT "http://localhost:3000/api/cms/sanskrit-course" -H "Content-Type: application/json" -d '${JSON.stringify(courseUpdateData)}'`, { encoding: 'utf8' });
  const updateData = JSON.parse(updateResponse);
  const updateSuccess = updateData.success;
  
  logTest('Course Content Update', updateSuccess, updateSuccess ? 'Course content updated successfully' : updateData.error || 'Course update failed');
} catch (error) {
  logTest('Course Content Update', false, error.message);
}

// Test 8: Test Package Content Updates
console.log('\n📦 Testing Package Content Updates...');
console.log('------------------------------------');

try {
  const packageUpdateData = {
    hero: {
      title: 'Test Package Title',
      subtitle: 'Test Package Subtitle',
      description: 'Test package description',
      ctaText: 'Get Package',
      ctaLink: '/package'
    },
    courses: [
      { name: 'Course 1', description: 'Description 1' },
      { name: 'Course 2', description: 'Description 2' }
    ],
    pricing: {
      price: 299,
      currency: 'USD',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    }
  };
  
  const updateResponse = execSync(`curl -s -X PUT "http://localhost:3000/api/cms/sanskrit-darshan-upanishad-bundle" -H "Content-Type: application/json" -d '${JSON.stringify(packageUpdateData)}'`, { encoding: 'utf8' });
  const updateData = JSON.parse(updateResponse);
  const updateSuccess = updateData.success;
  
  logTest('Package Content Update', updateSuccess, updateSuccess ? 'Package content updated successfully' : updateData.error || 'Package update failed');
} catch (error) {
  logTest('Package Content Update', false, error.message);
}

// Test 9: Test Blog Content Updates
console.log('\n📝 Testing Blog Content Updates...');
console.log('--------------------------------');

try {
  const blogUpdateData = {
    posts: [
      {
        id: 'test-post-1',
        title: 'Test Blog Post',
        content: 'Test blog content',
        author: 'Test Author',
        date: '2024-01-15',
        tags: ['test', 'blog'],
        status: 'published'
      }
    ],
    categories: ['Philosophy', 'Sanskrit', 'Education'],
    tags: ['ancient-wisdom', 'learning', 'spirituality']
  };
  
  const updateResponse = execSync(`curl -s -X PUT "http://localhost:3000/api/cms/blog" -H "Content-Type: application/json" -d '${JSON.stringify(blogUpdateData)}'`, { encoding: 'utf8' });
  const updateData = JSON.parse(updateResponse);
  const updateSuccess = updateData.success;
  
  logTest('Blog Content Update', updateSuccess, updateSuccess ? 'Blog content updated successfully' : updateData.error || 'Blog update failed');
} catch (error) {
  logTest('Blog Content Update', false, error.message);
}

// Test 10: Test Content Registry
console.log('\n📋 Testing Content Registry...');
console.log('-----------------------------');

const contentRegistryPath = path.join(process.cwd(), 'lib/cms/content-registry.ts');
const registryExists = fs.existsSync(contentRegistryPath);

logTest('Content Registry File', registryExists, registryExists ? 'Content registry file exists' : 'Content registry file not found');

if (registryExists) {
  try {
    const registryContent = fs.readFileSync(contentRegistryPath, 'utf8');
    const hasCourseTypes = registryContent.includes('sanskrit-course') && registryContent.includes('advaita-vedanta-course');
    const hasPackageTypes = registryContent.includes('sanskrit-darshan-upanishad-bundle') && registryContent.includes('sanskrit-philosophy-bundle');
    const hasBlogTypes = registryContent.includes('blog') && registryContent.includes('events');
    
    logTest('Course Types in Registry', hasCourseTypes, hasCourseTypes ? 'Course types defined in registry' : 'Course types missing from registry');
    logTest('Package Types in Registry', hasPackageTypes, hasPackageTypes ? 'Package types defined in registry' : 'Package types missing from registry');
    logTest('Blog Types in Registry', hasBlogTypes, hasBlogTypes ? 'Blog types defined in registry' : 'Blog types missing from registry');
  } catch (error) {
    logTest('Content Registry Analysis', false, error.message);
  }
}

// Test 11: Test CMS Dashboard Integration
console.log('\n🎛️ Testing CMS Dashboard Integration...');
console.log('------------------------------------');

try {
  const dashboardResponse = execSync('curl -s "http://localhost:3000/cms"', { encoding: 'utf8' });
  const hasDashboard = dashboardResponse.includes('CMS') || dashboardResponse.includes('Dashboard') || dashboardResponse.includes('Content');
  
  logTest('CMS Dashboard', hasDashboard, hasDashboard ? 'CMS dashboard accessible' : 'CMS dashboard not accessible');
} catch (error) {
  logTest('CMS Dashboard', false, error.message);
}

// Test 12: Test Universal CMS Dashboard
console.log('\n🌐 Testing Universal CMS Dashboard...');
console.log('-----------------------------------');

try {
  const universalDashboardResponse = execSync('curl -s "http://localhost:3000/cms/dashboard"', { encoding: 'utf8' });
  const hasUniversalDashboard = universalDashboardResponse.includes('Universal') || universalDashboardResponse.includes('Dashboard') || universalDashboardResponse.includes('Content');
  
  logTest('Universal CMS Dashboard', hasUniversalDashboard, hasUniversalDashboard ? 'Universal CMS dashboard accessible' : 'Universal CMS dashboard not accessible');
} catch (error) {
  logTest('Universal CMS Dashboard', false, error.message);
}

// Final Results
console.log('\n📊 Courses, Packages & Blogs Testing Results');
console.log('=============================================');
console.log(`✅ Tests Passed: ${testResults.passed}`);
console.log(`❌ Tests Failed: ${testResults.failed}`);
console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);

if (testResults.errors.length > 0) {
  console.log('\n🚨 Failed Tests:');
  testResults.errors.forEach(error => {
    console.log(`   • ${error}`);
  });
}

console.log('\n🎯 Courses, Packages & Blogs Testing Complete!');
console.log('===============================================');

if (testResults.failed === 0) {
  console.log('🎉 All courses, packages, and blogs CMS tests passed!');
} else if (testResults.failed <= 5) {
  console.log('🟡 Most CMS tests passed. Some courses/packages/blogs may need attention.');
} else {
  console.log('🔴 Multiple CMS test failures detected. Courses/packages/blogs system needs attention.');
}

// Recommendations
console.log('\n💡 Recommendations:');
console.log('------------------');
console.log('1. ✅ Test individual course CMS pages');
console.log('2. ✅ Test package CMS functionality');
console.log('3. ✅ Test blog content management');
console.log('4. ✅ Verify content registry includes all types');
console.log('5. 🔍 Test content updates in browser for full functionality');

console.log('\n🚀 Courses, Packages & Blogs CMS Status: ' + (testResults.failed === 0 ? 'FULLY OPERATIONAL' : testResults.failed <= 5 ? 'MOSTLY FUNCTIONAL' : 'NEEDS ATTENTION'));
