# Shikshanam.in Website Crawl Data

This folder contains comprehensive data crawled from the shikshanam.in website on **September 20, 2025**.

## 📊 Crawl Summary

- **Total Pages Crawled**: 26 pages
- **Total Courses Found**: 6 courses
- **Total Links Extracted**: 1,030 links
- **Total Images Found**: 506 images
- **Total Forms Found**: 15 forms
- **Crawl Date**: 2025-09-20T13:23:28.002Z

## 📁 File Structure

### Core Data Files

- **`complete_data.json`** - Complete crawled data including all pages, courses, navigation, and metadata
- **`homepage.json`** - Detailed homepage data with hero sections, course categories, testimonials, stats, and offers
- **`all_pages.json`** - All individual pages crawled (excluding homepage)
- **`courses.json`** - Course-specific pages with detailed course information
- **`navigation.json`** - Website navigation structure and menu items
- **`metadata.json`** - Crawl metadata and statistics
- **`summary.json`** - High-level summary of the crawl results

### Blog Data Files

- **`blog_data.json`** - Complete blog crawl data including all blog posts and archives
- **`blog_category.json`** - Main blog category page with blog structure and navigation
- **`blog_posts.json`** - Individual blog posts with content and metadata
- **`blog_archives.json`** - English and Hindi blog archives
- **`blog_summary.json`** - Blog-specific summary with categories, tags, and pagination

## 🎯 Key Pages Crawled

### Homepage & Main Pages
- Homepage (https://shikshanam.in)
- Courses page
- Free courses page
- About us page
- Contact page
- Career page
- Guna profiler page

### Course Pages
1. **Sanskrit Live Class** - Interactive Sanskrit learning
2. **Emotional Intelligence with Samkhya Darshan** - Ancient wisdom for modern life
3. **Advaita Vedanta Darshan** - Journey through Drig Drishya Viveka
4. **Online Sanskrit Course** - Sanskrit language fundamentals
5. **Yoga Darshan Course** - Patanjali Yoga Sutras
6. **Kashmir Shaivism** - Shaiva philosophy
7. **Advaita Shaiva Darshan** - Advanced philosophical study
8. **Isha Upanishad Course** - Ancient Vedic wisdom
9. **Prashna Upanishad Course** - Question-based learning

### Blog & Content Pages
- **Main Blog Category** (https://shikshanam.in/category/blog/)
- **English Blog Archives** (https://shikshanam.in/category/blog/english/)
- **Hindi Blog Archives** (https://shikshanam.in/category/blog/hindi/)
- **Blog Pagination** (Pages 2-11 with additional content)

### Key Blog Posts Captured
1. **सांख्य दर्शन क्या है?** (What is Sankhya Philosophy?) - July 3, 2025
2. **What is Sankhya Philosophy?** (English version) - July 3, 2025
3. **The Mysteries of the Four Yugas: Is Kali Yuga Over? (Part 2)** - February 4, 2025
4. **The Mysteries of the Four Yugas: Understanding Their Secrets (Part 1)** - February 4, 2025
5. **Truth Behind the Brahma-Saraswati Controversy: Debunking Myths with Wisdom** - January 22, 2025
6. **सनातन धर्म में सोलह संस्कार** (Sixteen Samskaras in Sanatana Dharma) - January 8, 2025

## 📋 Data Structure

Each page contains the following extracted data:

### Basic Page Information
- URL, title, meta description, keywords
- Open Graph tags (og:title, og:description, og:image)
- Canonical URL

### Content Structure
- **Headings**: H1, H2, H3 tags with text content
- **Paragraphs**: All paragraph text content
- **Links**: Internal and external links with text and URLs
- **Images**: Image sources, alt text, and titles
- **Videos**: Video sources and poster images
- **Forms**: Form actions, methods, and input fields
- **Navigation**: Menu items and navigation structure
- **Buttons**: Button text and styling classes
- **Tables**: Table data in structured format
- **Lists**: Ordered and unordered list content
- **Sections**: Page sections with class names and content

### Homepage-Specific Data
- Hero section content
- Course categories and descriptions
- Testimonials and reviews
- Statistics and numbers
- Special offers and discounts

### Course-Specific Data
- Course titles and descriptions
- Instructor information
- Pricing and duration
- Syllabus and curriculum
- Prerequisites and requirements
- Learning outcomes and benefits

### Blog-Specific Data
- **Blog Posts**: Title, excerpt, author, date, category, content preview
- **Categories**: English and Hindi blog categories with links
- **Archives**: Monthly and yearly blog archives
- **Recent Posts**: Latest blog post listings
- **Popular Posts**: Most viewed blog content
- **Tags**: Blog post tags and categories
- **Pagination**: Blog navigation with page numbers and links

## 🚀 Usage Examples

### Accessing Homepage Data
```javascript
const homepageData = require('./homepage.json');
console.log(homepageData.homepageSpecific.heroSection);
console.log(homepageData.homepageSpecific.courseCategories);
```

### Working with Course Data
```javascript
const coursesData = require('./courses.json');
coursesData.forEach(course => {
  if (course.courseSpecific) {
    console.log(course.courseSpecific.courseTitle);
    console.log(course.courseSpecific.instructor);
    console.log(course.courseSpecific.price);
  }
});
```

### Navigation Structure
```javascript
const navigationData = require('./navigation.json');
navigationData.forEach(navItem => {
  console.log(`${navItem.text}: ${navItem.href}`);
});
```

### Working with Blog Data
```javascript
const blogData = require('./blog_data.json');
console.log('Total blog posts:', blogData.metadata.totalBlogPosts);

// Access blog categories
blogData.blogCategory.blogSpecific.categories.forEach(category => {
  console.log(`Category: ${category.name} - ${category.link}`);
});

// Access individual blog posts
blogData.blogPosts.forEach(post => {
  console.log(`Post: ${post.title}`);
  console.log(`Author: ${post.blogSpecific?.blogPosts?.[0]?.author}`);
  console.log(`Date: ${post.blogSpecific?.blogPosts?.[0]?.date}`);
});
```

## 🎨 Content Highlights

### Key Features Found
- **Live Sanskrit Classes** with interactive elements
- **Guna Profiler** personality assessment tool
- **Emotional Intelligence** courses based on ancient wisdom
- **Multiple Darshanas** (philosophical systems) covered
- **Upanishad Studies** with structured learning paths
- **Mobile App** promotion and features
- **Free Masterclasses** and trial content

### Course Categories
1. **Sanskrit Language** - Beginner to advanced levels
2. **Darshanas** - Samkhya, Yoga, Nyaya, Vaisheshik, Advaita Vedanta
3. **Upanishads** - Isha, Prashna, and other key texts
4. **Shaivism** - Kashmir Shaivism and related philosophies
5. **Emotional Intelligence** - Modern applications of ancient wisdom

### Special Offers & Promotions
- Hindi Diwas Sale with countdown timers
- Month End Sale (20% discount with code END25)
- Raksha Bandhan Special (50% discount with code RAKHI50)
- Republic Day Sale (40% discount with code BHARAT40)

## 📱 Mobile & App Features
- Offline learning capabilities
- Playback speed control
- Community access
- Downloadable content
- Interactive quizzes and assessments

## 🔍 SEO & Technical Details
- Comprehensive meta tags
- Open Graph optimization
- Canonical URLs
- Structured navigation
- Mobile-responsive design elements

## 📞 Contact Information
- **Phone**: +91-9910032165
- **Email**: support@shikshanam.in
- **Location**: Delhi, India
- **Company**: Hyperfinity Creations Private Limited

## 🎯 Next Steps

This crawled data can be used to:
1. **Recreate the website structure** in your new project
2. **Extract course content** for your course pages
3. **Build navigation menus** based on the original structure
4. **Create mock data** for development and testing
5. **Understand the content hierarchy** and user journey
6. **Implement similar features** like the Guna Profiler
7. **Design course layouts** based on successful patterns

## ⚠️ Important Notes

- This data was crawled on September 20, 2025
- Some dynamic content may not be captured (JavaScript-rendered elements)
- External links and checkout pages may have limited content
- Images and media files are referenced but not downloaded
- Form submissions and interactive features are not functional in this data

---

*Generated by Shikshanam Website Crawler v1.0*
