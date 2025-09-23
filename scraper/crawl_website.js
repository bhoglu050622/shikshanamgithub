const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class ShikshanamCrawler {
  constructor() {
    this.baseUrl = 'https://shikshanam.in';
    this.visitedUrls = new Set();
    this.crawledData = {
      homepage: null,
      pages: [],
      navigation: [],
      courses: [],
      metadata: {
        crawledAt: new Date().toISOString(),
        totalPages: 0,
        totalCourses: 0
      }
    };
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    
    // Set viewport and user agent
    await this.page.setViewport({ width: 1920, height: 1080 });
    await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  }

  async crawlPage(url, isHomepage = false) {
    if (this.visitedUrls.has(url)) return null;
    
    console.log(`Crawling: ${url}`);
    this.visitedUrls.add(url);

    try {
      await this.page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait for content to load
      await this.page.waitForTimeout(2000);

      const pageData = await this.page.evaluate((url, isHomepage) => {
        const data = {
          url: url,
          title: document.title,
          metaDescription: document.querySelector('meta[name="description"]')?.content || '',
          metaKeywords: document.querySelector('meta[name="keywords"]')?.content || '',
          canonical: document.querySelector('link[rel="canonical"]')?.href || '',
          ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
          ogDescription: document.querySelector('meta[property="og:description"]')?.content || '',
          ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
          twitterCard: document.querySelector('meta[name="twitter:card"]')?.content || '',
          h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()),
          h2: Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim()),
          h3: Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim()),
          paragraphs: Array.from(document.querySelectorAll('p')).map(p => p.textContent.trim()).filter(p => p.length > 0),
          links: Array.from(document.querySelectorAll('a[href]')).map(a => ({
            text: a.textContent.trim(),
            href: a.href,
            isExternal: !a.href.includes('shikshanam.in')
          })),
          images: Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.src,
            alt: img.alt,
            title: img.title
          })),
          videos: Array.from(document.querySelectorAll('video')).map(video => ({
            src: video.src,
            poster: video.poster
          })),
          forms: Array.from(document.querySelectorAll('form')).map(form => ({
            action: form.action,
            method: form.method,
            inputs: Array.from(form.querySelectorAll('input, textarea, select')).map(input => ({
              type: input.type,
              name: input.name,
              placeholder: input.placeholder,
              required: input.required
            }))
          })),
          scripts: Array.from(document.querySelectorAll('script[src]')).map(script => script.src),
          stylesheets: Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => link.href),
          breadcrumbs: Array.from(document.querySelectorAll('[class*="breadcrumb"], [class*="bread-crumb"]')).map(bc => bc.textContent.trim()),
          navigation: Array.from(document.querySelectorAll('nav a, .nav a, .menu a, .navigation a')).map(nav => ({
            text: nav.textContent.trim(),
            href: nav.href
          })),
          buttons: Array.from(document.querySelectorAll('button, .btn, [class*="button"]')).map(btn => ({
            text: btn.textContent.trim(),
            class: btn.className,
            type: btn.type
          })),
          tables: Array.from(document.querySelectorAll('table')).map(table => {
            const rows = Array.from(table.querySelectorAll('tr'));
            return rows.map(row => 
              Array.from(row.querySelectorAll('td, th')).map(cell => cell.textContent.trim())
            );
          }),
          lists: Array.from(document.querySelectorAll('ul, ol')).map(list => 
            Array.from(list.querySelectorAll('li')).map(li => li.textContent.trim())
          ),
          sections: Array.from(document.querySelectorAll('section, .section, [class*="section"]')).map(section => ({
            className: section.className,
            id: section.id,
            text: section.textContent.trim().substring(0, 500)
          })),
          divs: Array.from(document.querySelectorAll('div[class*="course"], div[class*="card"], div[class*="product"]')).map(div => ({
            className: div.className,
            text: div.textContent.trim().substring(0, 300)
          })),
          rawHtml: document.documentElement.outerHTML,
          timestamp: new Date().toISOString()
        };

        // Extract specific content based on page type
        if (isHomepage) {
          data.homepageSpecific = {
            heroSection: document.querySelector('.hero, .banner, [class*="hero"], [class*="banner"]')?.textContent.trim() || '',
            courseCategories: Array.from(document.querySelectorAll('[class*="course"], [class*="category"]')).map(cat => ({
              title: cat.querySelector('h1, h2, h3, h4, h5, h6')?.textContent.trim() || '',
              description: cat.textContent.trim().substring(0, 200)
            })),
            testimonials: Array.from(document.querySelectorAll('[class*="testimonial"], [class*="review"]')).map(test => ({
              text: test.textContent.trim(),
              author: test.querySelector('[class*="author"], [class*="name"]')?.textContent.trim() || ''
            })),
            stats: Array.from(document.querySelectorAll('[class*="stat"], [class*="number"], [class*="count"]')).map(stat => ({
              number: stat.textContent.trim(),
              label: stat.nextElementSibling?.textContent.trim() || ''
            })),
            offers: Array.from(document.querySelectorAll('[class*="offer"], [class*="discount"], [class*="sale"]')).map(offer => ({
              text: offer.textContent.trim()
            }))
          };
        }

        // Extract course-specific data
        if (url.includes('/course') || url.includes('/courses')) {
          data.courseSpecific = {
            courseTitle: document.querySelector('h1, .course-title, [class*="course-title"]')?.textContent.trim() || '',
            instructor: document.querySelector('[class*="instructor"], [class*="teacher"], [class*="author"]')?.textContent.trim() || '',
            price: document.querySelector('[class*="price"], [class*="cost"], [class*="fee"]')?.textContent.trim() || '',
            duration: document.querySelector('[class*="duration"], [class*="length"], [class*="time"]')?.textContent.trim() || '',
            description: document.querySelector('[class*="description"], [class*="overview"]')?.textContent.trim() || '',
            syllabus: Array.from(document.querySelectorAll('[class*="syllabus"], [class*="curriculum"], [class*="module"]')).map(syl => syl.textContent.trim()),
            requirements: Array.from(document.querySelectorAll('[class*="requirement"], [class*="prerequisite"]')).map(req => req.textContent.trim()),
            benefits: Array.from(document.querySelectorAll('[class*="benefit"], [class*="outcome"], [class*="learn"]')).map(ben => ben.textContent.trim())
          };
        }

        return data;
      }, url, isHomepage);

      return pageData;
    } catch (error) {
      console.error(`Error crawling ${url}:`, error.message);
      return {
        url: url,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async discoverLinks(url) {
    try {
      await this.page.goto(url, { waitUntil: 'networkidle2' });
      
      const links = await this.page.evaluate(() => {
        return Array.from(document.querySelectorAll('a[href]'))
          .map(a => a.href)
          .filter(href => href.includes('shikshanam.in'))
          .map(href => {
            try {
              return new URL(href).pathname;
            } catch {
              return href;
            }
          })
          .filter(path => !path.includes('#') && !path.includes('mailto:') && !path.includes('tel:'))
          .map(path => `https://shikshanam.in${path}`);
      });

      return [...new Set(links)]; // Remove duplicates
    } catch (error) {
      console.error(`Error discovering links from ${url}:`, error.message);
      return [];
    }
  }

  async crawlWebsite() {
    await this.init();
    
    try {
      // Start with homepage
      console.log('Starting crawl from homepage...');
      const homepageData = await this.crawlPage(this.baseUrl, true);
      this.crawledData.homepage = homepageData;

      // Discover all links from homepage
      const allLinks = await this.discoverLinks(this.baseUrl);
      console.log(`Found ${allLinks.length} links to crawl`);

      // Crawl each discovered page
      for (const link of allLinks) {
        if (!this.visitedUrls.has(link)) {
          const pageData = await this.crawlPage(link);
          if (pageData) {
            this.crawledData.pages.push(pageData);
            
            // Categorize pages
            if (link.includes('/course') || link.includes('/courses')) {
              this.crawledData.courses.push(pageData);
            }
          }
          
          // Add delay to be respectful
          await this.page.waitForTimeout(1000);
        }
      }

      // Extract navigation structure
      if (homepageData && homepageData.navigation) {
        this.crawledData.navigation = homepageData.navigation;
      }

      // Update metadata
      this.crawledData.metadata.totalPages = this.crawledData.pages.length + 1; // +1 for homepage
      this.crawledData.metadata.totalCourses = this.crawledData.courses.length;

      console.log(`Crawl completed. Total pages: ${this.crawledData.metadata.totalPages}, Total courses: ${this.crawledData.metadata.totalCourses}`);

    } catch (error) {
      console.error('Error during website crawl:', error);
    } finally {
      await this.browser.close();
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
  const crawler = new ShikshanamCrawler();
  
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

module.exports = ShikshanamCrawler;
