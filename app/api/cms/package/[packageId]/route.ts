import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';

// Get frontend data
const frontendData = syncFrontendData();
const packages = frontendData.packages.map(item => ({
  ...item.data,
  lastModified: new Date('2024-01-15'),
  views: Math.floor(Math.random() * 2000) + 500,
  popularity: Math.floor(Math.random() * 40) + 60
}));

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ packageId: string }> }
) {
  try {
    const { packageId } = await params;
    
    // Get package data from synced frontend data
    const packageData = packages.find(pkg => pkg.id === packageId);
    
    if (!packageData) {
      return NextResponse.json(
        { success: false, error: `Package '${packageId}' not found` },
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
