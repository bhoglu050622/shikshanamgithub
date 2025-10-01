export interface ContactContent {
  hero: {
    title: string;
    subtitle: string;
  };
  form: {
    title: string;
    fields: {
      firstName: {
        label: string;
        placeholder: string;
      };
      lastName: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      subject: {
        label: string;
        placeholder: string;
        options: Array<{
          value: string;
          label: string;
        }>;
      };
      message: {
        label: string;
        placeholder: string;
      };
    };
    submitButton: {
      text: string;
    };
  };
  contactInfo: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  quickHelp: {
    title: string;
    description: string;
    link: {
      text: string;
      url: string;
    };
  };
}
