/**
 * Analytics tracking system for Shikshanam
 * Centralized event tracking with proper error handling
 */

// Event types for type safety
export type AnalyticsEvent = 
  // Navigation events
  | 'nav_click'
  | 'home_click'
  | 'courses_click'
  | 'packages_click'
  | 'schools_click'
  
  // Course events
  | 'course_view_click'
  | 'course_enroll_click'
  | 'enroll_click'
  | 'start_learning_click'
  | 'syllabus_view_click'
  | 'course_search'
  
  // Package events
  | 'package_view_click'
  | 'package_buy_click'
  | 'buy_now_click'
  | 'view_package_click'
  
  // User events
  | 'login_click'
  | 'logout_click'
  | 'signup_click'
  | 'profile_click'
  | 'dashboard_click'
  
  // Wishlist events
  | 'add_wishlist_click'
  | 'remove_wishlist_click'
  | 'wishlist_view_click'
  
  // Support events
  | 'contact_click'
  | 'help_click'
  | 'support_click'
  | 'get_notified_click'
  | 'footer_link_click'
  | 'footer_legal_click'
  | 'hero_explore_tracks'
  | 'hero_take_test'
  | 'course_click'
  | 'journey_completion'
  | 'guru_view'
  | 'course_enrollment'
  
  // Search events
  | 'search_click'
  | 'search_query'
  | 'search_result_click'
  | 'browse_all_courses_click'
  
  // Theme events
  | 'theme_toggle'
  | 'theme_change'
  
  // Engagement events
  | 'video_play'
  | 'video_pause'
  | 'video_complete'
  | 'download_click'
  | 'share_click'
  | 'testimonial_click'
  | 'founder_view'
  | 'mission_learn_more'
  | 'community_join'
  | 'newsletter_subscription'
  | 'event_view'
  | 'social_click'
  
  // Error events
  | 'error_occurred'
  | 'page_not_found'
  | 'api_error'

// Event properties interface
export interface AnalyticsProperties {
  // Common properties
  page_url?: string
  page_title?: string
  user_id?: string
  session_id?: string
  
  // Course/package specific
  course_id?: string
  course_name?: string
  course_category?: string
  package_id?: string
  package_name?: string
  
  // Navigation specific
  from_page?: string
  to_page?: string
  nav_item?: string
  
  // Search specific
  search_query?: string
  search_results_count?: number
  search_result_position?: number
  
  // User specific
  user_type?: 'guest' | 'student' | 'premium'
  enrollment_status?: 'enrolled' | 'not_enrolled'
  
  // Error specific
  error_message?: string
  error_code?: string
  error_stack?: string
  
  // Custom properties
  [key: string]: any
}

// Analytics configuration
interface AnalyticsConfig {
  enabled: boolean
  debug: boolean
  endpoint?: string
  apiKey?: string
}

// Default configuration
const defaultConfig: AnalyticsConfig = {
  enabled: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development',
  endpoint: '/api/analytics',
}

// Current configuration
let config = { ...defaultConfig }

// Initialize analytics
export const initAnalytics = (userConfig?: Partial<AnalyticsConfig>) => {
  config = { ...config, ...userConfig }
  
  if (config.debug) {
    console.log('Analytics initialized:', config)
  }
}

// Generate session ID
const getSessionId = (): string => {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}

// Get user ID from auth context or localStorage
const getUserId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined
  
  try {
    const userData = localStorage.getItem('shikshanam_user')
    if (userData) {
      const user = JSON.parse(userData)
      return user.id || user.email
    }
  } catch (error) {
    console.warn('Failed to get user ID from localStorage:', error)
  }
  
  return undefined
}

// Track event function
export const trackEvent = (
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {}
): void => {
  // Don't track in development unless debug is enabled
  if (!config.enabled && !config.debug) {
    return
  }

  // Prepare event data
  const eventData = {
    event,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
      page_title: typeof document !== 'undefined' ? document.title : undefined,
      session_id: getSessionId(),
      user_id: getUserId(),
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    },
  }

  // Debug logging
  if (config.debug) {
    console.log('Analytics Event:', eventData)
  }

  // Send to new analytics tracker
  if (typeof window !== 'undefined') {
    try {
      const { analyticsTracker } = require('./analytics-tracker')
      
      // Convert legacy event to new format
      const eventStr = event as string
      if (eventStr === 'page_view') {
        analyticsTracker.trackPageView(properties.page_url, properties.page_title)
      } else if (eventStr.includes('click') && properties.href) {
        analyticsTracker.trackOutboundClick(properties.href, properties.link_text)
      } else {
        analyticsTracker.trackCustomEvent({
          event_name: eventStr,
          ...properties
        })
      }
    } catch (error) {
      // Fallback to old endpoint if tracker fails
      if (config.endpoint) {
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            config.endpoint,
            JSON.stringify(eventData)
          )
        } else {
          fetch(config.endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
            keepalive: true,
          }).catch((error) => {
            console.warn('Failed to send analytics event:', error)
          })
        }
      }
    }
  }

  // Send to external analytics services (if configured)
  sendToExternalServices(event, eventData.properties)
}

// External analytics services
const sendToExternalServices = (event: AnalyticsEvent, properties: AnalyticsProperties) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, {
      event_category: getEventCategory(event),
      event_label: properties.course_id || properties.package_id || properties.nav_item,
      value: 1,
      ...properties,
    })
  }

  // Mixpanel (if configured)
  if (typeof window !== 'undefined' && (window as any).mixpanel) {
    (window as any).mixpanel.track(event, properties)
  }

  // Custom analytics service
  if (typeof window !== 'undefined' && (window as any).customAnalytics) {
    (window as any).customAnalytics.track(event, properties)
  }
}

// Get event category for Google Analytics
const getEventCategory = (event: AnalyticsEvent): string => {
  if (event.includes('nav_') || event.includes('_click')) return 'Navigation'
  if (event.includes('course_')) return 'Course'
  if (event.includes('package_')) return 'Package'
  if (event.includes('search_')) return 'Search'
  if (event.includes('user_') || event.includes('login_') || event.includes('signup_')) return 'User'
  if (event.includes('error_')) return 'Error'
  return 'General'
}

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
  trackEvent('page_view' as AnalyticsEvent, {
    page_url: url,
    page_title: title || document.title,
  })
}

// Error tracking
export const trackError = (error: Error, context?: string) => {
  trackEvent('error_occurred', {
    error_message: error.message,
    error_code: (error as any).code,
    error_stack: error.stack,
    context,
  })
}

// Performance tracking
export const trackPerformance = (metric: string, value: number, unit: string = 'ms') => {
  trackEvent('performance_metric' as AnalyticsEvent, {
    metric_name: metric,
    metric_value: value,
    metric_unit: unit,
  })
}

// User journey tracking
export const trackUserJourney = (step: string, properties: AnalyticsProperties = {}) => {
  trackEvent('user_journey_step' as AnalyticsEvent, {
    journey_step: step,
    ...properties,
  })
}

// A/B testing tracking
export const trackExperiment = (experimentId: string, variant: string, properties: AnalyticsProperties = {}) => {
  trackEvent('experiment_view' as AnalyticsEvent, {
    experiment_id: experimentId,
    experiment_variant: variant,
    ...properties,
  })
}

// E-commerce tracking
export const trackPurchase = (transactionId: string, value: number, currency: string = 'INR', items: any[] = []) => {
  trackEvent('purchase' as AnalyticsEvent, {
    transaction_id: transactionId,
    value,
    currency,
    items,
  })
}

// Export analytics utilities
export const analytics = {
  track: trackEvent,
  pageView: trackPageView,
  error: trackError,
  performance: trackPerformance,
  journey: trackUserJourney,
  experiment: trackExperiment,
  purchase: trackPurchase,
  init: initAnalytics,
}

// React hook for analytics
export const useAnalytics = () => {
  return {
    track: trackEvent,
    pageView: trackPageView,
    error: trackError,
    performance: trackPerformance,
    journey: trackUserJourney,
    experiment: trackExperiment,
    purchase: trackPurchase,
  }
}

export default analytics