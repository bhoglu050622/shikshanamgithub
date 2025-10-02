import { NextRequest, NextResponse } from 'next/server';
import { syncFrontendData } from '@/lib/cms/data-sync';
import fs from 'fs';
import path from 'path';

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
    
    // First check if there's a saved version of this course
    const dataDir = path.join(process.cwd(), 'data');
    const courseFilePath = path.join(dataDir, `${courseId}-course.json`);
    
    if (fs.existsSync(courseFilePath)) {
      const savedCourseData = JSON.parse(fs.readFileSync(courseFilePath, 'utf8'));
      return NextResponse.json({
        success: true,
        data: savedCourseData
      });
    }
    
    // Fallback to synced frontend data
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
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    const body = await request.json();
    
    // Save the course data to a file for persistence
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const courseFilePath = path.join(dataDir, `${courseId}-course.json`);
    fs.writeFileSync(courseFilePath, JSON.stringify(body, null, 2));
    
    console.log(`Course ${courseId} saved to ${courseFilePath}`);
    
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
