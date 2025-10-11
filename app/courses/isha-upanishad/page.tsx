'use client'

import { useState, useEffect } from 'react'
import { EnhancedCourseHero, EnhancedCourseContent, EnhancedCoursePricing } from '@/components/course'

export default function IshaUpanishadPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleEnroll = () => {
    console.log('Enrolling in Isha Upanishad course')
  }

  const handlePreview = () => {
    console.log('Playing preview for Isha Upanishad')
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedCourseHero
        title="ईशावास्य उपनिषद्: Online Course on The Isha Upanishad"
        subtitle="Gateway to Upanishadic Wisdom"
        description="Introduction to Upanishadic wisdom through the Isha Upanishad. Explore the fundamental teachings of non-attachment and divine consciousness."
        type="Philosophy Course"
        price="₹999"
        originalPrice="₹1,499"
        duration="4-6 weeks"
        level="Beginner"
        language="Sanskrit & Hindi"
        rating={4.7}
        studentsCount={1200}
        features={[
          "Upanishadic Wisdom",
          "Chanting Practice",
          "Philosophical Discussion",
          "Practical Application",
          "Sanskrit Study",
          "Meditation Guidance"
        ]}
        onEnroll={handleEnroll}
        onPreview={handlePreview}
      />

      {/* Enhanced Course Content */}
      <EnhancedCourseContent
        whatYouWillLearn={[
          "Understand the essence of Isha Upanishad",
          "Learn proper Sanskrit pronunciation",
          "Explore the concept of divine consciousness",
          "Practice non-attachment in daily life",
          "Develop spiritual insight",
          "Connect with Vedic wisdom tradition"
        ]}
        features={[
          "Upanishadic Wisdom",
          "Chanting Practice",
          "Philosophical Discussion",
          "Practical Application", 
          "Sanskrit Study",
          "Meditation Guidance"
        ]}
        requirements={[
          "Interest in spiritual philosophy",
          "Open mind towards ancient wisdom",
          "Basic understanding of Hindu concepts helpful",
          "Regular study and practice"
        ]}
        curriculum={[
          {
            title: "Introduction to Upanishads",
            description: "Understanding the context and importance",
            duration: "1.5 hours",
            lessons: 3
          },
          {
            title: "Isha Upanishad Verses 1-9",
            description: "Detailed study of the first half",
            duration: "3 hours",
            lessons: 6
          },
          {
            title: "Isha Upanishad Verses 10-18",
            description: "Completion of the text study",
            duration: "3 hours",
            lessons: 6
          },
          {
            title: "Integration and Practice",
            description: "Applying the teachings in life",
            duration: "1.5 hours",
            lessons: 3
          }
        ]}
        instructor="Pandit Ramesh Shastri"
        instructorBio="Traditional Sanskrit scholar with expertise in Upanishadic literature and 15+ years of teaching experience."
        rating={4.7}
        studentsCount={1200}
        longDescription="The Isha Upanishad is one of the shortest yet most profound Upanishads, containing the essence of Vedantic philosophy in just 18 verses. This course provides a comprehensive introduction to Upanishadic wisdom through careful study of this foundational text."
      />

      {/* Enhanced Course Pricing */}
      <EnhancedCoursePricing
              price="₹999"
        originalPrice="₹1,499"
        savings="₹500"
              features={[
          "Upanishadic Wisdom",
          "Chanting Practice",
          "Philosophical Discussion",
          "Practical Application",
          "Sanskrit Study", 
          "Meditation Guidance"
        ]}
        duration="4-6 weeks"
        level="Beginner"
        studentsCount={1200}
        rating={4.7}
        onEnroll={handleEnroll}
        urgencyMessage="Begin Your Spiritual Journey"
        guaranteeText="30-Day Money Back Guarantee"
        bonusItems={[
          "Sanskrit Text with Audio",
          "Chanting Practice Sessions",
          "Philosophy Discussion Group",
          "Daily Reflection Exercises"
        ]}
      />
    </div>
  )
}