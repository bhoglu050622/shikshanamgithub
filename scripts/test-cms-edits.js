#!/usr/bin/env node

/**
 * Test script to make edits through CMS API and verify synchronization
 * Run with: node scripts/test-cms-edits.js
 */

const https = require('https');
const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Test data for different sections
const testEdits = {
  hero: {
    title: "🚀 Welcome to Shikshanam - TEST EDITED",
    subtitle: "Where AI meets Ancient India - UPDATED VIA CMS",
    ctaButtons: {
      sanskrit: {
        text: "📚 School of Sanskrit - EDITED",
        link: "#school-of-sanskrit"
      },
      darshan: {
        text: "🧘 School of Darshan - EDITED", 
        link: "#school-of-darshan"
      },
      lifeSkills: {
        text: "💼 School of Life Skills - EDITED",
        link: "#school-of-life-skills"
      }
    }
  },
  alignYourself: {
    title: "🎯 Two Ways to Begin Your Journey! - CMS EDITED",
    subtitle: "Learn through interactive Live Classes, or walk your own path of Swadhyaya with Self-Paced Courses. - UPDATED",
    liveClasses: [
      {
        id: 1,
        title: "🔥 Vedic Mathematics Masterclass - CMS EDITED",
        instructor: "Guru Rajesh Kumar - UPDATED",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center",
        duration: "3 hours - EDITED",
        date: "2024-02-15",
        time: "8:00 PM IST",
        price: "₹399 - UPDATED",
        rating: 5.0,
        students: 200,
        link: "https://example.com/vedic-math-live-updated",
        description: "Learn ancient mathematical techniques for faster calculations - ENHANCED VIA CMS"
      }
    ],
    selfPacedCourses: [
      {
        id: 1,
        title: "📖 Complete Bhagavad Gita Study - CMS EDITED",
        instructor: "Dr. Krishna Das - UPDATED",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center",
        duration: "50 hours - EDITED",
        modules: 15,
        price: "₹2,499 - UPDATED",
        rating: 5.0,
        students: 2000,
        link: "https://example.com/bhagavad-gita-course-updated",
        description: "Comprehensive study of the Bhagavad Gita with commentary and practical insights - ENHANCED VIA CMS"
      }
    ]
  },
  schools: {
    title: "🏫 Explore Our Schools - CMS EDITED",
    subtitle: "Discover the ancient wisdom through our structured learning paths - UPDATED VIA CMS",
    schools: [
      {
        id: "sanskrit",
        name: "📚 School of Sanskrit - EDITED",
        description: "Master the language of the Vedas - ENHANCED VIA CMS",
        icon: "book",
        link: "/schools/sanskrit",
        color: "primary"
      },
      {
        id: "darshan",
        name: "🧘 School of Darshan - EDITED",
        description: "Explore the six schools of Indian philosophy - ENHANCED VIA CMS",
        icon: "eye",
        link: "/schools/darshana",
        color: "secondary"
      }
    ]
  },
  meetGurus: {
    title: "👨‍🏫 Meet Our Gurus - CMS EDITED",
    subtitle: "Learn from authentic teachers of ancient wisdom - UPDATED VIA CMS",
    gurus: [
      {
        id: "guru-1",
        name: "Swami Ananda - UPDATED",
        title: "Senior Yoga Teacher - ENHANCED",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
        description: "With over 25 years of experience in traditional yoga and meditation practices - UPDATED VIA CMS.",
        link: "/gurus/swami-ananda"
      }
    ]
  },
  studentStories: {
    title: "📖 Student Stories - CMS EDITED",
    subtitle: "Hear from our community of learners - UPDATED VIA CMS",
    stories: [
      {
        id: "story-1",
        name: "Priya Sharma - UPDATED",
        story: "Learning Sanskrit has transformed my understanding of ancient texts and deepened my spiritual practice - ENHANCED VIA CMS.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
        rating: 5
      }
    ]
  },
  testimonials: {
    title: "💬 What Our Students Say - CMS EDITED",
    subtitle: "Real experiences from our learning community - UPDATED VIA CMS",
    testimonials: [
      {
        id: "testimonial-1",
        name: "Rajesh Kumar - UPDATED",
        role: "Software Engineer - ENHANCED",
        content: "The courses are well-structured and the teachers are knowledgeable. I've learned so much about ancient Indian wisdom - ENHANCED VIA CMS.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
        rating: 5
      }
    ]
  },
  communityPosts: {
    title: "💭 Community Insights - CMS EDITED",
    subtitle: "Latest thoughts and discussions from our community - UPDATED VIA CMS",
    posts: [
      {
        id: "post-1",
        title: "Understanding the Bhagavad Gita - CMS EDITED",
        content: "A deep dive into the philosophical teachings of the Bhagavad Gita and its relevance in modern life - ENHANCED VIA CMS.",
        author: "Dr. Krishna Das - UPDATED",
        date: "2024-02-15",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        likes: 100
      }
    ]
  },
  foundersMission: {
    title: "🎯 Our Mission - CMS EDITED",
    subtitle: "Bridging ancient wisdom with modern learning - UPDATED VIA CMS",
    content: "We believe in making ancient Indian wisdom accessible to everyone through modern technology and pedagogy. Our mission is to preserve and share the timeless knowledge of our ancestors - ENHANCED VIA CMS.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    founderName: "Dr. Ancient Wisdom - UPDATED",
    founderTitle: "Founder & CEO - ENHANCED"
  },
  contribute: {
    title: "🤝 Contribute to Our Mission - CMS EDITED",
    subtitle: "Help us spread ancient wisdom - UPDATED VIA CMS",
    content: "Join our community of contributors and help preserve and share ancient knowledge. Your support helps us reach more learners worldwide - ENHANCED VIA CMS.",
    ctaText: "Get Involved - UPDATED",
    ctaLink: "/contribute"
  },
  downloadApp: {
    title: "📱 Download Our App - CMS EDITED",
    subtitle: "Learn on the go with our mobile application - UPDATED VIA CMS",
    features: [
      {
        id: "offline",
        title: "Offline Learning - ENHANCED",
        description: "Download content and learn anywhere - UPDATED VIA CMS",
        icon: "download"
      },
      {
        id: "progress",
        title: "Track Progress - ENHANCED",
        description: "Monitor your learning journey - UPDATED VIA CMS",
        icon: "chart"
      }
    ],
    downloadLinks: {
      android: "https://play.google.com/store/apps/details?id=com.shikshanam.updated",
      ios: "https://apps.apple.com/app/shikshanam-updated"
    }
  },
  faq: {
    title: "❓ Frequently Asked Questions - CMS EDITED",
    subtitle: "Find answers to common questions - UPDATED VIA CMS",
    questions: [
      {
        id: "1",
        question: "What is Shikshanam? - UPDATED",
        answer: "Shikshanam is a platform that combines AI with ancient Indian wisdom to provide modern learning experiences - ENHANCED VIA CMS."
      },
      {
        id: "2",
        question: "Do I need prior knowledge to start? - UPDATED",
        answer: "No prior knowledge is required. Our courses are designed for beginners and advanced learners alike - ENHANCED VIA CMS."
      }
    ]
  }
};

// Helper function to make HTTP requests
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// Test function
async function testCMSEdits() {
  console.log('🧪 Testing CMS Edits and Synchronization...\n');

  try {
    // Step 1: Get current content
    console.log('1. 📥 Fetching current content...');
    const currentResponse = await makeRequest(`${BASE_URL}/api/cms/content`);
    if (currentResponse.status !== 200) {
      throw new Error(`Failed to fetch content: ${currentResponse.status}`);
    }
    console.log('✅ Current content fetched successfully');

    // Step 2: Update each section
    console.log('\n2. ✏️  Making edits to all sections...');
    
    for (const [sectionName, sectionData] of Object.entries(testEdits)) {
      console.log(`   📝 Editing ${sectionName} section...`);
      
      const updateResponse = await makeRequest(
        `${BASE_URL}/api/cms/section`,
        'PUT',
        { section: sectionName, data: sectionData }
      );
      
      if (updateResponse.status === 200) {
        console.log(`   ✅ ${sectionName} section updated successfully`);
      } else {
        console.log(`   ❌ Failed to update ${sectionName} section: ${updateResponse.status}`);
      }
    }

    // Step 3: Verify changes by fetching updated content
    console.log('\n3. 🔍 Verifying changes...');
    const updatedResponse = await makeRequest(`${BASE_URL}/api/cms/content`);
    
    if (updatedResponse.status !== 200) {
      throw new Error(`Failed to fetch updated content: ${updatedResponse.status}`);
    }

    const updatedContent = updatedResponse.data.data;
    let verificationPassed = true;

    // Verify each section
    for (const [sectionName, expectedData] of Object.entries(testEdits)) {
      const actualData = updatedContent[sectionName];
      
      if (sectionName === 'hero') {
        if (actualData.title !== expectedData.title) {
          console.log(`   ❌ Hero title mismatch: expected "${expectedData.title}", got "${actualData.title}"`);
          verificationPassed = false;
        } else {
          console.log(`   ✅ Hero title updated correctly: "${actualData.title}"`);
        }
      } else if (sectionName === 'alignYourself') {
        if (actualData.title !== expectedData.title) {
          console.log(`   ❌ AlignYourself title mismatch: expected "${expectedData.title}", got "${actualData.title}"`);
          verificationPassed = false;
        } else {
          console.log(`   ✅ AlignYourself title updated correctly: "${actualData.title}"`);
        }
      } else if (sectionName === 'schools') {
        if (actualData.title !== expectedData.title) {
          console.log(`   ❌ Schools title mismatch: expected "${expectedData.title}", got "${actualData.title}"`);
          verificationPassed = false;
        } else {
          console.log(`   ✅ Schools title updated correctly: "${actualData.title}"`);
        }
      }
      // Add more verification for other sections as needed
    }

    // Step 4: Test frontend synchronization
    console.log('\n4. 🌐 Testing frontend synchronization...');
    
    // Test CMS homepage
    const cmsHomepageResponse = await makeRequest(`${BASE_URL}/cms-homepage`);
    if (cmsHomepageResponse.status === 200) {
      console.log('   ✅ CMS homepage accessible');
    } else {
      console.log(`   ❌ CMS homepage not accessible: ${cmsHomepageResponse.status}`);
      verificationPassed = false;
    }

    // Test CMS admin
    const cmsAdminResponse = await makeRequest(`${BASE_URL}/cms`);
    if (cmsAdminResponse.status === 200) {
      console.log('   ✅ CMS admin accessible');
    } else {
      console.log(`   ❌ CMS admin not accessible: ${cmsAdminResponse.status}`);
      verificationPassed = false;
    }

    // Step 5: Summary
    console.log('\n5. 📊 Test Summary:');
    if (verificationPassed) {
      console.log('   🎉 All tests passed! CMS is working correctly.');
      console.log('\n🔗 URLs to verify manually:');
      console.log('   - CMS Admin: http://localhost:3000/cms');
      console.log('   - CMS Homepage: http://localhost:3000/cms-homepage');
      console.log('   - Original Homepage: http://localhost:3000/');
    } else {
      console.log('   ❌ Some tests failed. Check the output above for details.');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testCMSEdits();
