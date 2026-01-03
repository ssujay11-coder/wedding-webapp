-- Wedding Planning Module Schema
-- Migration: 20260102000001
-- Description: Complete schema for wedding planning platform

-- ============================================================================
-- 0. UTILITY FUNCTIONS
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. USER PROFILES (extends Supabase Auth)
-- ============================================================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    role TEXT DEFAULT 'couple' CHECK (role IN ('couple', 'planner', 'admin')),
    company_name TEXT, -- For wedding planners
    company_logo TEXT,
    bio TEXT,
    website TEXT,
    is_verified BOOLEAN DEFAULT false,
    onboarding_completed BOOLEAN DEFAULT false,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- ============================================================================
-- 2. WEDDINGS (Core Entity)
-- ============================================================================

CREATE TABLE IF NOT EXISTS weddings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    -- Basic Info
    bride_name TEXT NOT NULL,
    groom_name TEXT NOT NULL,
    wedding_date DATE,
    wedding_end_date DATE, -- For multi-day weddings

    -- Location
    primary_city TEXT,
    primary_venue TEXT,
    destination_type TEXT CHECK (destination_type IN ('local', 'destination', 'international')),

    -- Details
    estimated_guests INTEGER,
    wedding_style TEXT, -- Traditional, Modern, Fusion, etc.
    color_palette TEXT[],
    theme TEXT,

    -- Planning
    total_budget DECIMAL(15, 2),
    currency TEXT DEFAULT 'INR',
    planning_status TEXT DEFAULT 'planning' CHECK (planning_status IN ('planning', 'booked', 'in_progress', 'completed', 'cancelled')),

    -- Website
    website_slug TEXT UNIQUE,
    website_enabled BOOLEAN DEFAULT false,
    website_password TEXT, -- Optional password protection

    -- Ownership
    created_by UUID REFERENCES profiles(id),
    planner_id UUID REFERENCES profiles(id), -- If managed by a planner

    -- Metadata
    notes TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_weddings_date ON weddings(wedding_date);
CREATE INDEX IF NOT EXISTS idx_weddings_slug ON weddings(website_slug);
CREATE INDEX IF NOT EXISTS idx_weddings_created_by ON weddings(created_by);
CREATE INDEX IF NOT EXISTS idx_weddings_planner ON weddings(planner_id);

-- ============================================================================
-- 3. WEDDING MEMBERS (Junction: Users <-> Weddings with Roles)
-- ============================================================================

CREATE TABLE IF NOT EXISTS wedding_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('owner', 'co_owner', 'planner', 'coordinator', 'family', 'viewer')),
    permissions JSONB DEFAULT '{"can_edit": true, "can_invite": true, "can_manage_budget": true}',
    invited_by UUID REFERENCES profiles(id),
    invitation_status TEXT DEFAULT 'accepted' CHECK (invitation_status IN ('pending', 'accepted', 'declined')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(wedding_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_wedding_members_wedding ON wedding_members(wedding_id);
CREATE INDEX IF NOT EXISTS idx_wedding_members_user ON wedding_members(user_id);

-- ============================================================================
-- 4. WEDDING EVENTS (Mehendi, Sangeet, Wedding, Reception, etc.)
-- ============================================================================

CREATE TABLE IF NOT EXISTS wedding_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL,

    -- Event Details
    name TEXT NOT NULL, -- "Mehendi Ceremony", "Wedding Reception"
    event_type TEXT NOT NULL CHECK (event_type IN (
        'engagement', 'roka', 'sagai', 'tilak',
        'mehendi', 'haldi', 'sangeet', 'cocktail',
        'wedding', 'pheras', 'reception', 'vidaai',
        'welcome_dinner', 'farewell_brunch', 'after_party',
        'other'
    )),

    -- Timing
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,

    -- Location
    venue_name TEXT,
    venue_address TEXT,
    venue_city TEXT,
    venue_coordinates JSONB, -- {lat, lng}
    venue_id UUID, -- Reference to venue booking if applicable

    -- Details
    description TEXT,
    dress_code TEXT,
    estimated_guests INTEGER,
    actual_guests INTEGER,

    -- Logistics
    requires_rsvp BOOLEAN DEFAULT true,
    rsvp_deadline DATE,
    transportation_provided BOOLEAN DEFAULT false,
    accommodation_info TEXT,

    -- Metadata
    display_order INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT true, -- Show on wedding website
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_wedding ON wedding_events(wedding_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON wedding_events(event_date);

-- ============================================================================
-- 5. GUESTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS guests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL,

    -- Basic Info
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT,
    phone TEXT,

    -- Guest Details
    side TEXT CHECK (side IN ('bride', 'groom', 'mutual', 'planner')),
    relationship TEXT, -- "Friend", "Cousin", "Colleague", etc.
    category TEXT CHECK (category IN ('family', 'close_family', 'friends', 'colleagues', 'vip', 'vendor', 'other')),

    -- Plus Ones
    has_plus_one BOOLEAN DEFAULT false,
    plus_one_name TEXT,
    plus_one_confirmed BOOLEAN DEFAULT false,

    -- Additional Guests (children, etc.)
    additional_guests INTEGER DEFAULT 0,
    additional_guest_names TEXT[],

    -- Preferences
    dietary_restrictions TEXT[],
    dietary_notes TEXT,
    meal_preference TEXT,

    -- Accommodation
    needs_accommodation BOOLEAN DEFAULT false,
    accommodation_nights INTEGER,
    accommodation_preference TEXT,
    accommodation_assigned TEXT,

    -- Transportation
    needs_transportation BOOLEAN DEFAULT false,
    arrival_date DATE,
    arrival_time TIME,
    arrival_details TEXT, -- Flight number, etc.
    departure_date DATE,
    departure_details TEXT,

    -- Table Assignment
    table_group TEXT,
    table_number INTEGER,
    seat_number INTEGER,

    -- Communication
    invitation_sent BOOLEAN DEFAULT false,
    invitation_sent_at TIMESTAMP WITH TIME ZONE,
    save_the_date_sent BOOLEAN DEFAULT false,

    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'invited', 'confirmed', 'declined', 'maybe', 'no_response')),

    -- Notes
    notes TEXT,
    tags TEXT[],

    -- Metadata
    imported_from TEXT, -- 'csv', 'contacts', 'manual'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_guests_wedding ON guests(wedding_id);
CREATE INDEX IF NOT EXISTS idx_guests_email ON guests(email);
CREATE INDEX IF NOT EXISTS idx_guests_status ON guests(status);
CREATE INDEX IF NOT EXISTS idx_guests_category ON guests(category);
CREATE INDEX IF NOT EXISTS idx_guests_side ON guests(side);

-- ============================================================================
-- 6. RSVPs
-- ============================================================================

CREATE TABLE IF NOT EXISTS rsvps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_id UUID REFERENCES guests(id) ON DELETE CASCADE NOT NULL,
    event_id UUID REFERENCES wedding_events(id) ON DELETE CASCADE NOT NULL,

    -- Response
    response TEXT NOT NULL CHECK (response IN ('attending', 'not_attending', 'maybe', 'pending')),
    responded_at TIMESTAMP WITH TIME ZONE,

    -- Plus One for this event
    plus_one_attending BOOLEAN DEFAULT false,
    additional_guests_count INTEGER DEFAULT 0,

    -- Meal
    meal_choice TEXT,
    dietary_notes TEXT,

    -- Notes
    guest_message TEXT,
    internal_notes TEXT,

    -- Metadata
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(guest_id, event_id)
);

CREATE INDEX IF NOT EXISTS idx_rsvps_guest ON rsvps(guest_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_event ON rsvps(event_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_response ON rsvps(response);

-- ============================================================================
-- 7. WEDDING WEBSITES
-- ============================================================================

CREATE TABLE IF NOT EXISTS wedding_websites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL UNIQUE,

    -- Domain
    subdomain TEXT UNIQUE NOT NULL, -- couple-name
    custom_domain TEXT UNIQUE,

    -- Theme
    template TEXT DEFAULT 'classic' CHECK (template IN ('classic', 'modern', 'traditional', 'royal', 'minimalist', 'garden', 'beach')),
    primary_color TEXT DEFAULT '#d4af37',
    secondary_color TEXT DEFAULT '#221015',
    font_family TEXT DEFAULT 'playfair',

    -- Hero Section
    hero_image_url TEXT,
    hero_title TEXT,
    hero_subtitle TEXT,

    -- Couple Info
    bride_full_name TEXT,
    groom_full_name TEXT,
    couple_photo_url TEXT,

    -- Our Story
    how_we_met TEXT,
    proposal_story TEXT,
    story_photos TEXT[],
    story_timeline JSONB, -- [{date, title, description, photo}]

    -- Sections Visibility
    sections_config JSONB DEFAULT '{
        "hero": true,
        "couple": true,
        "story": true,
        "events": true,
        "venue": true,
        "travel": true,
        "rsvp": true,
        "gallery": true,
        "registry": false,
        "faq": true
    }',

    -- Gallery
    gallery_photos TEXT[],

    -- Travel & Accommodation
    travel_info TEXT,
    accommodation_options JSONB, -- [{name, description, link, price_range}]
    things_to_do TEXT,
    local_tips TEXT,

    -- Registry
    registry_links JSONB, -- [{name, url, logo}]
    registry_message TEXT,

    -- FAQ
    faqs JSONB, -- [{question, answer}]

    -- Settings
    is_published BOOLEAN DEFAULT false,
    is_password_protected BOOLEAN DEFAULT false,
    password_hash TEXT,
    show_rsvp_form BOOLEAN DEFAULT true,
    rsvp_deadline DATE,

    -- Analytics
    visit_count INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,

    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    og_image_url TEXT,

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_websites_subdomain ON wedding_websites(subdomain);
CREATE INDEX IF NOT EXISTS idx_websites_wedding ON wedding_websites(wedding_id);

-- ============================================================================
-- 8. VENDOR CATEGORIES
-- ============================================================================

CREATE TABLE IF NOT EXISTS vendor_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO vendor_categories (name, slug, icon, display_order) VALUES
    ('Photography & Videography', 'photography', 'camera', 1),
    ('Decoration & Florist', 'decoration', 'flower', 2),
    ('Catering', 'catering', 'utensils', 3),
    ('Music & Entertainment', 'entertainment', 'music', 4),
    ('Makeup & Hair', 'makeup', 'sparkles', 5),
    ('Mehendi Artist', 'mehendi', 'hand', 6),
    ('Wedding Priest', 'priest', 'star', 7),
    ('Transportation', 'transportation', 'car', 8),
    ('Invitations & Stationery', 'invitations', 'mail', 9),
    ('Jewelry', 'jewelry', 'gem', 10),
    ('Attire & Boutique', 'attire', 'shirt', 11),
    ('Choreographer', 'choreographer', 'music-2', 12),
    ('Wedding Cake', 'cake', 'cake', 13),
    ('Lighting & Sound', 'lighting', 'lightbulb', 14),
    ('Event Planner', 'planner', 'clipboard', 15)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- 9. VENDORS
-- ============================================================================

CREATE TABLE IF NOT EXISTS vendors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Basic Info
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES vendor_categories(id),

    -- Contact
    email TEXT,
    phone TEXT,
    whatsapp TEXT,
    website TEXT,

    -- Location
    city TEXT,
    state TEXT,
    address TEXT,
    service_areas TEXT[], -- Cities they serve

    -- Details
    description TEXT,
    short_description TEXT,

    -- Pricing
    starting_price DECIMAL(12, 2),
    price_range TEXT, -- "Budget", "Mid-Range", "Premium", "Luxury"
    currency TEXT DEFAULT 'INR',

    -- Media
    logo_url TEXT,
    cover_image_url TEXT,
    portfolio_images TEXT[],
    video_urls TEXT[],

    -- Ratings
    rating DECIMAL(2, 1),
    review_count INTEGER DEFAULT 0,

    -- Social
    instagram TEXT,
    facebook TEXT,
    youtube TEXT,

    -- Features
    features TEXT[],
    specializations TEXT[],

    -- Availability
    is_available BOOLEAN DEFAULT true,
    lead_time_days INTEGER, -- How far in advance to book

    -- Verification
    is_verified BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_preferred BOOLEAN DEFAULT false, -- Elite preferred vendor

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vendors_category ON vendors(category_id);
CREATE INDEX IF NOT EXISTS idx_vendors_city ON vendors(city);
CREATE INDEX IF NOT EXISTS idx_vendors_slug ON vendors(slug);
CREATE INDEX IF NOT EXISTS idx_vendors_rating ON vendors(rating DESC);

-- ============================================================================
-- 10. VENDOR BOOKINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS vendor_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL,
    vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
    event_id UUID REFERENCES wedding_events(id) ON DELETE SET NULL,

    -- Custom vendor (if not from directory)
    custom_vendor_name TEXT,
    custom_vendor_contact TEXT,
    custom_vendor_phone TEXT,
    custom_vendor_email TEXT,

    -- Booking Details
    category_id UUID REFERENCES vendor_categories(id),
    service_description TEXT,

    -- Financial
    quoted_amount DECIMAL(12, 2),
    final_amount DECIMAL(12, 2),
    currency TEXT DEFAULT 'INR',

    -- Payment Schedule
    payment_schedule JSONB, -- [{amount, due_date, description, status}]
    amount_paid DECIMAL(12, 2) DEFAULT 0,

    -- Status
    status TEXT DEFAULT 'inquiry' CHECK (status IN ('inquiry', 'quoted', 'negotiating', 'booked', 'deposit_paid', 'fully_paid', 'completed', 'cancelled')),

    -- Contract
    contract_url TEXT,
    contract_signed BOOLEAN DEFAULT false,
    contract_signed_at TIMESTAMP WITH TIME ZONE,

    -- Dates
    booking_date DATE,
    service_date DATE,

    -- Notes
    notes TEXT,
    special_requests TEXT,

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vendor_bookings_wedding ON vendor_bookings(wedding_id);
CREATE INDEX IF NOT EXISTS idx_vendor_bookings_vendor ON vendor_bookings(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_bookings_status ON vendor_bookings(status);

-- ============================================================================
-- 11. VENUE BOOKINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS venue_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL,
    event_id UUID REFERENCES wedding_events(id) ON DELETE SET NULL,

    -- Venue Reference (from existing venues JSON or custom)
    venue_slug TEXT, -- Reference to existing venue

    -- Custom Venue Details
    venue_name TEXT NOT NULL,
    venue_city TEXT,
    venue_address TEXT,
    venue_contact_name TEXT,
    venue_contact_phone TEXT,
    venue_contact_email TEXT,

    -- Booking Details
    booking_date DATE,
    check_in_date DATE,
    check_out_date DATE,
    event_date DATE,
    event_start_time TIME,
    event_end_time TIME,

    -- Spaces
    spaces_booked TEXT[], -- ["Lawn", "Ballroom", "Poolside"]

    -- Capacity
    expected_guests INTEGER,
    room_block INTEGER, -- Number of rooms blocked

    -- Financial
    venue_cost DECIMAL(12, 2),
    food_cost_per_plate DECIMAL(10, 2),
    accommodation_cost DECIMAL(12, 2),
    miscellaneous_cost DECIMAL(12, 2),
    total_cost DECIMAL(15, 2),
    currency TEXT DEFAULT 'INR',

    -- Payment
    deposit_amount DECIMAL(12, 2),
    deposit_paid BOOLEAN DEFAULT false,
    deposit_paid_at TIMESTAMP WITH TIME ZONE,
    amount_paid DECIMAL(15, 2) DEFAULT 0,
    payment_schedule JSONB,

    -- Status
    status TEXT DEFAULT 'inquiry' CHECK (status IN ('inquiry', 'site_visit_scheduled', 'quoted', 'negotiating', 'tentative', 'confirmed', 'deposit_paid', 'fully_paid', 'completed', 'cancelled')),

    -- Contract
    contract_url TEXT,
    contract_signed BOOLEAN DEFAULT false,

    -- Notes
    notes TEXT,
    special_requirements TEXT,

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_venue_bookings_wedding ON venue_bookings(wedding_id);
CREATE INDEX IF NOT EXISTS idx_venue_bookings_status ON venue_bookings(status);

-- ============================================================================
-- 12. BUDGET CATEGORIES
-- ============================================================================

CREATE TABLE IF NOT EXISTS budget_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    default_percentage DECIMAL(5, 2), -- Suggested % of total budget
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO budget_categories (name, slug, icon, default_percentage, display_order) VALUES
    ('Venue & Catering', 'venue-catering', 'building', 40.00, 1),
    ('Photography & Video', 'photography', 'camera', 12.00, 2),
    ('Decoration & Flowers', 'decoration', 'flower', 10.00, 3),
    ('Entertainment & Music', 'entertainment', 'music', 5.00, 4),
    ('Attire & Jewelry', 'attire', 'shirt', 8.00, 5),
    ('Makeup & Hair', 'makeup', 'sparkles', 3.00, 6),
    ('Invitations & Stationery', 'invitations', 'mail', 2.00, 7),
    ('Transportation', 'transportation', 'car', 3.00, 8),
    ('Gifts & Favors', 'gifts', 'gift', 3.00, 9),
    ('Accommodation', 'accommodation', 'bed', 8.00, 10),
    ('Honeymoon', 'honeymoon', 'plane', 5.00, 11),
    ('Miscellaneous', 'miscellaneous', 'more-horizontal', 1.00, 12)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- 13. BUDGET ITEMS
-- ============================================================================

CREATE TABLE IF NOT EXISTS budget_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES budget_categories(id),

    -- Item Details
    name TEXT NOT NULL,
    description TEXT,

    -- Budget
    estimated_cost DECIMAL(12, 2) NOT NULL,
    actual_cost DECIMAL(12, 2),
    currency TEXT DEFAULT 'INR',

    -- Payment
    amount_paid DECIMAL(12, 2) DEFAULT 0,
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid')),

    -- Vendor Link
    vendor_booking_id UUID REFERENCES vendor_bookings(id) ON DELETE SET NULL,
    venue_booking_id UUID REFERENCES venue_bookings(id) ON DELETE SET NULL,

    -- Status
    is_booked BOOLEAN DEFAULT false,
    is_priority BOOLEAN DEFAULT false,

    -- Notes
    notes TEXT,

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_budget_items_wedding ON budget_items(wedding_id);
CREATE INDEX IF NOT EXISTS idx_budget_items_category ON budget_items(category_id);

-- ============================================================================
-- 14. EXPENSES (Actual Payments)
-- ============================================================================

CREATE TABLE IF NOT EXISTS expenses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL,
    budget_item_id UUID REFERENCES budget_items(id) ON DELETE SET NULL,

    -- Expense Details
    description TEXT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    currency TEXT DEFAULT 'INR',

    -- Payment Details
    payment_date DATE NOT NULL,
    payment_method TEXT CHECK (payment_method IN ('cash', 'bank_transfer', 'upi', 'credit_card', 'debit_card', 'cheque', 'other')),
    transaction_reference TEXT,

    -- Receipt
    receipt_url TEXT,

    -- Categorization
    category_id UUID REFERENCES budget_categories(id),
    vendor_booking_id UUID REFERENCES vendor_bookings(id) ON DELETE SET NULL,

    -- Status
    is_reimbursable BOOLEAN DEFAULT false,
    reimbursed BOOLEAN DEFAULT false,
    paid_by TEXT, -- Who paid

    -- Notes
    notes TEXT,

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_expenses_wedding ON expenses(wedding_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(payment_date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category_id);

-- ============================================================================
-- 15. TASKS / CHECKLIST
-- ============================================================================

CREATE TABLE IF NOT EXISTS tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL,

    -- Task Details
    title TEXT NOT NULL,
    description TEXT,

    -- Categorization
    category TEXT, -- "Venue", "Vendors", "Attire", etc.

    -- Timeline
    due_date DATE,
    reminder_date DATE,

    -- Assignment
    assigned_to UUID REFERENCES profiles(id),
    assigned_to_name TEXT, -- For non-user assignments

    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped', 'overdue')),
    completed_at TIMESTAMP WITH TIME ZONE,

    -- Priority
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),

    -- Template
    is_from_template BOOLEAN DEFAULT false,
    template_id TEXT, -- Reference to checklist template

    -- Ordering
    display_order INTEGER DEFAULT 0,

    -- Related Items
    vendor_booking_id UUID REFERENCES vendor_bookings(id) ON DELETE SET NULL,
    venue_booking_id UUID REFERENCES venue_bookings(id) ON DELETE SET NULL,
    budget_item_id UUID REFERENCES budget_items(id) ON DELETE SET NULL,

    -- Notes
    notes TEXT,

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_wedding ON tasks(wedding_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks(assigned_to);

-- ============================================================================
-- 16. TRANSPORTATION BOOKINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS transportation_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL,
    event_id UUID REFERENCES wedding_events(id) ON DELETE SET NULL,

    -- Trip Details
    trip_type TEXT CHECK (trip_type IN ('airport_pickup', 'airport_drop', 'venue_transfer', 'local_travel', 'guest_shuttle', 'vip_car', 'other')),
    description TEXT,

    -- Route
    pickup_location TEXT NOT NULL,
    pickup_time TIMESTAMP WITH TIME ZONE,
    dropoff_location TEXT NOT NULL,
    estimated_arrival TIMESTAMP WITH TIME ZONE,

    -- Vehicle
    vehicle_type TEXT, -- "Sedan", "SUV", "Bus", "Tempo Traveller"
    vehicle_count INTEGER DEFAULT 1,
    capacity_per_vehicle INTEGER,

    -- Guests
    guest_ids UUID[], -- Guests assigned to this transport
    guest_count INTEGER,

    -- Provider
    provider_name TEXT,
    provider_phone TEXT,
    driver_name TEXT,
    driver_phone TEXT,
    vehicle_number TEXT,

    -- Cost
    cost DECIMAL(10, 2),
    currency TEXT DEFAULT 'INR',
    is_paid BOOLEAN DEFAULT false,

    -- Status
    status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'booked', 'confirmed', 'in_progress', 'completed', 'cancelled')),

    -- Notes
    notes TEXT,
    special_instructions TEXT,

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transport_wedding ON transportation_bookings(wedding_id);
CREATE INDEX IF NOT EXISTS idx_transport_event ON transportation_bookings(event_id);
CREATE INDEX IF NOT EXISTS idx_transport_time ON transportation_bookings(pickup_time);

-- ============================================================================
-- 17. ACCOMMODATION ALLOCATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS accommodation_allocations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL,
    venue_booking_id UUID REFERENCES venue_bookings(id) ON DELETE SET NULL,

    -- Room Details
    room_type TEXT NOT NULL, -- "Deluxe", "Suite", "Villa"
    room_number TEXT,
    room_count INTEGER DEFAULT 1,

    -- Dates
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    nights INTEGER,

    -- Guests
    guest_ids UUID[], -- Guests assigned to this room
    primary_guest_id UUID REFERENCES guests(id),
    occupants INTEGER,

    -- Cost
    rate_per_night DECIMAL(10, 2),
    total_cost DECIMAL(12, 2),
    currency TEXT DEFAULT 'INR',
    paid_by TEXT, -- "Couple", "Guest", "Planner"
    is_paid BOOLEAN DEFAULT false,

    -- Status
    status TEXT DEFAULT 'allocated' CHECK (status IN ('allocated', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show')),

    -- Notes
    notes TEXT,
    special_requests TEXT,

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_accommodation_wedding ON accommodation_allocations(wedding_id);
CREATE INDEX IF NOT EXISTS idx_accommodation_guest ON accommodation_allocations(primary_guest_id);
CREATE INDEX IF NOT EXISTS idx_accommodation_dates ON accommodation_allocations(check_in_date, check_out_date);

-- ============================================================================
-- 18. ACTIVITY LOG / AUDIT TRAIL
-- ============================================================================

CREATE TABLE IF NOT EXISTS activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

    -- Action
    action TEXT NOT NULL, -- "created", "updated", "deleted", "invited", "rsvp_received"
    entity_type TEXT NOT NULL, -- "guest", "event", "vendor", "budget"
    entity_id UUID,
    entity_name TEXT,

    -- Details
    description TEXT,
    old_value JSONB,
    new_value JSONB,

    -- Context
    ip_address TEXT,
    user_agent TEXT,

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_wedding ON activity_log(wedding_id);
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_log(created_at DESC);

-- ============================================================================
-- 19. NOTIFICATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,

    -- Notification Details
    type TEXT NOT NULL, -- "rsvp", "task_due", "payment_due", "vendor_message"
    title TEXT NOT NULL,
    message TEXT NOT NULL,

    -- Action
    action_url TEXT,
    action_label TEXT,

    -- Status
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;

-- ============================================================================
-- 20. FEATURE FLAGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS feature_flags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    is_enabled BOOLEAN DEFAULT false,
    rollout_percentage INTEGER DEFAULT 0 CHECK (rollout_percentage >= 0 AND rollout_percentage <= 100),
    user_ids UUID[], -- Specific users with access
    conditions JSONB, -- Additional conditions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default feature flags
INSERT INTO feature_flags (name, description, is_enabled, rollout_percentage) VALUES
    ('ENABLE_SOCIAL_LOGIN', 'Enable social login (Google, Facebook)', true, 100),
    ('ENABLE_WEDDING_WEBSITES', 'Enable wedding website builder', true, 100),
    ('ENABLE_VENDOR_BOOKING', 'Enable vendor marketplace and booking', true, 100),
    ('ENABLE_PAYMENTS', 'Enable payment processing', false, 0),
    ('ENABLE_PLANNER_MODE', 'Enable wedding planner multi-tenant features', true, 100),
    ('ENABLE_AI_SUGGESTIONS', 'Enable AI-powered suggestions', false, 0)
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Add updated_at triggers to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_weddings_updated_at BEFORE UPDATE ON weddings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON wedding_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rsvps_updated_at BEFORE UPDATE ON rsvps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_websites_updated_at BEFORE UPDATE ON wedding_websites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vendor_bookings_updated_at BEFORE UPDATE ON vendor_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_venue_bookings_updated_at BEFORE UPDATE ON venue_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_budget_items_updated_at BEFORE UPDATE ON budget_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transport_updated_at BEFORE UPDATE ON transportation_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_accommodation_updated_at BEFORE UPDATE ON accommodation_allocations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feature_flags_updated_at BEFORE UPDATE ON feature_flags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE transportation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE accommodation_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profile policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Wedding policies (users can access weddings they're members of)
CREATE POLICY "Members can view weddings" ON weddings FOR SELECT USING (
    EXISTS (SELECT 1 FROM wedding_members WHERE wedding_id = weddings.id AND user_id = auth.uid())
);
CREATE POLICY "Members can update weddings" ON weddings FOR UPDATE USING (
    EXISTS (SELECT 1 FROM wedding_members WHERE wedding_id = weddings.id AND user_id = auth.uid() AND role IN ('owner', 'co_owner', 'planner'))
);
CREATE POLICY "Users can create weddings" ON weddings FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Wedding members policies
CREATE POLICY "Members can view wedding members" ON wedding_members FOR SELECT USING (
    EXISTS (SELECT 1 FROM wedding_members wm WHERE wm.wedding_id = wedding_members.wedding_id AND wm.user_id = auth.uid())
);

-- Guests policies
CREATE POLICY "Members can view guests" ON guests FOR SELECT USING (
    EXISTS (SELECT 1 FROM wedding_members WHERE wedding_id = guests.wedding_id AND user_id = auth.uid())
);
CREATE POLICY "Members can manage guests" ON guests FOR ALL USING (
    EXISTS (SELECT 1 FROM wedding_members WHERE wedding_id = guests.wedding_id AND user_id = auth.uid() AND role IN ('owner', 'co_owner', 'planner', 'coordinator'))
);

-- Public wedding website policy
CREATE POLICY "Public can view published websites" ON wedding_websites FOR SELECT USING (is_published = true);

-- Vendors are public
CREATE POLICY "Public can view vendors" ON vendors FOR SELECT USING (true);
CREATE POLICY "Public can view vendor categories" ON vendor_categories FOR SELECT USING (true);
CREATE POLICY "Public can view budget categories" ON budget_categories FOR SELECT USING (true);

-- Notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to get wedding stats
CREATE OR REPLACE FUNCTION get_wedding_stats(p_wedding_id UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_guests', (SELECT COUNT(*) FROM guests WHERE wedding_id = p_wedding_id),
        'confirmed_guests', (SELECT COUNT(*) FROM guests WHERE wedding_id = p_wedding_id AND status = 'confirmed'),
        'pending_rsvps', (SELECT COUNT(*) FROM guests WHERE wedding_id = p_wedding_id AND status = 'pending'),
        'total_budget', (SELECT COALESCE(SUM(estimated_cost), 0) FROM budget_items WHERE wedding_id = p_wedding_id),
        'spent_budget', (SELECT COALESCE(SUM(actual_cost), 0) FROM budget_items WHERE wedding_id = p_wedding_id AND actual_cost IS NOT NULL),
        'tasks_total', (SELECT COUNT(*) FROM tasks WHERE wedding_id = p_wedding_id),
        'tasks_completed', (SELECT COUNT(*) FROM tasks WHERE wedding_id = p_wedding_id AND status = 'completed'),
        'events_count', (SELECT COUNT(*) FROM wedding_events WHERE wedding_id = p_wedding_id)
    ) INTO result;
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check feature flag
CREATE OR REPLACE FUNCTION is_feature_enabled(p_feature_name TEXT, p_user_id UUID DEFAULT NULL)
RETURNS BOOLEAN AS $$
DECLARE
    flag RECORD;
BEGIN
    SELECT * INTO flag FROM feature_flags WHERE name = p_feature_name;

    IF NOT FOUND THEN
        RETURN false;
    END IF;

    IF NOT flag.is_enabled THEN
        RETURN false;
    END IF;

    -- Check if user is in specific access list
    IF p_user_id IS NOT NULL AND flag.user_ids IS NOT NULL AND p_user_id = ANY(flag.user_ids) THEN
        RETURN true;
    END IF;

    -- Check rollout percentage
    IF flag.rollout_percentage >= 100 THEN
        RETURN true;
    ELSIF flag.rollout_percentage <= 0 THEN
        RETURN false;
    ELSE
        -- Simple random rollout based on user_id hash
        RETURN (abs(hashtext(COALESCE(p_user_id::text, random()::text))) % 100) < flag.rollout_percentage;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- VIEWS
-- ============================================================================

-- Dashboard view for wedding overview
CREATE OR REPLACE VIEW wedding_dashboard AS
SELECT
    w.id,
    w.bride_name,
    w.groom_name,
    w.wedding_date,
    w.total_budget,
    w.planning_status,
    w.website_enabled,
    COALESCE(g.total_guests, 0) as total_guests,
    COALESCE(g.confirmed_guests, 0) as confirmed_guests,
    COALESCE(e.event_count, 0) as event_count,
    COALESCE(t.pending_tasks, 0) as pending_tasks,
    COALESCE(b.spent_amount, 0) as spent_amount
FROM weddings w
LEFT JOIN (
    SELECT wedding_id, COUNT(*) as total_guests, COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_guests
    FROM guests GROUP BY wedding_id
) g ON w.id = g.wedding_id
LEFT JOIN (
    SELECT wedding_id, COUNT(*) as event_count
    FROM wedding_events GROUP BY wedding_id
) e ON w.id = e.wedding_id
LEFT JOIN (
    SELECT wedding_id, COUNT(*) as pending_tasks
    FROM tasks WHERE status IN ('pending', 'in_progress') GROUP BY wedding_id
) t ON w.id = t.wedding_id
LEFT JOIN (
    SELECT wedding_id, SUM(actual_cost) as spent_amount
    FROM budget_items WHERE actual_cost IS NOT NULL GROUP BY wedding_id
) b ON w.id = b.wedding_id;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

SELECT 'Wedding Planning Module schema migration completed successfully!' as status;
