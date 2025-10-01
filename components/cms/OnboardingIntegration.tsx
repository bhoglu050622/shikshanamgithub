'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Play, 
  X, 
  Lightbulb,
  BookOpen,
  Settings
} from 'lucide-react';

// Import our components
import OnScreenGuide from './OnScreenGuide';
import WelcomeModal from './WelcomeModal';
import HelpSystem from './HelpSystem';
import { useOnboarding, detectPageType } from '@/lib/cms/onboarding';

interface OnboardingIntegrationProps {
  children: React.ReactNode;
}

export default function OnboardingIntegration({ children }: OnboardingIntegrationProps) {
  const pathname = usePathname();
  const pageType = detectPageType(pathname);
  
  const {
    isFirstTimeVisitor,
    hasCompletedTour,
    shouldShowTour,
    markWelcomeSeen,
    markTourCompleted
  } = useOnboarding();

  const [showWelcome, setShowWelcome] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showHelpButton, setShowHelpButton] = useState(false);

  // Check if we should show welcome modal
  useEffect(() => {
    if (isFirstTimeVisitor && pathname.includes('/cms')) {
      setShowWelcome(true);
    }
  }, [isFirstTimeVisitor, pathname]);

  // Check if we should show tour
  useEffect(() => {
    if (shouldShowTour && pathname.includes('/cms') && !showWelcome) {
      setShowTour(true);
    }
  }, [shouldShowTour, pathname, showWelcome]);

  // Show help button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelpButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartTour = () => {
    setShowWelcome(false);
    setShowTour(true);
  };

  const handleSkipWelcome = () => {
    setShowWelcome(false);
    markWelcomeSeen();
  };

  const handleCompleteTour = () => {
    setShowTour(false);
    markTourCompleted();
  };

  const handleCloseTour = () => {
    setShowTour(false);
  };

  const handleShowHelp = () => {
    setShowHelp(true);
  };

  const handleCloseHelp = () => {
    setShowHelp(false);
  };

  return (
    <>
      {children}
      
      {/* Welcome Modal */}
      <WelcomeModal
        isVisible={showWelcome}
        onStartTour={handleStartTour}
        onSkip={handleSkipWelcome}
        pageType={pageType}
      />

      {/* On-Screen Guide */}
      <OnScreenGuide
        isVisible={showTour}
        onClose={handleCloseTour}
        onComplete={handleCompleteTour}
        currentPage={pageType}
      />

      {/* Help System */}
      <HelpSystem
        isVisible={showHelp}
        onClose={handleCloseHelp}
        currentPage={pageType}
      />

      {/* Floating Help Button */}
      {showHelpButton && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="flex flex-col items-end space-y-2">
            {/* Help Button */}
            <Button
              onClick={handleShowHelp}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
              title="Get Help"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>

            {/* Tour Button (if not completed) */}
            {!hasCompletedTour && (
              <Button
                onClick={() => setShowTour(true)}
                variant="outline"
                className="bg-white hover:bg-gray-50 text-gray-700 rounded-full p-3 shadow-lg border"
                title="Start Tour"
              >
                <Play className="w-5 h-5" />
              </Button>
            )}

            {/* Quick Tips Badge */}
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              <Lightbulb className="w-3 h-3 inline mr-1" />
              Pro Tips Available
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Help Button */}
      <div className="fixed top-4 right-4 z-40">
        <div className="flex items-center space-x-2">
          {!hasCompletedTour && (
            <Button
              onClick={() => setShowTour(true)}
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-50 text-gray-700 shadow-lg"
            >
              <Play className="w-4 h-4 mr-1" />
              Start Tour
            </Button>
          )}
          
          <Button
            onClick={handleShowHelp}
            variant="outline"
            size="sm"
            className="bg-white hover:bg-gray-50 text-gray-700 shadow-lg"
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Help
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      {showTour && (
        <div className="fixed top-4 left-4 z-40">
          <div className="bg-white rounded-lg shadow-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Tour in Progress</span>
            </div>
          </div>
        </div>
      )}

      {/* Contextual Help Hints */}
      {pathname.includes('/cms/edit/') && (
        <div className="fixed bottom-20 left-4 z-30">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-xs">
            <div className="flex items-start space-x-2">
              <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800 font-medium">Editor Tip</p>
                <p className="text-xs text-blue-700">
                  Use the Visual Builder tab to drag and drop content blocks for easier editing.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {pathname.includes('/cms/analytics') && (
        <div className="fixed bottom-20 left-4 z-30">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 max-w-xs">
            <div className="flex items-start space-x-2">
              <Settings className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-green-800 font-medium">Analytics Tip</p>
                <p className="text-xs text-green-700">
                  Click on any metric to see detailed breakdowns and trends over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
