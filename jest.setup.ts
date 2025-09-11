// Jest setup file
import '@testing-library/jest-dom';
import React from 'react';

// Mock functions
const mockFn = () => (() => {});
const mockAsyncFn = () => (() => Promise.resolve());
const mockFetchFn = () => (() => Promise.resolve(new Response()));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock Next.js image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', props);
  },
}));

// Mock fetch
global.fetch = jest.fn(() => Promise.resolve(new Response()));

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
