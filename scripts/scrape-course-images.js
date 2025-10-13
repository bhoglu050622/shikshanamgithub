const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Course mapping: internal course ID -> shikshanam.in URL
const courseUrls = {
  'chanakya-code': 'https://shikshanam.in/chanakya-code/',
  'nyaya-darshan': 'https://shikshanam.in/nyaya-darshan-course/',
  'samkhya-darshan': 'https://shikshanam.in/samkhya-darshan-course/',
  'yoga-darshan': 'https://shikshanam.in/yoga-darshan-course/',
  'vaisheshik-darshan': 'https://shikshanam.in/vaisheshik-darshan-course/',
  'advaita-vedanta': 'https://shikshanam.in/advaita-vedanta-course/',
  'emotional-intelligence': 'https://shikshanam.in/emotional-intelligence-course/',
  'prashna-upanishad': 'https://shikshanam.in/prashna-upanishad-course/',
  'isha-upanishad': 'https://shikshanam.in/isha-upanishad-course/',
  'sanskrit-course': 'https://shikshanam.in/sanskrit-course/',
  'kashmir-shaivism': 'https://shikshanam.in/kashmir-shaivism-course/'
};

// Fallback mapping for SVGs
const fallbackMap = {
  'chanakya-code': '/assets/comics/basics.svg',
  'nyaya-darshan': '/assets/comics/nyaya.svg',
  'samkhya-darshan': '/assets/comics/samkhya.svg',
  'yoga-darshan': '/assets/comics/yoga.svg',
  'vaisheshik-darshan': '/assets/comics/vaisheshika.svg',
  'advaita-vedanta': '/assets/comics/vedanta.svg',
  'emotional-intelligence': '/assets/comics/samkhya.svg',
  'prashna-upanishad': '/assets/comics/vedanta.svg',
  'isha-upanishad': '/assets/comics/vedanta.svg',
  'sanskrit-course': '/assets/comics/basics.svg',
  'kashmir-shaivism': '/assets/comics/yoga.svg'
};

const OUTPUT_DIR = path.join(__dirname, '../public/assets/courses');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Download image from URL
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve(filepath);
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Scrape images from a course page
async function scrapeCourseImages(courseId, url) {
  try {
    console.log(`\nScraping: ${courseId} from ${url}`);
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    const images = [];
    
    // Look for featured images, og:image, course thumbnails
    const ogImage = $('meta[property="og:image"]').attr('content');
    const featuredImage = $('.course-thumbnail img, .featured-image img, .course-image img').first().attr('src');
    const headerImage = $('.hero-image img, .course-header img').first().attr('src');
    
    // Collect all potential images
    if (ogImage) images.push(ogImage);
    if (featuredImage) images.push(featuredImage);
    if (headerImage) images.push(headerImage);
    
    // Filter and clean URLs
    const validImages = images
      .filter(img => img && img.trim())
      .map(img => img.trim())
      .filter(img => img.startsWith('http') || img.startsWith('//'))
      .map(img => img.startsWith('//') ? 'https:' + img : img);
    
    if (validImages.length === 0) {
      console.log(`⚠ No images found for ${courseId}`);
      return null;
    }
    
    // Download the first valid image
    const imageUrl = validImages[0];
    const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
    const filename = `${courseId}${ext}`;
    const filepath = path.join(OUTPUT_DIR, filename);
    
    await downloadImage(imageUrl, filepath);
    
    return `/assets/courses/${filename}`;
  } catch (error) {
    console.error(`✗ Error scraping ${courseId}:`, error.message);
    return null;
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting image scraping...\n');
  
  const results = {};
  
  for (const [courseId, url] of Object.entries(courseUrls)) {
    const localPath = await scrapeCourseImages(courseId, url);
    
    results[courseId] = {
      thumbnail: localPath || fallbackMap[courseId],
      hero: localPath || fallbackMap[courseId],
      fallback: fallbackMap[courseId]
    };
    
    // Rate limiting - wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Update course-images.json
  const outputJsonPath = path.join(__dirname, '../data/course-images.json');
  const existingData = JSON.parse(fs.readFileSync(outputJsonPath, 'utf8'));
  
  existingData.courses = results;
  
  fs.writeFileSync(outputJsonPath, JSON.stringify(existingData, null, 2));
  
  console.log('\n✅ Image scraping complete!');
  console.log(`📁 Images saved to: ${OUTPUT_DIR}`);
  console.log(`📝 Updated: data/course-images.json`);
  
  // Print summary
  console.log('\n📊 Summary:');
  const downloaded = Object.values(results).filter(r => r.thumbnail.startsWith('/assets/courses/')).length;
  const fallbacks = Object.values(results).filter(r => r.thumbnail.startsWith('/assets/comics/')).length;
  console.log(`   Downloaded: ${downloaded}`);
  console.log(`   Using fallbacks: ${fallbacks}`);
}

main().catch(console.error);

