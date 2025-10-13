'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, MessageCircle, Users, CheckCircle, Video, FileText, Calendar, Gift } from 'lucide-react';
import { advaitaVedantaCourseData } from '../../courseData';
import { featureChipsVariants, featureChipVariants, safeVariants } from '../../motion.config';

const featureIcons: Record<string, React.ElementType> = {
  'All 46 Shlokas Covered': BookOpen,
  '7+ Hrs. of Content': Clock,
  'Quizzes & Notes': FileText,
  'Certification': Award,
  '1 Yr Access': Calendar,
  'WhatsApp Group': MessageCircle,
  'Community Access': Users,
  'Live QnA': Video,
  'Free Future Updates': Gift
};

export default function FeatureChips() {
  const { metadata } = advaitaVedantaCourseData;

  return (
    <section className="advaita-feature-chips">
      <motion.div 
        className="advaita-feature-chips-container"
        variants={safeVariants(featureChipsVariants)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {metadata.features.map((feature, index) => {
          const IconComponent = featureIcons[feature] || CheckCircle;
          
          return (
            <motion.div
              key={index}
              className="advaita-feature-chip"
              variants={featureChipVariants}
            >
              <IconComponent />
              <span className="advaita-feature-chip-text">{feature}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}


