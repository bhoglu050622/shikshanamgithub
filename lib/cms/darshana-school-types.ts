export interface DarshanaSchoolContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaButtons: {
      primary: {
        text: string;
        link: string;
      };
      secondary: {
        text: string;
        link: string;
      };
    };
    stats: Array<{
      id: string;
      number: string;
      label: string;
    }>;
    sanskritQuotes: Array<{
      id: string;
      text: string;
      translation: string;
      transliteration: string;
      source: string;
    }>;
  };
  darshanas: {
    title: string;
    subtitle: string;
    description: string;
    schools: Array<{
      id: string;
      name: string;
      sanskrit: string;
      description: string;
      detailedDescription: string;
      keyConcepts: Array<{
        id: string;
        text: string;
      }>;
      founder: string;
      text: string;
      duration: string;
      difficulty: string;
      students: string;
      rating: number;
    }>;
  };
  learningPath: {
    title: string;
    subtitle: string;
    description: string;
    phases: Array<{
      id: string;
      title: string;
      titleSanskrit: string;
      description: string;
      detailedDescription: string;
      duration: string;
      modules: Array<{
        id: string;
        text: string;
      }>;
      badge: string;
    }>;
  };
  mission: {
    title: string;
    quote: string;
    values: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  app: {
    title: string;
    description: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  community: {
    title: string;
    subtitle: string;
    description: string;
    platforms: Array<{
      id: string;
      name: string;
      members: string;
      description: string;
    }>;
  };
}
