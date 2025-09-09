/**
 * Enhanced Dashboard Page
 * Modern design with real-time capabilities
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface DashboardData {
  learner: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
  summary: {
    totalCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    totalLearningTime: number;
    averageCompletionRate: number;
    streakDays: number;
    certificatesEarned: number;
  };
  products: Array<{
    product: {
      id: string;
      title: string;
      description: string;
      thumbnail: string;
      category: string;
      level?: string;
      duration?: string;
    };
    progressReport?: {
      progressPercentage: number;
      completedLessons: number;
      totalLessons: number;
      lastWatchedAt: string;
      timeSpent: number;
    };
  }>;
  recentActivity: Array<{
    id: string;
    type: 'lesson_completed' | 'quiz_passed' | 'certificate_earned' | 'course_enrolled';
    title: string;
    description: string;
    timestamp: string;
    courseTitle: string;
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    level?: string;
    reason: string;
    score: number;
  }>;
}

export default function EnhancedDashboardPage() {
  const [email, setEmail] = useState('test@example.com');
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/dashboard/by-email?email=${encodeURIComponent(email)}`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setLastUpdated(new Date());
      } else {
        setError(result.message || 'Failed to fetch dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  }, [email]);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchDashboard, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, fetchDashboard]);

  useEffect(() => {
    if (email) {
      fetchDashboard();
    }
  }, [email, fetchDashboard]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson_completed': return '📚';
      case 'quiz_passed': return '✅';
      case 'certificate_earned': return '🏆';
      case 'course_enrolled': return '🎯';
      default: return '📝';
    }
  };

  const getLevelColor = (level: string | undefined) => {
    if (!level) return '#6b7280';
    switch (level.toLowerCase()) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      color: '#1e293b'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ 
              fontSize: '1.875rem', 
              fontWeight: '700', 
              color: '#1e293b',
              margin: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Shikshanam Dashboard
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  style={{ transform: 'scale(1.1)' }}
                />
                Auto-refresh
              </label>
              
              {lastUpdated && (
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Email Input */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Student Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter student email address"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
            
            <button
              onClick={fetchDashboard}
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: loading ? '#94a3b8' : '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => !loading && ((e.target as HTMLElement).style.backgroundColor = '#5a67d8')}
              onMouseOut={(e) => !loading && ((e.target as HTMLElement).style.backgroundColor = '#667eea')}
            >
              {loading ? '⏳' : '🔄'} {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>⚠️</span>
            <div>
              <strong style={{ color: '#dc2626' }}>Error:</strong>
              <span style={{ color: '#dc2626', marginLeft: '0.5rem' }}>{error}</span>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {data && (
          <div>
            {/* Welcome Section */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '2rem',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '200px',
                height: '200px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-10%',
                width: '150px',
                height: '150px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  margin: '0 0 0.5rem 0',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  Welcome back, {data.learner.name}! 👋
                </h2>
                <p style={{ 
                  fontSize: '1.125rem', 
                  opacity: 0.9, 
                  margin: 0,
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                  Ready to continue your learning journey?
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {[
                { 
                  title: 'Total Courses', 
                  value: data.summary.totalCourses, 
                  icon: '📚', 
                  color: '#3b82f6',
                  bgColor: '#dbeafe'
                },
                { 
                  title: 'Completed', 
                  value: data.summary.completedCourses, 
                  icon: '✅', 
                  color: '#10b981',
                  bgColor: '#d1fae5'
                },
                { 
                  title: 'In Progress', 
                  value: data.summary.inProgressCourses, 
                  icon: '🚀', 
                  color: '#f59e0b',
                  bgColor: '#fef3c7'
                },
                { 
                  title: 'Learning Time', 
                  value: formatTime(data.summary.totalLearningTime), 
                  icon: '⏱️', 
                  color: '#8b5cf6',
                  bgColor: '#ede9fe'
                },
                { 
                  title: 'Progress Rate', 
                  value: `${Math.round(data.summary.averageCompletionRate)}%`, 
                  icon: '📊', 
                  color: '#06b6d4',
                  bgColor: '#cffafe'
                },
                { 
                  title: 'Streak Days', 
                  value: data.summary.streakDays, 
                  icon: '🔥', 
                  color: '#ef4444',
                  bgColor: '#fee2e2'
                }
              ].map((stat, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '12px',
                      backgroundColor: stat.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {stat.icon}
                    </div>
                    <div>
                      <p style={{ 
                        fontSize: '2rem', 
                        fontWeight: '700', 
                        color: stat.color,
                        margin: 0,
                        lineHeight: 1
                      }}>
                        {stat.value}
                      </p>
                      <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#64748b',
                        margin: 0,
                        fontWeight: '500'
                      }}>
                        {stat.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {/* Courses Section */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  color: '#1e293b',
                  margin: '0 0 1.5rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  📚 Your Courses
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {data.products.map((item, index) => (
                    <div key={index} style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <Image
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          width={80}
                          height={60}
                          style={{
                            width: '80px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            flexShrink: 0
                          }}
                        />
                        
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                            <h4 style={{ 
                              fontSize: '1.125rem', 
                              fontWeight: '600', 
                              color: '#1e293b',
                              margin: 0,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {item.product.title}
                            </h4>
                            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                              <span style={{
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                backgroundColor: getLevelColor(item.product.level) + '20',
                                color: getLevelColor(item.product.level),
                                borderRadius: '4px'
                              }}>
                                {item.product.level || 'All Levels'}
                              </span>
                              <span style={{
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                backgroundColor: '#f1f5f9',
                                color: '#64748b',
                                borderRadius: '4px'
                              }}>
                                {item.product.duration || 'Self-paced'}
                              </span>
                            </div>
                          </div>
                          
                          <p style={{ 
                            color: '#64748b', 
                            fontSize: '0.875rem',
                            margin: '0 0 1rem 0',
                            lineHeight: 1.5
                          }}>
                            {item.product.description}
                          </p>
                          
                          {item.progressReport && (
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                  Progress
                                </span>
                                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                  {item.progressReport.completedLessons}/{item.progressReport.totalLessons} lessons
                                </span>
                              </div>
                              <div style={{
                                backgroundColor: '#e2e8f0',
                                borderRadius: '6px',
                                height: '8px',
                                marginBottom: '0.5rem',
                                overflow: 'hidden'
                              }}>
                                <div style={{
                                  backgroundColor: '#667eea',
                                  height: '100%',
                                  borderRadius: '6px',
                                  width: `${item.progressReport.progressPercentage}%`,
                                  transition: 'width 0.3s ease'
                                }} />
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                  {Math.round(item.progressReport.progressPercentage)}% complete
                                </span>
                                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                  {formatTime(item.progressReport.timeSpent)} spent
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Recent Activity */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '700', 
                    color: '#1e293b',
                    margin: '0 0 1rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    🕒 Recent Activity
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {data.recentActivity.slice(0, 5).map((activity, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0'
                      }}>
                        <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>
                          {getActivityIcon(activity.type)}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ 
                            fontSize: '0.875rem', 
                            fontWeight: '600', 
                            color: '#1e293b',
                            margin: '0 0 0.25rem 0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {activity.title}
                          </p>
                          <p style={{ 
                            fontSize: '0.75rem', 
                            color: '#64748b',
                            margin: '0 0 0.25rem 0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {activity.courseTitle}
                          </p>
                          <p style={{ 
                            fontSize: '0.75rem', 
                            color: '#94a3b8',
                            margin: 0
                          }}>
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '700', 
                    color: '#1e293b',
                    margin: '0 0 1rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    💡 Recommendations
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {data.recommendations.slice(0, 3).map((rec, index) => (
                      <div key={index} style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#667eea';
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <Image
                            src={rec.thumbnail}
                            alt={rec.title}
                            width={40}
                            height={30}
                            style={{
                              width: '40px',
                              height: '30px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              flexShrink: 0
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ 
                              fontSize: '0.875rem', 
                              fontWeight: '600', 
                              color: '#1e293b',
                              margin: '0 0 0.25rem 0',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {rec.title}
                            </p>
                            <p style={{ 
                              fontSize: '0.75rem', 
                              color: '#64748b',
                              margin: 0,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {rec.reason}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
