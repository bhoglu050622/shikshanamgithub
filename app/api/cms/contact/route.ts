import { NextRequest, NextResponse } from 'next/server';
import { ContactContent } from '@/lib/cms/contact-types';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent<ContactContent>('contact-content.json');
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching contact content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch contact content' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const content: ContactContent = await request.json();
    await writeContent('contact-content.json', content);
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error updating contact content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update contact content' 
    }, { status: 500 });
  }
}
