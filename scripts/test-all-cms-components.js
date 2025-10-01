#!/usr/bin/env node

/**
 * Comprehensive CMS Testing Script
 * Tests all editors, APIs, and components
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TEST_RESULTS = {
  passed: 0,
  failed: 0,
  errors: []
};

// API endpoints to test
const API_ENDPOINTS = [
  '/api/cms/homepage',
  '/api/cms/donation',
  '/api/cms/about',
  '/api/cms/contact',
  '/api/cms/darshana-school',
  '/api/cms/nyaya-vaisheshika-course',
  '/api/cms/emotional-intelligence-course',
  '/api/cms/kashmir-shaivism-course',
  '/api/cms/sanskrit-live-class-course',
  '/api/cms/nyaya-darshan-course',
  '/api/cms/samkhya-darshan-course',
  '/api/cms/vaisheshik-darshan-course',
  '/api/cms/tantra-darshan-course',
  '/api/cms/yoga-darshan-course'
];

// Content types to test
const CONTENT_TYPES = [
  'homepage',
  'donation',
  'about',
  'contact',
  'darshana-school',
  'nyaya-vaisheshika-course',
  'emotional-intelligence-course',
  'kashmir-shaivism-course',
  'sanskrit-live-class-course'
];

// Editor components to test
const EDITOR_COMPONENTS = [
  'HeroEditor',
  'AlignYourselfEditor',
  'SchoolsEditor',
  'MeetGurusEditor',
  'StudentStoriesEditor',
  'TestimonialsEditor',
  'CommunityPostsEditor',
  'FoundersMissionEditor',
  'ContributeEditor',
  'DownloadAppEditor',
  'FAQEditor',
  'UniversalEditor',
  'AboutHeroEditor',
  'AboutMissionEditor',
  'AboutValuesEditor',
  'AboutOfferingsEditor',
  'AboutCTAEditor',
  'ContactHeroEditor',
  'ContactFormEditor',
  'ContactInfoEditor',
  'ContactQuickHelpEditor',
  'DonationHeroEditor',
  'DonationImpactEditor',
  'DonationCausesEditor',
  'DonationOptionsEditor',
  'DonationTestimonialsEditor',
  'DonationFAQEditor',
  'DonationCTAEditor',
  'SchoolsHeroEditor',
  'SchoolsListEditor',
  'SchoolsCTAEditor'
];

console.log('🧪 Starting Comprehensive CMS Testing...\n');

// Test 1: Check if all editor components exist
console.log('📁 Testing Editor Components...');
EDITOR_COMPONENTS.forEach(editor => {
  const filePath = path.join(__dirname, '..', 'components', 'cms', `${editor}.tsx`);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${editor} - EXISTS`);
    TEST_RESULTS.passed++;
  } else {
    console.log(`❌ ${editor} - MISSING`);
    TEST_RESULTS.failed++;
    TEST_RESULTS.errors.push(`Missing editor component: ${editor}`);
  }
});

// Test 2: Check if all content files exist
console.log('\n📄 Testing Content Files...');
CONTENT_TYPES.forEach(contentType => {
  const filePath = path.join(__dirname, '..', 'data', `${contentType}-content.json`);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${contentType}-content.json - EXISTS`);
    TEST_RESULTS.passed++;
  } else {
    console.log(`❌ ${contentType}-content.json - MISSING`);
    TEST_RESULTS.failed++;
    TEST_RESULTS.errors.push(`Missing content file: ${contentType}-content.json`);
  }
});

// Test 3: Check if all API routes exist
console.log('\n🔗 Testing API Routes...');
API_ENDPOINTS.forEach(endpoint => {
  const routePath = path.join(__dirname, '..', 'app', 'api', 'cms', endpoint.split('/').pop(), 'route.ts');
  if (fs.existsSync(routePath)) {
    console.log(`✅ ${endpoint} - EXISTS`);
    TEST_RESULTS.passed++;
  } else {
    console.log(`❌ ${endpoint} - MISSING`);
    TEST_RESULTS.failed++;
    TEST_RESULTS.errors.push(`Missing API route: ${endpoint}`);
  }
});

// Test 4: Check ContentRegistry
console.log('\n📋 Testing ContentRegistry...');
const registryPath = path.join(__dirname, '..', 'lib', 'cms', 'content-registry.ts');
if (fs.existsSync(registryPath)) {
  const registryContent = fs.readFileSync(registryPath, 'utf8');
  
  // Check if all content types are registered
  CONTENT_TYPES.forEach(contentType => {
    if (registryContent.includes(`id: '${contentType}'`)) {
      console.log(`✅ ${contentType} - REGISTERED`);
      TEST_RESULTS.passed++;
    } else {
      console.log(`❌ ${contentType} - NOT REGISTERED`);
      TEST_RESULTS.failed++;
      TEST_RESULTS.errors.push(`Content type not registered: ${contentType}`);
    }
  });
} else {
  console.log('❌ ContentRegistry - MISSING');
  TEST_RESULTS.failed++;
  TEST_RESULTS.errors.push('Missing ContentRegistry file');
}

// Test 5: Check ContentEditPage
console.log('\n📝 Testing ContentEditPage...');
const contentEditPagePath = path.join(__dirname, '..', 'components', 'cms', 'ContentEditPage.tsx');
if (fs.existsSync(contentEditPagePath)) {
  const contentEditPageContent = fs.readFileSync(contentEditPagePath, 'utf8');
  
  if (contentEditPageContent.includes('UniversalEditor')) {
    console.log('✅ UniversalEditor - INTEGRATED');
    TEST_RESULTS.passed++;
  } else {
    console.log('❌ UniversalEditor - NOT INTEGRATED');
    TEST_RESULTS.failed++;
    TEST_RESULTS.errors.push('UniversalEditor not integrated in ContentEditPage');
  }
  
  if (contentEditPageContent.includes('ContentRegistry')) {
    console.log('✅ ContentRegistry - INTEGRATED');
    TEST_RESULTS.passed++;
  } else {
    console.log('❌ ContentRegistry - NOT INTEGRATED');
    TEST_RESULTS.failed++;
    TEST_RESULTS.errors.push('ContentRegistry not integrated in ContentEditPage');
  }
} else {
  console.log('❌ ContentEditPage - MISSING');
  TEST_RESULTS.failed++;
  TEST_RESULTS.errors.push('Missing ContentEditPage');
}

// Test 6: Check UniversalEditor
console.log('\n🔧 Testing UniversalEditor...');
const universalEditorPath = path.join(__dirname, '..', 'components', 'cms', 'UniversalEditor.tsx');
if (fs.existsSync(universalEditorPath)) {
  const universalEditorContent = fs.readFileSync(universalEditorPath, 'utf8');
  
  if (universalEditorContent.includes('getDefaultFieldsForSection')) {
    console.log('✅ Default Fields - IMPLEMENTED');
    TEST_RESULTS.passed++;
  } else {
    console.log('❌ Default Fields - NOT IMPLEMENTED');
    TEST_RESULTS.failed++;
    TEST_RESULTS.errors.push('Default fields not implemented in UniversalEditor');
  }
  
  if (universalEditorContent.includes('handleFieldEdit')) {
    console.log('✅ Field Editing - IMPLEMENTED');
    TEST_RESULTS.passed++;
  } else {
    console.log('❌ Field Editing - NOT IMPLEMENTED');
    TEST_RESULTS.failed++;
    TEST_RESULTS.errors.push('Field editing not implemented in UniversalEditor');
  }
} else {
  console.log('❌ UniversalEditor - MISSING');
  TEST_RESULTS.failed++;
  TEST_RESULTS.errors.push('Missing UniversalEditor');
}

// Test 7: Check CMS Dashboard
console.log('\n📊 Testing CMS Dashboard...');
const finalFullCMSPath = path.join(__dirname, '..', 'components', 'cms', 'FinalFullCMS.tsx');
if (fs.existsSync(finalFullCMSPath)) {
  const finalFullCMSContent = fs.readFileSync(finalFullCMSPath, 'utf8');
  
  if (finalFullCMSContent.includes('useRouter')) {
    console.log('✅ Navigation - IMPLEMENTED');
    TEST_RESULTS.passed++;
  } else {
    console.log('❌ Navigation - NOT IMPLEMENTED');
    TEST_RESULTS.failed++;
    TEST_RESULTS.errors.push('Navigation not implemented in FinalFullCMS');
  }
} else {
  console.log('❌ FinalFullCMS - MISSING');
  TEST_RESULTS.failed++;
  TEST_RESULTS.errors.push('Missing FinalFullCMS');
}

// Test 8: Check Dynamic Route
console.log('\n🛣️ Testing Dynamic Route...');
const dynamicRoutePath = path.join(__dirname, '..', 'app', 'cms', 'edit', '[contentType]', 'page.tsx');
if (fs.existsSync(dynamicRoutePath)) {
  const dynamicRouteContent = fs.readFileSync(dynamicRoutePath, 'utf8');
  
  if (dynamicRouteContent.includes('ContentRegistry.getContentType')) {
    console.log('✅ Dynamic Lookup - IMPLEMENTED');
    TEST_RESULTS.passed++;
  } else {
    console.log('❌ Dynamic Lookup - NOT IMPLEMENTED');
    TEST_RESULTS.failed++;
    TEST_RESULTS.errors.push('Dynamic lookup not implemented in route');
  }
} else {
  console.log('❌ Dynamic Route - MISSING');
  TEST_RESULTS.failed++;
  TEST_RESULTS.errors.push('Missing dynamic route');
}

// Print Results
console.log('\n📊 TEST RESULTS:');
console.log(`✅ Passed: ${TEST_RESULTS.passed}`);
console.log(`❌ Failed: ${TEST_RESULTS.failed}`);
console.log(`📈 Success Rate: ${((TEST_RESULTS.passed / (TEST_RESULTS.passed + TEST_RESULTS.failed)) * 100).toFixed(1)}%`);

if (TEST_RESULTS.errors.length > 0) {
  console.log('\n🚨 ERRORS FOUND:');
  TEST_RESULTS.errors.forEach((error, index) => {
    console.log(`${index + 1}. ${error}`);
  });
}

console.log('\n🎯 Testing Complete!');

// Save results to file
const resultsPath = path.join(__dirname, '..', 'test-results.json');
fs.writeFileSync(resultsPath, JSON.stringify(TEST_RESULTS, null, 2));
console.log(`\n📄 Results saved to: ${resultsPath}`);
