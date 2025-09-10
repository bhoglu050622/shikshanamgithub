# CMS Deployment Guide

## 🚀 Quick Start

### 1. Environment Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### 2. Database Setup
```bash
# Run database migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### 3. Start Development Server
```bash
npm run dev
```

## 🔧 Configuration

### Required Environment Variables
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/shikshanam"

# Authentication
JWT_SECRET="your-jwt-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"

# CMS
CMS_ADMIN_USERNAME="admin"
CMS_ADMIN_PASSWORD="secure-password"
CMS_ADMIN_EMAIL="admin@shikshanam.com"

# File Upload
UPLOAD_MAX_SIZE="10485760" # 10MB
UPLOAD_ALLOWED_TYPES="image/jpeg,image/png,image/gif,image/webp,video/mp4,audio/mp3,application/pdf"

# Analytics
ANALYTICS_ENABLED="true"
```

## 📁 File Structure

```
app/
├── api/cms/                 # CMS API routes
│   ├── auth/               # Authentication endpoints
│   ├── courses/            # Course management
│   ├── blog/               # Blog management
│   ├── packages/           # Package management
│   ├── media/              # Media management
│   ├── users/              # User management
│   ├── publishing/         # Publishing workflow
│   ├── analytics/          # Analytics data
│   └── settings/           # System settings
├── cms/                    # CMS frontend pages
│   ├── page.tsx            # Dashboard
│   ├── courses/            # Course management
│   ├── blog/               # Blog management
│   ├── packages/           # Package management
│   ├── media/              # Media library
│   ├── users/              # User management
│   ├── editor/             # Content editor
│   ├── analytics/          # Analytics dashboard
│   ├── settings/           # Settings page
│   └── publishing/         # Publishing queue
└── layout.tsx              # CMS layout wrapper

cms/
├── components/             # CMS components
├── lib/                    # CMS utilities
├── context/                # React contexts
└── types/                  # TypeScript types
```

## 🔐 Security Checklist

- [ ] Change default admin credentials
- [ ] Set strong JWT secrets
- [ ] Configure CORS properly
- [ ] Enable HTTPS in production
- [ ] Set up rate limiting
- [ ] Configure file upload restrictions
- [ ] Enable audit logging
- [ ] Set up backup strategy

## 📊 Monitoring

### Health Checks
- `/api/health-check` - System health
- `/api/cms/analytics` - Analytics data
- Database connection status
- File upload functionality

### Logs to Monitor
- Authentication attempts
- Content publishing
- User management actions
- System errors
- Performance metrics

## 🚀 Production Deployment

### 1. Build Application
```bash
npm run build
```

### 2. Start Production Server
```bash
npm start
```

### 3. Set Up Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /api/cms/media {
        proxy_pass http://localhost:3000;
        client_max_body_size 10M;
    }
}
```

### 4. SSL Certificate
```bash
# Using Let's Encrypt
certbot --nginx -d your-domain.com
```

## 🔄 Maintenance

### Regular Tasks
- [ ] Monitor system performance
- [ ] Review audit logs
- [ ] Update dependencies
- [ ] Backup database
- [ ] Clean up old files
- [ ] Review user permissions

### Database Maintenance
```bash
# Backup database
pg_dump shikshanam > backup.sql

# Restore database
psql shikshanam < backup.sql

# Run migrations
npx prisma migrate deploy
```

## 🆘 Troubleshooting

### Common Issues

#### Authentication Errors
- Check JWT secrets are set
- Verify user credentials
- Check token expiration

#### File Upload Issues
- Verify upload directory permissions
- Check file size limits
- Validate file types

#### Database Connection
- Check DATABASE_URL
- Verify database server is running
- Check network connectivity

#### Performance Issues
- Monitor database queries
- Check file storage usage
- Review server resources

### Support
- Check logs in `/var/log/`
- Monitor system resources
- Review error messages
- Contact system administrator

## 📈 Scaling

### Horizontal Scaling
- Use load balancer
- Multiple app instances
- Database read replicas
- CDN for static assets

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching
- Use faster storage

## 🔒 Security Updates

### Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Apply security patches
- Review access logs

### Security Best Practices
- Use strong passwords
- Enable two-factor authentication
- Regular security audits
- Monitor for suspicious activity
