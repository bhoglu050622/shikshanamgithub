/** @type {import('next').NextConfig} */

// Set global self for server-side builds
if (typeof global !== 'undefined' && typeof self === 'undefined') {
  global.self = global;
}

// Additional polyfill for Node.js environment
if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
  globalThis.self = globalThis;
}

const nextConfig = {
  outputFileTracingRoot: __dirname,
  
  // Enable image optimization with proper configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'shikshanam.com',
      },
      {
        protocol: 'https',
        hostname: 'shikshanam.in',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i1.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i2.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  
  // Temporarily disabled experimental optimizations to troubleshoot
  experimental: {
    // optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-icons'],
    // turbo: {
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //       as: '*.js',
    //     },
    //   },
    // },
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  trailingSlash: false,
  webpack: (config, { isServer, dev }) => {
    // Set global self for server-side builds
    if (isServer && typeof global !== 'undefined') {
      global.self = global;
    }
    
    // Optimize build configuration
    config.optimization = config.optimization || {};
    config.optimization.moduleIds = 'deterministic';
    config.optimization.chunkIds = 'deterministic';
    // Removed usedExports and sideEffects as they conflict with Next.js caching
    
    // Temporarily disabled parallel processing to troubleshoot
    // config.parallelism = Math.max(1, require('os').cpus().length - 1);
    
    // Optimize resolve configuration
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    // Temporarily disabled complex code splitting to troubleshoot
    // if (!dev) {
    //   config.optimization.splitChunks = {
    //     chunks: 'all',
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: 'vendors',
    //         chunks: 'all',
    //         priority: 10,
    //       },
    //       common: {
    //         name: 'common',
    //         minChunks: 2,
    //         chunks: 'all',
    //         priority: 5,
    //         reuseExistingChunk: true,
    //       },
    //       // Separate large libraries
    //       framerMotion: {
    //         test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
    //         name: 'framer-motion',
    //         chunks: 'all',
    //         priority: 20,
    //       },
    //       three: {
    //         test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
    //         name: 'three',
    //         chunks: 'all',
    //         priority: 20,
    //       },
    //       radix: {
    //         test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
    //         name: 'radix-ui',
    //         chunks: 'all',
    //         priority: 15,
    //       },
    //     },
    //   };
    // }
    
    // Handle server-side configuration
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        // Prevent browser-only globals from being accessed on server
        window: false,
        navigator: false,
        document: false,
        screen: false,
        localStorage: false,
        sessionStorage: false,
      };
      
      // Handle self references in webpack chunks
      config.plugins = config.plugins || [];
      config.plugins.push(
        new (require('webpack')).DefinePlugin({
          'self': 'global',
          'global.self': 'global',
        })
      );
      
      // Add global self polyfill for server-side
      config.plugins.push(
        new (require('webpack')).ProvidePlugin({
          self: 'global',
        })
      );
      
    }
    
    // Handle Chrome extension messaging issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Production optimizations disabled to reduce memory usage
    
    // Ignore Chrome extension warnings
    config.ignoreWarnings = [
      /Failed to parse source map/,
      /chrome-extension:/,
      /tx_attempts_exceeded/,
      /tx_ack_timeout/,
    ];
    
    return config;
  },
  // make sure we're not silently falling back to Turbopack
  // experimental: { 
  //   webpackBuildWorker: false 
  // },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' chrome-extension: https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://accounts.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data:; img-src 'self' data: https: blob:; connect-src 'self' chrome-extension: https://script.google.com https://api.ongraphy.com https://accounts.google.com; frame-src 'self' https://accounts.google.com;",
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' ? 'https://shikshanam.com' : '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With',
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
