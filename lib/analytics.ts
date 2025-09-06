/**
 * Analytics utilities for the Shikshanam application
 * Provides comprehensive event tracking for user interactions,
 * course engagement, and learning journey progress.
 */

import React from 'react'

// Analytics event types
export type AnalyticsEvent = 
  | 'page_view'
  | 'hero_explore_tracks_clicked'
  | 'hero_take_test_clicked'
  | 'skill_track_selected'
  | 'course_clicked'
  | 'course_enrolled'
  | 'journey_step_changed'
  | 'journey_completed'
  | 'guru_profile_viewed'
  | 'testimonial_played'
  | 'testimonial_clicked'
  | 'newsletter_subscribed'
  | 'community_joined'
  | 'social_platform_clicked'
  | 'founder_profile_viewed'
  | 'mission_learn_more_clicked'
  | 'event_viewed'
  | 'assessment_started'
  | 'assessment_completed'
  | 'user_interaction'
  | 'form_submitted'
  | 'button_clicked'
  | 'link_clicked'
  | 'video_played'
  | 'download_started'
  | 'error_occurred'
  | 'performance_metric'
  | 'user_engagement'

// Event properties interface
export interface AnalyticsEventProperties {
  // Common properties
  timestamp?: number
  user_id?: string
  session_id?: string
  page_url?: string
  referrer?: string
  
  // Course-related properties
  course_id?: string
  course_title?: string
  course_category?: string
  course_level?: 'Beginner' | 'Intermediate' | 'Advanced'
  course_price?: string
  course_duration?: string
  
  // Journey-related properties
  step_number?: number
  step_title?: string
  total_steps?: number
  completion_percentage?: number
  
  // User interaction properties
  element_clicked?: string
  interaction_type?: 'click' | 'hover' | 'scroll' | 'focus'
  time_on_page?: number
  
  // Community properties
  platform?: 'telegram' | 'instagram' | 'twitter' | 'youtube'
  community_type?: 'public' | 'private'
  
  // Testimonial properties
  testimonial_id?: string
  testimonial_author?: string
  video_duration?: number
  video_completion_rate?: number
  
  // Guru properties
  guru_id?: string
  guru_name?: string
  guru_specialty?: string
  
  // Assessment properties
  assessment_type?: 'personality' | 'skill' | 'interest'
  assessment_duration?: number
  assessment_score?: number
  
  // Custom properties
  [key: string]: any
}

// Analytics provider interface
export interface AnalyticsProvider {
  track: (event: AnalyticsEvent, properties?: AnalyticsEventProperties) => void
  identify: (userId: string, traits?: Record<string, any>) => void
  page: (name: string, properties?: Record<string, any>) => void
  group: (groupId: string, traits?: Record<string, any>) => void
  alias: (userId: string) => void
}

// Default analytics provider (console-based for development)
class ConsoleAnalyticsProvider implements AnalyticsProvider {
  track(event: AnalyticsEvent, properties?: AnalyticsEventProperties) {
    console.log('Analytics Event:', {
      event,
      properties: {
        ...properties,
        timestamp: properties?.timestamp || Date.now(),
      },
    })
  }

  identify(userId: string, traits?: Record<string, any>) {
    console.log('Analytics Identify:', { userId, traits })
  }

  page(name: string, properties?: Record<string, any>) {
    console.log('Analytics Page:', { name, properties })
  }

  group(groupId: string, traits?: Record<string, any>) {
    console.log('Analytics Group:', { groupId, traits })
  }

  alias(userId: string) {
    console.log('Analytics Alias:', { userId })
  }
}

// Analytics manager class
class AnalyticsManager {
  private provider: AnalyticsProvider
  private sessionId: string
  private userId: string | null = null
  private pageStartTime: number

  constructor(provider?: AnalyticsProvider) {
    this.provider = provider || new ConsoleAnalyticsProvider()
    this.sessionId = this.generateSessionId()
    this.pageStartTime = Date.now()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private getCommonProperties(): Partial<AnalyticsEventProperties> {
    return {
      timestamp: Date.now(),
      session_id: this.sessionId,
      user_id: this.userId || undefined,
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    }
  }

  // Set user ID for tracking
  identify(userId: string, traits?: Record<string, any>) {
    this.userId = userId
    this.provider.identify(userId, traits)
  }

  // Track page views
  page(name: string, properties?: Record<string, any>) {
    const timeOnPage = Date.now() - this.pageStartTime
    this.provider.page(name, {
      ...properties,
      time_on_page: timeOnPage,
      ...this.getCommonProperties(),
    })
    this.pageStartTime = Date.now()
  }

  // Track custom events
  track(event: AnalyticsEvent, properties?: AnalyticsEventProperties) {
    this.provider.track(event, {
      ...this.getCommonProperties(),
      ...properties,
    })
  }

  // Track user interactions
  trackInteraction(
    element: string,
    interactionType: 'click' | 'hover' | 'scroll' | 'focus',
    properties?: AnalyticsEventProperties
  ) {
    this.track('user_interaction', {
      element_clicked: element,
      interaction_type: interactionType,
      ...properties,
    })
  }

  // Track course-related events
  trackCourseClick(course: {
    id: string
    title: string
    category: string
    level: string
    price: string
    duration: string
  }) {
    this.track('course_clicked', {
      course_id: course.id,
      course_title: course.title,
      course_category: course.category,
      course_level: course.level as 'Beginner' | 'Intermediate' | 'Advanced',
      course_price: course.price,
      course_duration: course.duration,
    })
  }

  trackCourseEnrollment(course: {
    id: string
    title: string
    category: string
    level: string
    price: string
  }) {
    this.track('course_enrolled', {
      course_id: course.id,
      course_title: course.title,
      course_category: course.category,
      course_level: course.level as 'Beginner' | 'Intermediate' | 'Advanced',
      course_price: course.price,
    })
  }

  // Track journey progress
  trackJourneyStep(step: {
    number: number
    title: string
    totalSteps: number
  }) {
    const completionPercentage = (step.number / step.totalSteps) * 100
    
    this.track('journey_step_changed', {
      step_number: step.number,
      step_title: step.title,
      total_steps: step.totalSteps,
      completion_percentage: Math.round(completionPercentage),
    })
  }

  trackJourneyCompletion(totalSteps: number) {
    this.track('journey_completed', {
      total_steps: totalSteps,
      completion_percentage: 100,
    })
  }

  // Track guru interactions
  trackGuruView(guru: {
    id: string
    name: string
    specialty: string
  }) {
    this.track('guru_profile_viewed', {
      guru_id: guru.id,
      guru_name: guru.name,
      guru_specialty: guru.specialty,
    })
  }

  // Track testimonial interactions
  trackTestimonialPlay(testimonial: {
    id: string
    author: string
    duration: number
  }) {
    this.track('testimonial_played', {
      testimonial_id: testimonial.id,
      testimonial_author: testimonial.author,
      video_duration: testimonial.duration,
    })
  }

  trackTestimonialClick(testimonial: {
    id: string
    author: string
  }) {
    this.track('testimonial_clicked', {
      testimonial_id: testimonial.id,
      testimonial_author: testimonial.author,
    })
  }

  // Track community interactions
  trackCommunityJoin(platform: 'telegram' | 'instagram' | 'twitter' | 'youtube') {
    this.track('community_joined', {
      platform,
    })
  }

  trackSocialClick(platform: 'telegram' | 'instagram' | 'twitter' | 'youtube') {
    this.track('social_platform_clicked', {
      platform,
    })
  }

  // Track newsletter subscription
  trackNewsletterSubscription(email: string) {
    this.track('newsletter_subscribed', {
      email_domain: email.split('@')[1], // Track domain for analytics
    })
  }

  // Track assessment interactions
  trackAssessmentStart(type: 'personality' | 'skill' | 'interest') {
    this.track('assessment_started', {
      assessment_type: type,
    })
  }

  trackAssessmentCompletion(
    type: 'personality' | 'skill' | 'interest',
    duration: number,
    score?: number
  ) {
    this.track('assessment_completed', {
      assessment_type: type,
      assessment_duration: duration,
      assessment_score: score,
    })
  }

  // Track hero section interactions
  trackHeroExploreTracks() {
    this.track('hero_explore_tracks_clicked')
  }

  trackHeroTakeTest() {
    this.track('hero_take_test_clicked')
  }

  // Track skill track selection
  trackSkillTrackSelection(track: {
    title: string
    category: 'Artha' | 'Kama'
  }) {
    this.track('skill_track_selected', {
      track_title: track.title,
      track_category: track.category,
    })
  }

  // Track founder interactions
  trackFounderView(founder: {
    name: string
    role: string
  }) {
    this.track('founder_profile_viewed', {
      founder_name: founder.name,
      founder_role: founder.role,
    })
  }

  trackMissionLearnMore() {
    this.track('mission_learn_more_clicked')
  }

  // Track event interactions
  trackEventView(event: {
    title: string
    date: string
    type: string
  }) {
    this.track('event_viewed', {
      event_title: event.title,
      event_date: event.date,
      event_type: event.type,
    })
  }
}

// Create singleton instance
const analytics = new AnalyticsManager()

// Export analytics instance and types
export { analytics, AnalyticsManager }
export default analytics

// React hook for analytics
export const useAnalytics = () => {
  return {
    track: analytics.track.bind(analytics),
    identify: analytics.identify.bind(analytics),
    page: analytics.page.bind(analytics),
    trackCourseClick: analytics.trackCourseClick.bind(analytics),
    trackCourseEnrollment: analytics.trackCourseEnrollment.bind(analytics),
    trackJourneyStep: analytics.trackJourneyStep.bind(analytics),
    trackJourneyCompletion: analytics.trackJourneyCompletion.bind(analytics),
    trackGuruView: analytics.trackGuruView.bind(analytics),
    trackTestimonialPlay: analytics.trackTestimonialPlay.bind(analytics),
    trackTestimonialClick: analytics.trackTestimonialClick.bind(analytics),
    trackCommunityJoin: analytics.trackCommunityJoin.bind(analytics),
    trackSocialClick: analytics.trackSocialClick.bind(analytics),
    trackNewsletterSubscription: analytics.trackNewsletterSubscription.bind(analytics),
    trackAssessmentStart: analytics.trackAssessmentStart.bind(analytics),
    trackAssessmentCompletion: analytics.trackAssessmentCompletion.bind(analytics),
    trackHeroExploreTracks: analytics.trackHeroExploreTracks.bind(analytics),
    trackHeroTakeTest: analytics.trackHeroTakeTest.bind(analytics),
    trackSkillTrackSelection: analytics.trackSkillTrackSelection.bind(analytics),
    trackFounderView: analytics.trackFounderView.bind(analytics),
    trackMissionLearnMore: analytics.trackMissionLearnMore.bind(analytics),
    trackEventView: analytics.trackEventView.bind(analytics),
  }
}

// Higher-order component for automatic page tracking
export function withAnalytics<P extends object>(
  Component: React.ComponentType<P>,
  pageName: string
): React.ComponentType<P> {
  const WrappedComponent = (props: P) => {
    React.useEffect(() => {
      analytics.page(pageName)
    }, [])

    return React.createElement(Component, props)
  }
  
  WrappedComponent.displayName = `withAnalytics(${Component.displayName || Component.name})`
  return WrappedComponent
}

// Utility functions for common tracking patterns
export const trackButtonClick = (buttonName: string, properties?: AnalyticsEventProperties) => {
  analytics.trackInteraction(buttonName, 'click', properties)
}

export const trackFormSubmission = (formName: string, properties?: AnalyticsEventProperties) => {
  analytics.track('form_submitted', {
    form_name: formName,
    ...properties,
  })
}

export const trackError = (error: Error, context?: string) => {
  analytics.track('error_occurred', {
    error_message: error.message,
    error_stack: error.stack,
    context,
  })
}

// Performance tracking
export const trackPerformance = (metric: string, value: number, unit: string = 'ms') => {
  analytics.track('performance_metric', {
    metric_name: metric,
    metric_value: value,
    metric_unit: unit,
  })
}

// User engagement tracking
export const trackEngagement = (action: string, duration?: number) => {
  analytics.track('user_engagement', {
    engagement_action: action,
    engagement_duration: duration,
  })
}
