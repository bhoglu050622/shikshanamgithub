export interface SelfHelpSchoolContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaButtons: {
      primary: { text: string; link: string };
      secondary: { text: string; link: string };
    };
    stats: Array<{
      id: string;
      number: string;
      label: string;
    }>;
  };
  courses: {
    title: string;
    subtitle: string;
    description: string;
    programs: Array<{
      id: string;
      title: string;
      description: string;
      duration: string;
      difficulty: string;
      students: string;
      rating: number;
      features: Array<{
        id: string;
        text: string;
      }>;
    }>;
  };
  benefits: {
    title: string;
    subtitle: string;
    description: string;
    advantages: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
    description: string;
    reviews: Array<{
      id: string;
      name: string;
      role: string;
      content: string;
      rating: number;
    }>;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}
