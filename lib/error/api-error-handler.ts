/**
 * API Error Handler Middleware
 * Centralized error handling for API routes with proper HTTP status codes
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  ErrorType, 
  ErrorDetails, 
  ErrorResponse,
  ErrorContext 
} from './types';
import { errorService, createError } from './error-service';
import { createContext, logger } from './logger';

// ============================================================================
// API ERROR HANDLER
// ============================================================================

export class ApiErrorHandler {
  private static instance: ApiErrorHandler;

  public static getInstance(): ApiErrorHandler {
    if (!ApiErrorHandler.instance) {
      ApiErrorHandler.instance = new ApiErrorHandler();
    }
    return ApiErrorHandler.instance;
  }

  // ============================================================================
  // ERROR HANDLING METHODS
  // ============================================================================

  public async handleError(
    error: Error,
    request: NextRequest,
    additionalContext?: any
  ): Promise<NextResponse<ErrorResponse>> {
    const errorDetails = this.classifyError(error, request, additionalContext);
    const errorResponse = await errorService.handleError(errorDetails, additionalContext);
    
    return NextResponse.json(errorResponse, {
      status: this.getHttpStatus(errorDetails.type),
      headers: {
        'Content-Type': 'application/json',
        'X-Error-Type': errorDetails.type,
        'X-Error-ID': errorDetails.context.requestId || 'unknown',
      },
    });
  }

  public async handleValidationError(
    message: string,
    request: NextRequest,
    validationErrors?: any
  ): Promise<NextResponse<ErrorResponse>> {
    const context = this.createRequestContext(request);
    const errorDetails = createError(
      ErrorType.VALIDATION_ERROR,
      message,
      context,
      undefined,
      { validationErrors }
    );

    const errorResponse = await errorService.handleError(errorDetails);
    
    return NextResponse.json(errorResponse, {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'X-Error-Type': ErrorType.VALIDATION_ERROR,
        'X-Error-ID': context.requestId || 'unknown',
      },
    });
  }

  public async handleAuthenticationError(
    message: string,
    request: NextRequest
  ): Promise<NextResponse<ErrorResponse>> {
    const context = this.createRequestContext(request);
    const errorDetails = createError(
      ErrorType.AUTHENTICATION_ERROR,
      message,
      context
    );

    const errorResponse = await errorService.handleError(errorDetails);
    
    return NextResponse.json(errorResponse, {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'X-Error-Type': ErrorType.AUTHENTICATION_ERROR,
        'X-Error-ID': context.requestId || 'unknown',
      },
    });
  }

  public async handleAuthorizationError(
    message: string,
    request: NextRequest
  ): Promise<NextResponse<ErrorResponse>> {
    const context = this.createRequestContext(request);
    const errorDetails = createError(
      ErrorType.AUTHORIZATION_ERROR,
      message,
      context
    );

    const errorResponse = await errorService.handleError(errorDetails);
    
    return NextResponse.json(errorResponse, {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
        'X-Error-Type': ErrorType.AUTHORIZATION_ERROR,
        'X-Error-ID': context.requestId || 'unknown',
      },
    });
  }

  public async handleNotFoundError(
    message: string,
    request: NextRequest
  ): Promise<NextResponse<ErrorResponse>> {
    const context = this.createRequestContext(request);
    const errorDetails = createError(
      ErrorType.NOT_FOUND_ERROR,
      message,
      context
    );

    const errorResponse = await errorService.handleError(errorDetails);
    
    return NextResponse.json(errorResponse, {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'X-Error-Type': ErrorType.NOT_FOUND_ERROR,
        'X-Error-ID': context.requestId || 'unknown',
      },
    });
  }

  public async handleRateLimitError(
    message: string,
    request: NextRequest
  ): Promise<NextResponse<ErrorResponse>> {
    const context = this.createRequestContext(request);
    const errorDetails = createError(
      ErrorType.RATE_LIMIT_ERROR,
      message,
      context
    );

    const errorResponse = await errorService.handleError(errorDetails);
    
    return NextResponse.json(errorResponse, {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'X-Error-Type': ErrorType.RATE_LIMIT_ERROR,
        'X-Error-ID': context.requestId || 'unknown',
        'Retry-After': '60', // 1 minute
      },
    });
  }

  public async handleInternalServerError(
    error: Error,
    request: NextRequest
  ): Promise<NextResponse<ErrorResponse>> {
    const context = this.createRequestContext(request);
    const errorDetails = createError(
      ErrorType.INTERNAL_SERVER_ERROR,
      'Internal server error',
      context,
      error
    );

    const errorResponse = await errorService.handleError(errorDetails);
    
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'X-Error-Type': ErrorType.INTERNAL_SERVER_ERROR,
        'X-Error-ID': context.requestId || 'unknown',
      },
    });
  }

  // ============================================================================
  // ERROR CLASSIFICATION
  // ============================================================================

  private classifyError(
    error: Error,
    request: NextRequest,
    additionalContext?: any
  ): ErrorDetails {
    const context = this.createRequestContext(request, additionalContext);
    
    // Classify error based on error type and message
    let errorType = ErrorType.INTERNAL_SERVER_ERROR;
    
    if (error.name === 'ValidationError') {
      errorType = ErrorType.VALIDATION_ERROR;
    } else if (error.name === 'AuthenticationError') {
      errorType = ErrorType.AUTHENTICATION_ERROR;
    } else if (error.name === 'AuthorizationError') {
      errorType = ErrorType.AUTHORIZATION_ERROR;
    } else if (error.name === 'NotFoundError') {
      errorType = ErrorType.NOT_FOUND_ERROR;
    } else if (error.name === 'ConflictError') {
      errorType = ErrorType.CONFLICT_ERROR;
    } else if (error.name === 'RateLimitError') {
      errorType = ErrorType.RATE_LIMIT_ERROR;
    } else if (error.name === 'DatabaseError') {
      errorType = ErrorType.DATABASE_ERROR;
    } else if (error.name === 'ExternalApiError') {
      errorType = ErrorType.EXTERNAL_API_ERROR;
    } else if (error.name === 'NetworkError') {
      errorType = ErrorType.NETWORK_ERROR;
    } else if (error.name === 'TimeoutError') {
      errorType = ErrorType.TIMEOUT_ERROR;
    } else if (error.name === 'BusinessLogicError') {
      errorType = ErrorType.BUSINESS_LOGIC_ERROR;
    }

    return createError(errorType, error.message, context, error, additionalContext);
  }

  private createRequestContext(
    request: NextRequest,
    additionalContext?: any
  ): ErrorContext {
    const requestId = request.headers.get('x-request-id') || 
                     request.headers.get('x-correlation-id') || 
                     this.generateRequestId();
    
    return createContext(
      request.headers.get('x-user-id') || undefined,
      request.headers.get('x-session-id') || undefined,
      requestId,
      {
        userAgent: request.headers.get('user-agent') || undefined,
        ipAddress: this.getClientIP(request),
        url: request.url,
        method: request.method,
        ...additionalContext,
      }
    );
  }

  private getClientIP(request: NextRequest): string | undefined {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const clientIP = request.headers.get('x-client-ip');
    
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    return realIP || clientIP || undefined;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getHttpStatus(errorType: ErrorType): number {
    const statusMap: Record<ErrorType, number> = {
      [ErrorType.VALIDATION_ERROR]: 400,
      [ErrorType.AUTHENTICATION_ERROR]: 401,
      [ErrorType.AUTHORIZATION_ERROR]: 403,
      [ErrorType.NOT_FOUND_ERROR]: 404,
      [ErrorType.CONFLICT_ERROR]: 409,
      [ErrorType.RATE_LIMIT_ERROR]: 429,
      [ErrorType.INTERNAL_SERVER_ERROR]: 500,
      [ErrorType.DATABASE_ERROR]: 500,
      [ErrorType.EXTERNAL_API_ERROR]: 502,
      [ErrorType.SERVICE_UNAVAILABLE]: 503,
      [ErrorType.NETWORK_ERROR]: 502,
      [ErrorType.TIMEOUT_ERROR]: 504,
      [ErrorType.CONNECTION_ERROR]: 502,
      [ErrorType.BUSINESS_LOGIC_ERROR]: 400,
      [ErrorType.INSUFFICIENT_PERMISSIONS]: 403,
      [ErrorType.RESOURCE_EXHAUSTED]: 503,
      [ErrorType.THIRD_PARTY_ERROR]: 502,
      [ErrorType.PAYMENT_ERROR]: 402,
      [ErrorType.EMAIL_ERROR]: 502,
    };

    return statusMap[errorType] || 500;
  }
}

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

export const apiErrorHandler = ApiErrorHandler.getInstance();

export async function handleApiError(
  error: Error,
  request: NextRequest,
  additionalContext?: any
): Promise<NextResponse<ErrorResponse>> {
  return apiErrorHandler.handleError(error, request, additionalContext);
}

export async function handleValidationError(
  message: string,
  request: NextRequest,
  validationErrors?: any
): Promise<NextResponse<ErrorResponse>> {
  return apiErrorHandler.handleValidationError(message, request, validationErrors);
}

export async function handleAuthenticationError(
  message: string,
  request: NextRequest
): Promise<NextResponse<ErrorResponse>> {
  return apiErrorHandler.handleAuthenticationError(message, request);
}

export async function handleAuthorizationError(
  message: string,
  request: NextRequest
): Promise<NextResponse<ErrorResponse>> {
  return apiErrorHandler.handleAuthorizationError(message, request);
}

export async function handleNotFoundError(
  message: string,
  request: NextRequest
): Promise<NextResponse<ErrorResponse>> {
  return apiErrorHandler.handleNotFoundError(message, request);
}

export async function handleRateLimitError(
  message: string,
  request: NextRequest
): Promise<NextResponse<ErrorResponse>> {
  return apiErrorHandler.handleRateLimitError(message, request);
}

export async function handleInternalServerError(
  error: Error,
  request: NextRequest
): Promise<NextResponse<ErrorResponse>> {
  return apiErrorHandler.handleInternalServerError(error, request);
}

// ============================================================================
// API WRAPPER FUNCTION
// ============================================================================

export function withErrorHandling<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      const request = args[0] as NextRequest;
      return handleApiError(error as Error, request);
    }
  };
}
