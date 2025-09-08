'use client';
import { motion } from 'framer-motion';
import { Circle, ArrowRight } from 'lucide-react';

export default function SyllabusSection() {
  const modules = [
    {
      number: "01",
      title: "Introduction to Drig-Drishya Viveka",
      description: "Understanding the historical context and foundational concepts of this core Advaita text",
      topics: ["Text Overview", "Historical Context", "Philosophical Foundation"]
    },
    {
      number: "02", 
      title: "The Seer vs The Seen",
      description: "Exploring the fundamental distinction between consciousness (Drig) and the world (Drishya)",
      topics: ["Nature of Seer", "Nature of Seen", "Distinction Analysis"]
    },
    {
      number: "03",
      title: "Illusion & Clarity",
      description: "Understanding Maya and how the apparent world relates to ultimate reality",
      topics: ["Maya Concept", "Illusion vs Reality", "Clarity Principles"]
    },
    {
      number: "04",
      title: "Non-Dual Realization",
      description: "Deep dive into the unity of Brahman and the dissolution of apparent duality",
      topics: ["Brahman Unity", "Duality Dissolution", "Realization Process"]
    },
    {
      number: "05",
      title: "Verses 1-12: Foundation",
      description: "Detailed study of the opening verses establishing the basic framework",
      topics: ["Verse Analysis", "Conceptual Framework", "Practical Applications"]
    },
    {
      number: "06",
      title: "Verses 13-24: Deepening Understanding",
      description: "Exploring the middle section that deepens the understanding of non-duality",
      topics: ["Advanced Concepts", "Subtle Distinctions", "Meditative Insights"]
    },
    {
      number: "07",
      title: "Verses 25-36: Integration",
      description: "Understanding how to integrate the teachings into daily life and practice",
      topics: ["Daily Integration", "Practice Methods", "Life Application"]
    },
    {
      number: "08",
      title: "Verses 37-46: Culmination",
      description: "Final verses leading to complete understanding and realization",
      topics: ["Final Realization", "Complete Understanding", "Wisdom Integration"]
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
        Course Structure – From Verse 1 to 46
      </h2>
      <p className="advaita-subheading text-xl mb-12 max-w-3xl mx-auto">
        A systematic exploration of Drig-Drishya Viveka, from foundational concepts to complete realization. 
        Each module builds upon the previous one, creating a comprehensive understanding of non-duality.
      </p>

      <div className="advaita-timeline max-w-4xl mx-auto">
        {modules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="advaita-timeline-item"
          >
            <div className="advaita-card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-advaita-primary to-advaita-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {module.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="advaita-heading text-2xl mb-2">{module.title}</h3>
                  <p className="advaita-subheading text-gray-600 mb-4">{module.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-3 py-1 bg-advaita-light text-advaita-primary rounded-full text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                {index < modules.length - 1 && (
                  <div className="flex-shrink-0 mt-8">
                    <ArrowRight className="w-6 h-6 text-advaita-secondary" />
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
