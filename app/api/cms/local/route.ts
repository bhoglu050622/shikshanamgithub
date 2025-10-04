import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { action, file, content } = await request.json();

    if (!file) {
      return NextResponse.json({ error: 'File name is required' }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, file);

    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    if (action === 'save') {
      // Content is already parsed from the frontend
      let parsedContent = content;
      
      // Validate that content is an object
      if (typeof parsedContent !== 'object' || parsedContent === null) {
        return NextResponse.json({ error: 'Invalid content format' }, { status: 400 });
      }

      // Add metadata
      parsedContent.lastModified = new Date().toISOString();
      parsedContent.modifiedBy = 'CMS Editor';

      // Save to file
      fs.writeFileSync(filePath, JSON.stringify(parsedContent, null, 2));

      return NextResponse.json({
        success: true,
        message: 'Content saved successfully',
        file: file,
        lastModified: parsedContent.lastModified
      });
    }

    if (action === 'publish') {
      // For publish, we'll create a published version
      const publishedFile = file.replace('.json', '.published.json');
      const publishedPath = path.join(dataDir, publishedFile);

      // Read the current content
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
      }

      const currentContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Add publish metadata
      currentContent.publishedAt = new Date().toISOString();
      currentContent.publishedBy = 'CMS Editor';

      // Save as published version
      fs.writeFileSync(publishedPath, JSON.stringify(currentContent, null, 2));

      return NextResponse.json({
        success: true,
        message: 'Content published successfully',
        file: publishedFile,
        publishedAt: currentContent.publishedAt
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error('CMS Local API Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}
