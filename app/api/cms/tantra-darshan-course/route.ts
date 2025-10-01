import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('tantra-darshan-course-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching tantra darshan course content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "Tantra Darshan Course",
        subtitle: "Ancient Tantric Philosophy",
        description: "Explore the profound wisdom of Tantra philosophy"
      },
      syllabus: {
        title: "Course Syllabus",
        description: "Comprehensive curriculum on Tantra philosophy"
      },
      outcomes: {
        title: "Learning Outcomes",
        description: "Understand the transformative power of Tantra"
      },
      testimonials: {
        title: "Student Testimonials",
        description: "Journey of spiritual transformation"
      },
      pricing: {
        title: "Course Pricing",
        description: "Investment in spiritual growth"
      },
      faq: {
        title: "Frequently Asked Questions",
        description: "Understanding Tantra Darshan"
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
    await writeContent('tantra-darshan-course-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Tantra Darshan course content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating tantra darshan course content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update tantra darshan course content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
