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

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: packages,
      count: packages.length
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.price) {
      return NextResponse.json(
        { success: false, error: 'Title and price are required' },
        { status: 400 }
      );
    }

    const newPackage = {
      id: `package-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In production, save to database
    packages.push(newPackage);

    return NextResponse.json({
      success: true,
      data: newPackage,
      message: 'Package created successfully'
    });
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create package' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Package ID is required' },
        { status: 400 }
      );
    }

    const packageIndex = packages.findIndex(pkg => pkg.id === id);
    
    if (packageIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }

    // Update package
    packages[packageIndex] = {
      ...packages[packageIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: packages[packageIndex],
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Package ID is required' },
        { status: 400 }
      );
    }

    const packageIndex = packages.findIndex(pkg => pkg.id === id);
    
    if (packageIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }

    // Remove package
    packages.splice(packageIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Package deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete package' },
      { status: 500 }
    );
  }
}