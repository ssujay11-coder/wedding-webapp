/**
 * Blur placeholder utility for venue images.
 * Provides instant visual feedback during image loading.
 */

import blurData from '@/data/venues/blur-data.json';

type BlurDataEntry = {
  blur: string;
  width: number;
  height: number;
};

type BlurDataMap = Record<string, BlurDataEntry>;

const blurPlaceholders: BlurDataMap = blurData as BlurDataMap;

// Default blur placeholder for images without specific blur data
const DEFAULT_BLUR = 'data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAACwAwCdASoUAA0APrVIn0mnJCKhMAgA4BaJYwCdABZ1XdczGSeQAAD+dB0l6fRwjEp5NU/89g1qqZFeq3IagL0SrrzwQWAAAAA=';

/**
 * Get blur placeholder for an image path.
 * @param imagePath - The image path (e.g., "/images/venues/taj-lake-palace/hero.webp")
 * @returns Base64 blur data URL or default blur
 */
export function getBlurPlaceholder(imagePath: string): string {
  const entry = blurPlaceholders[imagePath];
  return entry?.blur || DEFAULT_BLUR;
}

/**
 * Get blur placeholder with dimensions.
 * @param imagePath - The image path
 * @returns Object with blur data URL and dimensions
 */
export function getBlurPlaceholderWithDimensions(imagePath: string): {
  blur: string;
  width: number;
  height: number;
} {
  const entry = blurPlaceholders[imagePath];
  if (entry) {
    return {
      blur: entry.blur,
      width: entry.width,
      height: entry.height,
    };
  }
  return {
    blur: DEFAULT_BLUR,
    width: 1200,
    height: 800,
  };
}

/**
 * Check if blur placeholder exists for an image.
 * @param imagePath - The image path
 * @returns Boolean indicating if blur data exists
 */
export function hasBlurPlaceholder(imagePath: string): boolean {
  return imagePath in blurPlaceholders;
}

/**
 * Get all venue image paths that have blur placeholders.
 * @returns Array of image paths
 */
export function getBlurPlaceholderPaths(): string[] {
  return Object.keys(blurPlaceholders);
}
