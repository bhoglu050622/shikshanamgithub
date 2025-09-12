/**
 * Analytics Types and Interfaces
 * Comprehensive types for analytics, monitoring, and business intelligence
 */

// ============================================================================
// CORE ANALYTICS TYPES
// ============================================================================

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
  deviceInfo?: DeviceInfo;
  pageInfo?: PageInfo;
  userAgent?: string;
  ipAddress?: string;
  referrer?: string;
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  os: string;
  browser: string;
  version: string;
  screenResolution: string;
  language: string;
  timezone: string;
  userAgent: string;
}

export interface PageInfo {
  url: string;
  title: string;
  path: string;
  referrer: string;
  loadTime: number;
  viewport: {
    width: number;
    height: number;
  };
}

export interface UserInfo {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  subscription?: string;
  registrationDate?: string;
  lastActive?: string;
  preferences?: Record<string, any>;
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

export interface PerformanceMetrics {
  // Core Web Vitals
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  totalBlockingTime: number;
  speedIndex: number;
  
  // Additional Metrics
  domContentLoaded: number;
  loadComplete: number;
  timeToFirstByte: number;
  resourceLoadTime: number;
  imageLoadTime: number;
  scriptLoadTime: number;
  styleLoadTime: number;
  
  // Network Metrics
  networkLatency: number;
  bandwidth: number;
  connectionType: string;
  
  // Memory Metrics
  memoryUsage: number;
  memoryLimit: number;
  heapSize: number;
  
  // Custom Metrics
  customMetrics?: Record<string, number>;
}

export interface PerformanceThresholds {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}

// ============================================================================
// USER BEHAVIOR ANALYTICS
// ============================================================================

export interface UserSession {
  sessionId: string;
  userId?: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  pageViews: number;
  events: number;
  conversions: number;
  deviceInfo: DeviceInfo;
  location?: LocationInfo;
  referrer?: string;
  utmParams?: UTMParams;
  customProperties?: Record<string, any>;
}

export interface LocationInfo {
  country: string;
  region: string;
  city: string;
  latitude?: number;
  longitude?: number;
  timezone: string;
}

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface UserJourney {
  userId: string;
  sessions: UserSession[];
  totalSessions: number;
  totalDuration: number;
  totalPageViews: number;
  totalEvents: number;
  totalConversions: number;
  firstSession: number;
  lastSession: number;
  averageSessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  retentionRate: number;
}

// ============================================================================
// CONVERSION TRACKING
// ============================================================================

export interface ConversionGoal {
  id: string;
  name: string;
  type: 'page_view' | 'event' | 'duration' | 'custom';
  value: number;
  conditions: ConversionCondition[];
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ConversionCondition {
  type: 'url' | 'event' | 'property' | 'custom';
  operator: 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'regex';
  value: string;
  required: boolean;
}

export interface ConversionEvent {
  goalId: string;
  goalName: string;
  value: number;
  userId?: string;
  sessionId: string;
  timestamp: number;
  properties?: Record<string, any>;
  attribution?: AttributionData;
}

export interface AttributionData {
  source: string;
  medium: string;
  campaign?: string;
  term?: string;
  content?: string;
  firstTouch: number;
  lastTouch: number;
  touchpoints: AttributionTouchpoint[];
}

export interface AttributionTouchpoint {
  timestamp: number;
  source: string;
  medium: string;
  campaign?: string;
  value: number;
  type: 'first_touch' | 'last_touch' | 'linear' | 'time_decay';
}

// ============================================================================
// A/B TESTING
// ============================================================================

export interface ABTest {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'running' | 'paused' | 'completed' | 'cancelled';
  startDate: number;
  endDate?: number;
  variants: ABTestVariant[];
  trafficAllocation: number;
  targetAudience: TargetAudience;
  successMetrics: string[];
  minimumSampleSize: number;
  significanceLevel: number;
  createdAt: number;
  updatedAt: number;
}

export interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  trafficAllocation: number;
  configuration: Record<string, any>;
  isControl: boolean;
}

export interface TargetAudience {
  segments: AudienceSegment[];
  conditions: AudienceCondition[];
  percentage: number;
}

export interface AudienceSegment {
  type: 'user_property' | 'behavior' | 'geographic' | 'device' | 'custom';
  conditions: AudienceCondition[];
}

export interface AudienceCondition {
  property: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in';
  value: any;
}

export interface ABTestResult {
  testId: string;
  variantId: string;
  userId: string;
  sessionId: string;
  timestamp: number;
  conversions: number;
  revenue: number;
  customMetrics: Record<string, number>;
}

// ============================================================================
// COHORT ANALYSIS
// ============================================================================

export interface Cohort {
  id: string;
  name: string;
  definition: CohortDefinition;
  size: number;
  createdAt: number;
  lastUpdated: number;
}

export interface CohortDefinition {
  type: 'registration' | 'first_purchase' | 'first_session' | 'custom_event';
  eventName?: string;
  timeRange: {
    start: number;
    end: number;
  };
  conditions: CohortCondition[];
}

export interface CohortCondition {
  property: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
}

export interface CohortAnalysis {
  cohortId: string;
  cohortName: string;
  period: number;
  retention: CohortRetention[];
  revenue: CohortRevenue[];
  engagement: CohortEngagement[];
}

export interface CohortRetention {
  period: number;
  users: number;
  retentionRate: number;
  churnRate: number;
}

export interface CohortRevenue {
  period: number;
  revenue: number;
  averageRevenue: number;
  transactions: number;
}

export interface CohortEngagement {
  period: number;
  sessions: number;
  pageViews: number;
  events: number;
  averageSessionDuration: number;
}

// ============================================================================
// ERROR TRACKING
// ============================================================================

export interface ErrorEvent {
  id: string;
  type: 'javascript' | 'network' | 'server' | 'custom';
  message: string;
  stack?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  userId?: string;
  sessionId: string;
  timestamp: number;
  url: string;
  userAgent: string;
  deviceInfo: DeviceInfo;
  context: ErrorContext;
  resolved: boolean;
  resolvedAt?: number;
  resolvedBy?: string;
}

export interface ErrorContext {
  component?: string;
  action?: string;
  properties?: Record<string, any>;
  breadcrumbs?: ErrorBreadcrumb[];
  tags?: Record<string, string>;
}

export interface ErrorBreadcrumb {
  timestamp: number;
  type: 'navigation' | 'user' | 'http' | 'console' | 'custom';
  message: string;
  data?: Record<string, any>;
}

export interface ErrorAggregation {
  errorId: string;
  message: string;
  type: string;
  severity: string;
  count: number;
  firstSeen: number;
  lastSeen: number;
  affectedUsers: number;
  affectedSessions: number;
  resolved: boolean;
  trends: Array<{
    period: string;
    errors: number;
    change: number;
  }>;
}

// ErrorTrend interface removed - using inline type above

// ============================================================================
// BUSINESS INTELLIGENCE
// ============================================================================

export interface BusinessMetrics {
  revenue: RevenueMetrics;
  users: UserMetrics;
  content: ContentMetrics;
  engagement: EngagementMetrics;
  conversion: ConversionMetrics;
  retention: RetentionMetrics;
}

export interface RevenueMetrics {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  revenuePerUser: number;
  churnRate: number;
  growthRate: number;
  trends: Array<{
    period: string;
    revenue: number;
    change: number;
  }>;
}

export interface UserMetrics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  returningUsers: number;
  userGrowthRate: number;
  userRetentionRate: number;
  averageSessionDuration: number;
  sessionsPerUser: number;
  trends: Array<{
    period: string;
    users: number;
    change: number;
  }>;
}

export interface ContentMetrics {
  totalCourses: number;
  totalLessons: number;
  totalEnrollments: number;
  completionRate: number;
  averageRating: number;
  popularCourses: Array<{
    courseId: string;
    title: string;
    enrollments: number;
    rating: number;
  }>;
  contentPerformance: Array<{
    contentId: string;
    title: string;
    views: number;
    completionRate: number;
  }>;
}

export interface EngagementMetrics {
  pageViews: number;
  uniquePageViews: number;
  averageTimeOnPage: number;
  bounceRate: number;
  exitRate: number;
  scrollDepth: number;
  clickThroughRate: number;
  socialShares: number;
}

export interface ConversionMetrics {
  totalConversions: number;
  conversionRate: number;
  conversionValue: number;
  costPerConversion: number;
  conversionFunnel: Array<{
    step: string;
    users: number;
    conversionRate: number;
  }>;
  topConvertingSources: Array<{
    source: string;
    conversions: number;
    conversionRate: number;
  }>;
}

export interface RetentionMetrics {
  day1Retention: number;
  day7Retention: number;
  day30Retention: number;
  cohortRetention: Array<{
    cohort: string;
    retention: number;
  }>;
  userLifetime: number;
  churnPrediction: Array<{
    userId: string;
    churnProbability: number;
    riskLevel: 'low' | 'medium' | 'high';
  }>;
}

// ============================================================================
// DASHBOARD AND REPORTING
// ============================================================================

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  layout: {
    columns: number;
    rows: number;
    widgets: Array<{
      id: string;
      x: number;
      y: number;
      width: number;
      height: number;
    }>;
  };
  filters: Array<{
    id: string;
    name: string;
    type: 'select' | 'date' | 'text';
    options?: string[];
  }>;
  refreshInterval: number;
  isPublic: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'funnel' | 'cohort' | 'custom';
  title: string;
  description?: string;
  configuration: WidgetConfiguration;
  position: WidgetPosition;
  size: WidgetSize;
}

export interface WidgetConfiguration {
  metric: string;
  timeRange: TimeRange;
  filters: WidgetFilter[];
  aggregation: 'sum' | 'avg' | 'count' | 'min' | 'max';
  groupBy?: string;
  chartType?: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
}

export interface TimeRange {
  start: number;
  end: number;
  granularity: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
}

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}

export interface DashboardFilter {
  id: string;
  name: string;
  type: 'date' | 'select' | 'multiselect' | 'text' | 'number';
  options?: any[];
  defaultValue?: any;
}

export interface WidgetFilter {
  property: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in';
  value: any;
}

// ============================================================================
// ALERTING AND NOTIFICATIONS
// ============================================================================

export interface Alert {
  id: string;
  name: string;
  description: string;
  type: 'metric' | 'error' | 'performance' | 'custom';
  condition: AlertCondition;
  severity: 'low' | 'medium' | 'high' | 'critical';
  isActive: boolean;
  notifications: AlertNotification[];
  createdAt: number;
  updatedAt: number;
}

export interface AlertCondition {
  metric: string;
  operator: 'greater_than' | 'less_than' | 'equals' | 'not_equals' | 'contains';
  threshold: number;
  timeWindow: number;
  evaluationFrequency: number;
}

export interface AlertNotification {
  type: 'email' | 'sms' | 'webhook' | 'slack' | 'teams';
  recipients: string[];
  template?: string;
  isEnabled: boolean;
}

export interface AlertEvent {
  alertId: string;
  alertName: string;
  severity: string;
  message: string;
  timestamp: number;
  value: number;
  threshold: number;
  resolved: boolean;
  resolvedAt?: number;
}

// ============================================================================
// DATA EXPORT AND INTEGRATION
// ============================================================================

export interface DataExport {
  id: string;
  name: string;
  type: 'csv' | 'json' | 'xlsx' | 'pdf';
  format: 'raw' | 'aggregated' | 'summary';
  filters: ExportFilter[];
  timeRange: TimeRange;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  downloadUrl?: string;
  expiresAt?: number;
  createdAt: number;
}

export interface ExportFilter {
  property: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in';
  value: any;
}

export interface Integration {
  id: string;
  name: string;
  type: 'webhook' | 'api' | 'sftp' | 'email';
  configuration: IntegrationConfiguration;
  isActive: boolean;
  lastSync?: number;
  createdAt: number;
  updatedAt: number;
}

export interface IntegrationConfiguration {
  endpoint?: string;
  apiKey?: string;
  credentials?: Record<string, string>;
  mapping?: Record<string, string>;
  frequency?: number;
  batchSize?: number;
}

// ============================================================================
// PRIVACY AND COMPLIANCE
// ============================================================================

export interface PrivacySettings {
  userId: string;
  dataCollection: {
    analytics: boolean;
    performance: boolean;
    errors: boolean;
    personalization: boolean;
  };
  dataRetention: {
    analytics: number;
    performance: number;
    errors: number;
    personalization: number;
  };
  dataSharing: {
    thirdParty: boolean;
    marketing: boolean;
    research: boolean;
  };
  consentGiven: boolean;
  consentDate: number;
  lastUpdated: number;
}

export interface DataSubjectRequest {
  id: string;
  userId: string;
  type: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction';
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  requestedAt: number;
  completedAt?: number;
  data?: any;
  reason?: string;
}
