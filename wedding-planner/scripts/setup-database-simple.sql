-- =============================================
-- STEP 1: Enable extensions
-- =============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- STEP 2: Create Inquiries Table (no dependencies)
-- =============================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_type TEXT,
  source_page TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  partner1_name TEXT,
  partner2_name TEXT,
  wedding_date DATE,
  wedding_city TEXT,
  guest_count INT,
  budget_range TEXT,
  message TEXT,
  services_needed TEXT[],
  status TEXT DEFAULT 'new',
  priority TEXT DEFAULT 'normal',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- STEP 3: Create Destinations Table
-- =============================================
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT DEFAULT 'India',
  tagline TEXT,
  description TEXT,
  hero_image_url TEXT,
  gallery_images TEXT[],
  total_venues INT DEFAULT 0,
  best_season TEXT,
  best_months TEXT[],
  nearest_airport TEXT,
  highlights TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- STEP 4: Create Venues Table
-- =============================================
CREATE TABLE IF NOT EXISTS venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID REFERENCES destinations(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  venue_type TEXT,
  star_rating INT,
  address TEXT,
  city TEXT NOT NULL,
  state TEXT,
  description TEXT,
  total_rooms INT,
  max_guest_capacity INT,
  starting_price DECIMAL(14,2),
  amenities TEXT[],
  hero_image_url TEXT,
  gallery_images TEXT[],
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INT DEFAULT 0,
  contact_email TEXT,
  contact_phone TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  view_count INT DEFAULT 0,
  inquiry_count INT DEFAULT 0,
  shortlist_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- STEP 5: Create Reviews Table (no user reference)
-- =============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT,
  reviewer_city TEXT,
  venue_id UUID REFERENCES venues(id),
  destination_id UUID REFERENCES destinations(id),
  review_type TEXT DEFAULT 'venue',
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT NOT NULL,
  rating_venue INT,
  rating_food INT,
  rating_service INT,
  rating_value INT,
  rating_ambiance INT,
  pros TEXT[],
  cons TEXT[],
  wedding_date DATE,
  wedding_type TEXT,
  guest_count INT,
  events_hosted TEXT[],
  photos TEXT[],
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- STEP 6: Create Shortlists Table (simplified - no user reference)
-- =============================================
CREATE TABLE IF NOT EXISTS shortlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  venue_id UUID REFERENCES venues(id),
  event_type TEXT,
  notes TEXT,
  status TEXT DEFAULT 'shortlisted',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- STEP 7: Create Indexes
-- =============================================
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_date ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_venues_city ON venues(city);
CREATE INDEX IF NOT EXISTS idx_venues_rating ON venues(rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_venue ON reviews(venue_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_shortlists_user ON shortlists(user_id);

-- =============================================
-- STEP 8: Enable RLS but allow public access
-- =============================================
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlists ENABLE ROW LEVEL SECURITY;

-- Public can read destinations and venues
CREATE POLICY "Public read destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Public read venues" ON venues FOR SELECT USING (true);
CREATE POLICY "Public read approved reviews" ON reviews FOR SELECT USING (status = 'approved');

-- Anyone can insert
CREATE POLICY "Public submit inquiry" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public submit review" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public manage shortlists" ON shortlists FOR ALL USING (true);

-- Admin can do everything (using service role key)
CREATE POLICY "Service role full access inquiries" ON inquiries FOR ALL USING (true);
CREATE POLICY "Service role full access reviews" ON reviews FOR ALL USING (true);
