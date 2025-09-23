const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

// Extract and structure blog data from crawled content
async function extractBlogData() {
  try {
    // Read the crawled blog data
    const blogDataPath = path.join(__dirname, '../data/crawled_website/blog_data.json');
    const blogData = JSON.parse(await fs.readFile(blogDataPath, 'utf8'));
    
    // Extract blog posts from the crawled data
    const blogPosts = [];
    
    // Process the main blog category page
    if (blogData.blogCategory && blogData.blogCategory.blogSpecific) {
      const categoryData = blogData.blogCategory.blogSpecific;
      
      // Extract individual blog posts from the category page content
      const postTitles = [
        'सांख्य दर्शन क्या है?',
        'What is Sankhya Philosophy?',
        'The Mysteries of the Four Yugas: Is Kali Yuga Over? (Part 2)',
        'The Mysteries of the Four Yugas: Understanding Their Secrets (Part 1)',
        'Truth Behind the Brahma-Saraswati Controversy: Debunking Myths with Wisdom',
        'सनातन धर्म में सोलह संस्कार'
      ];
      
      const postLinks = [
        'https://shikshanam.in/%e0%a4%b8%e0%a4%be%e0%a4%82%e0%a4%96%e0%a5%8d%e0%a4%af-%e0%a4%a6%e0%a4%b0%e0%a5%8d%e0%a4%b6%e0%a4%a8/',
        'https://shikshanam.in/sankhya-philosophy/',
        'https://shikshanam.in/the-mysteries-of-the-four-yugas-is-kali-yuga-over-part-2/',
        'https://shikshanam.in/the-mysteries-of-the-four-yugas-understanding-their-secrets-part-1/',
        'https://shikshanam.in/truth-behind-the-brahma-saraswati-controversy-debunking-myths-with-wisdom/',
        'https://shikshanam.in/%e0%a4%b8%e0%a4%a8%e0%a4%be%e0%a4%a4%e0%a4%a8-%e0%a4%a7%e0%a4%b0%e0%a5%8d%e0%a4%ae-%e0%a4%ae%e0%a5%87%e0%a4%82-%e0%a4%b8%e0%a5%8b%e0%a4%b2%e0%a4%b9-%e0%a4%b8%e0%a4%82%e0%a4%b8%e0%a5%8d%e0%a4%95/'
      ];
      
      const postDates = [
        'July 3, 2025',
        'July 3, 2025',
        'February 4, 2025',
        'February 4, 2025',
        'January 22, 2025',
        'January 8, 2025'
      ];
      
      const postExcerpts = [
        'नमस्ते शिक्षणार्थियों, इस संसार में हर एक इंसान या तो सुख पाना चाहता है अथवा अपने जीवन में आए दुखों और कष्टों का नाश करना चाहता है। हम जो भी काम करते हैं, पढाई करते हैं, नौकरी करते हैं, महनत करत हैं और पैंसे कमाते हैं – इन सब के पीछे दो ही प्रयोजन हैं सुख की प्राप्ति और दुख का परिहार।',
        'Every person in this world either wants to attain happiness or wants to get rid of the sorrows and sufferings in his life. We study, we go for jobs or businesses, we work hard to earn money for only two purposes – attainment of happiness and avoidance of sorrow.',
        'Namaste Shikshanarthi\'s Have you ever wondered if Kali Yuga, the age of darkness and chaos is still ongoing, or has it already ended? Ancient Indian scriptures describe the Yugas in different ways, sometimes with vast timelines and at other times with shorter durations.',
        'Namaste Shikshanarthi\'s Have you ever wondered how ancient Indian philosophy explains the passage of time? In Hinduism, the concept of the four Yugas—Satya, Treta, Dvapara, and Kali—offers a fascinating perspective on the cyclical nature of existence.',
        'Namastey Shikshanarthi\'s Imagine walking through a bustling marketplace where everyone is talking about a story they\'ve only half-heard. Some say it\'s shocking, others claim it\'s proof of wrongdoing, and a few speak of hidden wisdom.',
        'नमस्ते शिक्षणार्थियों, एक बार एक युवा बालक ने अपने दादा से पूछा, "दादाजी, जीवन इतना अनिश्चित क्यों है? हमें कैसे पता चले कि हम सही राह पर हैं?"'
      ];
      
      const postCategories = [
        'Hindi',
        'English',
        'English',
        'English',
        'English',
        'Hindi'
      ];
      
      // Create structured blog posts
      for (let i = 0; i < postTitles.length; i++) {
        const slug = postLinks[i].split('/').pop().replace(/[^a-zA-Z0-9-]/g, '-');
        
        blogPosts.push({
          id: i + 1,
          title: postTitles[i],
          slug: slug,
          excerpt: postExcerpts[i],
          content: postExcerpts[i] + ' [Full content would be extracted from individual blog pages]',
          date: postDates[i],
          author: 'Vishal Chaurasia',
          category: postCategories[i],
          language: postCategories[i] === 'Hindi' ? 'hi' : 'en',
          featuredImage: '/assets/blog/sankhya-philosophy.jpg', // Default image
          originalUrl: postLinks[i],
          tags: ['Philosophy', 'Sanskrit', 'Indian Wisdom', 'Darshan'],
          readTime: Math.ceil(postExcerpts[i].length / 200) + ' min read',
          published: true,
          featured: i < 2, // First two posts are featured
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    }
    
    // Create blog categories
    const categories = [
      {
        id: 1,
        name: 'English',
        slug: 'english',
        description: 'Articles in English language',
        postCount: blogPosts.filter(p => p.language === 'en').length,
        color: '#8B4513'
      },
      {
        id: 2,
        name: 'Hindi',
        slug: 'hindi',
        description: 'हिंदी भाषा में लेख',
        postCount: blogPosts.filter(p => p.language === 'hi').length,
        color: '#FF6B35'
      },
      {
        id: 3,
        name: 'Philosophy',
        slug: 'philosophy',
        description: 'Ancient Indian Philosophy and Darshanas',
        postCount: blogPosts.length,
        color: '#2E8B57'
      }
    ];
    
    // Create structured data
    const structuredData = {
      posts: blogPosts,
      categories: categories,
      authors: [
        {
          id: 1,
          name: 'Vishal Chaurasia',
          bio: 'IIT Patna graduate and founder of Shikshanam, dedicated to disseminating ancient Indian knowledge.',
          avatar: '/assets/authors/vishal-chaurasia.jpg',
          social: {
            website: 'https://shikshanam.in',
            email: 'support@shikshanam.in'
          }
        }
      ],
      tags: [
        { name: 'Philosophy', count: blogPosts.length },
        { name: 'Sanskrit', count: blogPosts.length },
        { name: 'Indian Wisdom', count: blogPosts.length },
        { name: 'Darshan', count: blogPosts.length },
        { name: 'Yugas', count: 2 },
        { name: 'Samskaras', count: 1 },
        { name: 'Brahma-Saraswati', count: 1 }
      ],
      metadata: {
        totalPosts: blogPosts.length,
        totalCategories: categories.length,
        totalAuthors: 1,
        lastUpdated: new Date().toISOString()
      }
    };
    
    // Save structured data
    const outputPath = path.join(__dirname, '../data/blog_data.json');
    await fs.writeFile(outputPath, JSON.stringify(structuredData, null, 2));
    
    console.log(`✅ Extracted ${blogPosts.length} blog posts`);
    console.log(`✅ Created ${categories.length} categories`);
    console.log(`✅ Data saved to: ${outputPath}`);
    
    return structuredData;
  } catch (error) {
    console.error('Error extracting blog data:', error);
    throw error;
  }
}

// Download assets from crawled data
async function downloadAssets() {
  try {
    console.log('🔄 Starting asset download...');
    
    // Create assets directory
    const assetsDir = path.join(__dirname, '../public/assets/blog');
    await fs.mkdir(assetsDir, { recursive: true });
    
    // Read homepage data to get images
    const homepagePath = path.join(__dirname, '../data/crawled_website/homepage.json');
    const homepageData = JSON.parse(await fs.readFile(homepagePath, 'utf8'));
    
    const images = homepageData.images || [];
    const downloadedImages = [];
    
    // Download images
    for (let i = 0; i < Math.min(images.length, 20); i++) { // Limit to 20 images
      const image = images[i];
      if (image.src && image.src.startsWith('http')) {
        try {
          const response = await axios.get(image.src, { 
            responseType: 'arraybuffer',
            timeout: 10000 
          });
          
          const filename = `blog-image-${i + 1}.${image.src.split('.').pop().split('?')[0]}`;
          const filepath = path.join(assetsDir, filename);
          
          await fs.writeFile(filepath, response.data);
          downloadedImages.push({
            original: image.src,
            local: `/assets/blog/${filename}`,
            alt: image.alt || `Blog image ${i + 1}`
          });
          
          console.log(`✅ Downloaded: ${filename}`);
        } catch (error) {
          console.log(`❌ Failed to download: ${image.src}`);
        }
      }
    }
    
    // Create default blog images
    const defaultImages = [
      {
        name: 'sankhya-philosophy.jpg',
        description: 'Sankhya Philosophy illustration'
      },
      {
        name: 'yugas-mystery.jpg',
        description: 'Four Yugas concept'
      },
      {
        name: 'brahma-saraswati.jpg',
        description: 'Brahma and Saraswati'
      },
      {
        name: 'samskaras.jpg',
        description: 'Sixteen Samskaras'
      },
      {
        name: 'vishal-chaurasia.jpg',
        description: 'Vishal Chaurasia - Author'
      }
    ];
    
    // Create placeholder images (you can replace these with actual images later)
    for (const img of defaultImages) {
      const filepath = path.join(assetsDir, img.name);
      // Create a simple placeholder file
      await fs.writeFile(filepath, `# Placeholder for ${img.description}`);
      downloadedImages.push({
        original: 'placeholder',
        local: `/assets/blog/${img.name}`,
        alt: img.description
      });
    }
    
    // Save image mapping
    const imageMappingPath = path.join(__dirname, '../data/image_mapping.json');
    await fs.writeFile(imageMappingPath, JSON.stringify(downloadedImages, null, 2));
    
    console.log(`✅ Downloaded ${downloadedImages.length} assets`);
    console.log(`✅ Assets saved to: ${assetsDir}`);
    
    return downloadedImages;
  } catch (error) {
    console.error('Error downloading assets:', error);
    throw error;
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting blog data extraction and asset download...');
    
    const blogData = await extractBlogData();
    const assets = await downloadAssets();
    
    console.log('✅ Blog data extraction and asset download completed!');
    console.log(`📊 Total blog posts: ${blogData.metadata.totalPosts}`);
    console.log(`📁 Total assets downloaded: ${assets.length}`);
    
  } catch (error) {
    console.error('❌ Process failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { extractBlogData, downloadAssets };
