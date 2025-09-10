/**
 * Test Graphy API Integration
 * GET /api/test-graphy
 * Tests the Graphy API connection and returns status
 */

import { NextRequest, NextResponse } from 'next/server';
import { graphyClient } from '@/lib/api/graphy-client';

export async function GET(request: NextRequest) {
  try {
    // Test API connection by trying to fetch a learner
    const testEmail = 'test@example.com';
    const learner = await graphyClient.getLearnerByEmail(testEmail);
    
    // Test product fetching
    const products = await graphyClient.getAllProducts(5);
    
    return NextResponse.json({
      success: true,
      message: 'Graphy API integration test successful',
      data: {
        learnerFound: !!learner,
        learnerData: learner ? {
          id: learner.id,
          name: learner.name,
          email: learner.email
        } : null,
        productsCount: products.length,
        products: products.map(p => ({
          id: p.id,
          title: p.title,
          category: p.category
        })),
        apiStatus: 'connected',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Graphy API test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Graphy API integration test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      data: {
        apiStatus: 'disconnected',
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}
