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
  private authErrorHandler?: (error: Error) => void;

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    useCache = false,
    cacheKey?: string,
    cacheTtl?: number,
    useFormData = false,
    baseUrl?: string
  ): Promise<T> {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    
    // Check rate limit
    if (!this.rateLimiter.isAllowed(
      'graphy-api',
      DASHBOARD_CONFIG.RATE_LIMIT.GRAPHY_PER_MINUTE,
      DASHBOARD_CONFIG.RATE_LIMIT.WINDOW_MS
    )) {
      console.error(`[${requestId}] Rate limit exceeded for Graphy API`);
      throw new Error('Rate limit exceeded');
    }

    // Check cache first
    if (useCache && cacheKey) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached) {
        console.log(`[${requestId}] Cache hit for ${endpoint}`);
        return cached;
      }
    }

    // Add authentication parameters to the request
    let finalEndpoint = endpoint;
    let finalBody = options.body;
    
    // For GET requests, add mid and key as query parameters
    if ((options.method || 'GET') === 'GET') {
      const url = new URL(endpoint, baseUrl || this.config.BASE_URL_V1);
      url.searchParams.append('mid', this.config.MID);
      url.searchParams.append('key', this.config.API_KEY);
      finalEndpoint = url.pathname + url.search;
    } else if (useFormData && options.body) {
      // For POST requests with form data, add mid and key to the form data
      const formData = new URLSearchParams(options.body as string);
      formData.append('mid', this.config.MID);
      formData.append('key', this.config.API_KEY);
      finalBody = formData.toString();
    } else if (options.body) {
      // For POST requests with JSON, add mid and key to the JSON body
      try {
        const bodyObj = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
        bodyObj.mid = this.config.MID;
        bodyObj.key = this.config.API_KEY;
        finalBody = JSON.stringify(bodyObj);
      } catch (error) {
        console.warn(`[${requestId}] Could not parse JSON body to add auth params, using original body`);
      }
    } else {
      // For POST requests without body, create a new body with auth params
      if (useFormData) {
        const formData = new URLSearchParams();
        formData.append('mid', this.config.MID);
        formData.append('key', this.config.API_KEY);
        finalBody = formData.toString();
      } else {
        finalBody = JSON.stringify({
          mid: this.config.MID,
          key: this.config.API_KEY
        });
      }
    }

    const url = `${baseUrl || this.config.BASE_URL_V1}${finalEndpoint}`;
    
    // Use form-urlencoded headers for POST requests, JSON for GET
    const headers = useFormData ? {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      ...options.headers,
    } : {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    // Log outgoing request details (mask secrets)
    const logHeaders = { ...headers } as any;
    if (logHeaders.Authorization) {
      logHeaders.Authorization = `Bearer ${this.config.API_KEY.substring(0, 8)}...`;
    }
    if (logHeaders['X-API-Key']) {
      logHeaders['X-API-Key'] = `${this.config.SECRET_KEY.substring(0, 8)}...`;
    }
    
    console.log(`[${requestId}] [${timestamp}] Graphy API Request:`, {
      method: options.method || 'GET',
      url,
      headers: logHeaders,
      body: options.body ? (typeof options.body === 'string' ? options.body.substring(0, 200) : '[Binary/FormData]') : undefined
    });

    let retries = this.config.RETRY_ATTEMPTS;
    let lastError: Error | null = null;

    while (retries > 0) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.TIMEOUT);

        const response = await fetch(url, {
          ...options,
          headers,
          body: finalBody,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Log response details
        const responseTimestamp = new Date().toISOString();
        const contentType = response.headers.get('content-type');
        
        console.log(`[${requestId}] [${responseTimestamp}] Graphy API Response:`, {
          status: response.status,
          statusText: response.statusText,
          contentType,
          headers: Object.fromEntries(response.headers.entries())
        });

        if (!response.ok) {
          // Handle 401 Unauthorized - Invalid session
          if (response.status === 401) {
            let errorDetails = '';
            try {
              const errorText = await response.text();
              if (errorText) {
                errorDetails = errorText.substring(0, 500);
              }
            } catch (e) {
              // Ignore error reading response body
            }
            
            console.error(`[${requestId}] Graphy API 401 Unauthorized - Invalid session:`, {
              status: response.status,
              statusText: response.statusText,
              contentType,
              errorDetails
            });
            
            const error = new Error('Invalid session! You must be logged in for this operation');
            (error as any).upstreamStatus = response.status;
            (error as any).upstreamContentType = contentType;
            (error as any).upstreamSnippet = errorDetails;
            (error as any).errorCode = 'GRAPHY_INVALID_SESSION';
            (error as any).isAuthError = true;
            
            // Handle authentication error
            this.handleAuthError(error);
            throw error;
          }
          
          // Check if response is HTML (error page) instead of JSON
          if (contentType && contentType.includes('text/html')) {
            const htmlText = await response.text();
            const htmlSnippet = htmlText.substring(0, 2048); // First 2KB
            console.error(`[${requestId}] Graphy API returned HTML instead of JSON:`, {
              status: response.status,
              statusText: response.statusText,
              contentType,
              htmlSnippet
            });
            
            // Create a structured error with upstream details
            const error = new Error(`Graphy API returned HTML error page (${response.status}): ${response.statusText}`);
            (error as any).upstreamStatus = response.status;
            (error as any).upstreamContentType = contentType;
            (error as any).upstreamSnippet = htmlSnippet;
            (error as any).errorCode = 'GRAPHY_HTML_RESPONSE';
            throw error;
          }
          
          // For other non-2xx responses, try to get JSON error details
          let errorDetails = '';
          try {
            const errorText = await response.text();
            if (errorText) {
              errorDetails = errorText.substring(0, 500);
            }
          } catch (e) {
            // Ignore error reading response body
          }
          
          console.error(`[${requestId}] Graphy API error response:`, {
            status: response.status,
            statusText: response.statusText,
            contentType,
            errorDetails
          });
          
          const error = new Error(`Graphy API error (${response.status}): ${response.statusText}`);
          (error as any).upstreamStatus = response.status;
          (error as any).upstreamContentType = contentType;
          (error as any).upstreamSnippet = errorDetails;
          (error as any).errorCode = 'GRAPHY_API_ERROR';
          throw error;
        }

        // Check if response is actually JSON
        if (!contentType || !contentType.includes('application/json')) {
          const textResponse = await response.text();
          const textSnippet = textResponse.substring(0, 2048); // First 2KB
          console.error(`[${requestId}] Graphy API returned non-JSON response:`, {
            contentType,
            textSnippet
          });
          
          const error = new Error(`Graphy API returned non-JSON response: ${contentType}`);
          (error as any).upstreamStatus = response.status;
          (error as any).upstreamContentType = contentType;
          (error as any).upstreamSnippet = textSnippet;
          (error as any).errorCode = 'GRAPHY_NON_JSON_RESPONSE';
          throw error;
        }

        const data = await response.json();
        console.log(`[${requestId}] Graphy API success:`, {
          dataType: typeof data,
          dataKeys: data && typeof data === 'object' ? Object.keys(data) : 'not-object',
          dataSize: JSON.stringify(data).length
        });

        // Cache the result
        if (useCache && cacheKey && cacheTtl) {
          this.cache.set(cacheKey, data, cacheTtl);
          console.log(`[${requestId}] Cached response for ${endpoint}`);
        }

        return data;
      } catch (error) {
        lastError = error as Error;
        retries--;
        
        console.error(`[${requestId}] Graphy API request failed (${retries} retries left):`, {
          error: error instanceof Error ? error.message : String(error),
          retriesLeft: retries
        });
        
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, this.config.RETRY_DELAY));
        }
      }
    }

    console.error(`[${requestId}] Graphy API request failed after all retries:`, {
      finalError: lastError instanceof Error ? lastError.message : String(lastError)
    });
    
    throw lastError || new Error('Request failed after retries');
  }

  // Learner methods
  async getLearnerByEmail(email: string): Promise<GraphyLearner | null> {
    const cacheKey = `learner:email:${email}`;
    const cached = this.cache.get<GraphyLearner>(cacheKey);
    if (cached) return cached;

    // Check if API is configured
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here' || this.config.API_KEY === '') {
      console.error('Graphy API not configured - API_KEY is missing or invalid');
      console.error('Please set GRAPHY_API_KEY and GRAPHY_SECRET_KEY in your environment variables');
      console.error('Get your API keys from: https://help.graphy.com/support/solutions/articles/1060000131905-how-to-use-apis-to-get-data-from-your-graphy-course-platform-');
      throw new Error('Graphy API not configured. Please set GRAPHY_API_KEY and GRAPHY_SECRET_KEY environment variables.');
    }

    try {
      console.log(`🔍 Fetching learner data for email: ${email}`);
      
      // Try different API endpoint structures
      const mid = this.config.MID;
      const endpoints = [
        `/api/v1/learners?email=${encodeURIComponent(email)}`,
        `/api/v1/users?email=${encodeURIComponent(email)}`,
        `/api/v1/students?email=${encodeURIComponent(email)}`,
        `/learners?email=${encodeURIComponent(email)}`,
        `/users?email=${encodeURIComponent(email)}`,
        // Try with merchant ID in path
        ...(mid ? [
          `/api/v1/${mid}/learners?email=${encodeURIComponent(email)}`,
          `/api/v1/${mid}/users?email=${encodeURIComponent(email)}`,
          `/api/v1/${mid}/students?email=${encodeURIComponent(email)}`,
          `/${mid}/learners?email=${encodeURIComponent(email)}`,
          `/${mid}/users?email=${encodeURIComponent(email)}`
        ] : [])
      ];
      
      let response: any = null;
      let lastError: Error | null = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log(`🔍 Trying endpoint: ${endpoint}`);
          response = await this.makeRequest<{ data: GraphyLearner[] }>(
            endpoint,
            { method: 'GET' },
            true,
            cacheKey,
            DASHBOARD_CONFIG.CACHE.STATIC_TTL
          );
          console.log(`👤 Graphy API response for learner:`, response);
          break; // Success, exit the loop
        } catch (error) {
          console.log(`❌ Endpoint ${endpoint} failed:`, error instanceof Error ? error.message : String(error));
          lastError = error as Error;
          continue; // Try next endpoint
        }
      }
      
      if (!response) {
        throw lastError || new Error('All Graphy API endpoints failed');
      }

      const learner = response.data?.find((l: GraphyLearner) => l.email.toLowerCase() === email.toLowerCase());
      if (learner) {
        this.cache.set(cacheKey, learner, DASHBOARD_CONFIG.CACHE.STATIC_TTL);
      }
      return learner || null;
    } catch (error) {
      console.error('Error fetching learner by email:', error);
      throw error; // Don't fall back to mock data
    }
  }

  async getLearnerById(learnerId: string, includeCourseInfo = true): Promise<GraphyLearner | null> {
    const cacheKey = `learner:id:${learnerId}:${includeCourseInfo}`;
    
    try {
      const response = await this.makeRequest<{ data: GraphyLearner }>(
        `/api/v1/learners/${learnerId}?include_courses=${includeCourseInfo}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.STATIC_TTL
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching learner by ID:', error);
      return null;
    }
  }

  // Product methods
  async getProduct(productId: string): Promise<GraphyProduct | null> {
    const cacheKey = `product:${productId}`;
    
    // Check if API is configured
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      console.error('Graphy API not configured - API_KEY is missing or invalid');
      throw new Error('Graphy API not configured');
    }
    
    try {
      const response = await this.makeRequest<{ data: GraphyProduct }>(
        `/api/v1/products/${productId}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.STATIC_TTL
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error; // Don't fall back to mock data
    }
  }

  async getLearnerEnrollments(learnerId: string): Promise<GraphyEnrollment[]> {
    const cacheKey = `enrollments:${learnerId}`;
    
    // Check if API is configured
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      console.error('Graphy API not configured - API_KEY is missing or invalid');
      throw new Error('Graphy API not configured');
    }
    
    try {
      console.log(`📚 Fetching enrollments for learner: ${learnerId}`);
      const response = await this.makeRequest<{ data: GraphyEnrollment[] }>(
        `/api/v1/learners/${learnerId}/enrollments`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL
      );
      console.log(`📚 Graphy API enrollments response:`, response);

      return response.data || [];
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      throw error; // Don't fall back to mock data
    }
  }

  // Progress methods
  async getCourseProgressReport(productId: string, learnerId: string): Promise<GraphyProgressReport | null> {
    const cacheKey = `progress:${productId}:${learnerId}`;
    
    // Check if API is configured
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      console.error('Graphy API not configured - API_KEY is missing or invalid');
      throw new Error('Graphy API not configured');
    }
    
    try {
      const response = await this.makeRequest<{ data: GraphyProgressReport }>(
        `/api/v1/courses/${productId}/progress/${learnerId}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching progress report:', error);
      throw error; // Don't fall back to mock data
    }
  }

  async getLearnerUsage(learnerId: string, days = 7): Promise<GraphyUsage[]> {
    const cacheKey = `usage:${learnerId}:${days}`;
    
    // Check if API is configured
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      console.error('Graphy API not configured - API_KEY is missing or invalid');
      throw new Error('Graphy API not configured');
    }
    
    try {
      const response = await this.makeRequest<{ data: GraphyUsage[] }>(
        `/api/v1/learners/${learnerId}/analytics/usage?days=${days}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL
      );

      return response.data || [];
    } catch (error) {
      console.error('Error fetching usage:', error);
      throw error; // Don't fall back to mock data
    }
  }

  // Activity methods
  async getLearnerDiscussions(learnerId: string, limit = 20, skip = 0): Promise<GraphyDiscussion[]> {
    // Check if API is configured
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      console.error('Graphy API not configured - API_KEY is missing or invalid');
      throw new Error('Graphy API not configured');
    }
    
    try {
      const response = await this.makeRequest<{ data: GraphyDiscussion[] }>(
        `/api/v1/learners/${learnerId}/discussions?limit=${limit}&offset=${skip}`,
        { method: 'GET' },
        false // Don't cache discussions as they're real-time
      );

      return response.data || [];
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
      const response = await this.makeRequest<{ data: GraphyQuizReport[] }>(
        `/api/v1/learners/${learnerId}/quiz-reports?limit=${limit}&offset=${skip}`,
        { method: 'GET' },
        false // Don't cache quiz reports as they're real-time
      );

      return response.data || [];
    } catch (error) {
      console.error('Error fetching quiz reports:', error);
      return [];
    }
  }

  async getLearnerTransactions(learnerId: string, limit = 20, skip = 0): Promise<GraphyTransaction[]> {
    // Check if API is configured
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      console.error('Graphy API not configured - API_KEY is missing or invalid');
      throw new Error('Graphy API not configured');
    }
    
    try {
      const response = await this.makeRequest<{ data: GraphyTransaction[] }>(
        `/api/v1/learners/${learnerId}/transactions?limit=${limit}&offset=${skip}`,
        { method: 'GET' },
        false // Don't cache transactions as they're real-time
      );

      return response.data || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error; // Don't fall back to mock data
    }
  }

  // Admin methods
  async assignCourse(learnerId: string, productId: string): Promise<boolean> {
    try {
      await this.makeRequest(
        `/api/v1/admin/learners/${learnerId}/enrollments`,
        {
          method: 'POST',
          body: JSON.stringify({ product_id: productId }),
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
        `/api/v1/admin/enrollments/${enrollmentId}`,
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
        `/api/v1/admin/transactions/${transactionId}/refund`,
        {
          method: 'POST',
          body: JSON.stringify({ refund_amount: amount }),
        }
      );

      return true;
    } catch (error) {
      console.error('Error processing refund:', error);
      return false;
    }
  }

  // Mock data methods - NO LONGER USED (removed fallbacks to force real API usage)
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

  // Additional methods for dashboard
  async getAllProducts(limit = 100, offset = 0): Promise<GraphyProduct[]> {
    const cacheKey = `all-products:${limit}:${offset}`;
    
    // Check if API is configured
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      console.error('Graphy API not configured - API_KEY is missing or invalid');
      throw new Error('Graphy API not configured');
    }
    
    try {
      const response = await this.makeRequest<{ data: GraphyProduct[] }>(
        `/api/v1/products?limit=${limit}&offset=${offset}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.STATIC_TTL
      );

      return response.data || [];
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error; // Don't fall back to mock data
    }
  }

  async getPopularProducts(limit = 10): Promise<GraphyProduct[]> {
    const cacheKey = `popular-products:${limit}`;
    
    // Check if API is configured
    if (!this.config.API_KEY || this.config.API_KEY === 'your_graphy_api_key_here') {
      console.error('Graphy API not configured - API_KEY is missing or invalid');
      throw new Error('Graphy API not configured');
    }
    
    try {
      const response = await this.makeRequest<{ data: GraphyProduct[] }>(
        `/api/v1/products/popular?limit=${limit}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.STATIC_TTL
      );

      return response.data || [];
    } catch (error) {
      console.error('Error fetching popular products:', error);
      throw error; // Don't fall back to mock data
    }
  }

  // New API methods based on actual Graphy API documentation
  
  // v1 API Methods
  
  /**
   * Create a new learner using v1 API
   */
  async createLearner(params: {
    email: string;
    name?: string;
    password?: string;
    mobile?: string;
    sendEmail?: boolean;
    customFields?: Record<string, any>;
  }): Promise<{ success: boolean; learnerId?: string; message?: string }> {
    const formData = new URLSearchParams();
    formData.append('mid', this.config.MID);
    formData.append('key', this.config.API_KEY);
    formData.append('email', params.email);
    
    if (params.name) formData.append('name', params.name);
    if (params.password) formData.append('password', params.password);
    if (params.mobile) formData.append('mobile', params.mobile);
    if (params.sendEmail !== undefined) formData.append('sendEmail', params.sendEmail.toString());
    if (params.customFields) formData.append('customFields', JSON.stringify(params.customFields));

    try {
      const response = await this.makeRequest<{ success: boolean; learnerId?: string; message?: string }>(
        '/learners',
        {
          method: 'POST',
          body: formData.toString(),
        },
        false,
        undefined,
        undefined,
        true // useFormData
      );
      return response;
    } catch (error) {
      console.error('Error creating learner:', error);
      throw error;
    }
  }

  /**
   * Update course validity for a learner
   */
  async updateCourseValidity(params: {
    email: string;
    productId: string;
    validityDate: string; // yyyy-mm-dd format
  }): Promise<{ success: boolean; message?: string }> {
    const formData = new URLSearchParams();
    formData.append('mid', this.config.MID);
    formData.append('key', this.config.API_KEY);
    formData.append('email', params.email);
    formData.append('productId', params.productId);
    formData.append('validityDate', params.validityDate);

    try {
      const response = await this.makeRequest<{ success: boolean; message?: string }>(
        '/learners/validity/update',
        {
          method: 'POST',
          body: formData.toString(),
        },
        false,
        undefined,
        undefined,
        true // useFormData
      );
      return response;
    } catch (error) {
      console.error('Error updating course validity:', error);
      throw error;
    }
  }

  /**
   * Get quiz reports for a specific quiz
   */
  async getQuizReports(params: {
    quizId: string;
    date?: string; // yyyy/MM/dd format
    skip?: number;
    limit?: number;
  }): Promise<GraphyQuizReport[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('mid', this.config.MID);
    queryParams.append('key', this.config.API_KEY);
    if (params.date) queryParams.append('date', params.date);
    if (params.skip !== undefined) queryParams.append('skip', params.skip.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());

    const cacheKey = `quiz-reports:${params.quizId}:${params.date || 'all'}:${params.skip || 0}:${params.limit || 10}`;

    try {
      const response = await this.makeRequest<{ data: GraphyQuizReport[] }>(
        `/quizzes/${params.quizId}/reports?${queryParams.toString()}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL
      );
      return response.data || [];
    } catch (error) {
      console.error('Error fetching quiz reports:', error);
      throw error;
    }
  }

  /**
   * Get transactions with filtering options
   */
  async getTransactions(params: {
    skip?: number;
    limit?: number;
    startDate?: string; // yyyy/MM/dd or yyyy/MM/ddThh:mm:ss
    endDate?: string;
    status?: 'initiated' | 'success' | 'refund';
    channel?: 'web' | 'android' | 'ios';
    type?: 'free' | 'paid';
  } = {}): Promise<GraphyTransaction[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('mid', this.config.MID);
    queryParams.append('key', this.config.API_KEY);
    if (params.skip !== undefined) queryParams.append('skip', params.skip.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.status) queryParams.append('status', params.status);
    if (params.channel) queryParams.append('channel', params.channel);
    if (params.type) queryParams.append('type', params.type);

    const cacheKey = `transactions:${JSON.stringify(params)}`;

    try {
      const response = await this.makeRequest<{ data: GraphyTransaction[] }>(
        `/transactions?${queryParams.toString()}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL
      );
      return response.data || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  /**
   * Get learner usage statistics
   */
  async getLearnerUsageV1(params: {
    learnerId: string;
    productId: string;
    date?: string; // yyyy/MM/dd format
  }): Promise<GraphyUsage[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('mid', this.config.MID);
    queryParams.append('key', this.config.API_KEY);
    queryParams.append('productId', params.productId);
    if (params.date) queryParams.append('date', params.date);

    const cacheKey = `learner-usage-v1:${params.learnerId}:${params.productId}:${params.date || 'all'}`;

    try {
      const response = await this.makeRequest<{ data: GraphyUsage[] }>(
        `/learners/${params.learnerId}/usage?${queryParams.toString()}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL
      );
      return response.data || [];
    } catch (error) {
      console.error('Error fetching learner usage:', error);
      throw error;
    }
  }

  /**
   * Get learner discussions
   */
  async getLearnerDiscussionsV1(params: {
    learnerId: string;
    startDate?: string; // yyyy/MM/dd format
    endDate?: string;
  }): Promise<GraphyDiscussion[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('mid', this.config.MID);
    queryParams.append('key', this.config.API_KEY);
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);

    const cacheKey = `learner-discussions-v1:${params.learnerId}:${params.startDate || 'all'}:${params.endDate || 'all'}`;

    try {
      const response = await this.makeRequest<{ data: GraphyDiscussion[] }>(
        `/learners/${params.learnerId}/discussions?${queryParams.toString()}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL
      );
      return response.data || [];
    } catch (error) {
      console.error('Error fetching learner discussions:', error);
      throw error;
    }
  }

  // v3 API Methods

  /**
   * Get active learners for products (v3 API)
   */
  async getActiveLearners(params: {
    productIds: string[]; // comma-separated or array
    dateFrom: string; // yyyy/MM/dd format
    dateTo: string; // yyyy/MM/dd format
    skip?: number;
    limit?: number;
  }): Promise<{ learnerId: string; productId: string; lastActive: string; activityCount: number }[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('mid', this.config.MID);
    queryParams.append('key', this.config.API_KEY);
    queryParams.append('productIds', Array.isArray(params.productIds) ? params.productIds.join(',') : params.productIds);
    queryParams.append('dateFrom', params.dateFrom);
    queryParams.append('dateTo', params.dateTo);
    if (params.skip !== undefined) queryParams.append('skip', params.skip.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());

    const cacheKey = `active-learners:${params.productIds.join(',')}:${params.dateFrom}:${params.dateTo}:${params.skip || 0}:${params.limit || 10}`;

    try {
      const response = await this.makeRequest<{ data: any[] }>(
        `/products/activelearners?${queryParams.toString()}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL,
        false, // useFormData
        this.config.BASE_URL_V3 // baseUrl
      );
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching active learners:', error);
      throw error;
    }
  }

  /**
   * Get course progress reports (v3 API)
   */
  async getCourseProgressReportsV3(params: {
    productIds: string[]; // comma-separated or array
    skip?: number;
    limit?: number;
  }): Promise<GraphyProgressReport[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('mid', this.config.MID);
    queryParams.append('key', this.config.API_KEY);
    queryParams.append('productIds', Array.isArray(params.productIds) ? params.productIds.join(',') : params.productIds);
    if (params.skip !== undefined) queryParams.append('skip', params.skip.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());

    const cacheKey = `course-progress-v3:${params.productIds.join(',')}:${params.skip || 0}:${params.limit || 10}`;

    try {
      const response = await this.makeRequest<{ data: GraphyProgressReport[] }>(
        `/products/courseprogressreports?${queryParams.toString()}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL,
        false, // useFormData
        this.config.BASE_URL_V3 // baseUrl
      );
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching course progress reports:', error);
      throw error;
    }
  }

  /**
   * Get live class attendees (v3 API)
   */
  async getLiveClassAttendees(params: {
    liveClassId: string;
    skip?: number;
    limit?: number;
  }): Promise<{ learnerId: string; name: string; email: string; joinedAt: string; leftAt?: string; duration: number }[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('mid', this.config.MID);
    queryParams.append('key', this.config.API_KEY);
    queryParams.append('liveClassId', params.liveClassId);
    if (params.skip !== undefined) queryParams.append('skip', params.skip.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());

    const cacheKey = `live-class-attendees:${params.liveClassId}:${params.skip || 0}:${params.limit || 10}`;

    try {
      const response = await this.makeRequest<{ data: any[] }>(
        `/products/liveclass/attendees?${queryParams.toString()}`,
        { method: 'GET' },
        true,
        cacheKey,
        DASHBOARD_CONFIG.CACHE.DYNAMIC_TTL,
        false, // useFormData
        this.config.BASE_URL_V3 // baseUrl
      );
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching live class attendees:', error);
      throw error;
    }
  }

  // Authentication error handling
  setAuthErrorHandler(handler: (error: Error) => void): void {
    this.authErrorHandler = handler;
  }

  private handleAuthError(error: Error): void {
    console.error('Graphy API authentication error:', error);
    if (this.authErrorHandler) {
      this.authErrorHandler(error);
    } else {
      // Default behavior: redirect to login or show error message
      console.warn('No auth error handler set. User should be redirected to login.');
    }
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
