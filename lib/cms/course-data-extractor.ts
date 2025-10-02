// Course data extractor for individual courses
export interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  instructor: string;
  language: string;
  price: string;
  originalPrice?: string;
  duration: string;
  level: string;
  rating: number;
  reviewCount: number;
  type: string;
  status: string;
  checkoutLink: string;
  contactNumber: string;
  description: string;
  features: string[];
  curriculum: {
    modules: Array<{
      moduleNumber: number;
      title: string;
      description: string;
      tag: string;
      totalTime: string;
      lessons?: Array<{
        title: string;
        type: string;
        duration: string;
      }>;
    }>;
  };
  testimonials: Array<{
    name: string;
    quote: string;
    rating: number;
    role?: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

// Individual course data
export const courseDataMap: Record<string, CourseData> = {
  'tantra-darshan': {
    id: 'tantra-darshan',
    title: 'प्राचीन तंत्र दर्शन',
    subtitle: 'Decoding the principles of Tantra',
    instructor: 'Vishal Chaurasia',
    language: 'Hindi',
    price: 'Free',
    originalPrice: undefined,
    duration: '2-3 hours',
    level: 'All Levels',
    rating: 5,
    reviewCount: 23,
    type: 'Free Course',
    status: 'available',
    checkoutLink: 'https://courses.shikshanam.in/single-checkout/6700f323b6e40105f97a57ed?pid=p1',
    contactNumber: '9910032165',
    description: 'Introduction to ancient tantric philosophy and its practical applications in modern life',
    features: [
      'Basic Tantric Concepts',
      'Safe Introduction',
      'Community Access',
      'Path to Advanced Study'
    ],
    curriculum: {
      modules: [
        {
          moduleNumber: 1,
          title: 'Introduction to Tantra',
          description: 'Understanding the fundamental principles of Tantra',
          tag: 'Foundation',
          totalTime: '45 minutes',
          lessons: [
            { title: 'What is Tantra?', type: 'Video', duration: '20 min' },
            { title: 'Historical Context', type: 'Video', duration: '15 min' },
            { title: 'Modern Applications', type: 'Video', duration: '10 min' }
          ]
        },
        {
          moduleNumber: 2,
          title: 'Core Concepts',
          description: 'Deep dive into tantric philosophy',
          tag: 'Theory',
          totalTime: '60 minutes',
          lessons: [
            { title: 'Shiva-Shakti Principle', type: 'Video', duration: '25 min' },
            { title: 'Chakra System', type: 'Video', duration: '20 min' },
            { title: 'Kundalini Energy', type: 'Video', duration: '15 min' }
          ]
        }
      ]
    },
    testimonials: [
      {
        name: 'Priya Sharma',
        quote: 'This course opened my eyes to the depth of tantric philosophy. Highly recommended!',
        rating: 5,
        role: 'Student'
      },
      {
        name: 'Rajesh Kumar',
        quote: 'Excellent introduction to tantra. The instructor explains complex concepts very clearly.',
        rating: 5,
        role: 'Student'
      }
    ],
    faq: [
      {
        question: 'Is this course suitable for beginners?',
        answer: 'Yes, this course is designed for all levels and provides a safe introduction to tantric philosophy.'
      },
      {
        question: 'What materials do I need?',
        answer: 'No special materials are required. Just an open mind and willingness to learn.'
      }
    ]
  },
  'yoga-advanced': {
    id: 'yoga-advanced',
    title: 'Tatvabodha: Masterclass 3 – Yoga Darshan',
    subtitle: 'Vibhuti and Kaivalya Pada',
    instructor: 'Vishal Chaurasia',
    language: 'Hindi',
    price: 'Free',
    originalPrice: undefined,
    duration: '3-4 hours',
    level: 'Intermediate',
    rating: 5,
    reviewCount: 20,
    type: 'Free Masterclass',
    status: 'available',
    checkoutLink: 'https://courses.shikshanam.in/single-checkout/yoga-advanced',
    contactNumber: '9910032165',
    description: 'Deep dive into the advanced concepts of Yoga philosophy focusing on supernatural powers and liberation',
    features: [
      'Advanced Yoga Concepts',
      'Liberation Theory',
      'Practical Application',
      'Live Q&A'
    ],
    curriculum: {
      modules: [
        {
          moduleNumber: 1,
          title: 'Vibhuti Pada - Supernatural Powers',
          description: 'Understanding the eight supernatural powers in Yoga',
          tag: 'Advanced',
          totalTime: '90 minutes',
          lessons: [
            { title: 'Introduction to Vibhuti', type: 'Video', duration: '30 min' },
            { title: 'The Eight Siddhis', type: 'Video', duration: '45 min' },
            { title: 'Practical Applications', type: 'Video', duration: '15 min' }
          ]
        },
        {
          moduleNumber: 2,
          title: 'Kaivalya Pada - Liberation',
          description: 'The path to ultimate liberation in Yoga philosophy',
          tag: 'Philosophy',
          totalTime: '120 minutes',
          lessons: [
            { title: 'Understanding Kaivalya', type: 'Video', duration: '40 min' },
            { title: 'The Process of Liberation', type: 'Video', duration: '50 min' },
            { title: 'Integration and Practice', type: 'Video', duration: '30 min' }
          ]
        }
      ]
    },
    testimonials: [
      {
        name: 'Dr. Ananya Singh',
        quote: 'This masterclass provided deep insights into Yoga philosophy. The instructor\'s knowledge is exceptional.',
        rating: 5,
        role: 'Philosophy Student'
      }
    ],
    faq: [
      {
        question: 'What background knowledge is required?',
        answer: 'Basic understanding of Yoga philosophy is recommended, but the course provides necessary context.'
      }
    ]
  },
  'emotional-intelligence': {
    id: 'emotional-intelligence',
    title: 'Emotional Intelligence with Samkhya Darshan',
    subtitle: 'Master your emotions through ancient wisdom',
    instructor: 'Vishal Chaurasia',
    language: 'Hindi',
    price: '₹2,999',
    originalPrice: '₹4,999',
    duration: '8 weeks',
    level: 'Intermediate',
    rating: 4.8,
    reviewCount: 150,
    type: 'Premium Course',
    status: 'available',
    checkoutLink: 'https://courses.shikshanam.in/single-checkout/emotional-intelligence',
    contactNumber: '9910032165',
    description: 'Learn to master your emotions using the ancient wisdom of Samkhya philosophy',
    features: [
      'Emotional Regulation',
      'Samkhya Philosophy',
      'Practical Exercises',
      'Personal Transformation'
    ],
    curriculum: {
      modules: [
        {
          moduleNumber: 1,
          title: 'Understanding Emotions',
          description: 'Introduction to emotional intelligence and Samkhya philosophy',
          tag: 'Foundation',
          totalTime: '120 minutes',
          lessons: [
            { title: 'What are Emotions?', type: 'Video', duration: '30 min' },
            { title: 'Samkhya Perspective', type: 'Video', duration: '45 min' },
            { title: 'Self-Assessment', type: 'Activity', duration: '45 min' }
          ]
        },
        {
          moduleNumber: 2,
          title: 'Prakriti and Purusha',
          description: 'Understanding the dual nature of existence in Samkhya',
          tag: 'Philosophy',
          totalTime: '150 minutes',
          lessons: [
            { title: 'The Nature of Prakriti', type: 'Video', duration: '50 min' },
            { title: 'Understanding Purusha', type: 'Video', duration: '50 min' },
            { title: 'Practical Applications', type: 'Video', duration: '50 min' }
          ]
        }
      ]
    },
    testimonials: [
      {
        name: 'Meera Patel',
        quote: 'This course transformed how I understand and manage my emotions. The Samkhya perspective is eye-opening.',
        rating: 5,
        role: 'Professional'
      }
    ],
    faq: [
      {
        question: 'How long does it take to see results?',
        answer: 'Most students report noticeable changes within 2-3 weeks of consistent practice.'
      }
    ]
  }
};

export const getAllCourseData = () => {
  return Object.values(courseDataMap);
};

export const getCourseById = (id: string): CourseData | undefined => {
  return courseDataMap[id];
};
