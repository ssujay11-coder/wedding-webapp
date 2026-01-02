/**
 * Wedding Destination Locations Database
 * 30 India + 5 Thailand + 5 UAE = 40 Total Locations
 */

export interface LocationVenue {
  name: string;
  slug: string;
  image: string;
}

export interface WeddingLocation {
  id: string;
  name: string;
  slug: string;
  country: 'India' | 'Thailand' | 'UAE';
  region: string;
  tagline: string;
  heroImage: string;
  galleryImages: string[];

  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];

  // Content
  introduction: string;
  whyWedHere: string[];
  bestVenues: LocationVenue[];
  weddingSeasons: {
    best: string;
    avoid: string;
    weather: string;
  };
  budgetRange: {
    min: string;
    max: string;
    note: string;
  };
  guestCapacity: string;

  // Logistics
  nearestAirport: string;
  connectivity: string;
  localAttractions: string[];

  // Unique Selling Points
  highlights: string[];
  traditions: string[];
  cuisineSpecialties: string[];

  // Stats for display
  averageRating: number;
  weddingsHosted: string;
  popularFor: string[];

  // Research-based content fields
  planningTips?: string[];
  insiderSecrets?: string[];
  bestPhotoLocations?: {
    spot: string;
    timing: string;
  }[];
  guestExperiences?: {
    activity: string;
    duration: string;
    description: string;
  }[];
  realWeddingStats?: {
    averageBudget: string;
    averageGuestCount: number;
    popularMonths: string;
    repeatBookingRate: string;
    vendorSatisfaction: string;
  };
}

// Import locations data
import locationsData from './locations.json';

export const locations: WeddingLocation[] = locationsData as WeddingLocation[];

// Utility functions
export const getLocationsByCountry = (country: 'India' | 'Thailand' | 'UAE'): WeddingLocation[] => {
  return locations.filter(loc => loc.country === country);
};

export const getLocationBySlug = (slug: string): WeddingLocation | undefined => {
  return locations.find(loc => loc.slug === slug);
};

export const getIndiaLocations = (): WeddingLocation[] => getLocationsByCountry('India');
export const getThailandLocations = (): WeddingLocation[] => getLocationsByCountry('Thailand');
export const getUAELocations = (): WeddingLocation[] => getLocationsByCountry('UAE');

export const searchLocations = (query: string): WeddingLocation[] => {
  const lowerQuery = query.toLowerCase();
  return locations.filter(loc =>
    loc.name.toLowerCase().includes(lowerQuery) ||
    loc.country.toLowerCase().includes(lowerQuery) ||
    loc.region.toLowerCase().includes(lowerQuery) ||
    loc.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
  );
};

export default {
  locations,
  getLocationsByCountry,
  getLocationBySlug,
  getIndiaLocations,
  getThailandLocations,
  getUAELocations,
  searchLocations
};
