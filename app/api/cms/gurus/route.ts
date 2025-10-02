import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';

// Get frontend data
const frontendData = syncFrontendData();
const gurusData = frontendData.gurus.map(item => ({
  ...item.data,
  lastModified: new Date('2024-01-15'),
  views: Math.floor(Math.random() * 2000) + 500,
  popularity: Math.floor(Math.random() * 40) + 60
}));

export async function GET() {
  try {
    // Get the full gurus data with all sections populated
    const fullGurusData = gurusData[0] || {};
    
    // Ensure all sections have content, not just empty objects
    const sections = ['hero', 'featured', 'allGurus'];
    const completeData = { ...fullGurusData };
    
    sections.forEach(section => {
      if (!completeData[section as keyof typeof completeData] || Object.keys(completeData[section as keyof typeof completeData]).length === 0) {
        // Use default data from syncFrontendData if section is empty
        (completeData as any)[section] = fullGurusData[section as keyof typeof fullGurusData] || {};
      }
    });
    
    return NextResponse.json({
      success: true,
      data: completeData,
      count: 1
    });
  } catch (error) {
    console.error('Error fetching gurus data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gurus data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically save to database
    console.log('Creating new gurus content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Gurus content created successfully',
      data: { id: Date.now(), ...body }
    });
  } catch (error) {
    console.error('Error creating gurus content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create gurus content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically update in database
    console.log('Updating gurus content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Gurus content updated successfully',
      data: body
    });
  } catch (error) {
    console.error('Error updating gurus content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update gurus content' },
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
    console.log('Deleting gurus content:', id);
    
    return NextResponse.json({
      success: true,
      message: 'Gurus content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting gurus content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete gurus content' },
      { status: 500 }
    );
  }
}
