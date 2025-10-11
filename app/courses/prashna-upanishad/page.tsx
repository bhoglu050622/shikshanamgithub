'use client'

import { useState, useEffect } from 'react'
import { EnhancedCourseHero, EnhancedCourseContent, EnhancedCoursePricing } from '@/components/course'

export default function PrashnaUpanishadPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleEnroll = () => {
    console.log('Enrolling in Prashna Upanishad course')
  }

  const handlePreview = () => {
    console.log('Playing preview for Prashna Upanishad')
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedCourseHero
        title="प्रश्न उपनिषद्: Online Course on The Prashna Upanishad"
        subtitle="Explore the Six Sacred Questions"
        description="Deep study of the Prashna Upanishad with question-answer format exploration. Understand the nature of life, breath, and consciousness through ancient wisdom."
        type="Philosophy Course"
        price="₹1,499"
        originalPrice="₹2,199"
        duration="6-8 weeks"
        level="Intermediate"
        language="Sanskrit & Hindi"
        rating={4.8}
        studentsCount={780}
        features={[
          "Text Study",
          "Question-Answer Format",
          "Meditation Practices",
          "Spiritual Insights",
          "Sanskrit Commentary",
          "Philosophical Discussion"
        ]}
        onEnroll={handleEnroll}
        onPreview={handlePreview}
      />

      {/* Enhanced Course Content */}
      <EnhancedCourseContent
        whatYouWillLearn={[
          "Understand the six fundamental questions of existence",
          "Explore the nature of Prana (life force)",
          "Study the relationship between consciousness and cosmos",
          "Learn about the states of consciousness",
          "Develop deeper spiritual understanding",
          "Apply Upanishadic wisdom to daily life"
        ]}
        features={[
          "Text Study",
          "Question-Answer Format",
          "Meditation Practices",
          "Spiritual Insights",
          "Sanskrit Commentary",
          "Philosophical Discussion"
        ]}
        requirements={[
          "Interest in Upanishadic philosophy",
          "Basic understanding of Sanskrit terms helpful",
          "Regular study and contemplation",
          "Open mind towards spiritual concepts"
        ]}
        curriculum={[
      {
        title: "Introduction to Prashna Upanishad",
            description: "Context and structure of the six questions",
            duration: "2 hours",
            lessons: 4
          },
          {
            title: "The Six Sacred Questions",
            description: "Detailed study of each question and answer",
            duration: "6 hours",
            lessons: 12
          },
          {
            title: "Prana and Consciousness",
            description: "Understanding life force and awareness",
            duration: "3 hours",
            lessons: 6
          },
          {
            title: "Practical Applications",
            description: "Applying the teachings in spiritual practice",
            duration: "2 hours",
            lessons: 4
          }
        ]}
        instructor="Acharya Pradeep Sharma"
        instructorBio="Vedic scholar with specialization in Upanishadic literature and 18+ years of teaching experience in traditional Sanskrit texts."
        rating={4.8}
        studentsCount={780}
        longDescription="The Prashna Upanishad presents profound spiritual teachings through six questions asked by disciples to the sage Pippalada. This course explores these fundamental questions about existence, consciousness, and the nature of reality."
      />

      {/* Enhanced Course Pricing */}
      <EnhancedCoursePricing
        price="₹1,499"
        originalPrice="₹2,199"
        savings="₹700"
              features={[
          "Text Study",
          "Question-Answer Format",
          "Meditation Practices",
          "Spiritual Insights",
          "Sanskrit Commentary",
          "Philosophical Discussion"
        ]}
        duration="6-8 weeks"
        level="Intermediate"
        studentsCount={780}
        rating={4.8}
        onEnroll={handleEnroll}
        urgencyMessage="Explore Sacred Questions"
        guaranteeText="30-Day Money Back Guarantee"
        bonusItems={[
          "Sanskrit Text with Translation",
          "Audio Pronunciation Guide",
          "Meditation Practice Sessions",
          "Study Group Access"
        ]}
      />
    </div>
  )
}