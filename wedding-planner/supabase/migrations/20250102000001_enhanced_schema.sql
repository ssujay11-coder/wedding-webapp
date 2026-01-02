-- Enhanced Schema for Elite Wedding Planner
-- Migration: 20250102000001

-- ============================================================================
-- 1. UPDATE LEADS TABLE WITH ADDITIONAL FIELDS
-- ============================================================================

-- Add new columns to existing leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS destination TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS service_type TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'wizard';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2. CREATE BLOG POSTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    read_time TEXT NOT NULL,
    publish_date DATE NOT NULL,
    author TEXT NOT NULL DEFAULT 'Elite Wedding Planning Team',
    keywords TEXT[] DEFAULT '{}',
    image_url TEXT,
    is_published BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- Create index for published posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, publish_date DESC);

-- Add trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 3. CREATE BLOG CATEGORIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    post_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial categories
INSERT INTO blog_categories (name, slug, description) VALUES
    ('Budget & Planning', 'budget-planning', 'Smart strategies for planning luxury weddings at any budget'),
    ('Planning & Timeline', 'planning-timeline', 'Step-by-step guides and timelines for wedding planning'),
    ('Destination Weddings', 'destination-weddings', 'Expert insights on destination wedding planning across India and Dubai'),
    ('Trends & Inspiration', 'trends-inspiration', 'Latest wedding trends and creative inspiration'),
    ('Planning & Vendors', 'planning-vendors', 'Guide to selecting and working with wedding vendors'),
    ('Design & Styling', 'design-styling', 'Wedding design concepts and styling ideas')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- 4. CREATE NEWSLETTER SUBSCRIBERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    source TEXT DEFAULT 'website',
    interests TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Create index for active subscribers
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(status) WHERE status = 'active';

-- ============================================================================
-- 5. CREATE CONTACT FORM SUBMISSIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    wedding_date DATE,
    destination TEXT,
    guest_count INTEGER,
    budget_range TEXT,
    service_type TEXT,
    message TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'archived')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    assigned_to TEXT,
    notes TEXT,
    follow_up_date DATE,
    source TEXT DEFAULT 'contact_form',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for filtering and sorting
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_priority ON contact_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);

-- Add trigger for updated_at
CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON contact_submissions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 6. CREATE TESTIMONIALS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    couple_names TEXT NOT NULL,
    wedding_date DATE,
    wedding_location TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    testimonial_text TEXT NOT NULL,
    quote_excerpt TEXT,
    featured_image_url TEXT,
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for published testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(is_published, display_order);

-- Add trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON testimonials
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 7. CREATE WEDDING GALLERIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS wedding_galleries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    couple_names TEXT NOT NULL,
    wedding_date DATE,
    location TEXT NOT NULL,
    venue TEXT,
    description TEXT,
    cover_image_url TEXT NOT NULL,
    gallery_images TEXT[] DEFAULT '{}',
    categories TEXT[] DEFAULT '{}',
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for published galleries
CREATE INDEX IF NOT EXISTS idx_galleries_published ON wedding_galleries(is_published, wedding_date DESC);

-- Add trigger for updated_at
CREATE TRIGGER update_wedding_galleries_updated_at
BEFORE UPDATE ON wedding_galleries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_galleries ENABLE ROW LEVEL SECURITY;

-- Public read access to published blog posts
CREATE POLICY "Public can view published blog posts" ON blog_posts
    FOR SELECT USING (is_published = true);

-- Public read access to blog categories
CREATE POLICY "Public can view blog categories" ON blog_categories
    FOR SELECT USING (true);

-- Public read access to published testimonials
CREATE POLICY "Public can view published testimonials" ON testimonials
    FOR SELECT USING (is_published = true);

-- Public read access to published galleries
CREATE POLICY "Public can view published galleries" ON wedding_galleries
    FOR SELECT USING (is_published = true);

-- Anyone can insert newsletter subscriptions
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- Anyone can insert contact submissions
CREATE POLICY "Anyone can submit contact form" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Anyone can insert leads
CREATE POLICY "Anyone can create leads" ON leads
    FOR INSERT WITH CHECK (true);

-- ============================================================================
-- 9. CREATE HELPFUL VIEWS
-- ============================================================================

-- View for active blog posts with category info
CREATE OR REPLACE VIEW active_blog_posts AS
SELECT
    bp.*,
    bc.name as category_name,
    bc.description as category_description
FROM blog_posts bp
LEFT JOIN blog_categories bc ON bp.category = bc.name
WHERE bp.is_published = true
ORDER BY bp.publish_date DESC;

-- View for lead analytics
CREATE OR REPLACE VIEW lead_stats AS
SELECT
    status,
    COUNT(*) as count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as this_week,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as this_month
FROM leads
GROUP BY status;

-- View for popular blog posts
CREATE OR REPLACE VIEW popular_blog_posts AS
SELECT
    title,
    slug,
    category,
    view_count,
    publish_date
FROM blog_posts
WHERE is_published = true
ORDER BY view_count DESC
LIMIT 10;

-- ============================================================================
-- 10. HELPER FUNCTIONS
-- ============================================================================

-- Function to increment blog post view count
CREATE OR REPLACE FUNCTION increment_blog_view_count(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE blog_posts
    SET view_count = view_count + 1
    WHERE slug = post_slug AND is_published = true;
END;
$$ LANGUAGE plpgsql;

-- Function to get category post count
CREATE OR REPLACE FUNCTION update_category_post_counts()
RETURNS VOID AS $$
BEGIN
    UPDATE blog_categories bc
    SET post_count = (
        SELECT COUNT(*)
        FROM blog_posts bp
        WHERE bp.category = bc.name AND bp.is_published = true
    );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Add migration tracking
CREATE TABLE IF NOT EXISTS schema_migrations (
    version TEXT PRIMARY KEY,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO schema_migrations (version) VALUES ('20250102000001')
ON CONFLICT (version) DO NOTHING;

-- Success message
SELECT 'Enhanced schema migration completed successfully!' as status;
