/**
 * Authentication Integration Tests
 * End-to-end testing for authentication flows
 */

import { NextRequest } from 'next/server';
import { POST as loginHandler } from '@/app/api/auth/email/route';
import { POST as refreshHandler } from '@/app/api/auth/refresh/route';
import { POST as logoutHandler } from '@/app/api/auth/logout/route';
import { GET as meHandler } from '@/app/api/auth/me/route';
import { createMockUser, createMockRequest } from '@testing/test-utils';

// Mock the database
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  refreshToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
};

jest.mock('@/lib/database/connection', () => ({
  getPrismaClient: () => mockPrisma,
}));

describe('Authentication API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/email (Login)', () => {
    it('should login user with valid credentials', async () => {
      const mockUser = createMockUser({
        email: 'test@example.com',
        passwordHash: 'hashed_password',
      });

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/email',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password',
          action: 'login',
        }),
      }) as NextRequest;

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.user.email).toBe('test@example.com');
      expect(data.data.accessToken).toBeDefined();
      expect(data.data.refreshToken).toBeDefined();
    });

    it('should return error for invalid credentials', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/email',
        body: JSON.stringify({
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
          action: 'login',
        }),
      }) as NextRequest;

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error.type).toBe('AUTHENTICATION_ERROR');
    });

    it('should register new user', async () => {
      const newUser = createMockUser({
        email: 'newuser@example.com',
        username: 'newuser',
      });

      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue(newUser);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/email',
        body: JSON.stringify({
          email: 'newuser@example.com',
          password: 'password123',
          username: 'newuser',
          action: 'register',
        }),
      }) as NextRequest;

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.user.email).toBe('newuser@example.com');
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: 'newuser@example.com',
          username: 'newuser',
        }),
      });
    });

    it('should return error for duplicate email registration', async () => {
      const existingUser = createMockUser({
        email: 'existing@example.com',
      });

      mockPrisma.user.findUnique.mockResolvedValue(existingUser);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/email',
        body: JSON.stringify({
          email: 'existing@example.com',
          password: 'password123',
          username: 'existing',
          action: 'register',
        }),
      }) as NextRequest;

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.success).toBe(false);
      expect(data.error.type).toBe('CONFLICT_ERROR');
    });

    it('should validate required fields', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/email',
        body: JSON.stringify({
          action: 'login',
          // Missing email and password
        }),
      }) as NextRequest;

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error.type).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should refresh access token with valid refresh token', async () => {
      const mockUser = createMockUser();
      const mockRefreshToken = {
        id: 'token_123',
        token: 'valid_refresh_token',
        userId: mockUser.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      };

      mockPrisma.refreshToken.findUnique.mockResolvedValue(mockRefreshToken);
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/refresh',
        body: JSON.stringify({
          refreshToken: 'valid_refresh_token',
        }),
      }) as NextRequest;

      const response = await refreshHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.accessToken).toBeDefined();
      expect(data.data.refreshToken).toBeDefined();
    });

    it('should return error for invalid refresh token', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/refresh',
        body: JSON.stringify({
          refreshToken: 'invalid_token',
        }),
      }) as NextRequest;

      const response = await refreshHandler(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error.type).toBe('AUTHENTICATION_ERROR');
    });

    it('should return error for expired refresh token', async () => {
      const expiredToken = {
        id: 'token_123',
        token: 'expired_token',
        userId: 'user_123',
        expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      };

      mockPrisma.refreshToken.findUnique.mockResolvedValue(expiredToken);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/refresh',
        body: JSON.stringify({
          refreshToken: 'expired_token',
        }),
      }) as NextRequest;

      const response = await refreshHandler(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error.type).toBe('AUTHENTICATION_ERROR');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout user and clear refresh token', async () => {
      mockPrisma.refreshToken.deleteMany.mockResolvedValue({ count: 1 });

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/logout',
        body: JSON.stringify({
          refreshToken: 'valid_refresh_token',
        }),
      }) as NextRequest;

      const response = await logoutHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockPrisma.refreshToken.deleteMany).toHaveBeenCalledWith({
        where: {
          token: 'valid_refresh_token',
        },
      });
    });

    it('should handle logout without refresh token', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/logout',
        body: JSON.stringify({}),
      }) as NextRequest;

      const response = await logoutHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('GET /api/auth/me', () => {
    it('should return user profile for authenticated user', async () => {
      const mockUser = createMockUser();

      // Mock the JWT verification
      jest.doMock('@/lib/auth/jwt', () => ({
        getUserFromRequest: jest.fn().mockResolvedValue(mockUser),
      }));

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/auth/me',
        headers: new Headers({
          'Authorization': 'Bearer valid_token',
        }),
      }) as NextRequest;

      const response = await meHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.user.id).toBe(mockUser.id);
      expect(data.data.user.email).toBe(mockUser.email);
    });

    it('should return error for unauthenticated request', async () => {
      // Mock the JWT verification to return null
      jest.doMock('@/lib/auth/jwt', () => ({
        getUserFromRequest: jest.fn().mockResolvedValue(null),
      }));

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/auth/me',
      }) as NextRequest;

      const response = await meHandler(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error.type).toBe('AUTHENTICATION_ERROR');
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      mockPrisma.user.findUnique.mockRejectedValue(new Error('Database connection failed'));

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/email',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password',
          action: 'login',
        }),
      }) as NextRequest;

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error.type).toBe('DATABASE_ERROR');
    });

    it('should handle malformed JSON requests', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/email',
        body: 'invalid json',
      }) as NextRequest;

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error.type).toBe('VALIDATION_ERROR');
    });
  });
});
