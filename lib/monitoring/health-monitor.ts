/**
 * Health Monitoring System
 * Real-time system health monitoring and alerting
 */

import { logger, createContext } from '@/lib/error/logger';
import { checkDatabaseHealth } from '@/lib/database/connection';

// ============================================================================
// HEALTH MONITOR
// ============================================================================

export interface HealthMetrics {
  timestamp: Date;
  database: {
    status: 'healthy' | 'unhealthy' | 'unknown';
    latency?: number;
    error?: string;
  };
  system: {
    status: 'healthy' | 'unhealthy';
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
    cpu: {
      usage: number;
    };
    uptime: number;
  };
  application: {
    status: 'healthy' | 'unhealthy';
    responseTime: number;
    errorRate: number;
    requestCount: number;
  };
}

export interface AlertConfig {
  memoryThreshold: number; // Percentage
  cpuThreshold: number; // Percentage
  responseTimeThreshold: number; // Milliseconds
  errorRateThreshold: number; // Percentage
  databaseLatencyThreshold: number; // Milliseconds
}

export class HealthMonitor {
  private static instance: HealthMonitor;
  private metrics: HealthMetrics[] = [];
  private maxMetricsHistory = 100;
  private alertConfig: AlertConfig;
  private alertCallbacks: ((alert: HealthAlert) => void)[] = [];

  constructor(config: AlertConfig) {
    this.alertConfig = config;
  }

  public static getInstance(config?: AlertConfig): HealthMonitor {
    if (!HealthMonitor.instance) {
      HealthMonitor.instance = new HealthMonitor(
        config || {
          memoryThreshold: 80,
          cpuThreshold: 80,
          responseTimeThreshold: 1000,
          errorRateThreshold: 5,
          databaseLatencyThreshold: 500,
        }
      );
    }
    return HealthMonitor.instance;
  }

  // ============================================================================
  // METRICS COLLECTION
  // ============================================================================

  public async collectMetrics(): Promise<HealthMetrics> {
    const startTime = Date.now();
    
    try {
      // Check database health
      const dbHealth = await checkDatabaseHealth();
      
      // Get system metrics
      const memoryUsage = process.memoryUsage();
      const systemUptime = process.uptime();
      
      // Calculate memory percentage
      const memoryPercentage = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
      
      // Get CPU usage (simplified)
      const cpuUsage = await this.getCpuUsage();
      
      // Calculate application metrics
      const responseTime = Date.now() - startTime;
      const errorRate = this.calculateErrorRate();
      const requestCount = this.getRequestCount();

      const metrics: HealthMetrics = {
        timestamp: new Date(),
        database: {
          status: dbHealth.isHealthy ? 'healthy' : 'unhealthy',
          latency: dbHealth.latency,
          error: dbHealth.error,
        },
        system: {
          status: memoryPercentage < this.alertConfig.memoryThreshold ? 'healthy' : 'unhealthy',
          memory: {
            used: memoryUsage.heapUsed,
            total: memoryUsage.heapTotal,
            percentage: memoryPercentage,
          },
          cpu: {
            usage: cpuUsage,
          },
          uptime: systemUptime,
        },
        application: {
          status: this.determineApplicationStatus(responseTime, errorRate),
          responseTime,
          errorRate,
          requestCount,
        },
      };

      // Store metrics
      this.metrics.push(metrics);
      if (this.metrics.length > this.maxMetricsHistory) {
        this.metrics.shift();
      }

      // Check for alerts
      await this.checkAlerts(metrics);

      return metrics;
    } catch (error) {
      const context = createContext();
      await logger.error(
        'Failed to collect health metrics',
        context,
        error as Error
      );

      // Return unhealthy metrics
      return {
        timestamp: new Date(),
        database: { status: 'unknown' },
        system: { status: 'unhealthy', memory: { used: 0, total: 0, percentage: 0 }, cpu: { usage: 0 }, uptime: 0 },
        application: { status: 'unhealthy', responseTime: 0, errorRate: 100, requestCount: 0 },
      };
    }
  }

  private async getCpuUsage(): Promise<number> {
    const startUsage = process.cpuUsage();
    const startTime = Date.now();
    
    // Wait a bit to measure CPU usage
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const endUsage = process.cpuUsage(startUsage);
    const endTime = Date.now();
    
    const cpuTime = (endUsage.user + endUsage.system) / 1000; // Convert to milliseconds
    const totalTime = endTime - startTime;
    
    return (cpuTime / totalTime) * 100;
  }

  private calculateErrorRate(): number {
    if (this.metrics.length < 2) return 0;
    
    const recentMetrics = this.metrics.slice(-10); // Last 10 metrics
    const errorCount = recentMetrics.filter(m => 
      m.database.status === 'unhealthy' || 
      m.system.status === 'unhealthy' || 
      m.application.status === 'unhealthy'
    ).length;
    
    return (errorCount / recentMetrics.length) * 100;
  }

  private getRequestCount(): number {
    // This would be implemented with actual request tracking
    // For now, return a placeholder
    return this.metrics.length;
  }

  private determineApplicationStatus(responseTime: number, errorRate: number): 'healthy' | 'unhealthy' {
    if (responseTime > this.alertConfig.responseTimeThreshold || 
        errorRate > this.alertConfig.errorRateThreshold) {
      return 'unhealthy';
    }
    return 'healthy';
  }

  // ============================================================================
  // ALERTING
  // ============================================================================

  private async checkAlerts(metrics: HealthMetrics) {
    const alerts: HealthAlert[] = [];

    // Memory alert
    if (metrics.system.memory.percentage > this.alertConfig.memoryThreshold) {
      alerts.push({
        type: 'MEMORY_HIGH',
        severity: 'WARNING',
        message: `Memory usage is ${metrics.system.memory.percentage.toFixed(1)}%`,
        threshold: this.alertConfig.memoryThreshold,
        current: metrics.system.memory.percentage,
        timestamp: metrics.timestamp,
      });
    }

    // CPU alert
    if (metrics.system.cpu.usage > this.alertConfig.cpuThreshold) {
      alerts.push({
        type: 'CPU_HIGH',
        severity: 'WARNING',
        message: `CPU usage is ${metrics.system.cpu.usage.toFixed(1)}%`,
        threshold: this.alertConfig.cpuThreshold,
        current: metrics.system.cpu.usage,
        timestamp: metrics.timestamp,
      });
    }

    // Database latency alert
    if (metrics.database.latency && metrics.database.latency > this.alertConfig.databaseLatencyThreshold) {
      alerts.push({
        type: 'DATABASE_SLOW',
        severity: 'WARNING',
        message: `Database latency is ${metrics.database.latency}ms`,
        threshold: this.alertConfig.databaseLatencyThreshold,
        current: metrics.database.latency,
        timestamp: metrics.timestamp,
      });
    }

    // Database unhealthy alert
    if (metrics.database.status === 'unhealthy') {
      alerts.push({
        type: 'DATABASE_UNHEALTHY',
        severity: 'CRITICAL',
        message: 'Database is unhealthy',
        threshold: 0,
        current: 1,
        timestamp: metrics.timestamp,
      });
    }

    // Response time alert
    if (metrics.application.responseTime > this.alertConfig.responseTimeThreshold) {
      alerts.push({
        type: 'RESPONSE_TIME_HIGH',
        severity: 'WARNING',
        message: `Response time is ${metrics.application.responseTime}ms`,
        threshold: this.alertConfig.responseTimeThreshold,
        current: metrics.application.responseTime,
        timestamp: metrics.timestamp,
      });
    }

    // Error rate alert
    if (metrics.application.errorRate > this.alertConfig.errorRateThreshold) {
      alerts.push({
        type: 'ERROR_RATE_HIGH',
        severity: 'CRITICAL',
        message: `Error rate is ${metrics.application.errorRate.toFixed(1)}%`,
        threshold: this.alertConfig.errorRateThreshold,
        current: metrics.application.errorRate,
        timestamp: metrics.timestamp,
      });
    }

    // Send alerts
    for (const alert of alerts) {
      await this.sendAlert(alert);
    }
  }

  private async sendAlert(alert: HealthAlert) {
    const context = createContext();
    
    // Log the alert
    await logger.warn(
      `Health Alert: ${alert.type} - ${alert.message}`,
      context,
      { alert }
    );

    // Call registered alert callbacks
    for (const callback of this.alertCallbacks) {
      try {
        callback(alert);
      } catch (error) {
        await logger.error(
          'Alert callback failed',
          context,
          error as Error,
          { alert }
        );
      }
    }
  }

  // ============================================================================
  // PUBLIC METHODS
  // ============================================================================

  public getMetrics(): HealthMetrics[] {
    return [...this.metrics];
  }

  public getLatestMetrics(): HealthMetrics | null {
    return this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null;
  }

  public getMetricsSummary(): {
    totalMetrics: number;
    averageResponseTime: number;
    averageErrorRate: number;
    uptime: number;
  } {
    if (this.metrics.length === 0) {
      return {
        totalMetrics: 0,
        averageResponseTime: 0,
        averageErrorRate: 0,
        uptime: 0,
      };
    }

    const totalResponseTime = this.metrics.reduce((sum, m) => sum + m.application.responseTime, 0);
    const totalErrorRate = this.metrics.reduce((sum, m) => sum + m.application.errorRate, 0);
    const latestUptime = this.metrics[this.metrics.length - 1].system.uptime;

    return {
      totalMetrics: this.metrics.length,
      averageResponseTime: totalResponseTime / this.metrics.length,
      averageErrorRate: totalErrorRate / this.metrics.length,
      uptime: latestUptime,
    };
  }

  public addAlertCallback(callback: (alert: HealthAlert) => void) {
    this.alertCallbacks.push(callback);
  }

  public removeAlertCallback(callback: (alert: HealthAlert) => void) {
    const index = this.alertCallbacks.indexOf(callback);
    if (index > -1) {
      this.alertCallbacks.splice(index, 1);
    }
  }

  public updateAlertConfig(config: Partial<AlertConfig>) {
    this.alertConfig = { ...this.alertConfig, ...config };
  }
}

// ============================================================================
// HEALTH ALERT TYPES
// ============================================================================

export interface HealthAlert {
  type: 'MEMORY_HIGH' | 'CPU_HIGH' | 'DATABASE_SLOW' | 'DATABASE_UNHEALTHY' | 'RESPONSE_TIME_HIGH' | 'ERROR_RATE_HIGH';
  severity: 'WARNING' | 'CRITICAL';
  message: string;
  threshold: number;
  current: number;
  timestamp: Date;
}

// ============================================================================
// HEALTH MONITOR INSTANCE
// ============================================================================

export const healthMonitor = HealthMonitor.getInstance();

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

export async function collectHealthMetrics(): Promise<HealthMetrics> {
  return healthMonitor.collectMetrics();
}

export function getHealthMetrics(): HealthMetrics[] {
  return healthMonitor.getMetrics();
}

export function getLatestHealthMetrics(): HealthMetrics | null {
  return healthMonitor.getLatestMetrics();
}

export function addHealthAlertCallback(callback: (alert: HealthAlert) => void) {
  healthMonitor.addAlertCallback(callback);
}
