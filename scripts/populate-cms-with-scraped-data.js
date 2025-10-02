const fs = require('fs');
const path = require('path');

// Function to populate CMS with scraped data
async function populateCmsWithScrapedData() {
  console.log('🚀 Starting CMS population with scraped data...');
  
  try {
    // Read scraped data
    const scrapedDataPath = path.join(process.cwd(), 'data', 'scraped-frontend-data.json');
    const scrapedData = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf8'));
    
    console.log('✅ Loaded scraped data');
    
    // Transform scraped data into CMS format
    const cmsContent = {
      hero: {
        title: "Welcome to Shikshanam",
        subtitle: "Where AI meets Ancient India",
        description: "Preserving and sharing ancient Indian wisdom with the modern world",
        ctaButtons: scrapedData.homepage.hero.ctaButtons
      },
      alignYourself: {
        title: scrapedData.homepage.alignYourself?.title || "Two Ways to Begin Your Journey!",
        subtitle: scrapedData.homepage.alignYourself?.subtitle || "Learn through interactive Live Classes, or walk your own path of Swadhyaya with Self-Paced Courses.",
        description: scrapedData.homepage.alignYourself?.description || "Choose your learning path with our comprehensive educational offerings.",
        courses: scrapedData.homepage.alignYourself?.courses || [],
        liveClasses: scrapedData.homepage.alignYourself?.liveClasses || [],
        selfPacedCourses: scrapedData.homepage.alignYourself?.selfPacedCourses || []
      },
      schools: {
        title: scrapedData.homepage.schools?.title || "Explore Our Schools",
        subtitle: scrapedData.homepage.schools?.subtitle || "Discover the ancient wisdom through our structured learning paths",
        description: scrapedData.homepage.schools?.description || "Our schools offer comprehensive learning paths in Sanskrit, philosophy, and life skills.",
        schools: scrapedData.homepage.schools?.schools || []
      },
      meetGurus: {
        title: scrapedData.homepage.meetGurus?.title || "Meet Our Gurus",
        subtitle: scrapedData.homepage.meetGurus?.subtitle || "Learn from authentic teachers of ancient wisdom",
        description: scrapedData.homepage.meetGurus?.description || "Our experienced teachers guide you through the ancient wisdom traditions.",
        gurus: scrapedData.homepage.meetGurus?.gurus || []
      },
      studentStories: {
        title: scrapedData.homepage.studentStories?.title || "Student Stories",
        subtitle: scrapedData.homepage.studentStories?.subtitle || "Hear from our community of learners",
        stories: scrapedData.homepage.studentStories?.stories || []
      },
      testimonials: {
        title: scrapedData.homepage.testimonials?.title || "What Our Students Say",
        subtitle: scrapedData.homepage.testimonials?.subtitle || "Real experiences from our learning community",
        testimonials: scrapedData.homepage.testimonials?.testimonials || []
      },
      communityPosts: {
        title: scrapedData.homepage.communityPosts?.title || "Community Insights",
        subtitle: scrapedData.homepage.communityPosts?.subtitle || "Latest thoughts and discussions from our community",
        posts: scrapedData.homepage.communityPosts?.posts || []
      },
      foundersMission: {
        title: scrapedData.homepage.foundersMission?.title || "Our Mission",
        subtitle: scrapedData.homepage.foundersMission?.subtitle || "Bridging ancient wisdom with modern learning",
        content: scrapedData.homepage.foundersMission?.content || "We believe in making ancient Indian wisdom accessible to everyone through modern technology and pedagogy.",
        image: scrapedData.homepage.foundersMission?.image || "/images/founders-mission.jpg",
        founderName: scrapedData.homepage.foundersMission?.founderName || "Founder Name",
        founderTitle: scrapedData.homepage.foundersMission?.founderTitle || "Founder & CEO"
      },
      contribute: {
        title: scrapedData.homepage.contribute?.title || "Contribute to Our Mission",
        subtitle: scrapedData.homepage.contribute?.subtitle || "Help us spread ancient wisdom",
        content: scrapedData.homepage.contribute?.content || "Join our community of contributors and help preserve and share ancient knowledge.",
        ctaText: scrapedData.homepage.contribute?.ctaText || "Get Involved",
        ctaLink: scrapedData.homepage.contribute?.ctaLink || "/contribute"
      },
      downloadApp: {
        title: scrapedData.homepage.downloadApp?.title || "Download Our App",
        subtitle: scrapedData.homepage.downloadApp?.subtitle || "Learn on the go with our mobile application",
        features: scrapedData.homepage.downloadApp?.features || [
          { id: "offline", title: "Offline Learning", description: "Download content and learn anywhere", icon: "download" },
          { id: "live", title: "Live Classes", description: "Join interactive sessions with teachers in real-time", icon: "users" },
          { id: "progress", title: "Progress Tracking", description: "Monitor your learning journey with detailed progress tracking", icon: "star" }
        ],
        downloadLinks: scrapedData.homepage.downloadApp?.downloadLinks || {
          android: "https://play.google.com/store",
          ios: "https://apps.apple.com/store"
        }
      },
      faq: {
        title: scrapedData.homepage.faq?.title || "Frequently Asked Questions",
        subtitle: scrapedData.homepage.faq?.subtitle || "Find answers to common questions",
        description: scrapedData.homepage.faq?.description || "Get answers to the most commonly asked questions about our platform and courses.",
        questions: scrapedData.homepage.faq?.questions || []
      }
    };

    // Save to homepage content file
    const homepageContentPath = path.join(process.cwd(), 'data', 'homepage-content.json');
    fs.writeFileSync(homepageContentPath, JSON.stringify(cmsContent, null, 2));
    
    console.log('✅ Successfully populated CMS with scraped data');
    console.log(`📁 Data written to: ${homepageContentPath}`);
    
    // Log summary
    console.log('\n📊 CMS Data Summary:');
    console.log(`- Hero section: ${cmsContent.hero.title}`);
    console.log(`- Featured courses: ${cmsContent.alignYourself.courses.length}`);
    console.log(`- Live classes: ${cmsContent.alignYourself.liveClasses.length}`);
    console.log(`- Self-paced courses: ${cmsContent.alignYourself.selfPacedCourses.length}`);
    console.log(`- Schools: ${cmsContent.schools.schools.length}`);
    console.log(`- Gurus: ${cmsContent.meetGurus.gurus.length}`);
    console.log(`- Student stories: ${cmsContent.studentStories.stories.length}`);
    console.log(`- Testimonials: ${cmsContent.testimonials.testimonials.length}`);
    console.log(`- Community posts: ${cmsContent.communityPosts.posts.length}`);
    console.log(`- FAQ questions: ${cmsContent.faq.questions.length}`);
    
    console.log('\n🎉 CMS population completed successfully!');
    console.log('💡 The CMS now contains all the scraped frontend data.');
    
    return cmsContent;
  } catch (error) {
    console.error('❌ Error populating CMS with scraped data:', error);
    return null;
  }
}

// Function to update other content files
async function updateOtherContentFiles() {
  console.log('🔄 Updating other content files...');
  
  try {
    const scrapedDataPath = path.join(process.cwd(), 'data', 'scraped-frontend-data.json');
    const scrapedData = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf8'));
    
    // Update about content
    if (scrapedData.pages.about) {
      const aboutContent = {
        title: scrapedData.pages.about.title || "About Shikshanam",
        content: scrapedData.pages.about.content || "Learn about our mission and vision.",
        lastModified: new Date().toISOString()
      };
      
      const aboutPath = path.join(process.cwd(), 'data', 'about-content.json');
      fs.writeFileSync(aboutPath, JSON.stringify(aboutContent, null, 2));
      console.log('✅ Updated about content');
    }
    
    // Update contact content
    if (scrapedData.pages.contact) {
      const contactContent = {
        title: scrapedData.pages.contact.title || "Contact Us",
        content: scrapedData.pages.contact.content || "Get in touch with us.",
        lastModified: new Date().toISOString()
      };
      
      const contactPath = path.join(process.cwd(), 'data', 'contact-content.json');
      fs.writeFileSync(contactPath, JSON.stringify(contactContent, null, 2));
      console.log('✅ Updated contact content');
    }
    
    console.log('✅ All content files updated successfully!');
  } catch (error) {
    console.error('❌ Error updating content files:', error);
  }
}

// Main function
async function main() {
  console.log('🚀 Starting comprehensive CMS population...');
  
  // Populate CMS with scraped data
  const cmsContent = await populateCmsWithScrapedData();
  
  if (cmsContent) {
    // Update other content files
    await updateOtherContentFiles();
    
    console.log('\n🎉 All CMS data has been populated successfully!');
    console.log('💡 The frontend and CMS are now synced with scraped data.');
  } else {
    console.error('❌ Failed to populate CMS data');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { populateCmsWithScrapedData, updateOtherContentFiles };
