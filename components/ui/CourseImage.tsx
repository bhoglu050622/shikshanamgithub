'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface CourseImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string;
  fallback?: string;
  alt: string;
}

export function CourseImage({ 
  src, 
  fallback = '/assets/comics/basics.svg', 
  alt,
  ...props 
}: CourseImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error && fallback && imgSrc !== fallback) {
      setError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}

