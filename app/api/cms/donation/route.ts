import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent('donation-content.json');
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching donation content:', error);
    // Return default content if file doesn't exist
    const defaultContent = {
      hero: {
        title: "Support Our Mission",
        subtitle: "Help us preserve and share ancient wisdom",
        description: "Your contribution helps us maintain our teachings and reach more people"
      },
      impact: {
        title: "Our Impact",
        description: "See how your donations make a difference"
      },
      causes: {
        title: "Causes We Support",
        description: "Learn about the initiatives we fund"
      },
      options: {
        title: "Donation Options",
        description: "Choose how you'd like to contribute"
      },
      testimonials: {
        title: "Donor Testimonials",
        description: "Hear from our supporters"
      },
      faq: {
        title: "Frequently Asked Questions",
        description: "Common questions about donations"
      },
      cta: {
        title: "Make a Difference Today",
        description: "Join us in preserving ancient wisdom"
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
    await writeContent('donation-content.json', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Donation content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating donation content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update donation content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}