#!/usr/bin/env node

// Set global self for server-side builds
if (typeof global !== 'undefined' && typeof self === 'undefined') {
  global.self = global;
}

// Import and run the build
const { execSync } = require('child_process');

// Set memory-optimized environment variables
const buildEnv = {
  ...process.env,
  NODE_OPTIONS: '--require ./polyfill-self.js --max-old-space-size=6144 --max-semi-space-size=128',
  NODE_ENV: 'production',
  // Disable some features to reduce memory usage
  NEXT_TELEMETRY_DISABLED: '1',
  CI: 'true'
};

try {
  console.log('Starting optimized build with memory limits...');
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
