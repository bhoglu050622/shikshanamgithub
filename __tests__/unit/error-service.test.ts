/**
 * Error Service Unit Tests
 * Comprehensive testing for error handling and classification
 */

import { 
  ErrorService, 
  createError, 
  handleError, 
  withRetry, 
  withCircuitBreaker 
} from '@/lib/error/error-service';
import { 
  ErrorType, 
  ErrorSeverity, 
  ErrorCategory, 
  ErrorContext 
} from '@/lib/error/types';
import { createContext } from '@/lib/error/logger';

// Mock the logger
jest.mock('@/lib/error/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
  createContext: jest.fn(() => ({
    userId: 'test-user',
    sessionId: 'test-session',
    requestId: 'test-request',
    timestamp: new Date(),
    environment: 'test',
    version: '1.0.0',
  })),
}));

describe('ErrorService', () => {
  let errorService: ErrorService;
  let mockContext: ErrorContext;

  beforeEach(() => {
    errorService = new ErrorService();
    mockContext = createContext('test-user', 'test-session', 'test-request');
    jest.clearAllMocks();
  });

  describe('Error Creation and Classification', () => {
    it('should create error with correct type and severity', () => {
      const error = errorService.createError(
        ErrorType.VALIDATION_ERROR,
        'Invalid input',
        mockContext
      );

      expect(error.type).toBe(ErrorType.VALIDATION_ERROR);
      expect(error.severity).toBe(ErrorSeverity.LOW);
      expect(error.category).toBe(ErrorCategory.USER_INPUT);
      expect(error.message).toBe('Invalid input');
      expect(error.context).toBe(mockContext);
      expect(error.retryable).toBe(false);
    });

    it('should classify database errors correctly', () => {
      const error = errorService.createError(
        ErrorType.DATABASE_ERROR,
        'Connection failed',
        mockContext
      );

      expect(error.type).toBe(ErrorType.DATABASE_ERROR);
      expect(error.severity).toBe(ErrorSeverity.HIGH);
      expect(error.category).toBe(ErrorCategory.DATABASE);
      expect(error.retryable).toBe(true);
    });

    it('should classify network errors correctly', () => {
      const error = errorService.createError(
        ErrorType.NETWORK_ERROR,
        'Request timeout',
        mockContext
      );

      expect(error.type).toBe(ErrorType.NETWORK_ERROR);
      expect(error.severity).toBe(ErrorSeverity.MEDIUM);
      expect(error.category).toBe(ErrorCategory.NETWORK);
      expect(error.retryable).toBe(true);
    });

    it('should include original error when provided', () => {
      const originalError = new Error('Original error');
      const error = errorService.createError(
        ErrorType.INTERNAL_SERVER_ERROR,
        'Something went wrong',
        mockContext,
        originalError
      );

      expect(error.originalError).toBe(originalError);
    });

    it('should generate user-friendly messages', () => {
      const error = errorService.createError(
        ErrorType.AUTHENTICATION_ERROR,
        'Invalid credentials',
        mockContext
      );

      expect(error.userMessage).toBe('Please log in to continue.');
      expect(error.recoveryActions).toContain('Log in again');
      expect(error.recoveryActions).toContain('Reset password');
    });
  });

  describe('Error Handling', () => {
    it('should handle error and return proper response', async () => {
      const error = errorService.createError(
        ErrorType.VALIDATION_ERROR,
        'Invalid input',
        mockContext
      );

      const response = await errorService.handleError(error);

      expect(response.success).toBe(false);
      expect(response.error.type).toBe(ErrorType.VALIDATION_ERROR);
      expect(response.error.message).toBe('Invalid input');
      expect(response.error.userMessage).toBe('Please check your input and try again.');
      expect(response.error.requestId).toBe(mockContext.requestId);
    });

    it('should log error when handling', async () => {
      const { logger } = require('@/lib/error/logger');
      const error = errorService.createError(
        ErrorType.INTERNAL_SERVER_ERROR,
        'Server error',
        mockContext
      );

      await errorService.handleError(error);

      expect(logger.error).toHaveBeenCalledWith(
        'Error: INTERNAL_SERVER_ERROR - Server error',
        expect.any(Object),
        undefined,
        expect.objectContaining({
          severity: ErrorSeverity.HIGH,
          category: ErrorCategory.SYSTEM,
        })
      );
    });
  });

  describe('Retry Logic', () => {
    it('should retry operation on retryable errors', async () => {
      let attemptCount = 0;
      const operation = jest.fn().mockImplementation(() => {
        attemptCount++;
        if (attemptCount < 3) {
          throw new Error('Network error');
        }
        return 'success';
      });

      const result = await errorService.withRetry(
        operation,
        ErrorType.NETWORK_ERROR,
        mockContext
      );

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it('should not retry on non-retryable errors', async () => {
      const operation = jest.fn().mockImplementation(() => {
        throw new Error('Validation error');
      });

      await expect(
        errorService.withRetry(operation, ErrorType.VALIDATION_ERROR, mockContext)
      ).rejects.toThrow('Validation error');

      expect(operation).toHaveBeenCalledTimes(1);
    });

    it('should respect max attempts limit', async () => {
      const operation = jest.fn().mockImplementation(() => {
        throw new Error('Network error');
      });

      await expect(
        errorService.withRetry(operation, ErrorType.NETWORK_ERROR, mockContext)
      ).rejects.toThrow('Network error');

      expect(operation).toHaveBeenCalledTimes(3); // Max attempts for network errors
    });

    it('should use exponential backoff', async () => {
      const startTime = Date.now();
      const operation = jest.fn().mockImplementation(() => {
        throw new Error('Network error');
      });

      try {
        await errorService.withRetry(operation, ErrorType.NETWORK_ERROR, mockContext);
      } catch (error) {
        // Expected to fail after max attempts
      }

      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should have taken some time due to backoff delays
      expect(duration).toBeGreaterThan(1000); // At least 1 second of delays
    });
  });

  describe('Circuit Breaker', () => {
    it('should allow requests when circuit is closed', async () => {
      const operation = jest.fn().mockResolvedValue('success');

      const result = await errorService.withCircuitBreaker(
        operation,
        'test-service',
        mockContext
      );

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it('should open circuit after failure threshold', async () => {
      const operation = jest.fn().mockRejectedValue(new Error('Service error'));

      // Trigger failures to open circuit
      for (let i = 0; i < 5; i++) {
        try {
          await errorService.withCircuitBreaker(operation, 'test-service', mockContext);
        } catch (error) {
          // Expected to fail
        }
      }

      // Circuit should now be open
      await expect(
        errorService.withCircuitBreaker(operation, 'test-service', mockContext)
      ).rejects.toThrow('Circuit breaker is OPEN for service: test-service');

      expect(operation).toHaveBeenCalledTimes(5); // Only the initial failures
    });

    it('should allow requests when circuit is half-open', async () => {
      const operation = jest.fn().mockRejectedValue(new Error('Service error'));

      // Open the circuit
      for (let i = 0; i < 5; i++) {
        try {
          await errorService.withCircuitBreaker(operation, 'test-service', mockContext);
        } catch (error) {
          // Expected to fail
        }
      }

      // Wait for recovery timeout (mocked to be immediate for testing)
      const successfulOperation = jest.fn().mockResolvedValue('success');
      
      // Mock the circuit breaker to be in half-open state
      const circuitBreaker = (errorService as any).getCircuitBreaker('test-service');
      circuitBreaker.state = 'HALF_OPEN';

      const result = await errorService.withCircuitBreaker(
        successfulOperation,
        'test-service',
        mockContext
      );

      expect(result).toBe('success');
      expect(circuitBreaker.state).toBe('CLOSED');
    });
  });
});

describe('Convenience Functions', () => {
  let mockContext: ErrorContext;

  beforeEach(() => {
    mockContext = createContext('test-user', 'test-session', 'test-request');
    jest.clearAllMocks();
  });

  describe('createError', () => {
    it('should create error using service', () => {
      const error = createError(
        ErrorType.VALIDATION_ERROR,
        'Test error',
        mockContext
      );

      expect(error.type).toBe(ErrorType.VALIDATION_ERROR);
      expect(error.message).toBe('Test error');
      expect(error.context).toBe(mockContext);
    });
  });

  describe('handleError', () => {
    it('should handle error using service', async () => {
      const error = createError(
        ErrorType.VALIDATION_ERROR,
        'Test error',
        mockContext
      );

      const response = await handleError(error);

      expect(response.success).toBe(false);
      expect(response.error.type).toBe(ErrorType.VALIDATION_ERROR);
    });
  });

  describe('withRetry', () => {
    it('should retry operation using service', async () => {
      let attemptCount = 0;
      const operation = jest.fn().mockImplementation(() => {
        attemptCount++;
        if (attemptCount < 2) {
          throw new Error('Network error');
        }
        return 'success';
      });

      const result = await withRetry(operation, ErrorType.NETWORK_ERROR, mockContext);

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });
  });

  describe('withCircuitBreaker', () => {
    it('should use circuit breaker via service', async () => {
      const operation = jest.fn().mockResolvedValue('success');

      const result = await withCircuitBreaker(operation, 'test-service', mockContext);

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(1);
    });
  });
});
