/**
 * CMS Sync API Route
 * Handles frontend data synchronization with CMS
 */

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentItems, test } = body;

    // Handle test requests
    if (test === 'sync') {
      return NextResponse.json({
        success: true,
        message: 'Sync API is working',
        timestamp: new Date().toISOString(),
        test: true
      });
    }

    // Handle actual sync requests
    if (contentItems && Array.isArray(contentItems)) {
      const dataDirectory = path.join(process.cwd(), 'data');
      
      // Process each content item
      const syncResults = [];
      
      for (const item of contentItems) {
        try {
          const filePath = path.join(dataDirectory, `${item.id}-content.json`);
          
          // Read existing content
          let existingContent = {};
          try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            existingContent = JSON.parse(fileContent);
          } catch (error) {
            // File doesn't exist, create new
            console.log(`Creating new file: ${filePath}`);
          }

          // Merge with new data
          const updatedContent = {
            ...existingContent,
            ...item.data,
            lastUpdated: new Date().toISOString(),
            source: 'frontend-sync'
          };

          // Write updated content
          await fs.writeFile(filePath, JSON.stringify(updatedContent, null, 2));
          
          syncResults.push({
            id: item.id,
            status: 'success',
            path: filePath
          });
        } catch (error) {
          console.error(`Error syncing ${item.id}:`, error);
          syncResults.push({
            id: item.id,
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Sync completed',
        results: syncResults,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid request: contentItems array required',
      timestamp: new Date().toISOString()
    }, { status: 400 });

  } catch (error) {
    console.error('Sync API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'CMS Sync API is available',
    endpoints: {
      POST: 'Sync frontend data with CMS',
      GET: 'Get sync API status'
    },
    timestamp: new Date().toISOString()
  });
}
