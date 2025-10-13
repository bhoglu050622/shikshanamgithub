const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/assets/courses');
const CONFIG_PATH = path.join(__dirname, '../data/course-images.json');

function verifyImages() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  
  console.log('🔍 Verifying downloaded images...\n');
  
  let valid = 0;
  let missing = 0;
  
  for (const [courseId, data] of Object.entries(config.courses)) {
    if (data.thumbnail.startsWith('/assets/courses/')) {
      const filepath = path.join(__dirname, '..', 'public', data.thumbnail);
      if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        console.log(`✓ ${courseId}: ${(stats.size / 1024).toFixed(2)} KB`);
        valid++;
      } else {
        console.log(`✗ ${courseId}: File not found`);
        missing++;
      }
    } else {
      console.log(`⚠ ${courseId}: Using SVG fallback`);
    }
  }
  
  console.log(`\n📊 Results: ${valid} valid, ${missing} missing`);
}

verifyImages();

