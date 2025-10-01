#!/usr/bin/env node

/**
 * Import all existing data into CMS format
 * This script imports courses, packages, schools, blogs, and other content
 */

const { cmsDataImporter } = require('../lib/cms/data-importer.ts');

async function runImport() {
  console.log('🚀 Starting CMS Data Import...');
  console.log('=====================================');

  try {
    // Import all data
    console.log('\n📊 Importing all data...');
    const allData = await cmsDataImporter.importAllData();
    
    console.log('\n✅ Data Import Summary:');
    console.log(`   📚 Courses: ${allData.courses.length}`);
    console.log(`   👨‍🏫 Instructors: ${allData.instructors.length}`);
    console.log(`   🏫 Schools: ${allData.schools.length}`);
    console.log(`   📝 Blogs: ${allData.blogs.length}`);
    console.log(`   💬 Testimonials: ${allData.testimonials.length}`);
    console.log(`   👥 UGC Content: ${allData.ugc.length}`);
    console.log(`   📖 Course Contents: ${Object.keys(allData.courseContents).length}`);

    // Create CMS data structure
    console.log('\n🏗️  Creating CMS data structure...');
    const cmsData = await cmsDataImporter.createCMSDataStructure();
    
    console.log('\n📋 CMS Sections Created:');
    Object.keys(cmsData).forEach(section => {
      console.log(`   ✅ ${section}`);
    });

    // Save to CMS format
    console.log('\n💾 Saving to CMS format...');
    await cmsDataImporter.saveToCMSFormat();
    
    console.log('\n🎉 CMS Data Import Completed Successfully!');
    console.log('\n📁 Data saved to: data/cms-imported/');
    console.log('\n🔗 Next steps:');
    console.log('   1. Review the imported data in data/cms-imported/');
    console.log('   2. Update CMS pages to use the new data structure');
    console.log('   3. Test the CMS functionality with real data');

  } catch (error) {
    console.error('\n❌ Error during import:', error);
    process.exit(1);
  }
}

// Run the import
if (require.main === module) {
  runImport().catch(console.error);
}

module.exports = { runImport };
