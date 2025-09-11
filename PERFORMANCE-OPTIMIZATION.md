# Performance Optimization Guide

## Overview
This document outlines the performance optimizations implemented in the Shikshanam application to improve build times, runtime performance, and user experience.

## Build Optimizations

### Memory Management
- **Reduced memory usage**: Lowered from 6GB to 4GB maximum memory allocation
- **Dynamic memory calculation**: Build script now calculates optimal memory based on available system RAM
- **Garbage collection optimization**: Added GC intervals and global GC settings

### Webpack Configuration
- **Enabled code splitting**: Proper chunk splitting for vendor libraries, common code, and large dependencies
- **Parallel processing**: Uses CPU cores - 1 for optimal build performance
- **Package optimization**: Enabled `optimizePackageImports` for framer-motion, lucide-react, and Radix UI
- **Deterministic builds**: Consistent module and chunk IDs for better caching

### Image Optimization
- **Re-enabled image optimization**: Proper WebP and AVIF format support
- **Device-specific sizes**: Optimized image sizes for different screen resolutions
- **Caching**: 30-day cache TTL for optimized images
- **SVG support**: Safe SVG handling with CSP

## Runtime Optimizations

### Lazy Loading
- **3D Components**: Dynamic loading with error boundaries and loading states
- **Heavy Libraries**: Lazy loading for Three.js and React Three Fiber
- **Intersection Observer**: Efficient lazy loading with proper fallbacks

### Performance Monitoring
- **Debounced metrics collection**: Reduced frequency of performance measurements
- **Web Vitals tracking**: FCP, LCP, FID, CLS, and TTFB monitoring
- **Connection-aware optimization**: Different strategies for slow connections

### Code Splitting Strategy
```javascript
// Vendor libraries (highest priority)
framer-motion: Separate chunk for animation library
three: Separate chunk for 3D graphics
radix-ui: Separate chunk for UI components

// Common code
Common components used across multiple pages

// Application code
Page-specific components and logic
```

## Build Scripts

### Available Commands
```bash
# Standard build with optimizations
npm run build

# Fast build with persistent cache
npm run build:fast

# Bundle analysis
npm run build:analyze

# Clean build
npm run build:clean

# Type checking
npm run type-check
```

## Performance Metrics

### Target Metrics
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to First Byte (TTFB)**: < 600ms

### Monitoring
- Performance metrics are collected and reported to analytics
- Development mode shows real-time performance scores
- Production builds include performance monitoring

## Best Practices

### Component Optimization
1. Use `React.memo()` for expensive components
2. Implement proper `useCallback()` and `useMemo()` hooks
3. Lazy load heavy components with `dynamic()` imports
4. Use intersection observers for viewport-based loading

### Bundle Optimization
1. Import only needed parts of large libraries
2. Use tree shaking for unused code elimination
3. Implement proper code splitting strategies
4. Monitor bundle size with analyzer

### Image Optimization
1. Use Next.js Image component for automatic optimization
2. Implement proper lazy loading for images
3. Use appropriate image formats (WebP, AVIF)
4. Set proper dimensions and quality settings

## Troubleshooting

### Build Issues
- **Memory errors**: Reduce `maxOldSpaceSize` in build script
- **Timeout errors**: Increase build timeout in deployment settings
- **Bundle size**: Use `npm run build:analyze` to identify large dependencies

### Runtime Issues
- **Slow loading**: Check network tab for large resources
- **Poor performance**: Use performance monitor to identify bottlenecks
- **Memory leaks**: Monitor memory usage in development tools

## Future Optimizations

### Planned Improvements
1. **Service Worker**: Implement for offline functionality and caching
2. **Critical CSS**: Extract and inline critical styles
3. **Resource Hints**: Add preload and prefetch for critical resources
4. **CDN Integration**: Optimize static asset delivery
5. **Database Optimization**: Query optimization and connection pooling

### Monitoring
- Set up performance budgets
- Implement automated performance testing
- Monitor Core Web Vitals in production
- Set up alerts for performance regressions
