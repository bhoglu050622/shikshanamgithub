import { NextRequest, NextResponse } from 'next/server';
import { dummyPackages } from '@/lib/fixtures/packages-data';

export async function GET(
  request: NextRequest,
  { params }: { params: { sku: string } }
) {
  try {
    const { sku } = params;
    
    const packageData = dummyPackages.find(pkg => pkg.sku === sku);
    
    if (!packageData) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      package: packageData
    });
  } catch (error) {
    console.error('Error fetching package:', error);
    return NextResponse.json(
      { error: 'Failed to fetch package' },
      { status: 500 }
    );
  }
}
