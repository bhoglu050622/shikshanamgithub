#!/usr/bin/env node

/**
 * Fetch Frontend Data Script
 * This script fetches real-time data from the live frontend and populates CMS editors
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const LIVE_URL = 'https://shikshanamgithub.vercel.app';
const LOCAL_URL = 'http://localhost:3001';
const DATA_DIR = path.join(__dirname, '../data');

// Page mappings - maps frontend pages to their corresponding JSON files
const PAGE_MAPPINGS = {
  // Main pages
  '/': 'homepage-content.json',
  '/about': 'about-content.json',
  '/contact': 'contact-content.json',
  '/accessibility': 'accessibility-content.json',
  '/account': 'account-content.json',
  '/privacy': 'privacy-content.json',
  '/terms': 'terms-content.json',
  '/help': 'help-content.json',
  
  // Courses
  '/courses': 'courses-content.json',
  '/courses/sanskrit-beginner': 'sanskrit-beginner-course-content.json',
  '/courses/sanskrit-course': 'sanskrit-course-content.json',
  '/courses/sanskrit-live-class': 'sanskrit-live-class-course-content.json',
  '/courses/advaita-vedanta-darshan-a-journey-through-drig-drishya-viveka': 'advaita-vedanta-course-content.json',
  '/courses/chanakya-code': 'chanakya-code-course-content.json',
  '/courses/emotional-intelligence-with-samkhya-darshan': 'emotional-intelligence-course-content.json',
  '/courses/isha-upanishad': 'isha-upanishad-course-content.json',
  '/courses/kashmir-shaivism': 'kashmir-shaivism-course-content.json',
  '/courses/nyaya-darshan': 'nyaya-darshan-course-content.json',
  '/courses/prashna-upanishad': 'prashna-upanishad-course-content.json',
  '/courses/samkhya-darshan': 'samkhya-darshan-course-content.json',
  '/courses/tantra-darshan': 'tantra-darshan-course-content.json',
  '/courses/vaisheshik-darshan': 'vaisheshik-darshan-course-content.json',
  '/courses/yoga-advanced': 'yoga-advanced-course-content.json',
  '/courses/yoga-darshan': 'yoga-darshan-course-content.json',
  
  // Schools
  '/schools': 'schools-content.json',
  '/schools/sanskrit': 'sanskrit-school-content.json',
  '/schools/darshana': 'darshana-school-content.json',
  '/schools/vedanta': 'vedanta-school-content.json',
  '/schools/yoga': 'yoga-school-content.json',
  '/schools/samkhya': 'samkhya-school-content.json',
  '/schools/nyaya': 'nyaya-school-content.json',
  '/schools/vaisheshika': 'vaisheshika-school-content.json',
  '/schools/mimamsa': 'mimamsa-school-content.json',
  '/schools/self-help': 'self-help-school-content.json',
  
  // Packages
  '/packages': 'packages-content.json',
  '/packages/sanskrit-basics': 'sanskrit-basics-package.json',
  '/packages/philosophy-foundations': 'philosophy-foundations-package.json',
  '/packages/self-help-wisdom': 'self-help-wisdom-package.json',
  '/packages/para-bundle': 'para-bundle-package.json',
  '/packages/para-apara-bundle': 'para-apara-bundle-package.json',
  '/packages/hindu-philosophies-upanishads-bundle': 'package-hindu-philosophies-upanishads-bundle-content.json',
  '/packages/sanskrit-darshan-upanishad-bundle': 'sanskrit-darshan-upanishad-bundle-content.json',
  
  // Tools
  '/tools': 'tools-content.json',
  '/tools/keyboard': 'tools-keyboard-content.json',
  '/tools/sandhi': 'tools-sandhi-content.json',
  
  // Practice
  '/practice/sanskrit': 'practice-sanskrit-content.json',
  
  // Glossaries
  '/glossaries/sanskrit': 'glossaries-content.json',
  
  // Community
  '/gurus': 'gurus-content.json',
  '/blog': 'blog-content.json',
  '/blogs/sanskrit': 'blogs-sanskrit-content.json',
  
  // Events & Activities
  '/events': 'events-content.json',
  '/donation': 'donation-content.json',
  '/career': 'career-content.json',
  
  // Assessment & Wisdom
  '/guna-profiler': 'guna-profiler-content.json',
  '/how-aligned-are-you': 'alignment-assessment-content.json',
  '/dharma-path': 'dharma-path-content.json',
  '/wisdom': 'wisdom-content.json'
};

/**
 * Fetch content from a URL
 */
async function fetchContent(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');
    
    protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data,
          headers: res.headers
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Extract structured data from HTML content
 */
function extractPageData(html, url) {
  const data = {
    url: url,
    title: '',
    description: '',
    content: {},
    metadata: {},
    timestamp: new Date().toISOString()
  };
  
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    data.title = titleMatch[1].trim();
  }
  
  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (descMatch) {
    data.description = descMatch[1].trim();
  }
  
  // Extract structured content based on page type
  if (url.includes('/courses/')) {
    data.content = extractCourseData(html);
  } else if (url.includes('/schools/')) {
    data.content = extractSchoolData(html);
  } else if (url.includes('/packages/')) {
    data.content = extractPackageData(html);
  } else if (url.includes('/tools/')) {
    data.content = extractToolData(html);
  } else {
    data.content = extractGenericPageData(html);
  }
  
  return data;
}

/**
 * Extract course-specific data
 */
function extractCourseData(html) {
  return {
    courseInfo: {
      title: extractText(html, 'h1'),
      description: extractText(html, '.course-description, .description'),
      instructor: extractText(html, '.instructor, .teacher'),
      duration: extractText(html, '.duration, .time'),
      price: extractText(html, '.price, .cost'),
      rating: extractText(html, '.rating, .stars')
    },
    sections: extractSections(html),
    features: extractFeatures(html),
    testimonials: extractTestimonials(html)
  };
}

/**
 * Extract school-specific data
 */
function extractSchoolData(html) {
  return {
    schoolInfo: {
      title: extractText(html, 'h1'),
      description: extractText(html, '.school-description, .description'),
      philosophy: extractText(html, '.philosophy, .approach'),
      benefits: extractText(html, '.benefits, .advantages')
    },
    courses: extractCourses(html),
    teachers: extractTeachers(html)
  };
}

/**
 * Extract package-specific data
 */
function extractPackageData(html) {
  return {
    packageInfo: {
      title: extractText(html, 'h1'),
      description: extractText(html, '.package-description, .description'),
      price: extractText(html, '.price, .cost'),
      value: extractText(html, '.value, .worth')
    },
    included: extractIncludedItems(html),
    benefits: extractBenefits(html)
  };
}

/**
 * Extract tool-specific data
 */
function extractToolData(html) {
  return {
    toolInfo: {
      title: extractText(html, 'h1'),
      description: extractText(html, '.tool-description, .description'),
      features: extractText(html, '.features, .capabilities')
    },
    usage: extractUsage(html),
    examples: extractExamples(html)
  };
}

/**
 * Extract generic page data
 */
function extractGenericPageData(html) {
  return {
    pageInfo: {
      title: extractText(html, 'h1'),
      description: extractText(html, '.description, .intro'),
      content: extractText(html, '.content, .main-content')
    },
    sections: extractSections(html),
    features: extractFeatures(html)
  };
}

/**
 * Helper function to extract text from HTML
 */
function extractText(html, selector) {
  // Simple regex-based extraction (in a real implementation, you'd use a proper HTML parser)
  const regex = new RegExp(`<[^>]*class=["']?[^"']*${selector.replace('.', '')}[^"']*["']?[^>]*>([^<]+)<`, 'i');
  const match = html.match(regex);
  return match ? match[1].trim() : '';
}

/**
 * Extract sections from HTML
 */
function extractSections(html) {
  const sections = [];
  const sectionRegex = /<section[^>]*>([\s\S]*?)<\/section>/gi;
  let match;
  
  while ((match = sectionRegex.exec(html)) !== null) {
    const sectionContent = match[1];
    const title = extractText(sectionContent, 'h2, h3');
    if (title) {
      sections.push({
        title: title,
        content: sectionContent.replace(/<[^>]*>/g, '').trim().substring(0, 200) + '...'
      });
    }
  }
  
  return sections;
}

/**
 * Extract features from HTML
 */
function extractFeatures(html) {
  const features = [];
  const featureRegex = /<li[^>]*>([^<]+)<\/li>/gi;
  let match;
  
  while ((match = featureRegex.exec(html)) !== null) {
    const feature = match[1].trim();
    if (feature.length > 10 && feature.length < 100) {
      features.push(feature);
    }
  }
  
  return features.slice(0, 10); // Limit to 10 features
}

/**
 * Extract testimonials from HTML
 */
function extractTestimonials(html) {
  const testimonials = [];
  const testimonialRegex = /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi;
  let match;
  
  while ((match = testimonialRegex.exec(html)) !== null) {
    const content = match[1].replace(/<[^>]*>/g, '').trim();
    if (content.length > 20) {
      testimonials.push({
        text: content.substring(0, 200) + '...',
        author: extractText(match[1], '.author, .name')
      });
    }
  }
  
  return testimonials.slice(0, 5); // Limit to 5 testimonials
}

/**
 * Extract courses from HTML
 */
function extractCourses(html) {
  const courses = [];
  const courseRegex = /<div[^>]*class=["']?[^"']*course[^"']*["']?[^>]*>([\s\S]*?)<\/div>/gi;
  let match;
  
  while ((match = courseRegex.exec(html)) !== null) {
    const title = extractText(match[1], 'h3, h4');
    if (title) {
      courses.push({
        title: title,
        description: extractText(match[1], '.description')
      });
    }
  }
  
  return courses.slice(0, 5); // Limit to 5 courses
}

/**
 * Extract teachers from HTML
 */
function extractTeachers(html) {
  const teachers = [];
  const teacherRegex = /<div[^>]*class=["']?[^"']*teacher[^"']*["']?[^>]*>([\s\S]*?)<\/div>/gi;
  let match;
  
  while ((match = teacherRegex.exec(html)) !== null) {
    const name = extractText(match[1], 'h3, h4');
    if (name) {
      teachers.push({
        name: name,
        description: extractText(match[1], '.description, .bio')
      });
    }
  }
  
  return teachers.slice(0, 3); // Limit to 3 teachers
}

/**
 * Extract included items from HTML
 */
function extractIncludedItems(html) {
  const items = [];
  const itemRegex = /<li[^>]*>([^<]+)<\/li>/gi;
  let match;
  
  while ((match = itemRegex.exec(html)) !== null) {
    const item = match[1].trim();
    if (item.length > 5 && item.length < 100) {
      items.push(item);
    }
  }
  
  return items.slice(0, 10); // Limit to 10 items
}

/**
 * Extract benefits from HTML
 */
function extractBenefits(html) {
  return extractFeatures(html); // Same logic as features
}

/**
 * Extract usage information from HTML
 */
function extractUsage(html) {
  return {
    instructions: extractText(html, '.instructions, .how-to-use'),
    examples: extractExamples(html)
  };
}

/**
 * Extract examples from HTML
 */
function extractExamples(html) {
  const examples = [];
  const exampleRegex = /<code[^>]*>([^<]+)<\/code>/gi;
  let match;
  
  while ((match = exampleRegex.exec(html)) !== null) {
    examples.push(match[1].trim());
  }
  
  return examples.slice(0, 5); // Limit to 5 examples
}

/**
 * Save data to JSON file
 */
function saveData(filename, data) {
  const filepath = path.join(DATA_DIR, filename);
  const jsonData = JSON.stringify(data, null, 2);
  
  try {
    fs.writeFileSync(filepath, jsonData, 'utf8');
    console.log(`✅ Saved: ${filename}`);
    return true;
  } catch (error) {
    console.error(`❌ Error saving ${filename}:`, error.message);
    return false;
  }
}

/**
 * Main function to fetch all frontend data
 */
async function fetchAllFrontendData() {
  console.log('🚀 Starting frontend data fetch...');
  console.log(`📡 Target URL: ${LIVE_URL}`);
  console.log(`📁 Data directory: ${DATA_DIR}`);
  
  const results = {
    success: 0,
    failed: 0,
    total: Object.keys(PAGE_MAPPINGS).length
  };
  
  for (const [pagePath, jsonFile] of Object.entries(PAGE_MAPPINGS)) {
    try {
      console.log(`\n📄 Fetching: ${pagePath} → ${jsonFile}`);
      
      const url = `${LIVE_URL}${pagePath}`;
      const response = await fetchContent(url);
      
      if (response.status === 200) {
        const pageData = extractPageData(response.data, pagePath);
        const saved = saveData(jsonFile, pageData);
        
        if (saved) {
          results.success++;
          console.log(`✅ Success: ${pagePath}`);
        } else {
          results.failed++;
          console.log(`❌ Failed to save: ${pagePath}`);
        }
      } else {
        console.log(`❌ HTTP ${response.status}: ${pagePath}`);
        results.failed++;
      }
      
      // Add delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error fetching ${pagePath}:`, error.message);
      results.failed++;
    }
  }
  
  console.log('\n📊 Fetch Results:');
  console.log(`✅ Successful: ${results.success}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Total: ${results.total}`);
  console.log(`📊 Success Rate: ${((results.success / results.total) * 100).toFixed(1)}%`);
  
  return results;
}

// Run the script
if (require.main === module) {
  fetchAllFrontendData()
    .then((results) => {
      console.log('\n🎉 Frontend data fetch completed!');
      process.exit(results.failed === 0 ? 0 : 1);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = {
  fetchAllFrontendData,
  extractPageData,
  PAGE_MAPPINGS
};
