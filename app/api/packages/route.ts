import { NextRequest, NextResponse } from 'next/server';
import { dummyPackages } from '@/lib/fixtures/packages-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';

    // Filter packages based on search query
    let filteredPackages = dummyPackages;
    if (search) {
      filteredPackages = dummyPackages.filter(pkg =>
        pkg.name.toLowerCase().includes(search.toLowerCase()) ||
        pkg.shortDescription.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPackages = filteredPackages.slice(startIndex, endIndex);

    return NextResponse.json({
      packages: paginatedPackages,
      total: filteredPackages.length,
      page,
      limit,
      totalPages: Math.ceil(filteredPackages.length / limit)
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}
