#!/usr/bin/env node

/**
 * Find unused CMS components that don't have corresponding frontend builds
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Finding unused CMS components...\n');

// Get all CMS component files (excluding editors)
const cmsDir = path.join(__dirname, '../components/cms');
const allComponents = fs.readdirSync(cmsDir)
  .filter(file => file.endsWith('.tsx') && !file.endsWith('Editor.tsx'))
  .map(file => file.replace('.tsx', ''));

console.log(`📊 Total CMS components found: ${allComponents.length}`);

// Get used components from imports
const usedComponents = new Set();

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
        const importMatches = content.match(/import.*from.*components\/cms\/([A-Za-z]*)/g);
        
        if (importMatches) {
          importMatches.forEach(match => {
            const componentMatch = match.match(/components\/cms\/([A-Za-z]*)/);
            if (componentMatch) {
              usedComponents.add(componentMatch[1]);
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
        const importMatches = content.match(/import.*from.*\.\/([A-Za-z]*)/g);
        
        if (importMatches) {
          importMatches.forEach(match => {
            const componentMatch = match.match(/\.\/([A-Za-z]*)/);
            if (componentMatch) {
              usedComponents.add(componentMatch[1]);
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

console.log(`📊 Used components found: ${usedComponents.size}`);

// Find unused components
const unusedComponents = allComponents.filter(component => !usedComponents.has(component));

console.log(`📊 Unused components: ${unusedComponents.length}\n`);

if (unusedComponents.length > 0) {
  console.log('🗑️  Unused components that can be removed:');
  console.log('==========================================');
  
  unusedComponents.forEach(component => {
    console.log(`❌ ${component}.tsx`);
  });
  
  console.log('\n💡 These components are not imported or used in any CMS pages.');
  console.log('   They can be safely removed to clean up the codebase.');
  
  // Create removal script
  const removalScript = unusedComponents.map(component => 
    `rm components/cms/${component}.tsx`
  ).join('\n');
  
  fs.writeFileSync(
    path.join(__dirname, '../scripts/remove-unused-components.sh'), 
    `#!/bin/bash\n# Remove unused CMS components\n\n${removalScript}\n`
  );
  
  console.log('\n📝 Removal script created: scripts/remove-unused-components.sh');
  console.log('   Run this script to remove all unused components.');
  
} else {
  console.log('✅ All components are being used! No cleanup needed.');
}

console.log('\n🎯 Analysis complete!');
