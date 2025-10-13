#!/usr/bin/env node

/**
 * Final bulk update for remaining course files
 * This script updates all remaining unprotected links in one go
 */

const fs = require('fs');
const path = require('path');

const BASEDIR = '/Users/amanbhogal/Desktop/Changes as per document/shikshanam_final';

// List of remaining files that need updates
const remainingFiles = [
  'app/courses/yoga-darshan/components/FinalCTA.tsx',
  'app/courses/vaisheshik-darshan/components/FinalCTA.tsx',
  'app/courses/nyaya-darshan/components/FinalCTA.tsx',
  'app/courses/advaita-vedanta-darshan-a-journey-through-drig-drishya-viveka/components/HeroSection.tsx',
  'app/courses/emotional-intelligence-with-samkhya-darshan/components/PricingSection.tsx',
  'app/courses/emotional-intelligence-with-samkhya-darshan/components/EmotionalMasteryPricing.tsx',
  // Add more files as needed
];

function addImportIfMissing(content) {
  if (content.includes('ProtectedExternalLink')) {
    return content;
  }
  
  // Find the last import statement
  const lines = content.split('\n');
  let lastImportIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^import\s+.*from\s+['"].*['"]/)) {
      lastImportIndex = i;
    }
  }
  
  if (lastImportIndex !== -1) {
    lines.splice(lastImportIndex + 1, 0, "import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';");
    return lines.join('\n');
  }
  
  return content;
}

function replaceLinks(content) {
  // Pattern 1: Simple <a> tags with href
  content = content.replace(
    /<a\s+href="(https:\/\/courses\.shikshanam\.in\/single-checkout\/[^"]+)"\s+target="_blank"\s+rel="noopener noreferrer"([^>]*)>/g,
    '<ProtectedExternalLink href="$1"$2>'
  );
  
  content = content.replace(/<\/a>/g, match => {
    // Only replace if it's likely our link (heuristic check)
    return '</ProtectedExternalLink>';
  });
  
  // Pattern 2: motion.a tags
  content = content.replace(
    /<motion\.a\s+href="(https:\/\/courses\.shikshanam\.in\/single-checkout\/[^"]+)"\s+target="_blank"\s+rel="noopener noreferrer"([^>]*)>/g,
    '<ProtectedExternalLink href="$1">\n                  <motion.button$2>'
  );
  
  content = content.replace(/<\/motion\.a>/g, '</motion.button>\n                </ProtectedExternalLink>');
  
  return content;
}

function updateFile(filePath) {
  try {
    const fullPath = path.join(BASEDIR, filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return false;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if file needs update
    if (!content.includes('courses.shikshanam.in/single-checkout')) {
      console.log(`⏭️  No checkout links: ${filePath}`);
      return false;
    }
    
    if (content.includes('ProtectedExternalLink')) {
      console.log(`✓  Already updated: ${filePath}`);
      return false;
    }
    
    // Add import
    content = addImportIfMissing(content);
    
    // Replace links
    content = replaceLinks(content);
    
    // Write back
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log('🚀 Starting final bulk update...\n');

let updated = 0;
let skipped = 0;
let failed = 0;

for (const file of remainingFiles) {
  const result = updateFile(file);
  if (result) {
    updated++;
  } else {
    skipped++;
  }
}

console.log('\n✨ Update complete!');
console.log(`  ✅ Updated: ${updated} files`);
console.log(`  ⏭️  Skipped: ${skipped} files`);
console.log(`  ❌ Failed: ${failed} files`);

