// Enhanced types with customization options
export interface ButtonCustomization {
  text: string;
  link: string;
  color?: string;
  backgroundColor?: string;
  hoverColor?: string;
  borderColor?: string;
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: string;
}

export interface CardCustomization {
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  shadowColor?: string;
  shadowIntensity?: string;
  padding?: string;
}

export interface IconCustomization {
  name: string;
  color?: string;
  size?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

export interface BackgroundCustomization {
  type: 'color' | 'image' | 'gradient';
  value: string;
  opacity?: number;
  position?: string;
  size?: string;
  repeat?: string;
}

export interface EnhancedHomepageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    background?: BackgroundCustomization;
    ctaButtons: {
      sanskrit: ButtonCustomization;
      darshan: ButtonCustomization;
      lifeSkills: ButtonCustomization;
    };
    features: Array<{
      id: string;
      icon: IconCustomization;
      title: string;
      description: string;
      card?: CardCustomization;
    }>;
  };
  alignYourself: {
    title: string;
    subtitle: string;
    background?: BackgroundCustomization;
    liveClasses: Array<{
      id: number;
      title: string;
      instructor: string;
      thumbnail: string;
      duration: string;
      date: string;
      time: string;
      price: string;
      rating: number;
      students: number;
      link: string;
      description: string;
      card?: CardCustomization;
    }>;
    selfPacedCourses: Array<{
      id: number;
      title: string;
      instructor: string;
      thumbnail: string;
      duration: string;
      modules: number;
      price: string;
      rating: number;
      students: number;
      link: string;
      description: string;
      card?: CardCustomization;
    }>;
  };
  schools: {
    title: string;
    subtitle: string;
    background?: BackgroundCustomization;
    schools: Array<{
      id: string;
      name: string;
      description: string;
      icon: IconCustomization;
      link: string;
      color: string;
      card?: CardCustomization;
    }>;
  };
  meetGurus: {
    title: string;
    subtitle: string;
    background?: BackgroundCustomization;
    gurus: Array<{
      id: string;
      name: string;
      title: string;
      image: string;
      description: string;
      link: string;
      card?: CardCustomization;
    }>;
  };
  studentStories: {
    title: string;
    subtitle: string;
    background?: BackgroundCustomization;
    stories: Array<{
      id: string;
      name: string;
      story: string;
      image: string;
      rating: number;
      card?: CardCustomization;
    }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
    background?: BackgroundCustomization;
    testimonials: Array<{
      id: string;
      name: string;
      role: string;
      content: string;
      image: string;
      rating: number;
      card?: CardCustomization;
    }>;
  };
  communityPosts: {
    title: string;
    subtitle: string;
    background?: BackgroundCustomization;
    posts: Array<{
      id: string;
      title: string;
      content: string;
      author: string;
      date: string;
      image: string;
      likes: number;
      card?: CardCustomization;
    }>;
  };
  foundersMission: {
    title: string;
    subtitle: string;
    content: string;
    image: string;
    founderName: string;
    founderTitle: string;
    background?: BackgroundCustomization;
    card?: CardCustomization;
  };
  contribute: {
    title: string;
    subtitle: string;
    content: string;
    ctaText: string;
    ctaLink: string;
    background?: BackgroundCustomization;
    ctaButton?: ButtonCustomization;
  };
  downloadApp: {
    title: string;
    subtitle: string;
    background?: BackgroundCustomization;
    features: Array<{
      id: string;
      title: string;
      description: string;
      icon: IconCustomization;
      card?: CardCustomization;
    }>;
    downloadLinks: {
      android: string;
      ios: string;
    };
    downloadButtons?: {
      android: ButtonCustomization;
      ios: ButtonCustomization;
    };
  };
  faq: {
    title: string;
    subtitle: string;
    background?: BackgroundCustomization;
    questions: Array<{
      id: string;
      question: string;
      answer: string;
      card?: CardCustomization;
    }>;
  };
}

// Predefined color palettes
export const COLOR_PALETTES = {
  saffron: {
    primary: '#F59E0B',
    secondary: '#D97706',
    light: '#FEF3C7',
    dark: '#92400E'
  },
  deepTeal: {
    primary: '#0D9488',
    secondary: '#0F766E',
    light: '#CCFBF1',
    dark: '#134E4A'
  },
  indigo: {
    primary: '#6366F1',
    secondary: '#4F46E5',
    light: '#E0E7FF',
    dark: '#3730A3'
  },
  emerald: {
    primary: '#10B981',
    secondary: '#059669',
    light: '#D1FAE5',
    dark: '#047857'
  },
  rose: {
    primary: '#F43F5E',
    secondary: '#E11D48',
    light: '#FECDD3',
    dark: '#BE185D'
  }
};

// Predefined icon options
export const ICON_OPTIONS = [
  { name: 'book', label: 'Book' },
  { name: 'users', label: 'Users' },
  { name: 'heart', label: 'Heart' },
  { name: 'star', label: 'Star' },
  { name: 'shield', label: 'Shield' },
  { name: 'lightbulb', label: 'Lightbulb' },
  { name: 'target', label: 'Target' },
  { name: 'trophy', label: 'Trophy' },
  { name: 'sparkles', label: 'Sparkles' },
  { name: 'globe', label: 'Globe' },
  { name: 'zap', label: 'Zap' },
  { name: 'flower', label: 'Flower' }
];

// Predefined background options
export const BACKGROUND_OPTIONS = {
  gradients: [
    { name: 'Saffron Gradient', value: 'linear-gradient(135deg, #F59E0B, #D97706)' },
    { name: 'Teal Gradient', value: 'linear-gradient(135deg, #0D9488, #0F766E)' },
    { name: 'Indigo Gradient', value: 'linear-gradient(135deg, #6366F1, #4F46E5)' },
    { name: 'Emerald Gradient', value: 'linear-gradient(135deg, #10B981, #059669)' },
    { name: 'Rose Gradient', value: 'linear-gradient(135deg, #F43F5E, #E11D48)' }
  ],
  patterns: [
    { name: 'Indian Pattern', value: 'indian-pattern' },
    { name: 'Geometric Pattern', value: 'geometric-pattern' },
    { name: 'Floral Pattern', value: 'floral-pattern' }
  ]
};
