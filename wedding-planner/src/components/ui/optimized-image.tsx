"use client";

import Image from "next/image";
import { useState } from "react";
import { getBlurPlaceholder } from "@/lib/blur-placeholders";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
}

// Simple blur placeholder for images without specific blur data
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#fdf2f8" offset="20%" />
      <stop stop-color="#fce7f3" offset="50%" />
      <stop stop-color="#fdf2f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#fdf2f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 75,
  placeholder = "blur",
  blurDataURL,
  objectFit = "cover",
  objectPosition = "center",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Generate default blur data URL if not provided
  const shimmerBlur = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`;

  // Try to get venue-specific blur placeholder, fall back to shimmer
  const resolvedBlurDataURL = blurDataURL || getBlurPlaceholder(src) || shimmerBlur;

  // Check if image is local (starts with /) or external
  const isLocal = src.startsWith("/");

  // For local WebP images, check if AVIF exists (Next.js handles this automatically)
  const imageSrc = isLocal && src.endsWith(".webp") ? src : src;

  const imageStyles: React.CSSProperties = {
    objectFit,
    objectPosition,
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {fill ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={resolvedBlurDataURL}
          className={`
            duration-700 ease-in-out
            ${isLoading ? "scale-105 blur-lg" : "scale-100 blur-0"}
          `}
          style={imageStyles}
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={resolvedBlurDataURL}
          className={`
            duration-700 ease-in-out
            ${isLoading ? "scale-105 blur-lg" : "scale-100 blur-0"}
          `}
          style={imageStyles}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}

// Hero-specific optimized image with better defaults
export function HeroImage({
  src,
  alt,
  className = "",
  priority = true,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="100vw"
      quality={80}
      className={className}
      objectFit="cover"
      objectPosition="center"
    />
  );
}

// Card image with aspect ratio
export function CardImage({
  src,
  alt,
  aspectRatio = "4/3",
  className = "",
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio }}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={70}
        objectFit="cover"
      />
    </div>
  );
}

// Avatar/testimonial image
export function AvatarImage({
  src,
  alt,
  size = 64,
  className = "",
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        quality={80}
        objectFit="cover"
      />
    </div>
  );
}
