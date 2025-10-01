// Message type for CMS notifications
export interface Message {
  type: 'success' | 'error' | 'info';
  text: string;
}

export interface HomepageContent {
  hero: {
    title: string;
    subtitle: string;
    ctaButtons: {
      sanskrit: {
        text: string;
        link: string;
      };
      darshan: {
        text: string;
        link: string;
      };
      lifeSkills: {
        text: string;
        link: string;
      };
    };
  };
  alignYourself: {
    title: string;
    subtitle: string;
    description: string;
    courses: Array<{
      id: string;
      title: string;
      description: string;
      link: string;
      icon: string;
    }>;
    liveClasses?: Array<{
      id: number;
      title: string;
      instructor: string;
      thumbnail: string;
      duration: string;
      date: string;
      time: string;
      price: string;
      rating: number;
      students: number;
      link: string;
      description: string;
    }>;
    selfPacedCourses?: Array<{
      id: number;
      title: string;
      description: string;
      thumbnail: string;
      duration: string;
      modules: number;
      price: string;
      rating: number;
      students: number;
      link: string;
      level: string;
      instructor: string;
    }>;
  };
  schools: {
    title: string;
    subtitle: string;
    description: string;
    schools: Array<{
      id: string;
      name: string;
      description: string;
      link: string;
      icon: string;
      color: string;
    }>;
  };
  meetGurus: {
    title: string;
    subtitle: string;
    description: string;
    gurus: Array<{
      id: string;
      name: string;
      title: string;
      description: string;
      image: string;
      link: string;
    }>;
  };
  studentStories: {
    title: string;
    subtitle: string;
    stories: Array<{
      id: string;
      name: string;
      story: string;
      image: string;
      rating: number;
    }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
    testimonials: Array<{
      id: string;
      name: string;
      role: string;
      content: string;
      image: string;
      rating: number;
    }>;
  };
  communityPosts: {
    title: string;
    subtitle: string;
    posts: Array<{
      id: string;
      title: string;
      content: string;
      author: string;
      date: string;
      image: string;
      likes: number;
    }>;
  };
  foundersMission: {
    title: string;
    subtitle: string;
    content: string;
    image: string;
    founderName: string;
    founderTitle: string;
  };
  contribute: {
    title: string;
    subtitle: string;
    content: string;
    ctaText: string;
    ctaLink: string;
  };
  downloadApp: {
    title: string;
    subtitle: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
    downloadLinks: {
      android: string;
      ios: string;
    };
  };
  faq: {
    title: string;
    subtitle: string;
    description: string;
    questions: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  };
}