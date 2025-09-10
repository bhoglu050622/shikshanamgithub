# Developer Checklist: Authentication & Session Fixes

## ✅ COMPLETED ITEMS

### Auth & Session
- [x] **Fix token attachment in service worker and fetch/GraphQL client**
  - ✅ Updated `public/sw.js` to include `credentials: 'include'` in all fetch calls
  - ✅ Created `lib/fetch-with-auth.ts` utility for authenticated requests
  - ✅ Fixed Graphy API client to include `mid` and `key` parameters
  - ✅ Updated dashboard and recommendations hooks to use authenticated fetch

- [x] **Implement refresh token flow and retry logic for 401s**
  - ✅ Added `lib/auth-token-refresh.ts` with retry logic
  - ✅ Implemented 401 error detection in Graphy API client
  - ✅ Added authentication error handlers throughout the stack
  - ✅ Created automatic logout and redirect flow on session expiry

- [x] **Add defensive checks so unauthenticated requests don't run demoableFeatures query**
  - ✅ Service worker now skips GraphQL queries from extensions
  - ✅ Added authentication validation before API calls

## 🔄 IN PROGRESS / NEEDS VERIFICATION

### API & Routing
- [ ] **Confirm backend endpoints exist and match frontend base URL/env (fix 404s)**
  - Status: Need to verify all API endpoints are accessible
  - Action: Test all API routes in staging environment
  - Files to check: All `/api/*` routes

- [ ] **Verify user/learner mapping logic (resolve "No learner found" case)**
  - Status: Graphy API integration implemented, need to test with real data
  - Action: Test with actual user accounts and Graphy API credentials
  - Files: `lib/api/graphy-client.ts`, `lib/dashboard/dashboard-service.ts`

- [ ] **Add graceful error handling UI for missing data**
  - Status: Basic error handling implemented, need to enhance UI
  - Action: Improve error messages and fallback UI components
  - Files: `app/dashboard/page.tsx`, error components

## 🚨 HIGH PRIORITY - IMMEDIATE ACTION NEEDED

### Third-party Scripts / Extensions
- [ ] **Identify failing extension/session-replay scripts (tx_ack_timeout)**
  - Status: Service worker skips extension requests, but need to identify specific scripts
  - Action: Monitor browser console for extension-related errors
  - Files: `public/sw.js` (lines 92-96 already skip extension requests)

- [ ] **Fix any chrome-extension web_accessible_resources issues**
  - Status: No extension shipped, but dev-only code may exist
  - Action: Audit codebase for extension-related code and remove if not needed
  - Files: Search for `chrome-extension`, `web_accessible_resources`

### Logging & Observability
- [ ] **Log full diagnostics server-side (with traces) for the 401/404/tx failures**
  - Status: Basic logging implemented, need enhanced diagnostics
  - Action: Add structured logging with request IDs and traces
  - Files: All API routes, add comprehensive logging

- [ ] **Surface a single friendly error in the UI while retaining full logs**
  - Status: Basic error handling exists, need user-friendly messages
  - Action: Create consistent error UI components
  - Files: Error components, dashboard error handling

## 🔧 MEDIUM PRIORITY - NEXT SPRINT

### Security & Testing
- [ ] **Implement input validation, rate-limiting, and proper auth checks on server**
  - Status: Basic auth checks implemented, need comprehensive security
  - Action: Add input validation, rate limiting, and security headers
  - Files: All API routes, middleware

- [ ] **Add unit/integration tests for auth flows**
  - Status: No tests exist for auth flows
  - Action: Create comprehensive test suite
  - Files: Create test files for auth components and API routes

- [ ] **Add end-to-end test that covers login → token refresh → protected API calls**
  - Status: No E2E tests exist
  - Action: Create E2E test suite with Playwright/Cypress
  - Files: Create E2E test files

- [ ] **Run SAST/DAST and a penetration test**
  - Status: Not implemented
  - Action: Set up security scanning tools
  - Tools: Snyk, OWASP ZAP, etc.

## 🚀 RELEASE & VERIFICATION

### Deployment Pipeline
- [ ] **Deploy to staging**
  - Status: Ready for staging deployment
  - Action: Deploy current changes to staging environment
  - Files: All modified files ready for deployment

- [ ] **Run the E2E suite**
  - Status: E2E tests need to be created
  - Action: Create and run E2E tests
  - Priority: High - needed before production

- [ ] **Manual test auth edge cases**
  - Status: Need to test various authentication scenarios
  - Test cases:
    - [ ] Login with valid credentials
    - [ ] Login with invalid credentials
    - [ ] Session expiry during active use
    - [ ] Token refresh flow
    - [ ] Logout and re-login
    - [ ] Service worker authentication
    - [ ] Background sync authentication

- [ ] **Promote to production**
  - Status: Pending completion of above items
  - Action: Deploy to production after successful staging tests

## 📋 IMMEDIATE ACTION ITEMS (Next 24-48 Hours)

### 1. Environment Setup
```bash
# Set up environment variables
cp .env.example .env.local
# Add your Graphy API credentials
GRAPHY_API_KEY=your_merchant_id_here
GRAPHY_SECRET_KEY=your_api_token_here
GRAPHY_MID=your_merchant_id_here
```

### 2. Test Authentication Flow
```bash
# Test the authentication endpoint
curl http://localhost:3000/api/test-graphy-auth

# Test dashboard with authentication
curl -X GET http://localhost:3000/api/dashboard/real-data \
  -H "Cookie: your-auth-cookie" \
  -v
```

### 3. Monitor Browser Console
- Open DevTools → Console
- Look for any remaining "Invalid session" errors
- Check Network tab for API requests with proper credentials
- Verify service worker is handling requests correctly

### 4. Clear Browser Cache
- Users need to clear browser cache to get updated service worker
- Hard refresh (Ctrl+Shift+R) or clear cache in DevTools

## 🐛 DEBUGGING CHECKLIST

### If Still Seeing 401 Errors:
1. **Check Service Worker**: Verify service worker is updated and active
2. **Check Credentials**: Ensure `credentials: 'include'` is present in fetch calls
3. **Check Cookies**: Verify authentication cookies are being sent
4. **Check API Keys**: Ensure Graphy API credentials are properly configured
5. **Check Network**: Monitor Network tab for request/response details

### If Seeing 404 Errors:
1. **Check API Routes**: Verify all API endpoints exist and are accessible
2. **Check Base URLs**: Ensure frontend and backend URLs match
3. **Check Environment**: Verify environment variables are set correctly

### If Seeing Extension Errors:
1. **Check Service Worker**: Verify extension requests are being skipped
2. **Check Console**: Look for specific extension-related error messages
3. **Disable Extensions**: Test with extensions disabled to isolate issues

## 📊 SUCCESS METRICS

### Authentication Success:
- [ ] No "Invalid session" errors in console
- [ ] All API calls include proper authentication
- [ ] Service worker requests work correctly
- [ ] Token refresh works automatically
- [ ] Users can access protected content

### Performance:
- [ ] No significant performance degradation
- [ ] Service worker caching works correctly
- [ ] Background sync functions properly

### User Experience:
- [ ] Clear error messages for users
- [ ] Smooth authentication flow
- [ ] No unexpected logouts
- [ ] Proper redirects on session expiry

## 🔄 REGULAR MAINTENANCE

### Weekly:
- [ ] Monitor authentication error logs
- [ ] Check service worker performance
- [ ] Review API response times

### Monthly:
- [ ] Update security dependencies
- [ ] Review authentication logs
- [ ] Test authentication flows
- [ ] Update API credentials if needed

---

**Last Updated**: $(date)
**Status**: Ready for staging deployment
**Next Review**: After staging deployment and testing
