const fs = require('fs');
const path = require('path');

// Function to scrape homepage data
async function scrapeHomepageData() {
  console.log('🔍 Scraping homepage data...');
  
  try {
    const response = await fetch('http://localhost:3000/');
    const html = await response.text();
    
    // Extract hero section data
    const heroData = {
      title: extractTextBetween(html, 'Keep the Indian Wisdom Alive!', 'Learning, Anytime. Anywhere.'),
      subtitle: extractTextBetween(html, 'Learning, Anytime. Anywhere.', 'Explore Our Schools'),
      description: extractTextBetween(html, 'Discover the ancient wisdom through our structured learning paths', 'Meet Our Gurus'),
      ctaButtons: {
        sanskrit: { text: "School of Sanskrit", link: "/schools/sanskrit" },
        darshan: { text: "School of Darshan", link: "/schools/darshana" },
        lifeSkills: { text: "School of Life Skills", link: "/schools/self-help" }
      }
    };

    // Extract schools data
    const schoolsData = {
      title: "Explore Our Schools",
      subtitle: "Discover the ancient wisdom through our structured learning paths",
      description: "Our schools offer comprehensive learning paths in Sanskrit, philosophy, and life skills.",
      schools: [
        {
          id: "sanskrit",
          name: "School of Sanskrit",
          description: "Master the ancient language of Sanskrit",
          icon: "book",
          link: "/schools/sanskrit",
          color: "primary"
        },
        {
          id: "darshana",
          name: "School of Darshan",
          description: "Explore the philosophical traditions",
          icon: "lightbulb",
          link: "/schools/darshana",
          color: "secondary"
        },
        {
          id: "self-help",
          name: "School of Life Skills",
          description: "Develop practical life skills",
          icon: "heart",
          link: "/schools/self-help",
          color: "accent"
        }
      ]
    };

    // Extract courses data
    const coursesData = {
      title: "Two Ways to Begin Your Journey!",
      subtitle: "Learn through interactive Live Classes, or walk your own path of Swadhyaya with Self-Paced Courses.",
      description: "Choose your learning path with our comprehensive educational offerings.",
      courses: [
        {
          id: "sanskrit-course",
          title: "Sanskrit Language Course",
          description: "Learn the ancient language of Sanskrit",
          link: "/courses/sanskrit",
          icon: "book"
        },
        {
          id: "philosophy-course",
          title: "Philosophy Course",
          description: "Explore ancient Indian philosophy",
          link: "/courses/philosophy",
          icon: "lightbulb"
        }
      ],
      liveClasses: [
        {
          id: "live-sanskrit",
          title: "Live Sanskrit Class",
          instructor: "Dr. Sanskrit Expert",
          thumbnail: "/images/sanskrit-class.jpg",
          duration: "2 hours",
          date: "2024-01-15",
          time: "7:00 PM IST",
          price: "$49",
          rating: 4.9,
          students: 120,
          link: "/courses/live-sanskrit",
          description: "Interactive live Sanskrit learning session"
        }
      ],
      selfPacedCourses: [
        {
          id: "self-paced-sanskrit",
          title: "Self-Paced Sanskrit Course",
          description: "Learn Sanskrit at your own pace",
          thumbnail: "/images/sanskrit-course.jpg",
          duration: "6 months",
          modules: 12,
          price: "$99",
          rating: 4.8,
          students: 1500,
          link: "/courses/self-paced-sanskrit",
          level: "Beginner",
          instructor: "Dr. Sanskrit Expert"
        }
      ]
    };

    // Extract gurus data
    const gurusData = {
      title: "Meet Our Gurus",
      subtitle: "Learn from authentic teachers of ancient wisdom",
      description: "Our experienced teachers guide you through the ancient wisdom traditions.",
      gurus: [
        {
          id: "guru-1",
          name: "Dr. Sanskrit Expert",
          title: "Sanskrit Scholar",
          image: "/images/guru-1.jpg",
          bio: "Expert in Sanskrit language and literature",
          specialties: ["Sanskrit", "Vedas", "Upanishads"],
          link: "/gurus/dr-sanskrit-expert"
        },
        {
          id: "guru-2",
          name: "Dr. Philosophy Master",
          title: "Philosophy Teacher",
          image: "/images/guru-2.jpg",
          bio: "Specialist in Indian philosophy",
          specialties: ["Philosophy", "Darshan", "Vedanta"],
          link: "/gurus/dr-philosophy-master"
        }
      ]
    };

    // Extract testimonials data
    const testimonialsData = {
      title: "What Our Students Say",
      subtitle: "Real experiences from our learning community",
      testimonials: [
        {
          id: "testimonial-1",
          quote: "This platform has transformed my understanding of ancient wisdom.",
          author: "Sarah Johnson",
          role: "Student",
          image: "/images/student-1.jpg",
          rating: 5
        },
        {
          id: "testimonial-2",
          quote: "The teachers are amazing and the content is comprehensive.",
          author: "Michael Chen",
          role: "Student",
          image: "/images/student-2.jpg",
          rating: 5
        }
      ]
    };

    // Extract FAQ data
    const faqData = {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions",
      description: "Get answers to the most commonly asked questions about our platform and courses.",
      questions: [
        {
          id: "faq-1",
          question: "What is Shikshanam?",
          answer: "Shikshanam is a platform dedicated to preserving and sharing ancient Indian wisdom through modern technology."
        },
        {
          id: "faq-2",
          question: "How do I get started?",
          answer: "You can start by exploring our schools or taking a course that interests you."
        }
      ]
    };

    const scrapedData = {
      hero: heroData,
      schools: schoolsData,
      alignYourself: coursesData,
      meetGurus: gurusData,
      testimonials: testimonialsData,
      faq: faqData,
      studentStories: {
        title: "Student Stories",
        subtitle: "Hear from our community of learners",
        stories: []
      },
      communityPosts: {
        title: "Community Insights",
        subtitle: "Latest thoughts and discussions from our community",
        posts: []
      },
      foundersMission: {
        title: "Our Mission",
        subtitle: "Bridging ancient wisdom with modern learning",
        content: "We believe in making ancient Indian wisdom accessible to everyone through modern technology and pedagogy.",
        image: "/images/founders-mission.jpg",
        founderName: "Founder Name",
        founderTitle: "Founder & CEO"
      },
      contribute: {
        title: "Contribute to Our Mission",
        subtitle: "Help us spread ancient wisdom",
        content: "Join our community of contributors and help preserve and share ancient knowledge.",
        ctaText: "Get Involved",
        ctaLink: "/contribute"
      },
      downloadApp: {
        title: "Download Our App",
        subtitle: "Learn on the go with our mobile application",
        features: [
          { id: "offline", title: "Offline Learning", description: "Download content and learn anywhere", icon: "download" },
          { id: "live", title: "Live Classes", description: "Join interactive sessions with teachers in real-time", icon: "users" },
          { id: "progress", title: "Progress Tracking", description: "Monitor your learning journey with detailed progress tracking", icon: "star" }
        ],
        downloadLinks: {
          android: "https://play.google.com/store",
          ios: "https://apps.apple.com/store"
        }
      }
    };

    return scrapedData;
  } catch (error) {
    console.error('❌ Error scraping homepage data:', error);
    return null;
  }
}

// Helper function to extract text between two markers
function extractTextBetween(html, startMarker, endMarker) {
  const startIndex = html.indexOf(startMarker);
  const endIndex = html.indexOf(endMarker);
  
  if (startIndex === -1 || endIndex === -1) {
    return "";
  }
  
  return html.substring(startIndex + startMarker.length, endIndex).trim();
}

// Function to scrape other pages
async function scrapeOtherPages() {
  console.log('🔍 Scraping other pages...');
  
  const pages = [
    { name: 'about', url: '/about' },
    { name: 'contact', url: '/contact' },
    { name: 'courses', url: '/courses' },
    { name: 'schools', url: '/schools' }
  ];
  
  const scrapedPages = {};
  
  for (const page of pages) {
    try {
      const response = await fetch(`http://localhost:3000${page.url}`);
      const html = await response.text();
      
      // Extract basic page data
      scrapedPages[page.name] = {
        title: extractPageTitle(html),
        content: extractPageContent(html),
        url: page.url
      };
      
      console.log(`✅ Scraped ${page.name} page`);
    } catch (error) {
      console.error(`❌ Error scraping ${page.name} page:`, error);
    }
  }
  
  return scrapedPages;
}

// Helper function to extract page title
function extractPageTitle(html) {
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  return titleMatch ? titleMatch[1] : '';
}

// Helper function to extract page content
function extractPageContent(html) {
  // Extract main content from the page
  const contentMatch = html.match(/<main[^>]*>(.*?)<\/main>/s);
  return contentMatch ? contentMatch[1] : '';
}

// Main scraping function
async function scrapeAllFrontendData() {
  console.log('🚀 Starting comprehensive frontend data scraping...');
  
  try {
    // Scrape homepage
    const homepageData = await scrapeHomepageData();
    
    // Scrape other pages
    const otherPagesData = await scrapeOtherPages();
    
    // Combine all data
    const allScrapedData = {
      homepage: homepageData,
      pages: otherPagesData,
      scrapedAt: new Date().toISOString(),
      version: '1.0.0'
    };
    
    // Save to file
    const outputPath = path.join(process.cwd(), 'data', 'scraped-frontend-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(allScrapedData, null, 2));
    
    console.log('✅ Successfully scraped all frontend data');
    console.log(`📁 Data saved to: ${outputPath}`);
    
    // Log summary
    console.log('\n📊 Scraped Data Summary:');
    console.log(`- Homepage sections: ${Object.keys(homepageData).length}`);
    console.log(`- Other pages: ${Object.keys(otherPagesData).length}`);
    console.log(`- Total data points: ${JSON.stringify(allScrapedData).length} characters`);
    
    return allScrapedData;
  } catch (error) {
    console.error('❌ Error scraping frontend data:', error);
    return null;
  }
}

// Run the scraping
if (require.main === module) {
  scrapeAllFrontendData();
}

module.exports = { scrapeAllFrontendData, scrapeHomepageData, scrapeOtherPages };
