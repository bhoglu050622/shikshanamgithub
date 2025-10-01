import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'next/server';

// Generic course content structure
const getDefaultCourseContent = (courseId: string) => ({
  hero: {
    title: '',
    subtitle: '',
    description: '',
    image: '',
    ctaText: 'Enroll Now',
    ctaLink: `/courses/${courseId}`
  },
  syllabus: {
    title: 'Course Syllabus',
    description: '',
    modules: []
  },
  outcomes: {
    title: 'What You Will Learn',
    description: '',
    benefits: []
  },
  testimonials: {
    title: 'Student Testimonials',
    description: '',
    testimonials: []
  },
  pricing: {
    title: 'Course Pricing',
    description: '',
    price: 0,
    originalPrice: 0,
    features: [],
    ctaText: 'Enroll Now',
    ctaLink: `/courses/${courseId}`
  },
  faq: {
    title: 'Frequently Asked Questions',
    description: '',
    questions: []
  }
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('id');
    
    if (!courseId) {
      return NextResponse.json({ success: false, error: 'Course ID is required' }, { status: 400 });
    }

    const courseContentFile = path.join(process.cwd(), 'data', `course-${courseId}-content.json`);
    
    if (fs.existsSync(courseContentFile)) {
      const content = JSON.parse(fs.readFileSync(courseContentFile, 'utf8'));
      return NextResponse.json({ success: true, data: content });
    } else {
      // Create default content file
      const defaultContent = getDefaultCourseContent(courseId);
      fs.writeFileSync(courseContentFile, JSON.stringify(defaultContent, null, 2));
      return NextResponse.json({ success: true, data: defaultContent });
    }
  } catch (error) {
    console.error('Error loading course content:', error);
    return NextResponse.json({ success: false, error: 'Failed to load course content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('id');
    
    if (!courseId) {
      return NextResponse.json({ success: false, error: 'Course ID is required' }, { status: 400 });
    }

    const content = await request.json();
    
    // Validate content structure
    if (!content || typeof content !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid content format' }, { status: 400 });
    }

    const courseContentFile = path.join(process.cwd(), 'data', `course-${courseId}-content.json`);
    
    // Ensure required sections exist
    const defaultContent = getDefaultCourseContent(courseId);
    const updatedContent = {
      hero: content.hero || defaultContent.hero,
      syllabus: content.syllabus || defaultContent.syllabus,
      outcomes: content.outcomes || defaultContent.outcomes,
      testimonials: content.testimonials || defaultContent.testimonials,
      pricing: content.pricing || defaultContent.pricing,
      faq: content.faq || defaultContent.faq
    };

    fs.writeFileSync(courseContentFile, JSON.stringify(updatedContent, null, 2));
    
    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error) {
    console.error('Error saving course content:', error);
    return NextResponse.json({ success: false, error: 'Failed to save course content' }, { status: 500 });
  }
}
