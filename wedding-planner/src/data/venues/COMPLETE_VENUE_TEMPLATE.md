# Complete Venue Database Template

## How to Use This Template

This file contains the complete structure and template for all 50 venues. Use this as a reference to populate the venues.json file with comprehensive, SEO-optimized content.

## Venue Entry Template

```json
{
  "id": "venue-XXX",
  "name": "[Official Venue Name]",
  "slug": "[url-friendly-name]",
  "city": "[City Name]",
  "state": "[State Name]",
  "region": "North|South|East|West|Central",
  "coordinates": {"lat": XX.XXXX, "lng": XX.XXXX},
  "category": "Palace|Beach Resort|Hill Station|Heritage|Urban Luxury|Backwater|Desert",
  "starRating": 5,
  "guestCapacity": {"min": XXX, "max": XXX},
  "priceRange": {"min": XX, "max": XXX},
  "startingPrice": "₹XX Lakhs onwards",

  "shortDescription": "[Compelling 150-character description with primary keywords]",

  "longDescription": "[500+ word SEO-optimized description following this structure:

    Paragraph 1 (100-150 words):
    - Opening hook highlighting the venue's unique position
    - Primary keywords: [venue name] wedding, [city] destination wedding
    - Establish the venue's prestige and location

    Paragraph 2 (100-150 words):
    - Architectural and aesthetic details
    - Visual appeal and ambiance
    - Keywords: luxury wedding venue, heritage/palace/beach resort wedding

    Paragraph 3 (100-150 words):
    - Unique selling proposition
    - What makes this venue stand out
    - Specific features and venue spaces

    Paragraph 4 (100-150 words):
    - Wedding planning services and expertise
    - Culinary offerings
    - Cultural experiences and entertainment

    Paragraph 5 (100-150 words):
    - Accommodation details and guest amenities
    - Spa, wellness, and recreational facilities
    - Guest experience focus

    Paragraph 6 (100-150 words):
    - Location advantages and nearby attractions
    - Accessibility for destination weddings
    - Closing statement emphasizing comprehensive wedding experience
    - Keywords: destination wedding [state], [venue] wedding packages]",

  "weddingSpaces": [
    {"name": "[Space Name]", "capacity": XXX, "type": "Indoor|Outdoor|Poolside|Rooftop|Lawn|Banquet", "sqft": XXXXX},
    {"name": "[Space Name]", "capacity": XXX, "type": "Indoor|Outdoor|Poolside|Rooftop|Lawn|Banquet", "sqft": XXXXX},
    {"name": "[Space Name]", "capacity": XXX, "type": "Indoor|Outdoor|Poolside|Rooftop|Lawn|Banquet", "sqft": XXXXX}
  ],

  "features": [
    "[Unique location/setting feature]",
    "[Accommodation detail]",
    "[Wedding venue variety]",
    "[Spa/wellness amenity]",
    "[Special facility - pool, helicopter pad, etc]",
    "[Wedding planning service]",
    "[Technical/AV capabilities]",
    "[Vendor partnerships]",
    "[Decor services]",
    "[Culinary capability]",
    "[Cultural entertainment]",
    "[Transportation arrangements]",
    "[Privacy/exclusivity feature]",
    "[Additional unique feature]"
  ],

  "cuisineTypes": [
    "[Regional Specialty]",
    "North Indian",
    "South Indian",
    "[Additional Regional]",
    "Continental",
    "[International Cuisine 1]",
    "[International Cuisine 2]",
    "[International Cuisine 3]",
    "Fusion Cuisine"
  ],

  "accommodationRooms": XXX,
  "googleRating": X.X,
  "tripAdvisorRating": X.X,
  "weddingWireRating": X.X,

  "heroImage": "/images/venues/[slug]/hero.jpg",
  "galleryImages": [
    "/images/venues/[slug]/gallery-1.jpg",
    "/images/venues/[slug]/gallery-2.jpg",
    "/images/venues/[slug]/gallery-3.jpg",
    "/images/venues/[slug]/gallery-4.jpg",
    "/images/venues/[slug]/gallery-5.jpg",
    "/images/venues/[slug]/gallery-6.jpg"
  ],
  "virtualTourUrl": "[Official website virtual tour URL]",

  "nearestAirport": "[Airport Name]",
  "distanceFromAirport": "XX km (XX minutes)",

  "bestSeasons": [
    "[Primary Season]",
    "[Secondary Season]",
    "[Tertiary Season]"
  ],

  "weatherNote": "[Detailed weather information for the location, best months, temperatures, and considerations for outdoor/indoor events]",

  "metaTitle": "[Venue Name] [City] Wedding | [Category] Wedding Venue [State/Region]",
  "metaDescription": "[Compelling 155-character description with call-to-action, capacity, and key features]",

  "keywords": [
    "[venue name] wedding",
    "[venue name] wedding packages",
    "[city] wedding venue",
    "[city] destination wedding",
    "[category] wedding [city]",
    "luxury wedding venue [city]",
    "5 star wedding venue [state]",
    "[specific feature] wedding [city]",
    "destination wedding [state]",
    "[brand name] wedding [city]"
  ],

  "phone": "+91-XXX-XXX-XXXX",
  "email": "[venue email]",
  "website": "[official website]",

  "awards": [
    "[Award 1 - Source/Year]",
    "[Award 2 - Source/Year]",
    "[Award 3 - Source/Year]",
    "[Award 4 - Source/Year]",
    "[Award 5 - Source/Year]"
  ],

  "whyChoose": [
    "[Unique location/setting advantage]",
    "[Architectural/aesthetic appeal]",
    "[Service quality/exclusivity]",
    "[Awards/recognition]",
    "[Wedding planning expertise]",
    "[Culinary/catering excellence]",
    "[Accessibility/convenience factor]",
    "[Value proposition/comprehensive offering]"
  ],

  "idealFor": [
    "[Couple profile 1 - e.g., 'Couples seeking authentic heritage experience']",
    "[Couple profile 2 - e.g., 'Luxury destination weddings with international guests']",
    "[Couple profile 3 - e.g., 'Multi-day celebrations requiring extensive facilities']",
    "[Couple profile 4 - e.g., 'Photography-focused couples wanting iconic backdrops']",
    "[Couple profile 5 - e.g., 'Families prioritizing guest comfort and amenities']"
  ]
}
```

## Quick Reference: Venue Categories

- **Palace:** Udaipur properties, Jaipur palaces, Jodhpur palaces
- **Beach Resort:** All Goa properties, Kerala coastal resorts
- **Hill Station:** Shimla, Mussoorie, Coorg properties
- **Heritage:** Historic palaces and havelis
- **Urban Luxury:** Mumbai, Delhi, Bangalore, Chennai city hotels
- **Backwater:** Kerala backwater resorts
- **Desert:** Jaisalmer properties

## SEO Keyword Strategy

For each venue, include variations of:
1. Primary: [Venue Name] wedding
2. Location: [City] wedding venue, [City] destination wedding
3. Category: [luxury/heritage/beach] wedding [location]
4. Brand: [Hotel Brand] wedding packages
5. Features: [lakeside/palace/beach/mountain] wedding [location]
6. Regional: wedding venue in [state], destination wedding [state]
7. Comparative: best wedding venue [city], top 5 star wedding [city]
8. Event-specific: destination wedding resort [location]
9. Seasonal: winter/summer wedding [location]
10. Capacity-based: large wedding venue [location], intimate wedding [location]

## Content Writing Tips

### Long Description Structure (500+ words minimum)

**Opening (Para 1):** Establish prestige and positioning
- "[Venue Name] stands as [superlative description]..."
- "Located in [specific location details]..."
- "As one of [region]'s premier wedding venues..."

**Architecture & Design (Para 2):** Paint a visual picture
- Describe architectural style
- Mention specific design elements
- Create emotional connection
- Use sensory language

**Unique Selling Points (Para 3):** Differentiation
- What makes this venue special vs. competitors
- Specific wedding spaces and capacities
- Signature features or experiences
- Natural advantages (views, location, etc.)

**Services & Experiences (Para 4):** Demonstrate expertise
- Wedding planning team capabilities
- Customization options
- Culinary excellence
- Cultural programming and entertainment

**Accommodation & Amenities (Para 5):** Guest experience
- Room/suite details
- Spa and wellness facilities
- Recreational amenities
- Service standards (butler, concierge, etc.)

**Location & Accessibility (Para 6):** Practical benefits
- Nearby attractions for guests
- Accessibility from airports
- Local experiences available
- Final compelling call-to-action

### Features List (10-15 items)

Include mix of:
- Physical features (location, views, architecture)
- Amenities (spa, pool, rooms)
- Services (wedding planning, catering, decor)
- Unique offerings (cultural shows, special arrangements)
- Logistics (parking, helicopter pad, AV equipment)

### Why Choose (5-8 points)

Focus on:
- Competitive advantages
- Award recognitions
- Unique experiences
- Service quality
- Value propositions
- Comprehensive offerings

### Ideal For (3-5 profiles)

Target different couple segments:
- Heritage/culture enthusiasts
- Luxury seekers
- International/NRI families
- Large vs. intimate gatherings
- Photography-focused couples
- Budget-conscious luxury seekers
- Adventure/unique experience seekers

---

*Use this template to ensure consistency across all 50 venues while maintaining unique, compelling content for each property.*
