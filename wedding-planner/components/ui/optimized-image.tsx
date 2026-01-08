'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  fill = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quality = 85,
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const placeholderSrc = '/images/misc/placeholder.webp';

  return (
    <div className={'overflow-hidden ' + className}>
      <Image
        src={hasError ? placeholderSrc : src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={
          'duration-700 ease-in-out ' +
          (isLoading ? 'scale-105 blur-lg grayscale' : 'scale-100 blur-0 grayscale-0') +
          (fill ? ' object-cover' : '')
        }
        onLoad={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}

interface GalleryImageProps {
  basePath: string;
  imageName: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function GalleryImage({
  basePath,
  imageName,
  alt,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: GalleryImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const avifSrc = basePath + '/' + imageName + '-hero.avif';
  const thumbSrc = basePath + '/' + imageName + '-thumb.webp 400w';
  const mdSrc = basePath + '/' + imageName + '-md.webp 800w';
  const lgSrc = basePath + '/' + imageName + '-lg.webp 1200w';
  const heroSrc = basePath + '/' + imageName + '-hero.webp 1920w';
  const fallbackSrc = basePath + '/' + imageName + '-lg.webp';

  return (
    <picture className={'block overflow-hidden ' + className}>
      <source type="image/avif" srcSet={avifSrc} media="(min-width: 1200px)" />
      <source
        type="image/webp"
        srcSet={thumbSrc + ', ' + mdSrc + ', ' + lgSrc + ', ' + heroSrc}
        sizes={sizes}
      />
      <img
        src={fallbackSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={'w-full h-full object-cover transition-all duration-500 ' + (isLoading ? 'opacity-0' : 'opacity-100')}
        onLoad={() => setIsLoading(false)}
      />
    </picture>
  );
}

export default OptimizedImage;
