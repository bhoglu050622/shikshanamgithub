#!/usr/bin/env node

// Set global self for server-side builds
if (typeof global !== 'undefined' && typeof self === 'undefined') {
  global.self = global;
}

// Import and run the build
const { execSync } = require('child_process');
const os = require('os');

// Calculate optimal memory settings based on available RAM
const totalMemory = os.totalmem();
const availableMemory = os.freemem();
const memoryGB = Math.floor(totalMemory / (1024 * 1024 * 1024));

// Use more conservative memory settings
const maxOldSpaceSize = Math.min(4096, Math.max(2048, Math.floor(memoryGB * 0.6)));

// Set optimized environment variables
const buildEnv = {
  ...process.env,
  NODE_OPTIONS: `--require ./polyfill-global.js --max-old-space-size=${maxOldSpaceSize} --max-semi-space-size=64`,
  NODE_ENV: 'production',
  // Performance optimizations
  NEXT_TELEMETRY_DISABLED: '1',
  CI: 'true',
  // Enable webpack optimizations
  NEXT_WEBPACK_USEPERSISTENTCACHE: '1',
  // Reduce memory usage
  NODE_OPTIONS_EXTRA: '--gc-interval=100 --gc-global'
};

try {
  console.log(`Starting optimized build with ${maxOldSpaceSize}MB memory limit...`);
  console.log(`Available memory: ${Math.floor(availableMemory / (1024 * 1024 * 1024))}GB`);
  
  execSync('next build', { 
    stdio: 'inherit', 
    env: buildEnv,
    maxBuffer: 1024 * 1024 * 10 // 10MB buffer
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
