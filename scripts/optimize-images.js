const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

// Course image URLs and their local destinations
const courseImages = [
  {
    url: 'https://shikshanam.in/wp-content/uploads/2024/12/Acharya-Chanakya-1.png',
    dest: 'chanakya-code.webp',
    alt: 'Chanakya Code Course'
  },
  {
    url: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    dest: 'nyaya-darshan.webp',
    alt: 'Nyaya Darshan Course'
  },
  {
    url: 'https://shikshanam.in/wp-content/uploads/2024/03/Vaisheshik-Darshan.png',
    dest: 'vaisheshik-darshan.webp',
    alt: 'Vaisheshik Darshan Course'
  },
  {
    url: 'https://shikshanam.in/wp-content/uploads/2024/04/1-9-1.png',
    dest: 'isha-upanishad.webp',
    alt: 'Isha Upanishad Course'
  },
  {
    url: 'https://shikshanam.in/wp-content/uploads/2025/03/ALL-course-thumbnail-1.png',
    dest: 'advaita-vedanta.webp',
    alt: 'Advaita Vedanta Course'
  },
  {
    url: 'https://shikshanam.in/wp-content/uploads/2025/06/Emotional-Overwhelm.png',
    dest: 'emotional-intelligence.webp',
    alt: 'Emotional Intelligence Course'
  },
  {
    url: 'https://shikshanam.in/wp-content/uploads/2025/09/Gemini_Generated_Image_x5gurhx5gurhx5gu.png',
    dest: 'durgasaptashi.webp',
    alt: 'Durgasaptashi Course'
  }
];

// Create directory if it doesn't exist
const outputDir = path.join(__dirname, '../public/images/courses');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to download and optimize an image
function downloadAndOptimize(imageObj) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(outputDir, imageObj.dest);
    
    https.get(imageObj.url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        
        // Optimize with sharp
        sharp(buffer)
          .resize(800) // Resize to max width of 800px
          .webp({ quality: 80 }) // Convert to WebP with 80% quality
          .toFile(outputPath)
          .then(() => {
            console.log(`✅ Optimized: ${imageObj.dest}`);
            resolve();
          })
          .catch(err => {
            console.error(`❌ Error optimizing ${imageObj.dest}:`, err);
            reject(err);
          });
      });
    }).on('error', (err) => {
      console.error(`❌ Error downloading ${imageObj.url}:`, err);
      reject(err);
    });
  });
}

// Process all images
async function processAllImages() {
  console.log('🔄 Starting image optimization...');
  
  for (const image of courseImages) {
    try {
      await downloadAndOptimize(image);
    } catch (error) {
      console.error(`Failed to process ${image.dest}:`, error);
    }
  }
  
  console.log('✨ Image optimization complete!');
}

processAllImages();