'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('react-lottie-player'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-[var(--yoga-primary)]/10 to-[var(--yoga-accent)]/5" />
});

export default function MeditativeBackground() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);

    // Lazy load after critical content
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // SVG Fallback for reduced motion or if Lottie fails to load
  if (prefersReducedMotion || !shouldLoad) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="yoga-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill="currentColor" className="text-[var(--yoga-primary)]" />
              <circle cx="75" cy="75" r="2" fill="currentColor" className="text-[var(--yoga-accent)]" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#yoga-pattern)" />
        </svg>
      </div>
    );
  }

  // Note: Lottie JSON file should be provided by content owner
  // Placeholder path: /assets/animations/yoga-glyphs.json
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <Lottie
        loop
        play
        path="/assets/animations/yoga-glyphs.json"
        style={{ width: '100%', height: '100%' }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
      />
    </div>
  );
}

