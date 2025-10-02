import { NextRequest, NextResponse } from 'next/server';
import { getCourseById } from '@/lib/cms/course-data-extractor';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    
    // Get course data
    const courseData = getCourseById(courseId);
    
    if (!courseData) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
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
