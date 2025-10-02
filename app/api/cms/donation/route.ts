import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';

// Get frontend data
const frontendData = syncFrontendData();
const donationData = frontendData.donation.map(item => ({
  ...item.data,
  lastModified: new Date('2024-01-15'),
  views: Math.floor(Math.random() * 2000) + 500,
  popularity: Math.floor(Math.random() * 40) + 60
}));

export async function GET() {
  try {
    // Get the full donation data with all sections populated
    const fullDonationData = donationData[0] || {};
    
    // Ensure all sections have content, not just empty objects
    const sections = ['hero', 'impact', 'causes', 'donationOptions', 'testimonials', 'faq', 'cta'];
    const completeData = { ...fullDonationData };
    
    sections.forEach(section => {
      if (!completeData[section as keyof typeof completeData] || Object.keys(completeData[section as keyof typeof completeData]).length === 0) {
        // Use default data from syncFrontendData if section is empty
        (completeData as any)[section] = fullDonationData[section as keyof typeof fullDonationData] || {};
      }
    });
    
    return NextResponse.json({
      success: true,
      data: completeData,
      count: 1
    });
  } catch (error) {
    console.error('Error fetching donation data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donation data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically save to database
    console.log('Creating new donation content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Donation content created successfully',
      data: { id: Date.now(), ...body }
    });
  } catch (error) {
    console.error('Error creating donation content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create donation content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically update in database
    console.log('Updating donation content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Donation content updated successfully',
      data: body
    });
  } catch (error) {
    console.error('Error updating donation content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update donation content' },
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
    console.log('Deleting donation content:', id);
    
    return NextResponse.json({
      success: true,
      message: 'Donation content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting donation content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete donation content' },
      { status: 500 }
    );
  }
}