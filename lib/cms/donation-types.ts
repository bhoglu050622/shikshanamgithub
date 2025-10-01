export interface DonationContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  impact: {
    title: string;
    subtitle: string;
    stats: Array<{
      id: string;
      number: string;
      label: string;
      description: string;
    }>;
  };
  causes: {
    title: string;
    subtitle: string;
    causes: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
      targetAmount: string;
      currentAmount: string;
      progress: number;
    }>;
  };
  donationOptions: {
    title: string;
    subtitle: string;
    options: Array<{
      id: string;
      amount: string;
      label: string;
      description: string;
      popular?: boolean;
    }>;
    customAmount: {
      enabled: boolean;
      placeholder: string;
      minAmount: string;
    };
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
      amount: string;
    }>;
  };
  faq: {
    title: string;
    subtitle: string;
    questions: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
}
