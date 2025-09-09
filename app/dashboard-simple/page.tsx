/**
 * Simple Dashboard Page
 * A simplified version that works without complex dependencies
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface DashboardData {
  learner: {
    id: string;
    email: string;
    name: string;
  };
  summary: {
    totalCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    totalLearningTime: number;
    averageCompletionRate: number;
  };
  products: Array<{
    product: {
      id: string;
      title: string;
      description: string;
      thumbnail: string;
    };
    progressReport?: {
      progressPercentage: number;
      completedLessons: number;
      totalLessons: number;
    };
  }>;
}

export default function SimpleDashboardPage() {
  const [email, setEmail] = useState('test@example.com');
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/dashboard/by-email?email=${encodeURIComponent(email)}`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || 'Failed to fetch dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      fetchDashboard();
    }
  }, [email, fetchDashboard]);

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>
        Student Dashboard
      </h1>

      {/* Email Input */}
      <div style={{ marginBottom: '30px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter student email"
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginRight: '10px',
            width: '300px'
          }}
        />
        <button
          onClick={fetchDashboard}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Load Dashboard'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Dashboard Content */}
      {data && (
        <div>
          {/* Learner Info */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#333', marginBottom: '10px' }}>
              Welcome, {data.learner.name}!
            </h2>
            <p style={{ color: '#666', margin: 0 }}>
              Email: {data.learner.email}
            </p>
          </div>

          {/* Summary Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#333', margin: '0 0 10px 0' }}>
                {data.summary.totalCourses}
              </h3>
              <p style={{ color: '#666', margin: 0 }}>Total Courses</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#28a745', margin: '0 0 10px 0' }}>
                {data.summary.completedCourses}
              </h3>
              <p style={{ color: '#666', margin: 0 }}>Completed</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#007bff', margin: '0 0 10px 0' }}>
                {data.summary.inProgressCourses}
              </h3>
              <p style={{ color: '#666', margin: 0 }}>In Progress</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#ffc107', margin: '0 0 10px 0' }}>
                {Math.round(data.summary.averageCompletionRate)}%
              </h3>
              <p style={{ color: '#666', margin: 0 }}>Avg. Progress</p>
            </div>
          </div>

          {/* Courses */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>
              Your Courses
            </h2>
            
            {data.products.map((item, index) => (
              <div key={index} style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  width={100}
                  height={60}
                  style={{
                    width: '100px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#333', margin: '0 0 5px 0' }}>
                    {item.product.title}
                  </h3>
                  <p style={{ color: '#666', margin: '0 0 10px 0' }}>
                    {item.product.description}
                  </p>
                  
                  {item.progressReport && (
                    <div>
                      <div style={{
                        backgroundColor: '#e9ecef',
                        borderRadius: '4px',
                        height: '8px',
                        marginBottom: '5px'
                      }}>
                        <div style={{
                          backgroundColor: '#007bff',
                          height: '100%',
                          borderRadius: '4px',
                          width: `${item.progressReport.progressPercentage}%`,
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                      <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                        {item.progressReport.completedLessons}/{item.progressReport.totalLessons} lessons 
                        ({Math.round(item.progressReport.progressPercentage)}% complete)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
