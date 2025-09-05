// JSON-LD Schema helpers for SEO

export const courseLd = ({ name, url, provider }: { name: string; url: string; provider: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name,
  description: 'Beginner-friendly Sanskrit course in Hindi with live doubt sessions and certification.',
  provider: { 
    '@type': 'Organization', 
    name: provider, 
    sameAs: url 
  },
  courseMode: 'online',
  educationalLevel: 'beginner',
  inLanguage: 'hi',
  teaches: [
    'Sanskrit Grammar',
    'Devanagari Script',
    'Classical Sanskrit Literature',
    'Vedic Sanskrit Basics'
  ],
  coursePrerequisites: 'No prior knowledge required',
  timeRequired: 'P3M', // 3 months
  offers: {
    '@type': 'Offer',
    price: '2999',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock'
  }
});

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Shikshanam',
  description: 'Ancient Indian Knowledge Platform for Sanskrit, Darshanas, and Self-help',
  url: 'https://shikshanam.com',
  logo: 'https://shikshanam.com/logo.png',
  sameAs: [
    'https://twitter.com/shikshanam',
    'https://facebook.com/shikshanam',
    'https://instagram.com/shikshanam'
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9876543210',
    contactType: 'customer service',
    availableLanguage: ['Hindi', 'English']
  }
};

export const faqLd = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const instructorLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dr. Rajesh Kumar',
  jobTitle: 'Sanskrit Scholar & Course Instructor',
  description: '12+ years of experience in Gurukul tradition, fluent in Sanskrit',
  worksFor: {
    '@type': 'Organization',
    name: 'Shikshanam'
  },
  knowsAbout: [
    'Sanskrit Grammar',
    'Classical Sanskrit Literature',
    'Vedic Studies',
    'Devanagari Script'
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'PhD in Sanskrit Literature',
      credentialCategory: 'degree'
    }
  ]
};
