'use client'

import React, { useState, useEffect } from 'react';
import { EnhancedCourseHero, EnhancedCourseContent, EnhancedCoursePricing } from '@/components/course'

export default function NyayaDarshanCoursePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Course data extracted from shikshanam.in
  const courseData = {
    title: "Nyaya Darshan",
    subtitle: "The Science of Logic and Reasoning",
    description: "Embark on a journey through India's most sophisticated system of logic and epistemology. Master the art of reasoning, debate, and critical thinking through the timeless wisdom of Nyaya philosophy.",
    checkoutUrl: "https://courses.shikshanam.in/single-checkout/nyaya-darshan",
    instructor: {
      name: "विशाल चौरसिया",
      title: "Graduate, IIT Patna",
      description: "शिक्षणम् के संस्थापक विशाल जी एक IIT स्नातक हैं जो 2016-2023 तक भारत की एक शीर्ष PSU में सरकारी पद पर कार्यरत थे परंतु भारतीय प्राचीन ज्ञान के प्रति रुझान के चलते, उन्होनें इसी क्षेत्र में कार्य करने का निर्णय लिया।",
      credentials: [
        "IIT Patna Graduate",
        "Founder of Shikshanam",
        "Hyper Quest Channel Creator",
        "2 Million Subscribers",
        "Logic & Philosophy Expert"
      ],
      socialStats: {
        followers: 2000000,
        students: 50000,
        rating: 4.9
      },
      image: "https://shikshanam.in/wp-content/uploads/2024/05/vishal-chaurasia.jpg"
    },
    features: [
      "9+ Hours of Content",
      "Interactive Logic Demos",
      "Syllogism Exercises",
      "Free Future Updates",
      "Certificate of Completion",
      "Community Forum"
    ],
    pramanas: [
      {
        id: 1,
        name: "प्रत्यक्ष (Pratyaksha)",
        english: "Perception",
        description: "Direct knowledge gained through the senses.",
        examples: "Seeing a fire, hearing a sound, feeling heat",
        logicFlow: "Direct observation → Immediate knowledge"
      },
      {
        id: 2,
        name: "अनुमान (Anumana)",
        english: "Inference",
        description: "Knowledge gained through logical reasoning.",
        examples: "Seeing smoke → Inferring fire",
        logicFlow: "Observation → Reasoning → Conclusion"
      },
      {
        id: 3,
        name: "उपमान (Upamana)",
        english: "Comparison",
        description: "Knowledge gained through similarity and analogy.",
        examples: "Learning about a new animal by comparing it to a known one",
        logicFlow: "Known object → Similarity → New knowledge"
      },
      {
        id: 4,
        name: "शब्द (Shabda)",
        english: "Testimony",
        description: "Knowledge gained from reliable sources and authority.",
        examples: "Learning from scriptures, expert testimony",
        logicFlow: "Reliable source → Verbal testimony → Knowledge"
      }
    ],
    modules: [
      {
        title: "Introduction to Nyaya Philosophy",
        description: "Foundation concepts and historical context of Nyaya Darshan",
        duration: "2 hours",
        lessons: 4
      },
      {
        title: "The Four Pramanas",
        description: "Deep dive into the sources of valid knowledge",
        duration: "3 hours", 
        lessons: 6
      },
      {
        title: "Logic and Inference",
        description: "Master the art of logical reasoning and valid inference",
        duration: "2.5 hours",
        lessons: 5
      },
      {
        title: "Debate and Argumentation",
        description: "Learn systematic debate techniques and fallacy recognition",
        duration: "2 hours",
        lessons: 4
      }
    ]
  }

  const handleEnroll = () => {
    window.open(courseData.checkoutUrl, '_blank')
  }

  const handlePreview = () => {
    console.log('Playing preview for Nyaya Darshan')
  }

  return (
    <div id="nyaya-darshan-course" className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedCourseHero
        title="न्याय दर्शन: The Art of Perception"
        subtitle={courseData.subtitle}
        description={courseData.description}
        type="Philosophy Course"
        price="₹999"
        originalPrice="₹1,499"
        duration="6-8 weeks"
        level="Intermediate"
        language="Hindi & English"
        rating={4.8}
        studentsCount={890}
        features={courseData.features}
        image="https://shikshanam.in/wp-content/uploads/2024/05/nyaya-darshan-hero.jpg"
        onEnroll={handleEnroll}
        onPreview={handlePreview}
      />

      {/* Enhanced Course Content */}
      <EnhancedCourseContent
        whatYouWillLearn={[
          "Master logical reasoning and critical thinking",
          "Understand the four sources of valid knowledge",
          "Develop systematic debate skills",
          "Recognize and avoid logical fallacies",
          "Apply Nyaya principles to modern problems",
          "Build strong argumentative skills"
        ]}
        features={courseData.features}
        requirements={[
          "Interest in philosophy and logic",
          "Basic understanding of Sanskrit terms (helpful but not required)",
          "Analytical mindset",
          "Regular practice and participation"
        ]}
        curriculum={courseData.modules}
        instructor={courseData.instructor.name}
        instructorBio={courseData.instructor.description}
        rating={4.8}
        studentsCount={890}
        longDescription="Nyaya Darshan is one of the six orthodox schools of Hindu philosophy, focusing on logic, epistemology, and the means of acquiring knowledge. This course will teach you systematic thinking and reasoning through ancient Indian wisdom."
      />

      {/* Enhanced Course Pricing */}
      <EnhancedCoursePricing
        price="₹999"
        originalPrice="₹1,499"
        savings="₹500"
        features={courseData.features}
        duration="6-8 weeks"
        level="Intermediate"
        studentsCount={890}
        rating={4.8}
        onEnroll={handleEnroll}
        urgencyMessage="Master Ancient Logic"
        guaranteeText="30-Day Money Back Guarantee"
        bonusItems={[
          "Interactive Logic Exercises",
          "Syllogism Practice Sets",
          "Debate Technique Guides",
          "Philosophy Discussion Forum"
        ]}
      />
    </div>
  )
}