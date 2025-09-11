#!/usr/bin/env node

// Set global self for server-side builds
if (typeof global !== 'undefined' && typeof self === 'undefined') {
  global.self = global;
}

// Import and run the build
const { execSync } = require('child_process');

try {
  execSync('next build', { stdio: 'inherit', env: { ...process.env, NODE_OPTIONS: '--require ./polyfill-self.js' } });
} catch (error) {
  process.exit(1);
}
