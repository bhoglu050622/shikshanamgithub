export const defaultSEO = {
  title: 'Shikshanam - Ancient Indian Knowledge Platform | Sanskrit, Darshanas, Self-help',
  description: 'Unlock the timeless wisdom of Sanskrit, Darshanas, and Self-help. Join Shikshanam to explore ancient Indian knowledge through live classes, courses, and spiritual guidance.',
  canonical: 'https://shikshanam.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shikshanam.com',
    siteName: 'Shikshanam',
    title: 'Shikshanam - Ancient Indian Knowledge Platform',
    description: 'Unlock the timeless wisdom of Sanskrit, Darshanas, and Self-help through our comprehensive learning platform.',
    images: [
      {
        url: 'https://shikshanam.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shikshanam - Ancient Indian Knowledge Platform',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@shikshanam',
    site: '@shikshanam',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'Sanskrit, Darshanas, Self-help, Ancient India, Wisdom, Spiritual Learning, Indian Philosophy, Vedic Knowledge, Yoga, Meditation, Bhagavad Gita, Vedanta, Ayurveda',
    },
    {
      name: 'author',
      content: 'Shikshanam Team',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#FF8A00',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Shikshanam',
  description: 'Ancient Indian Knowledge Platform for Sanskrit, Darshanas, and Self-help',
  url: 'https://shikshanam.com',
  logo: 'https://shikshanam.com/logo.png',
  image: 'https://shikshanam.com/og-image.jpg',
  foundingDate: '2020',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-98765-43210',
    contactType: 'customer service',
    email: 'hello@shikshanam.com',
  },
  sameAs: [
    'https://twitter.com/shikshanam',
    'https://facebook.com/shikshanam',
    'https://instagram.com/shikshanam',
    'https://youtube.com/shikshanam',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Educational Courses',
    itemListElement: [
      {
        '@type': 'Course',
        name: 'Sanskrit for Beginners',
        description: 'Master the fundamentals of Sanskrit language with traditional teaching methods',
        provider: {
          '@type': 'Organization',
          name: 'Shikshanam',
        },
        courseMode: 'online',
        educationalLevel: 'beginner',
        teaches: 'Sanskrit Language',
        inLanguage: 'en',
        offers: {
          '@type': 'Offer',
          price: '2999',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'Course',
        name: 'Advanced Vedanta Philosophy',
        description: 'Deep dive into the profound teachings of Vedanta philosophy',
        provider: {
          '@type': 'Organization',
          name: 'Shikshanam',
        },
        courseMode: 'online',
        educationalLevel: 'advanced',
        teaches: 'Vedanta Philosophy',
        inLanguage: 'en',
        offers: {
          '@type': 'Offer',
          price: '3999',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  },
}

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://shikshanam.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Courses',
      item: 'https://shikshanam.com/courses',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Sanskrit',
      item: 'https://shikshanam.com/courses/sanskrit',
    },
  ],
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Shikshanam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shikshanam is an ancient Indian knowledge platform that offers comprehensive courses in Sanskrit, Darshanas (philosophy), and self-help through traditional teaching methods combined with modern pedagogy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need prior knowledge of Sanskrit to join?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, we offer courses for all levels from beginners to advanced. Our Sanskrit for Beginners course is designed for those with no prior knowledge of the language.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the courses self-paced or live?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer both self-paced courses and live interactive sessions. You can choose the learning style that best fits your schedule and preferences.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide certificates upon completion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide recognized certificates upon successful completion of our courses, validated by traditional institutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept all major credit cards, debit cards, UPI, net banking, and digital wallets for course payments.',
      },
    },
  ],
}

export const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Sanskrit for Beginners',
  description: 'Master the fundamentals of Sanskrit language with traditional teaching methods and modern pedagogy.',
  provider: {
    '@type': 'Organization',
    name: 'Shikshanam',
    url: 'https://shikshanam.com',
  },
  courseMode: 'online',
  educationalLevel: 'beginner',
  teaches: 'Sanskrit Language, Grammar, Literature',
  inLanguage: 'en',
  timeRequired: 'P12W',
  coursePrerequisites: 'No prior knowledge required',
  syllabusSections: [
    {
      '@type': 'Syllabus',
      name: 'Introduction to Sanskrit',
      description: 'Basic introduction to Sanskrit language and its importance',
    },
    {
      '@type': 'Syllabus',
      name: 'Sanskrit Alphabet',
      description: 'Learning the Devanagari script and pronunciation',
    },
    {
      '@type': 'Syllabus',
      name: 'Basic Grammar',
      description: 'Introduction to Sanskrit grammar and sentence structure',
    },
  ],
  offers: {
    '@type': 'Offer',
    price: '2999',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    validFrom: '2024-01-01',
    seller: {
      '@type': 'Organization',
      name: 'Shikshanam',
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1250',
    bestRating: '5',
    worstRating: '1',
  },
}
