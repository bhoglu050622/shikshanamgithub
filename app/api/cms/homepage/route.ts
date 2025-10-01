import { NextResponse } from 'next/server';
import { ContentManager } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const contentManager = ContentManager.getInstance();
    const content = contentManager.getContent();
    
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch homepage content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const contentManager = ContentManager.getInstance();
    contentManager.updateContent(body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Homepage content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating homepage content:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update homepage content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
