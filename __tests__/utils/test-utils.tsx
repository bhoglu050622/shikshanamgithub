/**
 * Testing Utilities
 * Comprehensive testing helpers and utilities for all test types
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/lib/auth-context';
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider';

// ============================================================================
// CUSTOM RENDER FUNCTION
// ============================================================================

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: 'light' | 'dark' | 'system';
  user?: any;
  accessibility?: boolean;
}

const AllTheProviders = ({ 
  children, 
  theme = 'light',
  user = null,
  accessibility = true 
}: { 
  children: React.ReactNode;
  theme?: 'light' | 'dark' | 'system';
  user?: any;
  accessibility?: boolean;
}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    let content = children;

    if (accessibility) {
      content = (
        <AccessibilityProvider>
          {content}
        </AccessibilityProvider>
      );
    }

    content = (
      <AuthProvider>
        {content}
      </AuthProvider>
    );

    content = (
      <ThemeProvider
        attribute="class"
        defaultTheme={theme}
        enableSystem={false}
        disableTransitionOnChange
      >
        {content}
      </ThemeProvider>
    );

    return <>{content}</>;
  };

  return <Wrapper>{children}</Wrapper>;
};

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
): RenderResult => {
  const { theme, user, accessibility, ...renderOptions } = options;
  
  return render(ui, {
    wrapper: (props) => (
      <AllTheProviders 
        theme={theme} 
        user={user} 
        accessibility={accessibility}
        {...props} 
      />
    ),
    ...renderOptions,
  });
};

// ============================================================================
// MOCK DATA FACTORIES
// ============================================================================

export const createMockUser = (overrides: Partial<any> = {}) => ({
  id: 'user_123',
  username: 'testuser',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'STUDENT',
  isActive: true,
  emailVerified: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  ...overrides,
});

export const createMockCourse = (overrides: Partial<any> = {}) => ({
  id: 'course_123',
  title: 'Test Course',
  slug: 'test-course',
  description: 'A test course for testing purposes',
  shortDescription: 'Test course',
  thumbnail: '/images/test-course.jpg',
  category: 'sanskrit',
  tags: ['test', 'sanskrit'],
  difficulty: 'BEGINNER',
  duration: 120,
  price: 99.99,
  currency: 'USD',
  status: 'PUBLISHED',
  isPublished: true,
  featured: false,
  publishedAt: new Date('2024-01-01'),
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  ...overrides,
});

export const createMockLesson = (overrides: Partial<any> = {}) => ({
  id: 'lesson_123',
  courseId: 'course_123',
  title: 'Test Lesson',
  slug: 'test-lesson',
  description: 'A test lesson',
  content: 'This is test lesson content',
  contentType: 'TEXT',
  duration: 30,
  order: 1,
  status: 'PUBLISHED',
  isPublished: true,
  publishedAt: new Date('2024-01-01'),
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  ...overrides,
});

export const createMockEnrollment = (overrides: Partial<any> = {}) => ({
  id: 'enrollment_123',
  userId: 'user_123',
  courseId: 'course_123',
  status: 'ACTIVE',
  enrolledAt: new Date('2024-01-01'),
  progress: 0,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  ...overrides,
});

// ============================================================================
// MOCK FUNCTIONS
// ============================================================================

export const createMockFetch = (response: any, status: number = 200) => {
  return jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn().mockResolvedValue(response),
    text: jest.fn().mockResolvedValue(JSON.stringify(response)),
  });
};

export const createMockRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
  route: '/',
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
});

export const createMockRequest = (overrides: Partial<Request> = {}) => ({
  url: 'http://localhost:3000/api/test',
  method: 'GET',
  headers: new Headers({
    'Content-Type': 'application/json',
    'User-Agent': 'test-agent',
  }),
  body: null,
  ...overrides,
});

// ============================================================================
// TEST HELPERS
// ============================================================================

export const waitFor = (ms: number) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const mockLocalStorage = () => {
  const store: Record<string, string> = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
  };
};

export const mockSessionStorage = () => {
  const store: Record<string, string> = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
  };
};

// ============================================================================
// ACCESSIBILITY TESTING
// ============================================================================

export const checkA11y = async (container: HTMLElement) => {
  // Basic accessibility checks
  const images = container.querySelectorAll('img');
  images.forEach(img => {
    expect(img).toHaveAttribute('alt');
  });

  const buttons = container.querySelectorAll('button');
  buttons.forEach(button => {
    expect(button).toHaveAttribute('type');
  });

  const links = container.querySelectorAll('a[href]');
  links.forEach(link => {
    expect(link).toHaveAttribute('href');
  });

  const formInputs = container.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
    const id = input.getAttribute('id');
    if (id) {
      const label = container.querySelector(`label[for="${id}"]`);
      expect(label).toBeInTheDocument();
    }
  });
};

// ============================================================================
// ERROR TESTING
// ============================================================================

export const expectError = (fn: () => void, expectedError?: string | RegExp) => {
  expect(fn).toThrow(expectedError);
};

export const expectAsyncError = async (
  fn: () => Promise<any>, 
  expectedError?: string | RegExp
) => {
  await expect(fn).rejects.toThrow(expectedError);
};

// ============================================================================
// PERFORMANCE TESTING
// ============================================================================

export const measurePerformance = async (fn: () => Promise<any>) => {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  
  return {
    result,
    duration: end - start,
  };
};

// ============================================================================
// DATABASE TESTING
// ============================================================================

export const createTestDatabase = () => {
  // Mock database for testing
  const data: Record<string, any[]> = {
    users: [],
    courses: [],
    lessons: [],
    enrollments: [],
  };

  return {
    create: jest.fn((table: string, record: any) => {
      if (!data[table]) data[table] = [];
      const newRecord = { id: `test_${Date.now()}`, ...record };
      data[table].push(newRecord);
      return Promise.resolve(newRecord);
    }),
    findUnique: jest.fn((table: string, where: any) => {
      if (!data[table]) return Promise.resolve(null);
      const record = data[table].find(item => 
        Object.keys(where).every(key => item[key] === where[key])
      );
      return Promise.resolve(record || null);
    }),
    findMany: jest.fn((table: string, options: any = {}) => {
      if (!data[table]) return Promise.resolve([]);
      let records = [...data[table]];
      
      if (options.where) {
        records = records.filter(item =>
          Object.keys(options.where).every(key => item[key] === options.where[key])
        );
      }
      
      if (options.orderBy) {
        const [key, direction] = Object.entries(options.orderBy)[0];
        records.sort((a, b) => {
          const aVal = a[key];
          const bVal = b[key];
          if (direction === 'desc') {
            return bVal > aVal ? 1 : -1;
          }
          return aVal > bVal ? 1 : -1;
        });
      }
      
      if (options.take) {
        records = records.slice(0, options.take);
      }
      
      return Promise.resolve(records);
    }),
    update: jest.fn((table: string, where: any, data: any) => {
      if (!data[table]) return Promise.resolve(null);
      const index = data[table].findIndex(item =>
        Object.keys(where).every(key => item[key] === where[key])
      );
      if (index === -1) return Promise.resolve(null);
      
      data[table][index] = { ...data[table][index], ...data };
      return Promise.resolve(data[table][index]);
    }),
    delete: jest.fn((table: string, where: any) => {
      if (!data[table]) return Promise.resolve(null);
      const index = data[table].findIndex(item =>
        Object.keys(where).every(key => item[key] === where[key])
      );
      if (index === -1) return Promise.resolve(null);
      
      const deleted = data[table][index];
      data[table].splice(index, 1);
      return Promise.resolve(deleted);
    }),
    count: jest.fn((table: string, where: any = {}) => {
      if (!data[table]) return Promise.resolve(0);
      if (Object.keys(where).length === 0) {
        return Promise.resolve(data[table].length);
      }
      
      const count = data[table].filter(item =>
        Object.keys(where).every(key => item[key] === where[key])
      ).length;
      
      return Promise.resolve(count);
    }),
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

export * from '@testing-library/react';
export { customRender as render };
export { default as userEvent } from '@testing-library/user-event';
