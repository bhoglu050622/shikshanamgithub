'use client';

import { MotionDiv } from '@/components/motion/MotionWrapper';
import { Clock, Award, BookOpen, MessageCircle, Users, Video, FileCheck, Gift } from 'lucide-react';
import { prashnaUpanishadCourseData } from '../../courseData';
import { chipVariants, staggerContainer, safeVariants } from '../../motion.config';

const featureIcons: Record<string, any> = {
  'Recorded Sessions': Video,
  'Certification': Award,
  '7+ Hrs of Content': Clock,
  'All Questions Covered': BookOpen,
  'Free Future Updates': Gift,
  '1 yr Access': Clock,
  'Quizzes & Notes': FileCheck,
  'WhatsApp Group': MessageCircle,
  'Community Access': Users,
  'Live QnA': Video
};

export default function FeatureChips() {
  const { metadata } = prashnaUpanishadCourseData;

  return (
    <section className="prashna-feature-chips bg-white border-y border-gray-100">
      <MotionDiv
        className="prashna-chips-container"
        variants={safeVariants(staggerContainer)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {metadata.features.map((feature, index) => {
          const IconComponent = featureIcons[feature] || BookOpen;
          return (
            <MotionDiv
              key={index}
              className="prashna-chip"
              variants={chipVariants}
            >
              <IconComponent className="w-5 h-5 text-[#D97B2A]" />
              <span>{feature}</span>
            </MotionDiv>
          );
        })}
      </MotionDiv>
    </section>
  );
}

