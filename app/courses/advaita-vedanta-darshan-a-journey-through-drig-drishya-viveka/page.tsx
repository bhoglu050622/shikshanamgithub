'use client';

import { useState } from 'react';
import './advaita-vedanta-landing.css';
import './advaita-vedanta-premium.css';
import '../_shared/course-landing.css';
import { advaitaVedantaCourseData } from './courseData';
import {
  HeroAdvaita,
  FeatureChips,
  DemoModal,
  SyllabusVerseGrid,
  InstructorAdvaita,
  PurchaseCard,
  FAQAdvaita,
  TestimonialsAdvaita
} from './components/premium';
import { BookOpen, Eye, Lightbulb, Users, Target, Brain, Heart, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInVariants, safeVariants } from './motion.config';

export default function AdvaitaVedantaDarshanCoursePage() {
  const courseData = advaitaVedantaCourseData;
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Why Course features with icons
  const whyFeatures = [
    {
      icon: BookOpen,
      title: 'जीवन का वास्तविक लक्ष्य क्या है?',
      description: 'What is the true purpose of life?'
    },
    {
      icon: Eye,
      title: 'क्या ये संसार सच में मिथ्या है?',
      description: 'Is this world truly an illusion?'
    },
    {
      icon: Lightbulb,
      title: 'अद्वैत वेदान्त से जीवन कैसे जिया जाए?',
      description: 'How to live guided by non-duality?'
    },
    {
      icon: Users,
      title: 'मैं और ये संसार एक कैसे हो सकते हैं?',
      description: 'How are you and the world fundamentally one?'
    },
    {
      icon: Target,
      title: 'आत्मा का वास्तविक स्वरूप क्या है?',
      description: 'What is the true nature of the Self?'
    },
    {
      icon: Heart,
      title: 'मुक्ति कैसे प्राप्त की जा सकती है?',
      description: 'How can liberation be attained?'
    }
  ];

  // Key outcomes
  const keyOutcomes = [
    {
      icon: Brain,
      title: 'Understanding Non-Dual Reality',
      description: 'Gain deep insight into the non-dual nature of existence and the unity of Atman and Brahman'
    },
    {
      icon: Compass,
      title: 'Discrimination Between Real and Unreal',
      description: 'Develop viveka (discrimination) to distinguish between the eternal Self and temporary phenomena'
    },
    {
      icon: Lightbulb,
      title: 'Liberation from Ignorance',
      description: 'Learn the systematic path to remove avidya (ignorance) and realize your true nature'
    },
    {
      icon: Heart,
      title: 'Practical Spiritual Guidance',
      description: 'Apply Vedantic principles in daily life for inner peace and spiritual growth'
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--advaita-bg)' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossOrigin="anonymous" />

      {/* Hero Section */}
      <HeroAdvaita onDemoClick={() => setIsDemoModalOpen(true)} />

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />

      {/* Feature Chips */}
      <FeatureChips />

      {/* Why This Course Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-[#FFF9F2]">
        <div className="max-w-7xl mx-auto">
          <div className="advaita-section-header">
            <h2>What Questions You Might Be Seeking to Answer</h2>
            <p>तो आज ही जुड़ें वेदान्त [उपनिषदों] के अद्वैत दर्शन से! Join thousands of seekers who have discovered profound answers.</p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
            variants={safeVariants(fadeInVariants)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {whyFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white border-2 border-[#0D3B4A] rounded-2xl p-6 hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-[#D97B2A] rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0D3B4A] mb-2" style={{ fontFamily: 'var(--font-devanagari)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Additional Points */}
          <div className="mt-12 bg-gradient-to-br from-[#FFF9F2] to-[#FAF7F2] rounded-3xl p-8 border-2 border-[#D97B2A]/20">
            <h3 className="text-2xl font-bold text-center text-[#0D3B4A] mb-8">
              Journey into Non-Dual Wisdom
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courseData.whyCourse?.points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#14B8A6] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <SyllabusVerseGrid />

      {/* Learning Outcomes Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="advaita-section-header">
            <h2>Transform Your Understanding</h2>
            <p>Master the profound teachings of Advaita Vedanta and realize your true nature</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
            {keyOutcomes.map((outcome, index) => {
              const IconComponent = outcome.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-[#FFF9F2] border-2 border-[#0D3B4A] rounded-2xl p-6"
                  variants={safeVariants(fadeInVariants)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IconComponent className="w-10 h-10 text-[#D97B2A] mb-4" />
                  <h3 className="text-xl font-bold text-[#0D3B4A] mb-2">
                    {outcome.title}
                  </h3>
                  <p className="text-gray-700">{outcome.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <InstructorAdvaita />

      {/* Testimonials Section */}
      <TestimonialsAdvaita />

      {/* Sacred Shloka Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#0D3B4A] to-[#1A5568]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-white/20">
            <h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed" 
              style={{ fontFamily: 'var(--font-devanagari)' }}
            >
              द्रश्यं दृश्यत्वात् जडम् प्रतीयते।<br />
              दृक् तु चैतन्यरूपः सदा॥
            </h2>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-4">
              The seen is inert because it is an object of perception.<br />
              But the Seer is always of the nature of consciousness.
            </p>
            <p className="text-white/70 text-sm md:text-base">— Drig Drishya Viveka</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAdvaita />

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#FFF9F2] via-white to-[#FAF7F2]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#0D3B4A]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0D3B4A] mb-6">
              Begin Your Journey to Self-Realization
            </h2>
            <p className="text-center text-gray-700 text-lg mb-8">
              Discover the non-dual truth of existence through comprehensive study of Drig Drishya Viveka.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <a
                href={courseData.enrollment.checkoutLink}
                className="group px-10 py-4 bg-gradient-to-r from-[#0D3B4A] to-[#1A5568] text-white font-bold text-xl rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 inline-flex items-center justify-center gap-2"
              >
                <span>Enroll Now — ₹1,999</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="px-10 py-4 bg-white text-[#0D3B4A] font-bold text-xl border-2 border-[#0D3B4A] rounded-xl shadow-lg hover:bg-[#0D3B4A] hover:text-white transition-all duration-300 hover:-translate-y-1 inline-flex items-center justify-center gap-2"
              >
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D97B2A]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>1 Year Access</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D97B2A]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D97B2A]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <span>46 Shlokas</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D97B2A]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>Community Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Purchase Card (Desktop) / Bottom Sheet (Mobile) */}
      <div className="hidden lg:block fixed top-20 right-8 z-50 w-96">
        <PurchaseCard />
      </div>
      <div className="lg:hidden">
        <PurchaseCard />
      </div>
    </div>
  );
}
