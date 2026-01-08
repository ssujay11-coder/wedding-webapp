import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: Request) {
  // Verify admin key
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${supabaseServiceKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
      hero_image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80',
      gallery_images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
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

  try {
    // Try to insert destinations
    const { data, error } = await supabase
      .from('destinations')
      .upsert(destinations, { onConflict: 'slug' })
      .select();

    if (error) {
      return NextResponse.json({
        error: error.message,
        hint: 'Tables may not exist. Please run the SQL schema in Supabase Dashboard first.',
        sqlFile: 'scripts/setup-database.sql'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Destinations seeded successfully',
      count: data?.length
    });
  } catch (err) {
    return NextResponse.json({
      error: String(err),
      hint: 'Database initialization failed'
    }, { status: 500 });
  }
}
