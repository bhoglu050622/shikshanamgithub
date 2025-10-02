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
    features: ['hero', 'schools', 'gurus', 'testimonials', 'community', 'mission'],
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
    features: ['hero', 'benefits', 'testimonials', 'cta'],
    sections: ['hero', 'benefits', 'testimonials', 'cta']
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
    features: ['hero', 'benefits', 'testimonials', 'schools', 'cta'],
    sections: ['hero', 'benefits', 'testimonials', 'schools', 'cta']
  },

  // Content Pages
  blog: {
    id: 'blog',
    name: 'Blog',
    description: 'Blog posts and articles',
    apiEndpoint: '/api/cms/blog',
    cmsPath: '/cms/blog',
    frontendPath: '/blog',
    type: 'BlogContent',
    status: 'active',
    category: 'content',
    features: ['hero', 'posts', 'categories', 'tags'],
    sections: ['hero', 'posts', 'categories', 'tags']
  },

  events: {
    id: 'events',
    name: 'Events',
    description: 'Events and workshops',
    apiEndpoint: '/api/cms/events',
    cmsPath: '/cms/events',
    frontendPath: '/events',
    type: 'BlogContent',
    status: 'active',
    category: 'content',
    features: ['hero', 'events', 'categories', 'registration'],
    sections: ['hero', 'events', 'categories', 'registration']
  },

  // Courses
  courses: {
    id: 'courses',
    name: 'Courses',
    description: 'Individual courses and learning programs',
    apiEndpoint: '/api/cms/courses',
    cmsPath: '/cms/courses',
    frontendPath: '/courses',
    type: 'BlogContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
    sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
  },

  // Packages
  packages: {
    id: 'packages',
    name: 'Packages',
    description: 'Course packages and bundles',
    apiEndpoint: '/api/cms/packages',
    cmsPath: '/cms/packages',
    frontendPath: '/packages',
    type: 'BlogContent',
    status: 'active',
    category: 'education',
    features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
    sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq']
  },

  // Additional Content Types
  wisdom: {
    id: 'wisdom',
    name: 'Wisdom',
    description: 'Wisdom articles and spiritual teachings',
    apiEndpoint: '/api/cms/wisdom',
    cmsPath: '/cms/edit/wisdom',
    frontendPath: '/wisdom',
    type: 'BlogContent',
    status: 'active',
    category: 'content',
    features: ['articles', 'categories', 'teachings', 'insights'],
    sections: ['hero', 'categories', 'articles', 'featured']
  },

  gurus: {
    id: 'gurus',
    name: 'Gurus',
    description: 'Spiritual teachers and their teachings',
    apiEndpoint: '/api/cms/gurus',
    cmsPath: '/cms/edit/gurus',
    frontendPath: '/gurus',
    type: 'BlogContent',
    status: 'active',
    category: 'content',
    features: ['profiles', 'teachings', 'biographies', 'courses'],
    sections: ['hero', 'featured', 'allGurus']
  },

  tools: {
    id: 'tools',
    name: 'Tools',
    description: 'Spiritual tools and calculators',
    apiEndpoint: '/api/cms/tools',
    cmsPath: '/cms/edit/tools',
    frontendPath: '/tools',
    type: 'BlogContent',
    status: 'active',
    category: 'content',
    features: ['calculators', 'assessments', 'tools'],
    sections: ['hero', 'categories', 'tools', 'featured']
  },

  terms: {
    id: 'terms',
    name: 'Terms of Service',
    description: 'Terms and conditions for using the platform',
    apiEndpoint: '/api/cms/terms',
    cmsPath: '/cms/edit/terms',
    frontendPath: '/terms',
    type: 'BlogContent',
    status: 'active',
    category: 'system',
    features: ['terms', 'conditions', 'liability'],
    sections: ['hero', 'introduction', 'acceptance', 'useOfPlatform', 'intellectualProperty', 'userAccounts', 'paymentTerms', 'privacy', 'limitationOfLiability', 'indemnification', 'disputeResolution', 'changesToTerms', 'contact']
  },

  privacy: {
    id: 'privacy',
    name: 'Privacy Policy',
    description: 'Privacy policy and data protection information',
    apiEndpoint: '/api/cms/privacy',
    cmsPath: '/cms/edit/privacy',
    frontendPath: '/privacy',
    type: 'BlogContent',
    status: 'active',
    category: 'system',
    features: ['policy', 'data-protection', 'cookies'],
    sections: ['hero', 'introduction', 'dataCollection', 'dataUsage', 'dataProtection', 'cookies', 'yourRights', 'contact']
  },

  help: {
    id: 'help',
    name: 'Help Center',
    description: 'FAQ, tutorials, and support documentation',
    apiEndpoint: '/api/cms/help',
    cmsPath: '/cms/edit/help',
    frontendPath: '/help',
    type: 'BlogContent',
    status: 'active',
    category: 'system',
    features: ['faq', 'tutorials', 'support'],
    sections: ['hero', 'categories', 'tutorials', 'support', 'community']
  },

  accessibility: {
    id: 'accessibility',
    name: 'Accessibility',
    description: 'Accessibility statement and compliance information',
    apiEndpoint: '/api/cms/accessibility',
    cmsPath: '/cms/edit/accessibility',
    frontendPath: '/accessibility',
    type: 'BlogContent',
    status: 'active',
    category: 'system',
    features: ['statement', 'compliance', 'features'],
    sections: ['hero', 'statement', 'features', 'compliance', 'support']
  },

  career: {
    id: 'career',
    name: 'Career',
    description: 'Job listings, company culture, and application process',
    apiEndpoint: '/api/cms/career',
    cmsPath: '/cms/edit/career',
    frontendPath: '/career',
    type: 'BlogContent',
    status: 'active',
    category: 'main',
    features: ['jobs', 'culture', 'benefits'],
    sections: ['hero', 'culture', 'benefits', 'jobs', 'applicationProcess']
  }

};

// Content Registry Class
export class ContentRegistry {
  private static contentTypes = CONTENT_TYPES;

  static getContentType(id: string): ContentTypeConfig | undefined {
    return this.contentTypes[id];
  }

  static getAllContentTypes(): ContentTypeConfig[] {
    return Object.values(this.contentTypes);
  }

  static getContentTypesByCategory(category: string): ContentTypeConfig[] {
    return Object.values(this.contentTypes).filter(
      contentType => contentType.category === category
    );
  }

  static getActiveContentTypes(): ContentTypeConfig[] {
    return Object.values(this.contentTypes).filter(
      contentType => contentType.status === 'active'
    );
  }

  static getContentTypeIds(): string[] {
    return Object.keys(this.contentTypes);
  }

  static getContentTypeCount(): number {
    return Object.keys(this.contentTypes).length;
  }

  static getContentTypesByStatus(status: string): ContentTypeConfig[] {
    return Object.values(this.contentTypes).filter(
      contentType => contentType.status === status
    );
  }
}

export default ContentRegistry;