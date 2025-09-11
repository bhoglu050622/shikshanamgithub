// Global polyfill for Node.js environment
// This ensures 'self' is available in server-side rendering

if (typeof global !== 'undefined') {
  if (typeof global.self === 'undefined') {
    global.self = global;
  }
}

if (typeof globalThis !== 'undefined') {
  if (typeof globalThis.self === 'undefined') {
    globalThis.self = globalThis;
  }
}

// Ensure self is available in all contexts
if (typeof self === 'undefined') {
  if (typeof global !== 'undefined') {
    global.self = global;
  } else if (typeof globalThis !== 'undefined') {
    globalThis.self = globalThis;
  }
}
