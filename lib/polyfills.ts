// Polyfills for SSR compatibility
if (typeof window === 'undefined') {
  // Server-side polyfills for browser globals
  const globalObj = global as any;
  
  globalObj.SVGElement = function(...args: any[]) {
    return {}
  }
  
  globalObj.HTMLElement = function(...args: any[]) {
    return {}
  }
  
  globalObj.Element = function(...args: any[]) {
    return {}
  }
  
  globalObj.Node = function(...args: any[]) {
    return {}
  }
  
  globalObj.Document = function(...args: any[]) {
    return {}
  }
  
  globalObj.Window = function(...args: any[]) {
    return {}
  }
  
  // Add setAttribute polyfill
  if (typeof globalObj.SVGElement !== 'undefined') {
    globalObj.SVGElement.prototype.setAttribute = function() {}
  }
  
  if (typeof globalObj.HTMLElement !== 'undefined') {
    globalObj.HTMLElement.prototype.setAttribute = function() {}
  }
  
  if (typeof globalObj.Element !== 'undefined') {
    globalObj.Element.prototype.setAttribute = function() {}
  }
  
  // Add isSVGElement polyfill for framer-motion
  (global as any).isSVGElement = function(element: any) {
    return false
  }
}
