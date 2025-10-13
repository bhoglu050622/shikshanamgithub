#!/usr/bin/env node

/**
 * Utility script to update course enrollment links to use ProtectedExternalLink
 * This script helps systematically update all course pages to enforce login
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Patterns to find and replace
const patterns = [
  {
    // Pattern 1: Simple anchor tags with external checkout links
    find: /(<a\s+href="https:\/\/courses\.shikshanam\.in\/single-checkout\/[^"]+"\s+target="_blank"\s+rel="noopener noreferrer"[^>]*>)([\s\S]*?)(<\/a>)/g,
    replace: (match, openTag, content, closeTag) => {
      const href = openTag.match(/href="([^"]*)"/)[1];
      const className = openTag.match(/className="([^"]*)"/)?.[1] || '';
      return `<ProtectedExternalLink href="${href}" className="${className}">${content}</ProtectedExternalLink>`;
    }
  },
  {
    // Pattern 2: Anchor tags wrapped around buttons
    find: /<a\s+href="(https:\/\/courses\.shikshanam\.in\/single-checkout\/[^"]+)"\s+target="_blank"\s+rel="noopener noreferrer"\s*>\s*<Button/g,
    replace: '<ProtectedExternalLink href="$1">\n            <Button'
  }
];

// List of course component directories to update
const courseDirectories = [
  'app/courses/*/components',
  'app/courses/**/components'
];

// Function to add import if not present
function addImportIfMissing(content) {
  if (content.includes('ProtectedExternalLink')) {
    return content;
  }
  
  // Find the last import statement
  const importRegex = /import\s+.*?from\s+['"].*?['"]\s*;?\s*\n/g;
  const imports = content.match(importRegex);
  
  if (imports && imports.length > 0) {
    const lastImport = imports[imports.length - 1];
    const lastImportIndex = content.lastIndexOf(lastImport);
    const insertIndex = lastImportIndex + lastImport.length;
    
    const newImport = "import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink'\n";
    return content.slice(0, insertIndex) + newImport + content.slice(insertIndex);
  }
  
  return content;
}

// Function to update file
function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check if file contains checkout links
    if (!content.includes('courses.shikshanam.in/single-checkout')) {
      return false;
    }
    
    // Check if already updated
    if (content.includes('ProtectedExternalLink')) {
      console.log(`  ✓ Already updated: ${filePath}`);
      return false;
    }
    
    // Add import
    content = addImportIfMissing(content);
    
    // Apply patterns
    for (const pattern of patterns) {
      if (content.match(pattern.find)) {
        content = content.replace(pattern.find, pattern.replace);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Updated: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`  ❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Find all course component files
function findCourseFiles() {
  const files = [];
  
  try {
    // Use find command to get all .tsx files in course directories
    const result = execSync(
      'find app/courses -type f -name "*.tsx" | grep -E "(HeroSection|FinalCTA|PricingSection|PricingCards|StickyEnrollBar|CourseInfo)"',
      { encoding: 'utf-8', cwd: path.join(__dirname, '..') }
    );
    
    return result.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error finding files:', error.message);
    return [];
  }
}

// Main execution
console.log('🔍 Finding course files with enrollment links...\n');

const files = findCourseFiles();
console.log(`Found ${files.length} potential course component files\n`);

let updated = 0;
let skipped = 0;

for (const file of files) {
  const fullPath = path.join(__dirname, '..', file);
  if (fs.existsSync(fullPath)) {
    const wasUpdated = updateFile(fullPath);
    if (wasUpdated) {
      updated++;
    } else {
      skipped++;
    }
  }
}

console.log(`\n✨ Update complete!`);
console.log(`  Updated: ${updated} files`);
console.log(`  Skipped: ${skipped} files`);
console.log(`\nNext steps:`);
console.log(`  1. Review the changes with 'git diff'`);
console.log(`  2. Test the enrollment flows`);
console.log(`  3. Commit the changes`);

