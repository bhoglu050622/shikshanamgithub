'use client';
import { motion } from 'framer-motion';
import { Layers, Atom, Eye, Lightbulb } from 'lucide-react';

export default function WhyCourseSection() {
  const reasons = [
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Grasp Reality's Structure",
      description: "Understand the six fundamental categories (padārthas): dravya, guṇa, karma, sāmānya, viśeṣa, samavāya, and abhāva."
    },
    {
      icon: <Atom className="w-8 h-8" />,
      title: "Atomic Theory Mastery",
      description: "Learn how the world is built from indivisible atoms (paramāṇu) and understand the atomic structure of reality."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Perception & Inference",
      description: "Master the two valid means of knowledge (pramāṇas) - perception (pratyakṣa) and inference (anumāna)."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Philosophical Rigor",
      description: "Develop analytical thinking and logical reasoning skills through systematic study of Vaisheshika philosophy."
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
      <h2 className="vaisheshik-heading text-4xl mb-4">
        क्यों पढ़ें वैशेषिक दर्शन?
      </h2>
      <p className="vaisheshik-subheading text-xl mb-12 max-w-3xl mx-auto">
        Vaisheshika philosophy offers the most systematic approach to understanding the structure of reality. 
        Learn the foundational principles of atomic realism and logical analysis that have influenced Indian thought for millennia.
      </p>

      <div className="vaisheshik-grid vaisheshik-grid-2">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="vaisheshik-card text-center"
          >
            <div className="vaisheshik-icon mx-auto">
              {reason.icon}
            </div>
            <h3 className="vaisheshik-heading text-xl mb-3">{reason.title}</h3>
            <p className="vaisheshik-subheading text-gray-600">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
