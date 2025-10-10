/**
 * Static data for the website
 * This replaces the CMS functionality with hardcoded content
 */

export interface HeroData {
  heading: string;
  subheading?: string;
  backgroundImage?: string;
}

export interface FeatureItem {
  title: string;
  description?: string;
  icon?: string;
}

export interface FeatureBlock {
  title: string;
  items: FeatureItem[];
}

export interface CTABlock {
  eyebrow?: string;
  buttonText: string;
  buttonUrl: string;
}

export type ContentBlock = HeroData | FeatureBlock | CTABlock;

export interface Page {
  slug: string;
  title: string;
  hero: HeroData;
  body: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface Footer {
  links: FooterLink[];
}

// Static content data
export const staticPages: Record<string, Page> = {
  home: {
    slug: 'home',
    title: 'Shikshanam - Ancient Wisdom for Modern Life',
    hero: {
      heading: 'Discover Ancient Wisdom for Modern Life',
      subheading: 'Explore the profound teachings of Indian philosophy, Sanskrit language, and spiritual practices that have guided humanity for millennia.'
    },
    body: `
# Welcome to Shikshanam

Shikshanam is your gateway to the profound wisdom of ancient India. Our platform offers comprehensive courses in:

- **Sanskrit Language**: Master the language of the Vedas and classical texts
- **Philosophy (Darshan)**: Explore the six schools of Indian philosophy
- **Spiritual Practices**: Learn meditation, yoga, and mindfulness techniques
- **Cultural Heritage**: Understand the rich traditions and practices

## Why Choose Shikshanam?

Our courses are designed by expert scholars and practitioners who bring decades of experience in traditional learning methods combined with modern pedagogical approaches.

### Expert Instructors
Learn from renowned scholars and practitioners who have dedicated their lives to studying and teaching these ancient traditions.

### Comprehensive Curriculum
Our courses cover everything from beginner-friendly introductions to advanced philosophical concepts.

### Flexible Learning
Study at your own pace with our online platform, designed to accommodate your busy lifestyle.

## Get Started Today

Begin your journey into ancient wisdom with our carefully curated courses designed for modern learners.
    `
  }
};

export const staticFooter: Footer = {
  links: [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' }
  ]
};

export const staticFeatures: FeatureBlock = {
  title: 'Why Choose Shikshanam?',
  items: [
    {
      title: 'Expert Instructors',
      description: 'Learn from renowned scholars and practitioners with decades of experience in traditional learning methods.',
      icon: '👨‍🏫'
    },
    {
      title: 'Comprehensive Curriculum',
      description: 'From beginner-friendly introductions to advanced philosophical concepts, we cover it all.',
      icon: '📚'
    },
    {
      title: 'Flexible Learning',
      description: 'Study at your own pace with our online platform designed for modern lifestyles.',
      icon: '⏰'
    },
    {
      title: 'Authentic Sources',
      description: 'All content is based on original texts and traditional teaching methods.',
      icon: '📜'
    },
    {
      title: 'Community Support',
      description: 'Join a community of like-minded learners on their spiritual journey.',
      icon: '🤝'
    },
    {
      title: 'Lifetime Access',
      description: 'Once enrolled, you have lifetime access to all course materials and updates.',
      icon: '♾️'
    }
  ]
};

// Helper functions to replace CMS queries
export async function getPage(slug: string): Promise<Page | null> {
  return staticPages[slug] || null;
}

export async function getFooter(): Promise<Footer> {
  return staticFooter;
}

export async function getFeatures(): Promise<FeatureBlock> {
  return staticFeatures;
}
