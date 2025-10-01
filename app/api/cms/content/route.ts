import { NextRequest, NextResponse } from 'next/server';
import { ContentManager } from '@/lib/cms/content-manager';
import { HomepageContent } from '@/lib/cms/types';

export async function GET() {
  try {
    const contentManager = ContentManager.getInstance();
    const content = contentManager.getContent();
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const contentManager = ContentManager.getInstance();
    
    // Validate the content structure
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid content format' },
        { status: 400 }
      );
    }
    
    contentManager.updateContent(body as HomepageContent);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
