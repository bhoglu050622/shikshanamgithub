import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';
import fs from 'fs';
import path from 'path';

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
    
    // First check if there's a saved version of this package
    const dataDir = path.join(process.cwd(), 'data');
    const packageFilePath = path.join(dataDir, `${packageId}-package.json`);
    
    if (fs.existsSync(packageFilePath)) {
      const savedPackageData = JSON.parse(fs.readFileSync(packageFilePath, 'utf8'));
      return NextResponse.json({
        success: true,
        data: savedPackageData
      });
    }
    
    // Fallback to synced frontend data
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
  { params }: { params: Promise<{ packageId: string }> }
) {
  try {
    const { packageId } = await params;
    const body = await request.json();
    
    // Save the package data to a file for persistence
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const packageFilePath = path.join(dataDir, `${packageId}-package.json`);
    fs.writeFileSync(packageFilePath, JSON.stringify(body, null, 2));
    
    console.log(`Package ${packageId} saved to ${packageFilePath}`);
    
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
