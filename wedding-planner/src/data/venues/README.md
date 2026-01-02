# India's Top 50 5-Star Wedding Venues Database

## Overview
This directory contains a comprehensive, SEO-optimized database of India's finest wedding venues, structured for easy integration with Next.js/React applications.

## Files

### `index.ts`
TypeScript interfaces, types, and utility functions for working with the venue database.

**Key Exports:**
- `WeddingVenue` - Main venue interface
- `venues` - Array of all 50 venues
- `getVenuesByRegion()` - Filter by North/South/East/West/Central
- `getVenuesByCategory()` - Filter by Palace/Beach/Hill Station/etc.
- `getVenuesByState()` - Filter by state name
- `getVenueBySlug()` - Get single venue by URL slug
- `getVenuesByPriceRange()` - Filter by budget
- `getVenuesByCapacity()` - Filter by guest count
- `searchVenues()` - Full-text search across venues

### `venues.json`
Complete data for all 50 premium wedding venues across India.

**Structure:**
- 15 Rajasthan venues (Udaipur, Jaipur, Jodhpur, Jaisalmer)
- 10 Goa beach resorts
- 5 Kerala backwater and coastal properties
- 5 Maharashtra venues (Mumbai, Lonavala)
- 5 Karnataka/Tamil Nadu venues
- 5 Delhi NCR urban luxury hotels
- 5 Hill station and specialty venues

## Venue Categories

| Category | Count | Examples |
|----------|-------|----------|
| Palace | 12 | Oberoi Udaivilas, Taj Lake Palace, Umaid Bhawan |
| Beach Resort | 12 | Taj Exotica Goa, Leela Goa, Park Hyatt Goa |
| Heritage | 8 | Fateh Prakash Palace, Rambagh Palace, Samode |
| Urban Luxury | 10 | Taj Mahal Palace Mumbai, Leela Palace Delhi |
| Hill Station | 4 | Wildflower Hall, Ananda in Himalayas |
| Backwater | 3 | Kumarakom Lake Resort, Taj Bekal |
| Desert | 1 | Suryagarh Jaisalmer |

## Regional Distribution

| Region | States | Venue Count |
|--------|--------|-------------|
| North | Rajasthan, Delhi, Uttarakhand, Himachal | 25 |
| South | Kerala, Karnataka, Tamil Nadu | 10 |
| West | Goa, Maharashtra | 15 |

## Price Range Distribution

| Range | Count | Starting Price |
|-------|-------|----------------|
| Ultra Luxury | 10 | ₹150L+ |
| Premium | 25 | ₹75L - ₹150L |
| Luxury | 15 | ₹50L - ₹75L |

## Capacity Range

| Size | Count | Guest Range |
|------|-------|-------------|
| Intimate | 8 | 30-100 |
| Medium | 22 | 100-300 |
| Large | 20 | 300-600 |

## SEO Optimization

Each venue includes:
- **Meta Title** - Optimized for Google search (60 chars)
- **Meta Description** - Compelling snippet (155 chars)
- **10+ Keywords** - Covering brand, location, category searches
- **Long Description** - 500+ words with natural keyword integration
- **Short Description** - 150 chars for cards/previews

### Primary Keywords Covered
- [Venue Name] wedding
- [City] wedding venue
- [City] destination wedding
- Luxury wedding [State]
- 5-star wedding venue [City]
- [Category] wedding [Location]
- Destination wedding [State]

## Data Quality

✅ All 50 venues include:
- Accurate coordinates for mapping
- Multiple wedding spaces with capacities
- Realistic price ranges (in lakhs)
- 10-15 key features
- Contact information
- Awards and ratings
- Seasonal recommendations
- Airport logistics
- 5-8 "Why Choose" points
- 3-5 "Ideal For" couple profiles

## Usage Examples

### Import and Use

```typescript
import {
  venues,
  getVenuesByRegion,
  getVenuesByCategory,
  getVenueBySlug,
  searchVenues
} from '@/data/venues';

// Get all North India venues
const northVenues = getVenuesByRegion('North');

// Get all palace wedding venues
const palaceVenues = getVenuesByCategory('Palace');

// Get specific venue
const venue = getVenueBySlug('oberoi-udaivilas-udaipur');

// Search venues
const results = searchVenues('lake palace wedding');

// Filter by budget (in lakhs)
const affordableVenues = venues.filter(v => v.priceRange.min <= 75);

// Filter by capacity
const largeVenues = venues.filter(v => v.guestCapacity.max >= 400);
```

### Display Venue Card

```typescript
<VenueCard
  name={venue.name}
  image={venue.heroImage}
  description={venue.shortDescription}
  city={venue.city}
  state={venue.state}
  capacity={`${venue.guestCapacity.min}-${venue.guestCapacity.max} guests`}
  pricing={venue.startingPrice}
  rating={venue.googleRating}
  category={venue.category}
  slug={venue.slug}
/>
```

### Generate SEO Meta Tags

```typescript
export function generateMetadata({ params }: { params: { slug: string } }) {
  const venue = getVenueBySlug(params.slug);

  return {
    title: venue.metaTitle,
    description: venue.metaDescription,
    keywords: venue.keywords.join(', '),
    openGraph: {
      title: venue.metaTitle,
      description: venue.metaDescription,
      images: [venue.heroImage],
    },
  };
}
```

## Content Guidelines

All venue descriptions follow SEO best practices:

1. **Natural Keyword Integration** - Keywords flow naturally within compelling copy
2. **Unique Content** - No duplicate descriptions across venues
3. **User Intent Focus** - Content answers what couples want to know
4. **Feature-Benefit Balance** - Lists features while explaining benefits
5. **Call-to-Action** - Descriptions guide toward booking/inquiry
6. **Local Context** - Includes regional attractions, culture, logistics
7. **Practical Information** - Weather, seasons, accessibility clearly stated

## Maintenance

To add new venues:
1. Follow the structure in `venues.json`
2. Use the template in `COMPLETE_VENUE_TEMPLATE.md`
3. Ensure unique slug (URL-friendly identifier)
4. Include all required fields
5. Write unique, keyword-optimized descriptions
6. Test with TypeScript interfaces

To update existing venues:
1. Maintain the JSON structure
2. Update pricing/contact info as needed
3. Refresh seasonal recommendations
4. Add new awards/recognitions
5. Update images/gallery links

## Integration Notes

- **Next.js 14+**: Direct JSON import supported
- **TypeScript**: Full type safety with interfaces
- **React**: Use as data source for components
- **API Routes**: Can be served via API endpoints
- **Static Generation**: Enables ISR/SSG for venue pages
- **Search**: Integrates with Algolia, MeiliSearch, or custom search

## License & Usage

This database is created for the Wedding Webapp project. Venue information is compiled from public sources. Always verify current pricing, availability, and details directly with venues.

---

**Database Version:** 1.0
**Last Updated:** January 2026
**Total Venues:** 50
**Total Words:** ~30,000+
**SEO Keywords:** 500+
