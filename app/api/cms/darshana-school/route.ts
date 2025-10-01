import { NextRequest, NextResponse } from 'next/server';
import { DarshanaSchoolContent } from '@/lib/cms/darshana-school-types';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent<DarshanaSchoolContent>('darshana-school-content.json');
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching Darshana school content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch Darshana school content' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const content: DarshanaSchoolContent = await request.json();
    await writeContent('darshana-school-content.json', content);
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error updating Darshana school content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update Darshana school content' 
    }, { status: 500 });
  }
}
