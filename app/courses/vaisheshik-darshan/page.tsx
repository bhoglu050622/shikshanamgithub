'use client'

import { useState, useEffect } from 'react'
import { EnhancedCourseHero, EnhancedCourseContent, EnhancedCoursePricing } from '@/components/course'

export default function VaisheshikDarshanPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleEnroll = () => {
    console.log('Enrolling in Vaisheshik Darshan course')
  }

  const handlePreview = () => {
    console.log('Playing preview for Vaisheshik Darshan')
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedCourseHero
        title="वैशेषिक दर्शन: Philosophy of Maharshi Kanada's Vaisheshik Sutras"
        subtitle="Explore the Atomic Theory of Reality"
        description="Explore the atomic theory of reality and fundamental building blocks of existence through Vaisheshik philosophy. Understand the six categories of reality according to ancient Indian atomism."
        type="Philosophy Course"
        price="₹999"
        originalPrice="₹1,499"
        duration="8-10 weeks"
        level="Beginner"
        language="Sanskrit & Hindi"
        rating={4.7}
        studentsCount={920}
        features={[
          "Atomic Theory",
          "30 Sessions",
          "Quizzes & Notes",
          "Free Updates",
          "Six Categories Study",
          "Ancient Science"
        ]}
        onEnroll={handleEnroll}
        onPreview={handlePreview}
      />

      {/* Enhanced Course Content */}
      <EnhancedCourseContent
        whatYouWillLearn={[
          "Understand ancient atomic theory",
          "Study the six categories of reality (Padarthas)",
          "Explore the nature of substance and attributes",
          "Learn about motion and causation",
          "Understand the building blocks of existence",
          "Apply Vaisheshik principles to modern science"
        ]}
        features={[
          "Atomic Theory",
      "30 Sessions",
      "Quizzes & Notes",
          "Free Updates",
          "Six Categories Study",
          "Ancient Science"
        ]}
        requirements={[
          "Interest in philosophy and science",
          "Basic understanding of Indian philosophy helpful",
          "Analytical thinking skills",
          "Regular study commitment"
        ]}
        curriculum={[
      {
        title: "Introduction to Vaisheshik Philosophy",
            description: "Historical context and Maharshi Kanada's contributions",
            duration: "2 hours",
            lessons: 4
          },
          {
            title: "The Six Categories (Padarthas)",
            description: "Detailed study of Dravya, Guna, Karma, Samanya, Vishesha, Samavaya",
        duration: "8 hours",
            lessons: 16
          },
          {
            title: "Atomic Theory and Causation",
            description: "Understanding atoms, molecules, and causation",
        duration: "4 hours",
            lessons: 8
          },
          {
            title: "Modern Applications",
            description: "Connecting ancient wisdom with contemporary science",
            duration: "2 hours",
            lessons: 4
          }
        ]}
        instructor="Dr. Rajesh Khurana"
        instructorBio="PhD in Indian Philosophy with specialization in Vaisheshik Darshan and 20+ years of research in ancient scientific traditions."
        rating={4.7}
        studentsCount={920}
        longDescription="Vaisheshik Darshan, founded by Maharshi Kanada, presents one of the world's earliest atomic theories. This course explores the systematic analysis of reality through six fundamental categories and their interactions."
      />

      {/* Enhanced Course Pricing */}
      <EnhancedCoursePricing
              price="₹999"
        originalPrice="₹1,499"
        savings="₹500"
              features={[
          "Atomic Theory",
          "30 Sessions",
          "Quizzes & Notes",
          "Free Updates",
          "Six Categories Study",
          "Ancient Science"
        ]}
        duration="8-10 weeks"
        level="Beginner"
        studentsCount={920}
        rating={4.7}
        onEnroll={handleEnroll}
        urgencyMessage="Discover Ancient Atomic Theory"
        guaranteeText="30-Day Money Back Guarantee"
        bonusItems={[
          "Interactive Atomic Models",
          "Category Classification Charts",
          "Science Connection Guide",
          "Philosophy Discussion Forum"
        ]}
      />
    </div>
  )
}