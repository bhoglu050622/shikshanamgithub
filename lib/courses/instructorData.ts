// Shared instructor data for courses

export interface InstructorData {
  name: string;
  title: string;
  bio: string;
  experience: string;
  specialization: string[];
  image?: string;
  videoId?: string;
  stats?: {
    youtube?: string;
    instagram?: string;
    facebook?: string;
  };
}

export const vishalChaurasiaData: InstructorData = {
  name: 'Vishal Chaurasia',
  title: 'Philosophy Scholar & IIT Graduate',
  bio: 'Vishal Chaurasia is a distinguished scholar of Indian philosophy with an engineering background from IIT. His unique ability to bridge ancient wisdom with modern scientific thinking makes complex philosophical concepts accessible and practical for contemporary seekers. With deep expertise across multiple darshanas (philosophical systems), he has guided thousands of students on their journey of self-discovery and spiritual understanding.',
  experience: '10+ years teaching Indian Philosophy and Darshanas',
  specialization: [
    'Yoga Darshan',
    'Kashmir Shaivism',
    'Advaita Vedanta',
    'Nyaya & Vaisheshik',
    'Tantra Philosophy',
    'Upanishadic Wisdom'
  ],
  image: 'https://shikshanam.in/wp-content/uploads/2024/05/1.png',
  videoId: 'oppR6FUIPno',
  stats: {
    youtube: '1.5M Subscribers',
    instagram: '450K Followers',
    facebook: '500K Followers'
  }
};

export const gurukulAcharyaData: InstructorData = {
  name: 'Gurukul Acharya',
  title: 'Traditional Sanskrit Master',
  bio: 'A traditionally trained Sanskrit scholar from the prestigious Gurukul system, bringing authentic Vedic knowledge and teaching methods to modern learners. With years of experience in teaching Sanskrit and Vedic texts, the Acharya makes the ancient language accessible through systematic and engaging instruction.',
  experience: '15+ years teaching Sanskrit in traditional Gurukul style',
  specialization: [
    'Sanskrit Language',
    'Vedic Chanting',
    'Devanagari Script',
    'Classical Texts'
  ]
};

