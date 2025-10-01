import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('darshana-school-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching darshana school content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "Darshana School",
        subtitle: "Ancient Wisdom for Modern Life",
        description: "Discover the profound teachings of Darshana philosophy"
      },
      meetGurus: {
        title: "Meet Our Gurus",
        description: "Learn from experienced teachers"
      },
      learningPath: {
        title: "Learning Path",
        description: "Structured curriculum for spiritual growth"
      },
      mission: {
        title: "Our Mission",
        description: "Preserving and sharing ancient wisdom"
      },
      community: {
        title: "Community",
        description: "Join our spiritual community"
      },
      app: {
        title: "Mobile App",
        description: "Access teachings on the go"
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
    await writeContent('darshana-school-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Darshana school content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating darshana school content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update darshana school content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}