'use client'

import { useState, useEffect } from 'react'
import { EnhancedCourseHero, EnhancedCourseContent, EnhancedCoursePricing } from '@/components/course'

export default function AdvaitaVedantaPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleEnroll = () => {
    console.log('Enrolling in Advaita Vedanta course')
  }

  const handlePreview = () => {
    console.log('Playing preview for Advaita Vedanta')
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedCourseHero
        title="Advaita Vedanta Darshan: दृग दृश्य विवेक द्वारा अद्वैत की व्याख्या"
        subtitle="Journey into Non-Dual Reality"
        description="Deep exploration of non-dual philosophy through the lens of Drig Drishya Viveka. Understand the ultimate nature of reality and consciousness."
        type="Philosophy Course"
        price="₹1,999"
        originalPrice="₹2,999"
        duration="8-10 weeks"
        level="Advanced"
        language="Sanskrit & Hindi"
        rating={4.9}
        studentsCount={650}
        features={[
          "Non-Dual Philosophy",
          "Text Study",
          "Meditation Practices",
          "Spiritual Insights",
          "Sanskrit Commentary",
          "Advanced Concepts"
        ]}
        onEnroll={handleEnroll}
        onPreview={handlePreview}
      />

      {/* Enhanced Course Content */}
      <EnhancedCourseContent
        whatYouWillLearn={[
          "Understand the nature of consciousness",
          "Explore the concept of Maya (illusion)",
          "Study classical Advaita texts",
          "Practice discrimination between real and unreal",
          "Develop spiritual insight",
          "Apply non-dual understanding to daily life"
        ]}
        features={[
          "Non-Dual Philosophy",
          "Text Study", 
          "Meditation Practices",
          "Spiritual Insights",
          "Sanskrit Commentary",
          "Advanced Concepts"
        ]}
        requirements={[
          "Basic understanding of Vedantic concepts",
          "Interest in spiritual philosophy",
          "Sanskrit knowledge helpful but not required",
          "Regular study and contemplation"
        ]}
        curriculum={[
    {
      title: "Introduction to Advaita Vedanta",
            description: "Foundational concepts and key teachers",
      duration: "2 hours",
            lessons: 4
          },
          {
            title: "Drig Drishya Viveka Study",
            description: "Detailed analysis of the classical text",
            duration: "4 hours",
            lessons: 8
          },
          {
            title: "The Nature of Maya",
            description: "Understanding illusion and reality",
            duration: "3 hours",
            lessons: 6
          },
          {
            title: "Practical Application",
            description: "Living the non-dual understanding",
      duration: "2 hours",
            lessons: 4
          }
        ]}
        instructor="Acharya Vishnu Sharma"
        instructorBio="Renowned Vedanta scholar with 20+ years of teaching experience in traditional Sanskrit texts and non-dual philosophy."
        rating={4.9}
        studentsCount={650}
        longDescription="This advanced course explores the profound teachings of Advaita Vedanta through the classical text Drig Drishya Viveka. Students will gain deep insights into the nature of consciousness, reality, and the path to self-realization."
      />

      {/* Enhanced Course Pricing */}
      <EnhancedCoursePricing
        price="₹1,999"
        originalPrice="₹2,999"
        savings="₹1,000"
        features={[
          "Non-Dual Philosophy",
          "Text Study",
          "Meditation Practices", 
          "Spiritual Insights",
          "Sanskrit Commentary",
          "Advanced Concepts"
        ]}
        duration="8-10 weeks"
        level="Advanced"
        studentsCount={650}
        rating={4.9}
        onEnroll={handleEnroll}
        urgencyMessage="Discover Ultimate Reality"
        guaranteeText="30-Day Money Back Guarantee"
        bonusItems={[
          "Sanskrit Text with Translation",
          "Meditation Audio Guides",
          "Study Group Access",
          "Monthly Q&A Sessions"
        ]}
      />
                </div>
  )
}