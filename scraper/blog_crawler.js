const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

class BlogCrawler {
  constructor() {
    this.baseUrl = 'https://shikshanam.in';
    this.blogData = {
      blogCategory: null,
      blogPosts: [],
      blogArchives: [],
      metadata: {
        crawledAt: new Date().toISOString(),
        totalBlogPosts: 0,
        totalArchives: 0
      }
    };
  }

  async fetchPage(url) {
    try {
      console.log(`Fetching: ${url}`);
      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message);
      return null;
    }
  }

  parseBlogPage(html, url) {
    const $ = cheerio.load(html);
    
    const data = {
      url: url,
      title: $('title').text().trim(),
      metaDescription: $('meta[name="description"]').attr('content') || '',
      metaKeywords: $('meta[name="keywords"]').attr('content') || '',
      canonical: $('link[rel="canonical"]').attr('href') || '',
      ogTitle: $('meta[property="og:title"]').attr('content') || '',
      ogDescription: $('meta[property="og:description"]').attr('content') || '',
      ogImage: $('meta[property="og:image"]').attr('content') || '',
      h1: $('h1').map((i, el) => $(el).text().trim()).get(),
      h2: $('h2').map((i, el) => $(el).text().trim()).get(),
      h3: $('h3').map((i, el) => $(el).text().trim()).get(),
      paragraphs: $('p').map((i, el) => $(el).text().trim()).get().filter(p => p.length > 0),
      links: $('a[href]').map((i, el) => ({
        text: $(el).text().trim(),
        href: $(el).attr('href'),
        isExternal: !$(el).attr('href').includes('shikshanam.in')
      })).get(),
      images: $('img').map((i, el) => ({
        src: $(el).attr('src'),
        alt: $(el).attr('alt') || '',
        title: $(el).attr('title') || ''
      })).get(),
      timestamp: new Date().toISOString()
    };

    // Extract blog-specific content
    data.blogSpecific = {
      // Blog post cards/articles
      blogPosts: $('.post, .blog-post, .article, [class*="post"], [class*="blog"], [class*="article"]').map((i, el) => ({
        title: $(el).find('h1, h2, h3, h4, h5, h6, .title, [class*="title"]').first().text().trim(),
        excerpt: $(el).find('.excerpt, .summary, [class*="excerpt"], [class*="summary"]').text().trim(),
        author: $(el).find('.author, [class*="author"]').text().trim(),
        date: $(el).find('.date, .published, [class*="date"], [class*="published"]').text().trim(),
        category: $(el).find('.category, .tag, [class*="category"], [class*="tag"]').text().trim(),
        link: $(el).find('a').first().attr('href'),
        image: $(el).find('img').first().attr('src'),
        content: $(el).text().trim().substring(0, 500)
      })).get(),

      // Blog categories
      categories: $('.category, .categories, [class*="category"]').map((i, el) => ({
        name: $(el).text().trim(),
        link: $(el).find('a').attr('href'),
        count: $(el).find('.count, [class*="count"]').text().trim()
      })).get(),

      // Blog archives
      archives: $('.archive, .archives, [class*="archive"]').map((i, el) => ({
        month: $(el).find('.month, [class*="month"]').text().trim(),
        year: $(el).find('.year, [class*="year"]').text().trim(),
        count: $(el).find('.count, [class*="count"]').text().trim(),
        link: $(el).find('a').attr('href')
      })).get(),

      // Recent posts
      recentPosts: $('.recent-posts, [class*="recent"]').map((i, el) => ({
        title: $(el).find('a').text().trim(),
        link: $(el).find('a').attr('href'),
        date: $(el).find('.date, [class*="date"]').text().trim()
      })).get(),

      // Popular posts
      popularPosts: $('.popular-posts, [class*="popular"]').map((i, el) => ({
        title: $(el).find('a').text().trim(),
        link: $(el).find('a').attr('href'),
        views: $(el).find('.views, [class*="views"]').text().trim()
      })).get(),

      // Tags
      tags: $('.tag, .tags, [class*="tag"]').map((i, el) => ({
        name: $(el).text().trim(),
        link: $(el).find('a').attr('href'),
        count: $(el).find('.count, [class*="count"]').text().trim()
      })).get(),

      // Pagination
      pagination: {
        current: $('.pagination .current, .pagination .active, [class*="pagination"] .current').text().trim(),
        total: $('.pagination .total, [class*="pagination"] .total').text().trim(),
        next: $('.pagination .next, [class*="pagination"] .next').attr('href'),
        prev: $('.pagination .prev, [class*="pagination"] .prev').attr('href'),
        pages: $('.pagination a, [class*="pagination"] a').map((i, el) => ({
          number: $(el).text().trim(),
          link: $(el).attr('href'),
          isCurrent: $(el).hasClass('current') || $(el).hasClass('active')
        })).get()
      }
    };

    return data;
  }

  extractBlogLinks(html) {
    const $ = cheerio.load(html);
    const links = [];
    
    // Extract blog post links
    $('a[href*="/blog/"], a[href*="/category/blog/"], a[href*="/post/"], a[href*="/article/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('shikshanam.in')) {
        try {
          const url = new URL(href);
          if (!url.pathname.includes('#') && !url.pathname.includes('mailto:') && !url.pathname.includes('tel:')) {
            links.push(url.href);
          }
        } catch (e) {
          // Skip invalid URLs
        }
      }
    });

    return [...new Set(links)]; // Remove duplicates
  }

  async crawlBlogCategory() {
    try {
      console.log('Starting blog category crawl...');
      
      // Fetch main blog category page
      const blogCategoryUrl = 'https://shikshanam.in/category/blog/';
      const blogCategoryHtml = await this.fetchPage(blogCategoryUrl);
      
      if (blogCategoryHtml) {
        this.blogData.blogCategory = this.parseBlogPage(blogCategoryHtml, blogCategoryUrl);
        
        // Extract blog post links from the category page
        const blogLinks = this.extractBlogLinks(blogCategoryHtml);
        console.log(`Found ${blogLinks.length} blog links to crawl`);

        // Crawl individual blog posts (limit to first 10 for now)
        const limitedLinks = blogLinks.slice(0, 10);
        for (const link of limitedLinks) {
          const html = await this.fetchPage(link);
          if (html) {
            const blogPostData = this.parseBlogPage(html, link);
            this.blogData.blogPosts.push(blogPostData);
          }
          
          // Add delay to be respectful
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Also fetch English and Hindi blog archives
        const englishBlogUrl = 'https://shikshanam.in/category/blog/english/';
        const hindiBlogUrl = 'https://shikshanam.in/category/blog/hindi/';
        
        const englishHtml = await this.fetchPage(englishBlogUrl);
        if (englishHtml) {
          this.blogData.blogArchives.push(this.parseBlogPage(englishHtml, englishBlogUrl));
        }
        
        const hindiHtml = await this.fetchPage(hindiBlogUrl);
        if (hindiHtml) {
          this.blogData.blogArchives.push(this.parseBlogPage(hindiHtml, hindiBlogUrl));
        }

        // Update metadata
        this.blogData.metadata.totalBlogPosts = this.blogData.blogPosts.length;
        this.blogData.metadata.totalArchives = this.blogData.blogArchives.length;

        console.log(`Blog crawl completed. Total blog posts: ${this.blogData.metadata.totalBlogPosts}, Total archives: ${this.blogData.metadata.totalArchives}`);
      }
    } catch (error) {
      console.error('Error during blog crawl:', error);
    }

    return this.blogData;
  }

  async saveBlogData() {
    const outputDir = path.join(__dirname, 'crawled_data');
    
    try {
      await fs.mkdir(outputDir, { recursive: true });
      
      // Save complete blog data
      await fs.writeFile(
        path.join(outputDir, 'blog_data.json'),
        JSON.stringify(this.blogData, null, 2)
      );

      // Save individual blog files
      await fs.writeFile(
        path.join(outputDir, 'blog_category.json'),
        JSON.stringify(this.blogData.blogCategory, null, 2)
      );

      await fs.writeFile(
        path.join(outputDir, 'blog_posts.json'),
        JSON.stringify(this.blogData.blogPosts, null, 2)
      );

      await fs.writeFile(
        path.join(outputDir, 'blog_archives.json'),
        JSON.stringify(this.blogData.blogArchives, null, 2)
      );

      // Create blog summary
      const blogSummary = {
        crawlDate: this.blogData.metadata.crawledAt,
        totalBlogPosts: this.blogData.metadata.totalBlogPosts,
        totalArchives: this.blogData.metadata.totalArchives,
        blogCategories: this.blogData.blogCategory?.blogSpecific?.categories || [],
        recentPosts: this.blogData.blogCategory?.blogSpecific?.recentPosts || [],
        popularPosts: this.blogData.blogCategory?.blogSpecific?.popularPosts || [],
        tags: this.blogData.blogCategory?.blogSpecific?.tags || [],
        pagination: this.blogData.blogCategory?.blogSpecific?.pagination || {},
        posts: this.blogData.blogPosts.map(post => ({
          url: post.url,
          title: post.title,
          excerpt: post.blogSpecific?.blogPosts?.[0]?.excerpt || '',
          author: post.blogSpecific?.blogPosts?.[0]?.author || '',
          date: post.blogSpecific?.blogPosts?.[0]?.date || ''
        }))
      };

      await fs.writeFile(
        path.join(outputDir, 'blog_summary.json'),
        JSON.stringify(blogSummary, null, 2)
      );

      console.log(`Blog data saved to ${outputDir}`);
      return outputDir;
    } catch (error) {
      console.error('Error saving blog data:', error);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const blogCrawler = new BlogCrawler();
  
  try {
    console.log('Starting Shikshanam.in blog crawl...');
    await blogCrawler.crawlBlogCategory();
    const outputDir = await blogCrawler.saveBlogData();
    console.log(`Blog crawl completed successfully! Data saved to: ${outputDir}`);
  } catch (error) {
    console.error('Blog crawl failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = BlogCrawler;
