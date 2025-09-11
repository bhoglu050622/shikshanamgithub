/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@testing/(.*)$': '<rootDir>/__tests__/utils/$1',
  },
  testMatch: [
    '**/__tests__/**/*.(test|spec).(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)',
  ],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/e2e/**',
    '!**/*.config.js',
    '!**/*.config.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    // Higher thresholds for critical areas
    './lib/error/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    './lib/database/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
    './components/accessibility/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'json',
  ],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json',
      useESM: false,
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/',
  ],
  // Test timeout for integration tests
  testTimeout: 10000,
  // Parallel test execution
  maxWorkers: '50%',
  // Verbose output for debugging
  verbose: true,
  // Clear mocks between tests
  clearMocks: true,
  // Restore mocks after each test
  restoreMocks: true,
  // Setup files for different test types
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/__tests__/unit/**/*.(test|spec).(ts|tsx)'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/__tests__/integration/**/*.(test|spec).(ts|tsx)'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.integration.ts'],
      testEnvironment: 'node',
    },
    {
      displayName: 'components',
      testMatch: ['<rootDir>/__tests__/components/**/*.(test|spec).(ts|tsx)'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.components.ts'],
    },
  ],
};

module.exports = config;
