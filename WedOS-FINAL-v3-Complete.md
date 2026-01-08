# 🚀 WEDOS FINAL ULTIMATE PROMPT v3.0
# WORLD'S BEST INDIAN WEDDING PLATFORM
# RUN 100 ITERATIONS - NEVER STOP IMPROVING

---

# ⚠️ CRITICAL INSTRUCTIONS - READ FIRST

You are upgrading an EXISTING wedding webapp. DO NOT start from scratch.
The website already has landing pages for locations and venues - MAKE THEM 100X BETTER.

## YOUR OPERATING MODE
```
MODE: FULLY AUTONOMOUS - NO QUESTIONS, JUST BUILD
ITERATIONS: RUN 100 IMPROVEMENT CYCLES
TESTING: BROWSER TEST EVERY CHANGE
DATABASE: PUSH ALL CHANGES TO SUPABASE
IMAGES: FIX WRONG IMAGES (Udaipur has Delhi images - UNACCEPTABLE!)
PERFORMANCE: MUST HANDLE 10,000 CONCURRENT VISITORS
DESIGN: MOBILE-FIRST, LUXURY FEEL, EMOTIONAL COPY
```

---

# 🔐 CREDENTIALS

## Supabase
```
URL: https://pahtrfafjjbaxschhtdr.supabase.co
ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHRyZmFmampiYXhzY2hodGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNjk5NDksImV4cCI6MjA4Mjg0NTk0OX0.XIFVaysJoUxjyTPPeyODt549np_uc0sNqeis72076Ic
SERVICE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHRyZmFmampiYXhzY2hodGRyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzI2OTk0OSwiZXhwIjoyMDgyODQ1OTQ5fQ.MrMUUqqf5UXFNrKa8Ac4soIDv4svpMdw47tGXnwyBcc
```

## Admin Account (CREATE THIS!)
```
EMAIL: ssujay11@gmail.com
ROLE: super_admin
ACCESS: ALL user data, inquiries, reviews, analytics
```

---

# 📋 STEP-BY-STEP EXECUTION PLAN

## STEP 1: ANALYZE EXISTING CODEBASE (15 min)
```bash
# First, understand what exists
find . -type f -name "*.tsx" | head -100
find . -type f -name "*.ts" | head -50
cat package.json
ls -la src/app/
ls -la src/components/

# Check existing pages
ls -la src/app/destinations/ 2>/dev/null || echo "No destinations folder"
ls -la src/app/venues/ 2>/dev/null || echo "No venues folder"

# Check for existing data/content
find . -name "*.json" -type f | head -20
```

## STEP 2: FIX ENVIRONMENT & DEPENDENCIES (15 min)
```bash
# Ensure .env.local has correct values
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://pahtrfafjjbaxschhtdr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHRyZmFmampiYXhzY2hodGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNjk5NDksImV4cCI6MjA4Mjg0NTk0OX0.XIFVaysJoUxjyTPPeyODt549np_uc0sNqeis72076Ic
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHRyZmFmampiYXhzY2hodGRyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzI2OTk0OSwiZXhwIjoyMDgyODQ1OTQ5fQ.MrMUUqqf5UXFNrKa8Ac4soIDv4svpMdw47tGXnwyBcc
ADMIN_EMAIL=ssujay11@gmail.com
EOF

# Install any missing dependencies
npm install @supabase/supabase-js @supabase/ssr
npm install framer-motion
npm install react-hook-form @hookform/resolvers zod
npm install @tanstack/react-query
npm install lucide-react
npm install sonner
npm install date-fns
npm install sharp # For image optimization
```

## STEP 3: PUSH DATABASE SCHEMA TO SUPABASE (30 min)

Create file `scripts/setup-database.ts` and run it:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://pahtrfafjjbaxschhtdr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHRyZmFmampiYXhzY2hodGRyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzI2OTk0OSwiZXhwIjoyMDgyODQ1OTQ5fQ.MrMUUqqf5UXFNrKa8Ac4soIDv4svpMdw47tGXnwyBcc'
);

// Run the SQL schema...
```

---

# 🗄️ DATABASE SCHEMA (PUSH THIS TO SUPABASE!)

Run this SQL in Supabase SQL Editor:

```sql
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

-- Set admin for ssujay11@gmail.com
-- Will be done after user signs up

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
  wedding_type TEXT, -- 'destination', 'local', 'intimate'
  
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

CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_date ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_email ON inquiries(email);

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
  hero_title TEXT, -- Emotional marketing title
  hero_subtitle TEXT,
  description TEXT,
  long_description TEXT,
  
  -- CORRECT IMAGES FOR EACH DESTINATION
  hero_image_url TEXT,
  gallery_images TEXT[],
  thumbnail_url TEXT,
  
  -- Destination wedding specifics
  total_venues INT DEFAULT 0,
  total_rooms_available INT, -- Sum of all venue rooms
  total_banquet_capacity INT, -- Sum of all venue capacities
  
  -- Season
  best_season TEXT,
  best_months TEXT[],
  avoid_months TEXT[],
  weather_info TEXT,
  
  -- Budget
  avg_budget_min DECIMAL(14,2),
  avg_budget_max DECIMAL(14,2),
  budget_breakdown JSONB, -- {venue: 30%, catering: 25%, etc.}
  
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
  
  -- Marketing content (EMOTIONAL!)
  tagline TEXT, -- "Where Royal Dreams Come True"
  hero_title TEXT,
  description TEXT,
  long_description TEXT,
  usp TEXT, -- Unique selling proposition
  
  -- DESTINATION WEDDING SPECIFICS
  total_rooms INT, -- IMPORTANT: Total rooms available
  room_types JSONB, -- [{type: "Deluxe", count: 50, rate: 15000}, ...]
  total_indoor_capacity INT,
  total_outdoor_capacity INT,
  max_guest_capacity INT,
  
  -- Event spaces (DETAILED!)
  event_spaces JSONB DEFAULT '[]', 
  -- [{
  --   name: "Grand Ballroom",
  --   type: "indoor",
  --   capacity_theater: 500,
  --   capacity_banquet: 300,
  --   area_sqft: 8000,
  --   features: ["AC", "Stage", "Green Room"],
  --   images: ["url1", "url2"]
  -- }]
  
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
  
  -- Media (CORRECT IMAGES!)
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

CREATE INDEX idx_venues_destination ON venues(destination_id);
CREATE INDEX idx_venues_city ON venues(city);
CREATE INDEX idx_venues_rating ON venues(rating DESC);
CREATE INDEX idx_venues_price ON venues(starting_price);

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

CREATE INDEX idx_reviews_venue ON reviews(venue_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_rating ON reviews(rating DESC);

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
  event_type TEXT, -- 'wedding', 'sangeet', 'reception'
  notes TEXT,
  priority INT DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'shortlisted' CHECK (status IN ('shortlisted', 'contacted', 'visited', 'booked', 'rejected')),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shortlists_user ON shortlists(user_id);
CREATE UNIQUE INDEX idx_shortlists_unique ON shortlists(user_id, venue_id);

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

-- View for admin dashboard - all inquiries with stats
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

-- View for venue performance
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

-- =============================================
-- SEED DATA - DESTINATIONS WITH CORRECT IMAGES
-- =============================================

INSERT INTO destinations (name, slug, city, state, country, tagline, hero_title, description, hero_image_url, gallery_images, best_season, best_months, avg_budget_min, avg_budget_max, total_venues, is_featured, sort_order)
VALUES
-- UDAIPUR (CORRECT UDAIPUR IMAGES!)
('Udaipur', 'udaipur', 'Udaipur', 'Rajasthan', 'India',
 'The Venice of the East',
 'Where Royal Dreams Float on Shimmering Lakes',
 'Udaipur, the City of Lakes, is India''s most romantic wedding destination. With its magnificent palaces rising from crystal-clear lakes, heritage havelis adorned with intricate artwork, and the majestic Aravalli hills as backdrop, Udaipur offers a fairy-tale setting that has hosted royalty for centuries. Every sunset here paints the sky in hues of gold and rose, creating magical moments that last a lifetime.',
 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80', -- Lake Pichola, Udaipur
 ARRAY[
   'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
   'https://images.unsplash.com/photo-1585116938581-d3c4c7f91e7a?w=800', -- City Palace
   'https://images.unsplash.com/photo-1623874514711-0f321325f318?w=800', -- Udaipur Lake
   'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800'  -- Udaipur Palace
 ],
 'September - March',
 ARRAY['October', 'November', 'December', 'January', 'February'],
 2500000, 50000000, 32, true, 1),

-- GOA (CORRECT GOA IMAGES!)
('Goa', 'goa', 'Goa', 'Goa', 'India',
 'Beach Weddings & Bohemian Dreams',
 'Where the Ocean Whispers Your Love Story',
 'Goa is India''s most beloved beach destination for romantic weddings. With golden sandy beaches kissed by the Arabian Sea, Portuguese-influenced architecture, and a laid-back vibe that puts everyone at ease, Goa weddings are all about barefoot elegance and sunset magic. From intimate beach ceremonies to grand resort celebrations, Goa offers the perfect blend of fun and romance.',
 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=80', -- Goa Beach
 ARRAY[
   'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', -- Beach
   'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800', -- Beach sunset
   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'  -- Beach resort
 ],
 'October - March',
 ARRAY['November', 'December', 'January', 'February'],
 1500000, 15000000, 45, true, 2),

-- JAIPUR (CORRECT JAIPUR IMAGES!)
('Jaipur', 'jaipur', 'Jaipur', 'Rajasthan', 'India',
 'The Pink City of Grand Celebrations',
 'Where Every Wedding Becomes a Royal Affair',
 'Jaipur, the Pink City, is where Rajputana grandeur meets wedding magnificence. Ancient forts towering over the city, palaces that whisper tales of maharajas, and a vibrant culture that celebrates life in full color - Jaipur weddings are nothing short of spectacular. Here, tradition dances with luxury, creating celebrations that are talked about for generations.',
 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=80', -- Jaipur Palace
 ARRAY[
   'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
   'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800', -- Hawa Mahal
   'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800', -- Jaipur Fort
   'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800'  -- Jaipur City
 ],
 'October - March',
 ARRAY['October', 'November', 'December', 'January', 'February', 'March'],
 2000000, 30000000, 28, true, 3),

-- KERALA (CORRECT KERALA IMAGES!)
('Kerala', 'kerala', 'Kochi', 'Kerala', 'India',
 'God''s Own Country',
 'Where Nature Blesses Every Union',
 'Kerala offers a wedding experience unlike any other - serene backwaters reflecting coconut palms, lush tea estates carpeting rolling hills, and ancient temples that have witnessed love stories for millennia. A Kerala wedding is an immersion into natural beauty and cultural richness, where Ayurvedic traditions blend with heartfelt celebrations.',
 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=80', -- Kerala Backwaters
 ARRAY[
   'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
   'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800', -- Houseboat
   'https://images.unsplash.com/photo-1609340584046-bd2e22a24bc7?w=800', -- Tea Estate
   'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800'  -- Kerala Beach
 ],
 'September - May',
 ARRAY['December', 'January', 'February', 'March'],
 1200000, 10000000, 22, true, 4),

-- JODHPUR (CORRECT JODHPUR IMAGES!)
('Jodhpur', 'jodhpur', 'Jodhpur', 'Rajasthan', 'India',
 'The Blue City',
 'Where the Desert Meets Majestic Fortresses',
 'Jodhpur''s dramatic landscape of blue-washed houses beneath the mighty Mehrangarh Fort creates a wedding backdrop that seems straight out of a fantasy. The golden desert light, the imposing fortress walls, and the vibrant Marwari culture make Jodhpur weddings an unforgettable experience of power and beauty.',
 'https://images.unsplash.com/photo-1558431382-27f86c740660?w=1920&q=80', -- Mehrangarh Fort
 ARRAY[
   'https://images.unsplash.com/photo-1558431382-27f86c740660?w=800',
   'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800', -- Blue City
   'https://images.unsplash.com/photo-1624461700142-c8a5aa59c5a8?w=800', -- Jodhpur Palace
   'https://images.unsplash.com/photo-1598885159329-9377168ac375?w=800'  -- Jodhpur View
 ],
 'October - March',
 ARRAY['October', 'November', 'December', 'January', 'February'],
 2000000, 25000000, 18, true, 5),

-- MUMBAI
('Mumbai', 'mumbai', 'Mumbai', 'Maharashtra', 'India',
 'The City of Dreams',
 'Where Bollywood Glamour Meets Eternal Love',
 'Mumbai, India''s entertainment capital, brings Bollywood glamour to your wedding. From luxurious 5-star hotels overlooking the Arabian Sea to heritage venues that have hosted film royalty, Mumbai weddings are all about style, sophistication, and that unmistakable big-city energy.',
 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=80',
 ARRAY[
   'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800',
   'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800',
   'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800'
 ],
 'November - February',
 ARRAY['November', 'December', 'January', 'February'],
 2500000, 25000000, 35, true, 6),

-- DELHI
('Delhi', 'delhi', 'Delhi', 'Delhi', 'India',
 'The Heart of India',
 'Where Mughal Grandeur Meets Modern Luxury',
 'Delhi, India''s capital, offers an unmatched variety of wedding venues - from Mughal-era gardens and heritage mansions to ultra-modern luxury hotels. Delhi weddings are known for their grandeur, impeccable cuisine, and the perfect blend of tradition and contemporary style.',
 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&q=80',
 ARRAY[
   'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
   'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
   'https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?w=800'
 ],
 'October - March',
 ARRAY['November', 'December', 'January', 'February'],
 2000000, 30000000, 50, true, 7),

-- THAILAND
('Thailand', 'thailand', 'Phuket', NULL, 'Thailand',
 'Tropical Paradise',
 'Where Tropical Dreams Become Wedding Reality',
 'Thailand offers the perfect international destination wedding experience - pristine beaches, luxury resorts with world-class service, and a culture that warmly welcomes couples from around the world. From Phuket''s dramatic cliffs to Koh Samui''s serene beaches, Thailand weddings are pure tropical magic.',
 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1920&q=80',
 ARRAY[
   'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
   'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800',
   'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800'
 ],
 'November - April',
 ARRAY['December', 'January', 'February', 'March'],
 3000000, 25000000, 25, true, 10),

-- DUBAI
('Dubai', 'dubai', 'Dubai', NULL, 'UAE',
 'Ultra Luxury in the Desert',
 'Where Opulence Has No Limits',
 'Dubai represents the pinnacle of luxury weddings. Iconic skyscrapers, man-made islands, desert adventures, and the most luxurious hotels in the world create a wedding experience that''s truly extraordinary. For couples who want to make a statement, Dubai delivers beyond imagination.',
 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80',
 ARRAY[
   'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
   'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800',
   'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800'
 ],
 'October - April',
 ARRAY['November', 'December', 'January', 'February', 'March'],
 5000000, 100000000, 20, true, 11),

-- BALI
('Bali', 'bali', 'Bali', NULL, 'Indonesia',
 'Island of the Gods',
 'Where Spirituality Meets Paradise',
 'Bali offers a mystical wedding experience - ancient temples perched on cliff edges, rice terraces that glow golden at sunset, and a spiritual energy that blesses every union. Bali weddings combine natural beauty with deep cultural meaning, creating ceremonies that touch the soul.',
 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80',
 ARRAY[
   'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
   'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800',
   'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800'
 ],
 'April - October',
 ARRAY['May', 'June', 'July', 'August', 'September'],
 3500000, 30000000, 20, true, 12)

ON CONFLICT (slug) DO UPDATE SET
  hero_image_url = EXCLUDED.hero_image_url,
  gallery_images = EXCLUDED.gallery_images,
  description = EXCLUDED.description,
  hero_title = EXCLUDED.hero_title;

-- =============================================
-- SEED VENUES WITH CORRECT DETAILS
-- =============================================

INSERT INTO venues (
  destination_id, name, slug, venue_type, city, state, tagline, description,
  total_rooms, max_guest_capacity, starting_price, star_rating, rating, review_count,
  amenities, hero_image_url, gallery_images, event_spaces, is_featured, is_verified
)
SELECT 
  d.id,
  v.name, v.slug, v.venue_type, v.city, v.state, v.tagline, v.description,
  v.total_rooms, v.max_capacity, v.price, v.stars, v.rating, v.reviews,
  v.amenities, v.hero_image, v.gallery, v.spaces::jsonb, true, true
FROM destinations d
CROSS JOIN (VALUES
  -- UDAIPUR VENUES
  ('udaipur', 'Taj Lake Palace', 'taj-lake-palace', 'palace', 'Udaipur', 'Rajasthan',
   'A Dream Floating on Water',
   'Rising like a vision from the waters of Lake Pichola, Taj Lake Palace is the world''s most romantic hotel. This 18th-century marble marvel offers an experience that transcends luxury - it''s pure magic. Arriving by boat as the palace glows golden at sunset, you''ll understand why royalty chose this as their summer residence.',
   83, 250, 5000000, 5, 4.9, 234,
   ARRAY['Lake Views', 'Heritage Property', 'Jiva Spa', 'Boat Access', 'Fine Dining', 'Butler Service'],
   'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200',
   ARRAY['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', 'https://images.unsplash.com/photo-1585116938581-d3c4c7f91e7a?w=800'],
   '[{"name": "Mewar Terrace", "capacity": 150, "type": "outdoor", "area_sqft": 5000}, {"name": "Neel Kamal", "capacity": 80, "type": "indoor", "area_sqft": 3000}]'
  ),
  ('udaipur', 'The Leela Palace Udaipur', 'leela-palace-udaipur', 'hotel', 'Udaipur', 'Rajasthan',
   'Where Modern Royalty Resides',
   'Set on the serene banks of Lake Pichola with the majestic Aravalli mountains as backdrop, The Leela Palace Udaipur is a stunning interpretation of a grand Rajasthani palace. With multiple stunning venues, impeccable service, and breathtaking views from every corner, it''s perfect for couples who want grandeur without compromise.',
   80, 500, 4500000, 5, 4.8, 187,
   ARRAY['Lake Views', 'Multiple Venues', 'ESPA Spa', 'Infinity Pool', 'Fine Dining', 'Cooking Classes'],
   'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
   ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
   '[{"name": "Grand Lawn", "capacity": 500, "type": "outdoor", "area_sqft": 15000}, {"name": "Ballroom", "capacity": 300, "type": "indoor", "area_sqft": 8000}]'
  ),
  ('udaipur', 'Oberoi Udaivilas', 'oberoi-udaivilas', 'hotel', 'Udaipur', 'Rajasthan',
   'Timeless Elegance Personified',
   'Spread across 50 acres on the banks of Lake Pichola, Oberoi Udaivilas is a masterpiece of Mewari architecture. With private pools, traditional courtyards, and the legendary Oberoi service, every moment here feels like a celebration. The wedding venues offer views so stunning, they''ll leave your guests speechless.',
   87, 400, 5500000, 5, 4.9, 156,
   ARRAY['Private Pools', 'Lake Views', 'Spa', 'Organic Gardens', 'Wildlife Sanctuary'],
   'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
   ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
   '[{"name": "Chandni", "capacity": 400, "type": "outdoor", "area_sqft": 12000}, {"name": "Udai Mahal", "capacity": 200, "type": "indoor", "area_sqft": 6000}]'
  ),
  
  -- GOA VENUES
  ('goa', 'Alila Diwa Goa', 'alila-diwa-goa', 'resort', 'South Goa', 'Goa',
   'Bali-Inspired Serenity',
   'Nestled amidst lush paddy fields in peaceful South Goa, Alila Diwa brings the spirit of Bali to Indian shores. The resort''s contemporary architecture, with its clean lines and natural materials, creates a sophisticated yet relaxed setting for your celebration. Watch the sunset paint the paddy fields golden as you celebrate your love.',
   153, 450, 3500000, 5, 4.8, 143,
   ARRAY['Infinity Pool', 'Spa Alila', 'Multiple Restaurants', 'Beach Shuttle', 'Fitness Center', 'Yoga'],
   'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
   ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
   '[{"name": "Grand Lawn", "capacity": 450, "type": "outdoor", "area_sqft": 20000}, {"name": "Ballroom", "capacity": 200, "type": "indoor", "area_sqft": 5000}]'
  ),
  ('goa', 'Taj Exotica Goa', 'taj-exotica-goa', 'resort', 'South Goa', 'Goa',
   'Where the Sea Meets Luxury',
   'Spread across 56 acres of lush gardens with a private beach, Taj Exotica is Goa''s most prestigious address. The Mediterranean-styled architecture, barefoot luxury ethos, and legendary Taj hospitality create weddings that are both elegant and joyful. Your guests will talk about this celebration for years.',
   140, 500, 4500000, 5, 4.9, 201,
   ARRAY['Private Beach', 'Golf Course', 'Jiva Spa', 'Multiple Pools', 'Water Sports', 'Fine Dining'],
   'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
   ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
   '[{"name": "Beach Lawn", "capacity": 500, "type": "outdoor", "area_sqft": 25000}, {"name": "Grand Ballroom", "capacity": 350, "type": "indoor", "area_sqft": 10000}]'
  ),
  ('goa', 'W Goa', 'w-goa', 'resort', 'North Goa', 'Goa',
   'Vibrant. Bold. Unforgettable.',
   'W Goa brings its signature bold energy to India''s party capital. Contemporary design, stunning beach access, and a vibe that''s always celebration-ready make this perfect for couples who want their wedding to be an experience guests will never forget. When the sun sets, the party begins.',
   109, 350, 3000000, 5, 4.7, 112,
   ARRAY['Beach Access', 'Infinity Pool', 'AWAY Spa', 'Nightlife', 'DJ', 'WET Deck'],
   'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
   ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
   '[{"name": "WET Deck", "capacity": 200, "type": "outdoor", "area_sqft": 8000}, {"name": "Great Room", "capacity": 250, "type": "indoor", "area_sqft": 6000}]'
  ),
  
  -- JAIPUR VENUES
  ('jaipur', 'Rambagh Palace', 'rambagh-palace', 'palace', 'Jaipur', 'Rajasthan',
   'The Jewel of Jaipur',
   'Once the residence of the Maharaja of Jaipur, Rambagh Palace is the gold standard for royal Indian weddings. The stunning Mughal gardens, the ornate interiors, and the palpable sense of history create weddings that are truly fit for royalty. Every corner tells a story; let yours be the next chapter.',
   78, 600, 4000000, 5, 4.9, 223,
   ARRAY['Mughal Gardens', 'Polo Bar', 'Spa', 'Heritage Walks', 'Royal Experiences'],
   'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200',
   ARRAY['https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800'],
   '[{"name": "Mughal Gardens", "capacity": 600, "type": "outdoor", "area_sqft": 35000}, {"name": "Maharani Hall", "capacity": 200, "type": "indoor", "area_sqft": 5000}]'
  ),
  ('jaipur', 'Taj Jai Mahal Palace', 'taj-jai-mahal-palace', 'palace', 'Jaipur', 'Rajasthan',
   '18 Acres of Royal Gardens',
   'Set within 18 acres of beautifully manicured Mughal gardens, Taj Jai Mahal Palace is a 275-year-old heritage treasure. The sprawling lawns offer unlimited possibilities for grand celebrations, while the palace interiors transport you to an era of royal splendor.',
   100, 800, 3500000, 5, 4.8, 178,
   ARRAY['Mughal Gardens', 'Multiple Lawns', 'Spa', 'Heritage Property', 'Fine Dining'],
   'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200',
   ARRAY['https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800'],
   '[{"name": "Royal Lawn", "capacity": 800, "type": "outdoor", "area_sqft": 40000}, {"name": "Durbar Hall", "capacity": 300, "type": "indoor", "area_sqft": 8000}]'
  )
) AS v(dest_slug, name, slug, venue_type, city, state, tagline, description, total_rooms, max_capacity, price, stars, rating, reviews, amenities, hero_image, gallery, spaces)
WHERE d.slug = v.dest_slug
ON CONFLICT (slug) DO UPDATE SET
  hero_image_url = EXCLUDED.hero_image_url,
  gallery_images = EXCLUDED.gallery_images,
  description = EXCLUDED.description,
  total_rooms = EXCLUDED.total_rooms,
  event_spaces = EXCLUDED.event_spaces;

-- =============================================
-- SEED REALISTIC INDIAN REVIEWS
-- =============================================

INSERT INTO reviews (
  reviewer_name, reviewer_city, venue_id, review_type, rating, title, content,
  rating_venue, rating_food, rating_service, rating_value, rating_ambiance,
  pros, cons, wedding_date, wedding_type, guest_count, events_hosted, status
)
SELECT
  r.reviewer_name, r.reviewer_city, v.id, 'venue', r.rating, r.title, r.content,
  r.rating_venue, r.rating_food, r.rating_service, r.rating_value, r.rating_ambiance,
  r.pros, r.cons, r.wedding_date::date, r.wedding_type, r.guest_count, r.events_hosted, 'approved'
FROM venues v
CROSS JOIN (VALUES
  -- Taj Lake Palace Reviews
  ('taj-lake-palace', 'Priya & Rahul Sharma', 'Mumbai', 5, 'A Dream Wedding We''ll Never Forget',
   'From the moment we arrived by boat at sunset, we knew we had made the perfect choice. Taj Lake Palace exceeded every expectation. The staff remembered our guests'' names, the food was extraordinary, and the setting... words cannot describe watching the pheras with Lake Pichola shimmering behind us. Our parents cried happy tears. This wasn''t just a wedding; it was the beginning of our fairy tale.',
   5, 5, 5, 4, 5,
   ARRAY['Unmatched romantic setting', 'Impeccable service', 'Food was extraordinary', 'Staff went above and beyond'],
   ARRAY['Premium pricing (but worth every rupee)', 'Limited capacity for large weddings'],
   '2024-12-15', 'destination', 200, ARRAY['Mehendi', 'Sangeet', 'Wedding', 'Reception']),
   
  ('taj-lake-palace', 'Ananya & Vikram Malhotra', 'Delhi', 5, 'Pure Magic on the Lake',
   'We researched venues for 8 months, and nothing came close to Taj Lake Palace. The palace floating on the lake, the attention to detail, the way they handled 180 guests across 3 days - absolutely flawless. Our wedding planner said in 15 years, she''d never seen a venue execute so perfectly. The Mewar Terrace at night with the city lights reflecting on the water - our guests still message us about it!',
   5, 5, 5, 5, 5,
   ARRAY['Breathtaking venue', 'World-class execution', 'Memorable experience for guests', 'Professional team'],
   ARRAY['Book at least 12 months in advance'],
   '2024-11-20', 'destination', 180, ARRAY['Haldi', 'Wedding', 'Reception']),

  -- Leela Palace Reviews
  ('leela-palace-udaipur', 'Sneha & Arjun Kapoor', 'Bangalore', 5, 'Royal Treatment from Start to Finish',
   'The Leela Palace made us feel like royalty from our first site visit. The Grand Lawn with its lake views took our breath away. What impressed us most was how they handled our complex requirements - two different caterers, specific decor vendors, and a guest list that kept changing. Nothing was too much trouble. The in-house coordinator Priya was exceptional - she anticipated needs before we voiced them.',
   5, 5, 5, 4, 5,
   ARRAY['Stunning views', 'Multiple venue options', 'Flexible with vendors', 'Amazing coordinator'],
   ARRAY['Can feel busy during peak season'],
   '2024-02-10', 'destination', 350, ARRAY['Mehendi', 'Sangeet', 'Wedding', 'Reception']),
   
  ('leela-palace-udaipur', 'Kavya & Rohan Singhania', 'Kolkata', 4, 'Beautiful Venue, Minor Hiccups',
   'The Leela Palace is undeniably beautiful. The Aravalli backdrop during our pheras was perfect. The rooms are spacious and our guests loved the spa. Food quality was excellent with both Indian and continental options. We had a small issue with the sound system during sangeet which took 30 mins to fix, but the team handled it professionally. Overall, a wonderful experience.',
   5, 4, 4, 4, 5,
   ARRAY['Gorgeous setting', 'Comfortable rooms', 'Good food variety', 'Professional staff'],
   ARRAY['Technical issues during events', 'Some coordination gaps'],
   '2024-01-25', 'destination', 280, ARRAY['Mehendi', 'Sangeet', 'Wedding']),

  -- Alila Diwa Reviews
  ('alila-diwa-goa', 'Meera & Sameer Joshi', 'Pune', 5, 'Intimate Perfection in the Paddy Fields',
   'We wanted something different from typical beach weddings, and Alila Diwa delivered beyond imagination. The Balinese architecture, the serene paddy field views, the exceptional food - everything was perfect for our 150-guest celebration. The infinity pool party on day 2 was the highlight! Staff was incredibly warm and helpful. The only thing to note - it''s not beachfront, but honestly, the paddy field sunsets were more magical.',
   5, 5, 5, 5, 5,
   ARRAY['Unique setting', 'Outstanding food', 'Peaceful atmosphere', 'Warm hospitality'],
   ARRAY['Not directly on beach', '10 PM music curfew outdoors'],
   '2024-03-08', 'destination', 150, ARRAY['Pool Party', 'Sangeet', 'Wedding', 'Brunch']),
   
  ('alila-diwa-goa', 'Tanya & Nikhil Reddy', 'Hyderabad', 5, 'The Perfect Goa Wedding',
   'Alila Diwa was recommended by friends and it exceeded all expectations. The Spa Alila treatments for our bridal party, the delicious Goan cuisine, the helpful staff who arranged everything from transfers to local experiences - we couldn''t have asked for more. Our parents, who were initially skeptical about a Goa wedding, now keep telling their friends about it!',
   5, 5, 5, 5, 5,
   ARRAY['Excellent spa', 'Amazing Goan food', 'Helpful with local arrangements', 'Beautiful property'],
   ARRAY['Premium pricing for Goa'],
   '2024-02-28', 'destination', 200, ARRAY['Mehendi', 'Sangeet', 'Wedding', 'Reception']),

  -- Taj Exotica Reviews
  ('taj-exotica-goa', 'Aisha & Kabir Khanna', 'Delhi', 5, 'Beach Wedding Dreams Come True',
   'We dreamed of a sunset beach wedding and Taj Exotica made it magical. The private beach, the 56-acre property, the Jiva Spa pre-wedding pampering - every detail was perfect. Our 400 guests had the time of their lives. The golf course sangeet was unique and memorable. Yes, it''s expensive, but for the experience and memories, it''s worth every penny.',
   5, 5, 5, 4, 5,
   ARRAY['Private beach', 'Massive property', 'Multiple unique venues', 'Taj service standard'],
   ARRAY['Premium pricing', 'Lots of walking on property'],
   '2024-01-12', 'destination', 400, ARRAY['Mehendi', 'Sangeet', 'Wedding', 'Reception', 'Brunch']),

  -- Rambagh Palace Reviews
  ('rambagh-palace', 'Ishani & Aditya Birla', 'Mumbai', 5, 'A Wedding Fit for Royalty',
   'Rambagh Palace isn''t just a venue; it''s an experience of royal India. Walking through the same halls where maharajas celebrated, hosting our sangeet in the stunning Mughal gardens, having our pheras in the most ornate setting imaginable - it was surreal. The staff treats you like royalty. Our NRI relatives said they''d never experienced anything like this anywhere in the world.',
   5, 5, 5, 4, 5,
   ARRAY['Unmatched heritage', 'Stunning gardens', 'Royal experience', 'Excellent staff'],
   ARRAY['Traditional setup may limit modern decor', 'High pricing'],
   '2024-12-05', 'destination', 500, ARRAY['Mehendi', 'Sangeet', 'Wedding', 'Reception']),
   
  ('rambagh-palace', 'Riya & Aryan Mehta', 'Ahmedabad', 5, 'History Meets Celebration',
   'Getting married at Rambagh Palace was our dream, and reality exceeded the dream. The history you feel walking through the palace, the impeccable Taj service, the stunning photographs we got - everything was perfect. The Polo Bar cocktail night was a hit! Our only advice: book early (we booked 14 months ahead) and work with their recommended planners for smoothest execution.',
   5, 5, 5, 4, 5,
   ARRAY['Historical significance', 'Beautiful photo opportunities', 'Excellent coordination', 'Memorable cocktail venues'],
   ARRAY['Need to book very early', 'Heritage rules for some decorations'],
   '2024-11-28', 'destination', 350, ARRAY['Cocktail', 'Sangeet', 'Wedding', 'Reception']),

  -- W Goa Reviews
  ('w-goa', 'Zara & Karan Malhotra', 'Mumbai', 4, 'Party Wedding Paradise',
   'If you want a fun, young, energetic wedding vibe - W Goa is your place. The WET deck party, the incredible DJ setup, the trendy rooms - our guests (average age 30) absolutely loved it. The vibe is more party than traditional, which suited us perfectly. The beach access is great. Service was good but not quite at Taj level. Perfect for couples who prioritize fun over formality.',
   4, 4, 4, 4, 5,
   ARRAY['Amazing party venues', 'Great vibe', 'Beautiful beach', 'Trendy property'],
   ARRAY['Not for traditional families', 'Service good but not exceptional', 'Can be loud'],
   '2024-03-15', 'destination', 250, ARRAY['Pool Party', 'Sangeet', 'Wedding', 'After Party'])
   
) AS r(venue_slug, reviewer_name, reviewer_city, rating, title, content, rating_venue, rating_food, rating_service, rating_value, rating_ambiance, pros, cons, wedding_date, wedding_type, guest_count, events_hosted)
WHERE v.slug = r.venue_slug
ON CONFLICT DO NOTHING;

-- Update venue review counts
UPDATE venues SET 
  review_count = (SELECT COUNT(*) FROM reviews WHERE venue_id = venues.id AND status = 'approved'),
  rating = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE venue_id = venues.id AND status = 'approved');

-- =============================================
-- SEED WEDDING PLANNER REVIEWS
-- =============================================

INSERT INTO reviews (
  reviewer_name, reviewer_city, review_type, rating, title, content,
  pros, cons, wedding_date, wedding_type, guest_count, status
)
VALUES
('Neha & Vivek Agarwal', 'Mumbai', 'planner', 5, 'Elite Wedding Planner Made Our Dream Wedding Possible',
 'We were overwhelmed with planning our destination wedding in Udaipur until we found Elite Wedding Planner. Sujay and his team took over everything - venue negotiations, vendor coordination, guest management, decor conceptualization - and executed flawlessly. They saved us at least 15% on vendors through their relationships. The day-of coordination was impeccable. Our families had zero stress. Worth every rupee of their fee.',
 ARRAY['End-to-end management', 'Strong vendor relationships', 'Budget optimization', 'Stress-free execution'],
 ARRAY['Premium pricing (but justified)'],
 '2024-12-10', 'destination', 300, 'approved'),

('Aditi & Rajesh Sharma', 'Delhi', 'planner', 5, 'Transformed Our Vision Into Reality',
 'When we first met Elite Wedding Planner, we had a Pinterest board of dreams and a realistic budget. They not only matched our vision but elevated it. The 4-day Jaipur wedding they created was featured in a wedding magazine! Their attention to detail - from the custom welcome boxes to the synchronized fireworks - was extraordinary. They managed 450 guests like clockwork.',
 ARRAY['Creative excellence', 'Flawless execution', 'Handled large guest list', 'Magazine-worthy design'],
 ARRAY['Book well in advance'],
 '2024-11-22', 'destination', 450, 'approved'),

('Pooja & Amit Desai', 'Bangalore', 'planner', 5, 'Best Decision We Made for Our Wedding',
 'As a couple working demanding jobs in tech, we had zero time for wedding planning. Elite Wedding Planner became our wedding planning partners. Weekly updates, detailed timelines, vendor shortlists with pros/cons, budget tracking spreadsheets - they were more organized than our product launches! The Goa wedding was everything we wanted and more. Our guests are still talking about the experiences they curated.',
 ARRAY['Professional project management', 'Detailed communication', 'Curated experiences', 'Tech-savvy approach'],
 ARRAY['None that we can think of'],
 '2024-02-15', 'destination', 180, 'approved'),

('Simran & Jai Singh', 'Jaipur', 'planner', 5, 'Local Expertise with International Standards',
 'Being from Jaipur, we know the venues and vendors well. Yet Elite Wedding Planner brought insights and relationships we didn''t have. They got us dates at Rambagh Palace during peak season! Their design team created a look that honored our heritage while feeling fresh and modern. The coordination between 12 different vendors was seamless. Highly recommend for any Rajasthan wedding.',
 ARRAY['Deep local knowledge', 'Strong relationships', 'Beautiful design aesthetic', 'Seamless coordination'],
 ARRAY['Busy during wedding season'],
 '2024-01-08', 'local', 500, 'approved'),

('Dia & Varun Khanna', 'Dubai', 'planner', 5, 'Managed Our NRI Wedding Perfectly',
 'Planning a wedding in India from Dubai seemed daunting until we engaged Elite Wedding Planner. They became our eyes, ears, and hands on ground. Video calls for venue tours, detailed documentation, handling everything from invitations to return gifts - they made distance irrelevant. The Kerala wedding they planned was a perfect blend of traditions from both our families. Our relatives from 8 countries were impressed!',
 ARRAY['Perfect for NRI couples', 'Excellent virtual coordination', 'Cultural sensitivity', 'Guest management'],
 ARRAY['Time zone differences required flexibility'],
 '2024-03-01', 'destination', 250, 'approved');

COMMIT;
```

---

# 🎨 DESIGN & COPY GUIDELINES

## Emotional Headlines (Use These!)

**For Destinations:**
- Udaipur: "Where Royal Dreams Float on Shimmering Lakes"
- Goa: "Where the Ocean Whispers Your Love Story"  
- Jaipur: "Where Every Wedding Becomes a Royal Affair"
- Kerala: "Where Nature Blesses Every Union"

**For Venues:**
- "A Dream Floating on Water" (Taj Lake Palace)
- "Where Modern Royalty Resides" (Leela Palace)
- "Bali-Inspired Serenity" (Alila Diwa)

**For CTAs:**
- "Begin Your Love Story" (not "Submit")
- "Discover Your Dream Venue" (not "Search")
- "Share Your Vision With Us" (not "Contact")
- "Join Our Wedding Journey" (not "Sign Up")

## Indian Touch
- Use "Shaadi" alongside "Wedding" in titles
- Reference traditions: Mehendi, Sangeet, Haldi, Pheras
- Indian couple names in testimonials
- Rupee symbol (₹) not USD
- Cities: Mumbai, Delhi, Bangalore (not Western cities)

---

# 🔧 SKILLS & PLUGINS TO USE

## For Claude Code, read these skill files FIRST:
```bash
cat /mnt/skills/public/frontend-design/SKILL.md  # For beautiful UI
cat /mnt/skills/public/docx/SKILL.md             # For documentation
cat /mnt/skills/examples/web-artifacts-builder/SKILL.md  # For complex components
```

## NPM Packages to Install:
```bash
npm install framer-motion          # Animations
npm install embla-carousel-react   # Carousels
npm install react-intersection-observer  # Scroll effects
npm install @tanstack/react-query  # Data fetching
npm install sharp                  # Image optimization
npm install react-hot-toast        # Notifications
npm install react-hook-form zod    # Forms
npm install @radix-ui/react-dialog # Modals
npm install lucide-react           # Icons
```

---

# 🏃 EXECUTION - RUN 100 ITERATIONS

```
FOR iteration IN 1..100:
    
    1. CHECK CURRENT STATE
       - Run npm run dev
       - Open browser, test pages
       - Identify biggest issue
    
    2. FIX/IMPROVE ONE THING
       - Fix wrong images
       - Improve page speed
       - Better mobile layout
       - Add missing feature
       - Improve copy
       - Fix form submission
       - Add loading states
       - Better animations
    
    3. TEST IN BROWSER
       - Does it work?
       - Does it look good?
       - Is it fast?
       - Mobile responsive?
    
    4. IF ERROR:
       - Fix immediately
       - Don't move on until fixed
    
    5. COMMIT PROGRESS
       - Log what was done
       - Move to next iteration
    
    NEVER STOP UNTIL 100 ITERATIONS COMPLETE
```

## Priority Order for Improvements:
1. Fix wrong images (Udaipur has Delhi images - CRITICAL!)
2. Make forms work (inquiries save to Supabase)
3. Create admin dashboard for ssujay11@gmail.com
4. Add review submission functionality
5. Add venue shortlisting for users
6. Improve page load speed
7. Better mobile design
8. Add emotional copy
9. Improve SEO
10. Add more venues and reviews

---

# ✅ SUCCESS CRITERIA

After 100 iterations, the website MUST have:

- [ ] All destinations have CORRECT images
- [ ] All venues have CORRECT images
- [ ] Inquiry forms save to Supabase
- [ ] Admin dashboard works at /admin for ssujay11@gmail.com
- [ ] Users can submit reviews
- [ ] Users can shortlist venues
- [ ] Page load time < 2 seconds
- [ ] Mobile score > 90 on Lighthouse
- [ ] All forms have validation
- [ ] Beautiful, emotional copy
- [ ] Realistic Indian reviews seeded
- [ ] 10,000 concurrent visitor capable

---

# 🚀 START NOW!

```bash
# Step 1: Check what exists
ls -la
npm run dev

# Step 2: Start improving
# Fix the most critical issue first
# Test in browser
# Move to next issue
# Repeat 100 times

# NEVER STOP. MAKE IT WORLD-CLASS.
```

GO BUILD THE WORLD'S BEST INDIAN WEDDING PLATFORM! 🎊💒✨
