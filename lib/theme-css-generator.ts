/**
 * Theme CSS Generator
 * 
 * Generates scoped CSS for custom course pages based on theme configurations
 */

import { CourseTheme } from './course-themes'

export interface CSSVariables {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  muted: string
  'primary-rgb': string
  'secondary-rgb': string
  'accent-rgb': string
}

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0, 0, 0'
  
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  
  return `${r}, ${g}, ${b}`
}

/**
 * Generate CSS variables from theme
 */
export function generateCSSVariables(theme: CourseTheme): CSSVariables {
  return {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    accent: theme.colors.accent,
    background: theme.colors.background,
    text: theme.colors.text,
    muted: theme.colors.muted,
    'primary-rgb': hexToRgb(theme.colors.primary),
    'secondary-rgb': hexToRgb(theme.colors.secondary),
    'accent-rgb': hexToRgb(theme.colors.accent)
  }
}

/**
 * Generate scoped CSS for a course theme
 */
export function generateScopedCSS(theme: CourseTheme, scopeId: string): string {
  const variables = generateCSSVariables(theme)
  
  return `
    /* Scoped styles for ${theme.name} course */
    #${scopeId} {
      --course-primary: ${variables.primary};
      --course-secondary: ${variables.secondary};
      --course-accent: ${variables.accent};
      --course-background: ${variables.background};
      --course-text: ${variables.text};
      --course-muted: ${variables.muted};
      --course-primary-rgb: ${variables['primary-rgb']};
      --course-secondary-rgb: ${variables['secondary-rgb']};
      --course-accent-rgb: ${variables['accent-rgb']};
      
      /* Theme-specific utility classes */
      --course-hero-gradient: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
      --course-card-gradient: linear-gradient(135deg, rgba(${variables['primary-rgb']}, 0.1), rgba(${variables['secondary-rgb']}, 0.1));
      --course-button-gradient: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
      --course-text-shadow: 0 2px 4px rgba(${variables['primary-rgb']}, 0.3);
      --course-box-shadow: 0 10px 25px rgba(${variables['primary-rgb']}, 0.2);
    }
    
    /* Hero section styling */
    #${scopeId} .course-hero {
      background: var(--course-hero-gradient);
      color: var(--course-text);
      position: relative;
      overflow: hidden;
    }
    
    #${scopeId} .course-hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--course-background);
      opacity: 0.8;
      z-index: 0;
    }
    
    #${scopeId} .course-hero .hero-content {
      position: relative;
      z-index: 1;
    }
    
    /* Section backgrounds */
    #${scopeId} .section-bg-subtle {
      background: var(--course-card-gradient);
    }
    
    #${scopeId} .section-bg-accent {
      background: linear-gradient(135deg, var(--course-primary), var(--course-secondary));
      color: white;
    }
    
    /* Card styling */
    #${scopeId} .course-card {
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(var(--course-primary-rgb), 0.2);
      box-shadow: var(--course-box-shadow);
      transition: all 0.3s ease;
    }
    
    #${scopeId} .course-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(var(--course-primary-rgb), 0.3);
      border-color: var(--course-primary);
    }
    
    /* Button styling */
    #${scopeId} .course-button {
      background: var(--course-button-gradient);
      color: white;
      border: none;
      transition: all 0.3s ease;
    }
    
    #${scopeId} .course-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(var(--course-primary-rgb), 0.4);
    }
    
    /* Text styling */
    #${scopeId} .text-primary {
      color: var(--course-primary);
    }
    
    #${scopeId} .text-secondary {
      color: var(--course-secondary);
    }
    
    #${scopeId} .text-accent {
      color: var(--course-accent);
    }
    
    #${scopeId} .text-muted {
      color: var(--course-muted);
    }
    
    /* Border styling */
    #${scopeId} .border-primary {
      border-color: var(--course-primary);
    }
    
    #${scopeId} .border-accent {
      border-color: var(--course-accent);
    }
    
    /* Background styling */
    #${scopeId} .bg-primary {
      background-color: var(--course-primary);
    }
    
    #${scopeId} .bg-accent {
      background-color: var(--course-accent);
    }
    
    /* Gradient text */
    #${scopeId} .gradient-text {
      background: var(--course-button-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Particle animation colors */
    #${scopeId} .particle {
      background-color: var(--course-accent);
      box-shadow: 0 0 6px var(--course-accent);
    }
    
    /* Scroll animations */
    #${scopeId} .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease-out;
    }
    
    #${scopeId} .animate-on-scroll.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      #${scopeId} .course-hero {
        padding: 2rem 1rem;
      }
      
      #${scopeId} .course-card {
        margin: 0.5rem;
      }
    }
    
    /* Dark mode adjustments */
    @media (prefers-color-scheme: dark) {
      #${scopeId} .course-card {
        background: rgba(0, 0, 0, 0.8);
        color: var(--course-text);
      }
    }
  `
}

/**
 * Generate animation keyframes for theme-specific animations
 */
export function generateAnimationKeyframes(theme: CourseTheme, scopeId: string): string {
  const accentRgb = hexToRgb(theme.colors.accent)
  
  return `
    @keyframes ${scopeId}-pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(${accentRgb}, 0.4);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(${accentRgb}, 0);
      }
    }
    
    @keyframes ${scopeId}-float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    @keyframes ${scopeId}-glow {
      0%, 100% {
        text-shadow: 0 0 5px rgba(${accentRgb}, 0.5);
      }
      50% {
        text-shadow: 0 0 20px rgba(${accentRgb}, 0.8);
      }
    }
    
    @keyframes ${scopeId}-slideIn {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    /* Apply animations */
    #${scopeId} .animate-pulse {
      animation: ${scopeId}-pulse 2s infinite;
    }
    
    #${scopeId} .animate-float {
      animation: ${scopeId}-float 3s ease-in-out infinite;
    }
    
    #${scopeId} .animate-glow {
      animation: ${scopeId}-glow 2s ease-in-out infinite;
    }
    
    #${scopeId} .animate-slide-in {
      animation: ${scopeId}-slideIn 0.6s ease-out;
    }
  `
}

/**
 * Generate complete CSS for a course theme
 */
export function generateCompleteThemeCSS(theme: CourseTheme, scopeId: string): string {
  return `
    ${generateScopedCSS(theme, scopeId)}
    ${generateAnimationKeyframes(theme, scopeId)}
  `
}
