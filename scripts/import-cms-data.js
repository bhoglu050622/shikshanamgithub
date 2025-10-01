#!/usr/bin/env node

/**
 * Import all existing data into CMS format
 * This script imports courses, packages, schools, blogs, and other content
 */

const fs = require('fs');
const path = require('path');

// Data importer class
class CMSDataImporter {
  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
    this.processedDir = path.join(this.dataDir, 'processed');
  }

  // Import all courses data
  async importCoursesData() {
    try {
      const coursesPath = path.join(this.processedDir, 'courses.json');
      if (fs.existsSync(coursesPath)) {
        const data = fs.readFileSync(coursesPath, 'utf8');
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error('Error importing courses data:', error);
      return [];
    }
  }

  // Import instructors data
  async importInstructorsData() {
    try {
      const instructorsPath = path.join(this.processedDir, 'instructors.json');
      if (fs.existsSync(instructorsPath)) {
        const data = fs.readFileSync(instructorsPath, 'utf8');
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error('Error importing instructors data:', error);
      return [];
    }
  }

  // Import specific course content
  async importCourseContent(courseId) {
    try {
      const courseContentFiles = [
        'advaita-vedanta-course-content.json',
        'sanskrit-darshan-upanishad-bundle-content.json'
      ];

      for (const file of courseContentFiles) {
        const filePath = path.join(this.dataDir, file);
        if (fs.existsSync(filePath)) {
          const data = fs.readFileSync(filePath, 'utf8');
          const content = JSON.parse(data);
          if (content.id === courseId || file.includes(courseId)) {
            return content;
          }
        }
      }
      return null;
    } catch (error) {
      console.error(`Error importing course content for ${courseId}:`, error);
      return null;
    }
  }

  // Import school data
  async importSchoolData() {
    try {
      const schoolFiles = [
        'sanskrit-school-content.json',
        'darshana-school-content.json',
        'self-help-school-content.json',
        'schools-content.json'
      ];

      const schools = [];

      for (const file of schoolFiles) {
        const filePath = path.join(this.dataDir, file);
        if (fs.existsSync(filePath)) {
          const data = fs.readFileSync(filePath, 'utf8');
          const content = JSON.parse(data);
          schools.push(content);
        }
      }

      return schools;
    } catch (error) {
      console.error('Error importing school data:', error);
      return [];
    }
  }

  // Import blog data
  async importBlogData() {
    try {
      const blogFiles = [
        'blog-content.json',
        'blog_data.json'
      ];

      const blogs = [];

      for (const file of blogFiles) {
        const filePath = path.join(this.dataDir, file);
        if (fs.existsSync(filePath)) {
          const data = fs.readFileSync(filePath, 'utf8');
          const content = JSON.parse(data);
          if (Array.isArray(content)) {
            blogs.push(...content);
          } else {
            blogs.push(content);
          }
        }
      }

      return blogs;
    } catch (error) {
      console.error('Error importing blog data:', error);
      return [];
    }
  }

  // Import testimonials data
  async importTestimonialsData() {
    try {
      const testimonialsPath = path.join(this.dataDir, 'testimonials.json');
      if (fs.existsSync(testimonialsPath)) {
        const data = fs.readFileSync(testimonialsPath, 'utf8');
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.error('Error importing testimonials data:', error);
      return [];
    }
  }

  // Import UGC content
  async importUGCData() {
    try {
      const ugcPath = path.join(this.dataDir, 'ugc_content.json');
      if (fs.existsSync(ugcPath)) {
        const data = fs.readFileSync(ugcPath, 'utf8');
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.error('Error importing UGC data:', error);
      return [];
    }
  }

  // Import all data and create comprehensive CMS structure
  async importAllData() {
    console.log('Starting comprehensive data import...');

    const [
      courses,
      instructors,
      schools,
      blogs,
      testimonials,
      ugc
    ] = await Promise.all([
      this.importCoursesData(),
      this.importInstructorsData(),
      this.importSchoolData(),
      this.importBlogData(),
      this.importTestimonialsData(),
      this.importUGCData()
    ]);

    // Import specific course contents
    const courseContents = {};
    const courseIds = [
      'advaita-vedanta-course',
      'sanskrit-darshan-upanishad-bundle',
      'emotional-intelligence',
      'isha-upanishad',
      'kashmir-shaivism',
      'nyaya-darshan',
      'prashna-upanishad',
      'samkhya-darshan',
      'sanskrit-course',
      'tantra-darshan',
      'vaisheshik-darshan',
      'yoga-darshan'
    ];

    for (const courseId of courseIds) {
      const content = await this.importCourseContent(courseId);
      if (content) {
        courseContents[courseId] = content;
      }
    }

    console.log('Data import completed:', {
      courses: courses.length,
      instructors: instructors.length,
      schools: schools.length,
      blogs: blogs.length,
      testimonials: testimonials.length,
      ugc: ugc.length,
      courseContents: Object.keys(courseContents).length
    });

    return {
      courses,
      instructors,
      schools,
      blogs,
      testimonials,
      ugc,
      courseContents
    };
  }

  // Create CMS-ready data structure
  async createCMSDataStructure() {
    const allData = await this.importAllData();

    return {
      // Homepage sections
      homepage: {
        hero: {
          title: "Welcome to Shikshanam",
          subtitle: "Where AI meets Ancient India",
          description: "Preserving and sharing ancient Indian wisdom with the modern world"
        },
        featuredCourses: allData.courses.filter(course => course.featured).slice(0, 6),
        liveClasses: allData.courses.filter(course => course.type === 'live').slice(0, 3),
        selfPacedCourses: allData.courses.filter(course => course.type === 'self-paced').slice(0, 3),
        schools: allData.schools,
        instructors: allData.instructors.slice(0, 6),
        testimonials: (allData.testimonials || []).slice(0, 5),
        communityPosts: (allData.ugc || []).slice(0, 4)
      },

      // Courses page
      courses: {
        allCourses: allData.courses,
        categories: [...new Set(allData.courses.map(course => course.category))],
        featuredCourses: allData.courses.filter(course => course.featured),
        newCourses: allData.courses.filter(course => course.type === 'new'),
        freeCourses: allData.courses.filter(course => course.type === 'free')
      },

      // Packages page
      packages: {
        bundles: [
          {
            id: 'sanskrit-darshan-upanishad-bundle',
            title: 'Sanskrit + Darshan + Upanishad Bundle',
            description: 'Complete learning journey with 7 courses',
            price: '₹9,999',
            originalPrice: '₹15,000',
            discount: '33%',
            courses: ['sanskrit-course', 'nyaya-darshan', 'vaisheshik-darshan', 'samkhya-darshan', 'yoga-darshan', 'vedanta-darshan', 'mimamsa-darshan']
          }
        ]
      },

      // Schools pages
      schools: {
        sanskrit: allData.schools.find(school => school.id === 'sanskrit') || allData.schools[0],
        darshan: allData.schools.find(school => school.id === 'darshan') || allData.schools[1],
        lifeSkills: allData.schools.find(school => school.id === 'life-skills') || allData.schools[2]
      },

      // Individual course pages
      coursePages: allData.courseContents,

      // Blog page
      blog: {
        posts: allData.blogs,
        categories: [...new Set((allData.blogs || []).map(blog => blog.category).filter(Boolean))],
        featuredPosts: (allData.blogs || []).filter(blog => blog.featured).slice(0, 3)
      },

      // About page
      about: {
        mission: "To make ancient Indian wisdom accessible to everyone through modern technology",
        vision: "A world where ancient wisdom and modern knowledge work together",
        team: allData.instructors,
        story: "Founded in 2020, Shikshanam began as a small team of Sanskrit scholars and technology enthusiasts",
        achievements: {
          students: "10,000+",
          courses: "50+",
          countries: "25+",
          satisfaction: "98%"
        }
      },

      // Contact page
      contact: {
        address: "Delhi, India",
        phone: "+91-9910032165",
        email: "support@shikshanam.in",
        hours: "Monday to Saturday 11AM – 6PM"
      },

      // Donation page
      donation: {
        hero: {
          title: "Support Our Mission",
          subtitle: "Help us preserve and share ancient Indian wisdom"
        },
        impact: {
          raised: "₹50L+",
          supporters: "2000+",
          projects: "25+"
        },
        causes: [
          {
            title: "Sanskrit Preservation",
            description: "Digitize ancient manuscripts",
            progress: 75
          },
          {
            title: "Teacher Training",
            description: "Train rural teachers",
            progress: 45
          },
          {
            title: "Mobile Learning",
            description: "Develop learning apps",
            progress: 90
          }
        ]
      }
    };
  }

  // Save imported data to CMS format
  async saveToCMSFormat() {
    try {
      const cmsData = await this.createCMSDataStructure();
      
      // Create CMS data directory if it doesn't exist
      const cmsDataDir = path.join(this.dataDir, 'cms-imported');
      if (!fs.existsSync(cmsDataDir)) {
        fs.mkdirSync(cmsDataDir, { recursive: true });
      }

      // Save each section as separate files
      const sections = [
        'homepage',
        'courses',
        'packages',
        'schools',
        'coursePages',
        'blog',
        'about',
        'contact',
        'donation'
      ];

      for (const section of sections) {
        const filePath = path.join(cmsDataDir, `${section}.json`);
        fs.writeFileSync(filePath, JSON.stringify(cmsData[section], null, 2));
      }

      // Save complete data structure
      const completePath = path.join(cmsDataDir, 'complete-cms-data.json');
      fs.writeFileSync(completePath, JSON.stringify(cmsData, null, 2));

      console.log('CMS data saved successfully to:', cmsDataDir);
    } catch (error) {
      console.error('Error saving CMS data:', error);
    }
  }
}

async function runImport() {
  console.log('🚀 Starting CMS Data Import...');
  console.log('=====================================');

  try {
    const importer = new CMSDataImporter();
    
    // Import all data
    console.log('\n📊 Importing all data...');
    const allData = await importer.importAllData();
    
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
    const cmsData = await importer.createCMSDataStructure();
    
    console.log('\n📋 CMS Sections Created:');
    Object.keys(cmsData).forEach(section => {
      console.log(`   ✅ ${section}`);
    });

    // Save to CMS format
    console.log('\n💾 Saving to CMS format...');
    await importer.saveToCMSFormat();
    
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