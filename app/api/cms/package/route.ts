import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Generic package content structure
const getDefaultPackageContent = (packageId: string) => ({
  hero: {
    title: '',
    subtitle: '',
    description: '',
    image: '',
    ctaText: 'Get This Package',
    ctaLink: `/courses/${packageId}`
  },
  courses: {
    title: 'Included Courses',
    description: '',
    courseList: []
  },
  pricing: {
    title: 'Package Pricing',
    description: '',
    price: 0,
    originalPrice: 0,
    savings: 0,
    features: [],
    ctaText: 'Get This Package',
    ctaLink: `/courses/${packageId}`
  },
  benefits: {
    title: 'Package Benefits',
    description: '',
    benefits: []
  },
  testimonials: {
    title: 'Student Testimonials',
    description: '',
    testimonials: []
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
    const packageId = searchParams.get('id');
    
    if (!packageId) {
      return NextResponse.json({ success: false, error: 'Package ID is required' }, { status: 400 });
    }

    const packageContentFile = path.join(process.cwd(), 'data', `package-${packageId}-content.json`);
    
    if (fs.existsSync(packageContentFile)) {
      const content = JSON.parse(fs.readFileSync(packageContentFile, 'utf8'));
      return NextResponse.json({ success: true, data: content });
    } else {
      // Create default content file
      const defaultContent = getDefaultPackageContent(packageId);
      fs.writeFileSync(packageContentFile, JSON.stringify(defaultContent, null, 2));
      return NextResponse.json({ success: true, data: defaultContent });
    }
  } catch (error) {
    console.error('Error loading package content:', error);
    return NextResponse.json({ success: false, error: 'Failed to load package content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const packageId = searchParams.get('id');
    
    if (!packageId) {
      return NextResponse.json({ success: false, error: 'Package ID is required' }, { status: 400 });
    }

    const content = await request.json();
    
    // Validate content structure
    if (!content || typeof content !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid content format' }, { status: 400 });
    }

    const packageContentFile = path.join(process.cwd(), 'data', `package-${packageId}-content.json`);
    
    // Ensure required sections exist
    const defaultContent = getDefaultPackageContent(packageId);
    const updatedContent = {
      hero: content.hero || defaultContent.hero,
      courses: content.courses || defaultContent.courses,
      pricing: content.pricing || defaultContent.pricing,
      benefits: content.benefits || defaultContent.benefits,
      testimonials: content.testimonials || defaultContent.testimonials,
      faq: content.faq || defaultContent.faq
    };

    fs.writeFileSync(packageContentFile, JSON.stringify(updatedContent, null, 2));
    
    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error) {
    console.error('Error saving package content:', error);
    return NextResponse.json({ success: false, error: 'Failed to save package content' }, { status: 500 });
  }
}
