import { HomepageContent } from './types';
import fs from 'fs';
import path from 'path';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'homepage-content.json');

// Default content structure
const defaultContent: HomepageContent = {
  hero: {
    title: "Welcome to Shikshanam",
    subtitle: "Where AI meets Ancient India",
    ctaButtons: {
      sanskrit: {
        text: "School of Sanskrit",
        link: "#school-of-sanskrit"
      },
      darshan: {
        text: "School of Darshan", 
        link: "#school-of-darshan"
      },
      lifeSkills: {
        text: "School of Life Skills",
        link: "#school-of-life-skills"
      }
    }
  },
  alignYourself: {
    title: "Two Ways to Begin Your Journey!",
    subtitle: "Learn through interactive Live Classes, or walk your own path of Swadhyaya with Self-Paced Courses.",
    description: "Choose your learning path with our comprehensive educational offerings.",
    courses: [
      {
        id: "sanskrit-basics",
        title: "Sanskrit Basics",
        description: "Learn the fundamentals of Sanskrit language",
        link: "/courses/sanskrit-basics",
        icon: "book"
      },
      {
        id: "philosophy-intro",
        title: "Philosophy Introduction",
        description: "Introduction to Indian philosophy",
        link: "/courses/philosophy-intro",
        icon: "brain"
      }
    ],
    liveClasses: [
      {
        id: 1,
        title: "Vedic Mathematics Masterclass",
        instructor: "Guru Rajesh Kumar",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center",
        duration: "2 hours",
        date: "2024-01-15",
        time: "7:00 PM IST",
        price: "₹299",
        rating: 4.9,
        students: 120,
        link: "https://example.com/vedic-math-live",
        description: "Learn ancient mathematical techniques for faster calculations"
      }
    ],
    selfPacedCourses: [
      {
        id: 1,
        title: "Complete Bhagavad Gita Study",
        description: "Comprehensive study of the Bhagavad Gita with commentary and practical insights",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center",
        duration: "40 hours",
        modules: 12,
        price: "₹1,999",
        rating: 4.9,
        students: 1500,
        link: "https://example.com/bhagavad-gita-course",
        level: "Intermediate",
        instructor: "Dr. Krishna Das"
      }
    ]
  },
  schools: {
    title: "Explore Our Schools",
    subtitle: "Discover the ancient wisdom through our structured learning paths",
    description: "Our schools offer comprehensive learning paths in Sanskrit, philosophy, and life skills.",
    schools: [
      {
        id: "school-of-sanskrit",
        name: "School of Sanskrit",
        description: "Master the ancient language that holds the key to Vedic wisdom, classical literature, and spiritual texts.",
        link: "/schools/sanskrit",
        icon: "book",
        color: "primary"
      },
      {
        id: "school-of-darshan",
        name: "School of Darshana",
        description: "Explore the six classical schools of Indian philosophy and discover the nature of reality, consciousness, and existence.",
        icon: "lightbulb",
        color: "secondary",
        link: "/schools/darshana"
      },
      {
        id: "school-of-life-skills",
        name: "School of Life Skills",
        description: "Discover practical wisdom from ancient texts to transform your life, relationships, and personal growth.",
        icon: "heart",
        color: "accent",
        link: "/schools/self-help"
      }
    ]
  },
  meetGurus: {
    title: "Meet Our Gurus",
    subtitle: "Learn from authentic teachers of ancient wisdom",
    description: "Our experienced teachers guide you through the ancient wisdom traditions.",
    gurus: []
  },
  studentStories: {
    title: "Student Stories",
    subtitle: "Hear from our community of learners",
    stories: []
  },
  testimonials: {
    title: "What Our Students Say",
    subtitle: "Real experiences from our learning community",
    testimonials: []
  },
  communityPosts: {
    title: "Community Insights",
    subtitle: "Latest thoughts and discussions from our community",
    posts: []
  },
  foundersMission: {
    title: "Our Mission",
    subtitle: "Bridging ancient wisdom with modern learning",
    content: "We believe in making ancient Indian wisdom accessible to everyone through modern technology and pedagogy.",
    image: "",
    founderName: "Founder Name",
    founderTitle: "Founder & CEO"
  },
  contribute: {
    title: "Contribute to Our Mission",
    subtitle: "Help us spread ancient wisdom",
    content: "Join our community of contributors and help preserve and share ancient knowledge.",
    ctaText: "Get Involved",
    ctaLink: "/contribute"
  },
  downloadApp: {
    title: "Download Our App",
    subtitle: "Learn on the go with our mobile application",
    features: [
      {
        id: "offline",
        title: "Offline Learning",
        description: "Download content and learn anywhere",
        icon: "download"
      }
    ],
    downloadLinks: {
      android: "https://play.google.com/store",
      ios: "https://apps.apple.com/store"
    }
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions",
    description: "Get answers to the most commonly asked questions about our platform and courses.",
    questions: [
      {
        id: "1",
        question: "What is Shikshanam?",
        answer: "Shikshanam is a platform that combines AI with ancient Indian wisdom to provide modern learning experiences."
      }
    ]
  }
};

export class ContentManager {
  private static instance: ContentManager;
  private content: HomepageContent;

  private constructor() {
    this.content = this.loadContent();
  }

  public static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  private loadContent(): HomepageContent {
    // In development, use filesystem
    try {
      if (fs.existsSync(CONTENT_FILE_PATH)) {
        const fileContent = fs.readFileSync(CONTENT_FILE_PATH, 'utf8');
        return JSON.parse(fileContent);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
    
    // Create default content file if it doesn't exist
    this.saveContent(defaultContent);
    return defaultContent;
  }

  public getContent(): HomepageContent {
    return this.content;
  }

  public updateContent(newContent: HomepageContent): void {
    this.content = newContent;
    this.saveContent(newContent);
  }

  public updateSection(section: keyof HomepageContent, data: any): void {
    this.content[section] = { ...this.content[section], ...data };
    this.saveContent(this.content);
  }

  private saveContent(content: HomepageContent): void {
    try {
      // Ensure data directory exists
      const dataDir = path.dirname(CONTENT_FILE_PATH);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2));
    } catch (error) {
      console.error('Error saving content:', error);
      throw new Error('Failed to save content');
    }
  }

  public resetToDefault(): void {
    this.content = defaultContent;
    this.saveContent(defaultContent);
  }
}

// Generic content manager functions for different content types
export async function readContent<T>(filename: string): Promise<T> {
  try {
    const filePath = path.join(process.cwd(), 'data', filename);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent);
    }
    throw new Error(`Content file ${filename} not found`);
  } catch (error) {
    console.error(`Error reading content from ${filename}:`, error);
    throw error;
  }
}

export async function writeContent<T>(filename: string, content: T): Promise<void> {
  try {
    const filePath = path.join(process.cwd(), 'data', filename);
    
    // Ensure data directory exists
    const dataDir = path.dirname(filePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  } catch (error) {
    console.error(`Error writing content to ${filename}:`, error);
    throw error;
  }
}
