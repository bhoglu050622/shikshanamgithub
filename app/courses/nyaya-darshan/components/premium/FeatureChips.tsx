'use client';

import { motion } from 'framer-motion';
import { BookOpen, Video, Calendar, Users, Award, Gift } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { featureChipsVariants, featureChipVariants, safeVariants } from '../../motion.config';

const features = [
  {
    icon: BookOpen,
    label: 'Quizzes & Notes'
  },
  {
    icon: Video,
    label: '40+ Sessions'
  },
  {
    icon: Calendar,
    label: '1 Year Access'
  },
  {
    icon: Users,
    label: 'Community Access'
  },
  {
    icon: Award,
    label: 'Certification'
  },
  {
    icon: Gift,
    label: 'Free Future Updates'
  }
];

export default function FeatureChips() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="nyaya-feature-chips" ref={ref}>
      <motion.div
        className="nyaya-feature-chips-container"
        variants={safeVariants(featureChipsVariants)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              className="nyaya-feature-chip"
              variants={featureChipVariants}
            >
              <Icon className="w-7 h-7" />
              <span>{feature.label}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

