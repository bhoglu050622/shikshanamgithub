#!/usr/bin/env node

/**
 * Find unused CMS editors that don't have corresponding frontend builds
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Finding unused CMS editors...\n');

// Get all editor files
const cmsDir = path.join(__dirname, '../components/cms');
const allEditors = fs.readdirSync(cmsDir)
  .filter(file => file.endsWith('Editor.tsx'))
  .map(file => file.replace('.tsx', ''));

console.log(`📊 Total editors found: ${allEditors.length}`);

// Get used editors from imports
const usedEditors = new Set();

// Check app/cms directory for imports
const appCmsDir = path.join(__dirname, '../app/cms');
function scanDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      scanDirectory(itemPath);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      try {
        const content = fs.readFileSync(itemPath, 'utf8');
        const importMatches = content.match(/import.*from.*components\/cms\/([A-Za-z]*Editor)/g);
        
        if (importMatches) {
          importMatches.forEach(match => {
            const editorMatch = match.match(/components\/cms\/([A-Za-z]*Editor)/);
            if (editorMatch) {
              usedEditors.add(editorMatch[1]);
            }
          });
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
  });
}

scanDirectory(appCmsDir);

// Check components/cms directory for internal imports
function scanCmsComponents() {
  const files = fs.readdirSync(cmsDir);
  
  files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      try {
        const content = fs.readFileSync(path.join(cmsDir, file), 'utf8');
        const importMatches = content.match(/import.*from.*\.\/([A-Za-z]*Editor)/g);
        
        if (importMatches) {
          importMatches.forEach(match => {
            const editorMatch = match.match(/\.\/([A-Za-z]*Editor)/);
            if (editorMatch) {
              usedEditors.add(editorMatch[1]);
            }
          });
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
  });
}

scanCmsComponents();

console.log(`📊 Used editors found: ${usedEditors.size}`);

// Find unused editors
const unusedEditors = allEditors.filter(editor => !usedEditors.has(editor));

console.log(`📊 Unused editors: ${unusedEditors.length}\n`);

if (unusedEditors.length > 0) {
  console.log('🗑️  Unused editors that can be removed:');
  console.log('=====================================');
  
  unusedEditors.forEach(editor => {
    console.log(`❌ ${editor}.tsx`);
  });
  
  console.log('\n💡 These editors are not imported or used in any CMS pages.');
  console.log('   They can be safely removed to clean up the codebase.');
  
  // Create removal script
  const removalScript = unusedEditors.map(editor => 
    `rm components/cms/${editor}.tsx`
  ).join('\n');
  
  fs.writeFileSync(
    path.join(__dirname, '../scripts/remove-unused-editors.sh'), 
    `#!/bin/bash\n# Remove unused CMS editors\n\n${removalScript}\n`
  );
  
  console.log('\n📝 Removal script created: scripts/remove-unused-editors.sh');
  console.log('   Run this script to remove all unused editors.');
  
} else {
  console.log('✅ All editors are being used! No cleanup needed.');
}

console.log('\n🎯 Analysis complete!');
