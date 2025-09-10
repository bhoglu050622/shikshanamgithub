// Jest setup file
import '@testing-library/jest-dom';
import React from 'react';

// Mock functions
const mockFn = () => (() => {});
const mockAsyncFn = () => (() => Promise.resolve());
const mockFetchFn = () => (() => Promise.resolve(new Response()));

// Safe jest mock function
const createMockFn = () => {
  if (typeof (globalThis as any).jest !== 'undefined') {
    return (globalThis as any).jest.fn();
  }
  return () => {};
};
if (typeof (globalThis as any).jest !== 'undefined') {
  (globalThis as any).jest.mock('next/navigation', () => ({
    useRouter: () => ({
      push: mockFn(),
      replace: mockFn(),
      prefetch: mockFn(),
      back: mockFn(),
      forward: mockFn(),
      refresh: mockFn(),
    }),
    useSearchParams: () => ({
      get: mockFn(),
    }),
    usePathname: () => '/',
  }));

  // Mock Next.js image
  (globalThis as any).jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return React.createElement('img', props);
    },
  }));

  // Mock fetch
  global.fetch = mockFetchFn();
}

// Mock window.matchMedia
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: mockFn(), // deprecated
      removeListener: mockFn(), // deprecated
      addEventListener: mockFn(),
      removeEventListener: mockFn(),
      dispatchEvent: mockFn(),
    }),
  });
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];
  
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() { return []; }
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock localStorage
const localStorageMock = {
  getItem: () => null,
  setItem: mockFn(),
  removeItem: mockFn(),
  clear: mockFn(),
  length: 0,
  key: () => null,
};
global.localStorage = localStorageMock as unknown as Storage;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: () => null,
  setItem: mockFn(),
  removeItem: mockFn(),
  clear: mockFn(),
  length: 0,
  key: () => null,
};
global.sessionStorage = sessionStorageMock as unknown as Storage;

// Mock crypto for JWT
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'mock-uuid',
    getRandomValues: (arr: any) => arr.map(() => Math.floor(Math.random() * 256)),
  },
});

// Mock environment variables
if (typeof process !== 'undefined' && process.env) {
  (process.env as any).NODE_ENV = 'test';
  (process.env as any).NEXTAUTH_SECRET = 'test-secret';
  (process.env as any).NEXTAUTH_URL = 'http://localhost:3000';
}
