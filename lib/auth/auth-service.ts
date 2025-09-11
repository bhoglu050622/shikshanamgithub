/**
 * Authentication Service
 * Handles user authentication, registration, and session management
 */

import { PrismaClient } from '@/lib/generated/prisma';
import { jwtAuth, JWTPayload } from './jwt';
import { passwordService } from './password';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  role?: 'ADMIN' | 'VIEWER';
}

export interface AuthResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
  error?: string;
}

export class AuthService {
  private static instance: AuthService;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResult> {
    try {
      // Validate input
      if (!data.email || !data.password || !data.username) {
        return {
          success: false,
          error: 'Email, password, and username are required',
        };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return {
          success: false,
          error: 'Invalid email format',
        };
      }

      // Validate password strength
      const passwordValidation = passwordService.validatePasswordStrength(data.password);
      if (!passwordValidation.isValid) {
        return {
          success: false,
          error: `Password validation failed: ${passwordValidation.errors.join(', ')}`,
        };
      }

      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: data.email },
            { username: data.username },
          ],
        },
      });

      if (existingUser) {
        return {
          success: false,
          error: 'User with this email or username already exists',
        };
      }

      // Hash password
      const hashedPassword = await passwordService.hashPassword(data.password);

      // Create user
      const user = await prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          passwordHash: hashedPassword,
          role: data.role || 'VIEWER',
          isActive: true,
        },
      });

      // Generate tokens
      const tokens = jwtAuth.generateTokens({
        userId: user.id,
        email: user.email!,
        role: user.role,
      });

      // Log audit event
      await this.logAuditEvent(user.id, 'register', 'user', user.id, {
        email: data.email,
        username: data.username,
        role: user.role,
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email!,
          username: user.username,
          role: user.role,
        },
        tokens,
      };
    } catch (error) {
      console.error('Registration failed:', error);
      return {
        success: false,
        error: 'Registration failed. Please try again.',
      };
    }
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials, request: NextRequest): Promise<AuthResult> {
    try {
      // Validate input
      if (!credentials.email || !credentials.password) {
        return {
          success: false,
          error: 'Email and password are required',
        };
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      });

      if (!user) {
        return {
          success: false,
          error: 'Invalid email or password',
        };
      }

      // Check if user is active
      if (!user.isActive) {
        return {
          success: false,
          error: 'Account is deactivated. Please contact support.',
        };
      }

      // Verify password
      const isPasswordValid = await passwordService.verifyPassword(
        credentials.password,
        user.passwordHash
      );

      if (!isPasswordValid) {
        // Log failed login attempt
        await this.logAuditEvent(user.id, 'login_failed', 'user', user.id, {
          email: credentials.email,
          ipAddress: this.getClientIP(request),
          userAgent: request.headers.get('user-agent'),
        });

        return {
          success: false,
          error: 'Invalid email or password',
        };
      }

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      // Generate tokens
      const tokens = jwtAuth.generateTokens({
        userId: user.id,
        email: user.email!,
        role: user.role,
      });

      // Store refresh token in database
      await prisma.refreshToken.create({
        data: {
          token: tokens.refreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });

      // Log successful login
      await this.logAuditEvent(user.id, 'login', 'user', user.id, {
        email: user.email,
        ipAddress: this.getClientIP(request),
        userAgent: request.headers.get('user-agent'),
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email!,
          username: user.username,
          role: user.role,
        },
        tokens,
      };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        error: 'Login failed. Please try again.',
      };
    }
  }

  /**
   * Logout user
   */
  async logout(userId: string, refreshToken?: string): Promise<boolean> {
    try {
      // Remove refresh token from database
      if (refreshToken) {
        await prisma.refreshToken.deleteMany({
          where: {
            token: refreshToken,
            userId: userId,
          },
        });
      }

      // Log logout event
      await this.logAuditEvent(userId, 'logout', 'user', userId);

      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthResult> {
    try {
      // Verify refresh token
      const decoded = jwtAuth.verifyRefreshToken(refreshToken);
      if (!decoded) {
        return {
          success: false,
          error: 'Invalid refresh token',
        };
      }

      // Check if refresh token exists in database
      const tokenRecord = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
        return {
          success: false,
          error: 'Refresh token expired or invalid',
        };
      }

      // Check if user is still active
      if (!tokenRecord.user.isActive) {
        return {
          success: false,
          error: 'Account is deactivated',
        };
      }

      // Generate new access token
      const newAccessToken = jwtAuth.generateTokens({
        userId: tokenRecord.user.id,
        email: tokenRecord.user.email!,
        role: tokenRecord.user.role,
      });

      return {
        success: true,
        user: {
          id: tokenRecord.user.id,
          email: tokenRecord.user.email!,
          username: tokenRecord.user.username,
          role: tokenRecord.user.role,
        },
        tokens: newAccessToken,
      };
    } catch (error) {
      console.error('Token refresh failed:', error);
      return {
        success: false,
        error: 'Token refresh failed',
      };
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          isActive: true,
          lastLogin: true,
          createdAt: true,
        },
      });

      return user;
    } catch (error) {
      console.error('Failed to get user:', error);
      return null;
    }
  }

  /**
   * Update user password
   */
  async updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
    try {
      // Get user
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return false;
      }

      // Verify current password
      const isCurrentPasswordValid = await passwordService.verifyPassword(
        currentPassword,
        user.passwordHash
      );

      if (!isCurrentPasswordValid) {
        return false;
      }

      // Validate new password
      const passwordValidation = passwordService.validatePasswordStrength(newPassword);
      if (!passwordValidation.isValid) {
        return false;
      }

      // Hash new password
      const hashedNewPassword = await passwordService.hashPassword(newPassword);

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: { passwordHash: hashedNewPassword },
      });

      // Log password change
      await this.logAuditEvent(userId, 'password_change', 'user', userId);

      return true;
    } catch (error) {
      console.error('Password update failed:', error);
      return false;
    }
  }

  /**
   * Log audit event
   */
  private async logAuditEvent(
    userId: string,
    action: string,
    resource: string,
    resourceId?: string,
    metadata?: any
  ): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          userId,
          action,
          resource,
          resourceId,
          metadata,
        },
      });
    } catch (error) {
      console.error('Failed to log audit event:', error);
    }
  }

  /**
   * Get client IP address
   */
  private getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    if (realIP) {
      return realIP;
    }
    
    return 'unknown';
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();
