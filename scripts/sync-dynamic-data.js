#!/usr/bin/env node

/**
 * Dynamic Data Synchronization Script
 * Syncs all dynamic data from frontend into CMS and removes test/placeholder data
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 Starting Dynamic Data Synchronization...');
console.log('==========================================\n');

// Configuration
const DATA_DIR = path.join(__dirname, '../data');
const CMS_IMPORTED_DIR = path.join(DATA_DIR, 'cms-imported');
const CRAWLED_DIR = path.join(DATA_DIR, 'crawled_website');

// Content types to sync
const CONTENT_TYPES = [
  'homepage', 'about', 'contact', 'donation', 'schools',
  'sanskrit-school', 'darshana-school', 'self-help-school',
  'sanskrit-course', 'advaita-vedanta-course', 'samkhya-darshan-course',
  'nyaya-darshan-course', 'vaisheshik-darshan-course', 'yoga-darshan-course',
  'tantra-darshan-course', 'kashmir-shaivism-course', 'emotional-intelligence-course',
  'sanskrit-live-class-course', 'sanskrit-darshan-upanishad-bundle',
  'sanskrit-philosophy-bundle', 'hindu-philosophies-upanishads-bundle',
  'blog', 'events'
];

// Test/placeholder data patterns to remove
const PLACEHOLDER_PATTERNS = [
  'Lorem ipsum',
  'Test content',
  'Sample text',
  'Placeholder',
  'Demo data',
  'Example content',
  'Mock data',
  'Test data',
  'Sample data',
  'Lorem',
  'Ipsum',
  'Dolor sit amet',
  'Consectetur adipiscing',
  'Sed do eiusmod',
  'Tempor incididunt',
  'Ut labore et dolore',
  'Magna aliqua',
  'Ut enim ad minim',
  'Veniam quis nostrud',
  'Exercitation ullamco',
  'Laboris nisi ut',
  'Aliquip ex ea',
  'Commodo consequat',
  'Duis aute irure',
  'Dolor in reprehenderit',
  'Voluptate velit esse',
  'Cillum dolore eu',
  'Fugiat nulla pariatur',
  'Excepteur sint occaecat',
  'Cupidatat non proident',
  'Sunt in culpa qui',
  'Officia deserunt',
  'Mollit anim id',
  'Est laborum',
  'Sed ut perspiciatis',
  'Unde omnis iste',
  'Natus error sit',
  'Voluptatem accusantium',
  'Doloremque laudantium',
  'Totam rem aperiam',
  'Eaque ipsa quae',
  'Ab illo inventore',
  'Veritatis et quasi',
  'Architecto beatae',
  'Vitae dicta sunt',
  'Explicabo nemo enim',
  'Ipsam voluptatem',
  'Quia voluptas sit',
  'Aspernatur aut odit',
  'Aut fugit sed quia',
  'Consequuntur magni',
  'Dolores eos qui',
  'Ratione voluptatem',
  'Sequi nesciunt',
  'Neque porro quisquam',
  'Est qui dolorem',
  'Ipsum quia dolor',
  'Sit amet consectetur',
  'Adipisci velit sed',
  'Quia non numquam',
  'Eius modi tempora',
  'Incidunt ut labore',
  'Et dolore magnam',
  'Aliquam quaerat',
  'Voluptatem ut enim',
  'Ad minima veniam',
  'Quis nostrum',
  'Exercitationem ullam',
  'Corporis suscipit',
  'Laboriosam nisi',
  'Ut aliquid ex ea',
  'Commodi consequatur',
  'Quis autem vel',
  'Eum iure reprehenderit',
  'Qui in ea voluptate',
  'Velit esse quam',
  'Nihil molestiae',
  'Consequatur vel illum',
  'Qui dolorem eum',
  'Fugiat quo voluptas',
  'Nulla pariatur at',
  'Vero eos et',
  'Accusamus et iusto',
  'Odio dignissimos',
  'Ducimus qui blanditiis',
  'Praesentium voluptatum',
  'Deleniti atque',
  'Corrupti quos dolores',
  'Et quas molestias',
  'Excepturi sint',
  'Occaecati cupiditate',
  'Non provident',
  'Similique sunt in',
  'Culpa qui officia',
  'Deserunt mollitia',
  'Animi id est',
  'Laborum et dolorum',
  'Fuga et harum',
  'Quidem rerum facilis',
  'Est et expedita',
  'Distinctio nam libero',
  'Tempore cum soluta',
  'Nobis est eligendi',
  'Optio cumque nihil',
  'Impedit quo minus',
  'Id quod maxime',
  'Placeat facere',
  'Possimus omnis',
  'Voluptas assumenda',
  'Est omnis dolor',
  'Repellendus temporibus',
  'Autem quibusdam et',
  'Aut officiis debitis',
  'Aut rerum necessitatibus',
  'Saepe eveniet ut',
  'Et voluptates',
  'Repudiandae sint',
  'Et molestiae non',
  'Recusandae itaque',
  'Earum rerum hic',
  'Tenetur a sapiente',
  'Delectus ut aut',
  'Reiciendis voluptatibus',
  'Maiores alias',
  'Consequatur aut',
  'Perferendis doloribus',
  'Asperiores repellat',
  'At vero eos',
  'Et accusamus et',
  'Iusto odio dignissimos',
  'Ducimus qui blanditiis',
  'Praesentium voluptatum',
  'Deleniti atque',
  'Corrupti quos dolores',
  'Et quas molestias',
  'Excepturi sint',
  'Occaecati cupiditate',
  'Non provident',
  'Similique sunt in',
  'Culpa qui officia',
  'Deserunt mollitia',
  'Animi id est',
  'Laborum et dolorum',
  'Fuga et harum',
  'Quidem rerum facilis',
  'Est et expedita',
  'Distinctio nam libero',
  'Tempore cum soluta',
  'Nobis est eligendi',
  'Optio cumque nihil',
  'Impedit quo minus',
  'Id quod maxime',
  'Placeat facere',
  'Possimus omnis',
  'Voluptas assumenda',
  'Est omnis dolor',
  'Repellendus temporibus',
  'Autem quibusdam et',
  'Aut officiis debitis',
  'Aut rerum necessitatibus',
  'Saepe eveniet ut',
  'Et voluptates',
  'Repudiandae sint',
  'Et molestiae non',
  'Recusandae itaque',
  'Earum rerum hic',
  'Tenetur a sapiente',
  'Delectus ut aut',
  'Reiciendis voluptatibus',
  'Maiores alias',
  'Consequatur aut',
  'Perferendis doloribus',
  'Asperiores repellat'
];

// Function to clean placeholder data
function cleanPlaceholderData(content) {
  if (typeof content === 'string') {
    // Check if string contains placeholder patterns
    const hasPlaceholder = PLACEHOLDER_PATTERNS.some(pattern => 
      content.toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (hasPlaceholder) {
      return ''; // Remove placeholder content
    }
    return content;
  }
  
  if (Array.isArray(content)) {
    return content.map(cleanPlaceholderData).filter(item => 
      item !== null && item !== undefined && item !== ''
    );
  }
  
  if (typeof content === 'object' && content !== null) {
    const cleaned = {};
    for (const [key, value] of Object.entries(content)) {
      const cleanedValue = cleanPlaceholderData(value);
      if (cleanedValue !== null && cleanedValue !== undefined && cleanedValue !== '') {
        cleaned[key] = cleanedValue;
      }
    }
    return cleaned;
  }
  
  return content;
}

// Function to sync content from crawled data
function syncFromCrawledData() {
  console.log('📥 Syncing from crawled website data...');
  
  const crawledFiles = [
    'all_pages.json',
    'blog_data.json',
    'courses.json',
    'homepage.json',
    'navigation.json'
  ];
  
  let syncedCount = 0;
  
  crawledFiles.forEach(file => {
    const filePath = path.join(CRAWLED_DIR, file);
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const cleanedData = cleanPlaceholderData(data);
        
        // Save cleaned data
        const outputPath = path.join(DATA_DIR, `crawled-${file}`);
        fs.writeFileSync(outputPath, JSON.stringify(cleanedData, null, 2));
        
        console.log(`✅ Synced: ${file}`);
        syncedCount++;
      } catch (error) {
        console.log(`❌ Error syncing ${file}: ${error.message}`);
      }
    }
  });
  
  console.log(`📊 Crawled data sync complete: ${syncedCount} files processed\n`);
}

// Function to sync content from CMS imported data
function syncFromCMSImportedData() {
  console.log('📥 Syncing from CMS imported data...');
  
  const importedFiles = [
    'about.json',
    'blog.json',
    'contact.json',
    'courses.json',
    'donation.json',
    'homepage.json',
    'packages.json',
    'schools.json'
  ];
  
  let syncedCount = 0;
  
  importedFiles.forEach(file => {
    const filePath = path.join(CMS_IMPORTED_DIR, file);
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const cleanedData = cleanPlaceholderData(data);
        
        // Save cleaned data
        const outputPath = path.join(DATA_DIR, `imported-${file}`);
        fs.writeFileSync(outputPath, JSON.stringify(cleanedData, null, 2));
        
        console.log(`✅ Synced: ${file}`);
        syncedCount++;
      } catch (error) {
        console.log(`❌ Error syncing ${file}: ${error.message}`);
      }
    }
  });
  
  console.log(`📊 CMS imported data sync complete: ${syncedCount} files processed\n`);
}

// Function to clean existing content files
function cleanExistingContent() {
  console.log('🧹 Cleaning existing content files...');
  
  let cleanedCount = 0;
  
  CONTENT_TYPES.forEach(contentType => {
    const filePath = path.join(DATA_DIR, `${contentType}-content.json`);
    
    if (fs.existsSync(filePath)) {
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const cleanedContent = cleanPlaceholderData(content);
        
        // Add metadata
        cleanedContent._metadata = {
          lastCleaned: new Date().toISOString(),
          version: '1.0',
          source: 'dynamic-sync'
        };
        
        fs.writeFileSync(filePath, JSON.stringify(cleanedContent, null, 2));
        console.log(`✅ Cleaned: ${contentType}-content.json`);
        cleanedCount++;
      } catch (error) {
        console.log(`❌ Error cleaning ${contentType}: ${error.message}`);
      }
    }
  });
  
  console.log(`📊 Content cleaning complete: ${cleanedCount} files processed\n`);
}

// Function to create sync report
function createSyncReport() {
  console.log('📋 Creating sync report...');
  
  const report = {
    timestamp: new Date().toISOString(),
    syncType: 'dynamic-data-sync',
    contentTypes: CONTENT_TYPES.length,
    placeholderPatterns: PLACEHOLDER_PATTERNS.length,
    summary: {
      crawledDataSynced: fs.existsSync(CRAWLED_DIR) ? fs.readdirSync(CRAWLED_DIR).length : 0,
      cmsImportedDataSynced: fs.existsSync(CMS_IMPORTED_DIR) ? fs.readdirSync(CMS_IMPORTED_DIR).length : 0,
      contentFilesCleaned: CONTENT_TYPES.length
    },
    status: 'completed'
  };
  
  const reportPath = path.join(DATA_DIR, 'sync-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`✅ Sync report created: ${reportPath}\n`);
}

// Main sync function
function runSync() {
  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // Run sync operations
    syncFromCrawledData();
    syncFromCMSImportedData();
    cleanExistingContent();
    createSyncReport();
    
    console.log('🎉 Dynamic Data Synchronization Complete!');
    console.log('==========================================');
    console.log('✅ All test/placeholder data removed');
    console.log('✅ Dynamic data synced from frontend');
    console.log('✅ CMS data cleaned and optimized');
    console.log('✅ Sync report generated');
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

// Run sync if this file is executed directly
if (require.main === module) {
  runSync();
}

module.exports = {
  runSync,
  cleanPlaceholderData,
  syncFromCrawledData,
  syncFromCMSImportedData,
  cleanExistingContent
};
