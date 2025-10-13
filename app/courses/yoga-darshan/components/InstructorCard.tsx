'use client';

import { motion } from 'framer-motion';
import { Twitter, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { fadeInUp, scaleIn } from '../motion.config';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

interface InstructorCardProps {
  name: string;
  title: string;
  bio: string;
  experience: string;
  specialization: string[];
  photo: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  featuredIn?: Array<{ name: string; logo: string }>;
}

export default function InstructorCard({
  name,
  title,
  bio,
  experience,
  specialization,
  photo,
  social,
  featuredIn,
}: InstructorCardProps) {
  const { ref, isVisible } = useRevealOnScroll();
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <>
      <section ref={ref} className="yoga-section bg-gradient-to-b from-[var(--yoga-bg)] to-white">
        <div className="yoga-container">
          <motion.div
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-[var(--yoga-border-light)] overflow-hidden">
              <div className="grid md:grid-cols-5 gap-8 p-8 md:p-12">
                {/* Left: Photo */}
                <motion.div
                  variants={scaleIn}
                  className="md:col-span-2 flex flex-col items-center md:items-start"
                >
                  <div className="relative w-48 h-48 mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--yoga-primary)] to-[var(--yoga-accent)] opacity-20 blur-xl" />
                    <img
                      src={photo}
                      alt={name}
                      className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/instructors/placeholder.jpg';
                      }}
                    />
                  </div>

                  {/* Social Links */}
                  {social && (
                    <div className="flex gap-3">
                      {social.twitter && (
                        <a
                          href={social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-[var(--yoga-bg)] hover:bg-[var(--yoga-primary)] hover:text-white transition-colors duration-200"
                          aria-label="Twitter"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {social.linkedin && (
                        <a
                          href={social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-[var(--yoga-bg)] hover:bg-[var(--yoga-primary)] hover:text-white transition-colors duration-200"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {social.youtube && (
                        <a
                          href={social.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-[var(--yoga-bg)] hover:bg-[var(--yoga-primary)] hover:text-white transition-colors duration-200"
                          aria-label="YouTube"
                        >
                          <Youtube className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Right: Info */}
                <div className="md:col-span-3">
                  <span className="inline-block px-3 py-1 bg-[var(--yoga-accent)]/10 text-[var(--yoga-accent)] text-sm font-semibold rounded-full mb-3">
                    Your Instructor
                  </span>
                  
                  <h2 className="yoga-heading-2 text-[var(--yoga-primary)] mb-2">
                    {name}
                  </h2>
                  
                  <p className="text-lg text-[var(--yoga-accent)] font-semibold mb-4">
                    {title}
                  </p>

                  <p className="yoga-body text-[var(--yoga-text-secondary)] mb-6 leading-relaxed">
                    {bio}
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-[var(--yoga-text-primary)] mb-2">
                      Experience:
                    </p>
                    <p className="text-sm text-[var(--yoga-text-secondary)]">{experience}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-[var(--yoga-text-primary)] mb-3">
                      Specialization:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {specialization.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[var(--yoga-primary)]/10 text-[var(--yoga-primary)] text-sm rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFullBio(true)}
                    className="inline-flex items-center gap-2 text-[var(--yoga-accent)] hover:text-[var(--yoga-accent-dark)] font-semibold transition-colors duration-200"
                  >
                    <span>Read Full Bio</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Featured In Section */}
              {featuredIn && featuredIn.length > 0 && (
                <div className="px-8 md:px-12 pb-8 md:pb-12 border-t border-[var(--yoga-border-light)] pt-8">
                  <p className="text-sm font-semibold text-[var(--yoga-text-primary)] text-center mb-6">
                    Featured In:
                  </p>
                  <div className="grid grid-cols-3 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    {featuredIn.map((media, index) => (
                      <div key={index} className="h-12 flex items-center">
                        <img
                          src={media.logo}
                          alt={media.name}
                          className="max-h-full w-auto object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full Bio Modal */}
      <Dialog open={showFullBio} onOpenChange={setShowFullBio}>
        <DialogContent className="max-w-2xl">
          <DialogTitle className="yoga-heading-3 text-[var(--yoga-primary)] mb-4">
            About {name}
          </DialogTitle>
          <div className="space-y-4 text-[var(--yoga-text-secondary)]">
            <p className="yoga-body leading-relaxed">{bio}</p>
            <p className="yoga-body leading-relaxed">
              With {experience}, {name.split(' ')[0]} has dedicated their life to making ancient Indian wisdom 
              accessible to modern seekers. Their unique approach combines traditional scholarship with 
              contemporary teaching methods, making complex philosophical concepts easy to understand 
              and apply in daily life.
            </p>
            <div className="pt-4">
              <h4 className="font-semibold text-[var(--yoga-text-primary)] mb-2">Areas of Expertise:</h4>
              <ul className="list-disc list-inside space-y-1">
                {specialization.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

