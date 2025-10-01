import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const COURSE_CONTENT_FILE = path.join(process.cwd(), 'data', 'sanskrit-course-content.json');

// Default Sanskrit course content
const defaultCourseContent = {
  hero: {
    title: 'Complete Sanskrit Course',
    subtitle: 'Learn the Language of the Gods',
    description: 'Master Sanskrit language from basics to advanced level with comprehensive grammar, vocabulary, and classical texts.',
    image: '/assets/sanskrit-course-hero.jpg',
    ctaText: 'Start Learning',
    ctaLink: '/courses/sanskrit-course'
  },
  syllabus: {
    title: 'Course Syllabus',
    description: 'Comprehensive Sanskrit language learning program',
    modules: [
      {
        id: 'basics',
        title: 'Sanskrit Basics',
        description: 'Introduction to Sanskrit alphabet, pronunciation, and basic grammar',
        duration: '6 hours',
        topics: ['Devanagari Script', 'Pronunciation', 'Basic Grammar', 'Simple Sentences']
      },
      {
        id: 'grammar',
        title: 'Sanskrit Grammar',
        description: 'Deep dive into Sanskrit grammar including declensions, conjugations, and syntax',
        duration: '12 hours',
        topics: ['Noun Declensions', 'Verb Conjugations', 'Sandhi Rules', 'Compound Words']
      },
      {
        id: 'classical-texts',
        title: 'Classical Texts',
        description: 'Reading and understanding classical Sanskrit texts',
        duration: '8 hours',
        topics: ['Bhagavad Gita', 'Upanishads', 'Vedic Hymns', 'Classical Poetry']
      }
    ]
  },
  outcomes: {
    title: 'What You Will Learn',
    description: 'By the end of this course, you will have a solid foundation in Sanskrit language.',
    benefits: [
      'Read and write in Devanagari script',
      'Understand Sanskrit grammar fundamentals',
      'Read simple Sanskrit texts',
      'Understand classical Sanskrit literature',
      'Develop pronunciation and speaking skills'
    ]
  },
  testimonials: {
    title: 'Student Testimonials',
    description: 'Hear from students who have mastered Sanskrit through this course.',
    testimonials: [
      {
        id: 'testimonial-1',
        name: 'Dr. Anjali Patel',
        role: 'Professor',
        content: 'This course made Sanskrit accessible and enjoyable. The structured approach really works.',
        rating: 5
      },
      {
        id: 'testimonial-2',
        name: 'Michael Chen',
        role: 'Researcher',
        content: 'As a complete beginner, I was amazed at how quickly I could start reading Sanskrit texts.',
        rating: 5
      }
    ]
  },
  pricing: {
    title: 'Course Pricing',
    description: 'Invest in learning the ancient language of wisdom.',
    price: 4999,
    originalPrice: 7999,
    features: [
      'Complete video lectures',
      'Interactive exercises',
      'Downloadable materials',
      'Live practice sessions',
      'Certificate of completion',
      'Lifetime access'
    ],
    ctaText: 'Start Learning',
    ctaLink: '/courses/sanskrit-course'
  },
  faq: {
    title: 'Frequently Asked Questions',
    description: 'Common questions about the Sanskrit course.',
    questions: [
      {
        id: 'faq-1',
        question: 'Is this course suitable for complete beginners?',
        answer: 'Yes, this course is designed for complete beginners and will take you from zero to intermediate level.'
      },
      {
        id: 'faq-2',
        question: 'How long does it take to complete?',
        answer: 'The course is self-paced and typically takes 3-4 months with regular study of 2-3 hours per week.'
      },
      {
        id: 'faq-3',
        question: 'Will I be able to read Sanskrit texts after this course?',
        answer: 'Yes, by the end of the course you will be able to read and understand simple to intermediate Sanskrit texts.'
      }
    ]
  }
};

export async function GET() {
  try {
    if (fs.existsSync(COURSE_CONTENT_FILE)) {
      const content = JSON.parse(fs.readFileSync(COURSE_CONTENT_FILE, 'utf8'));
      return NextResponse.json({ success: true, data: content });
    } else {
      // Create default content file
      fs.writeFileSync(COURSE_CONTENT_FILE, JSON.stringify(defaultCourseContent, null, 2));
      return NextResponse.json({ success: true, data: defaultCourseContent });
    }
  } catch (error) {
    console.error('Error loading Sanskrit course content:', error);
    return NextResponse.json({ success: false, error: 'Failed to load course content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const content = await request.json();
    
    // Validate content structure
    if (!content || typeof content !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid content format' }, { status: 400 });
    }

    // Ensure required sections exist
    const updatedContent = {
      hero: content.hero || defaultCourseContent.hero,
      syllabus: content.syllabus || defaultCourseContent.syllabus,
      outcomes: content.outcomes || defaultCourseContent.outcomes,
      testimonials: content.testimonials || defaultCourseContent.testimonials,
      pricing: content.pricing || defaultCourseContent.pricing,
      faq: content.faq || defaultCourseContent.faq
    };

    fs.writeFileSync(COURSE_CONTENT_FILE, JSON.stringify(updatedContent, null, 2));
    
    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error) {
    console.error('Error saving Sanskrit course content:', error);
    return NextResponse.json({ success: false, error: 'Failed to save course content' }, { status: 500 });
  }
}
