const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/assets/courses');

async function optimizeImages() {
  console.log('🎨 Starting image optimization...\n');
  
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log('⚠ No images directory found. Run scrape-images first.');
    return;
  }
  
  const files = fs.readdirSync(IMAGES_DIR);
  
  if (files.length === 0) {
    console.log('⚠ No images found to optimize.');
    return;
  }
  
  let optimized = 0;
  let skipped = 0;
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      skipped++;
      continue;
    }
    
    const filepath = path.join(IMAGES_DIR, file);
    const outputPath = filepath.replace(ext, '-optimized' + ext);
    
    try {
      const originalStats = fs.statSync(filepath);
      const originalSize = originalStats.size;
      
      await sharp(filepath)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath);
      
      const optimizedStats = fs.statSync(outputPath);
      const optimizedSize = optimizedStats.size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      // Replace original with optimized
      fs.unlinkSync(filepath);
      fs.renameSync(outputPath, filepath);
      
      console.log(`✓ Optimized: ${file} (${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB, saved ${savings}%)`);
      optimized++;
    } catch (error) {
      console.error(`✗ Failed to optimize ${file}:`, error.message);
      // Clean up temporary file if it exists
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    }
  }
  
  console.log(`\n✅ Optimization complete!`);
  console.log(`   Optimized: ${optimized}`);
  console.log(`   Skipped: ${skipped}`);
}

optimizeImages().catch(console.error);

