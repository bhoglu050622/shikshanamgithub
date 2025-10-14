# CORS Configuration Documentation

## Overview

This document explains the CORS (Cross-Origin Resource Sharing) implementation in the Shikshanam application. CORS has been configured to handle cross-origin requests securely across all API endpoints.

## What Was Fixed

### 1. Middleware CORS Handling
- **File**: `middleware.ts`
- **Changes**:
  - Added automatic CORS headers to all API routes
  - Implemented OPTIONS preflight request handling
  - Added support for credentials (cookies/authentication)
  - Environment-based origin allowlist

### 2. Next.js Configuration
- **File**: `next.config.js`
- **Changes**:
  - Added `Access-Control-Allow-Credentials: true` header
  - Expanded allowed headers list
  - Added PATCH method support
  - Removed hardcoded origin restriction (now handled by middleware)

### 3. CORS Utility Library
- **File**: `lib/utils/cors.ts`
- **Purpose**: Reusable CORS helper functions for API routes
- **Functions**:
  - `getAllowedOrigins()` - Get environment-specific allowed origins
  - `isOriginAllowed()` - Check if an origin is allowed
  - `getCorsHeaders()` - Generate CORS headers for a request
  - `handleCorsPreflightRequest()` - Handle OPTIONS preflight requests
  - `addCorsHeaders()` - Add CORS headers to existing response
  - `corsResponse()` - Create JSON response with CORS headers

### 4. Updated API Routes
Updated the following API routes to use CORS utilities:
- `/api/health-check`
- `/api/marketing-config`

## Allowed Origins

### Development Environment
The following localhost origins are allowed:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:8080`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`
- `http://127.0.0.1:8080`

### Production Environment
The following origins are whitelisted:
- `https://shikshanam.com`
- `https://www.shikshanam.com`
- `https://shikshanam.in`
- `https://www.shikshanam.in`

To add more origins, edit the `getAllowedOrigins()` function in:
- `middleware.ts` (line 8-26)
- `lib/utils/cors.ts` (line 6-27)

## How to Use CORS Utilities in API Routes

### Basic Example

```typescript
import { NextRequest } from 'next/server'
import { corsResponse, handleCorsPreflightRequest } from '@/lib/utils/cors'

// Handle OPTIONS preflight
export async function OPTIONS(request: NextRequest) {
  return handleCorsPreflightRequest(request)
}

// Your API endpoint
export async function GET(request: NextRequest) {
  const data = { message: 'Hello World' }
  return corsResponse(data, request)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  // Process your data...
  return corsResponse({ success: true }, request)
}
```

### Advanced Example with Custom Status

```typescript
import { NextRequest } from 'next/server'
import { corsResponse, handleCorsPreflightRequest } from '@/lib/utils/cors'

export async function OPTIONS(request: NextRequest) {
  return handleCorsPreflightRequest(request)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    if (!body.email) {
      return corsResponse(
        { error: 'Email is required' },
        request,
        { status: 400 }
      )
    }
    
    // Process request...
    return corsResponse({ success: true }, request)
  } catch (error) {
    return corsResponse(
      { error: 'Internal server error' },
      request,
      { status: 500 }
    )
  }
}
```

### Adding CORS to Existing NextResponse

If you already have a `NextResponse` object:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { addCorsHeaders, handleCorsPreflightRequest } from '@/lib/utils/cors'

export async function OPTIONS(request: NextRequest) {
  return handleCorsPreflightRequest(request)
}

export async function GET(request: NextRequest) {
  const response = NextResponse.json({ data: 'example' })
  return addCorsHeaders(response, request)
}
```

## Testing CORS

### Using cURL

```bash
# Test preflight request
curl -X OPTIONS http://localhost:3000/api/health-check \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET" \
  -v

# Test actual request
curl -X GET http://localhost:3000/api/health-check \
  -H "Origin: http://localhost:3000" \
  -v
```

### Using JavaScript (Browser Console)

```javascript
// Test API endpoint with CORS
fetch('http://localhost:3000/api/health-check', {
  method: 'GET',
  credentials: 'include', // Include cookies
  headers: {
    'Content-Type': 'application/json',
  }
})
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
```

### Expected Headers in Response

When CORS is properly configured, you should see these headers:

```
Access-Control-Allow-Origin: https://shikshanam.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, X-File-Name
Access-Control-Max-Age: 86400
```

## Common CORS Errors and Solutions

### Error: "No 'Access-Control-Allow-Origin' header is present"
**Solution**: Make sure the middleware is running and the origin is in the allowed list.

### Error: "CORS policy: The value of the 'Access-Control-Allow-Origin' header must not be the wildcard '*' when credentials are included"
**Solution**: This is already handled. In production, specific origins are used instead of wildcards.

### Error: "Method not allowed"
**Solution**: Make sure you've added an `OPTIONS` handler to your API route.

### Error: "Header 'X-Custom-Header' is not allowed"
**Solution**: Add your custom header to the `Access-Control-Allow-Headers` list in the middleware.

## Security Considerations

1. **Production Origins**: Always keep the production allowed origins list minimal and specific
2. **Credentials**: Only enable credentials when necessary (authentication/cookies)
3. **Headers**: Only allow necessary headers to minimize attack surface
4. **Methods**: Only allow HTTP methods that your API actually uses
5. **Preflight Caching**: The `Access-Control-Max-Age` is set to 24 hours (86400 seconds) to reduce preflight requests

## Deployment Checklist

Before deploying CORS changes:

- [ ] Verify all production origins are correctly listed
- [ ] Test all API endpoints with preflight requests
- [ ] Verify authentication/cookies work with CORS
- [ ] Check browser console for CORS errors
- [ ] Test from all allowed domains
- [ ] Verify OPTIONS requests return 204 status
- [ ] Check that credentials are properly handled

## Additional Resources

- [MDN CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware)

## Questions or Issues?

If you encounter CORS issues:
1. Check browser console for specific error messages
2. Verify the origin is in the allowed list
3. Check that OPTIONS handler exists in the API route
4. Verify middleware is properly configured
5. Check Network tab for preflight request details

