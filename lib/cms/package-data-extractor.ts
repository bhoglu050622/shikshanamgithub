// Package data extractor for individual packages
export interface PackageData {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  duration: string;
  level: string;
  instructor: string;
  features: string[];
  courses: Array<{
    id: string;
    title: string;
    description: string;
    duration: string;
    level: string;
  }>;
  curriculum: {
    modules: Array<{
      moduleNumber: number;
      title: string;
      description: string;
      tag: string;
      totalTime: string;
      courses: string[];
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
  benefits: string[];
  targetAudience: string[];
}

// Individual package data
export const packageDataMap: Record<string, PackageData> = {
  'sanskrit-basics': {
    id: 'sanskrit-basics',
    title: 'Sanskrit Basics Package',
    description: 'Complete Sanskrit learning journey from basics to conversation level',
    price: '₹4,999',
    originalPrice: '₹7,999',
    duration: '12-15 weeks',
    level: 'Beginner',
    instructor: 'Dr. Rajesh Kumar',
    features: [
      'Grammar Fundamentals',
      'Vocabulary Building',
      'Conversation Practice',
      'Cultural Context',
      'Interactive Sessions',
      'Certificate of Completion'
    ],
    courses: [
      {
        id: 'sanskrit-alphabet',
        title: 'Sanskrit Alphabet and Pronunciation',
        description: 'Master the Devanagari script and correct pronunciation',
        duration: '3 weeks',
        level: 'Beginner'
      },
      {
        id: 'basic-grammar',
        title: 'Basic Sanskrit Grammar',
        description: 'Learn fundamental grammar rules and sentence structure',
        duration: '4 weeks',
        level: 'Beginner'
      },
      {
        id: 'conversation-practice',
        title: 'Conversation Practice',
        description: 'Practice speaking Sanskrit in everyday situations',
        duration: '5 weeks',
        level: 'Intermediate'
      }
    ],
    curriculum: {
      modules: [
        {
          moduleNumber: 1,
          title: 'Foundation Module',
          description: 'Building strong Sanskrit foundation',
          tag: 'Foundation',
          totalTime: '6 weeks',
          courses: ['sanskrit-alphabet', 'basic-grammar']
        },
        {
          moduleNumber: 2,
          title: 'Practice Module',
          description: 'Practical application and conversation',
          tag: 'Practice',
          totalTime: '6 weeks',
          courses: ['conversation-practice']
        }
      ]
    },
    testimonials: [
      {
        name: 'Priya Sharma',
        quote: 'This package gave me a solid foundation in Sanskrit. The structured approach made learning enjoyable.',
        rating: 5,
        role: 'Student'
      },
      {
        name: 'Rajesh Kumar',
        quote: 'Excellent package for Sanskrit beginners. The instructor is very patient and knowledgeable.',
        rating: 5,
        role: 'Student'
      }
    ],
    faq: [
      {
        question: 'Do I need any prior knowledge of Sanskrit?',
        answer: 'No prior knowledge is required. This package is designed for complete beginners.'
      },
      {
        question: 'What materials are included?',
        answer: 'All study materials, audio files, and practice exercises are included in the package.'
      }
    ],
    benefits: [
      'Complete Sanskrit foundation',
      'Interactive learning experience',
      'Cultural context and history',
      'Certificate of completion',
      'Lifetime access to materials'
    ],
    targetAudience: [
      'Sanskrit enthusiasts',
      'Students of Indian philosophy',
      'Yoga practitioners',
      'Anyone interested in ancient Indian culture'
    ]
  },
  'philosophy-foundations': {
    id: 'philosophy-foundations',
    title: 'Philosophy Foundations Bundle',
    description: 'Six classical schools of Indian philosophy with comprehensive study materials',
    price: '₹8,999',
    originalPrice: '₹12,999',
    duration: '16 weeks',
    level: 'Intermediate',
    instructor: 'Dr. Vishal Chaurasia',
    features: [
      'Six Classical Schools',
      'Interactive Discussions',
      'Expert Guidance',
      'Study Materials',
      'Live Q&A Sessions',
      'Certificates for Each School'
    ],
    courses: [
      {
        id: 'nyaya-school',
        title: 'Nyaya - The School of Logic',
        description: 'Master the art of logical reasoning and debate',
        duration: '3 weeks',
        level: 'Intermediate'
      },
      {
        id: 'vaisheshik-school',
        title: 'Vaisheshik - The Atomic Theory',
        description: 'Understand the material reality and atomic theory',
        duration: '3 weeks',
        level: 'Intermediate'
      },
      {
        id: 'samkhya-school',
        title: 'Samkhya - The Analytical School',
        description: 'Explore dualism and consciousness',
        duration: '3 weeks',
        level: 'Intermediate'
      },
      {
        id: 'yoga-school',
        title: 'Yoga - The Practical Philosophy',
        description: 'Learn meditation and self-realization',
        duration: '3 weeks',
        level: 'Intermediate'
      },
      {
        id: 'mimamsa-school',
        title: 'Mimamsa - The Ritual School',
        description: 'Understand Vedic interpretation and dharma',
        duration: '2 weeks',
        level: 'Advanced'
      },
      {
        id: 'vedanta-school',
        title: 'Vedanta - The Culmination',
        description: 'Explore non-dualism and ultimate reality',
        duration: '2 weeks',
        level: 'Advanced'
      }
    ],
    curriculum: {
      modules: [
        {
          moduleNumber: 1,
          title: 'Foundational Schools',
          description: 'Nyaya and Vaisheshik schools',
          tag: 'Foundation',
          totalTime: '6 weeks',
          courses: ['nyaya-school', 'vaisheshik-school']
        },
        {
          moduleNumber: 2,
          title: 'Practical Schools',
          description: 'Samkhya and Yoga schools',
          tag: 'Practice',
          totalTime: '6 weeks',
          courses: ['samkhya-school', 'yoga-school']
        },
        {
          moduleNumber: 3,
          title: 'Advanced Schools',
          description: 'Mimamsa and Vedanta schools',
          tag: 'Advanced',
          totalTime: '4 weeks',
          courses: ['mimamsa-school', 'vedanta-school']
        }
      ]
    },
    testimonials: [
      {
        name: 'Dr. Ananya Singh',
        quote: 'This bundle provided a comprehensive understanding of Indian philosophy. Highly recommended for serious students.',
        rating: 5,
        role: 'Philosophy Student'
      },
      {
        name: 'Prof. Rajesh Kumar',
        quote: 'Excellent resource for understanding the depth of Indian philosophical thought.',
        rating: 5,
        role: 'Academic'
      }
    ],
    faq: [
      {
        question: 'What background knowledge is required?',
        answer: 'Basic understanding of philosophy is helpful, but the course provides necessary context for all concepts.'
      },
      {
        question: 'Are there any prerequisites?',
        answer: 'No specific prerequisites, but a genuine interest in philosophy is recommended.'
      }
    ],
    benefits: [
      'Comprehensive philosophical education',
      'Expert guidance from renowned scholars',
      'Interactive learning environment',
      'Certificates for each school studied',
      'Lifetime access to materials'
    ],
    targetAudience: [
      'Philosophy students',
      'Spiritual seekers',
      'Academic researchers',
      'Anyone interested in Indian thought'
    ]
  },
  'self-help-wisdom': {
    id: 'self-help-wisdom',
    title: 'Self-Help Wisdom Collection',
    description: 'Practical wisdom for modern living from ancient Indian texts',
    price: '₹3,999',
    originalPrice: '₹5,999',
    duration: '10 weeks',
    level: 'All Levels',
    instructor: 'Vishal Chaurasia',
    features: [
      'Ancient Wisdom',
      'Modern Applications',
      'Practical Exercises',
      'Personal Transformation',
      'Community Support',
      'Lifetime Access'
    ],
    courses: [
      {
        id: 'bhagavad-gita-wisdom',
        title: 'Bhagavad Gita for Modern Life',
        description: 'Apply Gita\'s teachings to contemporary challenges',
        duration: '3 weeks',
        level: 'All Levels'
      },
      {
        id: 'chanakya-strategies',
        title: 'Chanakya\'s Strategies for Success',
        description: 'Learn ancient strategies for modern success',
        duration: '3 weeks',
        level: 'All Levels'
      },
      {
        id: 'yoga-lifestyle',
        title: 'Yoga Lifestyle Integration',
        description: 'Integrate yoga principles into daily life',
        duration: '2 weeks',
        level: 'All Levels'
      },
      {
        id: 'meditation-practices',
        title: 'Meditation and Mindfulness',
        description: 'Ancient meditation techniques for modern life',
        duration: '2 weeks',
        level: 'All Levels'
      }
    ],
    curriculum: {
      modules: [
        {
          moduleNumber: 1,
          title: 'Foundation Wisdom',
          description: 'Core principles from ancient texts',
          tag: 'Foundation',
          totalTime: '6 weeks',
          courses: ['bhagavad-gita-wisdom', 'chanakya-strategies']
        },
        {
          moduleNumber: 2,
          title: 'Practical Application',
          description: 'Applying wisdom to daily life',
          tag: 'Practice',
          totalTime: '4 weeks',
          courses: ['yoga-lifestyle', 'meditation-practices']
        }
      ]
    },
    testimonials: [
      {
        name: 'Meera Patel',
        quote: 'This collection transformed my approach to life. The ancient wisdom is incredibly relevant today.',
        rating: 5,
        role: 'Professional'
      },
      {
        name: 'Amit Sharma',
        quote: 'Practical and applicable wisdom that has improved my daily life significantly.',
        rating: 5,
        role: 'Student'
      }
    ],
    faq: [
      {
        question: 'Is this suitable for beginners?',
        answer: 'Yes, this collection is designed for all levels and provides practical guidance for everyone.'
      },
      {
        question: 'How much time do I need to dedicate?',
        answer: 'Just 30-45 minutes per day is sufficient to see meaningful changes.'
      }
    ],
    benefits: [
      'Practical life wisdom',
      'Personal transformation',
      'Stress reduction techniques',
      'Better decision making',
      'Improved relationships',
      'Lifetime access to materials'
    ],
    targetAudience: [
      'Self-improvement enthusiasts',
      'Stress management seekers',
      'Personal development focused individuals',
      'Anyone seeking life wisdom'
    ]
  }
};

export const getAllPackageData = () => {
  return Object.values(packageDataMap);
};

export const getPackageById = (id: string): PackageData | undefined => {
  return packageDataMap[id];
};
