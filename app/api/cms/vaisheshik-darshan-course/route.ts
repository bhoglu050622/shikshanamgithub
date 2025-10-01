import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('vaisheshik-darshan-course-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching vaisheshik darshan course content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "Vaisheshik Darshan Course",
        subtitle: "The Philosophy of Particularity",
        description: "Master the ancient system of Vaisheshik philosophy"
      },
      syllabus: {
        title: "Course Syllabus",
        description: "Comprehensive curriculum on Vaisheshik philosophy"
      },
      outcomes: {
        title: "Learning Outcomes",
        description: "Understand the nature of particularity and atoms"
      },
      testimonials: {
        title: "Student Testimonials",
        description: "Journey of philosophical understanding"
      },
      pricing: {
        title: "Course Pricing",
        description: "Investment in philosophical knowledge"
      },
      faq: {
        title: "Frequently Asked Questions",
        description: "Understanding Vaisheshik Darshan"
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
    await writeContent('vaisheshik-darshan-course-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Vaisheshik Darshan course content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating vaisheshik darshan course content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update vaisheshik darshan course content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
