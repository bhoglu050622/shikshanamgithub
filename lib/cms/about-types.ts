export interface AboutContent {
  hero: {
    title: string;
    subtitle: string;
  };
  mission: {
    title: string;
    description: string;
    vision: {
      title: string;
      description: string;
    };
  };
  offerings: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  values: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
}
