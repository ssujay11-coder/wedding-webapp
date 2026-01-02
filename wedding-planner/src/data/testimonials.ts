/**
 * Comprehensive Testimonials Database
 * Real-feeling testimonials from couples who had destination weddings
 * Covers palace weddings, beach weddings, international destinations, intimate & grand celebrations
 */

export interface Testimonial {
  id: string;
  coupleName: string;
  location: string;
  locationSlug: string;
  country: 'India' | 'Thailand' | 'UAE';
  venue: string;
  date: string;
  quote: string;
  shortQuote: string;
  rating: number;
  guestCount: string;
  image?: string;
  videoTestimonial?: string;
  weddingType?: 'palace' | 'beach' | 'international' | 'intimate' | 'grand';
  highlights?: string[];
}

export const testimonials: Testimonial[] = [
  // ============================================
  // PALACE WEDDINGS - UDAIPUR
  // ============================================
  {
    id: "testimonial-001",
    coupleName: "Priya & Arjun",
    location: "Udaipur, Rajasthan",
    locationSlug: "udaipur",
    country: "India",
    venue: "Oberoi Udaivilas",
    date: "December 2023",
    quote: "Walking through the courtyards of Udaivilas felt like stepping into a fairytale. The team coordinated 47 vendors seamlessly across three days, and when Arjun saw me descending the palace steps during our pheras, we both knew this was beyond anything we'd dreamed. Our families still talk about the boat procession on Lake Pichola.",
    shortQuote: "Walking through Udaivilas felt like stepping into a fairytale we never wanted to wake from.",
    rating: 5.0,
    guestCount: "350 guests",
    image: "/images/testimonials/couple-1.webp",
    videoTestimonial: "https://videos.eliteweddings.com/testimonials/priya-arjun",
    weddingType: "palace",
    highlights: ["Lake Pichola boat procession", "Three-day celebration", "47 vendors coordinated"]
  },
  {
    id: "testimonial-002",
    coupleName: "Meera & Vikram",
    location: "Udaipur, Rajasthan",
    locationSlug: "udaipur",
    country: "India",
    venue: "Taj Lake Palace",
    date: "February 2024",
    quote: "Getting married on an island palace in the middle of a lake sounded impossible when we first mentioned it to our parents. The planning team made the impossible feel effortless. From arranging boat transfers for 280 guests to the surprise fireworks display, every moment was orchestrated with such precision and heart.",
    shortQuote: "They made the impossible feel effortless - our island palace wedding was pure magic.",
    rating: 5.0,
    guestCount: "280 guests",
    image: "/images/testimonials/couple-2.webp",
    weddingType: "palace",
    highlights: ["Island palace venue", "Boat transfers for all guests", "Surprise fireworks"]
  },
  {
    id: "testimonial-003",
    coupleName: "Ananya & Rohan",
    location: "Udaipur, Rajasthan",
    locationSlug: "udaipur",
    country: "India",
    venue: "The Leela Palace Udaipur",
    date: "November 2023",
    quote: "As someone who planned events professionally, I was skeptical about handing over control. Within the first meeting, I knew I'd found kindred spirits. They understood that our wedding wasn't just an event - it was the merging of two families from different cultures. The way they honored both our Punjabi and South Indian traditions left our grandparents in tears of joy.",
    shortQuote: "They honored both our cultures so beautifully - our grandparents cried tears of joy.",
    rating: 4.9,
    guestCount: "420 guests",
    image: "/images/testimonials/couple-3.webp",
    videoTestimonial: "https://videos.eliteweddings.com/testimonials/ananya-rohan",
    weddingType: "grand",
    highlights: ["Cross-cultural celebration", "Punjabi-South Indian fusion", "Four-day festivities"]
  },

  // ============================================
  // PALACE WEDDINGS - JAIPUR
  // ============================================
  {
    id: "testimonial-004",
    coupleName: "Ishita & Kabir",
    location: "Jaipur, Rajasthan",
    locationSlug: "jaipur",
    country: "India",
    venue: "Rambagh Palace",
    date: "January 2024",
    quote: "Rambagh Palace was where Kabir's grandparents had celebrated their 50th anniversary. Getting married there meant everything to his family. The team researched the original celebration and incorporated subtle tributes throughout our wedding - the same flowers, similar music arrangements. When his grandmother recognized them, there wasn't a dry eye in the palace.",
    shortQuote: "They researched his grandparents' anniversary and wove those memories into our day.",
    rating: 5.0,
    guestCount: "300 guests",
    image: "/images/testimonials/couple-4.webp",
    weddingType: "palace",
    highlights: ["Multi-generational tribute", "Heritage venue", "Personalized details"]
  },
  {
    id: "testimonial-005",
    coupleName: "Tara & Aditya",
    location: "Jaipur, Rajasthan",
    locationSlug: "jaipur",
    country: "India",
    venue: "Samode Palace",
    date: "March 2024",
    quote: "We wanted something unconventional - a palace wedding that felt intimate, not overwhelming. Samode Palace with just 85 of our closest people was the perfect balance. The team created cozy corners throughout the haveli, and our guests told us it felt like a royal house party rather than a formal wedding.",
    shortQuote: "A royal house party - intimate, unconventional, and absolutely us.",
    rating: 4.9,
    guestCount: "85 guests",
    image: "/images/testimonials/tara-aditya.jpg",
    weddingType: "intimate",
    highlights: ["Intimate palace wedding", "Boutique haveli", "Personalized guest experience"]
  },
  {
    id: "testimonial-006",
    coupleName: "Kavya & Sidharth",
    location: "Jaipur, Rajasthan",
    locationSlug: "jaipur",
    country: "India",
    venue: "The Oberoi Rajvilas",
    date: "December 2023",
    quote: "The Rajvilas gardens at sunset were breathtaking, but what truly made our wedding special was the team's ability to manage my very opinionated extended family. They navigated cultural sensitivities, dietary requirements for 400 guests, and even handled a last-minute venue change for our sangeet due to weather - all without a single complaint from anyone.",
    shortQuote: "They managed my opinionated family, 400 guests, and a venue change - without a hitch.",
    rating: 4.9,
    guestCount: "400 guests",
    image: "/images/testimonials/kavya-sidharth.jpg",
    weddingType: "grand",
    highlights: ["Garden sunset ceremony", "Weather contingency", "Large family coordination"]
  },

  // ============================================
  // PALACE WEDDINGS - JODHPUR
  // ============================================
  {
    id: "testimonial-007",
    coupleName: "Rhea & Sameer",
    location: "Jodhpur, Rajasthan",
    locationSlug: "jodhpur",
    country: "India",
    venue: "Umaid Bhawan Palace",
    date: "December 2023",
    quote: "When Sameer proposed at Mehrangarh Fort during our trip to Jodhpur, I knew we had to return for our wedding. Umaid Bhawan exceeded every expectation. The Art Deco interiors, the sprawling lawns, the sunset ceremony overlooking the blue city - it was cinematic. The planning team turned our vision board into reality, down to the exact shade of marigold we'd pinned.",
    shortQuote: "They turned our vision board into reality, down to the exact shade of marigold.",
    rating: 5.0,
    guestCount: "380 guests",
    image: "/images/testimonials/rhea-sameer.jpg",
    videoTestimonial: "https://videos.eliteweddings.com/testimonials/rhea-sameer",
    weddingType: "grand",
    highlights: ["Art Deco palace", "Sunset ceremony", "Blue city views"]
  },
  {
    id: "testimonial-008",
    coupleName: "Kavya & Aryan",
    location: "Jodhpur, Rajasthan",
    locationSlug: "jodhpur",
    country: "India",
    venue: "RAAS Jodhpur",
    date: "October 2023",
    quote: "RAAS was love at first sight - those red sandstone walls against the Mehrangarh backdrop. What amazed us was how the team managed everything while we were in New York. Weekly video updates, a dedicated WhatsApp group, real-time decisions. By the time we flew in three days before, it felt like we'd been there all along.",
    shortQuote: "They managed our entire wedding from across the world - we never felt far away.",
    rating: 4.8,
    guestCount: "150 guests",
    image: "/images/testimonials/kavya-aryan.jpg",
    weddingType: "palace",
    highlights: ["NRI wedding coordination", "Boutique heritage hotel", "Remote planning"]
  },

  // ============================================
  // BEACH WEDDINGS - GOA
  // ============================================
  {
    id: "testimonial-009",
    coupleName: "Natasha & Dev",
    location: "South Goa",
    locationSlug: "goa",
    country: "India",
    venue: "Taj Exotica Resort & Spa",
    date: "January 2024",
    quote: "Dev and I met on a Goa trip, so getting married with sand between our toes felt right. But beach weddings come with challenges - the wind, the tide, the unpredictable weather. The team had Plan A through E ready. When a sudden drizzle came during our sangeet, they transformed the indoor space so seamlessly that guests thought it was always meant to be there.",
    shortQuote: "When the drizzle came, they transformed everything so seamlessly - pure professionalism.",
    rating: 4.9,
    guestCount: "200 guests",
    image: "/images/testimonials/natasha-dev.jpg",
    videoTestimonial: "https://videos.eliteweddings.com/testimonials/natasha-dev",
    weddingType: "beach",
    highlights: ["Beachfront ceremony", "Weather contingency executed", "Barefoot elegance"]
  },
  {
    id: "testimonial-010",
    coupleName: "Zara & Nikhil",
    location: "North Goa",
    locationSlug: "goa",
    country: "India",
    venue: "W Goa",
    date: "November 2023",
    quote: "We wanted a wedding that felt like a music festival - multiple stages, surprise performances, guests dancing till sunrise. W Goa's energy matched ours perfectly. The planning team brought in DJs from Mumbai, set up a secret after-party by the pool, and somehow managed to keep it all under budget. Best three days of our lives.",
    shortQuote: "A wedding that felt like a music festival - multiple stages, dancing till sunrise.",
    rating: 5.0,
    guestCount: "175 guests",
    image: "/images/testimonials/zara-nikhil.jpg",
    weddingType: "beach",
    highlights: ["Festival-style wedding", "Multiple performance stages", "Secret after-party"]
  },
  {
    id: "testimonial-011",
    coupleName: "Simran & Jai",
    location: "South Goa",
    locationSlug: "goa",
    country: "India",
    venue: "Alila Diwa Goa",
    date: "February 2024",
    quote: "After postponing twice due to COVID, we'd almost given up on our dream Goan wedding. The team not only made it happen but made it worth the wait. The paddy field backdrop, the Konkani-Punjabi fusion menu, the fireworks over the pool - every element told our story. Three postponements later, it was absolutely perfect.",
    shortQuote: "Three postponements later, they made our dream wedding worth every moment of waiting.",
    rating: 4.9,
    guestCount: "250 guests",
    image: "/images/testimonials/simran-jai.jpg",
    weddingType: "beach",
    highlights: ["COVID postponement recovery", "Fusion cuisine", "Paddy field ceremony"]
  },
  {
    id: "testimonial-012",
    coupleName: "Tanya & Mihir",
    location: "Goa",
    locationSlug: "goa",
    country: "India",
    venue: "Fazenda Portuguesa",
    date: "January 2024",
    quote: "As a Goan bride marrying a Gujarati groom, blending our traditions was important. Fazenda's Portuguese heritage matched Goa's soul. The team created a wedding that moved from Catholic church blessing to Hindu ceremony to Gujarati garba night, all feeling cohesive and authentic. My maid of honor called it 'culturally harmonious excellence.'",
    shortQuote: "Church blessing to Hindu ceremony to garba night - culturally harmonious excellence.",
    rating: 4.9,
    guestCount: "180 guests",
    image: "/images/testimonials/tanya-mihir.jpg",
    weddingType: "beach",
    highlights: ["Multi-faith celebration", "Portuguese heritage venue", "Cultural fusion"]
  },

  // ============================================
  // INTERNATIONAL WEDDINGS - DUBAI
  // ============================================
  {
    id: "testimonial-013",
    coupleName: "Aisha & Karan",
    location: "Dubai, UAE",
    locationSlug: "dubai",
    country: "UAE",
    venue: "Palazzo Versace Dubai",
    date: "April 2024",
    quote: "Planning an Indian wedding in Dubai for guests flying in from four continents seemed daunting. The team coordinated everything from visa letters to cultural dietary requirements. The Palazzo Versace staff were amazed at how smoothly our three-day celebration ran. Our international guests are still raving about the hospitality.",
    shortQuote: "Guests from four continents, three days of celebration - executed flawlessly.",
    rating: 5.0,
    guestCount: "400 guests",
    image: "/images/testimonials/aisha-karan.jpg",
    videoTestimonial: "https://videos.eliteweddings.com/testimonials/aisha-karan",
    weddingType: "international",
    highlights: ["Multi-continent guest coordination", "Luxury Italian palace", "Visa assistance"]
  },
  {
    id: "testimonial-014",
    coupleName: "Pooja & Rishi",
    location: "Dubai, UAE",
    locationSlug: "dubai",
    country: "UAE",
    venue: "Atlantis The Palm",
    date: "March 2024",
    quote: "Rishi proposed at Atlantis, so coming back for our wedding was symbolic. What surprised us was how the team personalized everything for Dubai's unique logistics - from prayer room timings to the spectacular underwater photography session at the aquarium. They didn't just plan a wedding; they curated an experience.",
    shortQuote: "From the proposal to the 'I do' - Atlantis became our love story's home.",
    rating: 4.9,
    guestCount: "320 guests",
    image: "/images/testimonials/pooja-rishi.jpg",
    weddingType: "international",
    highlights: ["Underwater photography", "Iconic venue", "Return to proposal location"]
  },
  {
    id: "testimonial-015",
    coupleName: "Neha & Vivaan",
    location: "Dubai, UAE",
    locationSlug: "dubai",
    country: "UAE",
    venue: "One&Only Royal Mirage",
    date: "January 2024",
    quote: "We chose Dubai for its neutrality - my family from India, his from the US, friends from across the globe. Royal Mirage's Arabian architecture created the perfect backdrop. The team's attention to detail extended to creating a family WhatsApp group that became our unofficial wedding countdown - everyone felt included from day one.",
    shortQuote: "They made guests across continents feel like one family from day one.",
    rating: 4.8,
    guestCount: "180 guests",
    image: "/images/testimonials/neha-vivaan.jpg",
    weddingType: "international",
    highlights: ["Global guest list", "Arabian architecture", "Family coordination"]
  },
  {
    id: "testimonial-016",
    coupleName: "Fatima & Ahmed",
    location: "Abu Dhabi, UAE",
    locationSlug: "abu-dhabi",
    country: "UAE",
    venue: "Emirates Palace",
    date: "December 2023",
    quote: "Emirates Palace was our dream venue, but coordinating a wedding of 500 guests across two cultures felt overwhelming. The team brought in specialists for both our Arabic and Indian ceremonies, ensured halal catering met everyone's standards, and even arranged a dhow cruise for our international guests. It was royalty-level service throughout.",
    shortQuote: "Royalty-level service - two cultures, 500 guests, zero compromises.",
    rating: 5.0,
    guestCount: "500 guests",
    image: "/images/testimonials/fatima-ahmed.jpg",
    videoTestimonial: "https://videos.eliteweddings.com/testimonials/fatima-ahmed",
    weddingType: "grand",
    highlights: ["Dual-culture ceremony", "Dhow cruise", "Presidential venue"]
  },

  // ============================================
  // INTERNATIONAL WEDDINGS - THAILAND
  // ============================================
  {
    id: "testimonial-017",
    coupleName: "Diya & Arjun",
    location: "Phuket, Thailand",
    locationSlug: "phuket",
    country: "Thailand",
    venue: "Amanpuri",
    date: "May 2024",
    quote: "Thailand was our happy place - where we vacationed, where we fell deeper in love. Amanpuri's serenity was exactly what we wanted. The team navigated Thai wedding regulations, imported our preferred vendors from Mumbai, and even arranged for a Buddhist blessing alongside our Hindu ceremony. East truly met East in the most beautiful way.",
    shortQuote: "East met East beautifully - Hindu ceremony with a Buddhist blessing in paradise.",
    rating: 5.0,
    guestCount: "100 guests",
    image: "/images/testimonials/diya-arjun.jpg",
    videoTestimonial: "https://videos.eliteweddings.com/testimonials/diya-arjun",
    weddingType: "intimate",
    highlights: ["Multi-faith ceremony", "Vendor import coordination", "Legal navigation"]
  },
  {
    id: "testimonial-018",
    coupleName: "Sanya & Veer",
    location: "Koh Samui, Thailand",
    locationSlug: "koh-samui",
    country: "Thailand",
    venue: "Four Seasons Resort Koh Samui",
    date: "April 2024",
    quote: "Veer's only request was a sunset ceremony by the water. Mine was an intimate gathering of just 60 people. Koh Samui delivered both. The private villa setup meant our guests felt like they were at an exclusive retreat rather than a wedding. The team's local connections got us the best villa cluster and a private beach blessing.",
    shortQuote: "60 guests, private villas, sunset by the water - intimate perfection.",
    rating: 4.9,
    guestCount: "60 guests",
    image: "/images/testimonials/sanya-veer.jpg",
    weddingType: "intimate",
    highlights: ["Private villa cluster", "Beach blessing", "Sunset ceremony"]
  },
  {
    id: "testimonial-019",
    coupleName: "Anushka & Rahul",
    location: "Krabi, Thailand",
    locationSlug: "krabi",
    country: "Thailand",
    venue: "Phulay Bay, a Ritz-Carlton Reserve",
    date: "February 2024",
    quote: "We'd seen so many beach weddings that looked the same. Phulay Bay's dramatic limestone cliffs gave us something unique. The team designed a ceremony platform that seemed to float between the cliffs and the Andaman Sea. Our photographer called it the most stunning natural backdrop she'd ever shot. We couldn't agree more.",
    shortQuote: "A ceremony platform floating between cliffs and sea - utterly breathtaking.",
    rating: 5.0,
    guestCount: "120 guests",
    image: "/images/testimonials/anushka-rahul.jpg",
    weddingType: "beach",
    highlights: ["Limestone cliff backdrop", "Floating ceremony platform", "Andaman Sea views"]
  },
  {
    id: "testimonial-020",
    coupleName: "Emily & Rajan",
    location: "Phuket, Thailand",
    locationSlug: "phuket",
    country: "Thailand",
    venue: "Sri Panwa",
    date: "March 2024",
    quote: "As an American marrying into an Indian family, I was nervous about honoring traditions I didn't fully understand. The team became my cultural guides, explaining every ritual while helping me add personal touches. My mother-in-law told me it was the most beautiful blending of families she'd witnessed. Coming from her, that meant everything.",
    shortQuote: "They became my cultural guides - and my mother-in-law said it was the most beautiful wedding she'd witnessed.",
    rating: 4.9,
    guestCount: "150 guests",
    image: "/images/testimonials/emily-rajan.jpg",
    weddingType: "international",
    highlights: ["Cross-cultural education", "Family blending", "Clifftop venue"]
  },

  // ============================================
  // INTIMATE WEDDINGS (50-100 GUESTS)
  // ============================================
  {
    id: "testimonial-021",
    coupleName: "Maya & Kunal",
    location: "Rishikesh, Uttarakhand",
    locationSlug: "rishikesh",
    country: "India",
    venue: "Aloha on the Ganges",
    date: "October 2023",
    quote: "A spiritual wedding by the Ganges was our dream. The team understood we weren't looking for opulence but for meaning. The Ganga aarti during our sangeet, the simple yet elegant mandap overlooking the river, the Vedic ceremonies conducted by the priest they helped us find - it was soulful in ways we never imagined a wedding could be.",
    shortQuote: "Not opulence, but meaning - a soulful celebration by the sacred Ganges.",
    rating: 4.8,
    guestCount: "75 guests",
    image: "/images/testimonials/maya-kunal.jpg",
    weddingType: "intimate",
    highlights: ["Spiritual ceremony", "Ganga aarti", "Vedic traditions"]
  },
  {
    id: "testimonial-022",
    coupleName: "Aditi & Sahil",
    location: "Jim Corbett, Uttarakhand",
    locationSlug: "jim-corbett",
    country: "India",
    venue: "The Solluna Resort",
    date: "November 2023",
    quote: "We're both wildlife photographers, so a jungle wedding made perfect sense. The team sourced eco-friendly decor, arranged jeep safaris for our guests, and even timed our outdoor events to avoid disturbing the wildlife. Sustainable, adventurous, and utterly us. We spotted a tiger family on our first morning as a married couple.",
    shortQuote: "Eco-conscious, adventurous, perfectly us - we even spotted tigers on day one.",
    rating: 4.9,
    guestCount: "90 guests",
    image: "/images/testimonials/aditi-sahil.jpg",
    videoTestimonial: "https://videos.eliteweddings.com/testimonials/aditi-sahil",
    weddingType: "intimate",
    highlights: ["Eco-friendly celebration", "Wildlife safaris", "Sustainable decor"]
  },
  {
    id: "testimonial-023",
    coupleName: "Lavanya & Vihaan",
    location: "Coorg, Karnataka",
    locationSlug: "coorg",
    country: "India",
    venue: "Evolve Back Coorg",
    date: "March 2024",
    quote: "Coffee plantations, waterfalls, and a resort that feels like a Kodava village - Coorg was magic. The team incorporated local traditions we didn't even know existed. The wedding procession with traditional drums, the coffee-infused welcome drinks, the plantation dinner under the stars - every detail celebrated the land.",
    shortQuote: "Coffee plantations and Kodava traditions - they celebrated the land we fell for.",
    rating: 4.9,
    guestCount: "80 guests",
    image: "/images/testimonials/lavanya-vihaan.jpg",
    weddingType: "intimate",
    highlights: ["Coffee plantation setting", "Local traditions", "Starlit dinner"]
  },
  {
    id: "testimonial-024",
    coupleName: "Prerna & Arnav",
    location: "Shimla, Himachal Pradesh",
    locationSlug: "shimla",
    country: "India",
    venue: "Wildflower Hall",
    date: "June 2024",
    quote: "The Himalayan backdrop at Wildflower Hall took everyone's breath away. With just 65 guests, we could truly spend time with each person. The team arranged mountain treks for our adventurous friends and spa days for the others. It wasn't just a wedding; it was a curated experience for everyone we love.",
    shortQuote: "65 guests, Himalayan backdrop, mountain treks - a curated experience for everyone we love.",
    rating: 5.0,
    guestCount: "65 guests",
    image: "/images/testimonials/prerna-arnav.jpg",
    weddingType: "intimate",
    highlights: ["Himalayan views", "Guest activities curated", "Intimate celebration"]
  },

  // ============================================
  // GRAND CELEBRATIONS (300-500+ GUESTS)
  // ============================================
  {
    id: "testimonial-025",
    coupleName: "Naina & Armaan",
    location: "Kerala",
    locationSlug: "kerala",
    country: "India",
    venue: "Kumarakom Lake Resort",
    date: "September 2023",
    quote: "Our wedding was a celebration of South Indian traditions at their finest. The team brought in Kathakali performers, arranged a traditional sadya on banana leaves for 300 guests, and organized a houseboat procession that our North Indian relatives are still talking about. They bridged two cultures with grace and authenticity.",
    shortQuote: "They bridged two cultures with grace - a South Indian celebration our Northern family adored.",
    rating: 5.0,
    guestCount: "300 guests",
    image: "/images/testimonials/naina-armaan.jpg",
    videoTestimonial: "https://videos.eliteweddings.com/testimonials/naina-armaan",
    weddingType: "grand",
    highlights: ["Houseboat procession", "Traditional sadya", "Kathakali performers"]
  },
  {
    id: "testimonial-026",
    coupleName: "Kiara & Aakash",
    location: "Jaisalmer, Rajasthan",
    locationSlug: "jaisalmer",
    country: "India",
    venue: "Suryagarh",
    date: "December 2023",
    quote: "We wanted the raw beauty of the desert, not another manicured palace lawn. Suryagarh delivered the golden sands, the star-filled skies, the authentic desert camp experience. The team organized a sand dune dinner for our close friends that felt like we'd been transported to another world. Pure, undiluted magic.",
    shortQuote: "Golden sands, star-filled skies - pure desert magic, not manicured perfection.",
    rating: 5.0,
    guestCount: "350 guests",
    image: "/images/testimonials/kiara-aakash.jpg",
    weddingType: "grand",
    highlights: ["Desert camp experience", "Sand dune dinner", "Stargazing"]
  },
  {
    id: "testimonial-027",
    coupleName: "Ira & Dhruv",
    location: "Agra, Uttar Pradesh",
    locationSlug: "agra",
    country: "India",
    venue: "The Oberoi Amarvilas",
    date: "February 2024",
    quote: "Getting married with the Taj Mahal as our backdrop was a childhood dream. The team secured permits for a sunrise photoshoot, coordinated with Amarvilas for the perfect phera timing when the Taj glows pink, and arranged a private Mughal-inspired dinner. Dhruv says my face when I saw the Taj during our first look was better than any photo.",
    shortQuote: "The Taj glowing pink during our pheras - my childhood dream materialized.",
    rating: 5.0,
    guestCount: "320 guests",
    image: "/images/testimonials/ira-dhruv.jpg",
    videoTestimonial: "https://videos.eliteweddings.com/testimonials/ira-dhruv",
    weddingType: "grand",
    highlights: ["Taj Mahal backdrop", "Sunrise photoshoot", "Mughal-inspired dinner"]
  },
  {
    id: "testimonial-028",
    coupleName: "Riya & Shaan",
    location: "Mussoorie, Uttarakhand",
    locationSlug: "mussoorie",
    country: "India",
    venue: "JW Marriott Mussoorie Walnut Grove",
    date: "June 2024",
    quote: "A summer hill station wedding was our escape from Delhi's heat. The misty mountains, the colonial charm, the intimate gathering - it was like a dream from a Bollywood movie. The team managed to fly in our entire decor team from Delhi and set up despite the winding mountain roads. Logistics experts, truly.",
    shortQuote: "Misty mountains, colonial charm - a Bollywood dream in the hills.",
    rating: 4.8,
    guestCount: "380 guests",
    image: "/images/testimonials/riya-shaan.jpg",
    weddingType: "grand",
    highlights: ["Hill station retreat", "Mountain logistics mastery", "Colonial venue"]
  },
  {
    id: "testimonial-029",
    coupleName: "Saira & Kabir",
    location: "Mumbai, Maharashtra",
    locationSlug: "mumbai",
    country: "India",
    venue: "Taj Mahal Palace",
    date: "December 2023",
    quote: "The Taj Palace Mumbai was the obvious choice for our Bollywood producer family's wedding. But we didn't want 'industry standard' - we wanted personal. The team designed a timeline that gave us private moments amidst the 450 guests, created a documentary-style video crew, and managed celebrity attendance without turning our wedding into a circus.",
    shortQuote: "450 guests, celebrity management, yet somehow deeply personal - that's talent.",
    rating: 5.0,
    guestCount: "450 guests",
    image: "/images/testimonials/saira-kabir.jpg",
    weddingType: "grand",
    highlights: ["Celebrity management", "Documentary coverage", "Private moments curated"]
  },
  {
    id: "testimonial-030",
    coupleName: "Aanya & Rehan",
    location: "Udaipur, Rajasthan",
    locationSlug: "udaipur",
    country: "India",
    venue: "Jagmandir Island Palace",
    date: "March 2024",
    quote: "Jagmandir at sunset, with 400 of our family and friends arriving by boat - it was cinematic. But what made it special was the team's insistence on authenticity. Every flower, every fabric, every ritual was researched and sourced locally. Our Rajasthani wedding felt like a tribute to the land, not a theme party.",
    shortQuote: "Not a theme party - a tribute to Rajasthan. Every detail was authentically sourced.",
    rating: 5.0,
    guestCount: "400 guests",
    image: "/images/testimonials/aanya-rehan.jpg",
    weddingType: "grand",
    highlights: ["Island palace", "Boat arrivals", "Authentic local sourcing"]
  }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get featured testimonials - returns the highest-rated testimonials
 * @param limit - Maximum number of testimonials to return (default: 6)
 * @returns Array of featured testimonials sorted by rating, then by guest count
 */
export function getFeaturedTestimonials(limit: number = 6): Testimonial[] {
  return [...testimonials]
    .sort((a, b) => {
      // First sort by rating (descending)
      if (b.rating !== a.rating) return b.rating - a.rating;
      // Then by guest count (descending) for same ratings
      const aGuests = parseInt(a.guestCount.replace(/\D/g, ''), 10);
      const bGuests = parseInt(b.guestCount.replace(/\D/g, ''), 10);
      return bGuests - aGuests;
    })
    .slice(0, limit);
}

/**
 * Get testimonials filtered by location
 * Performs a case-insensitive partial match on the location field
 * @param location - Location string to search for (e.g., "Udaipur", "Dubai", "Phuket")
 * @returns Array of matching testimonials
 */
export function getTestimonialsByLocation(location: string): Testimonial[] {
  const searchTerm = location.toLowerCase();
  return testimonials.filter(
    (t) =>
      t.location.toLowerCase().includes(searchTerm) ||
      t.locationSlug.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get random testimonials for display variety
 * Uses Fisher-Yates shuffle algorithm for true randomness
 * @param count - Number of random testimonials to return (default: 3)
 * @returns Array of randomly selected testimonials
 */
export function getRandomTestimonials(count: number = 3): Testimonial[] {
  const shuffled = [...testimonials];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, testimonials.length));
}

/**
 * Get testimonials by country
 * @param country - Country filter ('India' | 'Thailand' | 'UAE')
 * @returns Array of testimonials from that country
 */
export function getTestimonialsByCountry(
  country: 'India' | 'Thailand' | 'UAE'
): Testimonial[] {
  return testimonials.filter((t) => t.country === country);
}

/**
 * Get testimonials by wedding type
 * @param type - Type of wedding ('palace' | 'beach' | 'international' | 'intimate' | 'grand')
 * @returns Array of matching testimonials
 */
export function getTestimonialsByType(
  type: Testimonial['weddingType']
): Testimonial[] {
  return testimonials.filter((t) => t.weddingType === type);
}

/**
 * Get testimonials with video content
 * @returns Array of testimonials that have video testimonials
 */
export function getVideoTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.videoTestimonial);
}

/**
 * Get testimonials by guest count range
 * @param minGuests - Minimum guest count
 * @param maxGuests - Maximum guest count
 * @returns Array of testimonials within the guest count range
 */
export function getTestimonialsByGuestCount(
  minGuests: number,
  maxGuests: number
): Testimonial[] {
  return testimonials.filter((t) => {
    const guestCount = parseInt(t.guestCount.replace(/\D/g, ''), 10);
    return guestCount >= minGuests && guestCount <= maxGuests;
  });
}

/**
 * Get testimonials by venue name
 * @param venueName - Partial or full venue name to search for
 * @returns Array of matching testimonials
 */
export function getTestimonialsByVenue(venueName: string): Testimonial[] {
  const searchTerm = venueName.toLowerCase();
  return testimonials.filter((t) =>
    t.venue.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get a single testimonial by ID
 * @param id - The testimonial ID
 * @returns The testimonial or undefined if not found
 */
export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find((t) => t.id === id);
}

/**
 * Get testimonials sorted by date (most recent first)
 * @param limit - Maximum number to return (optional)
 * @returns Array of testimonials sorted by date
 */
export function getRecentTestimonials(limit?: number): Testimonial[] {
  const monthOrder: Record<string, number> = {
    january: 1, february: 2, march: 3, april: 4,
    may: 5, june: 6, july: 7, august: 8,
    september: 9, october: 10, november: 11, december: 12
  };

  const sorted = [...testimonials].sort((a, b) => {
    const [aMonth, aYear] = a.date.toLowerCase().split(' ');
    const [bMonth, bYear] = b.date.toLowerCase().split(' ');

    const aYearNum = parseInt(aYear, 10);
    const bYearNum = parseInt(bYear, 10);

    if (aYearNum !== bYearNum) return bYearNum - aYearNum;
    return (monthOrder[bMonth] || 0) - (monthOrder[aMonth] || 0);
  });

  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get statistics about all testimonials
 * @returns Object containing various statistics
 */
export function getTestimonialStats(): {
  totalCount: number;
  averageRating: number;
  totalGuests: number;
  locationCount: number;
  venueCount: number;
  countryBreakdown: Record<string, number>;
  typeBreakdown: Record<string, number>;
} {
  const uniqueLocations = new Set(testimonials.map((t) => t.location));
  const uniqueVenues = new Set(testimonials.map((t) => t.venue));
  const totalGuests = testimonials.reduce((sum, t) => {
    return sum + parseInt(t.guestCount.replace(/\D/g, ''), 10);
  }, 0);
  const averageRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  const countryBreakdown: Record<string, number> = {};
  const typeBreakdown: Record<string, number> = {};

  testimonials.forEach((t) => {
    countryBreakdown[t.country] = (countryBreakdown[t.country] || 0) + 1;
    if (t.weddingType) {
      typeBreakdown[t.weddingType] = (typeBreakdown[t.weddingType] || 0) + 1;
    }
  });

  return {
    totalCount: testimonials.length,
    averageRating: Math.round(averageRating * 100) / 100,
    totalGuests,
    locationCount: uniqueLocations.size,
    venueCount: uniqueVenues.size,
    countryBreakdown,
    typeBreakdown,
  };
}

/**
 * Search testimonials by keyword in quote or highlights
 * @param keyword - Search term
 * @returns Array of matching testimonials
 */
export function searchTestimonials(keyword: string): Testimonial[] {
  const searchTerm = keyword.toLowerCase();
  return testimonials.filter((t) => {
    const inQuote = t.quote.toLowerCase().includes(searchTerm);
    const inShortQuote = t.shortQuote.toLowerCase().includes(searchTerm);
    const inHighlights = t.highlights?.some(h =>
      h.toLowerCase().includes(searchTerm)
    );
    const inVenue = t.venue.toLowerCase().includes(searchTerm);
    const inLocation = t.location.toLowerCase().includes(searchTerm);

    return inQuote || inShortQuote || inHighlights || inVenue || inLocation;
  });
}

// Default export for convenient importing
export default testimonials;
