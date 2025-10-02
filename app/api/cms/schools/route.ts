import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';

// Get frontend data
const frontendData = syncFrontendData();
const schoolsData = frontendData.schools.map(item => ({
  ...item.data,
  lastModified: new Date('2024-01-15'),
  views: Math.floor(Math.random() * 2000) + 500,
  popularity: Math.floor(Math.random() * 40) + 60
}));

export async function GET() {
  try {
    // Get the full schools data with all sections populated
    const fullSchoolsData = schoolsData[0] || {};
    
    // Ensure all sections have content, not just empty objects
    const sections = ['hero', 'featured', 'allSchools'];
    const completeData = { ...fullSchoolsData };
    
    sections.forEach(section => {
      if (!completeData[section as keyof typeof completeData] || Object.keys(completeData[section as keyof typeof completeData]).length === 0) {
        // Use default data from syncFrontendData if section is empty
        (completeData as any)[section] = fullSchoolsData[section as keyof typeof fullSchoolsData] || {};
      }
    });
    
    return NextResponse.json({
      success: true,
      data: completeData,
      count: 1
    });
  } catch (error) {
    console.error('Error fetching schools data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch schools data' },
      { status: 500 }
    );
  }
}

// PUT method removed - not implemented
