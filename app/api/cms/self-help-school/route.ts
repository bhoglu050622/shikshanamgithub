import { NextRequest, NextResponse } from 'next/server';
import { SelfHelpSchoolContent } from '@/lib/cms/self-help-school-types';
import { readContent, writeContent } from '@/lib/cms/content-manager';

export async function GET() {
  try {
    const content = await readContent<SelfHelpSchoolContent>('self-help-school-content.json');
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error fetching Self-Help school content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch Self-Help school content' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const content: SelfHelpSchoolContent = await request.json();
    await writeContent('self-help-school-content.json', content);
    return NextResponse.json({ 
      success: true, 
      data: content 
    });
  } catch (error) {
    console.error('Error updating Self-Help school content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update Self-Help school content' 
    }, { status: 500 });
  }
}
