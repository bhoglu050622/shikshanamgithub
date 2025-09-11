/**
 * Enhanced Error Boundary Component
 * Provides graceful error handling with user-friendly messages
 * Now uses the centralized error handling system
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { ErrorBoundary as EnhancedErrorBoundary } from '@/lib/error/error-boundary';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

// Legacy ErrorBoundary - now wraps the enhanced version
export class ErrorBoundary extends Component<Props, State> {
  render() {
    return (
      <EnhancedErrorBoundary
        onError={this.props.onError}
        resetOnPropsChange={true}
        resetKeys={[this.state.errorId]}
      >
        {this.props.children}
      </EnhancedErrorBoundary>
    );
  }
}

// Hook for functional components to trigger error boundary
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: any) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // Re-throw to trigger error boundary
    throw error;
  };
};

// Higher-order component for error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};
