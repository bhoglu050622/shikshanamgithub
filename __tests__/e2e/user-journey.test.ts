/**
 * End-to-End User Journey Tests
 * Critical user flow testing with Playwright
 */

import { test, expect } from '@playwright/test';

test.describe('User Authentication Journey', () => {
  test('should complete user registration and login flow', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Check if we're on the homepage
    await expect(page).toHaveTitle(/Shikshanam/);

    // Navigate to login page
    await page.click('text=Login');
    await expect(page).toHaveURL(/.*auth.*login/);

    // Fill registration form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password123');

    // Submit registration
    await page.click('button[type="submit"]');

    // Wait for success message or redirect
    await expect(page.locator('text=Registration successful')).toBeVisible();

    // Now test login
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');

    await page.click('button[type="submit"]');

    // Should be redirected to dashboard or home
    await expect(page).toHaveURL(/.*dashboard|.*home/);

    // Check if user is logged in
    await expect(page.locator('text=Welcome, testuser')).toBeVisible();
  });

  test('should handle login errors gracefully', async ({ page }) => {
    await page.goto('/auth/login');

    // Try to login with invalid credentials
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');

    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator('text=Invalid credentials')).toBeVisible();

    // Form should still be visible for retry
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });
});

test.describe('Course Enrollment Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/auth/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard|.*home/);
  });

  test('should browse and enroll in a course', async ({ page }) => {
    // Navigate to courses page
    await page.click('text=Courses');
    await expect(page).toHaveURL(/.*courses/);

    // Check if courses are displayed
    await expect(page.locator('[data-testid="course-card"]')).toHaveCount.greaterThan(0);

    // Click on first course
    await page.click('[data-testid="course-card"]:first-child');

    // Should navigate to course detail page
    await expect(page).toHaveURL(/.*courses\/.*/);

    // Check course details are displayed
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Enroll Now')).toBeVisible();

    // Enroll in course
    await page.click('text=Enroll Now');

    // Should show enrollment confirmation
    await expect(page.locator('text=Successfully enrolled')).toBeVisible();

    // Navigate to dashboard to verify enrollment
    await page.click('text=Dashboard');
    await expect(page.locator('text=My Courses')).toBeVisible();
    await expect(page.locator('[data-testid="enrolled-course"]')).toHaveCount.greaterThan(0);
  });

  test('should access course content after enrollment', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('/dashboard');

    // Click on enrolled course
    await page.click('[data-testid="enrolled-course"]:first-child');

    // Should navigate to course content
    await expect(page).toHaveURL(/.*courses\/.*\/lessons/);

    // Check if lessons are displayed
    await expect(page.locator('[data-testid="lesson-item"]')).toHaveCount.greaterThan(0);

    // Click on first lesson
    await page.click('[data-testid="lesson-item"]:first-child');

    // Should navigate to lesson content
    await expect(page).toHaveURL(/.*lessons\/.*/);

    // Check lesson content is displayed
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="lesson-content"]')).toBeVisible();

    // Mark lesson as complete
    await page.click('text=Mark Complete');

    // Should show completion confirmation
    await expect(page.locator('text=Lesson completed')).toBeVisible();
  });
});

test.describe('Accessibility Journey', () => {
  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Test tab navigation
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();

    // Continue tabbing through navigation
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toBeVisible();
    }

    // Test Enter key activation
    await page.keyboard.press('Enter');
    // Should navigate or activate focused element
  });

  test('should support screen reader navigation', async ({ page }) => {
    await page.goto('/');

    // Check for skip links
    await expect(page.locator('a[href="#main-content"]')).toBeVisible();
    await expect(page.locator('a[href="#navigation"]')).toBeVisible();

    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for ARIA landmarks
    await expect(page.locator('main[role="main"]')).toBeVisible();
    await expect(page.locator('nav[role="navigation"]')).toBeVisible();

    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should support high contrast mode', async ({ page }) => {
    await page.goto('/');

    // Enable high contrast mode
    await page.click('[data-testid="accessibility-toolbar"]');
    await page.click('text=High Contrast');

    // Check if high contrast styles are applied
    const body = page.locator('body');
    await expect(body).toHaveClass(/high-contrast/);
  });
});

test.describe('Error Handling Journey', () => {
  test('should handle 404 errors gracefully', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/non-existent-page');

    // Should show 404 page
    await expect(page.locator('text=Page Not Found')).toBeVisible();
    await expect(page.locator('text=Go Home')).toBeVisible();

    // Click go home button
    await page.click('text=Go Home');
    await expect(page).toHaveURL('/');
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate network failure
    await page.route('**/api/**', route => route.abort());

    await page.goto('/courses');

    // Should show error message
    await expect(page.locator('text=Something went wrong')).toBeVisible();
    await expect(page.locator('text=Try Again')).toBeVisible();

    // Restore network
    await page.unroute('**/api/**');

    // Click try again
    await page.click('text=Try Again');

    // Should recover and show content
    await expect(page.locator('[data-testid="course-card"]')).toBeVisible();
  });
});

test.describe('Performance Journey', () => {
  test('should load pages within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should handle large course catalogs efficiently', async ({ page }) => {
    await page.goto('/courses');

    // Wait for courses to load
    await page.waitForSelector('[data-testid="course-card"]');

    // Check if courses are loaded
    const courseCards = page.locator('[data-testid="course-card"]');
    const courseCount = await courseCards.count();
    
    expect(courseCount).toBeGreaterThan(0);

    // Test pagination if present
    const nextButton = page.locator('text=Next');
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForSelector('[data-testid="course-card"]');
      
      // Should load more courses
      const newCourseCount = await courseCards.count();
      expect(newCourseCount).toBeGreaterThan(courseCount);
    }
  });
});

test.describe('Mobile Responsiveness', () => {
  test('should work on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Check if mobile navigation is visible
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();

    // Test mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();

    // Test mobile course browsing
    await page.click('text=Courses');
    await expect(page.locator('[data-testid="course-card"]')).toBeVisible();

    // Check if course cards are properly sized for mobile
    const courseCard = page.locator('[data-testid="course-card"]').first();
    const box = await courseCard.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(375);
  });
});

test.describe('Cross-Browser Compatibility', () => {
  test('should work in different browsers', async ({ page, browserName }) => {
    await page.goto('/');

    // Basic functionality should work in all browsers
    await expect(page.locator('h1')).toBeVisible();

    // Test form functionality
    await page.click('text=Login');
    await expect(page.locator('input[name="email"]')).toBeVisible();

    // Test JavaScript functionality
    await page.fill('input[name="email"]', 'test@example.com');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
  });
});
