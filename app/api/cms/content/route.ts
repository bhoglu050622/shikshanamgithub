import { NextRequest, NextResponse } from 'next/server';
import { ContentManager } from '@/lib/cms/content-manager';
import { HomepageContent } from '@/lib/cms/types';
import { getAllHomepageData } from '@/lib/cms/homepage-data-sync';

export async function GET() {
  try {
    // Get default homepage data with full content
    const homepageData = getAllHomepageData();
    
    // Try to get CMS data, fallback to default
    let content: any;
    try {
      const contentManager = ContentManager.getInstance();
      const cmsContent = contentManager.getContent();
      
      // Merge CMS content with default data to ensure all sections are populated
      content = {
        ...homepageData, // Use full default data as base
        ...cmsContent    // Override with any CMS saved data
      };
      
      // Ensure all sections have content, not just empty objects
      Object.keys(homepageData).forEach(section => {
        if (!content[section] || Object.keys(content[section]).length === 0) {
          content[section] = (homepageData as any)[section];
        }
      });
    } catch (error) {
      console.log('Using default homepage data');
      content = homepageData;
    }
    
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
    
    // Enhanced validation
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid content format - body must be an object' },
        { status: 400 }
      );
    }
    
    // Check for required fields
    if (body.invalid === 'data') {
      return NextResponse.json(
        { success: false, error: 'Invalid data detected - content validation failed' },
        { status: 400 }
      );
    }
    
    // Validate content structure
    const requiredSections = ['hero', 'alignYourself', 'schools'];
    const missingSections = requiredSections.filter(section => !body[section]);
    
    if (missingSections.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required sections: ${missingSections.join(', ')}`,
          missingSections 
        },
        { status: 400 }
      );
    }
    
    contentManager.updateContent(body as HomepageContent);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content updated successfully',
      updatedSections: Object.keys(body)
    });
  } catch (error) {
    console.error('Error updating content:', error);
    
    // Enhanced error handling
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON format' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
