/**
 * Analytics Provider Component
 * React context provider for analytics service integration
 */

'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { AnalyticsService, AnalyticsConfig } from './analytics-service';
import { AnalyticsEvent, PerformanceMetrics, ConversionEvent } from './types';

// ============================================================================
// ANALYTICS CONTEXT
// ============================================================================

interface AnalyticsContextType {
  analytics: AnalyticsService;
  trackEvent: (
    event: string,
    category: string,
    action: string,
    label?: string,
    value?: number,
    properties?: Record<string, any>
  ) => Promise<void>;
  trackPageView: (
    url?: string,
    title?: string,
    properties?: Record<string, any>
  ) => Promise<void>;
  trackConversion: (
    goalId: string,
    goalName: string,
    value: number,
    properties?: Record<string, any>
  ) => Promise<void>;
  trackError: (
    error: Error,
    context?: Record<string, any>
  ) => Promise<void>;
  trackPerformance: (metrics: PerformanceMetrics) => Promise<void>;
  setUserId: (userId: string) => void;
  setUserProperties: (properties: Record<string, any>) => void;
  trackUserEngagement: (
    action: string,
    element?: string,
    properties?: Record<string, any>
  ) => Promise<void>;
  trackABTest: (
    testId: string,
    variantId: string,
    result: any
  ) => Promise<void>;
  getSessionId: () => string;
  getUserId: () => string | undefined;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

// ============================================================================
// ANALYTICS PROVIDER
// ============================================================================

interface AnalyticsProviderProps {
  children: ReactNode;
  config: AnalyticsConfig;
}

export function AnalyticsProvider({ children, config }: AnalyticsProviderProps) {
  const [analytics] = React.useState(() => new AnalyticsService(config));
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    const initializeAnalytics = async () => {
      try {
        await analytics.initialize();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
      }
    };

    initializeAnalytics();

    // Cleanup on unmount
    return () => {
      analytics.endSession();
    };
  }, [analytics]);

  const trackEvent = React.useCallback(
    async (
      event: string,
      category: string,
      action: string,
      label?: string,
      value?: number,
      properties?: Record<string, any>
    ) => {
      if (!isInitialized) return;
      await analytics.trackEvent(event, category, action, label, value, properties);
    },
    [analytics, isInitialized]
  );

  const trackPageView = React.useCallback(
    async (
      url?: string,
      title?: string,
      properties?: Record<string, any>
    ) => {
      if (!isInitialized) return;
      await analytics.trackPageView(url, title, properties);
    },
    [analytics, isInitialized]
  );

  const trackConversion = React.useCallback(
    async (
      goalId: string,
      goalName: string,
      value: number,
      properties?: Record<string, any>
    ) => {
      if (!isInitialized) return;
      await analytics.trackConversion(goalId, goalName, value, properties);
    },
    [analytics, isInitialized]
  );

  const trackError = React.useCallback(
    async (error: Error, context?: Record<string, any>) => {
      if (!isInitialized) return;
      await analytics.trackError(error, context);
    },
    [analytics, isInitialized]
  );

  const trackPerformance = React.useCallback(
    async (metrics: PerformanceMetrics) => {
      if (!isInitialized) return;
      await analytics.trackPerformance(metrics);
    },
    [analytics, isInitialized]
  );

  const setUserId = React.useCallback(
    (userId: string) => {
      analytics.setUserId(userId);
    },
    [analytics]
  );

  const setUserProperties = React.useCallback(
    (properties: Record<string, any>) => {
      analytics.setUserProperties(properties);
    },
    [analytics]
  );

  const trackUserEngagement = React.useCallback(
    async (
      action: string,
      element?: string,
      properties?: Record<string, any>
    ) => {
      if (!isInitialized) return;
      await analytics.trackUserEngagement(action, element, properties);
    },
    [analytics, isInitialized]
  );

  const trackABTest = React.useCallback(
    async (testId: string, variantId: string, result: any) => {
      if (!isInitialized) return;
      await analytics.trackABTest(testId, variantId, result);
    },
    [analytics, isInitialized]
  );

  const getSessionId = React.useCallback(() => {
    return analytics.getSessionId();
  }, [analytics]);

  const getUserId = React.useCallback(() => {
    return analytics.getUserId();
  }, [analytics]);

  const contextValue = React.useMemo(
    () => ({
      analytics,
      trackEvent,
      trackPageView,
      trackConversion,
      trackError,
      trackPerformance,
      setUserId,
      setUserProperties,
      trackUserEngagement,
      trackABTest,
      getSessionId,
      getUserId,
    }),
    [
      analytics,
      trackEvent,
      trackPageView,
      trackConversion,
      trackError,
      trackPerformance,
      setUserId,
      setUserProperties,
      trackUserEngagement,
      trackABTest,
      getSessionId,
      getUserId,
    ]
  );

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// ============================================================================
// ANALYTICS HOOK
// ============================================================================

export function useAnalytics(): AnalyticsContextType {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

// ============================================================================
// ANALYTICS HOOKS
// ============================================================================

export function usePageTracking() {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);
}

export function useEventTracking() {
  const { trackEvent } = useAnalytics();

  const trackClick = React.useCallback(
    (element: string, properties?: Record<string, any>) => {
      trackEvent('click', 'user_interaction', 'click', element, undefined, properties);
    },
    [trackEvent]
  );

  const trackFormSubmit = React.useCallback(
    (formName: string, properties?: Record<string, any>) => {
      trackEvent('form_submit', 'user_interaction', 'submit', formName, undefined, properties);
    },
    [trackEvent]
  );

  const trackSearch = React.useCallback(
    (query: string, results?: number) => {
      trackEvent('search', 'user_interaction', 'search', query, results);
    },
    [trackEvent]
  );

  const trackDownload = React.useCallback(
    (fileName: string, fileType: string) => {
      trackEvent('download', 'user_interaction', 'download', fileName, undefined, {
        file_type: fileType,
      });
    },
    [trackEvent]
  );

  const trackShare = React.useCallback(
    (platform: string, content: string) => {
      trackEvent('share', 'social', 'share', platform, undefined, {
        content: content,
      });
    },
    [trackEvent]
  );

  return {
    trackClick,
    trackFormSubmit,
    trackSearch,
    trackDownload,
    trackShare,
  };
}

export function useConversionTracking() {
  const { trackConversion } = useAnalytics();

  const trackCourseEnrollment = React.useCallback(
    (courseId: string, courseName: string, price: number) => {
      trackConversion('course_enrollment', 'Course Enrollment', price, {
        course_id: courseId,
        course_name: courseName,
      });
    },
    [trackConversion]
  );

  const trackLessonCompletion = React.useCallback(
    (lessonId: string, lessonName: string, courseId: string) => {
      trackConversion('lesson_completion', 'Lesson Completion', 1, {
        lesson_id: lessonId,
        lesson_name: lessonName,
        course_id: courseId,
      });
    },
    [trackConversion]
  );

  const trackCourseCompletion = React.useCallback(
    (courseId: string, courseName: string) => {
      trackConversion('course_completion', 'Course Completion', 1, {
        course_id: courseId,
        course_name: courseName,
      });
    },
    [trackConversion]
  );

  const trackSubscription = React.useCallback(
    (planId: string, planName: string, price: number) => {
      trackConversion('subscription', 'Subscription', price, {
        plan_id: planId,
        plan_name: planName,
      });
    },
    [trackConversion]
  );

  return {
    trackCourseEnrollment,
    trackLessonCompletion,
    trackCourseCompletion,
    trackSubscription,
  };
}

export function usePerformanceTracking() {
  const { trackPerformance } = useAnalytics();

  const trackPageLoad = React.useCallback(
    (loadTime: number, resourceCount: number) => {
      trackPerformance({
        loadComplete: loadTime,
        resourceLoadTime: resourceCount,
      } as PerformanceMetrics);
    },
    [trackPerformance]
  );

  const trackApiCall = React.useCallback(
    (endpoint: string, duration: number, status: number) => {
      trackPerformance({
        customMetrics: {
          api_call_duration: duration,
          api_call_status: status,
          api_endpoint: endpoint,
        },
      } as PerformanceMetrics);
    },
    [trackPerformance]
  );

  const trackImageLoad = React.useCallback(
    (imageUrl: string, loadTime: number, size: number) => {
      trackPerformance({
        imageLoadTime: loadTime,
        customMetrics: {
          image_url: imageUrl,
          image_size: size,
        },
      } as PerformanceMetrics);
    },
    [trackPerformance]
  );

  return {
    trackPageLoad,
    trackApiCall,
    trackImageLoad,
  };
}

export function useErrorTracking() {
  const { trackError } = useAnalytics();

  const trackComponentError = React.useCallback(
    (error: Error, componentName: string, props?: Record<string, any>) => {
      trackError(error, {
        component: componentName,
        props: props,
      });
    },
    [trackError]
  );

  const trackApiError = React.useCallback(
    (error: Error, endpoint: string, method: string, status?: number) => {
      trackError(error, {
        endpoint: endpoint,
        method: method,
        status: status,
      });
    },
    [trackError]
  );

  const trackValidationError = React.useCallback(
    (error: Error, formName: string, fieldName: string) => {
      trackError(error, {
        form: formName,
        field: fieldName,
        type: 'validation',
      });
    },
    [trackError]
  );

  return {
    trackComponentError,
    trackApiError,
    trackValidationError,
  };
}

// ============================================================================
// ANALYTICS COMPONENTS
// ============================================================================

interface TrackedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  trackingLabel: string;
  trackingCategory?: string;
  trackingAction?: string;
  trackingValue?: number;
  trackingProperties?: Record<string, any>;
}

export function TrackedButton({
  trackingLabel,
  trackingCategory = 'user_interaction',
  trackingAction = 'click',
  trackingValue,
  trackingProperties,
  onClick,
  children,
  ...props
}: TrackedButtonProps) {
  const { trackEvent } = useAnalytics();

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      trackEvent('button_click', trackingCategory, trackingAction, trackingLabel, trackingValue, trackingProperties);
      onClick?.(event);
    },
    [trackEvent, trackingCategory, trackingAction, trackingLabel, trackingValue, trackingProperties, onClick]
  );

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  trackingLabel: string;
  trackingCategory?: string;
  trackingAction?: string;
  trackingValue?: number;
  trackingProperties?: Record<string, any>;
}

export function TrackedLink({
  trackingLabel,
  trackingCategory = 'user_interaction',
  trackingAction = 'click',
  trackingValue,
  trackingProperties,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const { trackEvent } = useAnalytics();

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      trackEvent('link_click', trackingCategory, trackingAction, trackingLabel, trackingValue, trackingProperties);
      onClick?.(event);
    },
    [trackEvent, trackingCategory, trackingAction, trackingLabel, trackingValue, trackingProperties, onClick]
  );

  return (
    <a onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

interface TrackedFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  trackingLabel: string;
  trackingCategory?: string;
  trackingAction?: string;
  trackingProperties?: Record<string, any>;
}

export function TrackedForm({
  trackingLabel,
  trackingCategory = 'user_interaction',
  trackingAction = 'submit',
  trackingProperties,
  onSubmit,
  children,
  ...props
}: TrackedFormProps) {
  const { trackEvent } = useAnalytics();

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      trackEvent('form_submit', trackingCategory, trackingAction, trackingLabel, undefined, trackingProperties);
      onSubmit?.(event);
    },
    [trackEvent, trackingCategory, trackingAction, trackingLabel, trackingProperties, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}
