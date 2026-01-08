-- =============================================
-- WEDOS DATABASE v3.0 - COMPLETE SCHEMA
-- =============================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =============================================
-- ADMIN & USER TABLES
-- =============================================

-- Profiles with admin support
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'couple', 'vendor', 'venue', 'admin', 'super_admin')),
  is_admin BOOLEAN DEFAULT false,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INQUIRY & LEADS TABLE (ADMIN ACCESS)
-- =============================================

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Source tracking
  source_type TEXT CHECK (source_type IN ('venue', 'vendor', 'destination', 'contact', 'homepage', 'landing_page')),
  source_page TEXT,
  source_url TEXT,

  -- Contact info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,

  -- Wedding details
  partner1_name TEXT,
  partner2_name TEXT,
  wedding_date DATE,
  flexible_dates BOOLEAN DEFAULT false,
  wedding_city TEXT,
  guest_count INT,
  num_events INT,
  wedding_type TEXT,

  -- Budget
  budget_range TEXT,
  budget_amount DECIMAL(14,2),

  -- Requirements
  message TEXT,
  services_needed TEXT[],
  venues_interested TEXT[],

  -- Status for admin
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'won', 'lost', 'spam')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  assigned_to TEXT,

  -- Follow up
  notes TEXT,
  follow_up_date DATE,
  last_contacted_at TIMESTAMPTZ,

  -- UTM tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  -- Metadata
  ip_address TEXT,
  user_agent TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_date ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);

-- =============================================
-- DESTINATIONS WITH CORRECT IMAGES
-- =============================================

CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT DEFAULT 'India',

  -- Content
  tagline TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  description TEXT,
  long_description TEXT,

  -- CORRECT IMAGES FOR EACH DESTINATION
  hero_image_url TEXT,
  gallery_images TEXT[],
  thumbnail_url TEXT,

  -- Destination wedding specifics
  total_venues INT DEFAULT 0,
  total_rooms_available INT,
  total_banquet_capacity INT,

  -- Season
  best_season TEXT,
  best_months TEXT[],
  avoid_months TEXT[],
  weather_info TEXT,

  -- Budget
  avg_budget_min DECIMAL(14,2),
  avg_budget_max DECIMAL(14,2),
  budget_breakdown JSONB,

  -- Logistics
  nearest_airport TEXT,
  airport_code TEXT,
  distance_from_airport TEXT,
  how_to_reach TEXT,
  local_transport TEXT,

  -- Highlights
  highlights TEXT[],
  unique_experiences TEXT[],
  considerations TEXT[],
  local_cuisine TEXT[],
  shopping_areas TEXT[],

  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],

  -- FAQ for rich snippets
  faq JSONB DEFAULT '[]',

  -- Status
  is_featured BOOLEAN DEFAULT false,
  is_international BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- VENUES WITH COMPLETE DETAILS
-- =============================================

CREATE TABLE IF NOT EXISTS venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID REFERENCES destinations(id),

  -- Basic
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  venue_type TEXT,
  star_rating INT CHECK (star_rating >= 1 AND star_rating <= 5),

  -- Location
  address TEXT,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT DEFAULT 'India',
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  google_maps_url TEXT,

  -- Marketing content
  tagline TEXT,
  hero_title TEXT,
  description TEXT,
  long_description TEXT,
  usp TEXT,

  -- DESTINATION WEDDING SPECIFICS
  total_rooms INT,
  room_types JSONB,
  total_indoor_capacity INT,
  total_outdoor_capacity INT,
  max_guest_capacity INT,

  -- Event spaces
  event_spaces JSONB DEFAULT '[]',

  -- Pricing
  starting_price DECIMAL(14,2),
  price_per_plate_veg DECIMAL(10,2),
  price_per_plate_nonveg DECIMAL(10,2),
  room_rate_min DECIMAL(10,2),
  room_rate_max DECIMAL(10,2),
  rental_per_day DECIMAL(14,2),
  price_notes TEXT,

  -- Features
  amenities TEXT[],
  cuisine_types TEXT[],
  alcohol_policy TEXT,
  music_policy TEXT,
  decor_policy TEXT,
  outside_catering BOOLEAN DEFAULT false,
  outside_decor BOOLEAN DEFAULT true,
  parking_capacity INT,
  valet_parking BOOLEAN DEFAULT false,
  helipad BOOLEAN DEFAULT false,

  -- Media
  hero_image_url TEXT,
  gallery_images TEXT[],
  video_url TEXT,
  virtual_tour_url TEXT,
  floor_plans TEXT[],

  -- Ratings & Reviews
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INT DEFAULT 0,

  -- Contact
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website_url TEXT,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  -- Status
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,

  -- Analytics
  view_count INT DEFAULT 0,
  inquiry_count INT DEFAULT 0,
  shortlist_count INT DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_venues_destination ON venues(destination_id);
CREATE INDEX IF NOT EXISTS idx_venues_city ON venues(city);
CREATE INDEX IF NOT EXISTS idx_venues_rating ON venues(rating DESC);
CREATE INDEX IF NOT EXISTS idx_venues_price ON venues(starting_price);

-- =============================================
-- REVIEWS (USER GENERATED)
-- =============================================

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Who is reviewing
  user_id UUID REFERENCES profiles(id),
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT,
  reviewer_city TEXT,
  reviewer_avatar TEXT,
  is_verified BOOLEAN DEFAULT false,

  -- What is being reviewed
  venue_id UUID REFERENCES venues(id),
  destination_id UUID REFERENCES destinations(id),
  review_type TEXT CHECK (review_type IN ('venue', 'destination', 'planner', 'vendor')),

  -- Review content
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT NOT NULL,

  -- Detailed ratings
  rating_venue INT CHECK (rating_venue >= 1 AND rating_venue <= 5),
  rating_food INT CHECK (rating_food >= 1 AND rating_food <= 5),
  rating_service INT CHECK (rating_service >= 1 AND rating_service <= 5),
  rating_value INT CHECK (rating_value >= 1 AND rating_value <= 5),
  rating_ambiance INT CHECK (rating_ambiance >= 1 AND rating_ambiance <= 5),

  -- Pros/Cons
  pros TEXT[],
  cons TEXT[],

  -- Wedding context
  wedding_date DATE,
  wedding_type TEXT,
  guest_count INT,
  events_hosted TEXT[],
  budget_spent TEXT,

  -- Media
  photos TEXT[],

  -- Engagement
  helpful_count INT DEFAULT 0,

  -- Admin moderation
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  admin_notes TEXT,

  -- Response from venue
  owner_response TEXT,
  owner_responded_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_venue ON reviews(venue_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating DESC);

-- =============================================
-- USER SHORTLISTS
-- =============================================

CREATE TABLE IF NOT EXISTS shortlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- What is shortlisted
  venue_id UUID REFERENCES venues(id),
  vendor_id UUID,

  -- Context
  event_type TEXT,
  notes TEXT,
  priority INT DEFAULT 0,

  -- Status
  status TEXT DEFAULT 'shortlisted' CHECK (status IN ('shortlisted', 'contacted', 'visited', 'booked', 'rejected')),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_shortlists_user ON shortlists(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_shortlists_unique ON shortlists(user_id, venue_id);

-- =============================================
-- WEDDINGS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS weddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- Couple info
  partner1_name TEXT NOT NULL,
  partner2_name TEXT NOT NULL,

  -- Wedding details
  wedding_date DATE,
  venue_city TEXT,
  estimated_guests INT,
  budget_total DECIMAL(14,2),

  -- Status
  status TEXT DEFAULT 'planning',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ADMIN DASHBOARD VIEWS
-- =============================================

CREATE OR REPLACE VIEW admin_inquiry_stats AS
SELECT
  COUNT(*) as total_inquiries,
  COUNT(*) FILTER (WHERE status = 'new') as new_inquiries,
  COUNT(*) FILTER (WHERE status = 'contacted') as contacted,
  COUNT(*) FILTER (WHERE status = 'qualified') as qualified,
  COUNT(*) FILTER (WHERE status = 'won') as won,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as last_7_days,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as last_30_days
FROM inquiries;

CREATE OR REPLACE VIEW venue_performance AS
SELECT
  v.id,
  v.name,
  v.city,
  v.view_count,
  v.inquiry_count,
  v.shortlist_count,
  v.rating,
  v.review_count,
  COUNT(DISTINCT r.id) as total_reviews,
  COUNT(DISTINCT s.id) as total_shortlists
FROM venues v
LEFT JOIN reviews r ON r.venue_id = v.id AND r.status = 'approved'
LEFT JOIN shortlists s ON s.venue_id = v.id
GROUP BY v.id;

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read destinations" ON destinations;
DROP POLICY IF EXISTS "Public read venues" ON venues;
DROP POLICY IF EXISTS "Public read approved reviews" ON reviews;
DROP POLICY IF EXISTS "Users own profile" ON profiles;
DROP POLICY IF EXISTS "Users own shortlists" ON shortlists;
DROP POLICY IF EXISTS "Users own weddings" ON weddings;
DROP POLICY IF EXISTS "Public submit inquiry" ON inquiries;
DROP POLICY IF EXISTS "Public submit review" ON reviews;
DROP POLICY IF EXISTS "Admin read all inquiries" ON inquiries;
DROP POLICY IF EXISTS "Admin update inquiries" ON inquiries;
DROP POLICY IF EXISTS "Admin read all reviews" ON reviews;

-- Public read for destinations and venues
CREATE POLICY "Public read destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Public read venues" ON venues FOR SELECT USING (is_active = true);
CREATE POLICY "Public read approved reviews" ON reviews FOR SELECT USING (status = 'approved');

-- Users can manage their own data
CREATE POLICY "Users own profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users own shortlists" ON shortlists FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own weddings" ON weddings FOR ALL USING (auth.uid() = user_id);

-- Anyone can submit inquiries and reviews
CREATE POLICY "Public submit inquiry" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public submit review" ON reviews FOR INSERT WITH CHECK (true);

-- Admin access (super_admin can see everything)
CREATE POLICY "Admin read all inquiries" ON inquiries FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));
CREATE POLICY "Admin update inquiries" ON inquiries FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));
CREATE POLICY "Admin read all reviews" ON reviews FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to make user admin
CREATE OR REPLACE FUNCTION make_admin(user_email TEXT)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET role = 'super_admin', is_admin = true
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_venue_views(venue_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE venues SET view_count = view_count + 1 WHERE slug = venue_slug;
END;
$$ LANGUAGE plpgsql;

-- Function to increment shortlist count
CREATE OR REPLACE FUNCTION increment_shortlist_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE venues SET shortlist_count = shortlist_count + 1 WHERE id = NEW.venue_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_shortlist_created ON shortlists;
CREATE TRIGGER on_shortlist_created
  AFTER INSERT ON shortlists
  FOR EACH ROW EXECUTE FUNCTION increment_shortlist_count();

-- Update review stats on venue
CREATE OR REPLACE FUNCTION update_venue_review_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE venues SET
    review_count = (SELECT COUNT(*) FROM reviews WHERE venue_id = NEW.venue_id AND status = 'approved'),
    rating = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE venue_id = NEW.venue_id AND status = 'approved')
  WHERE id = NEW.venue_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_review_change ON reviews;
CREATE TRIGGER on_review_change
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_venue_review_stats();

-- Handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'avatar_url'
  );

  -- Auto-make ssujay11@gmail.com super admin
  IF NEW.email = 'ssujay11@gmail.com' THEN
    UPDATE profiles SET role = 'super_admin', is_admin = true WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
