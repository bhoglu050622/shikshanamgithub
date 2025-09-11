/**
 * Error Types and Interfaces
 * Comprehensive error classification and handling types
 */

// ============================================================================
// ERROR CLASSIFICATION
// ============================================================================

export enum ErrorType {
  // Client Errors (4xx)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  CONFLICT_ERROR = 'CONFLICT_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  
  // Server Errors (5xx)
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  
  // Network Errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  
  // Business Logic Errors
  BUSINESS_LOGIC_ERROR = 'BUSINESS_LOGIC_ERROR',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  RESOURCE_EXHAUSTED = 'RESOURCE_EXHAUSTED',
  
  // Third-party Errors
  THIRD_PARTY_ERROR = 'THIRD_PARTY_ERROR',
  PAYMENT_ERROR = 'PAYMENT_ERROR',
  EMAIL_ERROR = 'EMAIL_ERROR',
}

export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum ErrorCategory {
  USER_INPUT = 'USER_INPUT',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  DATABASE = 'DATABASE',
  NETWORK = 'NETWORK',
  EXTERNAL_SERVICE = 'EXTERNAL_SERVICE',
  BUSINESS_LOGIC = 'BUSINESS_LOGIC',
  SYSTEM = 'SYSTEM',
}

// ============================================================================
// ERROR INTERFACES
// ============================================================================

export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  userAgent?: string;
  ipAddress?: string;
  url?: string;
  method?: string;
  timestamp: Date;
  environment: string;
  version: string;
}

export interface ErrorMetadata {
  component?: string;
  function?: string;
  line?: number;
  column?: number;
  stack?: string;
  additionalData?: Record<string, any>;
}

export interface ErrorDetails {
  type: ErrorType;
  severity: ErrorSeverity;
  category: ErrorCategory;
  message: string;
  code?: string;
  context: ErrorContext;
  metadata?: ErrorMetadata;
  originalError?: Error;
  retryable?: boolean;
  userMessage?: string;
  recoveryActions?: string[];
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context: ErrorContext;
  metadata?: ErrorMetadata;
  error?: ErrorDetails;
  performance?: PerformanceMetrics;
}

export interface PerformanceMetrics {
  duration?: number;
  memoryUsage?: NodeJS.MemoryUsage;
  cpuUsage?: NodeJS.CpuUsage;
  responseTime?: number;
  requestSize?: number;
  responseSize?: number;
}

// ============================================================================
// LOGGING LEVELS
// ============================================================================

export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

// ============================================================================
// ERROR RECOVERY
// ============================================================================

export interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableErrors: ErrorType[];
}

export interface CircuitBreakerConfig {
  failureThreshold: number;
  recoveryTimeout: number;
  monitoringPeriod: number;
}

// ============================================================================
// ERROR RESPONSE
// ============================================================================

export interface ErrorResponse {
  success: false;
  error: {
    type: ErrorType;
    message: string;
    code?: string;
    userMessage?: string;
    recoveryActions?: string[];
    requestId: string;
    timestamp: string;
  };
}

export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  requestId: string;
  timestamp: string;
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;

// ============================================================================
// ERROR BOUNDARY PROPS
// ============================================================================

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorBoundaryState>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  errorId?: string;
}

// ============================================================================
// LOGGING CONFIGURATION
// ============================================================================

export interface LoggingConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableFile: boolean;
  enableRemote: boolean;
  filePath?: string;
  remoteEndpoint?: string;
  maxFileSize?: number;
  maxFiles?: number;
  enablePerformanceLogging: boolean;
  enableErrorTracking: boolean;
}

// ============================================================================
// MONITORING CONFIGURATION
// ============================================================================

export interface MonitoringConfig {
  enableHealthChecks: boolean;
  healthCheckInterval: number;
  enableMetrics: boolean;
  metricsInterval: number;
  enableAlerts: boolean;
  alertThresholds: {
    errorRate: number;
    responseTime: number;
    memoryUsage: number;
    cpuUsage: number;
  };
}
