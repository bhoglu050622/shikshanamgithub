import { NextRequest, NextResponse } from 'next/server';
import { MarketingConfig } from '@/lib/marketing/tracking-config';
import { corsResponse, handleCorsPreflightRequest } from '@/lib/utils/cors';
import fs from 'fs/promises';
import path from 'path';

const CONFIG_FILE_PATH = path.join(process.cwd(), 'data', 'marketing-config.json');

/**
 * OPTIONS - Handle CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  return handleCorsPreflightRequest(request);
}

/**
 * GET - Retrieve current marketing configuration
 */
export async function GET(request: NextRequest) {
  try {
    // Try to read from file
    try {
      const fileContent = await fs.readFile(CONFIG_FILE_PATH, 'utf-8');
      const config: MarketingConfig = JSON.parse(fileContent);
      return corsResponse({ success: true, config }, request);
    } catch (error) {
      // File doesn't exist or can't be read, return default config
      const defaultConfig: MarketingConfig = {
        ga4: process.env.NEXT_PUBLIC_GA4_ID ? {
          measurementId: process.env.NEXT_PUBLIC_GA4_ID,
          debugMode: process.env.NEXT_PUBLIC_GA4_DEBUG === 'true',
          streamName: '',
          customEvents: [],
          userProperties: {},
          enhancedMeasurement: {
            scrolls: true,
            outboundClicks: true,
            siteSearch: true,
            videoEngagement: true,
            fileDownloads: true,
          },
          crossDomainTracking: [],
          customDimensions: [],
          customMetrics: [],
        } : null,
        metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ? {
          pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
          testEventCode: process.env.NEXT_PUBLIC_META_PIXEL_TEST === 'true' ? 'TEST_EVENT' : undefined,
          standardEvents: [
            { id: '1', name: 'PageView', enabled: true, parameters: {} },
          ],
          customConversions: [],
          advancedMatching: {
            enabled: false,
          },
          customData: {},
          firstPartyCookies: true,
        } : null,
        lastUpdated: Date.now(),
      };

      return corsResponse({ success: true, config: defaultConfig }, request);
    }
  } catch (error) {
    console.error('Error retrieving marketing config:', error);
    return corsResponse(
      { success: false, error: 'Failed to retrieve configuration' },
      request,
      { status: 500 }
    );
  }
}

/**
 * POST - Save marketing configuration
 */
export async function POST(request: NextRequest) {
  try {
    const config: MarketingConfig = await request.json();

    // Validate configuration
    const errors: string[] = [];

    if (config.ga4?.measurementId && !/^G-[A-Z0-9]{10}$/.test(config.ga4.measurementId)) {
      errors.push('Invalid GA4 Measurement ID format');
    }

    if (config.metaPixel?.pixelId && !/^\d{15,16}$/.test(config.metaPixel.pixelId)) {
      errors.push('Invalid Meta Pixel ID format');
    }

    if (errors.length > 0) {
      return corsResponse(
        { success: false, errors },
        request,
        { status: 400 }
      );
    }

    // Update timestamp
    config.lastUpdated = Date.now();
    config.deployedAt = Date.now();

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Save to file
    await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf-8');

    // Generate .env instructions
    const envVars: string[] = [];
    
    if (config.ga4?.measurementId) {
      envVars.push(`NEXT_PUBLIC_GA4_ID=${config.ga4.measurementId}`);
      envVars.push(`NEXT_PUBLIC_GA4_DEBUG=${config.ga4.debugMode || false}`);
    }
    
    if (config.metaPixel?.pixelId) {
      envVars.push(`NEXT_PUBLIC_META_PIXEL_ID=${config.metaPixel.pixelId}`);
      envVars.push(`NEXT_PUBLIC_META_PIXEL_TEST=${!!config.metaPixel.testEventCode}`);
    }

    return corsResponse({
      success: true,
      message: 'Configuration saved successfully',
      config,
      envVars,
      instructions: 'Add these environment variables to your .env file and rebuild the application for changes to take effect.',
    }, request);
  } catch (error) {
    console.error('Error saving marketing config:', error);
    return corsResponse(
      { success: false, error: 'Failed to save configuration' },
      request,
      { status: 500 }
    );
  }
}

/**
 * DELETE - Reset marketing configuration
 */
export async function DELETE(request: NextRequest) {
  try {
    // Try to delete the config file
    try {
      await fs.unlink(CONFIG_FILE_PATH);
    } catch (error) {
      // File might not exist, which is fine
    }

    return corsResponse({
      success: true,
      message: 'Configuration reset successfully',
    }, request);
  } catch (error) {
    console.error('Error resetting marketing config:', error);
    return corsResponse(
      { success: false, error: 'Failed to reset configuration' },
      request,
      { status: 500 }
    );
  }
}

