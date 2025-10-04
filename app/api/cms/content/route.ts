import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getCachedContent } from '@/lib/cms/github-fetcher';

export async function GET() {
  try {
    // Try to get from GitHub first (production) or fallback to local
    const data = await getCachedContent('homepage-content.json');
    
    if (!data) {
      // Fallback to published file if main file not found
      const filePath = path.join(process.cwd(), 'data', 'homepage-content.published.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const publishedData = JSON.parse(fileContent);
      
      return NextResponse.json({
        success: true,
        data: publishedData
      });
    }
    
    // Return the data in the format expected by the Hero component
    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch homepage data' 
    }, { status: 500 });
  }
}