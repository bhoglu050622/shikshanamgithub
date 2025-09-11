// Polyfill for self in Node.js environment
if (typeof global !== 'undefined' && typeof self === 'undefined') {
  global.self = global;
}
