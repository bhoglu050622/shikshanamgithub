'use client';

interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  success: string;
  warning: string;
  error: string;
}

interface BrandTypography {
  heading: string;
  body: string;
  button: string;
  caption: string;
}

interface BrandSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

interface BrandSettings {
  name: string;
  logo: string;
  colors: BrandColors;
  typography: BrandTypography;
  spacing: BrandSpacing;
  borderRadius: string;
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  animations: {
    duration: string;
    easing: string;
  };
}

const DEFAULT_BRAND: BrandSettings = {
  name: 'Shikshanam',
  logo: '/logo.svg',
  colors: {
    primary: '#3B82F6',
    secondary: '#64748B',
    accent: '#F59E0B',
    background: '#FFFFFF',
    text: '#1F2937',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  },
  typography: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    button: 'Inter, sans-serif',
    caption: 'Inter, sans-serif'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: '0.5rem',
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  animations: {
    duration: '0.3s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

export class BrandCustomizationManager {
  private static instance: BrandCustomizationManager;
  private settings: BrandSettings;

  private constructor() {
    this.settings = this.loadSettings();
  }

  public static getInstance(): BrandCustomizationManager {
    if (!BrandCustomizationManager.instance) {
      BrandCustomizationManager.instance = new BrandCustomizationManager();
    }
    return BrandCustomizationManager.instance;
  }

  private loadSettings(): BrandSettings {
    if (typeof window === 'undefined') {
      return DEFAULT_BRAND;
    }

    try {
      const stored = localStorage.getItem('shikshanam-brand-settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_BRAND, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load brand settings:', error);
    }

    return DEFAULT_BRAND;
  }

  private saveSettings(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('shikshanam-brand-settings', JSON.stringify(this.settings));
    } catch (error) {
      console.warn('Failed to save brand settings:', error);
    }
  }

  public getSettings(): BrandSettings {
    return { ...this.settings };
  }

  public updateSettings(updates: Partial<BrandSettings>): void {
    this.settings = { ...this.settings, ...updates };
    this.saveSettings();
    this.applyBrandStyles();
  }

  public updateColors(colors: Partial<BrandColors>): void {
    this.settings.colors = { ...this.settings.colors, ...colors };
    this.saveSettings();
    this.applyBrandStyles();
  }

  public updateTypography(typography: Partial<BrandTypography>): void {
    this.settings.typography = { ...this.settings.typography, ...typography };
    this.saveSettings();
    this.applyBrandStyles();
  }

  public applyBrandStyles(): void {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const { colors, typography, spacing, borderRadius, shadows, animations } = this.settings;

    // Apply CSS custom properties
    root.style.setProperty('--brand-primary', colors.primary);
    root.style.setProperty('--brand-secondary', colors.secondary);
    root.style.setProperty('--brand-accent', colors.accent);
    root.style.setProperty('--brand-background', colors.background);
    root.style.setProperty('--brand-text', colors.text);
    root.style.setProperty('--brand-success', colors.success);
    root.style.setProperty('--brand-warning', colors.warning);
    root.style.setProperty('--brand-error', colors.error);

    root.style.setProperty('--brand-font-heading', typography.heading);
    root.style.setProperty('--brand-font-body', typography.body);
    root.style.setProperty('--brand-font-button', typography.button);
    root.style.setProperty('--brand-font-caption', typography.caption);

    root.style.setProperty('--brand-spacing-xs', spacing.xs);
    root.style.setProperty('--brand-spacing-sm', spacing.sm);
    root.style.setProperty('--brand-spacing-md', spacing.md);
    root.style.setProperty('--brand-spacing-lg', spacing.lg);
    root.style.setProperty('--brand-spacing-xl', spacing.xl);

    root.style.setProperty('--brand-radius', borderRadius);
    root.style.setProperty('--brand-shadow-sm', shadows.sm);
    root.style.setProperty('--brand-shadow-md', shadows.md);
    root.style.setProperty('--brand-shadow-lg', shadows.lg);

    root.style.setProperty('--brand-duration', animations.duration);
    root.style.setProperty('--brand-easing', animations.easing);
  }

  public generateCSSVariables(): string {
    const { colors, typography, spacing, borderRadius, shadows, animations } = this.settings;

    return `
:root {
  /* Brand Colors */
  --brand-primary: ${colors.primary};
  --brand-secondary: ${colors.secondary};
  --brand-accent: ${colors.accent};
  --brand-background: ${colors.background};
  --brand-text: ${colors.text};
  --brand-success: ${colors.success};
  --brand-warning: ${colors.warning};
  --brand-error: ${colors.error};

  /* Brand Typography */
  --brand-font-heading: ${typography.heading};
  --brand-font-body: ${typography.body};
  --brand-font-button: ${typography.button};
  --brand-font-caption: ${typography.caption};

  /* Brand Spacing */
  --brand-spacing-xs: ${spacing.xs};
  --brand-spacing-sm: ${spacing.sm};
  --brand-spacing-md: ${spacing.md};
  --brand-spacing-lg: ${spacing.lg};
  --brand-spacing-xl: ${spacing.xl};

  /* Brand Design */
  --brand-radius: ${borderRadius};
  --brand-shadow-sm: ${shadows.sm};
  --brand-shadow-md: ${shadows.md};
  --brand-shadow-lg: ${shadows.lg};

  /* Brand Animations */
  --brand-duration: ${animations.duration};
  --brand-easing: ${animations.easing};
}
    `.trim();
  }

  public exportBrandSettings(): string {
    return JSON.stringify(this.settings, null, 2);
  }

  public importBrandSettings(settingsJson: string): boolean {
    try {
      const imported = JSON.parse(settingsJson);
      this.settings = { ...DEFAULT_BRAND, ...imported };
      this.saveSettings();
      this.applyBrandStyles();
      return true;
    } catch (error) {
      console.error('Failed to import brand settings:', error);
      return false;
    }
  }

  public resetToDefault(): void {
    this.settings = { ...DEFAULT_BRAND };
    this.saveSettings();
    this.applyBrandStyles();
  }

  public getBrandPreview(): {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  } {
    return {
      primary: this.settings.colors.primary,
      secondary: this.settings.colors.secondary,
      accent: this.settings.colors.accent,
      background: this.settings.colors.background,
      text: this.settings.colors.text
    };
  }
}

// Predefined brand themes
export const BRAND_THEMES = {
  'shikshanam-classic': {
    name: 'Shikshanam Classic',
    colors: {
      primary: '#8B4513',
      secondary: '#A0522D',
      accent: '#DAA520',
      background: '#FDF5E6',
      text: '#2F1B14'
    },
    typography: {
      heading: 'Playfair Display, serif',
      body: 'Source Serif Pro, serif',
      button: 'Source Serif Pro, serif',
      caption: 'Source Serif Pro, serif'
    }
  },
  'modern-minimal': {
    name: 'Modern Minimal',
    colors: {
      primary: '#3B82F6',
      secondary: '#64748B',
      accent: '#F59E0B',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    typography: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
      button: 'Inter, sans-serif',
      caption: 'Inter, sans-serif'
    }
  },
  'vibrant-energy': {
    name: 'Vibrant Energy',
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFE66D',
      background: '#FFFFFF',
      text: '#2C3E50'
    },
    typography: {
      heading: 'Poppins, sans-serif',
      body: 'Open Sans, sans-serif',
      button: 'Poppins, sans-serif',
      caption: 'Open Sans, sans-serif'
    }
  },
  'elegant-luxury': {
    name: 'Elegant Luxury',
    colors: {
      primary: '#2C3E50',
      secondary: '#7F8C8D',
      accent: '#E67E22',
      background: '#F8F9FA',
      text: '#2C3E50'
    },
    typography: {
      heading: 'Montserrat, sans-serif',
      body: 'Lato, sans-serif',
      button: 'Montserrat, sans-serif',
      caption: 'Lato, sans-serif'
    }
  },
  'natural-organic': {
    name: 'Natural Organic',
    colors: {
      primary: '#27AE60',
      secondary: '#8E44AD',
      accent: '#F39C12',
      background: '#FEFEFE',
      text: '#2C3E50'
    },
    typography: {
      heading: 'Nunito, sans-serif',
      body: 'Nunito Sans, sans-serif',
      button: 'Nunito, sans-serif',
      caption: 'Nunito Sans, sans-serif'
    }
  }
};

// Hook for React components
export function useBrandCustomization() {
  const manager = BrandCustomizationManager.getInstance();

  return {
    settings: manager.getSettings(),
    updateSettings: (updates: Partial<BrandSettings>) => manager.updateSettings(updates),
    updateColors: (colors: Partial<BrandColors>) => manager.updateColors(colors),
    updateTypography: (typography: Partial<BrandTypography>) => manager.updateTypography(typography),
    applyBrandStyles: () => manager.applyBrandStyles(),
    generateCSSVariables: () => manager.generateCSSVariables(),
    exportBrandSettings: () => manager.exportBrandSettings(),
    importBrandSettings: (settingsJson: string) => manager.importBrandSettings(settingsJson),
    resetToDefault: () => manager.resetToDefault(),
    getBrandPreview: () => manager.getBrandPreview()
  };
}
