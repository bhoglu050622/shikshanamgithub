/**
 * Centralized Error Service
 * Comprehensive error handling, classification, and recovery
 */

import { 
  ErrorType, 
  ErrorSeverity, 
  ErrorCategory, 
  ErrorDetails, 
  ErrorContext, 
  ErrorResponse,
  RetryConfig,
  CircuitBreakerConfig
} from './types';
import { logger, createContext } from './logger';

// ============================================================================
// ERROR SERVICE
// ============================================================================

export class ErrorService {
  private retryConfigs: Map<ErrorType, RetryConfig> = new Map();
  private circuitBreakers: Map<string, CircuitBreakerState> = new Map();

  constructor() {
    this.initializeRetryConfigs();
  }

  private initializeRetryConfigs() {
    // Network errors - retry with exponential backoff
    this.retryConfigs.set(ErrorType.NETWORK_ERROR, {
      maxAttempts: 3,
      baseDelay: 1000,
      maxDelay: 10000,
      backoffMultiplier: 2,
      retryableErrors: [ErrorType.NETWORK_ERROR, ErrorType.TIMEOUT_ERROR],
    });

    // Database errors - retry with longer delays
    this.retryConfigs.set(ErrorType.DATABASE_ERROR, {
      maxAttempts: 2,
      baseDelay: 2000,
      maxDelay: 15000,
      backoffMultiplier: 2,
      retryableErrors: [ErrorType.DATABASE_ERROR, ErrorType.SERVICE_UNAVAILABLE],
    });

    // External API errors - retry with circuit breaker
    this.retryConfigs.set(ErrorType.EXTERNAL_API_ERROR, {
      maxAttempts: 3,
      baseDelay: 1000,
      maxDelay: 8000,
      backoffMultiplier: 2,
      retryableErrors: [ErrorType.EXTERNAL_API_ERROR, ErrorType.THIRD_PARTY_ERROR],
    });
  }

  // ============================================================================
  // ERROR CREATION AND CLASSIFICATION
  // ============================================================================

  public createError(
    type: ErrorType,
    message: string,
    context: ErrorContext,
    originalError?: Error,
    metadata?: any
  ): ErrorDetails {
    const severity = this.determineSeverity(type);
    const category = this.determineCategory(type);
    const retryable = this.isRetryable(type);

    return {
      type,
      severity,
      category,
      message,
      context,
      metadata,
      originalError,
      retryable,
      userMessage: this.generateUserMessage(type, message),
      recoveryActions: this.generateRecoveryActions(type),
    };
  }

  private determineSeverity(type: ErrorType): ErrorSeverity {
    const severityMap: Record<ErrorType, ErrorSeverity> = {
      [ErrorType.VALIDATION_ERROR]: ErrorSeverity.LOW,
      [ErrorType.AUTHENTICATION_ERROR]: ErrorSeverity.MEDIUM,
      [ErrorType.AUTHORIZATION_ERROR]: ErrorSeverity.MEDIUM,
      [ErrorType.NOT_FOUND_ERROR]: ErrorSeverity.LOW,
      [ErrorType.CONFLICT_ERROR]: ErrorSeverity.MEDIUM,
      [ErrorType.RATE_LIMIT_ERROR]: ErrorSeverity.MEDIUM,
      [ErrorType.INTERNAL_SERVER_ERROR]: ErrorSeverity.HIGH,
      [ErrorType.DATABASE_ERROR]: ErrorSeverity.HIGH,
      [ErrorType.EXTERNAL_API_ERROR]: ErrorSeverity.MEDIUM,
      [ErrorType.SERVICE_UNAVAILABLE]: ErrorSeverity.HIGH,
      [ErrorType.NETWORK_ERROR]: ErrorSeverity.MEDIUM,
      [ErrorType.TIMEOUT_ERROR]: ErrorSeverity.MEDIUM,
      [ErrorType.CONNECTION_ERROR]: ErrorSeverity.MEDIUM,
      [ErrorType.BUSINESS_LOGIC_ERROR]: ErrorSeverity.MEDIUM,
      [ErrorType.INSUFFICIENT_PERMISSIONS]: ErrorSeverity.MEDIUM,
      [ErrorType.RESOURCE_EXHAUSTED]: ErrorSeverity.HIGH,
      [ErrorType.THIRD_PARTY_ERROR]: ErrorSeverity.MEDIUM,
      [ErrorType.PAYMENT_ERROR]: ErrorSeverity.HIGH,
      [ErrorType.EMAIL_ERROR]: ErrorSeverity.LOW,
    };

    return severityMap[type] || ErrorSeverity.MEDIUM;
  }

  private determineCategory(type: ErrorType): ErrorCategory {
    const categoryMap: Record<ErrorType, ErrorCategory> = {
      [ErrorType.VALIDATION_ERROR]: ErrorCategory.USER_INPUT,
      [ErrorType.AUTHENTICATION_ERROR]: ErrorCategory.AUTHENTICATION,
      [ErrorType.AUTHORIZATION_ERROR]: ErrorCategory.AUTHORIZATION,
      [ErrorType.NOT_FOUND_ERROR]: ErrorCategory.USER_INPUT,
      [ErrorType.CONFLICT_ERROR]: ErrorCategory.BUSINESS_LOGIC,
      [ErrorType.RATE_LIMIT_ERROR]: ErrorCategory.SYSTEM,
      [ErrorType.INTERNAL_SERVER_ERROR]: ErrorCategory.SYSTEM,
      [ErrorType.DATABASE_ERROR]: ErrorCategory.DATABASE,
      [ErrorType.EXTERNAL_API_ERROR]: ErrorCategory.EXTERNAL_SERVICE,
      [ErrorType.SERVICE_UNAVAILABLE]: ErrorCategory.SYSTEM,
      [ErrorType.NETWORK_ERROR]: ErrorCategory.NETWORK,
      [ErrorType.TIMEOUT_ERROR]: ErrorCategory.NETWORK,
      [ErrorType.CONNECTION_ERROR]: ErrorCategory.NETWORK,
      [ErrorType.BUSINESS_LOGIC_ERROR]: ErrorCategory.BUSINESS_LOGIC,
      [ErrorType.INSUFFICIENT_PERMISSIONS]: ErrorCategory.AUTHORIZATION,
      [ErrorType.RESOURCE_EXHAUSTED]: ErrorCategory.SYSTEM,
      [ErrorType.THIRD_PARTY_ERROR]: ErrorCategory.EXTERNAL_SERVICE,
      [ErrorType.PAYMENT_ERROR]: ErrorCategory.EXTERNAL_SERVICE,
      [ErrorType.EMAIL_ERROR]: ErrorCategory.EXTERNAL_SERVICE,
    };

    return categoryMap[type] || ErrorCategory.SYSTEM;
  }

  private isRetryable(type: ErrorType): boolean {
    const retryableErrors = [
      ErrorType.NETWORK_ERROR,
      ErrorType.TIMEOUT_ERROR,
      ErrorType.CONNECTION_ERROR,
      ErrorType.DATABASE_ERROR,
      ErrorType.EXTERNAL_API_ERROR,
      ErrorType.SERVICE_UNAVAILABLE,
      ErrorType.THIRD_PARTY_ERROR,
    ];

    return retryableErrors.includes(type);
  }

  private generateUserMessage(type: ErrorType, message: string): string {
    const userMessages: Record<ErrorType, string> = {
      [ErrorType.VALIDATION_ERROR]: 'Please check your input and try again.',
      [ErrorType.AUTHENTICATION_ERROR]: 'Please log in to continue.',
      [ErrorType.AUTHORIZATION_ERROR]: 'You do not have permission to perform this action.',
      [ErrorType.NOT_FOUND_ERROR]: 'The requested resource was not found.',
      [ErrorType.CONFLICT_ERROR]: 'This action conflicts with existing data.',
      [ErrorType.RATE_LIMIT_ERROR]: 'Too many requests. Please try again later.',
      [ErrorType.INTERNAL_SERVER_ERROR]: 'Something went wrong. Please try again.',
      [ErrorType.DATABASE_ERROR]: 'A database error occurred. Please try again.',
      [ErrorType.EXTERNAL_API_ERROR]: 'External service is temporarily unavailable.',
      [ErrorType.SERVICE_UNAVAILABLE]: 'Service is temporarily unavailable.',
      [ErrorType.NETWORK_ERROR]: 'Network connection issue. Please check your connection.',
      [ErrorType.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
      [ErrorType.CONNECTION_ERROR]: 'Connection failed. Please try again.',
      [ErrorType.BUSINESS_LOGIC_ERROR]: 'Invalid operation. Please check your request.',
      [ErrorType.INSUFFICIENT_PERMISSIONS]: 'Insufficient permissions for this action.',
      [ErrorType.RESOURCE_EXHAUSTED]: 'System resources are temporarily unavailable.',
      [ErrorType.THIRD_PARTY_ERROR]: 'External service error. Please try again later.',
      [ErrorType.PAYMENT_ERROR]: 'Payment processing error. Please try again.',
      [ErrorType.EMAIL_ERROR]: 'Email service error. Please try again later.',
    };

    return userMessages[type] || 'An unexpected error occurred. Please try again.';
  }

  private generateRecoveryActions(type: ErrorType): string[] {
    const recoveryActions: Record<ErrorType, string[]> = {
      [ErrorType.VALIDATION_ERROR]: ['Check input format', 'Verify required fields'],
      [ErrorType.AUTHENTICATION_ERROR]: ['Log in again', 'Reset password'],
      [ErrorType.AUTHORIZATION_ERROR]: ['Contact administrator', 'Check permissions'],
      [ErrorType.NOT_FOUND_ERROR]: ['Verify URL', 'Check resource exists'],
      [ErrorType.CONFLICT_ERROR]: ['Refresh page', 'Try different values'],
      [ErrorType.RATE_LIMIT_ERROR]: ['Wait and retry', 'Reduce request frequency'],
      [ErrorType.INTERNAL_SERVER_ERROR]: ['Try again later', 'Contact support'],
      [ErrorType.DATABASE_ERROR]: ['Try again', 'Contact support'],
      [ErrorType.EXTERNAL_API_ERROR]: ['Try again later', 'Check service status'],
      [ErrorType.SERVICE_UNAVAILABLE]: ['Try again later', 'Check system status'],
      [ErrorType.NETWORK_ERROR]: ['Check internet connection', 'Try again'],
      [ErrorType.TIMEOUT_ERROR]: ['Try again', 'Check connection speed'],
      [ErrorType.CONNECTION_ERROR]: ['Check connection', 'Try again'],
      [ErrorType.BUSINESS_LOGIC_ERROR]: ['Review request', 'Contact support'],
      [ErrorType.INSUFFICIENT_PERMISSIONS]: ['Request access', 'Contact administrator'],
      [ErrorType.RESOURCE_EXHAUSTED]: ['Try again later', 'Contact support'],
      [ErrorType.THIRD_PARTY_ERROR]: ['Try again later', 'Check service status'],
      [ErrorType.PAYMENT_ERROR]: ['Try again', 'Check payment method'],
      [ErrorType.EMAIL_ERROR]: ['Try again later', 'Check email address'],
    };

    return recoveryActions[type] || ['Try again', 'Contact support'];
  }

  // ============================================================================
  // ERROR HANDLING AND LOGGING
  // ============================================================================

  public async handleError(
    error: ErrorDetails,
    additionalContext?: any
  ): Promise<ErrorResponse> {
    // Log the error
    await this.logError(error, additionalContext);

    // Create error response
    const response: ErrorResponse = {
      success: false,
      error: {
        type: error.type,
        message: error.message,
        code: error.code,
        userMessage: error.userMessage,
        recoveryActions: error.recoveryActions,
        requestId: error.context.requestId || 'unknown',
        timestamp: error.context.timestamp.toISOString(),
      },
    };

    return response;
  }

  private async logError(error: ErrorDetails, additionalContext?: any) {
    const logContext = createContext(
      error.context.userId,
      error.context.sessionId,
      error.context.requestId,
      {
        ...error.context,
        ...additionalContext,
      }
    );

    await logger.error(
      `Error: ${error.type} - ${error.message}`,
      logContext,
      error.originalError,
      {
        ...error.metadata,
        severity: error.severity,
        category: error.category,
        retryable: error.retryable,
      }
    );
  }

  // ============================================================================
  // RETRY LOGIC
  // ============================================================================

  public async withRetry<T>(
    operation: () => Promise<T>,
    errorType: ErrorType,
    context: ErrorContext
  ): Promise<T> {
    const config = this.retryConfigs.get(errorType);
    if (!config) {
      return operation();
    }

    let lastError: Error | null = null;
    let delay = config.baseDelay;

    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === config.maxAttempts) {
          break;
        }

        // Check if error is retryable
        const errorDetails = this.createError(
          errorType,
          lastError.message,
          context,
          lastError
        );

        if (!errorDetails.retryable) {
          break;
        }

        // Wait before retry
        await this.delay(delay);
        delay = Math.min(delay * config.backoffMultiplier, config.maxDelay);
      }
    }

    throw lastError;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ============================================================================
  // CIRCUIT BREAKER
  // ============================================================================

  public async withCircuitBreaker<T>(
    operation: () => Promise<T>,
    serviceName: string,
    context: ErrorContext
  ): Promise<T> {
    const breaker = this.getCircuitBreaker(serviceName);
    
    if (breaker.state === 'OPEN') {
      if (Date.now() - breaker.lastFailureTime > breaker.recoveryTimeout) {
        breaker.state = 'HALF_OPEN';
      } else {
        throw new Error(`Circuit breaker is OPEN for service: ${serviceName}`);
      }
    }

    try {
      const result = await operation();
      
      if (breaker.state === 'HALF_OPEN') {
        breaker.state = 'CLOSED';
        breaker.failureCount = 0;
      }
      
      return result;
    } catch (error) {
      breaker.failureCount++;
      breaker.lastFailureTime = Date.now();
      
      if (breaker.failureCount >= breaker.failureThreshold) {
        breaker.state = 'OPEN';
      }
      
      throw error;
    }
  }

  private getCircuitBreaker(serviceName: string): CircuitBreakerState {
    if (!this.circuitBreakers.has(serviceName)) {
      this.circuitBreakers.set(serviceName, {
        state: 'CLOSED',
        failureCount: 0,
        lastFailureTime: 0,
        failureThreshold: 5,
        recoveryTimeout: 60000, // 1 minute
      });
    }
    
    return this.circuitBreakers.get(serviceName)!;
  }
}

// ============================================================================
// CIRCUIT BREAKER STATE
// ============================================================================

interface CircuitBreakerState {
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  failureCount: number;
  lastFailureTime: number;
  failureThreshold: number;
  recoveryTimeout: number;
}

// ============================================================================
// ERROR SERVICE INSTANCE
// ============================================================================

export const errorService = new ErrorService();

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

export function createError(
  type: ErrorType,
  message: string,
  context: ErrorContext,
  originalError?: Error,
  metadata?: any
): ErrorDetails {
  return errorService.createError(type, message, context, originalError, metadata);
}

export function handleError(
  error: ErrorDetails,
  additionalContext?: any
): Promise<ErrorResponse> {
  return errorService.handleError(error, additionalContext);
}

export function withRetry<T>(
  operation: () => Promise<T>,
  errorType: ErrorType,
  context: ErrorContext
): Promise<T> {
  return errorService.withRetry(operation, errorType, context);
}

export function withCircuitBreaker<T>(
  operation: () => Promise<T>,
  serviceName: string,
  context: ErrorContext
): Promise<T> {
  return errorService.withCircuitBreaker(operation, serviceName, context);
}
