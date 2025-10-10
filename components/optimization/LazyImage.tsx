/**
 * Lazy Image Component
 * Optimized image component with lazy loading and progressive enhancement
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { LazyImageLoader } from '@/lib/lazy-loading';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  errorImage?: string;
  fadeIn?: boolean;
  fadeInDuration?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  errorImage,
  fadeIn = true,
  fadeInDuration = 300,
  priority = false,
  sizes,
  quality = 75,
  loading = 'lazy',
  onLoad,
  onError
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const loaderRef = useRef<LazyImageLoader | null>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    if (imgRef.current && !loaderRef.current) {
      loaderRef.current = new LazyImageLoader({
        placeholder,
        errorImage,
        fadeIn,
        fadeInDuration,
        threshold: 0.1,
        rootMargin: '50px'
      });

      loaderRef.current.observe(imgRef.current);
    }

    const currentImgRef = imgRef.current;

    return () => {
      if (loaderRef.current && currentImgRef) {
        loaderRef.current.unobserve(currentImgRef);
      }
    };
  }, [priority, placeholder, errorImage, fadeIn, fadeInDuration]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const imageSrc = isInView ? src : placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=';
  const finalSrc = hasError ? (errorImage || imageSrc) : imageSrc;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        ref={imgRef}
        src={finalSrc}
        alt={alt}
        width={width || 0}
        height={height || 0}
        sizes={sizes}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          w-full h-full object-cover transition-opacity duration-${fadeInDuration}
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${hasError ? 'grayscale' : ''}
        `}
        style={{
          transition: fadeIn ? `opacity ${fadeInDuration}ms ease-in-out` : 'none'
        }}
      />
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {/* Error indicator */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm">Failed to load</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Optimized Image with Next.js Image component fallback
 */
export function OptimizedImage(props: LazyImageProps) {
  // Check if Next.js Image component is available
  if (typeof window !== 'undefined' && 'next/image' in window) {
    // Use Next.js Image component for better optimization
    const NextImage = require('next/image').default;
    return <NextImage {...props} />;
  }

  // Fallback to LazyImage
  return <LazyImage {...props} />;
}

/**
 * Responsive Image Component
 */
interface ResponsiveImageProps extends LazyImageProps {
  breakpoints?: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export function ResponsiveImage({
  breakpoints,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: ResponsiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState(props.src);

  useEffect(() => {
    if (!breakpoints) return;

    const updateSrc = () => {
      const width = window.innerWidth;
      let newSrc = props.src;

      if (width < 768) {
        newSrc = breakpoints.mobile || props.src;
      } else if (width < 1200) {
        newSrc = breakpoints.tablet || props.src;
      } else {
        newSrc = breakpoints.desktop || props.src;
      }

      setCurrentSrc(newSrc);
    };

    updateSrc();
    window.addEventListener('resize', updateSrc);
    return () => window.removeEventListener('resize', updateSrc);
  }, [breakpoints, props.src]);

  return (
    <LazyImage
      {...props}
      src={currentSrc}
      sizes={sizes}
    />
  );
}
