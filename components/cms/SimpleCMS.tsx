'use client';

import React, { useState, useEffect } from 'react';

export default function SimpleCMS() {
  const [loading, setLoading] = useState(true);
  const [contentTypes, setContentTypes] = useState<any[]>([]);

  useEffect(() => {
    console.log('SimpleCMS: useEffect triggered');
    
    // Simulate loading
    const timeout = setTimeout(() => {
      console.log('SimpleCMS: Timeout reached, setting content types');
      setContentTypes([
        { id: 'homepage', name: 'Homepage', description: 'Main homepage content', status: 'active', category: 'main' },
        { id: 'about', name: 'About', description: 'About page content', status: 'active', category: 'main' },
        { id: 'contact', name: 'Contact', description: 'Contact page content', status: 'active', category: 'main' },
        { id: 'blog', name: 'Blog Posts', description: 'Blog content management', status: 'coming-soon', category: 'content' },
        { id: 'sanskrit-course', name: 'Sanskrit Course', description: 'Sanskrit language course', status: 'active', category: 'education' }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Simple CMS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Content Management System</h1>
          <p className="text-slate-600">Manage your website content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentTypes.map((contentType) => (
            <div key={contentType.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">{contentType.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  contentType.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : contentType.status === 'coming-soon'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {contentType.status}
                </span>
              </div>
              <p className="text-slate-600 mb-4">{contentType.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 capitalize">{contentType.category}</span>
                <button className="px-4 py-2 bg-saffron-600 text-white rounded-md hover:bg-saffron-700 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
