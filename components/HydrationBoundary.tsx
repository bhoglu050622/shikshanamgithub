'use client';

import { useEffect, useState } from 'react';

interface HydrationBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * HydrationBoundary component to prevent hydration mismatches
 * by ensuring content only renders after hydration is complete
 */
export default function HydrationBoundary({ 
  children, 
  fallback = null 
}: HydrationBoundaryProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
