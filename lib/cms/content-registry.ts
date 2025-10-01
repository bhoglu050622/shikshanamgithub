/**
 * CMS Content Registry - Central registry for all content types and their configurations
 * This ensures all frontend content is available and properly managed in the CMS
 */

// Import types - using any for now to avoid import issues
type HomepageContent = any;
type DonationContent = any;
type AboutContent = any;
type ContactContent = any;
type SchoolsContent = any;
type SchoolPageContent = any;
type DarshanaSchoolContent = any;
type SelfHelpSchoolContent = any;
type EnhancedHomepageContent = any;
type BlogContent = any;
type CourseContent = any;
type PackageContent = any;

// Content Type Definitions
export interface ContentTypeConfig {
  id: string;
  name: string;
  description: string;
  apiEndpoint: string;
  cmsPath: string;
  frontendPath: string;
  type: any; // TypeScript interface
  status: 'active' | 'coming-soon' | 'deprecated';
  category: 'main' | 'education' | 'content' | 'system';
  features: string[];
  sections: string[];
}

// All available content types in the CMS
export const CONTENT_TYPES: Record<string, ContentTypeConfig> = {
  // Main Pages
  homepage: {
    id: 'homepage',
    name: 'Homepage',
    description: 'Main homepage content and sections',
    apiEndpoint: '/api/cms/content',
    cmsPath: '/cms',
    frontendPath: '/',
    type: 'HomepageContent',
    status: 'active',
    category: 'main',
    features: ['hero', 'courses', 'schools', 'gurus', 'testimonials', 'community', 'mission'],
    sections: [
      'hero', 'alignYourself', 'schools', 'meetGurus', 
      'studentStories', 'testimonials', 'communityPosts', 
      'foundersMission', 'contribute', 'downloadApp', 'faq'
    ]
  },

  donation: {
    id: 'donation',
    name: 'Donation Page',
    description: 'Donation page content and fundraising sections',
    apiEndpoint: '/api/cms/donation',
    cmsPath: '/cms/donation',
    frontendPath: '/donation',
    type: 'DonationContent',
    status: 'active',
    category: 'main',
    features: ['hero', 'impact', 'causes', 'donation-options', 'testimonials', 'faq'],
    sections: ['hero', 'impact', 'causes', 'donationOptions', 'testimonials', 'faq', 'cta']
  },

  about: {
    id: 'about',
    name: 'About Page',
    description: 'About page content and company information',
    apiEndpoint: '/api/cms/about',
    cmsPath: '/cms/about',
    frontendPath: '/about',
    type: 'AboutContent',
    status: 'active',
    category: 'main',
    features: ['hero', 'mission', 'offerings', 'values'],
    sections: ['hero', 'mission', 'offerings', 'values', 'cta']
  },

  contact: {
    id: 'contact',
    name: 'Contact Page',
    description: 'Contact page and form settings',
    apiEndpoint: '/api/cms/contact',
    cmsPath: '/cms/contact',
    frontendPath: '/contact',
    type: 'ContactContent',
    status: 'active',
    category: 'main',
    features: ['hero', 'form', 'contact-info', 'quick-help'],
    sections: ['hero', 'form', 'contactInfo', 'quickHelp']
  },

  // Education Pages
  schools: {
    id: 'schools',
    name: 'Schools Overview',
    description: 'All schools listing and general content',
    apiEndpoint: '/api/cms/schools',
    cmsPath: '/cms/schools',
    frontendPath: '/schools',
    type: 'SchoolsContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'schools-list'],
    sections: ['hero', 'schools']
  },

  sanskritSchool: {
    id: 'sanskrit-school',
    name: 'Sanskrit School',
    description: 'Sanskrit school page content',
    apiEndpoint: '/api/cms/sanskrit-school',
    cmsPath: '/cms/sanskrit-school',
    frontendPath: '/schools/sanskrit',
    type: 'SchoolPageContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'courses', 'benefits', 'testimonials', 'cta'],
    sections: ['hero', 'courses', 'benefits', 'testimonials', 'cta']
  },

  darshanaSchool: {
    id: 'darshana-school',
    name: 'Darshana School',
    description: 'Darshana philosophy school page',
    apiEndpoint: '/api/cms/darshana-school',
    cmsPath: '/cms/darshana-school',
    frontendPath: '/schools/darshana',
    type: 'DarshanaSchoolContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'darshanas', 'learning-path', 'mission', 'app', 'community'],
    sections: ['hero', 'darshanas', 'learningPath', 'mission', 'app', 'community']
  },

  selfHelpSchool: {
    id: 'self-help-school',
    name: 'Self-Help School',
    description: 'Self-help and life skills content',
    apiEndpoint: '/api/cms/self-help-school',
    cmsPath: '/cms/self-help-school',
    frontendPath: '/schools/self-help',
    type: 'SelfHelpSchoolContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'courses', 'benefits', 'testimonials', 'schools', 'cta'],
    sections: ['hero', 'courses', 'benefits', 'testimonials', 'schools', 'cta']
  },

  // Individual Courses
  advaitaVedantaCourse: {
    id: 'advaita-vedanta-course',
    name: 'Advaita Vedanta Course',
    description: 'Advaita Vedanta Darshan - A Journey Through Drig Drishya Viveka',
    apiEndpoint: '/api/cms/advaita-vedanta-course',
    cmsPath: '/cms/advaita-vedanta-course',
    frontendPath: '/courses/advaita-vedanta-darshan-a-journey-through-drig-drishya-viveka',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  chanakyaCodeCourse: {
    id: 'chanakya-code-course',
    name: 'Chanakya Code Course',
    description: 'Chanakya Code - Ancient Wisdom for Modern Success',
    apiEndpoint: '/api/cms/chanakya-code-course',
    cmsPath: '/cms/chanakya-code-course',
    frontendPath: '/courses/chanakya-code',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  ishaUpanishadCourse: {
    id: 'isha-upanishad-course',
    name: 'Isha Upanishad Course',
    description: 'Isha Upanishad - Ancient Wisdom for Modern Life',
    apiEndpoint: '/api/cms/isha-upanishad-course',
    cmsPath: '/cms/isha-upanishad-course',
    frontendPath: '/courses/isha-upanishad',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  nyayaDarshanCourse: {
    id: 'nyaya-darshan-course',
    name: 'Nyaya Darshan Course',
    description: 'Nyaya Darshan - Logic and Reasoning in Indian Philosophy',
    apiEndpoint: '/api/cms/nyaya-darshan-course',
    cmsPath: '/cms/nyaya-darshan-course',
    frontendPath: '/courses/nyaya-darshan',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  prashnaUpanishadCourse: {
    id: 'prashna-upanishad-course',
    name: 'Prashna Upanishad Course',
    description: 'Prashna Upanishad - The Questions of Life',
    apiEndpoint: '/api/cms/prashna-upanishad-course',
    cmsPath: '/cms/prashna-upanishad-course',
    frontendPath: '/courses/prashna-upanishad',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  samkhyaDarshanCourse: {
    id: 'samkhya-darshan-course',
    name: 'Samkhya Darshan Course',
    description: 'Samkhya Darshan - The Philosophy of Numbers and Categories',
    apiEndpoint: '/api/cms/samkhya-darshan-course',
    cmsPath: '/cms/samkhya-darshan-course',
    frontendPath: '/courses/samkhya-darshan',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  sanskritBeginnerCourse: {
    id: 'sanskrit-beginner-course',
    name: 'Sanskrit Beginner Course',
    description: 'Sanskrit Beginner - Learn the Language of the Gods',
    apiEndpoint: '/api/cms/sanskrit-beginner-course',
    cmsPath: '/cms/sanskrit-beginner-course',
    frontendPath: '/courses/sanskrit-beginner',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  sanskritCourse: {
    id: 'sanskrit-course',
    name: 'Sanskrit Course',
    description: 'Complete Sanskrit Language Learning Program',
    apiEndpoint: '/api/cms/sanskrit-course',
    cmsPath: '/cms/sanskrit-course',
    frontendPath: '/courses/sanskrit-course',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  tantraDarshanCourse: {
    id: 'tantra-darshan-course',
    name: 'Tantra Darshan Course',
    description: 'Tantra Darshan - Ancient Tantric Philosophy',
    apiEndpoint: '/api/cms/tantra-darshan-course',
    cmsPath: '/cms/tantra-darshan-course',
    frontendPath: '/courses/tantra-darshan',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  vaisheshikDarshanCourse: {
    id: 'vaisheshik-darshan-course',
    name: 'Vaisheshik Darshan Course',
    description: 'Vaisheshik Darshan - The Philosophy of Particularity',
    apiEndpoint: '/api/cms/vaisheshik-darshan-course',
    cmsPath: '/cms/vaisheshik-darshan-course',
    frontendPath: '/courses/vaisheshik-darshan',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  yogaAdvancedCourse: {
    id: 'yoga-advanced-course',
    name: 'Yoga Advanced Course',
    description: 'Advanced Yoga Philosophy and Practice',
    apiEndpoint: '/api/cms/yoga-advanced-course',
    cmsPath: '/cms/yoga-advanced-course',
    frontendPath: '/courses/yoga-advanced',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  yogaDarshanCourse: {
    id: 'yoga-darshan-course',
    name: 'Yoga Darshan Course',
    description: 'Yoga Darshan - The Philosophy of Union',
    apiEndpoint: '/api/cms/yoga-darshan-course',
    cmsPath: '/cms/yoga-darshan-course',
    frontendPath: '/courses/yoga-darshan',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  // Missing Courses - Added from actual course directories
  nyayaVaisheshikaCourse: {
    id: 'nyaya-vaisheshika-course',
    name: 'Nyaya-Vaisheshika Course',
    description: 'Nyaya-Vaisheshika - Logic and Particularity in Indian Philosophy',
    apiEndpoint: '/api/cms/nyaya-vaisheshika-course',
    cmsPath: '/cms/nyaya-vaisheshika-course',
    frontendPath: '/courses/nyaya-vaisheshika',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  emotionalIntelligenceCourse: {
    id: 'emotional-intelligence-course',
    name: 'Emotional Intelligence Course',
    description: 'Emotional Intelligence with Samkhya Darshan',
    apiEndpoint: '/api/cms/emotional-intelligence-course',
    cmsPath: '/cms/emotional-intelligence-course',
    frontendPath: '/courses/emotional-intelligence-with-samkhya-darshan',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  kashmirShaivismCourse: {
    id: 'kashmir-shaivism-course',
    name: 'Kashmir Shaivism Course',
    description: 'Kashmir Shaivism - The Philosophy of Recognition',
    apiEndpoint: '/api/cms/kashmir-shaivism-course',
    cmsPath: '/cms/kashmir-shaivism-course',
    frontendPath: '/courses/kashmir-shaivism',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  sanskritLiveClassCourse: {
    id: 'sanskrit-live-class-course',
    name: 'Sanskrit Live Class Course',
    description: 'Interactive Sanskrit Learning with Live Classes',
    apiEndpoint: '/api/cms/sanskrit-live-class-course',
    cmsPath: '/cms/sanskrit-live-class-course',
    frontendPath: '/courses/sanskrit-live-class',
    type: 'CourseContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  // Packages
  sanskritDarshanUpanishadBundle: {
    id: 'sanskrit-darshan-upanishad-bundle',
    name: 'Sanskrit + Darshan + Upanishad Bundle',
    description: 'Complete package combining Sanskrit language, philosophical systems, and Upanishadic wisdom',
    apiEndpoint: '/api/cms/sanskrit-darshan-upanishad-bundle',
    cmsPath: '/cms/sanskrit-darshan-upanishad-bundle',
    frontendPath: '/packages/sanskrit-darshan-upanishad-bundle',
    type: 'PackageContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
    sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq']
  },

  sanskritPhilosophyBundle: {
    id: 'sanskrit-philosophy-bundle',
    name: 'Sanskrit Language + Hindu Philosophies Bundle',
    description: 'Perfect blend of Sanskrit language learning with core Hindu philosophical systems',
    apiEndpoint: '/api/cms/sanskrit-philosophy-bundle',
    cmsPath: '/cms/sanskrit-philosophy-bundle',
    frontendPath: '/packages/sanskrit-philosophy-bundle',
    type: 'PackageContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
    sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq']
  },

  hinduPhilosophiesUpanishadsBundle: {
    id: 'hindu-philosophies-upanishads-bundle',
    name: 'Hindu Philosophies + Upanishads Bundle',
    description: 'Comprehensive package focusing on philosophical systems and Upanishadic wisdom',
    apiEndpoint: '/api/cms/hindu-philosophies-upanishads-bundle',
    cmsPath: '/cms/hindu-philosophies-upanishads-bundle',
    frontendPath: '/packages/hindu-philosophies-upanishads-bundle',
    type: 'PackageContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
    sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq']
  },

  paraAparaBundle: {
    id: 'para-apara-bundle',
    name: 'Parā + Aparā Courses Bundle',
    description: 'The most comprehensive package including all Parā courses plus Chanakya Code',
    apiEndpoint: '/api/cms/para-apara-bundle',
    cmsPath: '/cms/para-apara-bundle',
    frontendPath: '/packages/para-apara-bundle',
    type: 'PackageContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
    sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq']
  },

  paraBundle: {
    id: 'para-bundle',
    name: 'All Parā Courses Bundle',
    description: 'Everything in traditional wisdom except Chanakya Code - pure spiritual and philosophical learning',
    apiEndpoint: '/api/cms/para-bundle',
    cmsPath: '/cms/para-bundle',
    frontendPath: '/packages/para-bundle',
    type: 'PackageContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
    sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq']
  },

  // Content Management
  blog: {
    id: 'blog',
    name: 'Blog Posts',
    description: 'Manage blog content and articles',
    apiEndpoint: '/api/cms/blog',
    cmsPath: '/cms/blog',
    frontendPath: '/blog',
    type: 'BlogContent',
    status: 'coming-soon',
    category: 'content',
    features: ['posts', 'categories', 'tags', 'authors'],
    sections: ['posts', 'categories', 'tags', 'authors']
  },

  events: {
    id: 'events',
    name: 'Events & Workshops',
    description: 'Manage events and workshops',
    apiEndpoint: '/api/cms/events',
    cmsPath: '/cms/events',
    frontendPath: '/events',
    type: null, // To be defined
    status: 'coming-soon',
    category: 'content',
    features: ['events', 'workshops', 'schedule', 'registration'],
    sections: ['events', 'workshops', 'schedule', 'registration']
  },

  // Enhanced Content Types
  enhancedHomepage: {
    id: 'enhanced-homepage',
    name: 'Enhanced Homepage',
    description: 'Advanced homepage with enhanced features',
    apiEndpoint: '/api/cms/enhanced-homepage',
    cmsPath: '/cms/enhanced-homepage',
    frontendPath: '/enhanced',
    type: 'EnhancedHomepageContent',
    status: 'active',
    category: 'main',
    features: ['advanced-hero', 'custom-backgrounds', 'dynamic-content', 'analytics'],
    sections: ['hero', 'features', 'background', 'analytics']
  }
};

// Helper functions for content type management
export class ContentRegistry {
  /**
   * Get all content types by category
   */
  static getContentTypesByCategory(category: string): ContentTypeConfig[] {
    return Object.values(CONTENT_TYPES).filter(type => type.category === category);
  }

  /**
   * Get all active content types
   */
  static getActiveContentTypes(): ContentTypeConfig[] {
    return Object.values(CONTENT_TYPES).filter(type => type.status === 'active');
  }

  /**
   * Get content type by ID
   */
  static getContentType(id: string): ContentTypeConfig | undefined {
    return Object.values(CONTENT_TYPES).find(type => type.id === id);
  }

  /**
   * Get all content types
   */
  static getAllContentTypes(): ContentTypeConfig[] {
    return Object.values(CONTENT_TYPES);
  }

  /**
   * Get content types with specific features
   */
  static getContentTypesWithFeature(feature: string): ContentTypeConfig[] {
    return Object.values(CONTENT_TYPES).filter(type => 
      type.features.includes(feature)
    );
  }

  /**
   * Get navigation structure for CMS sidebar
   */
  static getNavigationStructure() {
    const categories = ['main', 'education', 'content', 'system'];
    
    return categories.map(category => ({
      id: category,
      title: this.getCategoryTitle(category),
      items: this.getContentTypesByCategory(category).map(type => ({
        id: type.id,
        title: type.name,
        description: type.description,
        href: type.cmsPath,
        status: type.status,
        features: type.features,
        sections: type.sections
      }))
    }));
  }

  /**
   * Get category title
   */
  private static getCategoryTitle(category: string): string {
    const titles = {
      main: 'Main Pages',
      education: 'Education',
      content: 'Content Management',
      system: 'System'
    };
    return titles[category as keyof typeof titles] || category;
  }

  /**
   * Validate content type exists
   */
  static isValidContentType(id: string): boolean {
    return id in CONTENT_TYPES;
  }

  /**
   * Get API endpoint for content type
   */
  static getApiEndpoint(id: string): string | null {
    const contentType = this.getContentType(id);
    return contentType?.apiEndpoint || null;
  }

  /**
   * Get CMS path for content type
   */
  static getCmsPath(id: string): string | null {
    const contentType = this.getContentType(id);
    return contentType?.cmsPath || null;
  }

  /**
   * Get frontend path for content type
   */
  static getFrontendPath(id: string): string | null {
    const contentType = this.getContentType(id);
    return contentType?.frontendPath || null;
  }
}

// Export commonly used content types
export const MAIN_CONTENT_TYPES = ContentRegistry.getContentTypesByCategory('main');
export const EDUCATION_CONTENT_TYPES = ContentRegistry.getContentTypesByCategory('education');
export const CONTENT_MANAGEMENT_TYPES = ContentRegistry.getContentTypesByCategory('content');
export const ACTIVE_CONTENT_TYPES = ContentRegistry.getActiveContentTypes();

// Content type validation
export function validateContentType(id: string): boolean {
  return ContentRegistry.isValidContentType(id);
}

// Get content type configuration
export function getContentTypeConfig(id: string): ContentTypeConfig | null {
  return ContentRegistry.getContentType(id) || null;
}
