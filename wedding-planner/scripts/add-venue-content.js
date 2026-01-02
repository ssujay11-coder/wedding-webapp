const fs = require('fs');
const path = require('path');

// Read the venues.json file
const venuesPath = path.join(__dirname, '../src/data/venues/venues.json');
const venues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));

// Generate research content based on venue type and location
function generateResearchContent(venue) {
  const isBeach = venue.category === 'Beach Resort' || venue.city === 'Goa';
  const isPalace = venue.category === 'Palace' || venue.category === 'Heritage Hotel';
  const isHillStation = ['Mussoorie', 'Shimla', 'Nainital', 'Kodaikanal', 'Ooty', 'Jim Corbett'].includes(venue.city);
  const isInternational = venue.country && venue.country !== 'India';

  // Unique Selling Points based on venue type
  const uniqueSellingPoints = [];
  if (isPalace) {
    uniqueSellingPoints.push(
      `Historic ${venue.category.toLowerCase()} with authentic royal architecture`,
      `Exclusive venue buyout available for complete privacy`,
      `${venue.starRating || 5}-star luxury with heritage charm`,
      `Expert wedding team with experience in royal celebrations`,
      `Stunning architecture providing natural photo backdrops`
    );
  } else if (isBeach) {
    uniqueSellingPoints.push(
      `Pristine beachfront location with Arabian Sea views`,
      `Sunset ceremonies on private beach areas`,
      `Perfect blend of luxury resort amenities and natural beauty`,
      `Ideal for destination wedding weekend experiences`,
      `Water sports and beach activities for guest entertainment`
    );
  } else if (isHillStation) {
    uniqueSellingPoints.push(
      `Stunning mountain views and natural landscapes`,
      `Cool climate perfect for outdoor celebrations year-round`,
      `Intimate venue setting surrounded by nature`,
      `Unique hill station charm and local traditions`,
      `Perfect escape from city heat for destination weddings`
    );
  } else {
    uniqueSellingPoints.push(
      `Premium ${venue.starRating || 5}-star luxury accommodations`,
      `Versatile indoor and outdoor wedding spaces`,
      `Award-winning culinary team and customizable menus`,
      `Experienced wedding planning team on-site`,
      `Excellent connectivity and guest convenience`
    );
  }

  // Insider Tips based on venue type
  const insiderTips = [];
  if (isPalace) {
    insiderTips.push(
      `Book the largest function space for your main ceremony - the natural lighting is best between 4-6 PM for photography.`,
      `Request traditional musicians for your baraat - the heritage ambiance enhances authentic cultural experiences.`,
      `Schedule your mehendi in the courtyard areas where natural light creates perfect photo opportunities.`,
      `The venue's signature ${venue.cuisineTypes?.[0] || 'regional'} dishes should be included in your menu for an authentic experience.`,
      `Ask about heritage suite upgrades for the wedding night - the premium rooms often have special architectural features.`,
      `Book well in advance for peak season (October-February) as dates fill 12-18 months ahead.`
    );
  } else if (isBeach) {
    insiderTips.push(
      `Plan outdoor ceremonies for sunset timing - typically 5:30-6:30 PM for the best golden hour light.`,
      `Book the beachfront lawn for sangeet - the sea breeze keeps guests comfortable for dancing.`,
      `Request a backup indoor venue in your contract - coastal weather can be unpredictable.`,
      `The resort's seafood specialties are exceptional - feature local Goan dishes in your menu.`,
      `Schedule pool party events for daytime functions - they're a huge hit with guests.`,
      `Book beach cabanas for the mehendi - guests love the relaxed tropical vibe.`
    );
  } else {
    insiderTips.push(
      `Request a site visit during your preferred season to assess natural lighting and weather conditions.`,
      `The venue's specialty cuisine should be featured in at least one meal for authentic local flavor.`,
      `Book the best photo spots during golden hour - typically 1 hour before sunset.`,
      `Coordinate with the in-house wedding team early - they know all the venue's hidden gems.`,
      `Ask about off-season discounts - you can often save 20-30% on venue costs.`,
      `Request room blocks early for peak dates to ensure all guests stay on property.`
    );
  }

  // Planning Timeline
  const planningTimeline = [
    { months: "12M", task: `Initial inquiry and date blocking for ${venue.name}` },
    { months: "10M", task: "Site visit and venue confirmation with booking deposit" },
    { months: "8M", task: `Finalize guest list and book ${venue.accommodationRooms || 'all'} rooms` },
    { months: "6M", task: "Select and confirm decor, photography, and entertainment vendors" },
    { months: "4M", task: "Menu tasting and finalize catering arrangements" },
    { months: "3M", task: "Complete decor designs and seating arrangements" },
    { months: "2M", task: "Final guest confirmations and room assignments" },
    { months: "1M", task: "Final walkthrough with all vendors and contingency planning" },
    { months: "1W", task: "Guest arrivals and pre-wedding ceremonies begin" }
  ];

  // Signature Experiences based on venue type
  const signatureExperiences = [];
  if (isPalace) {
    signatureExperiences.push(
      {
        title: "Royal Welcome Ceremony",
        description: `Guests are greeted with traditional tikka, aarti, and rose petals in the grand lobby, setting the tone for a royal celebration.`
      },
      {
        title: "Heritage Venue Pheras",
        description: `Exchange vows in the venue's most stunning space with heritage architecture as your backdrop and traditional decorations.`
      },
      {
        title: "Cultural Performance Evening",
        description: `Professional folk artists perform traditional dances and music, immersing guests in local cultural traditions.`
      }
    );
  } else if (isBeach) {
    signatureExperiences.push(
      {
        title: "Sunset Beach Ceremony",
        description: `Exchange vows with your toes in the sand as the sun sets over the Arabian Sea, creating magical golden hour photographs.`
      },
      {
        title: "Poolside Sangeet Party",
        description: `Dance under the stars by the resort pool with professional DJ, tropical cocktails, and beachside ambiance.`
      },
      {
        title: "Beach Bonfire Night",
        description: `An intimate gathering around a beach bonfire with acoustic music, mocktails, and stargazing - perfect for the night before the wedding.`
      }
    );
  } else {
    signatureExperiences.push(
      {
        title: "Grand Welcome Reception",
        description: `A stunning entry experience with traditional welcome rituals, live music, and a champagne toast for arriving guests.`
      },
      {
        title: "Ceremony Under the Stars",
        description: `Evening ceremonies at the venue's signature outdoor space with fairy lights and elegant floral arrangements.`
      },
      {
        title: "Gourmet Culinary Journey",
        description: `Multiple live food stations featuring the venue's award-winning cuisine, from local specialties to international favorites.`
      }
    );
  }

  // What to Expect
  const whatToExpect = [
    `Dedicated wedding coordinator assigned from booking confirmation`,
    `${venue.starRating || 5}-star service standards throughout your stay`,
    `Complimentary room upgrade for bride and groom on wedding night`,
    `24-hour room service with full menu availability`,
    `Traditional welcome ceremony for all arriving guests`,
    `Concierge service for guest excursions and special requests`,
    `Post-wedding brunch arrangement options`
  ];

  // Photography Spots (venue-specific)
  const photographySpots = [];
  if (isPalace) {
    photographySpots.push(
      "Grand entrance staircase with heritage architecture",
      "Courtyard with traditional arches and columns",
      "Palace lawns at golden hour",
      "Heritage corridors with intricate artwork",
      "Royal suite balcony with venue panorama",
      "Poolside reflection shots at dusk"
    );
  } else if (isBeach) {
    photographySpots.push(
      "Beach at sunset with golden light",
      "Infinity pool with ocean backdrop",
      "Palm-lined pathways",
      "Private cabanas by the sea",
      "Rooftop deck at blue hour",
      "Jetty or pier extending into water"
    );
  } else {
    photographySpots.push(
      "Main entrance with venue signage",
      "Landscaped gardens at golden hour",
      "Grand ballroom before guests arrive",
      "Lobby with architectural details",
      "Poolside at sunset",
      "Terrace with city/nature views"
    );
  }

  // Budget Breakdown
  const budgetBreakdown = [
    {
      category: "Venue & Accommodation",
      percentage: "35%",
      note: `Includes room bookings for ${venue.accommodationRooms || 'N/A'} rooms, venue rental for all events, and basic setup.`
    },
    {
      category: "Catering & Beverages",
      percentage: "30%",
      note: `Multi-cuisine menus with ${venue.cuisineTypes?.length || 'multiple'} cuisine options. Budget for 3-4 meals daily over event duration.`
    },
    {
      category: "Decor & Florals",
      percentage: "15%",
      note: "Professional decoration for ceremony, reception, and common areas. Fresh flowers and mandap setup included."
    },
    {
      category: "Photography & Entertainment",
      percentage: "12%",
      note: "Professional photography, videography, and entertainment including DJ and live performers."
    },
    {
      category: "Guest Experiences & Logistics",
      percentage: "8%",
      note: "Includes guest transportation, welcome kits, and activity arrangements."
    }
  ];

  // Vendor Recommendations
  const vendorRecommendations = [
    {
      category: "Decorator",
      tip: `Choose decorators experienced with ${venue.name} - they understand the space and any venue-specific restrictions.`
    },
    {
      category: "Photographer",
      tip: "Book photographers who have shot at this venue before - they know the best lighting times and photo locations."
    },
    {
      category: "Makeup Artist",
      tip: `Select artists experienced with ${venue.city}'s climate - humidity/dryness affects makeup longevity.`
    },
    {
      category: "Entertainment",
      tip: "Local musicians and performers add authentic regional flavor to your celebration."
    },
    {
      category: "Caterer",
      tip: "Work with the venue's executive chef to customize menus and include family recipes."
    }
  ];

  return {
    uniqueSellingPoints,
    insiderTips,
    planningTimeline,
    signatureExperiences,
    whatToExpect,
    photographySpots,
    budgetBreakdown,
    vendorRecommendations
  };
}

// Update each venue with research content
const updatedVenues = venues.map(venue => {
  // Skip if already has research content
  if (venue.uniqueSellingPoints && venue.uniqueSellingPoints.length > 0) {
    return venue;
  }

  const researchContent = generateResearchContent(venue);
  return {
    ...venue,
    ...researchContent
  };
});

// Write back to venues.json
fs.writeFileSync(venuesPath, JSON.stringify(updatedVenues, null, 2), 'utf8');

console.log(`Updated ${updatedVenues.length} venues with research content!`);
console.log('Venues updated successfully.');
