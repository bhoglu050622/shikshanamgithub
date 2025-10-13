# 🚀 Quick Start Guide - Creating New Course Landing Pages

## Overview
This guide shows you how to create a new course landing page in under 15 minutes using the revamped template system.

---

## ⚡ Quick Steps

### 1. Create Course Directory (1 min)

```bash
cd app/courses/
mkdir your-course-name
cd your-course-name
```

### 2. Create `courseData.ts` (5 min)

Copy template and fill in your course data:

```typescript
import { CourseContent } from '../_shared/types/course.types';

export const yourCourseCourseData: CourseContent = {
  metadata: {
    title: 'Your Course Title in Hindi',
    subtitle: 'Your Course Subtitle in English',
    description: 'Compelling course description...',
    type: 'Premium Course',
    price: '₹2,999',
    originalPrice: '₹4,499',
    savings: '33%',
    duration: '12 Sessions',
    level: 'Beginner',
    status: 'available',
    features: [
      'Feature 1',
      'Feature 2',
      // ... 6-8 features
    ],
    thumbnail: '/assets/your-course.png',
    category: 'darshan', // or 'upanishad', 'practical', 'sanskrit'
    priority: 0.85
  },

  stats: {
    students: '500+',
    rating: 4.8,
    reviews: 42,
    satisfaction: '95%'
  },

  highlights: [
    {
      icon: 'BookOpen', // lucide-react icon name
      title: 'Highlight Title',
      description: 'Highlight description'
    },
    // ... 6 highlights total
  ],

  whyCourse: {
    title: 'Why Take This Course?',
    description: 'One-line compelling reason',
    points: [
      'Benefit 1',
      'Benefit 2',
      // ... 6 points
    ]
  },

  syllabus: [
    {
      title: 'Module 1 Title',
      subtitle: 'Module Subtitle',
      duration: '3 Classes',
      topics: [
        'Topic 1',
        'Topic 2',
        // ... 5-8 topics
      ],
      description: 'Module overview'
    },
    // ... 4-6 modules
  ],

  outcomes: [
    {
      title: 'Outcome 1',
      description: 'What students will achieve'
    },
    // ... 6 outcomes
  ],

  instructor: {
    name: 'Dr. Name',
    title: 'Title & Credentials',
    bio: 'Instructor bio paragraph...',
    experience: '15+ years teaching',
    specialization: [
      'Area 1',
      'Area 2',
      'Area 3',
      'Area 4'
    ]
  },

  testimonials: [
    {
      name: 'Student Name',
      role: 'Role/Profession',
      content: 'Testimonial quote...',
      rating: 5
    },
    // ... 6 testimonials
  ],

  faqs: [
    {
      question: 'Common question?',
      answer: 'Detailed answer...'
    },
    // ... 8 FAQs
  ],

  enrollment: {
    checkoutLink: 'https://courses.shikshanam.in/checkout/your-course?pid=p1'
  }
};
```

### 3. Create `page.tsx` (3 min)

```typescript
'use client';

import '../_shared/course-landing.css';
import './your-course-landing.css';
import CourseLayout from '../_shared/layouts/CourseLayout';
import { yourCourseCourseData } from './courseData';
import {
  HeroTemplate,
  HighlightsTemplate,
  SyllabusTemplate,
  InstructorTemplate,
  OutcomesTemplate,
  TestimonialsTemplate,
  FAQTemplate,
} from '../_shared/sections';
import { CourseCTA, CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { BookOpen, Award, Users, Target } from 'lucide-react';

export default function YourCoursePage() {
  const courseData = yourCourseCourseData;

  const whyFeatures = [
    {
      icon: BookOpen,
      title: 'Feature 1',
      description: 'Description'
    },
    {
      icon: Award,
      title: 'Feature 2',
      description: 'Description'
    },
    {
      icon: Users,
      title: 'Feature 3',
      description: 'Description'
    },
    {
      icon: Target,
      title: 'Feature 4',
      description: 'Description'
    }
  ];

  return (
    <CourseLayout theme="philosophy"> {/* Choose: philosophy, upanishad, sanskrit, practical, advanced */}
      <HeroTemplate
        metadata={courseData.metadata}
        stats={courseData.stats}
        enrollmentLink={courseData.enrollment.checkoutLink}
        backgroundImage={courseData.metadata.thumbnail}
      />

      <section className="course-section bg-gradient-to-b from-white to-gray-50">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Course Category"
            title="Why Take This Course?"
            description={courseData.whyCourse?.description}
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
        </div>
      </section>

      <HighlightsTemplate
        highlights={courseData.highlights}
        title="Course Features"
        subtitle="What You'll Master"
        description="Course overview one-liner"
        columns={3}
        className="bg-white"
      />

      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Complete Curriculum"
        subtitle="Systematic Learning Path"
        description="Curriculum overview"
        defaultOpen={[0]}
      />

      {courseData.instructor && (
        <InstructorTemplate
          instructor={courseData.instructor}
          className="bg-white"
        />
      )}

      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="What You'll Achieve"
        subtitle="Learning Outcomes"
        description="Outcomes overview"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Success"
        subtitle="What Our Students Say"
        description="Social proof headline"
        maxDisplay={6}
      />

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-[var(--theme-primary-50)] via-white to-[var(--theme-secondary-50)]">
        <div className="course-container">
          <CourseCTA
            title="Compelling CTA Title"
            description="Persuasive description about the course value and transformation..."
            primaryButtonText="Enroll Now"
            primaryButtonHref={courseData.enrollment.checkoutLink}
            badges={['1 Year Access', 'Certificate', 'Feature 3', 'Feature 4']}
            backgroundGradient={false}
          />
        </div>
      </section>
    </CourseLayout>
  );
}
```

### 4. Create `your-course-landing.css` (2 min)

```css
/* Course-specific styles (if needed) */

.your-course-page {
  /* Custom styles here */
}

/* Most styling comes from shared design system */
/* Only add course-specific overrides if absolutely necessary */
```

### 5. Test & Deploy (4 min)

```bash
# Check for errors
npm run dev

# Visit http://localhost:3000/courses/your-course-name

# Check linting
npm run lint

# Build for production
npm run build
```

---

## 🎨 Choosing a Theme

Select the appropriate theme based on course type:

### `theme="philosophy"` (Burgundy & Gold)
**Use for**: Darshanas, philosophical texts, meditation courses
- Deep burgundy primary
- Royal gold secondary
- Traditional, contemplative feel

### `theme="upanishad"` (Gold & Amber)
**Use for**: Upanishad courses, Vedic studies
- Pure gold primary
- Warm amber secondary
- Ancient wisdom, illumination

### `theme="sanskrit"` (Teal & Saffron)
**Use for**: Language courses, grammar, script learning
- Vibrant teal primary
- Saffron orange secondary
- Cultural, educational feel

### `theme="practical"` (Blue & Emerald)
**Use for**: Life skills, modern applications, practical wisdom
- Deep blue primary
- Emerald green secondary
- Contemporary, transformative

### `theme="advanced"` (Indigo & Purple)
**Use for**: Advanced practices, mastery courses
- Deep indigo primary
- Royal purple secondary
- Mystical, elevated feel

---

## 📝 Content Guidelines

### Metadata
- **Title**: Use Hindi/Sanskrit with proper diacritics
- **Subtitle**: Clear English translation/description
- **Description**: 2-3 sentences, benefit-focused
- **Duration**: Be specific (e.g., "12 Sessions | 15+ Hours")
- **Features**: 6-8 bullet points, start with verbs

### Stats
- **Students**: Use K+ format (e.g., "1.5K+")
- **Rating**: Realistic 4.5-4.9 range
- **Reviews**: Proportional to students
- **Satisfaction**: 90-98% range

### Highlights (6 items)
- Use lucide-react icon names
- Keep titles short (2-4 words)
- Descriptions should be one sentence
- Mix features, benefits, and logistics

### Syllabus (4-6 modules)
- Title: Module name
- Subtitle: Brief descriptor
- Duration: "2-3 Classes"
- Topics: 5-8 bullet points per module
- Description: One sentence overview

### Outcomes (6 items)
- Start with action verbs
- Focus on transformation
- Be specific and measurable

### Testimonials (6 items)
- Real or realistic names
- Include role/profession
- 2-3 sentence quotes
- Mix different perspectives
- All should be 5 stars for social proof

### FAQs (8 questions)
- Address common objections
- Cover prerequisites, access, support
- Include pricing/refund info
- End with positive notes

---

## 🎯 Available Icons (lucide-react)

Common icons for course pages:

**General**
- `BookOpen`, `Book`, `BookMarked`
- `Award`, `Trophy`, `Medal`
- `Users`, `User`, `UserCheck`
- `Clock`, `Calendar`, `Timer`
- `Video`, `Play`, `Camera`
- `FileCheck`, `FileText`, `File`

**Learning**
- `GraduationCap`, `School`, `Library`
- `Brain`, `Lightbulb`, `Sparkles`
- `Target`, `TrendingUp`, `BarChart`
- `CheckCircle`, `Check`, `Verified`

**Spiritual**
- `Heart`, `Star`, `Sun`, `Moon`
- `Flame`, `Zap`, `Sparkle`
- `Eye`, `Compass`, `Map`
- `Infinity`, `Circle`, `Hexagon`

**Technical**
- `Download`, `Upload`, `Share`
- `MessageCircle`, `Mail`, `Bell`
- `Lock`, `Unlock`, `Shield`
- `Settings`, `Tool`, `Wrench`

See full list: https://lucide.dev/icons/

---

## 🔧 Customization Options

### Hero Section
```typescript
<HeroTemplate
  metadata={courseData.metadata}
  stats={courseData.stats}
  enrollmentLink={courseData.enrollment.checkoutLink}
  backgroundImage="/path/to/image.jpg" // Optional
  showStats={true} // Optional, default true
  ctaText="Custom CTA Text" // Optional
/>
```

### Highlights Grid
```typescript
<HighlightsTemplate
  highlights={courseData.highlights}
  columns={3} // 2, 3, or 4
  animate={true} // Optional
  className="custom-class" // Optional
/>
```

### Syllabus Accordion
```typescript
<SyllabusTemplate
  syllabus={courseData.syllabus}
  defaultOpen={[0, 1]} // Indices of modules to open by default
  allowMultiple={false} // Allow multiple open at once
/>
```

### Testimonials
```typescript
<TestimonialsTemplate
  testimonials={courseData.testimonials}
  maxDisplay={6} // How many to show
  showRatings={true} // Show star ratings
  carousel={false} // Make it a carousel (future)
/>
```

---

## ✅ Quality Checklist

Before deploying your new course page:

- [ ] All required fields in courseData.ts filled
- [ ] 6 highlights with appropriate icons
- [ ] 4-6 syllabus modules with topics
- [ ] 6 learning outcomes defined
- [ ] 6 testimonials included
- [ ] 8 FAQs covering common questions
- [ ] Correct theme selected
- [ ] Enrollment link working
- [ ] Images optimized and loaded
- [ ] No linting errors (`npm run lint`)
- [ ] Builds successfully (`npm run build`)
- [ ] Mobile responsive (test at 320px, 768px, 1920px)
- [ ] All CTAs functional
- [ ] Content proofread for typos
- [ ] Pricing accurate

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module '../_shared/components'"
**Solution**: Ensure you're importing from the correct path:
```typescript
import { CourseButton } from '../_shared/components';
```

### Issue: "Type error in courseData.ts"
**Solution**: Check that all fields match the CourseContent interface. Run TypeScript check:
```bash
npx tsc --noEmit
```

### Issue: "Theme colors not applying"
**Solution**: Verify you're using one of the 5 valid theme names:
- `philosophy`
- `upanishad`
- `sanskrit`
- `practical`
- `advanced`

### Issue: "Icons not showing"
**Solution**: Import icons from lucide-react:
```typescript
import { BookOpen, Award, Users } from 'lucide-react';
```

### Issue: "Styles not loading"
**Solution**: Ensure you're importing the shared CSS:
```typescript
import '../_shared/course-landing.css';
```

---

## 📚 Reference

### File Locations
- **Shared Components**: `/app/courses/_shared/components/`
- **Section Templates**: `/app/courses/_shared/sections/`
- **Design System**: `/app/courses/_shared/course-landing.css`
- **Type Definitions**: `/app/courses/_shared/types/course.types.ts`
- **Layout**: `/app/courses/_shared/layouts/CourseLayout.tsx`

### Documentation
- **Full Revamp Summary**: `COURSE_REVAMP_COMPLETE.md`
- **QA Checklist**: `QA_CHECKLIST.md`
- **Automated QA Report**: `AUTOMATED_QA_REPORT.md`
- **Project Summary**: `PROJECT_COMPLETION_SUMMARY.md`

### Examples
Look at any of the 10 completed courses for reference:
- `/app/courses/yoga-darshan/`
- `/app/courses/sanskrit-course/`
- `/app/courses/chanakya-code/`
- etc.

---

## 💡 Pro Tips

1. **Copy & Modify**: Start with a similar existing course and modify the data
2. **Consistent Structure**: Follow the same section order for familiarity
3. **Icon Variety**: Use different icons for each highlight for visual interest
4. **Benefit-Focused**: Frame content in terms of student benefits, not features
5. **Social Proof**: Include testimonials from different student types
6. **FAQ Strategy**: Address objections progressively from easy to hard
7. **CTA Placement**: Multiple CTAs work better (hero, mid-page, footer)
8. **Mobile First**: Always test on mobile viewport first

---

## 🚀 You're Ready!

With this template system, creating a new course landing page is:
- ✅ **Fast**: ~15 minutes
- ✅ **Easy**: Copy and modify
- ✅ **Consistent**: Uses shared design system
- ✅ **Professional**: Premium UI/UX
- ✅ **Scalable**: Works for any course type

**Happy course creation! 🎉**

---

*Quick Start Guide v1.0*  
*Last Updated: October 12, 2025*  
*Shikshanam Course Landing Pages*

