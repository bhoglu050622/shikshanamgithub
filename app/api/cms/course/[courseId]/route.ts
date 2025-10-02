import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';

// Get frontend data
const frontendData = syncFrontendData();
const courses = frontendData.courses.map(item => ({
  ...item.data,
  lastModified: new Date('2024-01-15'),
  views: Math.floor(Math.random() * 2000) + 500,
  popularity: Math.floor(Math.random() * 40) + 60
}));

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    
    // Get course data from synced frontend data
    const courseData = courses.find(course => course.id === courseId);
    
    if (!courseData) {
      return NextResponse.json(
        { success: false, error: `Course '${courseId}' not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: courseData
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const body = await request.json();
    
    // Here you would typically save the course data to a database
    // For now, we'll just return the updated data
    console.log(`Updating course ${courseId}:`, body);
    
    return NextResponse.json({
      success: true,
      data: body,
      message: 'Course updated successfully'
    });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update course' },
      { status: 500 }
    );
  }
}
