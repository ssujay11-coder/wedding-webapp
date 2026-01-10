-- Admin Dashboard V2: Global Settings and Enhanced CMS
-- This migration adds global settings for site-wide editable content

-- Global Settings Table
CREATE TABLE IF NOT EXISTS global_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL DEFAULT '{}',
    category TEXT NOT NULL DEFAULT 'general',
    label TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_global_settings_key ON global_settings(key);
CREATE INDEX IF NOT EXISTS idx_global_settings_category ON global_settings(category);

-- Enable RLS
ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;

-- Public read access (for frontend to fetch settings)
CREATE POLICY "Public can read global settings"
    ON global_settings FOR SELECT
    USING (true);

-- Only authenticated admins can modify
CREATE POLICY "Admins can modify global settings"
    ON global_settings FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Seed initial settings
INSERT INTO global_settings (key, category, label, description, value) VALUES
(
    'site_stats',
    'stats',
    'Site Statistics',
    'Key business metrics displayed across the site',
    '{
        "weddings": 200,
        "yearsExperience": 14,
        "foundedYear": 2011,
        "guestsServed": 50000,
        "happyCouples": 200,
        "clientSatisfaction": 100,
        "destinations": 40,
        "countries": 3,
        "cities": 40,
        "vendors": 500,
        "teamMembers": 50,
        "budgetManaged": "200Cr",
        "averageBudget": "75L",
        "rating": 5.0,
        "reviews": 127,
        "googleReviews": 127,
        "responseTime": "2 hours",
        "onTimeDelivery": 100,
        "awards": 15,
        "mediaFeatures": 25,
        "venuePartners": 80,
        "luxuryProperties": 50
    }'::jsonb
),
(
    'contact_info',
    'contact',
    'Contact Information',
    'Business contact details shown across the site',
    '{
        "email": "info@eliteweddingplanner.in",
        "phone": "+91 9869829673",
        "whatsapp": "+91 9869829673",
        "address": "Mumbai, India",
        "businessHours": "Mon-Sat: 10AM - 7PM",
        "supportEmail": "support@eliteweddingplanner.in"
    }'::jsonb
),
(
    'social_links',
    'social',
    'Social Media Links',
    'Social media profile URLs',
    '{
        "instagram": "https://instagram.com/myweddingplanning",
        "youtube": "https://youtube.com/@myweddingplanning",
        "facebook": "https://facebook.com/myweddingplanning",
        "pinterest": "https://pinterest.com/myweddingplanning",
        "linkedin": "https://linkedin.com/company/myweddingplanning"
    }'::jsonb
),
(
    'branding',
    'branding',
    'Site Branding',
    'Brand identity settings',
    '{
        "siteName": "My Wedding Planning",
        "tagline": "India''s Premier Destination Wedding Planners",
        "logoUrl": "/images/logo.png",
        "faviconUrl": "/favicon.ico",
        "primaryColor": "#c41e4a",
        "secondaryColor": "#c9a962"
    }'::jsonb
),
(
    'seo_defaults',
    'seo',
    'Default SEO Settings',
    'Default meta tags for pages without custom SEO',
    '{
        "defaultTitle": "My Wedding Planning | Luxury Destination Weddings",
        "defaultDescription": "India''s premier destination wedding planners. 200+ grand weddings, 40+ destinations, 14+ years of excellence.",
        "defaultImage": "/images/og-image.jpg",
        "twitterHandle": "@myweddingplanning"
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;

-- Add columns to content_pages if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'content_pages' AND column_name = 'is_published') THEN
        ALTER TABLE content_pages ADD COLUMN is_published BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'content_pages' AND column_name = 'published_at') THEN
        ALTER TABLE content_pages ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'content_pages' AND column_name = 'meta_title') THEN
        ALTER TABLE content_pages ADD COLUMN meta_title TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'content_pages' AND column_name = 'meta_description') THEN
        ALTER TABLE content_pages ADD COLUMN meta_description TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'content_pages' AND column_name = 'meta_image') THEN
        ALTER TABLE content_pages ADD COLUMN meta_image TEXT;
    END IF;
END $$;

-- Add layout_variant to content_sections if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'content_sections' AND column_name = 'layout_variant') THEN
        ALTER TABLE content_sections ADD COLUMN layout_variant TEXT DEFAULT 'default';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'content_sections' AND column_name = 'is_visible') THEN
        ALTER TABLE content_sections ADD COLUMN is_visible BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_global_settings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update timestamp
DROP TRIGGER IF EXISTS trigger_update_global_settings_timestamp ON global_settings;
CREATE TRIGGER trigger_update_global_settings_timestamp
    BEFORE UPDATE ON global_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_global_settings_timestamp();
