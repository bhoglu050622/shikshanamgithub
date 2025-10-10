// Polyfills for SSR compatibility
if (typeof window === 'undefined') {
  // Server-side polyfills for browser globals
  (global as any).SVGElement = class SVGElement {
    constructor() {
      return {}
    }
  }
  
  (global as any).HTMLElement = class HTMLElement {
    constructor() {
      return {}
    }
  }
  
  (global as any).Element = class Element {
    constructor() {
      return {}
    }
  }
  
  (global as any).Node = class Node {
    constructor() {
      return {}
    }
  }
  
  (global as any).Document = class Document {
    constructor() {
      return {}
    }
  }
  
  (global as any).Window = class Window {
    constructor() {
      return {}
    }
  }
  
  // Add setAttribute polyfill
  if (typeof (global as any).SVGElement !== 'undefined') {
    (global as any).SVGElement.prototype.setAttribute = function() {}
  }
  
  if (typeof (global as any).HTMLElement !== 'undefined') {
    (global as any).HTMLElement.prototype.setAttribute = function() {}
  }
  
  if (typeof (global as any).Element !== 'undefined') {
    (global as any).Element.prototype.setAttribute = function() {}
  }
  
  // Add isSVGElement polyfill for framer-motion
  (global as any).isSVGElement = function(element: any) {
    return false
  }
}
