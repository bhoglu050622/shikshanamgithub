import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('yoga-darshan-course-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching yoga darshan course content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "Yoga Darshan Course",
        subtitle: "The Philosophy of Union",
        description: "Master the ancient system of Yoga philosophy"
      },
      syllabus: {
        title: "Course Syllabus",
        description: "Comprehensive curriculum on Yoga philosophy"
      },
      outcomes: {
        title: "Learning Outcomes",
        description: "Understand the path to spiritual union"
      },
      testimonials: {
        title: "Student Testimonials",
        description: "Journey of spiritual practice"
      },
      pricing: {
        title: "Course Pricing",
        description: "Investment in spiritual development"
      },
      faq: {
        title: "Frequently Asked Questions",
        description: "Understanding Yoga Darshan"
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
    await writeContent('yoga-darshan-course-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Yoga Darshan course content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating yoga darshan course content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update yoga darshan course content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
