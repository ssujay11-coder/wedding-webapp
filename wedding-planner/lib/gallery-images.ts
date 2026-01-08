/**
 * Gallery Image Utility for Elite Wedding Planner
 * 
 * Provides type-safe access to optimized gallery images
 * with responsive srcset support
 */

export type ImageCategory = 
  | 'couples'
  | 'venues'
  | 'decor'
  | 'ceremonies'
  | 'entertainment'
  | 'food'
  | 'guests'
  | 'portfolio';

export type ImageSize = 'thumb' | 'md' | 'lg' | 'hero';

export interface GalleryImage {
  src: string;
  srcSet: string;
  alt: string;
  category: ImageCategory;
  sizes: {
    thumb: string;
    md: string;
    lg: string;
    hero: string;
    avif?: string;
  };
}

/**
 * Get the base path for gallery images
 */
export function getGalleryBasePath(category: ImageCategory): string {
  return `/images/gallery/${category}`;
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(basePath: string, imageName: string): string {
  return [
    `${basePath}/${imageName}-thumb.webp 400w`,
    `${basePath}/${imageName}-md.webp 800w`,
    `${basePath}/${imageName}-lg.webp 1200w`,
    `${basePath}/${imageName}-hero.webp 1920w`,
  ].join(', ');
}

/**
 * Generate picture element sources for WebP + AVIF
 */
export function getPictureSources(basePath: string, imageName: string) {
  return {
    avif: `${basePath}/${imageName}-hero.avif`,
    webp: {
      srcSet: generateSrcSet(basePath, imageName),
      sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    }
  };
}

/**
 * Default placeholder/blur data URL for image loading
 */
export const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMREv/aAAwDAQACEQMRAD8AzLw/WNS07XLWK3upUgMqmRVboAnk/a0nxrxiz0S4upLIy+mWER7WbdtwSP6fgpSladjszd7yZRmn/9k=';

/**
 * Curated images for each website section
 * All images are optimized WebP with responsive sizes
 */
export const GALLERY_IMAGES = {
  // Hero section - stunning couple portraits
  hero: {
    main: '/images/gallery/couples/couples-023-sdak-3870-lg.webp',
    slides: [
      '/images/gallery/couples/couples-003-sdak-0767-lg.webp',
      '/images/gallery/ceremonies/ceremonies-073-tpl-stutidhruv-wedding-1051-hero.webp',
      '/images/gallery/venues/venues-006-4g4a3787-lg.webp',
    ],
  },

  // Couple portraits for testimonials and about
  couples: {
    featured: [
      { src: '/images/gallery/couples/couples-003-sdak-0767', alt: 'Elegant couple portrait' },
      { src: '/images/gallery/couples/couples-023-sdak-3870', alt: 'Romantic couple moment' },
      { src: '/images/gallery/couples/couples-034-0a8a1903', alt: 'Beautiful couple photo' },
      { src: '/images/gallery/couples/couples-035-0a8a1911', alt: 'Stunning couple portrait' },
      { src: '/images/gallery/couples/couples-028-sdak-4001', alt: 'Couple celebration' },
      { src: '/images/gallery/couples/couples-009-sdak-3572', alt: 'Happy couple' },
    ],
    grid: [
      '/images/gallery/couples/couples-004-sdak-0770-md.webp',
      '/images/gallery/couples/couples-012-sdak-3583-md.webp',
      '/images/gallery/couples/couples-013-sdak-3586-md.webp',
      '/images/gallery/couples/couples-018-sdak-3664-md.webp',
    ],
  },

  // Venue images
  venues: {
    featured: [
      { src: '/images/gallery/venues/venues-006-4g4a3787', alt: 'Luxury wedding venue' },
      { src: '/images/gallery/venues/venues-005-4g4a3761', alt: 'Grand ballroom setup' },
      { src: '/images/gallery/venues/venues-003-mandap', alt: 'Beautiful mandap decoration' },
      { src: '/images/gallery/venues/venues-010-4g4a6747', alt: 'Elegant venue decor' },
    ],
    carousel: [
      '/images/gallery/venues/venues-004-4g4a3654-lg.webp',
      '/images/gallery/venues/venues-007-4g4a3833-lg.webp',
      '/images/gallery/venues/venues-008-4g4a4249-lg.webp',
      '/images/gallery/venues/venues-011-4g4a7183-lg.webp',
      '/images/gallery/venues/venues-012-4g4a7190-lg.webp',
    ],
  },

  // Decor images for services section
  decor: {
    featured: [
      { src: '/images/gallery/decor/decor-022-pp-619', alt: 'Stunning floral decor' },
      { src: '/images/gallery/decor/decor-020-pp-614', alt: 'Beautiful centerpiece' },
      { src: '/images/gallery/decor/decor-005-pp-0844', alt: 'Elegant decoration' },
      { src: '/images/gallery/decor/decor-018-pp-295', alt: 'Luxurious setup' },
    ],
    grid: [
      '/images/gallery/decor/decor-015-pp-1269-md.webp',
      '/images/gallery/decor/decor-019-pp-325-md.webp',
      '/images/gallery/decor/decor-021-pp-615-md.webp',
    ],
  },

  // Ceremony images
  ceremonies: {
    featured: [
      { src: '/images/gallery/ceremonies/ceremonies-073-tpl-stutidhruv-wedding-1051', alt: 'Wedding ceremony' },
      { src: '/images/gallery/ceremonies/ceremonies-055-tpl-stutidhruv-haldi-1004', alt: 'Haldi ceremony' },
      { src: '/images/gallery/ceremonies/ceremonies-048-tpl-stutidhruv-engagementsangeet-1126', alt: 'Sangeet celebration' },
      { src: '/images/gallery/ceremonies/ceremonies-062-tpl-stutidhruv-receptionafterparty-1049', alt: 'Reception party' },
    ],
    grid: [
      '/images/gallery/ceremonies/ceremonies-051-tpl-stutidhruv-engagementsangeet-1170-lg.webp',
      '/images/gallery/ceremonies/ceremonies-059-tpl-stutidhruv-haldi-1080-lg.webp',
      '/images/gallery/ceremonies/ceremonies-063-tpl-stutidhruv-receptionafterparty-1093-lg.webp',
      '/images/gallery/ceremonies/ceremonies-067-tpl-stutidhruv-receptionafterparty-1902-lg.webp',
    ],
  },

  // Entertainment images
  entertainment: {
    featured: [
      { src: '/images/gallery/entertainment/entertainment-004-mod-0365', alt: 'Live music performance' },
      { src: '/images/gallery/entertainment/entertainment-011-mod-0783', alt: 'Entertainment show' },
      { src: '/images/gallery/entertainment/entertainment-001-mod-0258', alt: 'Wedding entertainment' },
    ],
    grid: [
      '/images/gallery/entertainment/entertainment-002-mod-0317-lg.webp',
      '/images/gallery/entertainment/entertainment-009-mod-0569-lg.webp',
      '/images/gallery/entertainment/entertainment-012-mod-0829-lg.webp',
    ],
  },

  // Services page images
  services: {
    planning: '/images/gallery/ceremonies/ceremonies-073-tpl-stutidhruv-wedding-1051-lg.webp',
    decoration: '/images/gallery/decor/decor-022-pp-619-lg.webp',
    catering: '/images/gallery/portfolio/portfolio-160-fullsizerender-lg.webp',
    entertainment: '/images/gallery/entertainment/entertainment-004-mod-0365-lg.webp',
    photography: '/images/gallery/couples/couples-023-sdak-3870-lg.webp',
    venue: '/images/gallery/venues/venues-006-4g4a3787-lg.webp',
  },

  // Portfolio/gallery page
  portfolio: {
    featured: [
      '/images/gallery/portfolio/portfolio-001-a4a3863-lg.webp',
      '/images/gallery/portfolio/portfolio-010-4t8a0845-lg.webp',
      '/images/gallery/portfolio/portfolio-020-4t8a3653-lg.webp',
      '/images/gallery/portfolio/portfolio-030-asf02688-lg.webp',
      '/images/gallery/portfolio/portfolio-040-asf08545-lg.webp',
      '/images/gallery/portfolio/portfolio-050-sip01213-lg.webp',
    ],
  },
};

/**
 * Get responsive image props for Next/Image
 */
export function getResponsiveImageProps(basePath: string, imageName: string) {
  return {
    src: `${basePath}/${imageName}-lg.webp`,
    srcSet: generateSrcSet(basePath, imageName),
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  };
}

/**
 * Get all images from a category for gallery display
 */
export function getCategoryImages(category: ImageCategory, size: ImageSize = 'md') {
  const basePath = getGalleryBasePath(category);
  return {
    basePath,
    size,
    pattern: `${basePath}/${category}-*-${size}.webp`,
  };
}
