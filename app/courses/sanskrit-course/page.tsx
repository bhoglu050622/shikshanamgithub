import { Metadata } from 'next'
import { courseLd, organizationLd, faqLd, instructorLd } from '@/lib/schema'
import Header from '@/components/Header'
import Hero from './components/Hero'
import StickyEnrollBar from './components/StickyEnrollBar'
import ProblemFitCarousel from './components/ProblemFitCarousel'
import SocialProof from './components/SocialProof'
import LiveSessions from './components/LiveSessions'
import PricingCards from './components/PricingCards'
import BonusesGrid from './components/BonusesGrid'
import Reels from './components/Reels'
import Instructor from './components/Instructor'
import SyllabusAccordion from './components/SyllabusAccordion'
import Outcomes from './components/Outcomes'
import NotSection from './components/NotSection'
import Certification from './components/Certification'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'

export const metadata: Metadata = {
  title: 'Online Sanskrit Course for Beginners | Shikshanam',
  description: 'Learn Sanskrit from scratch with live doubt sessions, certification, and expert guidance. Perfect for beginners with no prior knowledge.',
  keywords: 'Sanskrit course, English, beginners, online learning, Devanagari, Sanskrit grammar, live classes, certification',
  authors: [{ name: 'Shikshanam Team' }],
  creator: 'Shikshanam',
  publisher: 'Shikshanam',
  robots: 'index, follow',
  metadataBase: new URL('https://shikshanam.com'),
  alternates: {
    canonical: 'https://shikshanam.com/courses/sanskrit-course/',
  },
  openGraph: {
    title: 'Online Sanskrit Course for Beginners',
    description: 'Learn Sanskrit from scratch with live doubt sessions, certification, and expert guidance.',
    url: 'https://shikshanam.com/courses/sanskrit-course/',
    siteName: 'Shikshanam',
    images: [
      {
        url: '/og-sanskrit-course.jpg',
        width: 1200,
        height: 630,
        alt: 'Online Sanskrit Course for Beginners',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Sanskrit Course for Beginners',
    description: 'Learn Sanskrit from scratch with live doubt sessions, certification, and expert guidance.',
    images: ['/og-sanskrit-course.jpg'],
  },
}

const faqs = [
  {
    question: 'Do I need any prior knowledge of Sanskrit?',
    answer: 'No, this course is designed for complete beginners. You don\'t need any prior knowledge of Sanskrit to get started.'
  },
  {
    question: 'What is the duration of the course?',
    answer: 'This is a 3-month course that includes weekly live sessions and self-study materials.'
  },
  {
    question: 'Will I receive a certificate?',
    answer: 'Yes, upon completion of the course, you will receive a verified certificate that you can also add to your LinkedIn profile.'
  },
  {
    question: 'When are the live sessions conducted?',
    answer: 'Live sessions are held every Sunday at 7:00 PM IST. You get lifetime access to these sessions.'
  },
  {
    question: 'Can I learn at my own pace?',
    answer: 'Yes, you can watch all videos and materials at your convenience. Everything is self-paced except for the live sessions.'
  }
]

export default function SanskritCoursePage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseLd({
            name: 'Online Sanskrit Course for Beginners',
            url: 'https://shikshanam.com/courses/sanskrit-course/',
            provider: 'Shikshanam'
          }))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationLd)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd(faqs))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(instructorLd)
        }}
      />

      {/* Header Navigation */}
      <Header />

      <main 
        className="min-h-screen bg-gradient-to-br from-off-white-500 via-sand-500 to-off-white-500 dark:from-wisdom-900 dark:via-wisdom-800 dark:to-wisdom-900"
        role="main"
        aria-label="Sanskrit Course Landing Page"
      >
        {/* Background Pattern */}
        <div className="fixed inset-0 mandala-bg-subtle opacity-30 pointer-events-none" aria-hidden="true" />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Sticky Enroll Bar */}
        <StickyEnrollBar />
        
        {/* Problem → Fit Carousel */}
        <section className="section-padding" aria-labelledby="problem-fit-heading">
          <div className="container-custom">
            <ProblemFitCarousel />
          </div>
        </section>
        
        {/* Social Proof */}
        <section className="section-padding bg-white/50 dark:bg-wisdom-800/50" aria-labelledby="social-proof-heading">
          <div className="container-custom">
            <SocialProof />
          </div>
        </section>
        
        {/* Live Sessions */}
        <section className="section-padding" aria-labelledby="live-sessions-heading">
          <div className="container-custom">
            <LiveSessions />
          </div>
        </section>
        
        {/* Pricing Cards */}
        <section className="section-padding bg-white/50 dark:bg-wisdom-800/50" aria-labelledby="pricing-heading">
          <div className="container-custom">
            <PricingCards />
          </div>
        </section>
        
        {/* Bonuses Grid */}
        <section className="section-padding" aria-labelledby="bonuses-heading">
          <div className="container-custom">
            <BonusesGrid />
          </div>
        </section>
        
        {/* Reels */}
        <section className="section-padding bg-white/50 dark:bg-wisdom-800/50" aria-labelledby="reels-heading">
          <div className="container-custom">
            <Reels />
          </div>
        </section>
        
        {/* Instructor */}
        <section className="section-padding" aria-labelledby="instructor-heading">
          <div className="container-custom">
            <Instructor />
          </div>
        </section>
        
        {/* Syllabus Accordion */}
        <section className="section-padding bg-white/50 dark:bg-wisdom-800/50" aria-labelledby="syllabus-heading">
          <div className="container-custom">
            <SyllabusAccordion />
          </div>
        </section>
        
        {/* Outcomes */}
        <section className="section-padding" aria-labelledby="outcomes-heading">
          <div className="container-custom">
            <Outcomes />
          </div>
        </section>
        
        {/* Not Section */}
        <section className="section-padding bg-white/50 dark:bg-wisdom-800/50" aria-labelledby="not-section-heading">
          <div className="container-custom">
            <NotSection />
          </div>
        </section>
        
        {/* Certification */}
        <section className="section-padding" aria-labelledby="certification-heading">
          <div className="container-custom">
            <Certification />
          </div>
        </section>
        
        {/* FAQ */}
        <section className="section-padding bg-white/50 dark:bg-wisdom-800/50" aria-labelledby="faq-heading">
          <div className="container-custom">
            <FAQ faqs={faqs} />
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="section-padding" aria-labelledby="final-cta-heading">
          <div className="container-custom">
            <FinalCTA />
          </div>
        </section>
      </main>
    </>
  )
}
