// Schema.org structured data generators
export const courseLd = (course: any) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.name || "Course",
  "description": course.description || "Learn with us",
  "provider": {
    "@type": "Organization",
    "name": "Shikshanam"
  }
});

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Shikshanam",
  "description": "Ancient Indian Knowledge Platform"
});

export const faqLd = (faqs: any[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const instructorLd = (instructor: any) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": instructor.name || "Instructor",
  "jobTitle": instructor.title || "Teacher"
});
