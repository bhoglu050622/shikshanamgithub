import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'homepage-content.published.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
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