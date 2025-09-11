/**
 * ErrorBoundary Component Tests
 * Comprehensive testing for error boundary functionality
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing';
import { ErrorBoundary } from '@/lib/error/error-boundary';
import { ErrorType } from '@/lib/error/types';

// Mock component that throws an error
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Mock component that throws an async error
const ThrowAsyncError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  React.useEffect(() => {
    if (shouldThrow) {
      Promise.reject(new Error('Async test error'));
    }
  }, [shouldThrow]);
  
  return <div>No async error</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error for expected errors
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Basic Error Handling', () => {
    it('renders children when there is no error', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByText('No error')).toBeInTheDocument();
    });

    it('renders error fallback when child throws error', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText(/We're sorry, but something unexpected happened/)).toBeInTheDocument();
    });

    it('displays error ID for tracking', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const errorIdElement = screen.getByText(/Error ID:/);
      expect(errorIdElement).toBeInTheDocument();
      expect(errorIdElement.textContent).toMatch(/error_\d+_\w+/);
    });
  });

  describe('Error Recovery', () => {
    it('allows retry after error', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      const retryButton = screen.getByText('Try Again');
      fireEvent.click(retryButton);

      // Rerender with no error
      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByText('No error')).toBeInTheDocument();
    });

    it('calls custom onError handler when provided', () => {
      const onError = jest.fn();
      
      render(
        <ErrorBoundary onError={onError}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });
  });

  describe('Development Mode', () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    it('shows error details in development mode', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Error Details (Development)')).toBeInTheDocument();
      expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('shows stack trace in development mode', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const detailsElement = screen.getByText('Error Details (Development)');
      fireEvent.click(detailsElement);

      expect(screen.getByText('Stack Trace')).toBeInTheDocument();
    });
  });

  describe('Production Mode', () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    it('hides error details in production mode', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.queryByText('Error Details (Development)')).not.toBeInTheDocument();
      expect(screen.queryByText('Test error')).not.toBeInTheDocument();
    });
  });

  describe('Custom Fallback', () => {
    const CustomFallback = ({ error, errorId }: { error?: Error; errorId?: string }) => (
      <div data-testid="custom-fallback">
        <h1>Custom Error Fallback</h1>
        <p>Error: {error?.message}</p>
        <p>ID: {errorId}</p>
      </div>
    );

    it('renders custom fallback when provided', () => {
      render(
        <ErrorBoundary fallback={CustomFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
      expect(screen.getByText('Custom Error Fallback')).toBeInTheDocument();
      expect(screen.getByText('Error: Test error')).toBeInTheDocument();
    });
  });

  describe('Reset on Props Change', () => {
    it('resets error boundary when resetKeys change', () => {
      const { rerender } = render(
        <ErrorBoundary resetKeys={['key1']}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Change reset key
      rerender(
        <ErrorBoundary resetKeys={['key2']}>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByText('No error')).toBeInTheDocument();
    });
  });
});

describe('AsyncErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('handles unhandled promise rejections', async () => {
    render(
      <ErrorBoundary>
        <ThrowAsyncError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Wait for async error to be caught
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(screen.getByText('Async Error')).toBeInTheDocument();
  });

  it('allows retry after async error', async () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowAsyncError shouldThrow={true} />
      </ErrorBoundary>
    );

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(screen.getByText('Async Error')).toBeInTheDocument();

    const retryButton = screen.getByText('Try Again');
    fireEvent.click(retryButton);

    // Rerender with no error
    rerender(
      <ErrorBoundary>
        <ThrowAsyncError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No async error')).toBeInTheDocument();
  });
});

describe('useErrorBoundary Hook', () => {
  it('provides error boundary functionality', () => {
    const TestComponent = () => {
      const { captureError } = useErrorBoundary();
      
      const handleError = () => {
        captureError(new Error('Hook error'));
      };

      return (
        <button onClick={handleError} data-testid="error-button">
          Trigger Error
        </button>
      );
    };

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    const button = screen.getByTestId('error-button');
    fireEvent.click(button);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
