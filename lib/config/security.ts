/**
 * Security Configuration
 * Centralized security settings and environment variables
 */

export const SECURITY_CONFIG = {
  // JWT Configuration
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'your-super-secret-access-key-change-this-in-production',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-this-in-production',
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  },

  // Password Configuration
  password: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'),
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // limit each IP to 100 requests per windowMs
    skipSuccessfulRequests: false,
  },

  // Session Configuration
  session: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict' as const,
  },

  // CORS Configuration
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://shikshanam.com', 'https://www.shikshanam.com']
      : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },

  // Security Headers
  headers: {
    contentSecurityPolicy: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
  },

  // Admin Configuration
  admin: {
    apiKey: process.env.ADMIN_API_KEY || 'your-admin-api-key',
    jwtToken: process.env.ADMIN_JWT_TOKEN || 'your-admin-jwt-token',
  },

  // Feature Flags
  features: {
    enableEmailAuth: process.env.ENABLE_EMAIL_AUTH === 'true',
    enableGoogleAuth: process.env.ENABLE_GOOGLE_AUTH === 'true',
    enableRegistration: process.env.ENABLE_REGISTRATION === 'true',
    enablePasswordReset: process.env.ENABLE_PASSWORD_RESET === 'true',
  },

  // Audit Configuration
  audit: {
    logFailedLogins: true,
    logPasswordChanges: true,
    logAdminActions: true,
    retentionDays: 90,
  },
} as const;

export type SecurityConfig = typeof SECURITY_CONFIG;
