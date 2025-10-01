import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const cmsDataDir = path.join(process.cwd(), 'data', 'cms-imported');
    
    // Check if the CMS data directory exists
    if (!fs.existsSync(cmsDataDir)) {
      return NextResponse.json({
        success: false,
        error: 'CMS data not found. Please run the data import script first.'
      }, { status: 404 });
    }

    // Load the complete CMS data
    const completeDataPath = path.join(cmsDataDir, 'complete-cms-data.json');
    if (fs.existsSync(completeDataPath)) {
      const data = fs.readFileSync(completeDataPath, 'utf8');
      const cmsData = JSON.parse(data);
      
      // Transform the data for the frontend
      const transformedData = {
        overview: {
          totalCourses: cmsData.homepage?.featuredCourses?.length || 0,
          totalInstructors: cmsData.homepage?.instructors?.length || 0,
          totalSchools: cmsData.homepage?.schools?.length || 0,
          totalBlogs: cmsData.blog?.posts?.length || 0,
          totalTestimonials: cmsData.homepage?.testimonials?.length || 0,
          lastUpdated: new Date().toISOString()
        },
        courses: cmsData.courses?.allCourses || [],
        instructors: cmsData.homepage?.instructors || [],
        schools: cmsData.homepage?.schools || [],
        blogs: cmsData.blog?.posts || [],
        testimonials: cmsData.homepage?.testimonials || []
      };

      return NextResponse.json({
        success: true,
        data: transformedData
      });
    }

    // If complete data doesn't exist, return individual files
    const sections = ['homepage', 'courses', 'schools', 'blog'];
    const data: any = {};

    for (const section of sections) {
      const filePath = path.join(cmsDataDir, `${section}.json`);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        data[section] = JSON.parse(content);
      }
    }

    // Transform the data for the frontend
    const transformedData = {
      overview: {
        totalCourses: data.courses?.allCourses?.length || 0,
        totalInstructors: data.homepage?.instructors?.length || 0,
        totalSchools: data.homepage?.schools?.length || 0,
        totalBlogs: data.blog?.posts?.length || 0,
        totalTestimonials: data.homepage?.testimonials?.length || 0,
        lastUpdated: new Date().toISOString()
      },
      courses: data.courses?.allCourses || [],
      instructors: data.homepage?.instructors || [],
      schools: data.homepage?.schools || [],
      blogs: data.blog?.posts || [],
      testimonials: data.homepage?.testimonials || []
    };

    return NextResponse.json({
      success: true,
      data: transformedData
    });

  } catch (error) {
    console.error('Error loading imported data:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to load imported data'
    }, { status: 500 });
  }
}
