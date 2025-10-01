import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('about-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching about content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "About Shikshanam",
        subtitle: "Preserving Ancient Wisdom for Modern Times",
        description: "Learn about our mission to bridge ancient wisdom with modern life"
      },
      mission: {
        title: "Our Mission",
        description: "To preserve and share the profound teachings of ancient India"
      },
      team: {
        title: "Our Team",
        description: "Meet the people behind our mission"
      },
      values: {
        title: "Our Values",
        description: "The principles that guide our work"
      },
      history: {
        title: "Our History",
        description: "The journey that brought us here"
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
    await writeContent('about-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'About content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update about content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}