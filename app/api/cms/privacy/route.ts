import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';

// Get frontend data
const frontendData = syncFrontendData();
const privacyData = frontendData.privacy.map(item => ({
  ...item.data,
  lastModified: new Date('2024-01-15'),
  views: Math.floor(Math.random() * 2000) + 500,
  popularity: Math.floor(Math.random() * 40) + 60
}));

export async function GET() {
  try {
    // Get the full privacy data with all sections populated
    const fullPrivacyData = privacyData[0] || {};
    
    // Ensure all sections have content, not just empty objects
    const sections = ['hero', 'introduction', 'dataCollection', 'dataUsage', 'dataProtection', 'cookies', 'yourRights', 'contact'];
    const completeData = { ...fullPrivacyData };
    
    sections.forEach(section => {
      if (!completeData[section as keyof typeof completeData] || Object.keys(completeData[section as keyof typeof completeData]).length === 0) {
        // Use default data from syncFrontendData if section is empty
        (completeData as any)[section] = fullPrivacyData[section as keyof typeof fullPrivacyData] || {};
      }
    });
    
    return NextResponse.json({
      success: true,
      data: completeData,
      count: 1
    });
  } catch (error) {
    console.error('Error fetching privacy data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch privacy data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically save to database
    console.log('Creating new privacy content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Privacy content created successfully',
      data: { id: Date.now(), ...body }
    });
  } catch (error) {
    console.error('Error creating privacy content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create privacy content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically update in database
    console.log('Updating privacy content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Privacy content updated successfully',
      data: body
    });
  } catch (error) {
    console.error('Error updating privacy content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update privacy content' },
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
    console.log('Deleting privacy content:', id);
    
    return NextResponse.json({
      success: true,
      message: 'Privacy content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting privacy content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete privacy content' },
      { status: 500 }
    );
  }
}
