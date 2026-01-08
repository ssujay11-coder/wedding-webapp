-- =============================================
-- SEED DATA - DESTINATIONS WITH CORRECT IMAGES
-- =============================================

-- Clear existing data for fresh seed
DELETE FROM reviews WHERE true;
DELETE FROM shortlists WHERE true;
DELETE FROM venues WHERE true;
DELETE FROM destinations WHERE true;

INSERT INTO destinations (name, slug, city, state, country, tagline, hero_title, description, hero_image_url, gallery_images, best_season, best_months, avg_budget_min, avg_budget_max, total_venues, is_featured, sort_order)
VALUES
-- UDAIPUR (CORRECT UDAIPUR IMAGES!)
('Udaipur', 'udaipur', 'Udaipur', 'Rajasthan', 'India',
 'The Venice of the East',
 'Where Royal Dreams Float on Shimmering Lakes',
 'Udaipur, the City of Lakes, is India''s most romantic wedding destination. With its magnificent palaces rising from crystal-clear lakes, heritage havelis adorned with intricate artwork, and the majestic Aravalli hills as backdrop, Udaipur offers a fairy-tale setting that has hosted royalty for centuries. Every sunset here paints the sky in hues of gold and rose, creating magical moments that last a lifetime.',
 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80',
 ARRAY[
   'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
   'https://images.unsplash.com/photo-1585116938581-d3c4c7f91e7a?w=800',
   'https://images.unsplash.com/photo-1623874514711-0f321325f318?w=800',
   'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800'
 ],
 'September - March',
 ARRAY['October', 'November', 'December', 'January', 'February'],
 2500000, 50000000, 32, true, 1),

-- GOA (CORRECT GOA IMAGES!)
('Goa', 'goa', 'Goa', 'Goa', 'India',
 'Beach Weddings & Bohemian Dreams',
 'Where the Ocean Whispers Your Love Story',
 'Goa is India''s most beloved beach destination for romantic weddings. With golden sandy beaches kissed by the Arabian Sea, Portuguese-influenced architecture, and a laid-back vibe that puts everyone at ease, Goa weddings are all about barefoot elegance and sunset magic. From intimate beach ceremonies to grand resort celebrations, Goa offers the perfect blend of fun and romance.',
 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=80',
 ARRAY[
   'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
   'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
 ],
 'October - March',
 ARRAY['November', 'December', 'January', 'February'],
 1500000, 15000000, 45, true, 2),

-- JAIPUR (CORRECT JAIPUR IMAGES!)
('Jaipur', 'jaipur', 'Jaipur', 'Rajasthan', 'India',
 'The Pink City of Grand Celebrations',
 'Where Every Wedding Becomes a Royal Affair',
 'Jaipur, the Pink City, is where Rajputana grandeur meets wedding magnificence. Ancient forts towering over the city, palaces that whisper tales of maharajas, and a vibrant culture that celebrates life in full color - Jaipur weddings are nothing short of spectacular. Here, tradition dances with luxury, creating celebrations that are talked about for generations.',
 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=80',
 ARRAY[
   'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
   'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
   'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800',
   'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800'
 ],
 'October - March',
 ARRAY['October', 'November', 'December', 'January', 'February', 'March'],
 2000000, 30000000, 28, true, 3),

-- KERALA (CORRECT KERALA IMAGES!)
('Kerala', 'kerala', 'Kochi', 'Kerala', 'India',
 'God''s Own Country',
 'Where Nature Blesses Every Union',
 'Kerala offers a wedding experience unlike any other - serene backwaters reflecting coconut palms, lush tea estates carpeting rolling hills, and ancient temples that have witnessed love stories for millennia. A Kerala wedding is an immersion into natural beauty and cultural richness, where Ayurvedic traditions blend with heartfelt celebrations.',
 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=80',
 ARRAY[
   'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
   'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800',
   'https://images.unsplash.com/photo-1609340584046-bd2e22a24bc7?w=800',
   'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800'
 ],
 'September - May',
 ARRAY['December', 'January', 'February', 'March'],
 1200000, 10000000, 22, true, 4),

-- JODHPUR (CORRECT JODHPUR IMAGES!)
('Jodhpur', 'jodhpur', 'Jodhpur', 'Rajasthan', 'India',
 'The Blue City',
 'Where the Desert Meets Majestic Fortresses',
 'Jodhpur''s dramatic landscape of blue-washed houses beneath the mighty Mehrangarh Fort creates a wedding backdrop that seems straight out of a fantasy. The golden desert light, the imposing fortress walls, and the vibrant Marwari culture make Jodhpur weddings an unforgettable experience of power and beauty.',
 'https://images.unsplash.com/photo-1558431382-27f86c740660?w=1920&q=80',
 ARRAY[
   'https://images.unsplash.com/photo-1558431382-27f86c740660?w=800',
   'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800',
   'https://images.unsplash.com/photo-1624461700142-c8a5aa59c5a8?w=800',
   'https://images.unsplash.com/photo-1598885159329-9377168ac375?w=800'
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
 3500000, 30000000, 20, true, 12);

-- =============================================
-- SEED VENUES
-- =============================================

-- UDAIPUR VENUES
INSERT INTO venues (
  destination_id, name, slug, venue_type, city, state, tagline, description,
  total_rooms, max_guest_capacity, starting_price, star_rating, rating, review_count,
  amenities, hero_image_url, gallery_images, event_spaces, is_featured, is_verified, is_active
)
SELECT
  d.id,
  'Taj Lake Palace',
  'taj-lake-palace',
  'palace',
  'Udaipur',
  'Rajasthan',
  'A Dream Floating on Water',
  'Rising like a vision from the waters of Lake Pichola, Taj Lake Palace is the world''s most romantic hotel. This 18th-century marble marvel offers an experience that transcends luxury - it''s pure magic. Arriving by boat as the palace glows golden at sunset, you''ll understand why royalty chose this as their summer residence.',
  83, 250, 5000000, 5, 4.9, 234,
  ARRAY['Lake Views', 'Heritage Property', 'Jiva Spa', 'Boat Access', 'Fine Dining', 'Butler Service'],
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200',
  ARRAY['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', 'https://images.unsplash.com/photo-1585116938581-d3c4c7f91e7a?w=800'],
  '[{"name": "Mewar Terrace", "capacity": 150, "type": "outdoor", "area_sqft": 5000}, {"name": "Neel Kamal", "capacity": 80, "type": "indoor", "area_sqft": 3000}]'::jsonb,
  true, true, true
FROM destinations d WHERE d.slug = 'udaipur';

INSERT INTO venues (
  destination_id, name, slug, venue_type, city, state, tagline, description,
  total_rooms, max_guest_capacity, starting_price, star_rating, rating, review_count,
  amenities, hero_image_url, gallery_images, event_spaces, is_featured, is_verified, is_active
)
SELECT
  d.id,
  'The Leela Palace Udaipur',
  'leela-palace-udaipur',
  'hotel',
  'Udaipur',
  'Rajasthan',
  'Where Modern Royalty Resides',
  'Set on the serene banks of Lake Pichola with the majestic Aravalli mountains as backdrop, The Leela Palace Udaipur is a stunning interpretation of a grand Rajasthani palace. With multiple stunning venues, impeccable service, and breathtaking views from every corner, it''s perfect for couples who want grandeur without compromise.',
  80, 500, 4500000, 5, 4.8, 187,
  ARRAY['Lake Views', 'Multiple Venues', 'ESPA Spa', 'Infinity Pool', 'Fine Dining', 'Cooking Classes'],
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
  ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
  '[{"name": "Grand Lawn", "capacity": 500, "type": "outdoor", "area_sqft": 15000}, {"name": "Ballroom", "capacity": 300, "type": "indoor", "area_sqft": 8000}]'::jsonb,
  true, true, true
FROM destinations d WHERE d.slug = 'udaipur';

INSERT INTO venues (
  destination_id, name, slug, venue_type, city, state, tagline, description,
  total_rooms, max_guest_capacity, starting_price, star_rating, rating, review_count,
  amenities, hero_image_url, gallery_images, event_spaces, is_featured, is_verified, is_active
)
SELECT
  d.id,
  'Oberoi Udaivilas',
  'oberoi-udaivilas',
  'hotel',
  'Udaipur',
  'Rajasthan',
  'Timeless Elegance Personified',
  'Spread across 50 acres on the banks of Lake Pichola, Oberoi Udaivilas is a masterpiece of Mewari architecture. With private pools, traditional courtyards, and the legendary Oberoi service, every moment here feels like a celebration. The wedding venues offer views so stunning, they''ll leave your guests speechless.',
  87, 400, 5500000, 5, 4.9, 156,
  ARRAY['Private Pools', 'Lake Views', 'Spa', 'Organic Gardens', 'Wildlife Sanctuary'],
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
  ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
  '[{"name": "Chandni", "capacity": 400, "type": "outdoor", "area_sqft": 12000}, {"name": "Udai Mahal", "capacity": 200, "type": "indoor", "area_sqft": 6000}]'::jsonb,
  true, true, true
FROM destinations d WHERE d.slug = 'udaipur';

-- GOA VENUES
INSERT INTO venues (
  destination_id, name, slug, venue_type, city, state, tagline, description,
  total_rooms, max_guest_capacity, starting_price, star_rating, rating, review_count,
  amenities, hero_image_url, gallery_images, event_spaces, is_featured, is_verified, is_active
)
SELECT
  d.id,
  'Alila Diwa Goa',
  'alila-diwa-goa',
  'resort',
  'South Goa',
  'Goa',
  'Bali-Inspired Serenity',
  'Nestled amidst lush paddy fields in peaceful South Goa, Alila Diwa brings the spirit of Bali to Indian shores. The resort''s contemporary architecture, with its clean lines and natural materials, creates a sophisticated yet relaxed setting for your celebration. Watch the sunset paint the paddy fields golden as you celebrate your love.',
  153, 450, 3500000, 5, 4.8, 143,
  ARRAY['Infinity Pool', 'Spa Alila', 'Multiple Restaurants', 'Beach Shuttle', 'Fitness Center', 'Yoga'],
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
  ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
  '[{"name": "Grand Lawn", "capacity": 450, "type": "outdoor", "area_sqft": 20000}, {"name": "Ballroom", "capacity": 200, "type": "indoor", "area_sqft": 5000}]'::jsonb,
  true, true, true
FROM destinations d WHERE d.slug = 'goa';

INSERT INTO venues (
  destination_id, name, slug, venue_type, city, state, tagline, description,
  total_rooms, max_guest_capacity, starting_price, star_rating, rating, review_count,
  amenities, hero_image_url, gallery_images, event_spaces, is_featured, is_verified, is_active
)
SELECT
  d.id,
  'Taj Exotica Goa',
  'taj-exotica-goa',
  'resort',
  'South Goa',
  'Goa',
  'Where the Sea Meets Luxury',
  'Spread across 56 acres of lush gardens with a private beach, Taj Exotica is Goa''s most prestigious address. The Mediterranean-styled architecture, barefoot luxury ethos, and legendary Taj hospitality create weddings that are both elegant and joyful. Your guests will talk about this celebration for years.',
  140, 500, 4500000, 5, 4.9, 201,
  ARRAY['Private Beach', 'Golf Course', 'Jiva Spa', 'Multiple Pools', 'Water Sports', 'Fine Dining'],
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
  ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
  '[{"name": "Beach Lawn", "capacity": 500, "type": "outdoor", "area_sqft": 25000}, {"name": "Grand Ballroom", "capacity": 350, "type": "indoor", "area_sqft": 10000}]'::jsonb,
  true, true, true
FROM destinations d WHERE d.slug = 'goa';

INSERT INTO venues (
  destination_id, name, slug, venue_type, city, state, tagline, description,
  total_rooms, max_guest_capacity, starting_price, star_rating, rating, review_count,
  amenities, hero_image_url, gallery_images, event_spaces, is_featured, is_verified, is_active
)
SELECT
  d.id,
  'W Goa',
  'w-goa',
  'resort',
  'North Goa',
  'Goa',
  'Vibrant. Bold. Unforgettable.',
  'W Goa brings its signature bold energy to India''s party capital. Contemporary design, stunning beach access, and a vibe that''s always celebration-ready make this perfect for couples who want their wedding to be an experience guests will never forget. When the sun sets, the party begins.',
  109, 350, 3000000, 5, 4.7, 112,
  ARRAY['Beach Access', 'Infinity Pool', 'AWAY Spa', 'Nightlife', 'DJ', 'WET Deck'],
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
  ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
  '[{"name": "WET Deck", "capacity": 200, "type": "outdoor", "area_sqft": 8000}, {"name": "Great Room", "capacity": 250, "type": "indoor", "area_sqft": 6000}]'::jsonb,
  true, true, true
FROM destinations d WHERE d.slug = 'goa';

-- JAIPUR VENUES
INSERT INTO venues (
  destination_id, name, slug, venue_type, city, state, tagline, description,
  total_rooms, max_guest_capacity, starting_price, star_rating, rating, review_count,
  amenities, hero_image_url, gallery_images, event_spaces, is_featured, is_verified, is_active
)
SELECT
  d.id,
  'Rambagh Palace',
  'rambagh-palace',
  'palace',
  'Jaipur',
  'Rajasthan',
  'The Jewel of Jaipur',
  'Once the residence of the Maharaja of Jaipur, Rambagh Palace is the gold standard for royal Indian weddings. The stunning Mughal gardens, the ornate interiors, and the palpable sense of history create weddings that are truly fit for royalty. Every corner tells a story; let yours be the next chapter.',
  78, 600, 4000000, 5, 4.9, 223,
  ARRAY['Mughal Gardens', 'Polo Bar', 'Spa', 'Heritage Walks', 'Royal Experiences'],
  'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200',
  ARRAY['https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800'],
  '[{"name": "Mughal Gardens", "capacity": 600, "type": "outdoor", "area_sqft": 35000}, {"name": "Maharani Hall", "capacity": 200, "type": "indoor", "area_sqft": 5000}]'::jsonb,
  true, true, true
FROM destinations d WHERE d.slug = 'jaipur';

INSERT INTO venues (
  destination_id, name, slug, venue_type, city, state, tagline, description,
  total_rooms, max_guest_capacity, starting_price, star_rating, rating, review_count,
  amenities, hero_image_url, gallery_images, event_spaces, is_featured, is_verified, is_active
)
SELECT
  d.id,
  'Taj Jai Mahal Palace',
  'taj-jai-mahal-palace',
  'palace',
  'Jaipur',
  'Rajasthan',
  '18 Acres of Royal Gardens',
  'Set within 18 acres of beautifully manicured Mughal gardens, Taj Jai Mahal Palace is a 275-year-old heritage treasure. The sprawling lawns offer unlimited possibilities for grand celebrations, while the palace interiors transport you to an era of royal splendor.',
  100, 800, 3500000, 5, 4.8, 178,
  ARRAY['Mughal Gardens', 'Multiple Lawns', 'Spa', 'Heritage Property', 'Fine Dining'],
  'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200',
  ARRAY['https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800'],
  '[{"name": "Royal Lawn", "capacity": 800, "type": "outdoor", "area_sqft": 40000}, {"name": "Durbar Hall", "capacity": 300, "type": "indoor", "area_sqft": 8000}]'::jsonb,
  true, true, true
FROM destinations d WHERE d.slug = 'jaipur';

-- =============================================
-- SEED REVIEWS
-- =============================================

-- Taj Lake Palace Reviews
INSERT INTO reviews (
  reviewer_name, reviewer_city, venue_id, review_type, rating, title, content,
  rating_venue, rating_food, rating_service, rating_value, rating_ambiance,
  pros, cons, wedding_date, wedding_type, guest_count, events_hosted, status
)
SELECT
  'Priya & Rahul Sharma',
  'Mumbai',
  v.id,
  'venue',
  5,
  'A Dream Wedding We''ll Never Forget',
  'From the moment we arrived by boat at sunset, we knew we had made the perfect choice. Taj Lake Palace exceeded every expectation. The staff remembered our guests'' names, the food was extraordinary, and the setting... words cannot describe watching the pheras with Lake Pichola shimmering behind us. Our parents cried happy tears. This wasn''t just a wedding; it was the beginning of our fairy tale.',
  5, 5, 5, 4, 5,
  ARRAY['Unmatched romantic setting', 'Impeccable service', 'Food was extraordinary', 'Staff went above and beyond'],
  ARRAY['Premium pricing (but worth every rupee)', 'Limited capacity for large weddings'],
  '2024-12-15'::date,
  'destination',
  200,
  ARRAY['Mehendi', 'Sangeet', 'Wedding', 'Reception'],
  'approved'
FROM venues v WHERE v.slug = 'taj-lake-palace';

INSERT INTO reviews (
  reviewer_name, reviewer_city, venue_id, review_type, rating, title, content,
  rating_venue, rating_food, rating_service, rating_value, rating_ambiance,
  pros, cons, wedding_date, wedding_type, guest_count, events_hosted, status
)
SELECT
  'Ananya & Vikram Malhotra',
  'Delhi',
  v.id,
  'venue',
  5,
  'Pure Magic on the Lake',
  'We researched venues for 8 months, and nothing came close to Taj Lake Palace. The palace floating on the lake, the attention to detail, the way they handled 180 guests across 3 days - absolutely flawless. Our wedding planner said in 15 years, she''d never seen a venue execute so perfectly. The Mewar Terrace at night with the city lights reflecting on the water - our guests still message us about it!',
  5, 5, 5, 5, 5,
  ARRAY['Breathtaking venue', 'World-class execution', 'Memorable experience for guests', 'Professional team'],
  ARRAY['Book at least 12 months in advance'],
  '2024-11-20'::date,
  'destination',
  180,
  ARRAY['Haldi', 'Wedding', 'Reception'],
  'approved'
FROM venues v WHERE v.slug = 'taj-lake-palace';

-- Leela Palace Reviews
INSERT INTO reviews (
  reviewer_name, reviewer_city, venue_id, review_type, rating, title, content,
  rating_venue, rating_food, rating_service, rating_value, rating_ambiance,
  pros, cons, wedding_date, wedding_type, guest_count, events_hosted, status
)
SELECT
  'Sneha & Arjun Kapoor',
  'Bangalore',
  v.id,
  'venue',
  5,
  'Royal Treatment from Start to Finish',
  'The Leela Palace made us feel like royalty from our first site visit. The Grand Lawn with its lake views took our breath away. What impressed us most was how they handled our complex requirements - two different caterers, specific decor vendors, and a guest list that kept changing. Nothing was too much trouble. The in-house coordinator Priya was exceptional - she anticipated needs before we voiced them.',
  5, 5, 5, 4, 5,
  ARRAY['Stunning views', 'Multiple venue options', 'Flexible with vendors', 'Amazing coordinator'],
  ARRAY['Can feel busy during peak season'],
  '2024-02-10'::date,
  'destination',
  350,
  ARRAY['Mehendi', 'Sangeet', 'Wedding', 'Reception'],
  'approved'
FROM venues v WHERE v.slug = 'leela-palace-udaipur';

-- Alila Diwa Reviews
INSERT INTO reviews (
  reviewer_name, reviewer_city, venue_id, review_type, rating, title, content,
  rating_venue, rating_food, rating_service, rating_value, rating_ambiance,
  pros, cons, wedding_date, wedding_type, guest_count, events_hosted, status
)
SELECT
  'Meera & Sameer Joshi',
  'Pune',
  v.id,
  'venue',
  5,
  'Intimate Perfection in the Paddy Fields',
  'We wanted something different from typical beach weddings, and Alila Diwa delivered beyond imagination. The Balinese architecture, the serene paddy field views, the exceptional food - everything was perfect for our 150-guest celebration. The infinity pool party on day 2 was the highlight! Staff was incredibly warm and helpful. The only thing to note - it''s not beachfront, but honestly, the paddy field sunsets were more magical.',
  5, 5, 5, 5, 5,
  ARRAY['Unique setting', 'Outstanding food', 'Peaceful atmosphere', 'Warm hospitality'],
  ARRAY['Not directly on beach', '10 PM music curfew outdoors'],
  '2024-03-08'::date,
  'destination',
  150,
  ARRAY['Pool Party', 'Sangeet', 'Wedding', 'Brunch'],
  'approved'
FROM venues v WHERE v.slug = 'alila-diwa-goa';

-- Rambagh Palace Reviews
INSERT INTO reviews (
  reviewer_name, reviewer_city, venue_id, review_type, rating, title, content,
  rating_venue, rating_food, rating_service, rating_value, rating_ambiance,
  pros, cons, wedding_date, wedding_type, guest_count, events_hosted, status
)
SELECT
  'Ishani & Aditya Birla',
  'Mumbai',
  v.id,
  'venue',
  5,
  'A Wedding Fit for Royalty',
  'Rambagh Palace isn''t just a venue; it''s an experience of royal India. Walking through the same halls where maharajas celebrated, hosting our sangeet in the stunning Mughal gardens, having our pheras in the most ornate setting imaginable - it was surreal. The staff treats you like royalty. Our NRI relatives said they''d never experienced anything like this anywhere in the world.',
  5, 5, 5, 4, 5,
  ARRAY['Unmatched heritage', 'Stunning gardens', 'Royal experience', 'Excellent staff'],
  ARRAY['Traditional setup may limit modern decor', 'High pricing'],
  '2024-12-05'::date,
  'destination',
  500,
  ARRAY['Mehendi', 'Sangeet', 'Wedding', 'Reception'],
  'approved'
FROM venues v WHERE v.slug = 'rambagh-palace';

-- Wedding Planner Reviews (general)
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

-- Update venue review counts and ratings
UPDATE venues SET
  review_count = (SELECT COUNT(*) FROM reviews WHERE venue_id = venues.id AND status = 'approved'),
  rating = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE venue_id = venues.id AND status = 'approved');
