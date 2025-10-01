import { NextRequest, NextResponse } from 'next/server';
import { AboutContent } from '@/lib/cms/about-types';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent<AboutContent>('about-content.json');
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch about content' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const content: AboutContent = await request.json();
    await writeContent('about-content.json', content);
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update about content' 
    }, { status: 500 });
  }
}
