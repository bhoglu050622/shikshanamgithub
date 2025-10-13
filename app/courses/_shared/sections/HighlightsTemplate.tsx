'use client';

import { BookOpen, Users, Award, Clock, Video, FileCheck } from 'lucide-react';
import { CourseHighlight } from '../types/course.types';
import { CourseSectionHeader, CourseFeatureGrid } from '../components';

// Icon mapping
const iconMap: Record<string, any> = {
  BookOpen,
  Users,
  Award,
  Clock,
  Video,
  FileCheck,
};

interface HighlightsTemplateProps {
  highlights: CourseHighlight[];
  title?: string;
  subtitle?: string;
  description?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function HighlightsTemplate({
  highlights,
  title = 'Course Highlights',
  subtitle = 'What Makes This Special',
  description = 'Discover the unique features and benefits of this comprehensive course',
  columns = 3,
  className = '',
}: HighlightsTemplateProps) {
  // Map highlights to features with actual icon components
  const features = highlights.map((highlight) => ({
    icon: iconMap[highlight.icon] || BookOpen,
    title: highlight.title,
    description: highlight.description,
  }));

  return (
    <section className={`course-section ${className}`}>
      <div className="course-container">
        <CourseSectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          centered={true}
        />
        <CourseFeatureGrid features={features} columns={columns} />
      </div>
    </section>
  );
}

