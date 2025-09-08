/**
 * Simple Dashboard Test
 * Test the dashboard system without complex dependencies
 */

'use client';

import { useState } from 'react';

export default function SimpleTestPage() {
  const [email, setEmail] = useState('test@example.com');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/dashboard/by-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      setResult({ status: response.status, data });
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard API Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <button
          onClick={testAPI}
          disabled={loading}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: loading ? '#ccc' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px' 
          }}
        >
          {loading ? 'Testing...' : 'Test API'}
        </button>
      </div>

      {result && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #dee2e6', 
          borderRadius: '4px',
          whiteSpace: 'pre-wrap',
          fontSize: '12px'
        }}>
          {JSON.stringify(result, null, 2)}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>Available Pages:</h3>
        <ul>
          <li><a href="/dashboard-demo">Dashboard Demo</a></li>
          <li><a href="/test-dashboard">API Test</a></li>
          <li><a href="/dashboard?email=test@example.com">Full Dashboard</a></li>
        </ul>
      </div>
    </div>
  );
}
