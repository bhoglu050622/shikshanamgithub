export interface SchoolsContent {
  hero: {
    title: string;
    subtitle: string;
  };
  schools: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string;
    color: string;
    features: Array<{
      id: string;
      text: string;
    }>;
  }>;
}
