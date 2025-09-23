'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BlogImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function BlogImage({ 
  src, 
  alt, 
  fill = false, 
  sizes, 
  className = '', 
  width, 
  height 
}: BlogImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (!hasError) {
      // Use a data URL for placeholder instead of file path
      setImageSrc('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJsb2cgSW1hZ2U8L3RleHQ+PC9zdmc+');
      setHasError(true);
      setIsLoading(false);
      console.log(`Image failed to load: ${src}, using fallback`);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (fill) {
    return (
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-blog-primary-100 animate-pulse rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blog-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes={sizes}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-blog-primary-100 animate-pulse rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blog-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}
