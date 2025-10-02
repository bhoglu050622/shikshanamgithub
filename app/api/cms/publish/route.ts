import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { contentItems } = await request.json();
    
    console.log('📤 Publishing content to production...');
    
    // Create publish log
    const publishLog = {
      timestamp: new Date().toISOString(),
      itemsCount: contentItems.length,
      publishedItems: contentItems.map((item: any) => ({
        id: item.id,
        type: item.type,
        status: 'published',
        publishedAt: new Date().toISOString()
      }))
    };
    
    // Save publish log
    const logPath = path.join(process.cwd(), 'data', 'publish-log.json');
    fs.writeFileSync(logPath, JSON.stringify(publishLog, null, 2));
    
    // Update content status to published
    contentItems.forEach((item: any) => {
      const contentPath = path.join(process.cwd(), 'data', `${item.id}-content.json`);
      if (fs.existsSync(contentPath)) {
        const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
        content.status = 'published';
        content.publishedAt = new Date().toISOString();
        fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
      }
    });
    
    console.log(`✅ Content published: ${contentItems.length} items published`);
    
    return NextResponse.json({
      success: true,
      message: 'Content published successfully',
      publishedItems: contentItems.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error publishing content:', error);
    return NextResponse.json(
      { error: 'Failed to publish content' },
      { status: 500 }
    );
  }
}
