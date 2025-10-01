import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('nyaya-darshan-course-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching nyaya darshan course content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "Nyaya Darshan Course",
        subtitle: "Logic and Reasoning in Indian Philosophy",
        description: "Master the ancient system of logical reasoning and debate"
      },
      syllabus: {
        title: "Course Syllabus",
        description: "Comprehensive curriculum on Nyaya philosophy"
      },
      outcomes: {
        title: "Learning Outcomes",
        description: "Develop logical thinking and reasoning skills"
      },
      testimonials: {
        title: "Student Testimonials",
        description: "Transform your thinking process"
      },
      pricing: {
        title: "Course Pricing",
        description: "Investment in logical reasoning"
      },
      faq: {
        title: "Frequently Asked Questions",
        description: "Understanding Nyaya Darshan"
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
    await writeContent('nyaya-darshan-course-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Nyaya Darshan course content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating nyaya darshan course content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update nyaya darshan course content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
