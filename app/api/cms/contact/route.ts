import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('contact-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching contact content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "Contact Us",
        subtitle: "Get in Touch",
        description: "We'd love to hear from you and answer any questions you may have"
      },
      form: {
        title: "Send us a Message",
        description: "Fill out the form below and we'll get back to you"
      },
      info: {
        title: "Contact Information",
        description: "Reach us through various channels"
      },
      map: {
        title: "Find Us",
        description: "Visit our physical location"
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
    await writeContent('contact-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Contact content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating contact content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update contact content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}