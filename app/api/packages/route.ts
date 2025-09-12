import { NextRequest, NextResponse } from 'next/server'
import { dummyPackages } from '@/lib/fixtures/packages-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search')

    let filteredPackages = [...dummyPackages]

    // Filter by search term
    if (search) {
      filteredPackages = filteredPackages.filter(pkg =>
        pkg.name.toLowerCase().includes(search.toLowerCase()) ||
        pkg.shortDescription.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPackages = filteredPackages.slice(startIndex, endIndex)

    const total = filteredPackages.length
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      packages: paginatedPackages,
      total,
      page,
      limit
    })

  } catch (error) {
    console.error('Packages API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch packages' 
      },
      { status: 500 }
    )
  }
}
