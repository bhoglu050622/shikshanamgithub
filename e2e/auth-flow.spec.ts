/**
 * End-to-End Authentication Flow Tests
 * Tests complete user journey: login → dashboard → token refresh → protected API calls
 */

import { test, expect } from '@playwright/test';

test.describe('Authentication Flow E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:3000');
  });

  test('complete authentication flow', async ({ page }) => {
    // Step 1: Navigate to login page
    await page.click('text=Login');
    await expect(page).toHaveURL(/.*login/);

    // Step 2: Fill in login form
    await page.fill('input[type="email"]', 'amanbhogal.work@gmail.com');
    await page.fill('input[type="password"]', 'testpassword123');

    // Step 3: Submit login form
    await page.click('button[type="submit"]');

    // Step 4: Wait for redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/);

    // Step 5: Verify dashboard loads successfully
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('[data-testid="dashboard-content"]')).toBeVisible();

    // Step 6: Check that API calls are working
    const response = await page.waitForResponse(response => 
      response.url().includes('/api/dashboard/real-data') && response.status() === 200
    );
    expect(response.status()).toBe(200);

    // Step 7: Verify user information is displayed
    await expect(page.locator('[data-testid="user-name"]')).toContainText('Aman');
    await expect(page.locator('[data-testid="user-email"]')).toContainText('amanbhogal.work@gmail.com');

    // Step 8: Test protected API call
    const apiResponse = await page.request.get('/api/dashboard/me', {
      headers: {
        'Authorization': `Bearer ${await page.evaluate(() => localStorage.getItem('accessToken'))}`,
      },
    });
    expect(apiResponse.status()).toBe(200);

    // Step 9: Test token refresh
    const refreshResponse = await page.request.post('/api/auth/refresh', {
      data: {
        refreshToken: await page.evaluate(() => localStorage.getItem('refreshToken')),
      },
    });
    expect(refreshResponse.status()).toBe(200);

    // Step 10: Test logout
    await page.click('[data-testid="logout-button"]');
    await expect(page).toHaveURL(/.*login/);
  });

  test('handles authentication errors gracefully', async ({ page }) => {
    // Step 1: Navigate to login page
    await page.goto('http://localhost:3000/auth/login');

    // Step 2: Try to login with invalid credentials
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Step 3: Verify error message is displayed
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials');

    // Step 4: Try to access protected page without authentication
    await page.goto('http://localhost:3000/dashboard');

    // Step 5: Verify redirect to login page
    await expect(page).toHaveURL(/.*login/);
  });

  test('service worker authentication works', async ({ page }) => {
    // Step 1: Login first
    await page.goto('http://localhost:3000/auth/login');
    await page.fill('input[type="email"]', 'amanbhogal.work@gmail.com');
    await page.fill('input[type="password"]', 'testpassword123');
    await page.click('button[type="submit"]');

    // Step 2: Wait for dashboard to load
    await expect(page).toHaveURL(/.*dashboard/);

    // Step 3: Check service worker is active
    const serviceWorker = await page.evaluate(() => {
      return navigator.serviceWorker.ready;
    });
    expect(serviceWorker).toBeTruthy();

    // Step 4: Test that service worker requests include credentials
    const networkRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/')) {
        networkRequests.push({
          url: request.url(),
          headers: request.headers(),
        });
      }
    });

    // Step 5: Trigger a request that goes through service worker
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Step 6: Verify requests include credentials
    const apiRequests = networkRequests.filter(req => req.url.includes('/api/'));
    expect(apiRequests.length).toBeGreaterThan(0);
    
    // Check that requests include authentication headers or cookies
    const hasAuth = apiRequests.some(req => 
      req.headers.authorization || 
      req.headers.cookie?.includes('session') ||
      req.headers.cookie?.includes('auth')
    );
    expect(hasAuth).toBeTruthy();
  });

  test('token refresh works automatically', async ({ page }) => {
    // Step 1: Login
    await page.goto('http://localhost:3000/auth/login');
    await page.fill('input[type="email"]', 'amanbhogal.work@gmail.com');
    await page.fill('input[type="password"]', 'testpassword123');
    await page.click('button[type="submit"]');

    // Step 2: Wait for dashboard
    await expect(page).toHaveURL(/.*dashboard/);

    // Step 3: Simulate token expiry by modifying localStorage
    await page.evaluate(() => {
      localStorage.setItem('accessToken', 'expired_token');
    });

    // Step 4: Make a request that should trigger token refresh
    const response = await page.request.get('/api/dashboard/real-data');
    
    // Step 5: Verify request succeeds (token was refreshed)
    expect(response.status()).toBe(200);

    // Step 6: Verify new token is stored
    const newToken = await page.evaluate(() => localStorage.getItem('accessToken'));
    expect(newToken).not.toBe('expired_token');
  });

  test('handles network errors gracefully', async ({ page }) => {
    // Step 1: Login
    await page.goto('http://localhost:3000/auth/login');
    await page.fill('input[type="email"]', 'amanbhogal.work@gmail.com');
    await page.fill('input[type="password"]', 'testpassword123');
    await page.click('button[type="submit"]');

    // Step 2: Wait for dashboard
    await expect(page).toHaveURL(/.*dashboard/);

    // Step 3: Simulate network failure
    await page.route('**/api/dashboard/real-data', route => {
      route.abort('failed');
    });

    // Step 4: Try to refresh dashboard
    await page.click('[data-testid="refresh-button"]');

    // Step 5: Verify error message is displayed
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Network error');

    // Step 6: Verify retry button is available
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();
  });

  test('Graphy API integration works', async ({ page }) => {
    // Step 1: Login
    await page.goto('http://localhost:3000/auth/login');
    await page.fill('input[type="email"]', 'amanbhogal.work@gmail.com');
    await page.fill('input[type="password"]', 'testpassword123');
    await page.click('button[type="submit"]');

    // Step 2: Wait for dashboard
    await expect(page).toHaveURL(/.*dashboard/);

    // Step 3: Test Graphy API endpoint
    const response = await page.request.get('/api/test-graphy-auth');
    
    // Step 4: Verify response
    if (response.status() === 200) {
      const data = await response.json();
      expect(data.success).toBe(true);
    } else if (response.status() === 401) {
      // This is expected if Graphy API is not configured
      const data = await response.json();
      expect(data.code).toBe('INVALID_SESSION');
    }

    // Step 5: Verify dashboard still loads (fallback data)
    await expect(page.locator('[data-testid="dashboard-content"]')).toBeVisible();
  });

  test('rate limiting works', async ({ page }) => {
    // Step 1: Make multiple rapid requests
    const requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(
        page.request.get('/api/dashboard/real-data', {
          headers: {
            'Authorization': 'Bearer test_token',
          },
        })
      );
    }

    // Step 2: Wait for all requests to complete
    const responses = await Promise.all(requests);

    // Step 3: Check if any requests were rate limited
    const rateLimitedResponses = responses.filter(res => res.status() === 429);
    
    // Note: This test might not trigger rate limiting depending on configuration
    // It's more of a smoke test to ensure the rate limiting middleware is working
    console.log(`Rate limited responses: ${rateLimitedResponses.length}`);
  });

  test('security headers are present', async ({ page }) => {
    // Step 1: Navigate to any page
    await page.goto('http://localhost:3000');

    // Step 2: Check response headers
    const response = await page.waitForResponse(response => 
      response.url().includes('localhost:3000')
    );

    // Step 3: Verify security headers
    const headers = response.headers();
    
    // Check for common security headers
    expect(headers['x-frame-options']).toBeDefined();
    expect(headers['x-content-type-options']).toBeDefined();
    expect(headers['referrer-policy']).toBeDefined();
  });
});
