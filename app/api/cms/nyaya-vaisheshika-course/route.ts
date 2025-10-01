import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('nyaya-vaisheshika-course-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching nyaya-vaisheshika course content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "Nyaya-Vaisheshika Course",
        subtitle: "Logic and Particularity in Indian Philosophy",
        description: "Master the ancient systems of Nyaya and Vaisheshika philosophy"
      },
      syllabus: {
        title: "Course Syllabus",
        description: "Comprehensive curriculum covering both philosophical systems"
      },
      outcomes: {
        title: "Learning Outcomes",
        description: "What you'll achieve through this course"
      },
      testimonials: {
        title: "Student Testimonials",
        description: "Hear from our students about their experience"
      },
      pricing: {
        title: "Course Pricing",
        description: "Flexible pricing options for all learners"
      },
      faq: {
        title: "Frequently Asked Questions",
        description: "Common questions about the course"
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
    await writeContent('nyaya-vaisheshika-course-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Nyaya-Vaisheshika course content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating nyaya-vaisheshika course content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update nyaya-vaisheshika course content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
