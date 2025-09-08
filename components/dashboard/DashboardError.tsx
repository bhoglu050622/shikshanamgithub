/**
 * Dashboard Error Component
 * Error state for the dashboard page
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';

interface DashboardErrorProps {
  error: string;
  onRetry: () => void;
}

export function DashboardError({ error, onRetry }: DashboardErrorProps) {
  const getErrorIcon = (errorMessage: string) => {
    if (errorMessage.includes('email') || errorMessage.includes('Email')) {
      return <Mail className="h-12 w-12" />;
    }
    return <AlertTriangle className="h-12 w-12" />;
  };

  const getErrorTitle = (errorMessage: string): string => {
    if (errorMessage.includes('email') || errorMessage.includes('Email')) {
      return 'Email Required';
    }
    if (errorMessage.includes('not found') || errorMessage.includes('No learner')) {
      return 'Learner Not Found';
    }
    if (errorMessage.includes('Rate limit') || errorMessage.includes('temporarily unavailable')) {
      return 'Service Temporarily Unavailable';
    }
    if (errorMessage.includes('Failed to build dashboard') || errorMessage.includes('service error')) {
      return 'Dashboard Service Error';
    }
    return 'Something Went Wrong';
  };

  const getErrorDescription = (errorMessage: string): string => {
    if (errorMessage.includes('email') || errorMessage.includes('Email')) {
      return 'Please provide a valid email address to access your dashboard.';
    }
    if (errorMessage.includes('not found') || errorMessage.includes('No learner')) {
      return 'We couldn\'t find a learner account with the provided email address. Please check your email or contact support.';
    }
    if (errorMessage.includes('Rate limit') || errorMessage.includes('temporarily unavailable')) {
      return 'Our servers are experiencing high traffic. Please wait a moment and try again.';
    }
    if (errorMessage.includes('Failed to build dashboard') || errorMessage.includes('service error')) {
      return 'We\'re having trouble loading your dashboard data. Please try again in a few moments.';
    }
    return 'An unexpected error occurred while loading your dashboard. Please try again.';
  };

  const getSuggestedActions = (errorMessage: string) => {
    if (errorMessage.includes('email') || errorMessage.includes('Email')) {
      return [
        { label: 'Go to Homepage', action: 'home', icon: Home },
        { label: 'Try Again', action: 'retry', icon: RefreshCw },
      ];
    }
    if (errorMessage.includes('not found') || errorMessage.includes('No learner')) {
      return [
        { label: 'Contact Support', action: 'support', icon: Mail },
        { label: 'Try Again', action: 'retry', icon: RefreshCw },
      ];
    }
    return [
      { label: 'Try Again', action: 'retry', icon: RefreshCw },
      { label: 'Go to Homepage', action: 'home', icon: Home },
    ];
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'retry':
        onRetry();
        break;
      case 'home':
        window.location.href = '/';
        break;
      case 'support':
        window.location.href = 'mailto:support@shikshanam.com';
        break;
    }
  };

  const suggestedActions = getSuggestedActions(error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto p-8 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          {/* Error Icon */}
          <div className="text-red-500 dark:text-red-400 mx-auto mb-6">
            {getErrorIcon(error)}
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {getErrorTitle(error)}
          </h1>

          {/* Error Description */}
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {getErrorDescription(error)}
          </p>

          {/* Error Details (for debugging) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {error}
              </p>
            </div>
          )}

          {/* Suggested Actions */}
          <div className="space-y-3">
            {suggestedActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant={action.action === 'retry' ? 'primary' : 'outline'}
                  className={`w-full ${
                    action.action === 'retry' 
                      ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                      : ''
                  }`}
                  onClick={() => handleAction(action.action)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              );
            })}
          </div>

          {/* Additional Help */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-500">
              If the problem persists, please contact our support team at{' '}
              <a 
                href="mailto:support@shikshanam.com" 
                className="text-orange-600 dark:text-orange-400 hover:underline"
              >
                support@shikshanam.com
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
