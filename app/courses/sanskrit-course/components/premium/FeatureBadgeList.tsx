'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FeatureBadge {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

interface FeatureBadgeListProps {
  features: FeatureBadge[];
}

export default function FeatureBadgeList({ features }: FeatureBadgeListProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[var(--gold-sanskrit)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[var(--accent-sanskrit)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 md:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="card-sanskrit-glass p-4 md:p-6 text-center h-full flex flex-col items-center justify-center gap-3 cursor-pointer">
                <motion.div
                  className="text-[var(--accent-sanskrit)]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base text-[var(--text-primary-sanskrit)] leading-snug">
                    {feature.title}
                  </h3>
                  {feature.description && (
                    <p className="text-xs text-[var(--text-muted-sanskrit)] mt-1">
                      {feature.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

