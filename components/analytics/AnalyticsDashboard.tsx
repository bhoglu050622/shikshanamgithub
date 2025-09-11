/**
 * Analytics Dashboard Component
 * Comprehensive analytics dashboard for monitoring and business intelligence
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  MousePointer,
  AlertTriangle,
  Clock,
  Target,
  Activity
} from 'lucide-react';
import { useAnalytics } from '@/lib/analytics';

// ============================================================================
// ANALYTICS DASHBOARD COMPONENT
// ============================================================================

interface AnalyticsDashboardProps {
  className?: string;
  showRealTime?: boolean;
  refreshInterval?: number;
}

export function AnalyticsDashboard({ 
  className = '', 
  showRealTime = true,
  refreshInterval = 30000 
}: AnalyticsDashboardProps) {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { getSessionId, getUserId } = useAnalytics();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAnalyticsMetrics();
        setMetrics(data);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to fetch analytics metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();

    if (showRealTime) {
      const interval = setInterval(fetchMetrics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [showRealTime, refreshInterval]);

  if (isLoading) {
    return (
      <div className={`analytics-dashboard ${className}`}>
        <div className="dashboard-loading">
          <div className="loading-spinner" />
          <p>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className={`analytics-dashboard ${className}`}>
        <div className="dashboard-error">
          <AlertTriangle size={48} className="error-icon" />
          <p>Failed to load analytics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`analytics-dashboard ${className}`}>
      <div className="dashboard-header">
        <h2 className="dashboard-title">Analytics Dashboard</h2>
        <div className="dashboard-info">
          <span className="last-updated">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          {showRealTime && (
            <span className="real-time-indicator">
              <Activity size={16} />
              Real-time
            </span>
          )}
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Key Metrics */}
        <div className="metrics-grid">
          <MetricCard
            title="Total Users"
            value={metrics.users.total}
            change={metrics.users.change}
            icon={<Users size={24} />}
            color="blue"
          />
          <MetricCard
            title="Revenue"
            value={`$${metrics.revenue.total.toLocaleString()}`}
            change={metrics.revenue.change}
            icon={<DollarSign size={24} />}
            color="green"
          />
          <MetricCard
            title="Page Views"
            value={metrics.engagement.pageViews.toLocaleString()}
            change={metrics.engagement.pageViewsChange}
            icon={<Eye size={24} />}
            color="purple"
          />
          <MetricCard
            title="Conversions"
            value={metrics.conversions.total.toLocaleString()}
            change={metrics.conversions.change}
            icon={<Target size={24} />}
            color="orange"
          />
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <ChartCard
            title="User Growth"
            data={metrics.charts.userGrowth}
            type="line"
            icon={<TrendingUp size={20} />}
          />
          <ChartCard
            title="Revenue Trends"
            data={metrics.charts.revenueTrends}
            type="bar"
            icon={<BarChart3 size={20} />}
          />
          <ChartCard
            title="Top Pages"
            data={metrics.charts.topPages}
            type="table"
            icon={<MousePointer size={20} />}
          />
          <ChartCard
            title="Conversion Funnel"
            data={metrics.charts.conversionFunnel}
            type="funnel"
            icon={<Target size={20} />}
          />
        </div>

        {/* Real-time Activity */}
        {showRealTime && (
          <div className="realtime-section">
            <h3 className="section-title">Real-time Activity</h3>
            <RealtimeActivity data={metrics.realtime} />
          </div>
        )}

        {/* Performance Metrics */}
        <div className="performance-section">
          <h3 className="section-title">Performance Metrics</h3>
          <PerformanceMetrics data={metrics.performance} />
        </div>

        {/* Error Tracking */}
        <div className="errors-section">
          <h3 className="section-title">Error Tracking</h3>
          <ErrorTracking data={metrics.errors} />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// METRIC CARD COMPONENT
// ============================================================================

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

function MetricCard({ title, value, change, icon, color }: MetricCardProps) {
  const changeColor = change && change >= 0 ? 'text-green-600' : 'text-red-600';
  const changeIcon = change && change >= 0 ? '↗' : '↘';

  return (
    <div className={`metric-card metric-card-${color}`}>
      <div className="metric-header">
        <div className="metric-icon">{icon}</div>
        <div className="metric-title">{title}</div>
      </div>
      <div className="metric-value">{value}</div>
      {change !== undefined && (
        <div className={`metric-change ${changeColor}`}>
          {changeIcon} {Math.abs(change)}%
        </div>
      )}
    </div>
  );
}

// ============================================================================
// CHART CARD COMPONENT
// ============================================================================

interface ChartCardProps {
  title: string;
  data: any;
  type: 'line' | 'bar' | 'pie' | 'table' | 'funnel';
  icon: React.ReactNode;
}

function ChartCard({ title, data, type, icon }: ChartCardProps) {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-icon">{icon}</div>
        <div className="chart-title">{title}</div>
      </div>
      <div className="chart-content">
        {type === 'table' ? (
          <TableChart data={data} />
        ) : type === 'funnel' ? (
          <FunnelChart data={data} />
        ) : (
          <div className="chart-placeholder">
            <p>{type} chart visualization</p>
            <small>Data points: {data?.length || 0}</small>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// TABLE CHART COMPONENT
// ============================================================================

interface TableChartProps {
  data: Array<{ label: string; value: number; change?: number }>;
}

function TableChart({ data }: TableChartProps) {
  return (
    <div className="table-chart">
      <table className="chart-table">
        <thead>
          <tr>
            <th>Page</th>
            <th>Views</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="table-label">{item.label}</td>
              <td className="table-value">{item.value.toLocaleString()}</td>
              <td className={`table-change ${item.change && item.change >= 0 ? 'positive' : 'negative'}`}>
                {item.change && item.change >= 0 ? '↗' : '↘'} {item.change ? Math.abs(item.change) : 0}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// FUNNEL CHART COMPONENT
// ============================================================================

interface FunnelChartProps {
  data: Array<{ step: string; users: number; conversion: number }>;
}

function FunnelChart({ data }: FunnelChartProps) {
  const maxUsers = Math.max(...data.map(item => item.users));

  return (
    <div className="funnel-chart">
      {data.map((item, index) => (
        <div key={index} className="funnel-step">
          <div className="funnel-step-header">
            <span className="step-name">{item.step}</span>
            <span className="step-users">{item.users.toLocaleString()}</span>
          </div>
          <div className="funnel-bar">
            <div 
              className="funnel-fill"
              style={{ 
                width: `${(item.users / maxUsers) * 100}%`,
                backgroundColor: `hsl(${200 - index * 30}, 70%, 50%)`
              }}
            />
          </div>
          <div className="funnel-conversion">
            {item.conversion}% conversion
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// REALTIME ACTIVITY COMPONENT
// ============================================================================

interface RealtimeActivityProps {
  data: {
    activeUsers: number;
    currentPageViews: number;
    recentEvents: Array<{
      type: string;
      user: string;
      action: string;
      timestamp: number;
    }>;
  };
}

function RealtimeActivity({ data }: RealtimeActivityProps) {
  return (
    <div className="realtime-activity">
      <div className="realtime-metrics">
        <div className="realtime-metric">
          <span className="metric-label">Active Users</span>
          <span className="metric-value">{data.activeUsers}</span>
        </div>
        <div className="realtime-metric">
          <span className="metric-label">Page Views (5min)</span>
          <span className="metric-value">{data.currentPageViews}</span>
        </div>
      </div>
      
      <div className="recent-events">
        <h4>Recent Events</h4>
        <div className="events-list">
          {data.recentEvents.map((event, index) => (
            <div key={index} className="event-item">
              <div className="event-time">
                {new Date(event.timestamp).toLocaleTimeString()}
              </div>
              <div className="event-details">
                <span className="event-user">{event.user}</span>
                <span className="event-action">{event.action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PERFORMANCE METRICS COMPONENT
// ============================================================================

interface PerformanceMetricsProps {
  data: {
    averageLoadTime: number;
    coreWebVitals: {
      lcp: number;
      fid: number;
      cls: number;
    };
    errorRate: number;
    uptime: number;
  };
}

function PerformanceMetrics({ data }: PerformanceMetricsProps) {
  const getVitalStatus = (value: number, threshold: number) => {
    if (value <= threshold) return 'good';
    if (value <= threshold * 1.5) return 'needs-improvement';
    return 'poor';
  };

  return (
    <div className="performance-metrics">
      <div className="performance-grid">
        <div className="performance-metric">
          <div className="metric-label">Average Load Time</div>
          <div className="metric-value">{data.averageLoadTime}ms</div>
        </div>
        <div className="performance-metric">
          <div className="metric-label">Error Rate</div>
          <div className="metric-value">{data.errorRate}%</div>
        </div>
        <div className="performance-metric">
          <div className="metric-label">Uptime</div>
          <div className="metric-value">{data.uptime}%</div>
        </div>
      </div>
      
      <div className="web-vitals">
        <h4>Core Web Vitals</h4>
        <div className="vitals-grid">
          <div className={`vital-metric ${getVitalStatus(data.coreWebVitals.lcp, 2500)}`}>
            <div className="vital-label">LCP</div>
            <div className="vital-value">{data.coreWebVitals.lcp}ms</div>
          </div>
          <div className={`vital-metric ${getVitalStatus(data.coreWebVitals.fid, 100)}`}>
            <div className="vital-label">FID</div>
            <div className="vital-value">{data.coreWebVitals.fid}ms</div>
          </div>
          <div className={`vital-metric ${getVitalStatus(data.coreWebVitals.cls, 0.1)}`}>
            <div className="vital-label">CLS</div>
            <div className="vital-value">{data.coreWebVitals.cls}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ERROR TRACKING COMPONENT
// ============================================================================

interface ErrorTrackingProps {
  data: {
    totalErrors: number;
    errorRate: number;
    topErrors: Array<{
      message: string;
      count: number;
      severity: string;
    }>;
  };
}

function ErrorTracking({ data }: ErrorTrackingProps) {
  return (
    <div className="error-tracking">
      <div className="error-summary">
        <div className="error-metric">
          <div className="metric-label">Total Errors</div>
          <div className="metric-value">{data.totalErrors}</div>
        </div>
        <div className="error-metric">
          <div className="metric-label">Error Rate</div>
          <div className="metric-value">{data.errorRate}%</div>
        </div>
      </div>
      
      <div className="top-errors">
        <h4>Top Errors</h4>
        <div className="errors-list">
          {data.topErrors.map((error, index) => (
            <div key={index} className="error-item">
              <div className="error-message">{error.message}</div>
              <div className="error-count">{error.count}</div>
              <div className={`error-severity ${error.severity}`}>
                {error.severity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

async function fetchAnalyticsMetrics(): Promise<DashboardMetrics> {
  // In a real implementation, this would fetch from your analytics API
  return {
    users: {
      total: 12543,
      change: 12.5,
    },
    revenue: {
      total: 45678,
      change: 8.3,
    },
    engagement: {
      pageViews: 234567,
      pageViewsChange: 15.2,
    },
    conversions: {
      total: 1234,
      change: 5.7,
    },
    charts: {
      userGrowth: [],
      revenueTrends: [],
      topPages: [
        { label: '/courses', value: 1234, change: 12 },
        { label: '/about', value: 567, change: -5 },
        { label: '/contact', value: 234, change: 8 },
      ],
      conversionFunnel: [
        { step: 'Page View', users: 10000, conversion: 100 },
        { step: 'Course View', users: 2500, conversion: 25 },
        { step: 'Enrollment', users: 500, conversion: 5 },
        { step: 'Completion', users: 250, conversion: 2.5 },
      ],
    },
    realtime: {
      activeUsers: 45,
      currentPageViews: 123,
      recentEvents: [
        { type: 'page_view', user: 'User123', action: 'Viewed Course', timestamp: Date.now() - 1000 },
        { type: 'click', user: 'User456', action: 'Clicked Enroll', timestamp: Date.now() - 2000 },
        { type: 'conversion', user: 'User789', action: 'Completed Lesson', timestamp: Date.now() - 3000 },
      ],
    },
    performance: {
      averageLoadTime: 1250,
      coreWebVitals: {
        lcp: 2100,
        fid: 85,
        cls: 0.05,
      },
      errorRate: 0.5,
      uptime: 99.9,
    },
    errors: {
      totalErrors: 23,
      errorRate: 0.5,
      topErrors: [
        { message: 'Network timeout', count: 8, severity: 'medium' },
        { message: 'Validation error', count: 5, severity: 'low' },
        { message: 'Authentication failed', count: 3, severity: 'high' },
      ],
    },
  };
}

// ============================================================================
// TYPES
// ============================================================================

interface DashboardMetrics {
  users: { total: number; change: number };
  revenue: { total: number; change: number };
  engagement: { pageViews: number; pageViewsChange: number };
  conversions: { total: number; change: number };
  charts: {
    userGrowth: any[];
    revenueTrends: any[];
    topPages: Array<{ label: string; value: number; change: number }>;
    conversionFunnel: Array<{ step: string; users: number; conversion: number }>;
  };
  realtime: {
    activeUsers: number;
    currentPageViews: number;
    recentEvents: Array<{
      type: string;
      user: string;
      action: string;
      timestamp: number;
    }>;
  };
  performance: {
    averageLoadTime: number;
    coreWebVitals: { lcp: number; fid: number; cls: number };
    errorRate: number;
    uptime: number;
  };
  errors: {
    totalErrors: number;
    errorRate: number;
    topErrors: Array<{ message: string; count: number; severity: string }>;
  };
}
