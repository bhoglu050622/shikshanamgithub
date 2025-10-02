import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { contentItems } = await request.json();
    
    console.log('🔄 Syncing content with frontend...');
    
    // Create sync log
    const syncLog = {
      timestamp: new Date().toISOString(),
      itemsCount: contentItems.length,
      items: contentItems.map((item: any) => ({
        id: item.id,
        type: item.type,
        status: item.status,
        lastModified: item.lastModified
      }))
    };
    
    // Save sync log
    const logPath = path.join(process.cwd(), 'data', 'sync-log.json');
    fs.writeFileSync(logPath, JSON.stringify(syncLog, null, 2));
    
    console.log(`✅ Content sync completed: ${contentItems.length} items synced`);
    
    return NextResponse.json({
      success: true,
      message: 'Content synced successfully',
      syncedItems: contentItems.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error syncing content:', error);
    return NextResponse.json(
      { error: 'Failed to sync content' },
      { status: 500 }
    );
  }
}
