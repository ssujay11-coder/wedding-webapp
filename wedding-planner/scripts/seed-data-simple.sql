-- =============================================
-- SEED DATA - Destinations
-- =============================================

INSERT INTO destinations (name, slug, city, state, country, tagline, description, hero_image_url, best_season, is_featured) VALUES
('Udaipur', 'udaipur', 'Udaipur', 'Rajasthan', 'India', 'The City of Lakes', 'Udaipur, the romantic City of Lakes, offers the most enchanting backdrop for destination weddings in India.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80', 'October to March', true),
('Jaipur', 'jaipur', 'Jaipur', 'Rajasthan', 'India', 'The Pink City', 'Jaipur combines royal grandeur with vibrant culture for unforgettable wedding celebrations.', 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=80', 'October to March', true),
('Goa', 'goa', 'Goa', 'Goa', 'India', 'Beach Paradise', 'Goa offers stunning beaches and Portuguese heritage for romantic beach weddings.', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=80', 'November to February', true),
('Kerala', 'kerala', 'Kochi', 'Kerala', 'India', 'Gods Own Country', 'Kerala backwaters and lush greenery create a serene setting for intimate weddings.', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=80', 'September to March', true),
('Jodhpur', 'jodhpur', 'Jodhpur', 'Rajasthan', 'India', 'The Blue City', 'Jodhpur mighty forts and blue cityscape offer a majestic royal wedding experience.', 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&q=80', 'October to March', true),
('Mumbai', 'mumbai', 'Mumbai', 'Maharashtra', 'India', 'City of Dreams', 'Mumbai blends Bollywood glamour with world-class venues for spectacular celebrations.', 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=80', 'November to February', false),
('Delhi', 'delhi', 'New Delhi', 'Delhi', 'India', 'The Capital', 'Delhi offers heritage venues and modern luxury for grand Indian weddings.', 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&q=80', 'October to March', false)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- SEED DATA - Venues
-- =============================================

INSERT INTO venues (name, slug, city, state, venue_type, star_rating, description, total_rooms, max_guest_capacity, starting_price, hero_image_url, rating, is_featured, is_active) VALUES
('Oberoi Udaivilas', 'oberoi-udaivilas-udaipur', 'Udaipur', 'Rajasthan', 'Palace', 5, 'Set on the banks of Lake Pichola, Oberoi Udaivilas is consistently rated among the worlds best hotels.', 87, 500, 5000000, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80', 4.9, true, true),
('Taj Lake Palace', 'taj-lake-palace-udaipur', 'Udaipur', 'Rajasthan', 'Palace', 5, 'A floating marble palace in the middle of Lake Pichola, offering unparalleled romance.', 65, 300, 4500000, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80', 4.8, true, true),
('Umaid Bhawan Palace', 'umaid-bhawan-palace-jodhpur', 'Jodhpur', 'Rajasthan', 'Palace', 5, 'One of the worlds largest private residences, offering royal wedding experiences.', 64, 400, 6000000, 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&q=80', 4.9, true, true),
('Taj Exotica Goa', 'taj-exotica-goa', 'Goa', 'Goa', 'Beach Resort', 5, 'Mediterranean-style luxury resort on pristine Benaulim Beach.', 140, 600, 3500000, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80', 4.7, true, true),
('Leela Palace Udaipur', 'leela-palace-udaipur', 'Udaipur', 'Rajasthan', 'Palace', 5, 'Majestic lakeside palace with stunning Aravalli views.', 80, 450, 4000000, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80', 4.8, true, true),
('ITC Grand Bharat', 'itc-grand-bharat-gurgaon', 'Gurgaon', 'Haryana', 'Heritage', 5, 'All-suite luxury retreat inspired by Indian palatial heritage.', 104, 800, 5500000, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80', 4.8, false, true),
('Rambagh Palace', 'rambagh-palace-jaipur', 'Jaipur', 'Rajasthan', 'Palace', 5, 'Former residence of the Maharaja of Jaipur, now a luxurious heritage hotel.', 78, 500, 4500000, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80', 4.8, true, true),
('Kumarakom Lake Resort', 'kumarakom-lake-resort', 'Kumarakom', 'Kerala', 'Backwater', 5, 'Luxury heritage resort on Vembanad Lake with traditional Kerala architecture.', 60, 300, 2500000, 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=80', 4.7, true, true)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- SEED DATA - Sample Reviews
-- =============================================

INSERT INTO reviews (reviewer_name, reviewer_city, venue_id, review_type, rating, title, content, wedding_date, guest_count, status)
SELECT
  'Priya & Rahul Sharma',
  'Mumbai',
  v.id,
  'venue',
  5,
  'A Fairytale Wedding at Udaivilas',
  'Our wedding at Oberoi Udaivilas was nothing short of magical. The lake views, impeccable service, and stunning decor made our special day unforgettable. The team went above and beyond to accommodate all our requests.',
  '2024-02-15',
  350,
  'approved'
FROM venues v WHERE v.slug = 'oberoi-udaivilas-udaipur';

INSERT INTO reviews (reviewer_name, reviewer_city, venue_id, review_type, rating, title, content, wedding_date, guest_count, status)
SELECT
  'Ananya & Vikram Mehta',
  'Delhi',
  v.id,
  'venue',
  5,
  'Royal Wedding Experience',
  'Umaid Bhawan Palace exceeded all our expectations. The grandeur, the service, the food - everything was perfect. Our guests are still talking about it!',
  '2024-01-20',
  400,
  'approved'
FROM venues v WHERE v.slug = 'umaid-bhawan-palace-jodhpur';

INSERT INTO reviews (reviewer_name, reviewer_city, venue_id, review_type, rating, title, content, wedding_date, guest_count, status)
SELECT
  'Kavya & Arjun Patel',
  'Bangalore',
  v.id,
  'venue',
  5,
  'Beach Wedding Paradise',
  'Our beach wedding at Taj Exotica was absolutely perfect. The sunset ceremony on the beach was breathtaking. Highly recommend for couples wanting a relaxed yet luxurious celebration.',
  '2024-03-10',
  200,
  'approved'
FROM venues v WHERE v.slug = 'taj-exotica-goa';
