// Modern Indian-inspired color palette for the blog system
export const colors = {
  // Primary colors - Rich, warm tones inspired by Indian heritage
  primary: {
    50: '#fef7ed',   // Light cream
    100: '#fdedd3',  // Soft cream
    200: '#fbd9a5',  // Warm cream
    300: '#f8c16d',  // Golden cream
    400: '#f5a532',  // Golden orange
    500: '#e8911a',  // Rich golden
    600: '#d17a0f',  // Deep golden
    700: '#b05e0c',  // Dark golden
    800: '#8f4a0f',  // Very dark golden
    900: '#763d10',  // Deepest golden
  },
  
  // Secondary colors - Deep, spiritual tones
  secondary: {
    50: '#f8fafc',   // Light slate
    100: '#f1f5f9',  // Soft slate
    200: '#e2e8f0',  // Medium slate
    300: '#cbd5e1',  // Slate
    400: '#94a3b8',  // Dark slate
    500: '#64748b',  // Deeper slate
    600: '#475569',  // Deep slate
    700: '#334155',  // Very deep slate
    800: '#1e293b',  // Darkest slate
    900: '#0f172a',  // Black slate
  },
  
  // Accent colors - Vibrant, meaningful colors
  accent: {
    saffron: '#ff6b35',      // Saffron orange
    maroon: '#8b1538',       // Deep maroon
    emerald: '#10b981',      // Emerald green
    indigo: '#6366f1',       // Indigo blue
    rose: '#f43f5e',         // Rose pink
    amber: '#f59e0b',        // Amber yellow
  },
  
  // Semantic colors
  semantic: {
    success: '#10b981',      // Emerald
    warning: '#f59e0b',      // Amber
    error: '#ef4444',        // Red
    info: '#3b82f6',         // Blue
  },
  
  // Neutral colors
  neutral: {
    50: '#fafafa',   // Almost white
    100: '#f5f5f5',  // Light gray
    200: '#e5e5e5',  // Medium light gray
    300: '#d4d4d4',  // Medium gray
    400: '#a3a3a3',  // Dark medium gray
    500: '#737373',  // Dark gray
    600: '#525252',  // Darker gray
    700: '#404040',  // Very dark gray
    800: '#262626',  // Almost black
    900: '#171717',  // Black
  },
  
  // Background colors
  background: {
    primary: '#fefefe',      // Pure white
    secondary: '#f8fafc',    // Light slate
    tertiary: '#f1f5f9',     // Soft slate
    dark: '#0f172a',         // Dark slate
    darkSecondary: '#1e293b', // Dark slate secondary
  },
  
  // Text colors
  text: {
    primary: '#0f172a',      // Dark slate
    secondary: '#475569',    // Medium slate
    tertiary: '#64748b',     // Light slate
    inverse: '#f8fafc',      // Light slate (for dark backgrounds)
    muted: '#94a3b8',        // Muted slate
  },
  
  // Border colors
  border: {
    light: '#e2e8f0',        // Light border
    medium: '#cbd5e1',       // Medium border
    dark: '#94a3b8',         // Dark border
  }
};

// CSS custom properties for easy theming
export const cssVariables = {
  '--color-primary-50': colors.primary[50],
  '--color-primary-100': colors.primary[100],
  '--color-primary-200': colors.primary[200],
  '--color-primary-300': colors.primary[300],
  '--color-primary-400': colors.primary[400],
  '--color-primary-500': colors.primary[500],
  '--color-primary-600': colors.primary[600],
  '--color-primary-700': colors.primary[700],
  '--color-primary-800': colors.primary[800],
  '--color-primary-900': colors.primary[900],
  
  '--color-secondary-50': colors.secondary[50],
  '--color-secondary-100': colors.secondary[100],
  '--color-secondary-200': colors.secondary[200],
  '--color-secondary-300': colors.secondary[300],
  '--color-secondary-400': colors.secondary[400],
  '--color-secondary-500': colors.secondary[500],
  '--color-secondary-600': colors.secondary[600],
  '--color-secondary-700': colors.secondary[700],
  '--color-secondary-800': colors.secondary[800],
  '--color-secondary-900': colors.secondary[900],
  
  '--color-accent-saffron': colors.accent.saffron,
  '--color-accent-maroon': colors.accent.maroon,
  '--color-accent-emerald': colors.accent.emerald,
  '--color-accent-indigo': colors.accent.indigo,
  '--color-accent-rose': colors.accent.rose,
  '--color-accent-amber': colors.accent.amber,
  
  '--color-background-primary': colors.background.primary,
  '--color-background-secondary': colors.background.secondary,
  '--color-background-tertiary': colors.background.tertiary,
  '--color-background-dark': colors.background.dark,
  '--color-background-dark-secondary': colors.background.darkSecondary,
  
  '--color-text-primary': colors.text.primary,
  '--color-text-secondary': colors.text.secondary,
  '--color-text-tertiary': colors.text.tertiary,
  '--color-text-inverse': colors.text.inverse,
  '--color-text-muted': colors.text.muted,
  
  '--color-border-light': colors.border.light,
  '--color-border-medium': colors.border.medium,
  '--color-border-dark': colors.border.dark,
};

export default colors;
