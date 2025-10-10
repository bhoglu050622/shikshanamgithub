/**
 * Mobile Optimized Image Component
 * Responsive image component with mobile-specific optimizations
 * Enhanced for better performance across all device sizes
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { DeviceInfo } from '@/lib/mobile/types';
import { detectDevice, getNetworkInfo, isSlowConnection } from '@/lib/mobile/device-detection';

// ============================================================================
// MOBILE OPTIMIZED IMAGE COMPONENT
// ============================================================================

interface MobileOptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  lazy?: boolean;
  responsive?: boolean;
}

export function MobileOptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+',
  sizes = "(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 33vw",
  className = '',
  style,
  onLoad,
  onError,
  fallbackSrc,
  lazy = true,
  responsive = true,
}: MobileOptimizedImageProps) {
  // Enhanced image loading with device-aware optimizations
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [networkInfo, setNetworkInfo] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const imgRef = useRef<HTMLDivElement>(null);

  // Detect device and network on mount
  useEffect(() => {
    setDeviceInfo(detectDevice());
    setNetworkInfo(getNetworkInfo());
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !imgRef.current) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [lazy]);

  // Optimize image source based on device and network
  useEffect(() => {
    if (!deviceInfo || !networkInfo) return;

    let optimizedSrc = src;
    let adjustedQuality = quality;

    // Adjust quality based on network speed
    if (isSlowConnection()) {
      adjustedQuality = Math.min(adjustedQuality, 50);
    }

    // Adjust quality based on device pixel ratio
    if (deviceInfo.devicePixelRatio > 2) {
      adjustedQuality = Math.min(adjustedQuality + 10, 90);
    }

    // Use WebP format if supported
    if (deviceInfo.browser === 'chrome' || deviceInfo.browser === 'firefox') {
      // In a real implementation, you would modify the src to use WebP
      // optimizedSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }

    setOptimizedSrc(optimizedSrc);
  }, [deviceInfo, networkInfo, src, quality]);

  // Handle successful image load with performance tracking
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
    
    // Report image load performance if supported
    if (typeof window !== 'undefined' && 'performance' in window) {
      const loadTime = performance.now();
      console.debug(`Image loaded: ${alt || 'image'} in ${Math.round(loadTime)}ms`);
    }
  };

  // Handle image load error with fallback
  const handleError = () => {
    setHasError(true);
    if (fallbackSrc && optimizedSrc !== fallbackSrc) {
      setOptimizedSrc(fallbackSrc);
    }
    onError?.();
  };

  const getOptimizedSizes = (): string => {
    if (sizes) return sizes;

    if (responsive && deviceInfo) {
      if (deviceInfo.isMobile) {
        return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
      } else if (deviceInfo.isTablet) {
        return '(max-width: 1200px) 50vw, 33vw';
      } else {
        return '(max-width: 1200px) 50vw, 25vw';
      }
    }

    return '100vw';
  };

  const getOptimizedQuality = (): number => {
    if (!deviceInfo || !networkInfo) return quality;

    let optimizedQuality = quality;

    // Reduce quality for slow connections
    if (isSlowConnection()) {
      optimizedQuality = Math.min(quality, 50);
    }

    // Increase quality for high-DPI displays
    if (deviceInfo.devicePixelRatio > 2) {
      optimizedQuality = Math.min(quality + 10, 90);
    }

    // Reduce quality for data saver mode
    if (networkInfo.saveData) {
      optimizedQuality = Math.min(quality, 60);
    }

    return optimizedQuality;
  };

  if (!isInView && lazy) {
    return (
      <div
        ref={imgRef}
        className={`mobile-image-placeholder ${className}`}
        style={{
          width: width || '100%',
          height: height || '200px',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
      >
        <div className="mobile-image-loading">
          <div className="loading-spinner" />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`relative ${className}`} 
      style={{
        ...style,
        aspectRatio: width && height ? `${width}/${height}` : 'auto',
      }}
    >
      {!hasError ? (
        <Image
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={getOptimizedQuality()}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={getOptimizedSizes()}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            maxWidth: '100%',
            height: 'auto',
            objectFit: responsive ? 'cover' : 'contain',
          }}
        />
      ) : fallbackSrc ? (
        <Image
          src={fallbackSrc}
          alt={`${alt} (fallback)`}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
          Image not available
        </div>
      )}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
}

// ============================================================================
// RESPONSIVE IMAGE GALLERY
// ============================================================================

interface ResponsiveImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  columns?: number;
  gap?: number;
  className?: string;
}

export function ResponsiveImageGallery({
  images,
  columns = 2,
  gap = 16,
  className = '',
}: ResponsiveImageGalleryProps) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    setDeviceInfo(detectDevice());
  }, []);

  const getResponsiveColumns = (): number => {
    if (!deviceInfo) return columns;

    if (deviceInfo.isMobile) {
      return 1;
    } else if (deviceInfo.isTablet) {
      return 2;
    } else {
      return columns;
    }
  };

  const responsiveColumns = getResponsiveColumns();

  return (
    <div
      className={`responsive-image-gallery ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${responsiveColumns}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          <MobileOptimizedImage
            src={image.src}
            alt={image.alt}
            width={400}
            height={300}
            quality={80}
            lazy={true}
            responsive={true}
            className="gallery-image"
          />
          {image.caption && (
            <div className="gallery-caption">
              {image.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// LAZY LOADING IMAGE
// ============================================================================

interface LazyLoadingImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  placeholder?: string;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export function LazyLoadingImage({
  src,
  alt,
  width = 400,
  height = 300,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+',
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
}: LazyLoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={imgRef}
      className={`lazy-loading-image ${className}`}
      style={{
        width: width,
        height: height,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f3f4f6',
      }}
    >
      {isInView ? (
        <MobileOptimizedImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setIsLoaded(true)}
          className="lazy-image"
        />
      ) : (
        <div
          className="lazy-placeholder"
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
    </div>
  );
}
