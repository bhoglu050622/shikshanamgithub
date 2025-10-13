// Course Landing Page Type Definitions

export interface CourseMetadata {
  title: string;
  subtitle?: string;
  description: string;
  type: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  language?: string;
  status: 'available' | 'coming-soon' | 'sold-out';
  features: string[];
  thumbnail?: string;
  category: string;
  priority?: number;
}

export interface CourseInstructor {
  id?: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
  credentials?: string[];
  experience?: string; // e.g., "10+ years teaching Indian Philosophy"
  specialization?: string[]; // Areas of expertise
  achievements?: string[];
  socialLinks?: {
    youtube?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface CourseHighlight {
  icon: string; // LucideIcon name as string
  title: string;
  description: string;
}

export interface CourseSyllabus {
  title: string;
  subtitle?: string;
  duration?: string;
  videoCount?: number;
  topics: string[];
  description?: string;
  caseStudy?: string;
  isFree?: boolean;
}

export interface CourseOutcome {
  icon?: string;
  title: string;
  description: string;
}

export interface CourseTestimonial {
  name: string;
  role?: string;
  avatar?: string;
  image?: string;
  content: string;
  rating?: number;
  category?: string;
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface CourseStats {
  students?: string;
  rating?: number;
  reviews?: number;
  completionRate?: string;
  satisfaction?: string;
  hours?: string;
  lessons?: number;
  worksheets?: string;
  accessYears?: number;
}

export interface CourseCertificate {
  title: string;
  description: string;
  features: string[];
  image?: string;
}

export interface CourseEnrollmentInfo {
  checkoutLink: string;
  contactEmail?: string;
  contactPhone?: string;
  whatsapp?: string;
  whatsappGroup?: boolean;
  supportEmail?: string;
  supportPhone?: string;
  earlyBirdOffer?: {
    enabled: boolean;
    deadline?: string;
    discount?: string;
  };
  groupDiscount?: {
    enabled: boolean;
    minStudents?: number;
    discount?: string;
  };
}

export interface CourseContent {
  metadata: CourseMetadata;
  instructor?: CourseInstructor;
  instructors?: CourseInstructor[];
  highlights: CourseHighlight[];
  whyCourse?: {
    title: string;
    description: string;
    points: string[];
  };
  syllabus: CourseSyllabus[];
  outcomes: CourseOutcome[];
  testimonials: CourseTestimonial[];
  faqs: CourseFAQ[];
  stats?: CourseStats;
  certificate?: CourseCertificate;
  enrollment: CourseEnrollmentInfo;
  videoPromo?: string;
  heroImage?: string;
  demoVideos?: {
    title: string;
    description: string;
    url: string;
    duration: string;
    isFree?: boolean;
  }[];
}

export type ThemeVariant = 'philosophy' | 'upanishad' | 'sanskrit' | 'practical' | 'advanced';

