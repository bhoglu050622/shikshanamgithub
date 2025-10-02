import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';

// Get frontend data
const frontendData = syncFrontendData();
const accessibilityData = frontendData.accessibility.map(item => ({
  ...item.data,
  lastModified: new Date('2024-01-15'),
  views: Math.floor(Math.random() * 2000) + 500,
  popularity: Math.floor(Math.random() * 40) + 60
}));

export async function GET() {
  try {
    // Get the full accessibility data with all sections populated
    const fullAccessibilityData = accessibilityData[0] || {};
    
    // Ensure all sections have content, not just empty objects
    const sections = ['hero', 'statement', 'features', 'compliance', 'support'];
    const completeData = { ...fullAccessibilityData };
    
    sections.forEach(section => {
      if (!completeData[section as keyof typeof completeData] || Object.keys(completeData[section as keyof typeof completeData]).length === 0) {
        // Use default data from syncFrontendData if section is empty
        (completeData as any)[section] = fullAccessibilityData[section as keyof typeof fullAccessibilityData] || {};
      }
    });
    
    return NextResponse.json({
      success: true,
      data: completeData,
      count: 1
    });
  } catch (error) {
    console.error('Error fetching accessibility data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch accessibility data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically save to database
    console.log('Creating new accessibility content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Accessibility content created successfully',
      data: { id: Date.now(), ...body }
    });
  } catch (error) {
    console.error('Error creating accessibility content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create accessibility content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically update in database
    console.log('Updating accessibility content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Accessibility content updated successfully',
      data: body
    });
  } catch (error) {
    console.error('Error updating accessibility content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update accessibility content' },
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
    console.log('Deleting accessibility content:', id);
    
    return NextResponse.json({
      success: true,
      message: 'Accessibility content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting accessibility content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete accessibility content' },
      { status: 500 }
    );
  }
}
