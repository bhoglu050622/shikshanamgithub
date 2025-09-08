// Comprehensive dummy data fixtures for all 13 package SKUs
// This provides realistic data for frontend development without backend

import { Package, Session, UserPackage, Testimonial, FAQItem } from '@/lib/types/packages';

export const dummyPackages: Package[] = [
  {
    sku: 'sanskrit-foundations',
    name: 'Sanskrit Foundations',
    shortDescription: 'Master the fundamentals of Sanskrit language with comprehensive grammar, vocabulary, and pronunciation.',
    longDescription: `Begin your journey into the ancient and sacred language of Sanskrit with our comprehensive foundations course. This package covers everything from the Devanagari script to basic grammar structures, essential vocabulary, and proper pronunciation techniques.

You'll learn through interactive lessons, practice exercises, and guided pronunciation sessions. Our expert instructors will help you build a solid foundation in Sanskrit that will serve you throughout your spiritual and academic journey.

The course includes:
- Complete Devanagari script mastery
- Basic grammar and sentence structure
- Essential vocabulary (500+ words)
- Pronunciation and chanting techniques
- Reading and writing practice
- Cultural context and historical significance

Perfect for beginners who want to understand Sanskrit texts, participate in traditional ceremonies, or pursue deeper studies in Vedic literature.`,
    priceInr: 2999,
    originalPriceInr: 3999,
    thumbnailUrl: '/assets/packages/sanskrit-foundations.jpg',
    includedCourses: [
      {
        id: 'sanskrit-alphabet',
        title: 'Devanagari Script Mastery',
        duration: '3 weeks',
        link: '/courses/sanskrit-alphabet'
      },
      {
        id: 'sanskrit-grammar-basics',
        title: 'Basic Sanskrit Grammar',
        duration: '4 weeks',
        link: '/courses/sanskrit-grammar-basics'
      },
      {
        id: 'sanskrit-vocabulary',
        title: 'Essential Sanskrit Vocabulary',
        duration: '2 weeks',
        link: '/courses/sanskrit-vocabulary'
      },
      {
        id: 'sanskrit-pronunciation',
        title: 'Pronunciation & Chanting',
        duration: '2 weeks',
        link: '/courses/sanskrit-pronunciation'
      }
    ],
    livePassCount: 0,
    mentorHours: 2,
    certificateIncluded: true,
    prerequisites: [],
    faq: [
      {
        question: 'Do I need any prior knowledge of Sanskrit?',
        answer: 'No prior knowledge is required. This course is designed for complete beginners.'
      },
      {
        question: 'How long does it take to complete?',
        answer: 'The course is designed to be completed in 11 weeks with 3-4 hours of study per week.'
      },
      {
        question: 'Will I be able to read Sanskrit texts after this course?',
        answer: 'Yes, you will be able to read basic Sanskrit texts and understand simple sentences.'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-1',
        name: 'Priya Sharma',
        content: 'This course made Sanskrit accessible and enjoyable. The pronunciation guidance was particularly helpful.',
        rating: 5,
        avatarUrl: '/assets/avatars/priya-sharma.jpg'
      },
      {
        id: 'testimonial-2',
        name: 'Rajesh Kumar',
        content: 'Excellent foundation course. The instructors are patient and knowledgeable.',
        rating: 5,
        avatarUrl: '/assets/avatars/rajesh-kumar.jpg'
      }
    ]
  },
  {
    sku: 'vedic-philosophy-complete',
    name: 'Vedic Philosophy Complete',
    shortDescription: 'Comprehensive exploration of Vedic wisdom, Upanishads, and classical Indian philosophy.',
    longDescription: `Dive deep into the profound wisdom of Vedic philosophy with this comprehensive package. Explore the foundational texts of Indian philosophy including the Upanishads, Bhagavad Gita, and classical philosophical systems.

This package provides a systematic approach to understanding:
- Core concepts of Vedic philosophy
- Major Upanishads and their teachings
- Classical philosophical schools (Darshanas)
- Practical applications in modern life
- Meditation and contemplation techniques

Perfect for students, practitioners, and anyone seeking to understand the philosophical foundations of Indian spiritual traditions.`,
    priceInr: 8999,
    originalPriceInr: 12999,
    thumbnailUrl: '/assets/packages/vedic-philosophy.jpg',
    includedCourses: [
      {
        id: 'upanishads-intro',
        title: 'Introduction to Upanishads',
        duration: '6 weeks',
        link: '/courses/upanishads-intro'
      },
      {
        id: 'bhagavad-gita-study',
        title: 'Bhagavad Gita Study',
        duration: '8 weeks',
        link: '/courses/bhagavad-gita-study'
      },
      {
        id: 'classical-darshanas',
        title: 'Classical Philosophical Schools',
        duration: '6 weeks',
        link: '/courses/classical-darshanas'
      },
      {
        id: 'vedic-meditation',
        title: 'Vedic Meditation Techniques',
        duration: '4 weeks',
        link: '/courses/vedic-meditation'
      }
    ],
    livePassCount: 4,
    mentorHours: 6,
    certificateIncluded: true,
    prerequisites: ['Basic Sanskrit knowledge recommended'],
    faq: [
      {
        question: 'Is this suitable for beginners?',
        answer: 'Yes, but some familiarity with Indian philosophy concepts would be helpful.'
      },
      {
        question: 'How are the live sessions conducted?',
        answer: 'Live sessions are held weekly via video conference with Q&A and group discussions.'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-3',
        name: 'Dr. Meera Patel',
        content: 'Transformative course that deepened my understanding of Vedic wisdom.',
        rating: 5,
        avatarUrl: '/assets/avatars/meera-patel.jpg'
      }
    ]
  },
  {
    sku: 'yoga-darshan-advanced',
    name: 'Yoga Darshan Advanced',
    shortDescription: 'Advanced study of Patanjali\'s Yoga Sutras with practical application and meditation techniques.',
    longDescription: `Master the profound teachings of Patanjali's Yoga Sutras with this advanced package. Explore the eight limbs of yoga, understand the philosophical foundations, and learn practical techniques for spiritual development.

This comprehensive package includes:
- Detailed study of all 196 Yoga Sutras
- Practical application of the eight limbs
- Advanced meditation techniques
- Pranayama and breathing practices
- Philosophy of consciousness and liberation
- Integration with modern life

Ideal for yoga teachers, serious practitioners, and students of Indian philosophy.`,
    priceInr: 12999,
    originalPriceInr: 17999,
    thumbnailUrl: '/assets/packages/yoga-darshan.jpg',
    includedCourses: [
      {
        id: 'yoga-sutras-complete',
        title: 'Complete Yoga Sutras Study',
        duration: '12 weeks',
        link: '/courses/yoga-sutras-complete'
      },
      {
        id: 'eight-limbs-practice',
        title: 'Eight Limbs of Yoga Practice',
        duration: '8 weeks',
        link: '/courses/eight-limbs-practice'
      },
      {
        id: 'advanced-meditation',
        title: 'Advanced Meditation Techniques',
        duration: '6 weeks',
        link: '/courses/advanced-meditation'
      },
      {
        id: 'yoga-philosophy',
        title: 'Yoga Philosophy & Consciousness',
        duration: '6 weeks',
        link: '/courses/yoga-philosophy'
      }
    ],
    livePassCount: 6,
    mentorHours: 8,
    certificateIncluded: true,
    prerequisites: ['Basic yoga practice experience', 'Previous philosophy study recommended'],
    faq: [
      {
        question: 'What level of yoga experience is required?',
        answer: 'At least 2 years of regular yoga practice is recommended for this advanced course.'
      },
      {
        question: 'Are there practical components?',
        answer: 'Yes, the course includes both theoretical study and practical application of techniques.'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-4',
        name: 'Anand Desai',
        content: 'This course transformed my understanding of yoga beyond just physical practice.',
        rating: 5,
        avatarUrl: '/assets/avatars/anand-desai.jpg'
      }
    ]
  },
  {
    sku: 'samkhya-darshan-complete',
    name: 'Samkhya Darshan Complete',
    shortDescription: 'Comprehensive study of Samkhya philosophy, the foundation of classical Indian thought.',
    longDescription: `Explore the foundational philosophy of Samkhya, one of the six classical schools of Indian philosophy. Understand the dualistic nature of reality, the concept of Purusha and Prakriti, and the path to liberation.

This package covers:
- Historical development of Samkhya philosophy
- Core concepts of Purusha and Prakriti
- The 25 principles (Tattvas)
- Theory of causation and evolution
- Practical applications in daily life
- Integration with other philosophical systems

Essential for students of Indian philosophy and anyone interested in understanding the metaphysical foundations of yoga and Vedanta.`,
    priceInr: 7999,
    originalPriceInr: 10999,
    thumbnailUrl: '/assets/packages/samkhya-darshan.jpg',
    includedCourses: [
      {
        id: 'samkhya-basics',
        title: 'Samkhya Philosophy Basics',
        duration: '6 weeks',
        link: '/courses/samkhya-basics'
      },
      {
        id: 'purusha-prakriti',
        title: 'Purusha and Prakriti',
        duration: '4 weeks',
        link: '/courses/purusha-prakriti'
      },
      {
        id: 'samkhya-tattvas',
        title: 'The 25 Tattvas',
        duration: '6 weeks',
        link: '/courses/samkhya-tattvas'
      },
      {
        id: 'samkhya-liberation',
        title: 'Path to Liberation in Samkhya',
        duration: '4 weeks',
        link: '/courses/samkhya-liberation'
      }
    ],
    livePassCount: 3,
    mentorHours: 4,
    certificateIncluded: true,
    prerequisites: ['Basic understanding of Indian philosophy'],
    faq: [
      {
        question: 'How does Samkhya relate to other philosophical schools?',
        answer: 'Samkhya provides the theoretical foundation for many other schools, including Yoga and Vedanta.'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-5',
        name: 'Dr. Vikram Singh',
        content: 'Excellent systematic approach to understanding Samkhya philosophy.',
        rating: 5,
        avatarUrl: '/assets/avatars/vikram-singh.jpg'
      }
    ]
  },
  {
    sku: 'vedanta-essentials',
    name: 'Vedanta Essentials',
    shortDescription: 'Core teachings of Advaita Vedanta with practical wisdom for modern life.',
    longDescription: `Discover the profound teachings of Advaita Vedanta, the non-dualistic philosophy that forms the foundation of much of Indian spiritual thought. Learn about the nature of reality, the Self, and the path to self-realization.

This package includes:
- Fundamental concepts of Advaita Vedanta
- Study of key texts and commentaries
- Practical application of non-dual wisdom
- Meditation and contemplation practices
- Integration with daily life
- Understanding of Maya and the nature of reality

Perfect for spiritual seekers, philosophy students, and anyone interested in understanding the nature of consciousness and reality.`,
    priceInr: 9999,
    originalPriceInr: 13999,
    thumbnailUrl: '/assets/packages/vedanta-essentials.jpg',
    includedCourses: [
      {
        id: 'advaita-basics',
        title: 'Advaita Vedanta Basics',
        duration: '6 weeks',
        link: '/courses/advaita-basics'
      },
      {
        id: 'brahma-sutras',
        title: 'Brahma Sutras Study',
        duration: '8 weeks',
        link: '/courses/brahma-sutras'
      },
      {
        id: 'non-dual-meditation',
        title: 'Non-Dual Meditation Practice',
        duration: '4 weeks',
        link: '/courses/non-dual-meditation'
      },
      {
        id: 'vedanta-modern-life',
        title: 'Vedanta in Modern Life',
        duration: '4 weeks',
        link: '/courses/vedanta-modern-life'
      }
    ],
    livePassCount: 4,
    mentorHours: 6,
    certificateIncluded: true,
    prerequisites: ['Basic understanding of Indian philosophy', 'Meditation experience helpful'],
    faq: [
      {
        question: 'Is this suitable for beginners?',
        answer: 'Some familiarity with Indian philosophy concepts would be helpful, but the course is designed to be accessible.'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-6',
        name: 'Sita Raman',
        content: 'Life-changing insights into the nature of reality and consciousness.',
        rating: 5,
        avatarUrl: '/assets/avatars/sita-raman.jpg'
      }
    ]
  },
  {
    sku: 'nyaya-vaisheshika-logic',
    name: 'Nyaya-Vaisheshika Logic',
    shortDescription: 'Study of Indian logic and atomistic philosophy with practical reasoning techniques.',
    longDescription: `Master the sophisticated logical systems of Nyaya and Vaisheshika, two of the six classical schools of Indian philosophy. Learn about Indian logic, epistemology, and the atomic theory of matter.

This package covers:
- Nyaya logical system and reasoning
- Vaisheshika atomic theory
- Indian epistemology and pramanas
- Debate and argumentation techniques
- Practical application of logical thinking
- Integration with modern logic and science

Ideal for philosophy students, researchers, and anyone interested in developing logical thinking skills.`,
    priceInr: 6999,
    originalPriceInr: 9999,
    thumbnailUrl: '/assets/packages/nyaya-vaisheshika.jpg',
    includedCourses: [
      {
        id: 'nyaya-logic',
        title: 'Nyaya Logical System',
        duration: '6 weeks',
        link: '/courses/nyaya-logic'
      },
      {
        id: 'vaisheshika-atoms',
        title: 'Vaisheshika Atomic Theory',
        duration: '4 weeks',
        link: '/courses/vaisheshika-atoms'
      },
      {
        id: 'indian-epistemology',
        title: 'Indian Epistemology',
        duration: '4 weeks',
        link: '/courses/indian-epistemology'
      },
      {
        id: 'debate-techniques',
        title: 'Classical Debate Techniques',
        duration: '3 weeks',
        link: '/courses/debate-techniques'
      }
    ],
    livePassCount: 2,
    mentorHours: 3,
    certificateIncluded: true,
    prerequisites: ['Basic logic and reasoning skills'],
    faq: [
      {
        question: 'How does Indian logic differ from Western logic?',
        answer: 'Indian logic has unique features like the five-membered syllogism and emphasis on debate and dialogue.'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-7',
        name: 'Prof. Arjun Mehta',
        content: 'Fascinating study of Indian logical systems and their relevance today.',
        rating: 5,
        avatarUrl: '/assets/avatars/arjun-mehta.jpg'
      }
    ]
  },
  {
    sku: 'mimamsa-ritual-philosophy',
    name: 'Mimamsa Ritual Philosophy',
    shortDescription: 'Deep dive into Mimamsa philosophy, the science of Vedic interpretation and ritual.',
    longDescription: `Explore Mimamsa, the philosophical school that focuses on the interpretation of Vedic texts and the science of ritual. Understand the principles of Vedic hermeneutics and the philosophical foundations of ritual practice.

This package includes:
- Principles of Vedic interpretation
- Mimamsa epistemology and methodology
- Theory of dharma and ritual action
- Practical application of Mimamsa principles
- Integration with other philosophical schools
- Modern relevance of ritual philosophy

Essential for students of Vedic studies, ritual practitioners, and anyone interested in understanding the philosophical foundations of Hindu practices.`,
    priceInr: 5999,
    originalPriceInr: 8999,
    thumbnailUrl: '/assets/packages/mimamsa.jpg',
    includedCourses: [
      {
        id: 'mimamsa-basics',
        title: 'Mimamsa Philosophy Basics',
        duration: '5 weeks',
        link: '/courses/mimamsa-basics'
      },
      {
        id: 'vedic-hermeneutics',
        title: 'Vedic Hermeneutics',
        duration: '4 weeks',
        link: '/courses/vedic-hermeneutics'
      },
      {
        id: 'ritual-theory',
        title: 'Theory of Ritual Action',
        duration: '4 weeks',
        link: '/courses/ritual-theory'
      },
      {
        id: 'dharma-mimamsa',
        title: 'Dharma in Mimamsa',
        duration: '3 weeks',
        link: '/courses/dharma-mimamsa'
      }
    ],
    livePassCount: 2,
    mentorHours: 3,
    certificateIncluded: true,
    prerequisites: ['Basic knowledge of Vedic texts'],
    faq: [
      {
        question: 'How is Mimamsa relevant today?',
        answer: 'Mimamsa principles of interpretation and understanding of dharma remain relevant for understanding Hindu practices.'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-8',
        name: 'Dr. Lakshmi Iyer',
        content: 'Excellent introduction to the sophisticated philosophy of Mimamsa.',
        rating: 5,
        avatarUrl: '/assets/avatars/lakshmi-iyer.jpg'
      }
    ]
  },
  {
    sku: 'kashmir-shaivism-advanced',
    name: 'Kashmir Shaivism Advanced',
    shortDescription: 'Advanced study of Kashmir Shaivism, the philosophy of consciousness and divine play.',
    longDescription: `Dive deep into the profound philosophy of Kashmir Shaivism, one of the most sophisticated schools of Indian philosophy. Explore the concept of universal consciousness, divine play, and the path to recognition of one's true nature.

This advanced package covers:
- Core concepts of Kashmir Shaivism
- Study of key texts and commentaries
- Practical techniques for self-recognition
- Integration of philosophy and practice
- Understanding of Spanda and divine vibration
- Modern applications of Shaiva philosophy

Perfect for advanced students of Indian philosophy and serious spiritual practitioners.`,
    priceInr: 14999,
    originalPriceInr: 19999,
    thumbnailUrl: '/assets/packages/kashmir-shaivism.jpg',
    includedCourses: [
      {
        id: 'shaivism-basics',
        title: 'Kashmir Shaivism Basics',
        duration: '8 weeks',
        link: '/courses/shaivism-basics'
      },
      {
        id: 'spanda-karika',
        title: 'Spanda Karika Study',
        duration: '6 weeks',
        link: '/courses/spanda-karika'
      },
      {
        id: 'pratyabhijna',
        title: 'Pratyabhijna Philosophy',
        duration: '6 weeks',
        link: '/courses/pratyabhijna'
      },
      {
        id: 'shaiva-meditation',
        title: 'Shaiva Meditation Techniques',
        duration: '4 weeks',
        link: '/courses/shaiva-meditation'
      }
    ],
    livePassCount: 8,
    mentorHours: 10,
    certificateIncluded: true,
    prerequisites: ['Advanced study of Indian philosophy', 'Previous meditation experience'],
    faq: [
      {
        question: 'What makes Kashmir Shaivism unique?',
        answer: 'It presents a non-dual philosophy that emphasizes the recognition of one\'s true nature as divine consciousness.'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-9',
        name: 'Swami Ananda',
        content: 'The most profound and practical philosophy I have ever studied.',
        rating: 5,
        avatarUrl: '/assets/avatars/swami-ananda.jpg'
      }
    ]
  },
  {
    sku: 'tantra-darshan-complete',
    name: 'Tantra Darshan Complete',
    shortDescription: 'Comprehensive study of Tantra philosophy and practice with emphasis on transformation.',
    longDescription: `Explore the rich and complex world of Tantra philosophy and practice. Understand the principles of transformation, the role of energy in spiritual development, and the integration of opposites in the path to enlightenment.

This comprehensive package includes:
- Fundamental principles of Tantra
- Study of key Tantric texts
- Practical techniques and practices
- Understanding of energy and chakras
- Integration of masculine and feminine principles
- Modern applications of Tantric wisdom

Essential for serious practitioners and students of esoteric traditions.`,
    priceInr: 11999,
    originalPriceInr: 15999,
    thumbnailUrl: '/assets/packages/tantra-darshan.jpg',
    includedCourses: [
      {
        id: 'tantra-basics',
        title: 'Tantra Philosophy Basics',
        duration: '6 weeks',
        link: '/courses/tantra-basics'
      },
      {
        id: 'tantric-texts',
        title: 'Key Tantric Texts',
        duration: '6 weeks',
        link: '/courses/tantric-texts'
      },
      {
        id: 'energy-practices',
        title: 'Tantric Energy Practices',
        duration: '4 weeks',
        link: '/courses/energy-practices'
      },
      {
        id: 'tantra-modern-life',
        title: 'Tantra in Modern Life',
        duration: '4 weeks',
        link: '/courses/tantra-modern-life'
      }
    ],
    livePassCount: 6,
    mentorHours: 8,
    certificateIncluded: true,
    prerequisites: ['Mature understanding of spiritual practices', 'Previous meditation experience'],
    faq: [
      {
        question: 'Is this course suitable for beginners?',
        answer: 'This is an advanced course that requires some background in spiritual practices and philosophy.'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-10',
        name: 'Maya Devi',
        content: 'Transformative understanding of the divine feminine and masculine principles.',
        rating: 5,
        avatarUrl: '/assets/avatars/maya-devi.jpg'
      }
    ]
  },
  {
    sku: 'emotional-intelligence-samkhya',
    name: 'Emotional Intelligence with Samkhya',
    shortDescription: 'Apply Samkhya philosophy to develop emotional intelligence and psychological well-being.',
    longDescription: `Learn how to apply the ancient wisdom of Samkhya philosophy to develop emotional intelligence and psychological well-being in modern life. Understand the nature of emotions, the role of the mind, and practical techniques for emotional regulation.

This unique package combines:
- Samkhya psychology and emotional theory
- Practical emotional intelligence techniques
- Mindfulness and awareness practices
- Integration of ancient wisdom with modern psychology
- Tools for emotional regulation and well-being
- Application in personal and professional life

Perfect for anyone interested in combining ancient wisdom with modern psychological insights.`,
    priceInr: 7999,
    originalPriceInr: 11999,
    thumbnailUrl: '/assets/packages/emotional-intelligence.jpg',
    includedCourses: [
      {
        id: 'samkhya-psychology',
        title: 'Samkhya Psychology',
        duration: '5 weeks',
        link: '/courses/samkhya-psychology'
      },
      {
        id: 'emotional-theory',
        title: 'Emotional Theory in Samkhya',
        duration: '4 weeks',
        link: '/courses/emotional-theory'
      },
      {
        id: 'ei-techniques',
        title: 'Emotional Intelligence Techniques',
        duration: '4 weeks',
        link: '/courses/ei-techniques'
      },
      {
        id: 'mindfulness-samkhya',
        title: 'Mindfulness in Samkhya',
        duration: '3 weeks',
        link: '/courses/mindfulness-samkhya'
      }
    ],
    livePassCount: 4,
    mentorHours: 5,
    certificateIncluded: true,
    prerequisites: ['Basic understanding of psychology concepts'],
    faq: [
      {
        question: 'How does Samkhya help with emotional intelligence?',
        answer: 'Samkhya provides a framework for understanding the nature of emotions and the mind-body relationship.'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-11',
        name: 'Dr. Ravi Nair',
        content: 'Brilliant integration of ancient wisdom with modern emotional intelligence practices.',
        rating: 5,
        avatarUrl: '/assets/avatars/ravi-nair.jpg'
      }
    ]
  },
  {
    sku: 'isha-upanishad-complete',
    name: 'Isha Upanishad Complete',
    shortDescription: 'Deep study of the Isha Upanishad with practical application of its profound teachings.',
    longDescription: `Explore one of the most important and concise Upanishads, the Isha Upanishad. This short but profound text contains essential teachings about the nature of reality, the Self, and the path to liberation.

This comprehensive package includes:
- Verse-by-verse study of the Isha Upanishad
- Commentary and interpretation
- Practical application of teachings
- Meditation and contemplation practices
- Integration with daily life
- Understanding of the non-dual message

Essential for students of Vedanta and anyone seeking to understand the core teachings of the Upanishads.`,
    priceInr: 4999,
    originalPriceInr: 7999,
    thumbnailUrl: '/assets/packages/isha-upanishad.jpg',
    includedCourses: [
      {
        id: 'isha-intro',
        title: 'Introduction to Isha Upanishad',
        duration: '3 weeks',
        link: '/courses/isha-intro'
      },
      {
        id: 'isha-verses',
        title: 'Verse-by-Verse Study',
        duration: '4 weeks',
        link: '/courses/isha-verses'
      },
      {
        id: 'isha-commentary',
        title: 'Commentary and Interpretation',
        duration: '3 weeks',
        link: '/courses/isha-commentary'
      },
      {
        id: 'isha-practice',
        title: 'Practical Application',
        duration: '2 weeks',
        link: '/courses/isha-practice'
      }
    ],
    livePassCount: 2,
    mentorHours: 3,
    certificateIncluded: true,
    prerequisites: ['Basic understanding of Upanishadic concepts'],
    faq: [
      {
        question: 'Why is the Isha Upanishad important?',
        answer: 'It is one of the most concise and profound Upanishads, containing essential teachings in just 18 verses.'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-12',
        name: 'Guru Prasad',
        content: 'Life-changing study of this profound text. Highly recommended.',
        rating: 5,
        avatarUrl: '/assets/avatars/guru-prasad.jpg'
      }
    ]
  },
  {
    sku: 'prashna-upanishad-study',
    name: 'Prashna Upanishad Study',
    shortDescription: 'Comprehensive study of the Prashna Upanishad, the Upanishad of questions.',
    longDescription: `Study the Prashna Upanishad, which presents profound philosophical teachings through a series of questions and answers. This Upanishad addresses fundamental questions about the nature of reality, the Self, and the path to liberation.

This package covers:
- Historical context and significance
- Question-by-question analysis
- Philosophical implications
- Practical applications
- Integration with other Upanishadic teachings
- Meditation and contemplation practices

Perfect for students of Vedanta and anyone interested in understanding the dialogical method of Upanishadic teaching.`,
    priceInr: 5999,
    originalPriceInr: 8999,
    thumbnailUrl: '/assets/packages/prashna-upanishad.jpg',
    includedCourses: [
      {
        id: 'prashna-intro',
        title: 'Introduction to Prashna Upanishad',
        duration: '3 weeks',
        link: '/courses/prashna-intro'
      },
      {
        id: 'prashna-questions',
        title: 'The Six Questions',
        duration: '6 weeks',
        link: '/courses/prashna-questions'
      },
      {
        id: 'prashna-philosophy',
        title: 'Philosophical Implications',
        duration: '3 weeks',
        link: '/courses/prashna-philosophy'
      },
      {
        id: 'prashna-practice',
        title: 'Practical Applications',
        duration: '2 weeks',
        link: '/courses/prashna-practice'
      }
    ],
    livePassCount: 3,
    mentorHours: 4,
    certificateIncluded: true,
    prerequisites: ['Basic understanding of Upanishadic concepts'],
    faq: [
      {
        question: 'What makes the Prashna Upanishad unique?',
        answer: 'It presents teachings through a series of six fundamental questions about existence and reality.'
      }
    ],
    testimonials: [
      {
        id: 'testimonial-13',
        name: 'Dr. Sunita Rao',
        content: 'Excellent systematic study of this important Upanishad.',
        rating: 5,
        avatarUrl: '/assets/avatars/sunita-rao.jpg'
      }
    ]
  }
];

// Dummy sessions data for packages with live sessions
export const dummySessions: Record<string, Session[]> = {
  'vedic-philosophy-complete': [
    {
      id: 'session-1',
      date: '2024-02-15T18:00:00Z',
      seatRemaining: 45,
      maxSeats: 108,
      title: 'Introduction to Vedic Philosophy',
      description: 'Overview of Vedic wisdom and its relevance in modern times'
    },
    {
      id: 'session-2',
      date: '2024-02-22T18:00:00Z',
      seatRemaining: 12,
      maxSeats: 108,
      title: 'Upanishads Deep Dive',
      description: 'Detailed study of key Upanishadic concepts'
    },
    {
      id: 'session-3',
      date: '2024-03-01T18:00:00Z',
      seatRemaining: 0,
      maxSeats: 108,
      title: 'Bhagavad Gita Study',
      description: 'Exploring the teachings of the Bhagavad Gita'
    }
  ],
  'yoga-darshan-advanced': [
    {
      id: 'session-4',
      date: '2024-02-16T19:00:00Z',
      seatRemaining: 67,
      maxSeats: 108,
      title: 'Yoga Sutras Overview',
      description: 'Introduction to Patanjali\'s Yoga Sutras'
    },
    {
      id: 'session-5',
      date: '2024-02-23T19:00:00Z',
      seatRemaining: 23,
      maxSeats: 108,
      title: 'Eight Limbs Practice',
      description: 'Practical application of the eight limbs of yoga'
    }
  ]
};

// Dummy user packages data
export const dummyUserPackages: UserPackage[] = [
  {
    sku: 'sanskrit-foundations',
    name: 'Sanskrit Foundations',
    accessExpiresAt: undefined, // Lifetime access
    status: 'active',
    progress: 75,
    nextLiveSession: undefined,
    availableMentorHours: 1,
    certificateStatus: 'pending',
    includedCourses: [
      {
        id: 'sanskrit-alphabet',
        title: 'Devanagari Script Mastery',
        duration: '3 weeks',
        link: '/courses/sanskrit-alphabet'
      },
      {
        id: 'sanskrit-grammar-basics',
        title: 'Basic Sanskrit Grammar',
        duration: '4 weeks',
        link: '/courses/sanskrit-grammar-basics'
      }
    ]
  },
  {
    sku: 'vedic-philosophy-complete',
    name: 'Vedic Philosophy Complete',
    accessExpiresAt: '2025-12-31T23:59:59Z',
    status: 'active',
    progress: 45,
    nextLiveSession: {
      id: 'session-1',
      date: '2024-02-15T18:00:00Z',
      seatRemaining: 45,
      maxSeats: 108,
      title: 'Introduction to Vedic Philosophy'
    },
    availableMentorHours: 4,
    certificateStatus: 'not_available',
    includedCourses: [
      {
        id: 'upanishads-intro',
        title: 'Introduction to Upanishads',
        duration: '6 weeks',
        link: '/courses/upanishads-intro'
      }
    ]
  },
  {
    sku: 'yoga-darshan-advanced',
    name: 'Yoga Darshan Advanced',
    accessExpiresAt: undefined,
    status: 'active',
    progress: 90,
    nextLiveSession: undefined,
    availableMentorHours: 2,
    certificateStatus: 'issued',
    includedCourses: [
      {
        id: 'yoga-sutras-complete',
        title: 'Complete Yoga Sutras Study',
        duration: '12 weeks',
        link: '/courses/yoga-sutras-complete'
      }
    ]
  }
];
