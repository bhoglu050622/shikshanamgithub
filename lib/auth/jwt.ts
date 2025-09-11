/**
 * JWT Authentication Service
 * Handles token generation, validation, and refresh
 */

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class JWTAuthService {
  private static instance: JWTAuthService;
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  private readonly accessTokenExpiry: string;
  private readonly refreshTokenExpiry: string;

  private constructor() {
    this.accessTokenSecret = process.env.JWT_ACCESS_SECRET || 'your-access-secret-key';
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
    this.accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY || '15m';
    this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY || '7d';
  }

  static getInstance(): JWTAuthService {
    if (!JWTAuthService.instance) {
      JWTAuthService.instance = new JWTAuthService();
    }
    return JWTAuthService.instance;
  }

  /**
   * Generate access and refresh tokens
   */
  generateTokens(payload: Omit<JWTPayload, 'iat' | 'exp'>): TokenPair {
    const accessToken = jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiry,
      issuer: 'shikshanam.com',
      audience: 'shikshanam-users',
    } as jwt.SignOptions);

    const refreshToken = jwt.sign(
      { userId: payload.userId, type: 'refresh' },
      this.refreshTokenSecret,
      {
        expiresIn: this.refreshTokenExpiry,
        issuer: 'shikshanam.com',
        audience: 'shikshanam-users',
      } as jwt.SignOptions
    );

    return { accessToken, refreshToken };
  }

  /**
   * Verify access token
   */
  verifyAccessToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, this.accessTokenSecret, {
        issuer: 'shikshanam.com',
        audience: 'shikshanam-users',
      }) as JWTPayload;
      return decoded;
    } catch (error) {
      console.error('Access token verification failed:', error);
      return null;
    }
  }

  /**
   * Verify refresh token
   */
  verifyRefreshToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, this.refreshTokenSecret, {
        issuer: 'shikshanam.com',
        audience: 'shikshanam-users',
      }) as any;
      
      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }
      
      return { userId: decoded.userId };
    } catch (error) {
      console.error('Refresh token verification failed:', error);
      return null;
    }
  }

  /**
   * Extract token from request
   */
  extractTokenFromRequest(request: NextRequest): string | null {
    // Check Authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Check cookies
    const tokenCookie = request.cookies.get('access_token')?.value;
    if (tokenCookie) {
      return tokenCookie;
    }

    return null;
  }

  /**
   * Set secure cookies for tokens
   */
  async setTokenCookies(accessToken: string, refreshToken: string): Promise<void> {
    const cookieStore = await cookies();
    
    // Set access token cookie (short-lived)
    cookieStore.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    // Set refresh token cookie (long-lived)
    cookieStore.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });
  }

  /**
   * Clear token cookies
   */
  async clearTokenCookies(): Promise<void> {
    const cookieStore = await cookies();
    
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
  }

  /**
   * Get user from request
   */
  async getUserFromRequest(request: NextRequest): Promise<JWTPayload | null> {
    const token = this.extractTokenFromRequest(request);
    if (!token) {
      return null;
    }

    return this.verifyAccessToken(token);
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(refreshToken: string, userData: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string | null> {
    const decoded = this.verifyRefreshToken(refreshToken);
    if (!decoded) {
      return null;
    }

      // Generate new access token
      const newAccessToken = jwt.sign(userData, this.accessTokenSecret, {
        expiresIn: this.accessTokenExpiry,
        issuer: 'shikshanam.com',
        audience: 'shikshanam-users',
      } as jwt.SignOptions);

    return newAccessToken;
  }
}

// Export singleton instance
export const jwtAuth = JWTAuthService.getInstance();
