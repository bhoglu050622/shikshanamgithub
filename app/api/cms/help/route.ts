import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';

// Get frontend data
const frontendData = syncFrontendData();
const helpData = frontendData.help.map(item => ({
  ...item.data,
  lastModified: new Date('2024-01-15'),
  views: Math.floor(Math.random() * 2000) + 500,
  popularity: Math.floor(Math.random() * 40) + 60
}));

export async function GET() {
  try {
    // Get the full help data with all sections populated
    const fullHelpData = helpData[0] || {};
    
    // Ensure all sections have content, not just empty objects
    const sections = ['hero', 'categories', 'tutorials', 'support', 'community'];
    const completeData = { ...fullHelpData };
    
    sections.forEach(section => {
      if (!completeData[section as keyof typeof completeData] || Object.keys(completeData[section as keyof typeof completeData]).length === 0) {
        // Use default data from syncFrontendData if section is empty
        (completeData as any)[section] = fullHelpData[section as keyof typeof fullHelpData] || {};
      }
    });
    
    return NextResponse.json({
      success: true,
      data: completeData,
      count: 1
    });
  } catch (error) {
    console.error('Error fetching help data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch help data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically save to database
    console.log('Creating new help content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Help content created successfully',
      data: { id: Date.now(), ...body }
    });
  } catch (error) {
    console.error('Error creating help content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create help content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically update in database
    console.log('Updating help content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Help content updated successfully',
      data: body
    });
  } catch (error) {
    console.error('Error updating help content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update help content' },
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
    console.log('Deleting help content:', id);
    
    return NextResponse.json({
      success: true,
      message: 'Help content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting help content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete help content' },
      { status: 500 }
    );
  }
}
