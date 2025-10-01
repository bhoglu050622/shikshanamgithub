export interface SchoolPageContent {
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
    features: Array<{
      id: string;
      icon: string;
      title: string;
      description: string;
    }>;
  };
  playLearn: {
    title: string;
    subtitle: string;
    flashcards: Array<{
      id: string;
      front: string;
      back: string;
      category: string;
    }>;
  };
  sequentialPath: {
    title: string;
    subtitle: string;
    levels: Array<{
      id: string;
      title: string;
      description: string;
      duration: string;
      difficulty: string;
      features: Array<{
        id: string;
        text: string;
      }>;
    }>;
  };
  meetGurus: {
    title: string;
    subtitle: string;
    gurus: Array<{
      id: string;
      name: string;
      title: string;
      description: string;
      image: string;
      specialties: Array<{
        id: string;
        text: string;
      }>;
    }>;
  };
  aiClock: {
    title: string;
    subtitle: string;
    description: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  resources: {
    title: string;
    subtitle: string;
    categories: Array<{
      id: string;
      title: string;
      description: string;
      resources: Array<{
        id: string;
        title: string;
        description: string;
        type: string;
        link: string;
      }>;
    }>;
  };
}
