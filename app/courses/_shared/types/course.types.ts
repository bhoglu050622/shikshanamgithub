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
  status: 'available' | 'coming-soon' | 'sold-out';
  features: string[];
  thumbnail?: string;
  category: string;
  priority?: number;
}

export interface CourseInstructor {
  name: string;
  title: string;
  bio: string;
  image?: string;
  credentials?: string[];
  experience?: string;
  specialization?: string[];
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
  topics: string[];
  description?: string;
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
  content: string;
  rating?: number;
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
}

export interface CourseCertificate {
  title: string;
  description: string;
  features: string[];
  image?: string;
}

export interface CourseEnrollmentInfo {
  checkoutLink: string;
  contactNumber?: string;
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
}

export type ThemeVariant = 'philosophy' | 'upanishad' | 'sanskrit' | 'practical' | 'advanced';

