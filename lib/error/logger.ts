/**
 * Centralized Logging Service
 * Structured logging with multiple outputs and performance monitoring
 */

import { LogLevel, LogEntry, ErrorContext, PerformanceMetrics, LoggingConfig } from './types';

// ============================================================================
// LOGGING SERVICE
// ============================================================================

export class Logger {
  private config: LoggingConfig;
  private logBuffer: LogEntry[] = [];
  private bufferSize = 100;
  private flushInterval: NodeJS.Timeout | null = null;

  constructor(config: LoggingConfig) {
    this.config = config;
    this.initializeLogger();
  }

  private initializeLogger() {
    // Set up log rotation and buffering
    if (this.config.enableFile) {
      this.setupLogRotation();
    }

    // Set up periodic flushing
    this.flushInterval = setInterval(() => {
      this.flushLogs();
    }, 5000); // Flush every 5 seconds

    // Handle process exit
    process.on('exit', () => this.flushLogs());
    process.on('SIGINT', () => this.flushLogs());
    process.on('SIGTERM', () => this.flushLogs());
  }

  private setupLogRotation() {
    // Log rotation logic would be implemented here
    // For now, we'll use a simple file-based approach
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context: ErrorContext,
    metadata?: any,
    error?: any,
    performance?: PerformanceMetrics
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date(),
      context,
      metadata,
      error,
      performance,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
    const currentLevelIndex = levels.indexOf(this.config.level);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex <= currentLevelIndex;
  }

  private formatLogEntry(entry: LogEntry): string {
    const logData = {
      timestamp: entry.timestamp.toISOString(),
      level: entry.level,
      message: entry.message,
      context: entry.context,
      metadata: entry.metadata,
      error: entry.error,
      performance: entry.performance,
    };

    return JSON.stringify(logData, null, 2);
  }

  private async writeToConsole(entry: LogEntry) {
    if (!this.config.enableConsole) return;

    const formatted = this.formatLogEntry(entry);
    const consoleMethod = entry.level === LogLevel.ERROR ? 'error' :
                         entry.level === LogLevel.WARN ? 'warn' :
                         entry.level === LogLevel.INFO ? 'info' : 'log';

    console[consoleMethod](formatted);
  }

  private async writeToFile(entry: LogEntry) {
    if (!this.config.enableFile || !this.config.filePath) return;

    try {
      const fs = await import('fs/promises');
      const formatted = this.formatLogEntry(entry) + '\n';
      await fs.appendFile(this.config.filePath, formatted);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  private async writeToRemote(entry: LogEntry) {
    if (!this.config.enableRemote || !this.config.remoteEndpoint) return;

    try {
      const response = await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        console.error('Failed to send log to remote endpoint:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to send log to remote endpoint:', error);
    }
  }

  private async writeLog(entry: LogEntry) {
    // Add to buffer
    this.logBuffer.push(entry);

    // Write to outputs
    await Promise.all([
      this.writeToConsole(entry),
      this.writeToFile(entry),
      this.writeToRemote(entry),
    ]);

    // Flush if buffer is full
    if (this.logBuffer.length >= this.bufferSize) {
      await this.flushLogs();
    }
  }

  private async flushLogs() {
    if (this.logBuffer.length === 0) return;

    const logs = [...this.logBuffer];
    this.logBuffer = [];

    // Batch write to file if enabled
    if (this.config.enableFile && this.config.filePath) {
      try {
        const fs = await import('fs/promises');
        const formatted = logs.map(log => this.formatLogEntry(log)).join('\n') + '\n';
        await fs.appendFile(this.config.filePath, formatted);
      } catch (error) {
        console.error('Failed to flush logs to file:', error);
      }
    }
  }

  // ============================================================================
  // PUBLIC LOGGING METHODS
  // ============================================================================

  public async error(
    message: string,
    context: ErrorContext,
    error?: any,
    metadata?: any
  ) {
    if (!this.shouldLog(LogLevel.ERROR)) return;

    const entry = this.createLogEntry(LogLevel.ERROR, message, context, metadata, error);
    await this.writeLog(entry);
  }

  public async warn(
    message: string,
    context: ErrorContext,
    metadata?: any
  ) {
    if (!this.shouldLog(LogLevel.WARN)) return;

    const entry = this.createLogEntry(LogLevel.WARN, message, context, metadata);
    await this.writeLog(entry);
  }

  public async info(
    message: string,
    context: ErrorContext,
    metadata?: any,
    performance?: PerformanceMetrics
  ) {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const entry = this.createLogEntry(LogLevel.INFO, message, context, metadata, undefined, performance);
    await this.writeLog(entry);
  }

  public async debug(
    message: string,
    context: ErrorContext,
    metadata?: any
  ) {
    if (!this.shouldLog(LogLevel.DEBUG)) return;

    const entry = this.createLogEntry(LogLevel.DEBUG, message, context, metadata);
    await this.writeLog(entry);
  }

  // ============================================================================
  // PERFORMANCE LOGGING
  // ============================================================================

  public async logPerformance(
    operation: string,
    duration: number,
    context: ErrorContext,
    metadata?: any
  ) {
    if (!this.config.enablePerformanceLogging) return;

    const performance: PerformanceMetrics = {
      duration,
      memoryUsage: process.memoryUsage(),
    };

    await this.info(
      `Performance: ${operation} completed in ${duration}ms`,
      context,
      metadata,
      performance
    );
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  public setLevel(level: LogLevel) {
    this.config.level = level;
  }

  public updateConfig(config: Partial<LoggingConfig>) {
    this.config = { ...this.config, ...config };
  }

  public async close() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    await this.flushLogs();
  }
}

// ============================================================================
// LOGGER INSTANCE
// ============================================================================

const defaultConfig: LoggingConfig = {
  level: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  enableConsole: true,
  enableFile: process.env.NODE_ENV === 'production',
  enableRemote: false,
  filePath: process.env.LOG_FILE_PATH || './logs/app.log',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  enablePerformanceLogging: true,
  enableErrorTracking: true,
};

export const logger = new Logger(defaultConfig);

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

export function createContext(
  userId?: string,
  sessionId?: string,
  requestId?: string,
  additionalData?: Partial<ErrorContext>
): ErrorContext {
  return {
    userId,
    sessionId,
    requestId,
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    ...additionalData,
  };
}

export function logError(
  message: string,
  error: Error,
  context: ErrorContext,
  metadata?: any
) {
  return logger.error(message, context, error, metadata);
}

export function logWarning(
  message: string,
  context: ErrorContext,
  metadata?: any
) {
  return logger.warn(message, context, metadata);
}

export function logInfo(
  message: string,
  context: ErrorContext,
  metadata?: any
) {
  return logger.info(message, context, metadata);
}

export function logDebug(
  message: string,
  context: ErrorContext,
  metadata?: any
) {
  return logger.debug(message, context, metadata);
}

export function logPerformance(
  operation: string,
  duration: number,
  context: ErrorContext,
  metadata?: any
) {
  return logger.logPerformance(operation, duration, context, metadata);
}
