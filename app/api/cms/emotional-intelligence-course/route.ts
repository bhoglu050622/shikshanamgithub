import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('emotional-intelligence-course-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching emotional intelligence course content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "Emotional Intelligence Course",
        subtitle: "Master Your Emotions with Samkhya Darshan",
        description: "Learn to understand and manage emotions through ancient wisdom"
      },
      syllabus: {
        title: "Course Syllabus",
        description: "Comprehensive curriculum on emotional mastery"
      },
      outcomes: {
        title: "Learning Outcomes",
        description: "Transform your emotional intelligence and life"
      },
      testimonials: {
        title: "Student Testimonials",
        description: "Real stories of transformation"
      },
      pricing: {
        title: "Course Pricing",
        description: "Investment in your emotional growth"
      },
      faq: {
        title: "Frequently Asked Questions",
        description: "Everything you need to know"
      }
    };
    
    return NextResponse.json({ 
      success: true, 
      data: defaultContent 
    });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await writeContent('emotional-intelligence-course-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Emotional intelligence course content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating emotional intelligence course content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update emotional intelligence course content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
