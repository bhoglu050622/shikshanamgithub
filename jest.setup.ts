// Jest setup file
import '@testing-library/jest-dom';
import React from 'react';

// Mock Next.js router
const mockFn = () => (() => {});
if (typeof jest !== 'undefined') {
  jest.mock('next/navigation', () => ({
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
  jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return React.createElement('img', props);
    },
  }));

  // Mock fetch
  global.fetch = mockFn();
}

// Mock window.matchMedia
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: mockFn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: mockFn(), // deprecated
      removeListener: mockFn(), // deprecated
      addEventListener: mockFn(),
      removeEventListener: mockFn(),
      dispatchEvent: mockFn(),
    })),
  });
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock localStorage
const localStorageMock = {
  getItem: mockFn(),
  setItem: mockFn(),
  removeItem: mockFn(),
  clear: mockFn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: mockFn(),
  setItem: mockFn(),
  removeItem: mockFn(),
  clear: mockFn(),
};
global.sessionStorage = sessionStorageMock;

// Mock crypto for JWT
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'mock-uuid',
    getRandomValues: (arr) => arr.map(() => Math.floor(Math.random() * 256)),
  },
});

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.NEXTAUTH_SECRET = 'test-secret';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
