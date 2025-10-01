import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('sanskrit-live-class-course-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching sanskrit live class course content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "Sanskrit Live Class Course",
        subtitle: "Interactive Sanskrit Learning",
        description: "Learn Sanskrit through live interactive sessions with expert teachers"
      },
      syllabus: {
        title: "Course Syllabus",
        description: "Structured curriculum for Sanskrit mastery"
      },
      outcomes: {
        title: "Learning Outcomes",
        description: "Master the language of the gods"
      },
      testimonials: {
        title: "Student Testimonials",
        description: "Success stories from our students"
      },
      pricing: {
        title: "Course Pricing",
        description: "Flexible options for live learning"
      },
      faq: {
        title: "Frequently Asked Questions",
        description: "Everything about our live classes"
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
    await writeContent('sanskrit-live-class-course-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Sanskrit live class course content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating sanskrit live class course content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update sanskrit live class course content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
