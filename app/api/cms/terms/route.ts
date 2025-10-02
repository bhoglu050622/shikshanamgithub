import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';

// Get frontend data
const frontendData = syncFrontendData();
const termsData = frontendData.terms.map(item => ({
  ...item.data,
  lastModified: new Date('2024-01-15'),
  views: Math.floor(Math.random() * 2000) + 500,
  popularity: Math.floor(Math.random() * 40) + 60
}));

export async function GET() {
  try {
    // Get the full terms data with all sections populated
    const fullTermsData = termsData[0] || {};
    
    // Ensure all sections have content, not just empty objects
    const sections = ['hero', 'introduction', 'acceptance', 'useOfPlatform', 'intellectualProperty', 'userAccounts', 'paymentTerms', 'privacy', 'limitationOfLiability', 'indemnification', 'disputeResolution', 'changesToTerms', 'contact'];
    const completeData = { ...fullTermsData };
    
    sections.forEach(section => {
      if (!completeData[section as keyof typeof completeData] || Object.keys(completeData[section as keyof typeof completeData]).length === 0) {
        // Use default data from syncFrontendData if section is empty
        (completeData as any)[section] = fullTermsData[section as keyof typeof fullTermsData] || {};
      }
    });
    
    return NextResponse.json({
      success: true,
      data: completeData,
      count: 1
    });
  } catch (error) {
    console.error('Error fetching terms data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch terms data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically save to database
    console.log('Creating new terms content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Terms content created successfully',
      data: { id: Date.now(), ...body }
    });
  } catch (error) {
    console.error('Error creating terms content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create terms content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically update in database
    console.log('Updating terms content:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Terms content updated successfully',
      data: body
    });
  } catch (error) {
    console.error('Error updating terms content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update terms content' },
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
    console.log('Deleting terms content:', id);
    
    return NextResponse.json({
      success: true,
      message: 'Terms content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting terms content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete terms content' },
      { status: 500 }
    );
  }
}