// Production Configuration for Shikshanam CMS
module.exports = {
  // Environment
  NODE_ENV: 'production',
  
  // Site Configuration
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-production-domain.com',
  CMS_URL: process.env.NEXT_PUBLIC_CMS_URL || 'https://your-production-domain.com/cms',
  
  // API Configuration
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://your-production-domain.com/api',
  
  // CMS Configuration
  CMS_ENABLED: true,
  CMS_ADMIN_PATH: '/cms',
  
  // Performance Settings
  OPTIMIZE_IMAGES: true,
  ENABLE_ANALYTICS: true,
  
  // Security Settings
  ENABLE_CORS: true,
  ALLOWED_ORIGINS: [
    'https://your-production-domain.com',
    'https://www.your-production-domain.com'
  ],
  
  // Content Management
  CONTENT_TYPES: [
    'homepage',
    'about', 
    'contact',
    'donation',
    'schools',
    'sanskrit-school',
    'darshana-school', 
    'self-help-school',
    'blog',
    'advaita-vedanta-course',
    'sanskrit-darshan-upanishad-bundle'
  ],
  
  // Deployment Settings
  BUILD_COMMAND: 'npm run build',
  START_COMMAND: 'npm start',
  OUTPUT_DIR: '.next',
  
  // Monitoring
  ENABLE_LOGGING: true,
  LOG_LEVEL: 'info',
  
  // Cache Settings
  CACHE_DURATION: 3600, // 1 hour
  ENABLE_REDIS: false, // Set to true if using Redis
  
  // Database (if using external database)
  DATABASE_URL: process.env.DATABASE_URL || null,
  
  // File Storage
  UPLOAD_DIR: './public/uploads',
  MAX_FILE_SIZE: '10MB',
  ALLOWED_FILE_TYPES: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp']
};
