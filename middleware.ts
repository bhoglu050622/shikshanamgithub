import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public paths that should not require authentication
const PUBLIC_PATHS = [
  '/manifest.webmanifest',
  '/sw.js',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/offline',
  '/api/health-check',
  '/api/robots',
  '/api/sitemap',
];

// Public API endpoints that don't require authentication
const PUBLIC_API_PATHS = [
  '/api/health-check',
  '/api/robots',
  '/api/sitemap',
  '/api/auth/login',
  '/api/auth/logout',
  '/api/auth/refresh',
];

// Pages that should be publicly accessible
const PUBLIC_PAGES = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/accessibility',
  '/help',
  '/courses',
  '/schools',
  '/gurus',
  '/wisdom',
  '/tools',
  '/packages',
  '/blogs',
  '/glossaries',
  '/auth/login',
  '/auth/logout',
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow Next.js internals and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/icons')
  ) {
    return NextResponse.next();
  }

  // Allow public paths - CRITICAL: manifest.webmanifest must be excluded from auth
  if (PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow public API endpoints
  if (PUBLIC_API_PATHS.some(p => pathname === p || pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow public pages
  if (PUBLIC_PAGES.some(p => pathname === p || pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // For API routes that require authentication
  if (pathname.startsWith('/api/')) {
    // Check for authentication token or session cookie
    const authHeader = req.headers.get('authorization');
    const sessionCookie = req.cookies.get('session')?.value;
    
    if (!authHeader?.startsWith('Bearer ') && !sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
  }

  // For protected pages (dashboard, cms, etc.)
  if (pathname.startsWith('/dashboard') || 
      pathname.startsWith('/cms') || 
      pathname.startsWith('/analytics-dashboard') ||
      pathname.startsWith('/account') ||
      pathname.startsWith('/me')) {
    
    const sessionCookie = req.cookies.get('session')?.value;
    
    if (!sessionCookie) {
      // Redirect to login page
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
