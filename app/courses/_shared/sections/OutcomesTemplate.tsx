'use client';

import { Target, TrendingUp } from 'lucide-react';
import { CourseOutcome } from '../types/course.types';
import { CourseSectionHeader, CourseTimeline } from '../components';

interface OutcomesTemplateProps {
  outcomes: CourseOutcome[];
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export default function OutcomesTemplate({
  outcomes,
  title = 'Learning Outcomes',
  subtitle = 'What You\'ll Achieve',
  description = 'Transform your knowledge and skills with these concrete learning outcomes',
  className = '',
}: OutcomesTemplateProps) {
  // Transform outcomes to timeline items
  const timelineItems = outcomes.map((outcome, index) => ({
    title: outcome.title,
    description: outcome.description,
    badge: `Outcome ${index + 1}`,
  }));

  return (
    <section className={`course-section bg-white ${className}`}>
      <div className="course-container">
        <CourseSectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          icon={Target}
          centered={true}
        />
        <div className="max-w-4xl mx-auto">
          <CourseTimeline items={timelineItems} />
        </div>
      </div>
    </section>
  );
}

