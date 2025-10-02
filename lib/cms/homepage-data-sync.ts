/**
 * Homepage Data Sync - Sync all homepage sections with CMS
 * This module extracts data from frontend sections and syncs with CMS
 */

// Homepage sections data structure
export interface HomepageSectionData {
  hero: {
    title: string;
    subtitle: string;
    buttons: {
      sanskrit: { text: string; link: string };
      darshan: { text: string; link: string };
      lifeSkills: { text: string; link: string };
    };
  };
  alignYourself: {
    title: string;
    subtitle: string;
    description: string;
    courses: any[];
    liveClasses: any[];
    selfPacedCourses: any[];
  };
  schools: {
    title: string;
    subtitle: string;
    description: string;
    schools: any[];
  };
  meetGurus: {
    title: string;
    subtitle: string;
    description: string;
    gurus: any[];
  };
  studentStories: {
    title: string;
    subtitle: string;
    description: string;
    stories: any[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    description: string;
    testimonials: any[];
  };
  communityPosts: {
    title: string;
    subtitle: string;
    description: string;
    posts: any[];
  };
  foundersMission: {
    title: string;
    subtitle: string;
    description: string;
    content: string;
  };
  contribute: {
    title: string;
    subtitle: string;
    description: string;
    content: string;
  };
  downloadApp: {
    title: string;
    subtitle: string;
    description: string;
    features: any[];
  };
  faq: {
    title: string;
    subtitle: string;
    description: string;
    questions: any[];
  };
}

// Default homepage data (extracted from frontend components)
export const defaultHomepageData: HomepageSectionData = {
  hero: {
    title: "Welcome to Shikshanam",
    subtitle: "Where AI meets Ancient India",
    buttons: {
      sanskrit: { text: "School of Sanskrit", link: "/schools/sanskrit" },
      darshan: { text: "School of Darshan", link: "/schools/darshana" },
      lifeSkills: { text: "School of Life Skills", link: "/schools/self-help" }
    }
  },
  alignYourself: {
    title: "Two Ways to Begin Your Journey!",
    subtitle: "Learn through interactive Live Classes, or walk your own path of Swadhyaya with Self-Paced Courses.",
    description: "Choose your learning path with our comprehensive educational offerings.",
    courses: [
      {
        id: "tantra-darshan",
        title: "प्राचीन तंत्र दर्शन",
        subtitle: "Decoding the principles of Tantra",
        instructor: "Vishal Chaurasia",
        price: "Free",
        duration: "2-3 hours",
        level: "All Levels",
        rating: 5,
        reviewCount: 23,
        type: "Free Course",
        status: "available",
        link: "/courses/tantra-darshan"
      },
      {
        id: "yoga-advanced",
        title: "Tatvabodha 3: Yoga Darshan",
        subtitle: "Vibhuti and Kaivalya Pada",
        instructor: "Vishal Chaurasia",
        price: "Free",
        duration: "3-4 hours",
        level: "Intermediate",
        rating: 5,
        reviewCount: 20,
        type: "Free Masterclass",
        status: "available",
        link: "/courses/yoga-advanced"
      }
    ],
    liveClasses: [
      {
        id: "sanskrit-live",
        title: "Sanskrit Live Class",
        instructor: "Dr. Rajesh Kumar",
        schedule: "Every Tuesday & Thursday",
        time: "7:00 PM IST",
        duration: "2 hours",
        level: "Beginner",
        price: "Free",
        link: "/courses/sanskrit-live-class"
      }
    ],
    selfPacedCourses: [
      {
        id: "emotional-intelligence",
        title: "Emotional Intelligence with Samkhya Darshan",
        instructor: "Vishal Chaurasia",
        duration: "8 weeks",
        level: "Intermediate",
        price: "₹2,999",
        link: "/courses/emotional-intelligence-with-samkhya-darshan"
      }
    ]
  },
  schools: {
    title: "Explore Our Schools",
    subtitle: "Discover the ancient wisdom through our structured learning paths",
    description: "Our schools offer comprehensive learning paths in Sanskrit, philosophy, and life skills.",
    schools: [
      {
        id: "sanskrit",
        name: "School of Sanskrit",
        subtitle: "Master the Language of the Gods",
        description: "Learn Sanskrit from basics to advanced levels with expert guidance",
        icon: "BookOpen",
        emoji: "📚",
        color: "blue",
        href: "/schools/sanskrit",
        whatYoullLearn: "Sanskrit grammar, vocabulary, and classical texts",
        features: ["Grammar", "Vocabulary", "Classical Texts", "Pronunciation"],
        cta: "Join Sanskrit School"
      },
      {
        id: "darshana",
        name: "School of Darshan",
        subtitle: "Philosophy and Wisdom",
        description: "Explore the six schools of Indian philosophy",
        icon: "Lightbulb",
        emoji: "🧠",
        color: "purple",
        href: "/schools/darshana",
        whatYoullLearn: "Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta",
        features: ["Logic", "Metaphysics", "Ethics", "Meditation"],
        cta: "Join Darshan School"
      },
      {
        id: "self-help",
        name: "School of Life Skills",
        subtitle: "Practical Wisdom for Modern Life",
        description: "Apply ancient wisdom to modern challenges",
        icon: "Heart",
        emoji: "💝",
        color: "green",
        href: "/schools/self-help",
        whatYoullLearn: "Emotional intelligence, stress management, and life skills",
        features: ["Emotional Intelligence", "Stress Management", "Life Skills", "Wellness"],
        cta: "Join Life Skills School"
      }
    ]
  },
  meetGurus: {
    title: "Meet Our Gurus",
    subtitle: "Learn from renowned spiritual teachers and scholars",
    description: "Our gurus bring decades of experience in ancient Indian wisdom.",
    gurus: [
      {
        id: "vishal-chaurasia",
        name: "Vishal Chaurasia",
        title: "Spiritual Teacher & Philosopher",
        description: "Expert in Tantra, Yoga, and Advaita Vedanta",
        image: "/images/gurus/vishal-chaurasia.jpg",
        specialties: ["Tantra", "Yoga", "Advaita Vedanta"],
        experience: "15+ years",
        rating: 5,
        students: 10000
      },
      {
        id: "dr-rajesh-kumar",
        name: "Dr. Rajesh Kumar",
        title: "Sanskrit Scholar",
        description: "Professor of Sanskrit and Indian Philosophy",
        image: "/images/gurus/dr-rajesh-kumar.jpg",
        specialties: ["Sanskrit", "Indian Philosophy", "Classical Texts"],
        experience: "20+ years",
        rating: 5,
        students: 5000
      }
    ]
  },
  studentStories: {
    title: "Student Success Stories",
    subtitle: "Real transformations from our community",
    description: "See how our students have transformed their lives through ancient wisdom.",
    stories: [
      {
        id: "story-1",
        name: "Priya Sharma",
        title: "From Stress to Serenity",
        story: "Through the emotional intelligence course, I learned to manage my stress and find inner peace.",
        image: "/images/students/priya-sharma.jpg",
        course: "Emotional Intelligence with Samkhya Darshan",
        rating: 5
      },
      {
        id: "story-2",
        name: "Rajesh Patel",
        title: "Sanskrit Journey",
        story: "I never thought I could learn Sanskrit, but the structured approach made it possible.",
        image: "/images/students/rajesh-patel.jpg",
        course: "Sanskrit Basics",
        rating: 5
      }
    ]
  },
  testimonials: {
    title: "What Our Students Say",
    subtitle: "Hear from our community of learners",
    description: "Real feedback from students who have transformed their lives.",
    testimonials: [
      {
        id: "testimonial-1",
        name: "Anita Singh",
        role: "Yoga Teacher",
        content: "The courses have deepened my understanding of yoga philosophy. Highly recommended!",
        rating: 5,
        image: "/images/testimonials/anita-singh.jpg"
      },
      {
        id: "testimonial-2",
        name: "Michael Chen",
        role: "Software Engineer",
        content: "Learning Sanskrit has opened up a whole new world of ancient wisdom for me.",
        rating: 5,
        image: "/images/testimonials/michael-chen.jpg"
      }
    ]
  },
  communityPosts: {
    title: "Community Insights",
    subtitle: "Latest posts from our learning community",
    description: "Stay updated with insights, discussions, and wisdom from our community.",
    posts: [
      {
        id: "post-1",
        title: "Understanding the Three Gunas",
        author: "Vishal Chaurasia",
        excerpt: "A deep dive into the three fundamental qualities of nature...",
        image: "/images/posts/gunas.jpg",
        date: "2024-01-15",
        likes: 45,
        comments: 12
      },
      {
        id: "post-2",
        title: "Sanskrit Grammar Made Simple",
        author: "Dr. Rajesh Kumar",
        excerpt: "Breaking down complex Sanskrit grammar into simple concepts...",
        image: "/images/posts/sanskrit-grammar.jpg",
        date: "2024-01-14",
        likes: 38,
        comments: 8
      }
    ]
  },
  foundersMission: {
    title: "Our Mission",
    subtitle: "Bridging Ancient Wisdom with Modern Technology",
    description: "We believe in making ancient Indian knowledge accessible to everyone through modern technology.",
    content: "Our mission is to preserve and share the profound wisdom of ancient India, making it relevant and accessible to people worldwide. Through innovative teaching methods and cutting-edge technology, we bring timeless knowledge to the modern world."
  },
  contribute: {
    title: "Contribute to Our Mission",
    subtitle: "Help us preserve and share ancient wisdom",
    description: "Join us in our mission to make ancient knowledge accessible to everyone.",
    content: "Your contribution helps us create more courses, improve our platform, and reach more people with the wisdom of ancient India. Every contribution makes a difference."
  },
  downloadApp: {
    title: "Download Our App",
    subtitle: "Learn on the go with our mobile app",
    description: "Access all courses, community features, and learning tools on your mobile device.",
    features: [
      "Offline course access",
      "Community discussions",
      "Progress tracking",
      "Push notifications"
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Get answers to common questions",
    description: "Find answers to the most common questions about our platform and courses.",
    questions: [
      {
        id: "faq-1",
        question: "Do I need any prior knowledge to start?",
        answer: "No prior knowledge is required. Our courses are designed for beginners and advanced learners alike."
      },
      {
        id: "faq-2",
        question: "Are the courses free?",
        answer: "We offer both free and paid courses. Many of our foundational courses are completely free."
      },
      {
        id: "faq-3",
        question: "Can I learn at my own pace?",
        answer: "Yes! All our courses are self-paced, allowing you to learn at your own speed."
      }
    ]
  }
};

// Function to get homepage section data
export const getHomepageSectionData = (sectionId: string) => {
  return defaultHomepageData[sectionId as keyof HomepageSectionData] || null;
};

// Function to get all homepage data
export const getAllHomepageData = () => {
  return defaultHomepageData;
};
