import { NextRequest, NextResponse } from 'next/server';
import { DonationContent } from '@/lib/cms/donation-types';
import fs from 'fs';
import path from 'path';

const DONATION_CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'donation-content.json');

export async function GET() {
  try {
    if (fs.existsSync(DONATION_CONTENT_FILE_PATH)) {
      const content = JSON.parse(fs.readFileSync(DONATION_CONTENT_FILE_PATH, 'utf8'));
      return NextResponse.json({ 
        success: true, 
        data: content 
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Donation content not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error fetching donation content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donation content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the content structure
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid content format' },
        { status: 400 }
      );
    }
    
    // Ensure data directory exists
    const dataDir = path.dirname(DONATION_CONTENT_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(DONATION_CONTENT_FILE_PATH, JSON.stringify(body, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Donation content updated successfully' 
    });
  } catch (error) {
    console.error('Error updating donation content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update donation content' },
      { status: 500 }
    );
  }
}
