const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

class SimpleShikshanamCrawler {
  constructor() {
    this.baseUrl = 'https://shikshanam.in';
    this.visitedUrls = new Set();
    this.crawledData = {
      homepage: null,
      pages: [],
      courses: [],
      navigation: [],
      metadata: {
        crawledAt: new Date().toISOString(),
        totalPages: 0,
        totalCourses: 0
      }
    };
  }

  async fetchPage(url) {
    try {
      console.log(`Fetching: ${url}`);
      const response = await axios.get(url, {
        timeout: 10000,
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

  parsePage(html, url, isHomepage = false) {
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
      videos: $('video').map((i, el) => ({
        src: $(el).attr('src'),
        poster: $(el).attr('poster')
      })).get(),
      forms: $('form').map((i, form) => ({
        action: $(form).attr('action'),
        method: $(form).attr('method'),
        inputs: $(form).find('input, textarea, select').map((j, input) => ({
          type: $(input).attr('type'),
          name: $(input).attr('name'),
          placeholder: $(input).attr('placeholder'),
          required: $(input).attr('required') !== undefined
        })).get()
      })).get(),
      navigation: $('nav a, .nav a, .menu a, .navigation a').map((i, el) => ({
        text: $(el).text().trim(),
        href: $(el).attr('href')
      })).get(),
      buttons: $('button, .btn, [class*="button"]').map((i, el) => ({
        text: $(el).text().trim(),
        class: $(el).attr('class'),
        type: $(el).attr('type')
      })).get(),
      tables: $('table').map((i, table) => {
        const rows = [];
        $(table).find('tr').each((j, row) => {
          const cells = [];
          $(row).find('td, th').each((k, cell) => {
            cells.push($(cell).text().trim());
          });
          rows.push(cells);
        });
        return rows;
      }).get(),
      lists: $('ul, ol').map((i, list) => 
        $(list).find('li').map((j, li) => $(li).text().trim()).get()
      ).get(),
      sections: $('section, .section, [class*="section"]').map((i, el) => ({
        className: $(el).attr('class'),
        id: $(el).attr('id'),
        text: $(el).text().trim().substring(0, 500)
      })).get(),
      divs: $('div[class*="course"], div[class*="card"], div[class*="product"]').map((i, el) => ({
        className: $(el).attr('class'),
        text: $(el).text().trim().substring(0, 300)
      })).get(),
      timestamp: new Date().toISOString()
    };

    // Extract homepage-specific content
    if (isHomepage) {
      data.homepageSpecific = {
        heroSection: $('.hero, .banner, [class*="hero"], [class*="banner"]').text().trim(),
        courseCategories: $('[class*="course"], [class*="category"]').map((i, el) => ({
          title: $(el).find('h1, h2, h3, h4, h5, h6').first().text().trim(),
          description: $(el).text().trim().substring(0, 200)
        })).get(),
        testimonials: $('[class*="testimonial"], [class*="review"]').map((i, el) => ({
          text: $(el).text().trim(),
          author: $(el).find('[class*="author"], [class*="name"]').text().trim()
        })).get(),
        stats: $('[class*="stat"], [class*="number"], [class*="count"]').map((i, el) => ({
          number: $(el).text().trim(),
          label: $(el).next().text().trim()
        })).get(),
        offers: $('[class*="offer"], [class*="discount"], [class*="sale"]').map((i, el) => ({
          text: $(el).text().trim()
        })).get()
      };
    }

    // Extract course-specific data
    if (url.includes('/course') || url.includes('/courses')) {
      data.courseSpecific = {
        courseTitle: $('h1, .course-title, [class*="course-title"]').first().text().trim(),
        instructor: $('[class*="instructor"], [class*="teacher"], [class*="author"]').first().text().trim(),
        price: $('[class*="price"], [class*="cost"], [class*="fee"]').first().text().trim(),
        duration: $('[class*="duration"], [class*="length"], [class*="time"]').first().text().trim(),
        description: $('[class*="description"], [class*="overview"]').first().text().trim(),
        syllabus: $('[class*="syllabus"], [class*="curriculum"], [class*="module"]').map((i, el) => $(el).text().trim()).get(),
        requirements: $('[class*="requirement"], [class*="prerequisite"]').map((i, el) => $(el).text().trim()).get(),
        benefits: $('[class*="benefit"], [class*="outcome"], [class*="learn"]').map((i, el) => $(el).text().trim()).get()
      };
    }

    return data;
  }

  extractLinks(html) {
    const $ = cheerio.load(html);
    const links = [];
    
    $('a[href]').each((i, el) => {
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

  async crawlWebsite() {
    try {
      // Start with homepage
      console.log('Starting crawl from homepage...');
      const homepageHtml = await this.fetchPage(this.baseUrl);
      if (homepageHtml) {
        this.crawledData.homepage = this.parsePage(homepageHtml, this.baseUrl, true);
        this.visitedUrls.add(this.baseUrl);

        // Extract navigation from homepage
        this.crawledData.navigation = this.crawledData.homepage.navigation;

        // Discover all links from homepage
        const allLinks = this.extractLinks(homepageHtml);
        console.log(`Found ${allLinks.length} links to crawl`);

        // Crawl each discovered page
        for (const link of allLinks) {
          if (!this.visitedUrls.has(link)) {
            const html = await this.fetchPage(link);
            if (html) {
              const pageData = this.parsePage(html, link);
              this.crawledData.pages.push(pageData);
              
              // Categorize pages
              if (link.includes('/course') || link.includes('/courses')) {
                this.crawledData.courses.push(pageData);
              }
              
              this.visitedUrls.add(link);
            }
            
            // Add delay to be respectful
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }

        // Update metadata
        this.crawledData.metadata.totalPages = this.crawledData.pages.length + 1; // +1 for homepage
        this.crawledData.metadata.totalCourses = this.crawledData.courses.length;

        console.log(`Crawl completed. Total pages: ${this.crawledData.metadata.totalPages}, Total courses: ${this.crawledData.metadata.totalCourses}`);
      }
    } catch (error) {
      console.error('Error during website crawl:', error);
    }

    return this.crawledData;
  }

  async saveData() {
    const outputDir = path.join(__dirname, 'crawled_data');
    
    try {
      await fs.mkdir(outputDir, { recursive: true });
      
      // Save complete data
      await fs.writeFile(
        path.join(outputDir, 'complete_data.json'),
        JSON.stringify(this.crawledData, null, 2)
      );

      // Save individual files
      await fs.writeFile(
        path.join(outputDir, 'homepage.json'),
        JSON.stringify(this.crawledData.homepage, null, 2)
      );

      await fs.writeFile(
        path.join(outputDir, 'all_pages.json'),
        JSON.stringify(this.crawledData.pages, null, 2)
      );

      await fs.writeFile(
        path.join(outputDir, 'courses.json'),
        JSON.stringify(this.crawledData.courses, null, 2)
      );

      await fs.writeFile(
        path.join(outputDir, 'navigation.json'),
        JSON.stringify(this.crawledData.navigation, null, 2)
      );

      // Save metadata
      await fs.writeFile(
        path.join(outputDir, 'metadata.json'),
        JSON.stringify(this.crawledData.metadata, null, 2)
      );

      // Create a summary file
      const summary = {
        crawlDate: this.crawledData.metadata.crawledAt,
        totalPages: this.crawledData.metadata.totalPages,
        totalCourses: this.crawledData.metadata.totalCourses,
        totalLinks: this.crawledData.pages.reduce((acc, page) => acc + (page.links?.length || 0), 0),
        totalImages: this.crawledData.pages.reduce((acc, page) => acc + (page.images?.length || 0), 0),
        totalForms: this.crawledData.pages.reduce((acc, page) => acc + (page.forms?.length || 0), 0),
        pages: this.crawledData.pages.map(page => ({
          url: page.url,
          title: page.title,
          h1Count: page.h1?.length || 0,
          paragraphCount: page.paragraphs?.length || 0,
          imageCount: page.images?.length || 0
        }))
      };

      await fs.writeFile(
        path.join(outputDir, 'summary.json'),
        JSON.stringify(summary, null, 2)
      );

      console.log(`Data saved to ${outputDir}`);
      return outputDir;
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const crawler = new SimpleShikshanamCrawler();
  
  try {
    console.log('Starting Shikshanam.in website crawl...');
    await crawler.crawlWebsite();
    const outputDir = await crawler.saveData();
    console.log(`Crawl completed successfully! Data saved to: ${outputDir}`);
  } catch (error) {
    console.error('Crawl failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = SimpleShikshanamCrawler;
