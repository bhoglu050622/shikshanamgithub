import { NextResponse } from 'next/server';
import { ContentManager } from '@/lib/cms/content-manager';

export async function POST() {
  try {
    const contentManager = ContentManager.getInstance();
    contentManager.resetToDefault();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content reset to default successfully' 
    });
  } catch (error) {
    console.error('Error resetting content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset content' },
      { status: 500 }
    );
  }
}
