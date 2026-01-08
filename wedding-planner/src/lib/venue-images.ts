// Venue image helpers with fallbacks to Unsplash

// Default Unsplash images for venue categories
const fallbackImages: Record<string, { hero: string; gallery: string[] }> = {
  Palace: {
    hero: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
    ],
  },
  'Beach Resort': {
    hero: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
    ],
  },
  Heritage: {
    hero: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
    ],
  },
  'Luxury Hotel': {
    hero: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
    ],
  },
  default: {
    hero: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
    ],
  },
};

export function getVenueHeroImage(venue: { heroImage?: string; category?: string }): string {
  // If venue has a hero image that's a local webp file
  if (venue.heroImage?.endsWith('.webp')) {
    return venue.heroImage;
  }
  // If venue has an Unsplash URL
  if (venue.heroImage?.includes('unsplash.com')) {
    return venue.heroImage;
  }
  // Fallback based on category
  const category = venue.category || 'default';
  return fallbackImages[category]?.hero || fallbackImages.default.hero;
}

export function getVenueOgImage(venue: { ogImage?: string; heroImage?: string; category?: string }): string {
  // Prefer dedicated OG image (1200x630 optimized for social sharing)
  if (venue.ogImage?.endsWith('.webp')) {
    return venue.ogImage;
  }
  // Fallback to hero image
  return getVenueHeroImage(venue);
}

export function getVenueGalleryImages(venue: { galleryImages?: string[]; category?: string }): string[] {
  // Check if gallery images exist and are valid
  if (venue.galleryImages?.length && venue.galleryImages.every(img =>
    img.endsWith('.webp') || img.includes('unsplash.com')
  )) {
    return venue.galleryImages;
  }
  // Fallback based on category
  const category = venue.category || 'default';
  return fallbackImages[category]?.gallery || fallbackImages.default.gallery;
}

export function getVenuePlaceholderImage(category?: string): string {
  return fallbackImages[category || 'default']?.hero || fallbackImages.default.hero;
}
