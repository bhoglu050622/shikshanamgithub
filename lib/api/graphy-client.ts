/**
 * Graphy (Spayee) API Client
 * Handles all communication with the Graphy API including caching, rate limiting, and error handling
 */

import { DASHBOARD_CONFIG } from '@/lib/config/dashboard';

// Types for Graphy API responses
export interface GraphyLearner {
  id: string;
  email: string;
  name: string;
  phone?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GraphyProduct {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  currency: string;
  category: string;
  tags: string[];
  instructor: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  syllabus: GraphySyllabusItem[];
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface GraphySyllabusItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'quiz' | 'assignment' | 'liveclass' | 'text';
  duration: number; // in minutes
  order: number;
  isLocked: boolean;
  isCompleted: boolean;
  videoUrl?: string;
  quizId?: string;
  assignmentId?: string;
  liveclassId?: string;
  lastWatchedTime?: number; // in seconds
}

export interface GraphyEnrollment {
  id: string;
  learnerId: string;
  productId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  progress: number; // percentage 0-100
  lastAccessedAt: string;
  completedAt?: string;
}

export interface GraphyProgressReport {
  productId: string;
  learnerId: string;
  totalLessons: number;
  completedLessons: number;
  totalDuration: number;
  watchedDuration: number;
  progressPercentage: number;
  lastWatchedLesson?: string;
  lastWatchedTime?: number;
  completionDate?: string;
}

export interface GraphyUsage {
  date: string;
  duration: number; // in minutes
  lessonsCompleted: number;
  quizzesTaken: number;
  assignmentsSubmitted: number;
}

export interface GraphyDiscussion {
  id: string;
  productId: string;
  learnerId: string;
  content: string;
  createdAt: string;
  replies: GraphyDiscussionReply[];
}

export interface GraphyDiscussionReply {
  id: string;
  discussionId: string;
  learnerId: string;
  content: string;
  createdAt: string;
}

export interface GraphyQuizReport {
  id: string;
  productId: string;
  learnerId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  timeSpent: number; // in minutes
}

export interface GraphyTransaction {
  id: string;
  learnerId: string;
  productId: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  createdAt: string;
  refundedAt?: string;
  refundAmount?: number;
}

// Cache interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Simple in-memory cache (replace with Redis in production)
class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl * 1000, // Convert to milliseconds
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// Rate limiter
class RateLimiter {
  private requests = new Map<string, number[]>();

  isAllowed(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

export class GraphyAPIClient {
  private cache = new MemoryCache();
  private rateLimiter = new RateLimiter();
  private config = DASHBOARD_CONFIG.GRAPHY;

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    useCache = false,
    cacheKey?: string,
    cacheTtl?: number
  ): Promise<T> {
    // Check rate limit
    if (!this.rateLimiter.isAllowed(
      'graphy-api',
      DASHBOARD_CONFIG.RATE_LIMIT.GRAPHY_PER_MINUTE,
      DASHBOARD_CONFIG.RATE_LIMIT.WINDOW_MS
    )) {
      throw new Error('Rate limit exceeded');
    }

    // Check cache first
    if (useCache && cacheKey) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const url = `${this.config.BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.API_KEY}`,
      'X-API-Key': this.config.SECRET_KEY,
      ...options.headers,
    };

    let retries = this.config.RETRY_ATTEMPTS;
    let lastError: Error | null = null;

    while (retries > 0) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.TIMEOUT);

        const response = await fetch(url, {
          ...options,
          headers,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Cache the result
        if (useCache && cacheKey && cacheTtl) {
          this.cache.set(cacheKey, data, cacheTtl);
        }

        return data;
      } catch (error) {
        lastError = error as Error;
        retries--;
        
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, this.config.RETRY_DELAY));
        }
      }
    }

    throw lastError || new Error('Request failed after retries');
  }

  // Learner methods
  async getLearnerByEmail(email: string): Promise<GraphyLearner | null> {
    const cacheKey = `learner:email:${email}`;
    const cached = this.cache.get<GraphyLearner>(cacheKey);
    if (cached) return cached;

    // Check if we're in mock mode (no API credentials or API errors)
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      console.log('Graphy API not configured, returning mock data');
      return this.getMockLearner(email);
    }

    try {
      const response = await this.makeRequest<{ learners: GraphyLearner[] }>(
        `/public/v2/learners?query=${encodeURIComponent(email)}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.STATIC_TTL
      );

      const learner = response.learners.find(l => l.email.toLowerCase() === email.toLowerCase());
      if (learner) {
        this.cache.set(cacheKey, learner, DASHBOARD_CONFIG.CACHE.STATIC_TTL);
      }
      return learner || null;
    } catch (error) {
      console.error('Error fetching learner by email:', error);
      // Return mock data on API error for development
      console.log('Falling back to mock data due to API error');
      return this.getMockLearner(email);
    }
  }

  async getLearnerById(learnerId: string, includeCourseInfo = true): Promise<GraphyLearner | null> {
    const cacheKey = `learner:id:${learnerId}:${includeCourseInfo}`;
    
    try {
      const response = await this.makeRequest<GraphyLearner>(
        `/public/v1/learners/${learnerId}?courseInfo=${includeCourseInfo}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.STATIC_TTL
      );

      return response;
    } catch (error) {
      console.error('Error fetching learner by ID:', error);
      return null;
    }
  }

  // Product methods
  async getProduct(productId: string): Promise<GraphyProduct | null> {
    const cacheKey = `product:${productId}`;
    
    // Check if we're in mock mode
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      const mockProducts = this.getMockProducts();
      return mockProducts.find(p => p.id === productId) || null;
    }
    
    try {
      const response = await this.makeRequest<GraphyProduct>(
        `/public/v1/products/${productId}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.STATIC_TTL
      );

      return response;
    } catch (error) {
      console.error('Error fetching product:', error);
      const mockProducts = this.getMockProducts();
      return mockProducts.find(p => p.id === productId) || null;
    }
  }

  async getLearnerEnrollments(learnerId: string): Promise<GraphyEnrollment[]> {
    const cacheKey = `enrollments:${learnerId}`;
    
    // Check if we're in mock mode
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      return this.getMockEnrollments(learnerId);
    }
    
    try {
      const response = await this.makeRequest<{ enrollments: GraphyEnrollment[] }>(
        `/public/v1/learners/${learnerId}/enrollments`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL
      );

      return response.enrollments || [];
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      return this.getMockEnrollments(learnerId);
    }
  }

  // Progress methods
  async getCourseProgressReport(productId: string, learnerId: string): Promise<GraphyProgressReport | null> {
    const cacheKey = `progress:${productId}:${learnerId}`;
    
    // Check if we're in mock mode
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      const mockReports = this.getMockProgressReports(learnerId);
      return mockReports.find(r => r.productId === productId) || null;
    }
    
    try {
      const response = await this.makeRequest<GraphyProgressReport>(
        `/t/api/public/v3/products/courseprogressreports?productId=${productId}&learnerId=${learnerId}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL
      );

      return response;
    } catch (error) {
      console.error('Error fetching progress report:', error);
      const mockReports = this.getMockProgressReports(learnerId);
      return mockReports.find(r => r.productId === productId) || null;
    }
  }

  async getLearnerUsage(learnerId: string, days = 7): Promise<GraphyUsage[]> {
    const cacheKey = `usage:${learnerId}:${days}`;
    
    // Check if we're in mock mode
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      return this.getMockUsage(learnerId);
    }
    
    try {
      const response = await this.makeRequest<{ usage: GraphyUsage[] }>(
        `/public/v1/learners/${learnerId}/usage?days=${days}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL
      );

      return response.usage || [];
    } catch (error) {
      console.error('Error fetching usage:', error);
      return this.getMockUsage(learnerId);
    }
  }

  // Activity methods
  async getLearnerDiscussions(learnerId: string, limit = 20, skip = 0): Promise<GraphyDiscussion[]> {
    // Check if we're in mock mode
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      return []; // Return empty array for discussions in mock mode
    }
    
    try {
      const response = await this.makeRequest<{ discussions: GraphyDiscussion[] }>(
        `/public/v1/learners/${learnerId}/discussions?limit=${limit}&skip=${skip}`,
        { method: 'GET' },
        false // Don't cache discussions as they're real-time
      );

      return response.discussions || [];
    } catch (error) {
      console.error('Error fetching discussions:', error);
      return [];
    }
  }

  async getLearnerQuizReports(learnerId: string, limit = 20, skip = 0): Promise<GraphyQuizReport[]> {
    // Check if we're in mock mode
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      return []; // Return empty array for quiz reports in mock mode
    }
    
    try {
      const response = await this.makeRequest<{ quizReports: GraphyQuizReport[] }>(
        `/public/v1/learners/${learnerId}/quiz-reports?limit=${limit}&skip=${skip}`,
        { method: 'GET' },
        false // Don't cache quiz reports as they're real-time
      );

      return response.quizReports || [];
    } catch (error) {
      console.error('Error fetching quiz reports:', error);
      return [];
    }
  }

  async getLearnerTransactions(learnerId: string, limit = 20, skip = 0): Promise<GraphyTransaction[]> {
    // Check if we're in mock mode
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      return this.getMockTransactions(learnerId);
    }
    
    try {
      const response = await this.makeRequest<{ transactions: GraphyTransaction[] }>(
        `/public/v1/learners/${learnerId}/transactions?limit=${limit}&skip=${skip}`,
        { method: 'GET' },
        false // Don't cache transactions as they're real-time
      );

      return response.transactions || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return this.getMockTransactions(learnerId);
    }
  }

  // Admin methods
  async assignCourse(learnerId: string, productId: string): Promise<boolean> {
    try {
      await this.makeRequest(
        `/admin/v1/learners/${learnerId}/enrollments`,
        {
          method: 'POST',
          body: JSON.stringify({ productId }),
        }
      );

      // Clear relevant caches
      this.cache.delete(`enrollments:${learnerId}`);
      return true;
    } catch (error) {
      console.error('Error assigning course:', error);
      return false;
    }
  }

  async unassignCourse(learnerId: string, enrollmentId: string): Promise<boolean> {
    try {
      await this.makeRequest(
        `/admin/v1/enrollments/${enrollmentId}`,
        { method: 'DELETE' }
      );

      // Clear relevant caches
      this.cache.delete(`enrollments:${learnerId}`);
      return true;
    } catch (error) {
      console.error('Error unassigning course:', error);
      return false;
    }
  }

  async processRefund(transactionId: string, amount?: number): Promise<boolean> {
    try {
      await this.makeRequest(
        `/admin/v1/transactions/${transactionId}/refund`,
        {
          method: 'POST',
          body: JSON.stringify({ amount }),
        }
      );

      return true;
    } catch (error) {
      console.error('Error processing refund:', error);
      return false;
    }
  }

  // Mock data methods for development/testing
  private getMockLearner(email: string): GraphyLearner {
    const names = {
      'test@example.com': 'Test Student',
      'aman@shikshanam.com': 'Aman Bhogal',
      'bhoglu.aman@gmail.com': 'Aman Bhogal',
      'student@example.com': 'John Doe',
      'learner@test.com': 'Jane Smith'
    };
    
    return {
      id: 'mock-learner-1',
      email: email,
      name: names[email as keyof typeof names] || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      phone: '+1234567890',
      profilePicture: 'https://via.placeholder.com/150',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    };
  }

  private getMockEnrollments(learnerId: string): GraphyEnrollment[] {
    return [
      {
        id: 'enrollment-1',
        learnerId: learnerId,
        productId: 'product-1',
        enrolledAt: '2024-01-01T00:00:00Z',
        status: 'active',
        progress: 75,
        lastAccessedAt: '2024-01-15T00:00:00Z',
      },
      {
        id: 'enrollment-2',
        learnerId: learnerId,
        productId: 'product-2',
        enrolledAt: '2024-01-01T00:00:00Z',
        status: 'completed',
        progress: 100,
        lastAccessedAt: '2024-01-20T00:00:00Z',
        completedAt: '2024-01-20T00:00:00Z',
      },
    ];
  }

  private getMockProducts(): GraphyProduct[] {
    return [
      {
        id: 'product-1',
        title: 'Sanskrit Basics',
        description: 'Learn the fundamentals of Sanskrit language and grammar with interactive exercises and cultural context',
        thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center',
        price: 99,
        currency: 'USD',
        category: 'Language',
        tags: ['sanskrit', 'basics', 'language', 'grammar'],
        instructor: {
          id: 'instructor-1',
          name: 'Dr. Sanskrit Expert',
          profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        },
        syllabus: [
          {
            id: 'lesson-1',
            title: 'Introduction to Sanskrit',
            description: 'Basic introduction to Sanskrit language',
            type: 'video',
            duration: 30,
            order: 1,
            isLocked: false,
            isCompleted: true,
          },
          {
            id: 'lesson-2',
            title: 'Sanskrit Alphabet',
            description: 'Learn the Devanagari script',
            type: 'video',
            duration: 45,
            order: 2,
            isLocked: false,
            isCompleted: true,
          },
          {
            id: 'lesson-3',
            title: 'Basic Grammar',
            description: 'Introduction to Sanskrit grammar',
            type: 'video',
            duration: 60,
            order: 3,
            isLocked: false,
            isCompleted: false,
          },
        ],
        duration: 300,
        difficulty: 'beginner',
        language: 'English',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'product-2',
        title: 'Advanced Sanskrit Literature',
        description: 'Explore classical Sanskrit texts, poetry, and philosophical works with detailed analysis and commentary',
        thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center',
        price: 199,
        currency: 'USD',
        category: 'Literature',
        tags: ['sanskrit', 'literature', 'poetry', 'classical'],
        instructor: {
          id: 'instructor-2',
          name: 'Prof. Literature Master',
          profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        },
        syllabus: [
          {
            id: 'lesson-4',
            title: 'Classical Texts',
            description: 'Study of ancient Sanskrit texts',
            type: 'video',
            duration: 90,
            order: 1,
            isLocked: false,
            isCompleted: true,
          },
        ],
        duration: 600,
        difficulty: 'advanced',
        language: 'English',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ];
  }

  private getMockProgressReports(learnerId: string): GraphyProgressReport[] {
    return [
      {
        productId: 'product-1',
        learnerId: learnerId,
        totalLessons: 10,
        completedLessons: 7,
        totalDuration: 300,
        watchedDuration: 225,
        progressPercentage: 75,
        lastWatchedLesson: 'lesson-2',
        lastWatchedTime: 45,
      },
      {
        productId: 'product-2',
        learnerId: learnerId,
        totalLessons: 15,
        completedLessons: 15,
        totalDuration: 600,
        watchedDuration: 600,
        progressPercentage: 100,
        lastWatchedLesson: 'lesson-4',
        completionDate: '2024-01-20T00:00:00Z',
      },
    ];
  }

  private getMockUsage(learnerId: string): GraphyUsage[] {
    return [
      {
        date: '2024-01-15',
        duration: 60,
        lessonsCompleted: 2,
        quizzesTaken: 1,
        assignmentsSubmitted: 0,
      },
      {
        date: '2024-01-14',
        duration: 45,
        lessonsCompleted: 1,
        quizzesTaken: 0,
        assignmentsSubmitted: 1,
      },
      {
        date: '2024-01-13',
        duration: 30,
        lessonsCompleted: 1,
        quizzesTaken: 1,
        assignmentsSubmitted: 0,
      },
    ];
  }

  private getMockTransactions(learnerId: string): GraphyTransaction[] {
    return [
      {
        id: 'transaction-1',
        learnerId: learnerId,
        productId: 'product-1',
        amount: 99,
        currency: 'USD',
        status: 'completed',
        paymentMethod: 'Credit Card',
        createdAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'transaction-2',
        learnerId: learnerId,
        productId: 'product-2',
        amount: 199,
        currency: 'USD',
        status: 'completed',
        paymentMethod: 'PayPal',
        createdAt: '2024-01-01T00:00:00Z',
      },
    ];
  }

  private getMockRecentActivity(learnerId: string): any[] {
    return [
      {
        id: 'activity-1',
        type: 'lesson_completed',
        title: 'Completed: Introduction to Sanskrit',
        description: 'Finished watching the introduction lesson',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        courseTitle: 'Sanskrit Basics',
        courseId: 'product-1'
      },
      {
        id: 'activity-2',
        type: 'quiz_passed',
        title: 'Quiz Passed: Sanskrit Alphabet',
        description: 'Scored 85% on the alphabet quiz',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        courseTitle: 'Sanskrit Basics',
        courseId: 'product-1'
      },
      {
        id: 'activity-3',
        type: 'certificate_earned',
        title: 'Certificate Earned: Advanced Sanskrit Literature',
        description: 'Completed the advanced literature course',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        courseTitle: 'Advanced Sanskrit Literature',
        courseId: 'product-2'
      },
      {
        id: 'activity-4',
        type: 'course_enrolled',
        title: 'Enrolled in: Vedic Philosophy',
        description: 'Started a new course on Vedic philosophy',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        courseTitle: 'Vedic Philosophy',
        courseId: 'product-3'
      },
      {
        id: 'activity-5',
        type: 'lesson_completed',
        title: 'Completed: Basic Grammar Rules',
        description: 'Finished the grammar fundamentals lesson',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        courseTitle: 'Sanskrit Basics',
        courseId: 'product-1'
      }
    ];
  }

  private getMockRecommendations(learnerId: string): any[] {
    return [
      {
        id: 'rec-1',
        title: 'Vedic Philosophy',
        description: 'Explore the ancient wisdom of Vedic philosophy and its modern applications',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
        category: 'Philosophy',
        reason: 'Based on your interest in Sanskrit literature',
        score: 0.95,
        productId: 'product-3'
      },
      {
        id: 'rec-2',
        title: 'Yoga Sutras of Patanjali',
        description: 'Deep dive into the foundational text of classical yoga philosophy',
        thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop&crop=center',
        category: 'Yoga',
        reason: 'Recommended for Sanskrit literature students',
        score: 0.88,
        productId: 'product-4'
      },
      {
        id: 'rec-3',
        title: 'Bhagavad Gita Study',
        description: 'Comprehensive study of the Bhagavad Gita with Sanskrit text analysis',
        thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center',
        category: 'Scripture',
        reason: 'Popular among Sanskrit learners',
        score: 0.82,
        productId: 'product-5'
      },
      {
        id: 'rec-4',
        title: 'Sanskrit Poetry Workshop',
        description: 'Learn to compose and appreciate classical Sanskrit poetry',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
        category: 'Creative Writing',
        reason: 'Perfect for literature enthusiasts',
        score: 0.79,
        productId: 'product-6'
      }
    ];
  }

  // Utility methods
  clearCache(): void {
    this.cache.clear();
  }

  clearLearnerCache(learnerId: string): void {
    const keys = [
      `learner:id:${learnerId}:true`,
      `learner:id:${learnerId}:false`,
      `enrollments:${learnerId}`,
    ];
    
    keys.forEach(key => this.cache.delete(key));
  }
}

// Singleton instance
export const graphyClient = new GraphyAPIClient();
