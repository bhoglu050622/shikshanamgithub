'use client';

interface OnboardingState {
  hasSeenWelcome: boolean;
  hasCompletedTour: boolean;
  lastTourDate: string | null;
  completedSteps: string[];
  userPreferences: {
    autoPlay: boolean;
    showTips: boolean;
    skipAnimations: boolean;
  };
}

const STORAGE_KEY = 'shikshanam-cms-onboarding';

export class OnboardingManager {
  private static instance: OnboardingManager;
  private state: OnboardingState;

  private constructor() {
    this.state = this.loadState();
  }

  public static getInstance(): OnboardingManager {
    if (!OnboardingManager.instance) {
      OnboardingManager.instance = new OnboardingManager();
    }
    return OnboardingManager.instance;
  }

  private loadState(): OnboardingState {
    if (typeof window === 'undefined') {
      return this.getDefaultState();
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...this.getDefaultState(), ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load onboarding state:', error);
    }

    return this.getDefaultState();
  }

  private getDefaultState(): OnboardingState {
    return {
      hasSeenWelcome: false,
      hasCompletedTour: false,
      lastTourDate: null,
      completedSteps: [],
      userPreferences: {
        autoPlay: true,
        showTips: true,
        skipAnimations: false
      }
    };
  }

  private saveState(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (error) {
      console.warn('Failed to save onboarding state:', error);
    }
  }

  public isFirstTimeVisitor(): boolean {
    return !this.state.hasSeenWelcome;
  }

  public hasCompletedTour(): boolean {
    return this.state.hasCompletedTour;
  }

  public shouldShowTour(): boolean {
    // Show tour if:
    // 1. First time visitor, OR
    // 2. Haven't completed tour, OR
    // 3. Last tour was more than 30 days ago
    if (this.isFirstTimeVisitor() || !this.hasCompletedTour()) {
      return true;
    }

    if (this.state.lastTourDate) {
      const lastTour = new Date(this.state.lastTourDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return lastTour < thirtyDaysAgo;
    }

    return false;
  }

  public markWelcomeSeen(): void {
    this.state.hasSeenWelcome = true;
    this.saveState();
  }

  public markTourCompleted(): void {
    this.state.hasCompletedTour = true;
    this.state.lastTourDate = new Date().toISOString();
    this.saveState();
  }

  public markStepCompleted(stepId: string): void {
    if (!this.state.completedSteps.includes(stepId)) {
      this.state.completedSteps.push(stepId);
      this.saveState();
    }
  }

  public isStepCompleted(stepId: string): boolean {
    return this.state.completedSteps.includes(stepId);
  }

  public updatePreferences(preferences: Partial<OnboardingState['userPreferences']>): void {
    this.state.userPreferences = { ...this.state.userPreferences, ...preferences };
    this.saveState();
  }

  public getPreferences(): OnboardingState['userPreferences'] {
    return { ...this.state.userPreferences };
  }

  public reset(): void {
    this.state = this.getDefaultState();
    this.saveState();
  }

  public getProgress(): { completed: number; total: number; percentage: number } {
    const totalSteps = this.getTotalSteps();
    const completed = this.state.completedSteps.length;
    return {
      completed,
      total: totalSteps,
      percentage: totalSteps > 0 ? Math.round((completed / totalSteps) * 100) : 0
    };
  }

  private getTotalSteps(): number {
    // This would be dynamic based on the current page
    // For now, return a default number
    return 6;
  }

  public getNextStep(currentStep: string): string | null {
    const stepOrder = [
      'welcome',
      'quick-stats',
      'navigation',
      'visual-builder',
      'templates',
      'design-system',
      'mobile-preview',
      'ai-assistant'
    ];

    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex === -1 || currentIndex === stepOrder.length - 1) {
      return null;
    }

    return stepOrder[currentIndex + 1];
  }

  public getPreviousStep(currentStep: string): string | null {
    const stepOrder = [
      'welcome',
      'quick-stats',
      'navigation',
      'visual-builder',
      'templates',
      'design-system',
      'mobile-preview',
      'ai-assistant'
    ];

    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex <= 0) {
      return null;
    }

    return stepOrder[currentIndex - 1];
  }
}

// Hook for React components
export function useOnboarding() {
  const manager = OnboardingManager.getInstance();

  return {
    isFirstTimeVisitor: manager.isFirstTimeVisitor(),
    hasCompletedTour: manager.hasCompletedTour(),
    shouldShowTour: manager.shouldShowTour(),
    markWelcomeSeen: () => manager.markWelcomeSeen(),
    markTourCompleted: () => manager.markTourCompleted(),
    markStepCompleted: (stepId: string) => manager.markStepCompleted(stepId),
    isStepCompleted: (stepId: string) => manager.isStepCompleted(stepId),
    updatePreferences: (preferences: Partial<OnboardingState['userPreferences']>) => 
      manager.updatePreferences(preferences),
    getPreferences: () => manager.getPreferences(),
    getProgress: () => manager.getProgress(),
    reset: () => manager.reset()
  };
}

// Utility functions
export function detectPageType(pathname: string): string {
  if (pathname.includes('/cms/edit/')) {
    return 'cms-edit';
  }
  if (pathname.includes('/cms/analytics')) {
    return 'cms-analytics';
  }
  if (pathname.includes('/cms')) {
    return 'cms-dashboard';
  }
  return 'unknown';
}

export function getPageTitle(pageType: string): string {
  switch (pageType) {
    case 'cms-dashboard':
      return 'CMS Dashboard';
    case 'cms-edit':
      return 'Content Editor';
    case 'cms-analytics':
      return 'Analytics Dashboard';
    default:
      return 'CMS';
  }
}
