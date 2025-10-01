import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('kashmir-shaivism-course-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching kashmir shaivism course content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "Kashmir Shaivism Course",
        subtitle: "The Philosophy of Recognition",
        description: "Discover the profound wisdom of Kashmir Shaivism"
      },
      syllabus: {
        title: "Course Syllabus",
        description: "Deep dive into Shaivite philosophy and practices"
      },
      outcomes: {
        title: "Learning Outcomes",
        description: "Transform your understanding of consciousness"
      },
      testimonials: {
        title: "Student Testimonials",
        description: "Journey of spiritual awakening"
      },
      pricing: {
        title: "Course Pricing",
        description: "Investment in your spiritual growth"
      },
      faq: {
        title: "Frequently Asked Questions",
        description: "Understanding Kashmir Shaivism"
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
    await writeContent('kashmir-shaivism-course-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Kashmir Shaivism course content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating kashmir shaivism course content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update kashmir shaivism course content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
