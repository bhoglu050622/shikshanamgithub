#!/usr/bin/env node

/**
 * Test script for CMS functionality
 * Run with: node scripts/test-cms.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing CMS Integration...\n');

// Test 1: Check if content file exists
const contentPath = path.join(__dirname, '..', 'data', 'homepage-content.json');
console.log('1. Checking content file...');
if (fs.existsSync(contentPath)) {
  console.log('✅ Content file exists');
  
  try {
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    console.log('✅ Content file is valid JSON');
    console.log(`   - Hero title: ${content.hero?.title || 'Missing'}`);
    console.log(`   - Live classes: ${content.alignYourself?.liveClasses?.length || 0}`);
    console.log(`   - Self-paced courses: ${content.alignYourself?.selfPacedCourses?.length || 0}`);
  } catch (error) {
    console.log('❌ Content file is not valid JSON:', error.message);
  }
} else {
  console.log('❌ Content file does not exist');
}

// Test 2: Check if API routes exist
console.log('\n2. Checking API routes...');
const apiRoutes = [
  'app/api/cms/content/route.ts',
  'app/api/cms/section/route.ts',
  'app/api/cms/reset/route.ts'
];

apiRoutes.forEach(route => {
  const routePath = path.join(__dirname, '..', route);
  if (fs.existsSync(routePath)) {
    console.log(`✅ ${route} exists`);
  } else {
    console.log(`❌ ${route} missing`);
  }
});

// Test 3: Check if CMS components exist
console.log('\n3. Checking CMS components...');
const cmsComponents = [
  'components/cms/HeroEditor.tsx',
  'components/cms/AlignYourselfEditor.tsx',
  'components/cms/SchoolsEditor.tsx',
  'components/sections/CMSHero.tsx',
  'components/sections/CMSAlignYourself.tsx'
];

cmsComponents.forEach(component => {
  const componentPath = path.join(__dirname, '..', component);
  if (fs.existsSync(componentPath)) {
    console.log(`✅ ${component} exists`);
  } else {
    console.log(`❌ ${component} missing`);
  }
});

// Test 4: Check if CMS page exists
console.log('\n4. Checking CMS admin page...');
const cmsPagePath = path.join(__dirname, '..', 'app', 'cms', 'page.tsx');
if (fs.existsSync(cmsPagePath)) {
  console.log('✅ CMS admin page exists');
} else {
  console.log('❌ CMS admin page missing');
}

// Test 5: Check if CMS homepage exists
console.log('\n5. Checking CMS homepage...');
const cmsHomepagePath = path.join(__dirname, '..', 'app', 'cms-homepage', 'page.tsx');
if (fs.existsSync(cmsHomepagePath)) {
  console.log('✅ CMS homepage exists');
} else {
  console.log('❌ CMS homepage missing');
}

console.log('\n🎉 CMS Integration Test Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Start the development server: npm run dev');
console.log('2. Visit /cms to access the admin interface');
console.log('3. Visit /cms-homepage to see the CMS-enabled homepage');
console.log('4. Test editing content in the CMS');
console.log('5. Verify changes appear on the homepage');

console.log('\n🔗 URLs to test:');
console.log('- CMS Admin: http://localhost:3000/cms');
console.log('- CMS Homepage: http://localhost:3000/cms-homepage');
console.log('- Original Homepage: http://localhost:3000/');
console.log('- API Endpoint: http://localhost:3000/api/cms/content');
