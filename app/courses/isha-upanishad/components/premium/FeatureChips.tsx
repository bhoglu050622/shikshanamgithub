'use client';

import { MotionDiv } from '@/components/motion/MotionWrapper';
import { Video, Clock, BookOpen, RefreshCw, FileText, Calendar, Award, MessageCircle, Users, Zap } from 'lucide-react';
import { ishaUpanishadCourseData } from '../../courseData';
import { featureChipsVariants, featureChipVariants, safeVariants } from '../../motion.config';
import { useInView } from 'react-intersection-observer';

const featureIcons: Record<string, React.ReactNode> = {
  'Recorded Sessions': <Video className="w-full h-full" />,
  '3+ Hrs of Content': <Clock className="w-full h-full" />,
  'All Shlokas Covered (18 Shlokas)': <BookOpen className="w-full h-full" />,
  'Free Future Updates': <RefreshCw className="w-full h-full" />,
  'Quizzes & Notes': <FileText className="w-full h-full" />,
  '1 yr Access': <Calendar className="w-full h-full" />,
  'Certification': <Award className="w-full h-full" />,
  'Whatsapp Group': <MessageCircle className="w-full h-full" />,
  'Live QnA': <Zap className="w-full h-full" />,
  'Community Access': <Users className="w-full h-full" />
};

const featureMicrocopy: Record<string, string> = {
  'Recorded Sessions': 'Learn at your pace',
  '3+ Hrs of Content': 'Comprehensive coverage',
  'All Shlokas Covered (18 Shlokas)': 'Complete upanishad',
  'Free Future Updates': 'Lifetime improvements',
  'Quizzes & Notes': 'Study materials included',
  '1 yr Access': 'Full year of learning',
  'Certification': 'Official certificate',
  'Whatsapp Group': 'Join the community',
  'Live QnA': 'Get your doubts cleared',
  'Community Access': 'Connect with learners'
};

export default function FeatureChips() {
  const { metadata } = ishaUpanishadCourseData;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="isha-features">
      <div className="isha-features-container">
        <MotionDiv
          ref={ref}
          className="isha-features-scroll"
          variants={safeVariants(featureChipsVariants)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {metadata.features.map((feature, index) => (
            <MotionDiv
              key={index}
              className="isha-feature-chip"
              variants={featureChipVariants}
            >
              <div className="isha-feature-chip-icon">
                {featureIcons[feature] || <Award className="w-full h-full" />}
              </div>
              <div className="isha-feature-chip-content">
                <h4>{feature}</h4>
                <p>{featureMicrocopy[feature] || 'Included in course'}</p>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}

