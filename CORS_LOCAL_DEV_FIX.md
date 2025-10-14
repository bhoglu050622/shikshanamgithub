# CORS Local Development Fix

## Date: October 14, 2025

---

## 🎯 Problem

The previous CORS configuration was using wildcard origins (`*`) in development, which caused issues:

1. **CORS Violation**: Using `Access-Control-Allow-Origin: *` with `Access-Control-Allow-Credentials: true` is invalid per CORS specification
2. **Cookie Issues**: Browsers reject credentials when wildcard origins are used
3. **Authentication Failures**: Cookie-based authentication doesn't work with wildcard CORS

---

## ✅ Solution

Updated the CORS configuration to use **specific localhost origins** instead of wildcards in development.

### Changed Files

1. **`middleware.ts`** - Updated `getAllowedOrigins()` function
2. **`lib/utils/cors.ts`** - Updated `getAllowedOrigins()` and `getCorsHeaders()` functions
3. **`CORS_DOCUMENTATION.md`** - Updated documentation
4. **`CORS_FIXES_SUMMARY.md`** - Updated summary

---

## 📝 What Changed

### Before (Incorrect)

```typescript
// Development - allow all origins
return ['*']

// Later in code:
if (allowedOrigins.includes('*') || (origin && allowedOrigins.includes(origin))) {
  headers.set('Access-Control-Allow-Origin', origin || '*')
  headers.set('Access-Control-Allow-Credentials', 'true') // ❌ CORS violation!
}
```

### After (Correct)

```typescript
// Development - allow localhost and common development origins
return [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
]

// Later in code:
if (origin && allowedOrigins.includes(origin)) {
  headers.set('Access-Control-Allow-Origin', origin)
  headers.set('Access-Control-Allow-Credentials', 'true') // ✅ Now valid!
}
```

---

## 🔧 Technical Details

### Allowed Origins by Environment

#### Development
- `http://localhost:3000` - Default Next.js port
- `http://localhost:3001` - Alternative port
- `http://localhost:8080` - Common dev port
- `http://127.0.0.1:3000` - IPv4 localhost
- `http://127.0.0.1:3001` - IPv4 localhost
- `http://127.0.0.1:8080` - IPv4 localhost

#### Production
- `https://shikshanam.com`
- `https://www.shikshanam.com`
- `https://shikshanam.in`
- `https://www.shikshanam.in`

### How It Works

1. **Request arrives** with an `Origin` header (e.g., `http://localhost:3000`)
2. **Middleware checks** if origin is in allowed list
3. **If allowed**: Sets `Access-Control-Allow-Origin` to the specific origin
4. **Credentials enabled**: Sets `Access-Control-Allow-Credentials: true`
5. **Browser validates**: CORS check passes ✅

---

## 🧪 Testing

### Test Local Development CORS

**1. Start your dev server:**
```bash
npm run dev
```

**2. Test from browser console (on http://localhost:3000):**
```javascript
fetch('http://localhost:3000/api/health-check', {
  method: 'GET',
  credentials: 'include', // Include cookies
  headers: {
    'Content-Type': 'application/json',
  }
})
  .then(response => response.json())
  .then(data => console.log('✅ CORS working:', data))
  .catch(error => console.error('❌ CORS failed:', error));
```

**3. Test with cURL:**
```bash
# Test preflight
curl -X OPTIONS http://localhost:3000/api/health-check \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET" \
  -v

# Test actual request
curl -X GET http://localhost:3000/api/health-check \
  -H "Origin: http://localhost:3000" \
  -v
```

**4. Check response headers:**
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, X-File-Name
```

---

## 🔐 Security Benefits

### ✅ Improvements

1. **CORS Compliant**: No longer violates CORS specification
2. **Credentials Work**: Cookies and authentication now work correctly
3. **Specific Origins**: Only localhost is allowed in development
4. **No Wildcards**: Credentials never mixed with wildcards

### ⚠️ Important

- Development allows **only localhost** origins (not truly "all" origins)
- If you need a different port, add it to the `getAllowedOrigins()` function
- Production remains strict with specific HTTPS domains only

---

## 🚀 Adding Custom Ports

If you're running your dev server on a different port:

### Edit Both Files:

1. **`middleware.ts`** (lines 8-26)
2. **`lib/utils/cors.ts`** (lines 6-27)

### Add Your Port:

```typescript
// Development - allow localhost and common development origins
return [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'http://localhost:5000', // ← Add your custom port
  'http://127.0.0.1:5000', // ← Add IPv4 version too
]
```

---

## 📊 Before vs After

| Aspect | Before | After |
|--------|--------|-------|
| Development Origins | `*` (wildcard) | Specific localhost ports |
| CORS Compliance | ❌ Invalid with credentials | ✅ Valid |
| Cookie Support | ❌ Blocked by browser | ✅ Works |
| Authentication | ❌ Fails | ✅ Works |
| Security | ⚠️ Too permissive | ✅ Controlled |

---

## 🐛 Troubleshooting

### Issue: CORS Error in Browser Console

**Error Message:**
```
Access to fetch at 'http://localhost:3000/api/...' from origin 'http://localhost:XXXX' 
has been blocked by CORS policy
```

**Solution:**
Add your port to the allowed origins list (see "Adding Custom Ports" above).

---

### Issue: Cookies Not Being Sent

**Error:** API doesn't receive authentication cookies

**Solution:**
1. Ensure you're using `credentials: 'include'` in fetch
2. Verify origin is in allowed list
3. Check that `Access-Control-Allow-Credentials: true` header is present

---

### Issue: Different Port Than 3000

**Error:** Running on port 3001 but getting CORS errors

**Solution:**
Port 3001 is already in the allowed list. If using a different port, add it to both files.

---

## ✨ Summary

### What Was Fixed
- ✅ Removed wildcard origins in development
- ✅ Added specific localhost origins (ports 3000, 3001, 8080)
- ✅ Fixed CORS specification violation
- ✅ Enabled proper cookie/authentication support
- ✅ Updated documentation

### What Works Now
- ✅ Local development CORS
- ✅ Cookie-based authentication
- ✅ Credentials in cross-origin requests
- ✅ Proper preflight handling
- ✅ Compliant with CORS spec

### What You Need to Do
- ✅ Nothing! It works out of the box for standard ports
- 📝 If using custom port: Add it to `getAllowedOrigins()` in both files

---

## 📞 Support

If you encounter any CORS issues:

1. **Check browser console** for specific error messages
2. **Verify your port** is in the allowed origins list
3. **Check Network tab** to see actual headers
4. **Refer to** `CORS_DOCUMENTATION.md` for detailed guides

---

## 🎉 Conclusion

CORS is now properly configured for local development with:
- Specific localhost origins (no wildcards)
- Full credentials support
- CORS specification compliance
- Working cookie-based authentication

Your local development environment is ready to go! 🚀

