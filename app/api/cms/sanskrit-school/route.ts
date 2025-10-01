import { NextRequest, NextResponse } from 'next/server';
import { SchoolPageContent } from '@/lib/cms/school-page-types';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent<SchoolPageContent>('sanskrit-school-content.json');
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching Sanskrit school content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch Sanskrit school content' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const content: SchoolPageContent = await request.json();
    await writeContent('sanskrit-school-content.json', content);
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error updating Sanskrit school content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update Sanskrit school content' 
    }, { status: 500 });
  }
}
