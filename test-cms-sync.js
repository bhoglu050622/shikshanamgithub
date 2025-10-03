#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 CMS Content Sync Test');
console.log('========================');

// Test 1: Check if published content files exist
const dataDir = path.join(__dirname, 'data');
const contentFiles = [
  'homepage-content.published.json',
  'about-content.published.json', 
  'contact-content.published.json'
];

console.log('\n📁 Checking published content files:');
contentFiles.forEach(file => {
  const filePath = path.join(dataDir, file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  
  if (exists) {
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log(`    📄 Content keys: ${Object.keys(content).join(', ')}`);
    } catch (error) {
      console.log(`    ⚠️  Invalid JSON: ${error.message}`);
    }
  }
});

// Test 2: Check draft content files
console.log('\n📝 Checking draft content files:');
const draftFiles = [
  'homepage-content.json',
  'about-content.json',
  'contact-content.json'
];

draftFiles.forEach(file => {
  const filePath = path.join(dataDir, file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
});

// Test 3: Check if contact page uses CMS content
console.log('\n🌐 Checking contact page integration:');
const contactPagePath = path.join(__dirname, 'app', 'contact', 'page.tsx');
if (fs.existsSync(contactPagePath)) {
  const contactPageContent = fs.readFileSync(contactPagePath, 'utf8');
  const usesCMS = contactPageContent.includes('getContactContent') && 
                  contactPageContent.includes('content?.');
  console.log(`  ${usesCMS ? '✅' : '❌'} Contact page uses CMS content`);
} else {
  console.log('  ❌ Contact page not found');
}

// Test 4: Check CMS editor publish button
console.log('\n🔧 Checking CMS editor publish button:');
const editorPath = path.join(__dirname, 'app', 'cms', 'editor', 'Editor.tsx');
if (fs.existsSync(editorPath)) {
  const editorContent = fs.readFileSync(editorPath, 'utf8');
  const hasPublishButton = editorContent.includes('Save & Publish') && 
                          editorContent.includes('handleSave(true)');
  console.log(`  ${hasPublishButton ? '✅' : '❌'} CMS editor has publish button`);
} else {
  console.log('  ❌ CMS editor not found');
}

console.log('\n✨ Test completed!');
