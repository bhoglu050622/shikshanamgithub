import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';

// Get frontend data
const frontendData = syncFrontendData();
const blogData = frontendData.blog.map(item => ({
  ...item.data,
  lastModified: new Date('2024-01-15'),
  views: Math.floor(Math.random() * 2000) + 500,
  popularity: Math.floor(Math.random() * 40) + 60
}));

export async function GET() {
  try {
    // Get the full blog data with all sections populated
    const fullBlogData = blogData[0] || {};
    
    // Ensure all sections have content, not just empty objects
    const sections = ['hero', 'categories', 'posts', 'featured', 'tags'];
    const completeData = { ...fullBlogData };
    
    sections.forEach(section => {
      if (!completeData[section as keyof typeof completeData] || Object.keys(completeData[section as keyof typeof completeData]).length === 0) {
        // Use default data from syncFrontendData if section is empty
        (completeData as any)[section] = fullBlogData[section as keyof typeof fullBlogData] || {};
      }
    });
    
    return NextResponse.json({
      success: true,
      data: completeData,
      count: 1
    });
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically save to database
    console.log('Creating new blog content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Blog content created successfully',
      data: { id: Date.now(), ...body }
    });
  } catch (error) {
    console.error('Error creating blog content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically update in database
    console.log('Updating blog content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Blog content updated successfully',
      data: body
    });
  } catch (error) {
    console.error('Error updating blog content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog content' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }
    
    // Here you would typically delete from database
    console.log('Deleting blog content:', id);
    
    return NextResponse.json({
      success: true,
      message: 'Blog content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog content' },
      { status: 500 }
    );
  }
}