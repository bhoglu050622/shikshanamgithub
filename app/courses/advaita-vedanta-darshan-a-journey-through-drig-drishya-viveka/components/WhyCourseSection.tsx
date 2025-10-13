'use client';
import { motion } from 'framer-motion';
import { BookOpen, Eye, Lightbulb, Users } from 'lucide-react';

export default function WhyCourseSection() {
  const reasons = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "जीवन का वास्तविक लक्ष्य क्या है?",
      description: "Understand the true purpose of life through the lens of Advaita Vedanta philosophy."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "क्या ये संसार सच में मिथ्या है?",
      description: "Explore whether this world is truly an illusion and what that means for your daily life."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "अद्वैत वेदान्त से जीवन कैसे जिया जाए?",
      description: "Learn practical ways to live life guided by the principles of non-duality."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "मैं और ये संसार एक कैसे हो सकते हैं?",
      description: "Discover how you and the world are fundamentally one in the non-dual reality."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="advaita-heading text-4xl mb-4">
        What questions you might be seeking to answer
      </h2>
      <p className="advaita-subheading text-xl mb-12 max-w-3xl mx-auto">
        तो आज ही जुड़ें वेदान्त [उपनिषदों] के अद्वैत दर्शन से! Thousands of students, homemakers, seekers have adopted this Shikshanam offering.
      </p>

      <div className="advaita-grid advaita-grid-2">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="advaita-card text-center"
          >
            <div className="advaita-icon mx-auto">
              {reason.icon}
            </div>
            <h3 className="advaita-heading text-xl mb-3">{reason.title}</h3>
            <p className="advaita-subheading text-gray-600">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
