import { NextRequest, NextResponse } from 'next/server';
import { SchoolsContent } from '@/lib/cms/schools-types';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent<SchoolsContent>('schools-content.json');
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching schools content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch schools content' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const content: SchoolsContent = await request.json();
    await writeContent('schools-content.json', content);
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error updating schools content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update schools content' 
    }, { status: 500 });
  }
}
