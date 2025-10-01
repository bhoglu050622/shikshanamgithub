#!/usr/bin/env node

/**
 * Create Missing Course Content Files
 * Generates default content files for courses that are missing
 */

const fs = require('fs');
const path = require('path');

console.log('📚 Creating Missing Course Content Files');
console.log('=======================================\n');

// List of courses that need content files
const courses = [
  'samkhya-darshan-course',
  'nyaya-darshan-course', 
  'vaisheshik-darshan-course',
  'yoga-darshan-course',
  'tantra-darshan-course'
];

// Default course content structure
const getDefaultCourseContent = (courseId) => ({
  hero: {
    title: getCourseTitle(courseId),
    subtitle: getCourseSubtitle(courseId),
    description: getCourseDescription(courseId),
    image: `/images/courses/${courseId}.jpg`,
    ctaText: 'Enroll Now',
    ctaLink: `/courses/${courseId.replace('-course', '')}`
  },
  syllabus: {
    title: 'Course Syllabus',
    description: 'Comprehensive curriculum covering all essential topics',
    modules: [
      {
        id: 'module-1',
        title: 'Introduction',
        description: 'Introduction to the fundamental concepts',
        duration: '2 weeks',
        lessons: [
          { title: 'Overview', duration: '30 min' },
          { title: 'Key Concepts', duration: '45 min' }
        ]
      },
      {
        id: 'module-2',
        title: 'Core Principles',
        description: 'Deep dive into core principles and theories',
        duration: '3 weeks',
        lessons: [
          { title: 'Fundamental Theories', duration: '60 min' },
          { title: 'Practical Applications', duration: '45 min' }
        ]
      }
    ]
  },
  outcomes: {
    title: 'What You Will Learn',
    description: 'Key learning outcomes and skills you will gain',
    benefits: [
      'Deep understanding of philosophical concepts',
      'Practical application of ancient wisdom',
      'Critical thinking and analytical skills',
      'Cultural and historical context'
    ]
  },
  testimonials: {
    title: 'Student Testimonials',
    description: 'Hear from students who have completed this course',
    testimonials: [
      {
        id: 'testimonial-1',
        name: 'Dr. Sarah Johnson',
        role: 'Philosophy Student',
        content: 'This course provided deep insights into ancient wisdom with modern relevance.',
        rating: 5
      }
    ]
  },
  pricing: {
    title: 'Course Pricing',
    description: 'Flexible pricing options for all learners',
    price: 299,
    originalPrice: 399,
    currency: 'USD',
    features: [
      'Lifetime access to course materials',
      'Interactive learning tools',
      'Certificate of completion',
      'Community support'
    ],
    ctaText: 'Enroll Now',
    ctaLink: `/courses/${courseId.replace('-course', '')}`
  },
  faq: {
    title: 'Frequently Asked Questions',
    description: 'Common questions about this course',
    questions: [
      {
        id: 'faq-1',
        question: 'Do I need prior knowledge?',
        answer: 'No prior knowledge is required. The course starts from basics.'
      },
      {
        id: 'faq-2',
        question: 'How long does it take to complete?',
        answer: 'The course is self-paced and typically takes 4-6 weeks to complete.'
      }
    ]
  }
});

// Helper functions to get course-specific content
function getCourseTitle(courseId) {
  const titles = {
    'samkhya-darshan-course': 'Samkhya Darshan Course',
    'nyaya-darshan-course': 'Nyaya Darshan Course',
    'vaisheshik-darshan-course': 'Vaisheshik Darshan Course',
    'yoga-darshan-course': 'Yoga Darshan Course',
    'tantra-darshan-course': 'Tantra Darshan Course'
  };
  return titles[courseId] || 'Course Title';
}

function getCourseSubtitle(courseId) {
  const subtitles = {
    'samkhya-darshan-course': 'The Philosophy of Numbers and Categories',
    'nyaya-darshan-course': 'Logic and Reasoning in Indian Philosophy',
    'vaisheshik-darshan-course': 'The Philosophy of Particularity',
    'yoga-darshan-course': 'The Philosophy of Union and Liberation',
    'tantra-darshan-course': 'Ancient Tantric Philosophy'
  };
  return subtitles[courseId] || 'Course Subtitle';
}

function getCourseDescription(courseId) {
  const descriptions = {
    'samkhya-darshan-course': 'Explore the analytical philosophy of Samkhya, one of the six orthodox schools of Hindu philosophy.',
    'nyaya-darshan-course': 'Master the logical reasoning system of Nyaya, the foundation of Indian logic and epistemology.',
    'vaisheshik-darshan-course': 'Understand the atomic theory of Vaisheshik and its contributions to Indian philosophy.',
    'yoga-darshan-course': 'Learn the practical philosophy of Yoga and its path to liberation and self-realization.',
    'tantra-darshan-course': 'Discover the esoteric philosophy of Tantra and its transformative practices.'
  };
  return descriptions[courseId] || 'Course description';
}

// Create content files
courses.forEach(courseId => {
  const content = getDefaultCourseContent(courseId);
  const filePath = path.join(process.cwd(), 'data', `${courseId}-content.json`);
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`✅ Created: ${courseId}-content.json`);
  } catch (error) {
    console.error(`❌ Error creating ${courseId}-content.json:`, error.message);
  }
});

console.log('\n🎯 Course Content Files Created!');
console.log('================================');
console.log('All missing course content files have been generated with default content.');
console.log('You can now edit these files through the CMS to customize the content.');
