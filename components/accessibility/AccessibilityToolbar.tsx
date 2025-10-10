/**
 * Accessibility Toolbar Component
 * Provides quick access to accessibility features
 */

'use client';

import React, { useState } from 'react';
import { useAccessibilityContext } from './AccessibilityProvider';
import { AccessibleButton } from './AccessibleButton';

interface AccessibilityToolbarProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showLabels?: boolean;
}

export function AccessibilityToolbar({
  className = '',
  position = 'top-right',
  showLabels = false,
}: AccessibilityToolbarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    preferences,
    toggleHighContrast,
    toggleLargeText,
    announce,
  } = useAccessibilityContext();

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  const handleToggleHighContrast = () => {
    toggleHighContrast();
    announce(
      preferences.highContrast 
        ? 'High contrast mode disabled' 
        : 'High contrast mode enabled'
    );
  };

  const handleToggleLargeText = () => {
    toggleLargeText();
    announce(
      preferences.largeText 
        ? 'Large text mode disabled' 
        : 'Large text mode enabled'
    );
  };

  const handleSkipToContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      announce('Skipped to main content');
    }
  };

  const handleSkipToNavigation = () => {
    const navigation = document.getElementById('navigation');
    if (navigation) {
      navigation.focus();
      announce('Skipped to navigation');
    }
  };

  return (
    <div
      className={`fixed z-50 ${positionClasses[position]} ${className}`}
      role="toolbar"
      aria-label="Accessibility tools"
    >
      <div className="flex flex-col space-y-2">
        {/* Main toggle button */}
        <AccessibleButton
          variant="primary"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls="accessibility-menu"
          announceOnClick
          announceText={isExpanded ? 'Accessibility menu closed' : 'Accessibility menu opened'}
          className="shadow-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
            />
          </svg>
          {showLabels && <span className="ml-2">Accessibility</span>}
        </AccessibleButton>

        {/* Expanded menu */}
        {isExpanded && (
          <div
            id="accessibility-menu"
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 space-y-1 min-w-[200px]"
            role="menu"
          >
            {/* Skip links */}
            <div className="border-b border-gray-200 pb-2 mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Skip Links
              </h3>
              <AccessibleButton
                variant="ghost"
                size="sm"
                onClick={handleSkipToContent}
                className="w-full justify-start text-sm"
                announceOnClick
                announceText="Skipped to main content"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Skip to Content
              </AccessibleButton>
              
              <AccessibleButton
                variant="ghost"
                size="sm"
                onClick={handleSkipToNavigation}
                className="w-full justify-start text-sm"
                announceOnClick
                announceText="Skipped to navigation"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Skip to Navigation
              </AccessibleButton>
            </div>

            {/* Display options */}
            <div className="border-b border-gray-200 pb-2 mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Display Options
              </h3>
              
              <AccessibleButton
                variant={preferences.highContrast ? "primary" : "ghost"}
                size="sm"
                onClick={handleToggleHighContrast}
                className="w-full justify-start text-sm"
                announceOnClick
                announceText={preferences.highContrast ? 'High contrast disabled' : 'High contrast enabled'}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                High Contrast
              </AccessibleButton>
              
              <AccessibleButton
                variant={preferences.largeText ? "primary" : "ghost"}
                size="sm"
                onClick={handleToggleLargeText}
                className="w-full justify-start text-sm"
                announceOnClick
                announceText={preferences.largeText ? 'Large text disabled' : 'Large text enabled'}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 8h-2v8h2V8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6" />
                </svg>
                Large Text
              </AccessibleButton>
            </div>

            {/* Keyboard shortcuts */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Keyboard Shortcuts
              </h3>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Alt + 1: Skip to content</div>
                <div>Alt + 2: Skip to navigation</div>
                <div>Alt + 3: Skip to footer</div>
                <div>Alt + H: Toggle high contrast</div>
                <div>Alt + T: Toggle large text</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
