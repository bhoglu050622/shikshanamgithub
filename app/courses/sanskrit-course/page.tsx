'use client';

import './sanskrit-premium.css';
import { sanskritCourseCourseData } from './courseData';
import {
  HeroAnimated,
  FeatureBadgeList,
  PackageCard,
  InstructorCard,
  ModuleCard,
  OutcomesGrid,
  TestimonialsCarousel,
  FAQAccordion,
  FinalCTA
} from './components/premium';

export default function SanskritCoursePage() {
  const courseData = sanskritCourseCourseData;

  // Hero data with verified content and assets
  const heroData = {
    title: courseData.metadata.subtitle || 'Online Sanskrit Course in Hindi for Beginners',
    subtitle: 'संस्कृत भाषा सीखें आसानी से, हिन्दी में!',
    description: 'Master the divine language from Devanagari script to reading Bhagavad Gita. Join 10,000+ students learning from traditional Gurukul Acharya through modern online platform.',
    badges: [
      { text: 'Beginner', variant: 'primary' as const },
      { text: 'हिन्दी', variant: 'secondary' as const }
    ],
    primaryCta: {
      text: `Enroll Now - ${courseData.metadata.price}`,
      href: 'https://courses.shikshanam.in/single-checkout/655b340de4b0b31c6db6cb3c?pid=p2'
    },
    secondaryCta: {
      text: 'Preview Course',
      href: '#course-details'
    },
    thumbnailUrl: '/images/sanskrit-course/course-thumbnail.svg',
    stats: [
      {
        label: 'Students',
        value: courseData.stats?.students || '10,000+',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        )
      },
      {
        label: 'Rating',
        value: `${courseData.stats?.rating || 4.9}/5`,
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      },
      {
        label: 'Access',
        value: '1 Year',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        )
      }
    ]
  };

  // Feature badges with updated content (Recorded Classes instead of Live Q&A)
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Community Forum',
      description: 'Active learning community'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Certification',
      description: 'Upon completion'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '17+ Hours',
      description: '30 sessions'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Quizzes & Notes',
      description: 'Practice materials'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: '1 Year Access',
      description: 'Full course access'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Recorded Classes',
      description: 'Available now'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Free Updates',
      description: 'Lifetime updates'
    }
  ];

  // Package card data
  const packageData = {
    price: courseData.metadata.price,
    originalPrice: courseData.metadata.originalPrice!,
    savings: '₹1,000',
    bonuses: [
      '500+ word practice sheets',
      'Complete study notes & PDF guides',
      'Interactive quizzes for each module',
      'Pronunciation audio guides',
      'Flashcards for vocabulary building',
      'Access to exclusive Sanskrit resources'
    ],
    packageImageUrl: '/images/sanskrit-course/package-image.svg',
    buyCtaUrl: 'https://courses.shikshanam.in/single-checkout/655b340de4b0b31c6db6cb3c?pid=p2',
    packageUrl: '/packages/sanskrit-basics-to-conversation',
    features: ['1 Year Full Access', 'Certificate of Completion', '30 Video Sessions', '17+ Hours Content']
  };

  // Instructor data with verified image
  const instructorData = {
    name: courseData.instructor?.name || 'Acharya V. Shrinidhi',
    title: courseData.instructor?.title || 'Sanskrit Acharya',
    bio: courseData.instructor?.bio || 'Traditional Sanskrit scholar with years of teaching experience.',
    photoUrl: '/images/sanskrit-course/acharya-photo.svg',
    stats: [
      { label: 'teaching', value: '12+ years' },
      { label: '', value: 'Speaks Sanskrit fluently' },
      { label: '', value: 'Traditional Gurukul training' }
    ],
    specialization: courseData.instructor?.specialization || ['Sanskrit Grammar', 'Classical Texts']
  };

  // Video testimonials
  const videoTestimonials = [
    {
      url: 'https://www.youtube.com/shorts/KY6jVDHuMiM?feature=share',
      thumbnail: '/images/sanskrit-course/testimonial-1.svg'
    },
    {
      url: 'https://www.youtube.com/shorts/1wRsegfOJoQ?feature=share',
      thumbnail: '/images/sanskrit-course/testimonial-2.svg'
    },
    {
      url: 'https://www.youtube.com/shorts/5IOb3Iy5rnY?feature=share',
      thumbnail: '/images/sanskrit-course/testimonial-3.svg'
    }
  ];

  // Final CTA data
  const finalCtaData = {
    title: 'Start Your Sanskrit Journey Today',
    description: 'Master the divine language from basics. Read Bhagavad Gita, understand mantras, and connect with ancient wisdom. Join 10,000+ students learning from Gurukul Acharya.',
    benefits: [
      '1 Year Access',
      'Certificate Included',
      'Recorded Classes',
      '10,000+ Students'
    ],
    ctaText: 'Enroll Now',
    ctaUrl: 'https://courses.shikshanam.in/single-checkout/655b340de4b0b31c6db6cb3c?pid=p2',
    price: courseData.metadata.price,
    guarantee: '100% Satisfaction Guaranteed'
  };

  return (
    <div className="min-h-screen bg-[var(--bg-sanskrit)]">
      {/* Preconnect to course checkout domain for faster loading */}
      <link rel="preconnect" href="https://courses.shikshanam.in" />
      
      {/* Hero Section */}
      <HeroAnimated {...heroData} />

      {/* Feature Badges */}
      <FeatureBadgeList features={features} />

      {/* Main Content with Sticky Package Card */}
      <div className="relative" id="course-details">
        {/* Sticky Package Card (Desktop) / Fixed Bottom (Mobile) */}
        <PackageCard {...packageData} />

        {/* Instructor Section */}
        <InstructorCard {...instructorData} />

        {/* Syllabus/Modules Section */}
        <ModuleCard 
          modules={courseData.syllabus} 
          syllabusVideoUrl="https://youtu.be/wVM0TcP745Q"
        />

        {/* Learning Outcomes */}
        <OutcomesGrid outcomes={courseData.outcomes} />

        {/* Testimonials Carousel */}
        <TestimonialsCarousel
          testimonials={courseData.testimonials}
          videoTestimonials={videoTestimonials}
        />

        {/* FAQ Section */}
        <FAQAccordion faqs={courseData.faqs} />
      </div>

      {/* Final CTA */}
      <FinalCTA {...finalCtaData} />
    </div>
  );
}
