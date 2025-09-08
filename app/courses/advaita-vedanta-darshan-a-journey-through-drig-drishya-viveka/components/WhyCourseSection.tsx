'use client';
import { motion } from 'framer-motion';
import { BookOpen, Eye, Lightbulb, Users } from 'lucide-react';

export default function WhyCourseSection() {
  const reasons = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "46 Revealing Shlokas",
      description: "Dive deep into the core Advaita Vedanta text that explores the fundamental relationship between consciousness and the world."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Clear Hindi Insights",
      description: "Master the teachings through clear, practical Hindi explanations by Vishal Chaurasia, making complex concepts accessible."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Unity in Diversity",
      description: "Understand how the apparent diversity of the world is unified in the non-dual essence of Brahman."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Transformational Wisdom",
      description: "Blend of philosophy and clarity for both seekers and curious minds, offering practical insights for daily life."
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
        क्यों पढ़ें 'दृग–दृश्य विवेक'?
      </h2>
      <p className="advaita-subheading text-xl mb-12 max-w-3xl mx-auto">
        Drig-Drishya Viveka offers profound insights into the nature of reality and consciousness. 
        Learn the foundational principles of non-duality that have guided seekers for centuries.
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
