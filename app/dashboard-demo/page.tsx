/**
 * Dashboard Demo Page
 * Demonstrates how to use the dashboard system
 */

'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ArrowRight, Mail, BookOpen, Users, TrendingUp } from 'lucide-react';

export default function DashboardDemoPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleViewDashboard = () => {
    if (email.trim()) {
      window.open(`/dashboard?email=${encodeURIComponent(email.trim())}`, '_blank');
    }
  };

  const demoEmails = [
    'student@example.com',
    'learner@shikshanam.com',
    'demo@test.com'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Student Dashboard Demo
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Experience our comprehensive student dashboard system with personalized learning analytics, 
            course recommendations, and progress tracking.
          </p>
        </div>

        {/* Demo Form */}
        <div className="max-w-md mx-auto mb-12">
          <Card className="p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Enter Student Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button 
                onClick={handleViewDashboard}
                disabled={!email.trim() || isLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                {isLoading ? 'Loading...' : 'View Dashboard'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center">
                <p className="text-sm text-slate-500 dark:text-slate-500 mb-3">
                  Or try these demo emails:
                </p>
                <div className="space-y-2">
                  {demoEmails.map((demoEmail) => (
                    <button
                      key={demoEmail}
                      onClick={() => setEmail(demoEmail)}
                      className="block w-full text-sm text-orange-600 dark:text-orange-400"
                    >
                      {demoEmail}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Course Management
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Track progress, resume lessons, and manage your learning journey
            </p>
          </Card>

          <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Smart Recommendations
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              AI-powered course suggestions based on your learning patterns
            </p>
          </Card>

          <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Activity Tracking
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Monitor your learning activity and engagement over time
            </p>
          </Card>

          <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Personalized Experience
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Customized dashboard based on your learning preferences
            </p>
          </Card>
        </div>

        {/* API Documentation */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              API Integration
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  Dashboard API Endpoint
                </h3>
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                  <code className="text-sm text-slate-800 dark:text-slate-200">
                    GET /api/dashboard/by-email?email=student@example.com
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  Admin API Endpoints
                </h3>
                <div className="space-y-2">
                  <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                    <code className="text-sm text-slate-800 dark:text-slate-200">
                      POST /api/admin/assign-course
                    </code>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                    <code className="text-sm text-slate-800 dark:text-slate-200">
                      DELETE /api/admin/unassign-course
                    </code>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                    <code className="text-sm text-slate-800 dark:text-slate-200">
                      POST /api/admin/process-refund
                    </code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  Features
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Real-time progress tracking and analytics</li>
                  <li>• Intelligent course recommendations</li>
                  <li>• Comprehensive activity timeline</li>
                  <li>• Secure admin management tools</li>
                  <li>• Rate limiting and caching</li>
                  <li>• Error handling and monitoring</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
