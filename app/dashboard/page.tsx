/**
 * Student Dashboard Page
 * Main dashboard page that displays personalized learning data for logged-in users
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';
import Image from 'next/image';
import IndianPatterns from '@/components/ornaments/IndianPatterns';
import { DashboardSummary } from '../../components/dashboard/DashboardSummary';
import { CourseCards } from '../../components/dashboard/CourseCards';
import { ActivityFeed } from '../../components/dashboard/ActivityFeed';
import { Recommendations } from '../../components/dashboard/Recommendations';
import { Transactions } from '../../components/dashboard/Transactions';
import { DashboardSkeleton } from '../../components/dashboard/DashboardSkeleton';
import { DashboardError } from '../../components/dashboard/DashboardError';
import { DharmaAnalysis } from '../../components/dashboard/DharmaAnalysis';
import { GunaAnalysis } from '../../components/dashboard/GunaAnalysis';
import { PointsSystem } from '../../components/dashboard/PointsSystem';
import { LoadingOverlay, SkeletonComponents } from '@/components/ui/LoadingStates';
import LoadingModal from '@/components/ui/LoadingModal';
import { useAuth } from '@/lib/auth-context';
import { useRealTimeRecommendations } from '@/lib/hooks/useRealTimeRecommendations';
import { fetchWithAuth, isAuthError } from '@/lib/fetch-with-auth';
import type { DashboardData } from '@/lib/dashboard/dashboard-service';

// Client-side only motion wrapper to prevent hydration issues
const ClientOnlyMotion = dynamic(() => Promise.resolve(motion.div), { 
  ssr: false,
  loading: () => <div />
}) as typeof motion.div;


export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn, user, isInitialized, logout } = useAuth();
  
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [dataSource, setDataSource] = useState<string>('unknown');
  const [activeTab, setActiveTab] = useState<'courses' | 'dharma' | 'guna'>('courses');
  const [dharmaProgress, setDharmaProgress] = useState<{hasProfile: boolean, quizCount: number}>({hasProfile: false, quizCount: 0});
  const [showLoadingModal, setShowLoadingModal] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Real-time recommendations
  const {
    recommendations: realTimeRecommendations,
    learnerProfile,
    generatedAt,
    isLoading: recommendationsLoading,
    error: recommendationsError,
    refresh: refreshRecommendations
  } = useRealTimeRecommendations({
    email: user?.email || '',
    refreshInterval: 300000, // 5 minutes
    enabled: isLoggedIn && !!user?.email
  });

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setShowLoadingModal(true);
      setLoadingProgress(0);

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev < 90) {
            return prev + Math.random() * 15;
          }
          return prev;
        });
      }, 200);

      console.log('Fetching real dashboard data from Graphy...');
      setLoadingProgress(20);
      
      const response = await fetchWithAuth('/api/dashboard/real-data');
      
      console.log('Response status:', response.status);
      setLoadingProgress(50);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        
        // Handle authentication errors specifically
        if (isAuthError(response) || (response.status === 401 && errorData.code === 'INVALID_SESSION')) {
          console.error('Authentication error: Invalid session');
          setError('Your session has expired. Please log in again.');
          // Clear auth state and redirect to login
          logout();
          router.push('/auth/login?message=session_expired');
          return;
        }
        
        throw new Error(errorData.message || 'Failed to fetch dashboard data');
      }

      const result = await response.json();
      console.log('Dashboard data received:', result);
      setLoadingProgress(80);
      
      // Log data source for debugging
      if (result.metadata?.cacheStatus === 'real-data-from-graphy') {
        console.log('✅ Using REAL data from Graphy API');
        setDataSource('graphy');
      } else if (result.metadata?.fallbackData === true) {
        console.log('🔄 Using fallback data - Graphy API unavailable');
        setDataSource('fallback');
      } else {
        console.log('⚠️ Using mock/cached data - Graphy API may not be configured');
        setDataSource('mock');
      }
      
      setDashboardData(result.data);
      setLastRefresh(new Date());
      setLoadingProgress(100);
      
      clearInterval(progressInterval);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      
      // Handle specific Graphy API errors
      if (errorMessage.includes('Invalid session') || errorMessage.includes('You must be logged in')) {
        setError('Your session has expired. Please log in again.');
        logout();
        router.push('/auth/login?message=session_expired');
      } else if (errorMessage.includes('Learner not found')) {
        setError('No courses found for your account. Please check if you\'re logged in with the correct email or contact support.');
      } else if (errorMessage.includes('Dashboard service error')) {
        setError('Unable to connect to course data. Please try again in a few moments.');
      } else if (errorMessage.includes('Authentication required')) {
        setError('Please log in to view your dashboard.');
        router.push('/?login=true');
        return;
      } else {
        setError(errorMessage);
      }
      setShowLoadingModal(false);
    } finally {
      setLoading(false);
    }
  }, [router, logout]);

  useEffect(() => {
    // Wait for auth to initialize
    if (!isInitialized) {
      return;
    }

    // Redirect to login if not authenticated
    if (!isLoggedIn || !user) {
      setShowLoadingModal(false);
      router.push('/?login=true');
      return;
    }

    fetchDashboardData();
    
    // Check dharma progress
    try {
      const storedProfile = localStorage.getItem('dharma-path-profile');
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setDharmaProgress({
          hasProfile: !!parsedProfile.selectedAvatar,
          quizCount: parsedProfile.quizResults?.length || 0
        });
      }
    } catch (error) {
      console.error('Error checking dharma progress:', error);
    }
  }, [isInitialized, isLoggedIn, user, router, fetchDashboardData]);

  // Auto-refresh dashboard data every 10 minutes
  useEffect(() => {
    if (!isLoggedIn || !user || !dashboardData) return;

    const autoRefreshInterval = setInterval(() => {
      console.log('Auto-refreshing dashboard data...');
      fetchDashboardData();
    }, 600000); // 10 minutes

    return () => clearInterval(autoRefreshInterval);
  }, [isLoggedIn, user, dashboardData, fetchDashboardData]);

  const handleRefresh = () => {
    if (isLoggedIn && user) {
      console.log('Manual refresh triggered...');
      fetchDashboardData();
      refreshRecommendations(); // Also refresh recommendations
    }
  };

  const handleLoadingComplete = () => {
    setShowLoadingModal(false);
    setLoadingProgress(0);
  };

  // Helper function to format currency
  const formatCurrency = (amount: number, currency: string) => {
    if (amount === 0) return 'Free';
    if (currency === 'INR') return `₹${amount.toLocaleString()}`;
    if (currency === 'USD') return `$${amount.toLocaleString()}`;
    return `${amount.toLocaleString()} ${currency}`;
  };

  return (
    <ErrorBoundary>
      {/* Loading Modal - Always render, controlled by showLoadingModal */}
      <LoadingModal
        isVisible={showLoadingModal}
        progress={loadingProgress}
        message="Loading your dashboard..."
        onComplete={handleLoadingComplete}
      />
      
      {loading ? (
        <DashboardSkeleton />
      ) : error ? (
        <DashboardError error={error} onRetry={handleRefresh} />
      ) : !dashboardData ? (
        <DashboardError error="No dashboard data available" onRetry={handleRefresh} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 transition-colors duration-300 overflow-x-hidden">
        <IndianPatterns />
        <main className="main-container" role="main">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
          
          {/* Modern Header with User Profile */}
          <ClientOnlyMotion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-golden-olive to-copper-orange rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {dashboardData.learner.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">
                      Welcome back, {dashboardData.learner.name}!
                    </h1>
                    <p className="text-slate-600 text-sm">
                      {dashboardData.learner.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-slate-500">Active learner</span>
                      {dharmaProgress.hasProfile && (
                        <>
                          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                          <span className="text-xs text-saffron-600">🕉️ Spiritual Journey</span>
                        </>
                      )}
                      {lastRefresh && (
                        <span className="text-xs text-slate-400 ml-2">
                          • Updated {lastRefresh.toLocaleTimeString()}
                        </span>
                      )}
                      {dataSource === 'graphy' && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full ml-2">
                          ✅ Live Data
                        </span>
                      )}
                      {dataSource === 'mock' && (
                        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full ml-2">
                          ⚠️ Demo Data
                        </span>
                      )}
                      {dataSource === 'fallback' && (
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full ml-2">
                          🔄 Fallback Mode
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </button>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">
                      {dashboardData.summary.totalCourses}
                    </div>
                    <div className="text-xs text-slate-500">Total Courses</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {dashboardData.summary.completedCourses}
                    </div>
                    <div className="text-xs text-slate-500">Completed</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-saffron-600">
                      {Math.round((dashboardData.summary.completedCourses / Math.max(dashboardData.summary.totalCourses, 1)) * 100)}%
                    </div>
                    <div className="text-xs text-slate-500">Progress</div>
                  </div>
                </div>
              </div>
            </div>
          </ClientOnlyMotion>

          {/* API Status Banner */}
          {dataSource === 'fallback' && (
            <ClientOnlyMotion
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900">API Service Temporarily Unavailable</h3>
                    <p className="text-sm text-blue-700">
                      We're experiencing connectivity issues with our course data service. 
                      You're seeing demo data while we work to restore full functionality.
                    </p>
                  </div>
                </div>
              </div>
            </ClientOnlyMotion>
          )}

          {/* Enhanced Dashboard Summary Cards */}
          <ClientOnlyMotion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Learning Time Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Learning Time</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {Math.floor(dashboardData.summary.totalLearningTime / 60)}h {dashboardData.summary.totalLearningTime % 60}m
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Current Streak Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Current Streak</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {dashboardData.summary.streakDays} days
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">In Progress</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {dashboardData.summary.inProgressCourses}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Certificates Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Certificates</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {dashboardData.summary.totalCertificates}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </ClientOnlyMotion>

          {/* Tab Navigation */}
          <ClientOnlyMotion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2">
              <div className="flex space-x-2">
                {[
                  { id: 'courses', label: 'My Courses', icon: '📚' },
                  { id: 'dharma', label: 'Spiritual Journey', icon: '🕉️' },
                  { id: 'guna', label: 'Guna Analysis', icon: '⚖️' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-saffron-100 text-saffron-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </ClientOnlyMotion>

          {/* Tab Content */}
          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left Column - Courses */}
            <div className="xl:col-span-2 space-y-8">
              {/* Course Cards Section */}
              <ClientOnlyMotion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Your Courses</h2>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span>{dashboardData.products.length} courses</span>
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    <span>{dashboardData.summary.completedCourses} completed</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dashboardData.products.map((course, index) => (
                    <ClientOnlyMotion
                      key={course.product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                    >
                      <div className="relative">
                        <Image
                          src={course.product.thumbnail}
                          alt={course.product.title}
                          width={400}
                          height={192}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.progressReport?.progressPercentage === 100 
                              ? 'bg-green-100 text-green-800' 
                              : (course.progressReport?.progressPercentage ?? 0) > 0
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {course.progressReport?.progressPercentage === 100 ? 'Completed' : 
                             (course.progressReport?.progressPercentage ?? 0) > 0 ? 'In Progress' : 'Not Started'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-slate-800 text-lg leading-tight line-clamp-2">
                            {course.product.title}
                          </h3>
                        </div>
                        
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {course.product.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                              <Image
                                src={course.product.instructor.profilePicture || '/images/default-avatar.png'}
                                alt={course.product.instructor.name}
                                width={24}
                                height={24}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-slate-600">{course.product.instructor.name}</span>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.product.price === 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {formatCurrency(course.product.price, course.product.currency)}
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                            <span>Progress</span>
                            <span>{course.progressReport?.progressPercentage || 0}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progressReport?.progressPercentage || 0}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2">
                          {course.progressReport?.progressPercentage === 100 ? (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                              </svg>
                              View Certificate
                            </>
                          ) : (course.progressReport?.progressPercentage ?? 0) > 0 ? (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Continue Learning
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              Start Course
                            </>
                          )}
                        </button>
                      </div>
                    </ClientOnlyMotion>
                  ))}
                </div>
              </ClientOnlyMotion>

              {/* Activity Feed */}
              <ClientOnlyMotion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {dashboardData.activityTimeline.map((activity, index) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800">{activity.title}</p>
                          <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                          <p className="text-xs text-slate-500 mt-2">
                            {new Date(activity.timestamp).toLocaleDateString()} at {new Date(activity.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ClientOnlyMotion>
            </div>

            {/* Right Column - Recommendations and Quick Stats */}
            <div className="space-y-6">
              
              {/* Real-time Recommendations */}
              <ClientOnlyMotion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Recommended for You</h2>
                    <div className="flex items-center gap-2">
                      {recommendationsLoading && (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      )}
                      <button
                        onClick={refreshRecommendations}
                        className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
                        title="Refresh recommendations"
                      >
                        Refresh
                      </button>
                    </div>
                  </div>
                  
                  {recommendationsLoading ? (
                    <SkeletonComponents.NavigationMenu />
                  ) : recommendationsError ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-red-600 mb-2">Failed to load recommendations</p>
                      <button
                        onClick={refreshRecommendations}
                        className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Try again
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {realTimeRecommendations.length > 0 ? (
                        realTimeRecommendations.map((rec, index) => (
                          <div key={rec.productId} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                            <Image
                              src={rec.product.thumbnail}
                              alt={rec.product.title}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-slate-800 text-sm line-clamp-2">{rec.product.title}</h3>
                              <p className="text-xs text-slate-600 mt-1">{rec.reason}</p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${
                                    rec.score > 0.8 ? 'bg-green-500' :
                                    rec.score > 0.6 ? 'bg-yellow-500' : 'bg-blue-500'
                                  }`}></div>
                                  <span className="text-xs text-slate-500">{Math.round(rec.score * 100)}% match</span>
                                </div>
                                <span className={`text-xs font-medium ${
                                  rec.product.price === 0 
                                    ? 'text-green-600' 
                                    : 'text-blue-600'
                                }`}>
                                  {formatCurrency(rec.product.price, rec.product.currency)}
                                </span>
                              </div>
                              {rec.realTimeFactors && (
                                <div className="mt-1">
                                  <span className="text-xs text-slate-400">
                                    {rec.realTimeFactors.timeOfDay >= 6 && rec.realTimeFactors.timeOfDay <= 10 && '🌅 Morning pick'}
                                    {rec.realTimeFactors.timeOfDay >= 18 && rec.realTimeFactors.timeOfDay <= 22 && '🌙 Evening study'}
                                    {rec.realTimeFactors.learningStreak && '⭐ Advanced learner'}
                                    {rec.realTimeFactors.recentActivity > 0 && '🔥 Hot streak'}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-sm text-slate-500 mb-2">No recommendations available</p>
                          <p className="text-xs text-slate-400">Complete some courses to get personalized recommendations</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {generatedAt && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-xs text-slate-400 text-center">
                        Last updated: {new Date(generatedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  )}
                </div>
              </ClientOnlyMotion>

              {/* Quick Stats */}
              <ClientOnlyMotion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">Learning Insights</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Average Score</span>
                      <span className="font-bold text-slate-800">{dashboardData.summary.averageCompletionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Longest Streak</span>
                      <span className="font-bold text-slate-800">{dashboardData.summary.streakDays} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Investment</span>
                      <span className="font-bold text-slate-800">₹{dashboardData.summary.totalLearningTime.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </ClientOnlyMotion>
            </div>
          </div>
          )}

          {/* Dharma Analysis Tab */}
          {activeTab === 'dharma' && (
            <ClientOnlyMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-saffron-50 to-orange-50 border border-saffron-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Spiritual Journey Tools</h3>
                    <p className="text-slate-600 text-sm">
                      Explore your spiritual nature and discover your dharma path
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => window.location.href = '/dharma-path'}
                      className="px-4 py-2 bg-saffron-600 hover:bg-saffron-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Start Dharma Path
                    </button>
                    <button
                      onClick={() => window.location.href = '/guna-profiler'}
                      className="px-4 py-2 bg-white hover:bg-slate-50 text-saffron-700 border border-saffron-300 rounded-lg text-sm font-medium transition-colors"
                    >
                      Take Guna Profiler
                    </button>
                  </div>
                </div>
              </div>
              
              <DharmaAnalysis userEmail={user?.email} />
            </ClientOnlyMotion>
          )}

          {/* Guna Analysis Tab */}
          {activeTab === 'guna' && (
            <ClientOnlyMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Guna Profiler</h3>
                    <p className="text-slate-600 text-sm">
                      Discover your balance of Sattva, Rajas, and Tamas - the three fundamental qualities of nature
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => window.location.href = '/guna-profiler'}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Take Guna Profiler
                    </button>
                    <button
                      onClick={() => window.location.href = '/dharma-path'}
                      className="px-4 py-2 bg-white hover:bg-slate-50 text-blue-700 border border-blue-300 rounded-lg text-sm font-medium transition-colors"
                    >
                      Explore Dharma Path
                    </button>
                  </div>
                </div>
              </div>
              
              <GunaAnalysis userEmail={user?.email} />
            </ClientOnlyMotion>
          )}
          </div>
        </main>
      </div>
      )}
    </ErrorBoundary>
  );
}
