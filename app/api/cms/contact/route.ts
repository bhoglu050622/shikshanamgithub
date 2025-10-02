import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';

// Get frontend data
const frontendData = syncFrontendData();
const contactData = frontendData.contact.map(item => ({
  ...item.data,
  lastModified: new Date('2024-01-15'),
  views: Math.floor(Math.random() * 2000) + 500,
  popularity: Math.floor(Math.random() * 40) + 60
}));

export async function GET() {
  try {
    // Get the full contact data with all sections populated
    const fullContactData = contactData[0] || {};
    
    // Ensure all sections have content, not just empty objects
    const sections = ['hero', 'form', 'contactInfo', 'quickHelp'];
    const completeData = { ...fullContactData };
    
    sections.forEach(section => {
      if (!completeData[section as keyof typeof completeData] || Object.keys(completeData[section as keyof typeof completeData]).length === 0) {
        // Use default data from syncFrontendData if section is empty
        (completeData as any)[section] = fullContactData[section as keyof typeof fullContactData] || {};
      }
    });
    
    return NextResponse.json({
      success: true,
      data: completeData,
      count: 1
    });
  } catch (error) {
    console.error('Error fetching contact data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically save to database
    console.log('Creating new contact content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Contact content created successfully',
      data: { id: Date.now(), ...body }
    });
  } catch (error) {
    console.error('Error creating contact content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create contact content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically update in database
    console.log('Updating contact content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Contact content updated successfully',
      data: body
    });
  } catch (error) {
    console.error('Error updating contact content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update contact content' },
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
    console.log('Deleting contact content:', id);
    
    return NextResponse.json({
      success: true,
      message: 'Contact content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete contact content' },
      { status: 500 }
    );
  }
}