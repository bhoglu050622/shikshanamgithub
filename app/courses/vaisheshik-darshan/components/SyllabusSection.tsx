'use client';
import { motion } from 'framer-motion';
import { Circle, ArrowRight } from 'lucide-react';

export default function SyllabusSection() {
  const modules = [
    {
      number: "01",
      title: "Introduction to Kanada & Vaisheshika",
      description: "Understanding the historical context and foundational concepts of Vaisheshika philosophy",
      topics: ["Maharshi Kanada", "Vaisheshika Sutras", "Philosophical Context"]
    },
    {
      number: "02", 
      title: "Paramāṇu Theory - Atomic Reality",
      description: "Deep dive into the concept of indivisible atoms and their role in reality",
      topics: ["Indivisible Atoms", "Atomic Structure", "Material Reality"]
    },
    {
      number: "03",
      title: "Six Category Framework",
      description: "Exploring the fundamental categories that structure all existence",
      topics: ["Dravya (Substance)", "Guṇa (Quality)", "Karma (Action)"]
    },
    {
      number: "04",
      title: "Additional Categories & Abhāva",
      description: "Understanding the remaining categories including the concept of absence",
      topics: ["Sāmānya (Generality)", "Viśeṣa (Particularity)", "Samavāya (Inherence)", "Abhāva (Absence)"]
    },
    {
      number: "05",
      title: "Perception & Inference",
      description: "Mastering the two valid means of knowledge in Vaisheshika epistemology",
      topics: ["Pratyakṣa (Perception)", "Anumāna (Inference)", "Valid Knowledge"]
    },
    {
      number: "06",
      title: "Logic & Reasoning",
      description: "Understanding logical structures and analytical thinking in Vaisheshika",
      topics: ["Logical Analysis", "Reasoning Patterns", "Philosophical Rigor"]
    },
    {
      number: "07",
      title: "Realism & Metaphysics",
      description: "Exploring the realistic approach to understanding the nature of reality",
      topics: ["Metaphysical Principles", "Realistic Worldview", "Material Philosophy"]
    },
    {
      number: "08",
      title: "Modern Applications",
      description: "Connecting ancient Vaisheshika wisdom with contemporary science and thought",
      topics: ["Science Parallels", "Modern Physics", "Analytical Thinking"]
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
        Course Journey — From Atoms to Categories
      </h2>
      <p className="vaisheshik-subheading text-xl mb-12 max-w-3xl mx-auto">
        A systematic exploration of Vaisheshika philosophy, from atomic theory to logical analysis. 
        Each module builds upon the previous one, creating a comprehensive understanding of reality's structure.
      </p>

      <div className="vaisheshik-timeline max-w-4xl mx-auto">
        {modules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="vaisheshik-timeline-item"
          >
            <div className="vaisheshik-card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-vaisheshik-primary to-vaisheshik-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {module.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="vaisheshik-heading text-2xl mb-2">{module.title}</h3>
                  <p className="vaisheshik-subheading text-gray-600 mb-4">{module.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-3 py-1 bg-vaisheshik-light text-vaisheshik-primary rounded-full text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                {index < modules.length - 1 && (
                  <div className="flex-shrink-0 mt-8">
                    <ArrowRight className="w-6 h-6 text-vaisheshik-secondary" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
