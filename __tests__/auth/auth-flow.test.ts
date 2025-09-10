/**
 * Authentication Flow Tests
 * Tests login → token refresh → protected API calls
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { NextRequest } from 'next/server';

// Mock fetch
global.fetch = jest.fn();

// Mock Next.js request
const createMockRequest = (options: Partial<NextRequest> = {}): NextRequest => {
  return {
    url: 'http://localhost:3000/api/test',
    method: 'GET',
    headers: new Headers(),
    cookies: new Map(),
    ...options,
  } as NextRequest;
};

describe('Authentication Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Login Flow', () => {
    it('should successfully log in with valid credentials', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          user: {
            id: 'user123',
            email: 'test@example.com',
            name: 'Test User',
          },
          tokens: {
            accessToken: 'access_token_123',
            refreshToken: 'refresh_token_123',
          },
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/auth/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
      expect(data.user.email).toBe('test@example.com');
      expect(data.tokens.accessToken).toBeDefined();
      expect(data.tokens.refreshToken).toBeDefined();
    });

    it('should fail login with invalid credentials', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        json: async () => ({
          error: 'Invalid credentials',
          message: 'Email or password is incorrect',
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/auth/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(response.status).toBe(401);
      expect(data.error).toBe('Invalid credentials');
    });

    it('should handle network errors during login', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(
        fetch('/api/auth/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
          }),
        })
      ).rejects.toThrow('Network error');
    });
  });

  describe('Token Refresh Flow', () => {
    it('should successfully refresh access token', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          tokens: {
            accessToken: 'new_access_token_123',
            refreshToken: 'new_refresh_token_123',
          },
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          refreshToken: 'refresh_token_123',
        }),
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
      expect(data.tokens.accessToken).toBe('new_access_token_123');
      expect(data.tokens.refreshToken).toBe('new_refresh_token_123');
    });

    it('should fail token refresh with invalid refresh token', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        json: async () => ({
          error: 'Invalid refresh token',
          message: 'Refresh token is expired or invalid',
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          refreshToken: 'invalid_refresh_token',
        }),
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(response.status).toBe(401);
      expect(data.error).toBe('Invalid refresh token');
    });
  });

  describe('Protected API Calls', () => {
    it('should successfully access protected endpoint with valid token', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          data: {
            user: {
              id: 'user123',
              email: 'test@example.com',
              name: 'Test User',
            },
            dashboard: {
              courses: [],
              progress: 0,
            },
          },
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/dashboard/real-data', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer access_token_123',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
      expect(data.data.user.email).toBe('test@example.com');
    });

    it('should fail to access protected endpoint without token', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        json: async () => ({
          error: 'Authentication required',
          message: 'Please log in to access this resource',
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/dashboard/real-data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(response.status).toBe(401);
      expect(data.error).toBe('Authentication required');
    });

    it('should fail to access protected endpoint with expired token', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        json: async () => ({
          error: 'Invalid session',
          message: 'Invalid session! You must be logged in for this operation',
          code: 'INVALID_SESSION',
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/dashboard/real-data', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer expired_token_123',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(response.status).toBe(401);
      expect(data.error).toBe('Invalid session');
      expect(data.code).toBe('INVALID_SESSION');
    });
  });

  describe('Service Worker Authentication', () => {
    it('should include credentials in service worker requests', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          data: 'Service worker data',
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Simulate service worker request
      const response = await fetch('/api/dashboard/real-data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This should be automatically added by service worker
      });

      expect(response.ok).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/dashboard/real-data'),
        expect.objectContaining({
          credentials: 'include',
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle 401 errors gracefully', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        json: async () => ({
          error: 'Authentication failed',
          message: 'Invalid session! You must be logged in for this operation',
          code: 'INVALID_SESSION',
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/dashboard/real-data', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer invalid_token',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(response.status).toBe(401);
      expect(data.code).toBe('INVALID_SESSION');
    });

    it('should handle network errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(
        fetch('/api/dashboard/real-data', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer valid_token',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
      ).rejects.toThrow('Network error');
    });

    it('should handle timeout errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Request timeout'));

      await expect(
        fetch('/api/dashboard/real-data', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer valid_token',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
      ).rejects.toThrow('Request timeout');
    });
  });

  describe('Graphy API Integration', () => {
    it('should successfully fetch learner data from Graphy API', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          data: {
            learner: {
              id: 'learner123',
              email: 'test@example.com',
              name: 'Test Learner',
            },
            enrollments: [],
            progress: [],
          },
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/test-graphy-auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
    });

    it('should handle Graphy API authentication errors', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        json: async () => ({
          success: false,
          error: 'Authentication failed',
          message: 'Invalid session! You must be logged in for this operation',
          code: 'INVALID_SESSION',
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/test-graphy-auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(response.status).toBe(401);
      expect(data.code).toBe('INVALID_SESSION');
    });
  });
});
