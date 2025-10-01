import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('samkhya-darshan-course-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching samkhya darshan course content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "Samkhya Darshan Course",
        subtitle: "The Philosophy of Numbers and Categories",
        description: "Explore the ancient system of Samkhya philosophy"
      },
      syllabus: {
        title: "Course Syllabus",
        description: "Comprehensive curriculum on Samkhya philosophy"
      },
      outcomes: {
        title: "Learning Outcomes",
        description: "Understand the nature of reality and consciousness"
      },
      testimonials: {
        title: "Student Testimonials",
        description: "Journey of philosophical discovery"
      },
      pricing: {
        title: "Course Pricing",
        description: "Investment in philosophical understanding"
      },
      faq: {
        title: "Frequently Asked Questions",
        description: "Understanding Samkhya Darshan"
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
    await writeContent('samkhya-darshan-course-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Samkhya Darshan course content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating samkhya darshan course content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update samkhya darshan course content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
