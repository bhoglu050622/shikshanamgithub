'use client';
import { motion } from 'framer-motion';
import { Circle, ArrowRight } from 'lucide-react';

export default function SyllabusSection() {
  const modules = [
    {
      number: "01",
      title: "Introduction to Samkhya",
      description: "Understanding the historical context and foundational concepts of Samkhya philosophy",
      topics: ["Historical Background", "Basic Principles", "Samkhya vs Other Schools"]
    },
    {
      number: "02", 
      title: "Purusha - The Pure Consciousness",
      description: "Deep dive into the concept of Purusha, the eternal, unchanging consciousness",
      topics: ["Nature of Purusha", "Purusha vs Atman", "Multiple Purushas"]
    },
    {
      number: "03",
      title: "Prakriti - The Material Cause",
      description: "Exploring Prakriti as the source of all material existence and change",
      topics: ["Prakriti as Material Cause", "Unmanifest vs Manifest", "Evolution of Prakriti"]
    },
    {
      number: "04",
      title: "The Three Gunas",
      description: "Understanding Sattva, Rajas, and Tamas - the three fundamental qualities",
      topics: ["Sattva - Purity & Light", "Rajas - Activity & Passion", "Tamas - Inertia & Darkness"]
    },
    {
      number: "05",
      title: "Satkaryavada - Theory of Causation",
      description: "Mastering the Samkhya theory that effects pre-exist in their causes",
      topics: ["Pre-existence of Effects", "Causal Relationships", "Practical Applications"]
    },
    {
      number: "06",
      title: "Evolution of the Universe",
      description: "Understanding how the universe evolves from Prakriti through the Gunas",
      topics: ["Mahat - Cosmic Intelligence", "Ahamkara - Ego Principle", "25 Tattvas"]
    },
    {
      number: "07",
      title: "Liberation (Moksha)",
      description: "The Samkhya path to liberation and freedom from suffering",
      topics: ["Nature of Liberation", "Discrimination (Viveka)", "Practical Steps"]
    },
    {
      number: "08",
      title: "Modern Applications",
      description: "Connecting ancient Samkhya wisdom with contemporary life and thought",
      topics: ["Psychology & Samkhya", "Modern Science Parallels", "Daily Life Integration"]
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
      <h2 className="samkhya-heading text-4xl mb-4">
        Course Journey — Principles of Samkhya Unveiled
      </h2>
      <p className="samkhya-subheading text-xl mb-12 max-w-3xl mx-auto">
        A systematic exploration of Samkhya philosophy, from basic concepts to advanced applications. 
        Each module builds upon the previous one, creating a comprehensive understanding.
      </p>

      <div className="samkhya-timeline max-w-4xl mx-auto">
        {modules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="samkhya-timeline-item"
          >
            <div className="samkhya-card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-samkhya-primary to-samkhya-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {module.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="samkhya-heading text-2xl mb-2">{module.title}</h3>
                  <p className="samkhya-subheading text-gray-600 mb-4">{module.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-3 py-1 bg-samkhya-light text-samkhya-primary rounded-full text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                {index < modules.length - 1 && (
                  <div className="flex-shrink-0 mt-8">
                    <ArrowRight className="w-6 h-6 text-samkhya-secondary" />
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
