/**
 * Test Graphy API Authentication
 * GET /api/test-graphy-auth
 * Tests if the Graphy API authentication is working properly
 */

import { NextRequest, NextResponse } from 'next/server';
import { graphyClient } from '@/lib/api/graphy-client';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing Graphy API authentication...');
    
    // Test with a sample email to see if authentication works
    const testEmail = 'test@example.com';
    
    try {
      const learner = await graphyClient.getLearnerByEmail(testEmail);
      
      return NextResponse.json({
        success: true,
        message: 'Graphy API authentication is working',
        testEmail,
        learner: learner ? 'Found' : 'Not found',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Graphy API test error:', error);
      
      if (error instanceof Error) {
        // Check if it's an authentication error
        if ((error as any).isAuthError) {
          return NextResponse.json({
            success: false,
            error: 'Authentication failed',
            message: 'Invalid session! You must be logged in for this operation.',
            code: 'INVALID_SESSION',
            details: error.message,
            timestamp: new Date().toISOString()
          }, { status: 401 });
        }
        
        // Check if it's a configuration error
        if (error.message.includes('Graphy API not configured')) {
          return NextResponse.json({
            success: false,
            error: 'API not configured',
            message: 'Graphy API credentials are missing or invalid',
            code: 'API_NOT_CONFIGURED',
            details: error.message,
            timestamp: new Date().toISOString()
          }, { status: 500 });
        }
      }
      
      return NextResponse.json({
        success: false,
        error: 'API test failed',
        message: 'Graphy API test failed',
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to test Graphy API',
      details: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
