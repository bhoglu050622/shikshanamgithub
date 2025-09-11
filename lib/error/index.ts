/**
 * Error Handling Barrel Export
 * Centralized exports for all error handling utilities
 */

// Types and interfaces
export * from './types';

// Core error handling
export * from './error-service';
export * from './logger';

// React error boundaries
export * from './error-boundary';

// API error handling
export * from './api-error-handler';

// Re-export commonly used items
export { 
  errorService, 
  createError, 
  handleError, 
  withRetry, 
  withCircuitBreaker 
} from './error-service';

export { 
  logger, 
  createContext, 
  logError, 
  logWarning, 
  logInfo, 
  logDebug, 
  logPerformance 
} from './logger';

export { 
  ErrorBoundary, 
  ErrorBoundaryProvider, 
  AsyncErrorBoundary, 
  useErrorBoundary 
} from './error-boundary';

export { 
  apiErrorHandler, 
  handleApiError, 
  handleValidationError, 
  handleAuthenticationError, 
  handleAuthorizationError, 
  handleNotFoundError, 
  handleRateLimitError, 
  handleInternalServerError, 
  withErrorHandling 
} from './api-error-handler';
