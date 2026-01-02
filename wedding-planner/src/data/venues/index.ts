/**
 * Comprehensive Wedding Venues Database
 * India's Top 50 5-Star Wedding Venues with exhaustive details
 */

// Types for venue categories and regions
export type VenueCategory =
  | "Palace"
  | "Beach Resort"
  | "Hill Station"
  | "Heritage"
  | "Urban Luxury"
  | "Backwater"
  | "Desert";

export type VenueRegion = "North" | "South" | "East" | "West" | "Central";

// Wedding space interface
export interface WeddingSpace {
  name: string;
  capacity: number;
  type: "Indoor" | "Outdoor" | "Poolside" | "Rooftop" | "Beachfront" | "Lakeside";
  sqft?: number;
  dimensions?: {
    length: string;
    width: string;
    height?: string;
  };
  features?: string[];
}

// FAQ interface
export interface VenueFAQ {
  question: string;
  answer: string;
}

// Driving directions interface
export interface DrivingDirections {
  fromAirport: string;
  fromRailway?: string;
  fromCityCenter?: string;
  landmarks?: string[];
  parkingInfo?: string;
}

// Main Wedding Venue interface
export interface WeddingVenue {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  region: VenueRegion;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: VenueCategory;
  starRating: number;
  guestCapacity: {
    min: number;
    max: number;
  };
  priceRange: {
    min: number;
    max: number;
  };
  startingPrice: string;
  shortDescription: string;
  longDescription: string;
  weddingSpaces: WeddingSpace[];
  features: string[];
  cuisineTypes: string[];
  accommodationRooms: number;
  googleRating: number;
  tripAdvisorRating: number;
  weddingWireRating?: number;
  heroImage: string;
  galleryImages: string[];
  virtualTourUrl?: string;
  nearestAirport: string;
  distanceFromAirport: string;
  bestSeasons: string[];
  weatherNote: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  phone: string;
  email: string;
  website: string;
  awards: string[];
  whyChoose: string[];
  idealFor: string[];
  // New comprehensive fields
  faqs?: VenueFAQ[];
  drivingDirections?: DrivingDirections;
  address?: string;
  nearestRailway?: string;
  distanceFromRailway?: string;
  helipadAvailable?: boolean;
  alcoholPolicy?: string;
  decorPolicy?: string;
  musicPolicy?: string;
  outsideVendorsAllowed?: boolean;
  exclusiveUseAvailable?: boolean;
  weddingCoordinator?: boolean;
  preferredVendorList?: boolean;
  cancellationPolicy?: string;
  paymentTerms?: string;
  securityDeposit?: string;
  // Enhanced details
  pros?: string[];
  cons?: string[];
  roomTypes?: {
    name: string;
    price: string;
    description: string;
    image: string;
    amenities: string[];
  }[];
  mapUrl?: string; // Embed URL for iframe
  // Research-based SEO content fields
  insiderTips?: string[];
  planningTimeline?: {
    months: string;
    task: string;
  }[];
  signatureExperiences?: {
    title: string;
    description: string;
  }[];
  nearbyAttractions?: {
    name: string;
    distance: string;
    description: string;
  }[];
  realWeddingStories?: {
    couple: string;
    date: string;
    guestCount: number;
    highlight: string;
    testimonial: string;
  }[];
  whatToExpect?: string[];
  budgetBreakdown?: {
    category: string;
    percentage: string;
    note: string;
  }[];
  vendorRecommendations?: {
    category: string;
    tip: string;
  }[];
  photographySpots?: string[];
  uniqueSellingPoints?: string[];
}

// Import venue data from JSON
import venuesData from './venues.json';
import tajLakePalaceData from './taj-lake-palace.json';

// Cast and export venues array
// Combine existing venues with the detailed Taj Lake Palace data
// If Taj Lake Palace already exists in venues.json, we prefer the individual file version
const baseVenues = venuesData as WeddingVenue[];
const tajLakePalace = tajLakePalaceData as unknown as WeddingVenue;

// Filter out old version if exists and add new one
export const venues: WeddingVenue[] = [
  ...baseVenues.filter(v => v.slug !== tajLakePalace.slug),
  tajLakePalace
];

// Utility functions
export const getVenuesByRegion = (region: VenueRegion): WeddingVenue[] => {
  return venues.filter((venue) => venue.region === region);
};

export const getVenuesByCategory = (category: VenueCategory): WeddingVenue[] => {
  return venues.filter((venue) => venue.category === category);
};

export const getVenuesByState = (state: string): WeddingVenue[] => {
  return venues.filter((venue) => venue.state.toLowerCase() === state.toLowerCase());
};

export const getVenueBySlug = (slug: string): WeddingVenue | undefined => {
  return venues.find((venue) => venue.slug === slug);
};

export const getVenuesByPriceRange = (minLakhs: number, maxLakhs: number): WeddingVenue[] => {
  return venues.filter(
    (venue) => venue.priceRange.min >= minLakhs && venue.priceRange.min <= maxLakhs
  );
};

export const getVenuesByCapacity = (guestCount: number): WeddingVenue[] => {
  return venues.filter((venue) => venue.guestCapacity.max >= guestCount);
};

export const searchVenues = (query: string): WeddingVenue[] => {
  const lowerQuery = query.toLowerCase();
  return venues.filter(
    (venue) =>
      venue.name.toLowerCase().includes(lowerQuery) ||
      venue.city.toLowerCase().includes(lowerQuery) ||
      venue.state.toLowerCase().includes(lowerQuery) ||
      venue.shortDescription.toLowerCase().includes(lowerQuery) ||
      venue.keywords.some((kw) => kw.toLowerCase().includes(lowerQuery))
  );
};

export const getFeaturedVenues = (limit: number = 6): WeddingVenue[] => {
  return [...venues]
    .sort((a, b) => b.googleRating - a.googleRating)
    .slice(0, limit);
};

export const getVenuesByCity = (city: string): WeddingVenue[] => {
  return venues.filter((venue) => venue.city.toLowerCase() === city.toLowerCase());
};

export const getTopRatedVenues = (limit: number = 10): WeddingVenue[] => {
  return [...venues]
    .sort((a, b) => b.googleRating - a.googleRating)
    .slice(0, limit);
};

export const getAllVenueSlugs = (): string[] => {
  return venues.map((venue) => venue.slug);
};

// For backwards compatibility - alias for venues
export const allVenues = venues;

// Default export
export default venues;
