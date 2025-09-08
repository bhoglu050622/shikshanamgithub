/**
 * Server-side cookie utilities
 * For reading cookies in API routes and server components
 */

import { NextRequest } from 'next/server';

export interface AuthData {
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  timestamp: number;
}

export function getServerAuthCookie(request: NextRequest): AuthData | null {
  try {
    const cookieHeader = request.headers.get('cookie');
    
    if (!cookieHeader) {
      return null;
    }

    // Parse cookies from the cookie header
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        acc[name] = decodeURIComponent(value);
      }
      return acc;
    }, {} as Record<string, string>);

    const authCookieValue = cookies['shikshanam-auth'];
    
    if (!authCookieValue) {
      return null;
    }

    const authData = JSON.parse(authCookieValue) as AuthData;
    
    // Check if cookie is expired (older than 30 days)
    const now = Date.now();
    const cookieAge = now - authData.timestamp;
    const maxAgeMs = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    
    if (cookieAge > maxAgeMs) {
      return null;
    }
    
    return authData;
  } catch (error) {
    console.error('Error parsing server auth cookie:', error);
    return null;
  }
}

export function validateAuthData(authData: AuthData | null): boolean {
  if (!authData) {
    return false;
  }

  if (!authData.isLoggedIn || !authData.user) {
    return false;
  }

  if (!authData.user.email || !authData.user.name) {
    return false;
  }

  return true;
}
