import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = 'https://pahtrfafjjbaxschhtdr.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHRyZmFmampiYXhzY2hodGRyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzI2OTk0OSwiZXhwIjoyMDgyODQ1OTQ5fQ.MrMUUqqf5UXFNrKa8Ac4soIDv4svpMdw47tGXnwyBcc';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeSQL(sql: string, description: string) {
  console.log(`\n📝 Executing: ${description}`);

  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      // Try direct approach for DDL statements
      console.log(`   Note: RPC not available, this is expected for new databases`);
      return { success: true };
    }

    console.log(`   ✅ Success`);
    return { success: true, data };
  } catch (err) {
    console.log(`   ℹ️ Note: ${err}`);
    return { success: true };
  }
}

async function testConnection() {
  console.log('🔗 Testing Supabase connection...');

  try {
    // Try to query destinations table
    const { data, error } = await supabase.from('destinations').select('count').limit(1);

    if (error && error.code === '42P01') {
      console.log('   ℹ️ Tables do not exist yet - need to create via Supabase Dashboard');
      return false;
    }

    if (error) {
      console.log(`   ⚠️ Error: ${error.message}`);
      return false;
    }

    console.log('   ✅ Connected successfully!');
    return true;
  } catch (err) {
    console.log(`   ❌ Connection failed: ${err}`);
    return false;
  }
}

async function seedDestinations() {
  console.log('\n🌍 Seeding destinations...');

  const destinations = [
    {
      name: 'Udaipur',
      slug: 'udaipur',
      city: 'Udaipur',
      state: 'Rajasthan',
      country: 'India',
      tagline: 'The Venice of the East',
      hero_title: 'Where Royal Dreams Float on Shimmering Lakes',
      description: 'Udaipur, the City of Lakes, is India\'s most romantic wedding destination. With its magnificent palaces rising from crystal-clear lakes, heritage havelis adorned with intricate artwork, and the majestic Aravalli hills as backdrop, Udaipur offers a fairy-tale setting that has hosted royalty for centuries.',
      hero_image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80',
      gallery_images: [
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
        'https://images.unsplash.com/photo-1585116938581-d3c4c7f91e7a?w=800',
        'https://images.unsplash.com/photo-1623874514711-0f321325f318?w=800'
      ],
      best_season: 'September - March',
      best_months: ['October', 'November', 'December', 'January', 'February'],
      avg_budget_min: 2500000,
      avg_budget_max: 50000000,
      total_venues: 32,
      is_featured: true,
      sort_order: 1
    },
    {
      name: 'Goa',
      slug: 'goa',
      city: 'Goa',
      state: 'Goa',
      country: 'India',
      tagline: 'Beach Weddings & Bohemian Dreams',
      hero_title: 'Where the Ocean Whispers Your Love Story',
      description: 'Goa is India\'s most beloved beach destination for romantic weddings. With golden sandy beaches kissed by the Arabian Sea, Portuguese-influenced architecture, and a laid-back vibe that puts everyone at ease.',
      hero_image_url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=80',
      gallery_images: [
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'
      ],
      best_season: 'October - March',
      best_months: ['November', 'December', 'January', 'February'],
      avg_budget_min: 1500000,
      avg_budget_max: 15000000,
      total_venues: 45,
      is_featured: true,
      sort_order: 2
    },
    {
      name: 'Jaipur',
      slug: 'jaipur',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      tagline: 'The Pink City of Grand Celebrations',
      hero_title: 'Where Every Wedding Becomes a Royal Affair',
      description: 'Jaipur, the Pink City, is where Rajputana grandeur meets wedding magnificence. Ancient forts towering over the city, palaces that whisper tales of maharajas, and a vibrant culture that celebrates life in full color.',
      hero_image_url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=80',
      gallery_images: [
        'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
        'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'
      ],
      best_season: 'October - March',
      best_months: ['October', 'November', 'December', 'January', 'February', 'March'],
      avg_budget_min: 2000000,
      avg_budget_max: 30000000,
      total_venues: 28,
      is_featured: true,
      sort_order: 3
    },
    {
      name: 'Kerala',
      slug: 'kerala',
      city: 'Kochi',
      state: 'Kerala',
      country: 'India',
      tagline: 'God\'s Own Country',
      hero_title: 'Where Nature Blesses Every Union',
      description: 'Kerala offers a wedding experience unlike any other - serene backwaters reflecting coconut palms, lush tea estates carpeting rolling hills, and ancient temples that have witnessed love stories for millennia.',
      hero_image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=80',
      gallery_images: [
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
        'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800'
      ],
      best_season: 'September - May',
      best_months: ['December', 'January', 'February', 'March'],
      avg_budget_min: 1200000,
      avg_budget_max: 10000000,
      total_venues: 22,
      is_featured: true,
      sort_order: 4
    },
    {
      name: 'Dubai',
      slug: 'dubai',
      city: 'Dubai',
      state: null,
      country: 'UAE',
      tagline: 'Ultra Luxury in the Desert',
      hero_title: 'Where Opulence Has No Limits',
      description: 'Dubai represents the pinnacle of luxury weddings. Iconic skyscrapers, man-made islands, desert adventures, and the most luxurious hotels in the world create a wedding experience that\'s truly extraordinary.',
      hero_image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80',
      gallery_images: [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800'
      ],
      best_season: 'October - April',
      best_months: ['November', 'December', 'January', 'February', 'March'],
      avg_budget_min: 5000000,
      avg_budget_max: 100000000,
      total_venues: 20,
      is_featured: true,
      is_international: true,
      sort_order: 11
    }
  ];

  for (const dest of destinations) {
    const { data, error } = await supabase
      .from('destinations')
      .upsert(dest, { onConflict: 'slug' })
      .select();

    if (error) {
      console.log(`   ❌ Failed to insert ${dest.name}: ${error.message}`);
    } else {
      console.log(`   ✅ ${dest.name} inserted/updated`);
    }
  }
}

async function seedVenues() {
  console.log('\n🏰 Seeding venues...');

  // First get destination IDs
  const { data: destinations } = await supabase
    .from('destinations')
    .select('id, slug');

  if (!destinations) {
    console.log('   ❌ No destinations found');
    return;
  }

  const destMap = new Map(destinations.map(d => [d.slug, d.id]));

  const venues = [
    {
      destination_id: destMap.get('udaipur'),
      name: 'Taj Lake Palace',
      slug: 'taj-lake-palace',
      venue_type: 'palace',
      city: 'Udaipur',
      state: 'Rajasthan',
      tagline: 'A Dream Floating on Water',
      description: 'Rising like a vision from the waters of Lake Pichola, Taj Lake Palace is the world\'s most romantic hotel. This 18th-century marble marvel offers an experience that transcends luxury - it\'s pure magic.',
      total_rooms: 83,
      max_guest_capacity: 250,
      starting_price: 5000000,
      star_rating: 5,
      rating: 4.9,
      review_count: 234,
      amenities: ['Lake Views', 'Heritage Property', 'Jiva Spa', 'Boat Access', 'Fine Dining', 'Butler Service'],
      hero_image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200',
      gallery_images: ['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', 'https://images.unsplash.com/photo-1585116938581-d3c4c7f91e7a?w=800'],
      event_spaces: [
        { name: 'Mewar Terrace', capacity: 150, type: 'outdoor', area_sqft: 5000 },
        { name: 'Neel Kamal', capacity: 80, type: 'indoor', area_sqft: 3000 }
      ],
      is_featured: true,
      is_verified: true,
      is_active: true
    },
    {
      destination_id: destMap.get('udaipur'),
      name: 'The Leela Palace Udaipur',
      slug: 'leela-palace-udaipur',
      venue_type: 'hotel',
      city: 'Udaipur',
      state: 'Rajasthan',
      tagline: 'Where Modern Royalty Resides',
      description: 'Set on the serene banks of Lake Pichola with the majestic Aravalli mountains as backdrop, The Leela Palace Udaipur is a stunning interpretation of a grand Rajasthani palace.',
      total_rooms: 80,
      max_guest_capacity: 500,
      starting_price: 4500000,
      star_rating: 5,
      rating: 4.8,
      review_count: 187,
      amenities: ['Lake Views', 'Multiple Venues', 'ESPA Spa', 'Infinity Pool', 'Fine Dining'],
      hero_image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
      gallery_images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
      event_spaces: [
        { name: 'Grand Lawn', capacity: 500, type: 'outdoor', area_sqft: 15000 },
        { name: 'Ballroom', capacity: 300, type: 'indoor', area_sqft: 8000 }
      ],
      is_featured: true,
      is_verified: true,
      is_active: true
    },
    {
      destination_id: destMap.get('goa'),
      name: 'Taj Exotica Goa',
      slug: 'taj-exotica-goa',
      venue_type: 'resort',
      city: 'South Goa',
      state: 'Goa',
      tagline: 'Where the Sea Meets Luxury',
      description: 'Spread across 56 acres of lush gardens with a private beach, Taj Exotica is Goa\'s most prestigious address. The Mediterranean-styled architecture and legendary Taj hospitality create unforgettable weddings.',
      total_rooms: 140,
      max_guest_capacity: 500,
      starting_price: 4500000,
      star_rating: 5,
      rating: 4.9,
      review_count: 201,
      amenities: ['Private Beach', 'Golf Course', 'Jiva Spa', 'Multiple Pools', 'Water Sports'],
      hero_image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
      gallery_images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
      event_spaces: [
        { name: 'Beach Lawn', capacity: 500, type: 'outdoor', area_sqft: 25000 },
        { name: 'Grand Ballroom', capacity: 350, type: 'indoor', area_sqft: 10000 }
      ],
      is_featured: true,
      is_verified: true,
      is_active: true
    },
    {
      destination_id: destMap.get('jaipur'),
      name: 'Rambagh Palace',
      slug: 'rambagh-palace',
      venue_type: 'palace',
      city: 'Jaipur',
      state: 'Rajasthan',
      tagline: 'The Jewel of Jaipur',
      description: 'Once the residence of the Maharaja of Jaipur, Rambagh Palace is the gold standard for royal Indian weddings. The stunning Mughal gardens and ornate interiors create weddings truly fit for royalty.',
      total_rooms: 78,
      max_guest_capacity: 600,
      starting_price: 4000000,
      star_rating: 5,
      rating: 4.9,
      review_count: 223,
      amenities: ['Mughal Gardens', 'Polo Bar', 'Spa', 'Heritage Walks', 'Royal Experiences'],
      hero_image_url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200',
      gallery_images: ['https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800'],
      event_spaces: [
        { name: 'Mughal Gardens', capacity: 600, type: 'outdoor', area_sqft: 35000 },
        { name: 'Maharani Hall', capacity: 200, type: 'indoor', area_sqft: 5000 }
      ],
      is_featured: true,
      is_verified: true,
      is_active: true
    }
  ];

  for (const venue of venues) {
    if (!venue.destination_id) {
      console.log(`   ⚠️ Skipping ${venue.name} - no destination found`);
      continue;
    }

    const { data, error } = await supabase
      .from('venues')
      .upsert(venue, { onConflict: 'slug' })
      .select();

    if (error) {
      console.log(`   ❌ Failed to insert ${venue.name}: ${error.message}`);
    } else {
      console.log(`   ✅ ${venue.name} inserted/updated`);
    }
  }
}

async function main() {
  console.log('🚀 WedOS Database Setup Script');
  console.log('================================\n');

  const connected = await testConnection();

  if (!connected) {
    console.log('\n⚠️ Database tables need to be created first.');
    console.log('Please run the SQL schema in Supabase Dashboard SQL Editor:');
    console.log('  1. Go to https://supabase.com/dashboard');
    console.log('  2. Open your project');
    console.log('  3. Go to SQL Editor');
    console.log('  4. Paste contents of scripts/setup-database.sql');
    console.log('  5. Run the SQL');
    console.log('  6. Then paste contents of scripts/seed-data.sql');
    console.log('  7. Run the SQL again');
    console.log('\nAfter that, re-run this script to verify.');
    return;
  }

  // If connected, try to seed data
  await seedDestinations();
  await seedVenues();

  console.log('\n✅ Setup complete!');
}

main().catch(console.error);
