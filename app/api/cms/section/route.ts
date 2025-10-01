import { NextRequest, NextResponse } from 'next/server';
import { ContentManager } from '@/lib/cms/content-manager';
import { HomepageContent } from '@/lib/cms/types';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data } = body;
    
    if (!section || !data) {
      return NextResponse.json(
        { success: false, error: 'Section and data are required' },
        { status: 400 }
      );
    }
    
    // Validate section name
    const validSections: (keyof HomepageContent)[] = [
      'hero', 'alignYourself', 'schools', 'meetGurus', 
      'studentStories', 'testimonials', 'communityPosts', 
      'foundersMission', 'contribute', 'downloadApp', 'faq'
    ];
    
    if (!validSections.includes(section)) {
      return NextResponse.json(
        { success: false, error: 'Invalid section name' },
        { status: 400 }
      );
    }
    
    const contentManager = ContentManager.getInstance();
    contentManager.updateSection(section, data);
    
    return NextResponse.json({ 
      success: true, 
      message: `Section '${section}' updated successfully` 
    });
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update section' },
      { status: 500 }
    );
  }
}
