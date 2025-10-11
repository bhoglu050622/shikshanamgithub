/**
 * Course Theming System
 * 
 * This file defines the visual identity and thematic elements for each course.
 * Each theme includes colors, typography, animations, and visual elements that
 * reflect the subject matter and create a unique experience.
 */

export interface CourseTheme {
  id: string
  name: string
  category: 'darshana' | 'sanskrit' | 'life-skills' | 'spiritual' | 'practical'
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted: string
  }
  gradients: {
    hero: string
    card: string
    button: string
  }
  typography: {
    heading: string
    body: string
    accent: string
  }
  animations: {
    particles: boolean
    canvas: boolean
    floating: boolean
  }
  imagery: {
    heroPattern: string
    iconStyle: string
    decorativeElements: string[]
  }
  layout: {
    heroStyle: 'centered' | 'split' | 'overlay'
    cardStyle: 'modern' | 'traditional' | 'minimal'
    spacing: 'compact' | 'comfortable' | 'spacious'
  }
}

export const courseThemes: Record<string, CourseTheme> = {
  'advaita-vedanta': {
    id: 'advaita-vedanta',
    name: 'Advaita Vedanta',
    category: 'darshana',
    colors: {
      primary: '#4C1D95', // Deep purple - representing unity and transcendence
      secondary: '#7C3AED', // Lighter purple
      accent: '#F59E0B', // Golden accent - representing enlightenment
      background: '#1E1B4B', // Dark indigo background
      text: '#F8FAFC', // Light text
      muted: '#94A3B8'
    },
    gradients: {
      hero: 'from-indigo-900 via-purple-900 to-indigo-800',
      card: 'from-purple-800/20 to-indigo-800/20',
      button: 'from-purple-600 to-indigo-600'
    },
    typography: {
      heading: 'font-serif font-bold',
      body: 'font-sans',
      accent: 'font-display'
    },
    animations: {
      particles: true,
      canvas: true,
      floating: true
    },
    imagery: {
      heroPattern: 'cosmic-mandala',
      iconStyle: 'geometric-sacred',
      decorativeElements: ['om-symbol', 'lotus-petals', 'cosmic-rays']
    },
    layout: {
      heroStyle: 'overlay',
      cardStyle: 'traditional',
      spacing: 'spacious'
    }
  },

  'chanakya-code': {
    id: 'chanakya-code',
    name: 'Chanakya Code',
    category: 'life-skills',
    colors: {
      primary: '#EA580C', // Saffron orange - representing wisdom and strategy
      secondary: '#DC2626', // Deep red
      accent: '#F59E0B', // Gold
      background: '#7F1D1D', // Dark red background
      text: '#FEF7ED', // Warm white
      muted: '#FED7AA'
    },
    gradients: {
      hero: 'from-red-900 via-orange-900 to-red-800',
      card: 'from-orange-800/20 to-red-800/20',
      button: 'from-orange-600 to-red-600'
    },
    typography: {
      heading: 'font-serif font-bold',
      body: 'font-sans',
      accent: 'font-display'
    },
    animations: {
      particles: true,
      canvas: false,
      floating: true
    },
    imagery: {
      heroPattern: 'strategic-grid',
      iconStyle: 'royal-emblems',
      decorativeElements: ['crown-motifs', 'chess-patterns', 'scroll-borders']
    },
    layout: {
      heroStyle: 'split',
      cardStyle: 'modern',
      spacing: 'comfortable'
    }
  },

  'isha-upanishad-course': {
    id: 'isha-upanishad-course',
    name: 'Isha Upanishad',
    category: 'sanskrit',
    colors: {
      primary: '#0C3B3C', // Deep teal - representing depth of knowledge
      secondary: '#0D9488', // Teal
      accent: '#C49B0B', // Golden yellow
      background: '#134E4A', // Dark teal
      text: '#F0FDFA', // Light teal
      muted: '#99F6E4'
    },
    gradients: {
      hero: 'from-teal-900 via-emerald-900 to-teal-800',
      card: 'from-teal-800/20 to-emerald-800/20',
      button: 'from-teal-600 to-emerald-600'
    },
    typography: {
      heading: 'font-serif font-bold',
      body: 'font-sans',
      accent: 'font-devanagari'
    },
    animations: {
      particles: true,
      canvas: true,
      floating: true
    },
    imagery: {
      heroPattern: 'vedic-geometry',
      iconStyle: 'sanskrit-calligraphy',
      decorativeElements: ['devanagari-borders', 'sacred-geometry', 'flame-motifs']
    },
    layout: {
      heroStyle: 'centered',
      cardStyle: 'traditional',
      spacing: 'spacious'
    }
  },

  'prashna-upanishad': {
    id: 'prashna-upanishad',
    name: 'Prashna Upanishad',
    category: 'sanskrit',
    colors: {
      primary: '#0C3B3C', // Deep teal
      secondary: '#14B8A6', // Turquoise
      accent: '#F59E0B', // Amber
      background: '#0F766E', // Teal background
      text: '#F0FDFA', // Light text
      muted: '#5EEAD4'
    },
    gradients: {
      hero: 'from-teal-800 via-cyan-800 to-teal-700',
      card: 'from-teal-700/20 to-cyan-700/20',
      button: 'from-teal-500 to-cyan-500'
    },
    typography: {
      heading: 'font-serif font-bold',
      body: 'font-sans',
      accent: 'font-devanagari'
    },
    animations: {
      particles: true,
      canvas: true,
      floating: true
    },
    imagery: {
      heroPattern: 'question-spirals',
      iconStyle: 'inquiry-symbols',
      decorativeElements: ['question-marks', 'spiral-patterns', 'wisdom-eyes']
    },
    layout: {
      heroStyle: 'overlay',
      cardStyle: 'traditional',
      spacing: 'comfortable'
    }
  },

  'sanskrit-bhasha-pragya': {
    id: 'sanskrit-bhasha-pragya',
    name: 'Sanskrit Bhasha Pragya',
    category: 'sanskrit',
    colors: {
      primary: '#0C3B3C', // Deep teal
      secondary: '#C49B0B', // Golden
      accent: '#FF8A00', // Saffron
      background: '#134E4A', // Dark teal
      text: '#FEF3C7', // Golden white
      muted: '#FDE68A'
    },
    gradients: {
      hero: 'from-teal-900 via-amber-900 to-teal-800',
      card: 'from-amber-800/20 to-teal-800/20',
      button: 'from-amber-600 to-teal-600'
    },
    typography: {
      heading: 'font-devanagari font-bold',
      body: 'font-sans',
      accent: 'font-serif'
    },
    animations: {
      particles: true,
      canvas: false,
      floating: true
    },
    imagery: {
      heroPattern: 'devanagari-script',
      iconStyle: 'calligraphy-brush',
      decorativeElements: ['script-flourishes', 'ink-drops', 'manuscript-borders']
    },
    layout: {
      heroStyle: 'split',
      cardStyle: 'traditional',
      spacing: 'comfortable'
    }
  },

  'vaisheshik-darshan': {
    id: 'vaisheshik-darshan',
    name: 'Vaisheshik Darshan',
    category: 'darshana',
    colors: {
      primary: '#4C1D95', // Deep purple
      secondary: '#64748B', // Slate
      accent: '#10B981', // Emerald
      background: '#312E81', // Indigo background
      text: '#F1F5F9', // Light slate
      muted: '#CBD5E1'
    },
    gradients: {
      hero: 'from-indigo-900 via-slate-800 to-indigo-800',
      card: 'from-slate-800/20 to-indigo-800/20',
      button: 'from-indigo-600 to-slate-600'
    },
    typography: {
      heading: 'font-serif font-bold',
      body: 'font-sans',
      accent: 'font-display'
    },
    animations: {
      particles: true,
      canvas: true,
      floating: true
    },
    imagery: {
      heroPattern: 'atomic-structure',
      iconStyle: 'scientific-diagrams',
      decorativeElements: ['atom-models', 'particle-trails', 'molecular-bonds']
    },
    layout: {
      heroStyle: 'centered',
      cardStyle: 'modern',
      spacing: 'spacious'
    }
  },

  'yoga-darshan': {
    id: 'yoga-darshan',
    name: 'Yoga Darshan',
    category: 'spiritual',
    colors: {
      primary: '#166534', // Forest green
      secondary: '#B87333', // Bronze
      accent: '#F59E0B', // Amber
      background: '#14532D', // Dark green
      text: '#F0FDF4', // Light green
      muted: '#BBF7D0'
    },
    gradients: {
      hero: 'from-green-900 via-emerald-800 to-green-800',
      card: 'from-emerald-800/20 to-green-800/20',
      button: 'from-green-600 to-emerald-600'
    },
    typography: {
      heading: 'font-serif font-bold',
      body: 'font-sans',
      accent: 'font-display'
    },
    animations: {
      particles: true,
      canvas: true,
      floating: true
    },
    imagery: {
      heroPattern: 'yoga-asanas',
      iconStyle: 'meditation-symbols',
      decorativeElements: ['lotus-poses', 'chakra-wheels', 'breathing-flows']
    },
    layout: {
      heroStyle: 'overlay',
      cardStyle: 'traditional',
      spacing: 'spacious'
    }
  },

  'nyaya-darshan': {
    id: 'nyaya-darshan',
    name: 'Nyaya Darshan',
    category: 'darshana',
    colors: {
      primary: '#4C1D95', // Deep purple
      secondary: '#475569', // Slate
      accent: '#F59E0B', // Amber
      background: '#1E293B', // Dark slate
      text: '#F8FAFC', // Light
      muted: '#94A3B8'
    },
    gradients: {
      hero: 'from-slate-900 via-purple-900 to-slate-800',
      card: 'from-purple-800/20 to-slate-800/20',
      button: 'from-purple-600 to-slate-600'
    },
    typography: {
      heading: 'font-serif font-bold',
      body: 'font-sans',
      accent: 'font-display'
    },
    animations: {
      particles: true,
      canvas: true,
      floating: true
    },
    imagery: {
      heroPattern: 'logic-diagrams',
      iconStyle: 'reasoning-symbols',
      decorativeElements: ['syllogism-trees', 'logic-gates', 'proof-chains']
    },
    layout: {
      heroStyle: 'split',
      cardStyle: 'modern',
      spacing: 'comfortable'
    }
  }
}

// Helper functions for theme application
export function getCourseTheme(courseId: string): CourseTheme | null {
  return courseThemes[courseId] || null
}

export function getThemeColors(courseId: string) {
  const theme = getCourseTheme(courseId)
  return theme?.colors || null
}

export function getThemeGradients(courseId: string) {
  const theme = getCourseTheme(courseId)
  return theme?.gradients || null
}

export function generateThemeCSS(theme: CourseTheme): string {
  return `
    :root {
      --course-primary: ${theme.colors.primary};
      --course-secondary: ${theme.colors.secondary};
      --course-accent: ${theme.colors.accent};
      --course-background: ${theme.colors.background};
      --course-text: ${theme.colors.text};
      --course-muted: ${theme.colors.muted};
    }
    
    .course-hero {
      background: linear-gradient(135deg, ${theme.gradients.hero});
    }
    
    .course-card {
      background: linear-gradient(135deg, ${theme.gradients.card});
    }
    
    .course-button {
      background: linear-gradient(135deg, ${theme.gradients.button});
    }
  `
}