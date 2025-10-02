import { NextRequest, NextResponse } from 'next/server';
import { getPackageById } from '@/lib/cms/package-data-extractor';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ packageId: string }> }
) {
  try {
    const { packageId } = await params;
    
    // Get package data
    const packageData = getPackageById(packageId);
    
    if (!packageData) {
      return NextResponse.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: packageData
    });
  } catch (error) {
    console.error('Error fetching package:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch package' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { packageId: string } }
) {
  try {
    const { packageId } = params;
    const body = await request.json();
    
    // Here you would typically save the package data to a database
    // For now, we'll just return the updated data
    console.log(`Updating package ${packageId}:`, body);
    
    return NextResponse.json({
      success: true,
      data: body,
      message: 'Package updated successfully'
    });
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update package' },
      { status: 500 }
    );
  }
}
