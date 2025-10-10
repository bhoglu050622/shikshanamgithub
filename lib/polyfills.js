// Polyfill for self in server-side rendering
if (typeof global !== 'undefined' && typeof self === 'undefined') {
  global.self = global;
}
