// Portfolio data for Elite Wedding Planner
// Using frontend-design skill principles: luxury aesthetic, sophisticated animations

export interface PortfolioItem {
  id: string;
  title: string;
  couple: string;
  location: string;
  venue: string;
  category: "palace" | "beach" | "heritage" | "urban" | "international" | "intimate";
  date: string;
  guestCount: number;
  image: string;
  images: string[];
  description: string;
  highlights: string[];
  featured: boolean;
}

export const portfolioCategories = [
  { id: "all", label: "All Weddings", count: 200 },
  { id: "palace", label: "Palace Weddings", count: 45 },
  { id: "beach", label: "Beach Weddings", count: 38 },
  { id: "heritage", label: "Heritage Venues", count: 32 },
  { id: "urban", label: "Urban Luxury", count: 28 },
  { id: "international", label: "International", count: 35 },
  { id: "intimate", label: "Intimate Celebrations", count: 22 },
] as const;

export const portfolioItems: PortfolioItem[] = [
  {
    id: "priya-arjun-udaipur",
    title: "A Royal Affair at Taj Lake Palace",
    couple: "Priya & Arjun",
    location: "Udaipur, Rajasthan",
    venue: "Taj Lake Palace",
    category: "palace",
    date: "December 2024",
    guestCount: 350,
    image: "/images/portfolio/udaipur-palace-1.jpg",
    images: [
      "/images/portfolio/udaipur-palace-1.jpg",
      "/images/portfolio/udaipur-palace-2.jpg",
      "/images/portfolio/udaipur-palace-3.jpg",
    ],
    description: "A three-day celebration blending traditional Rajasthani grandeur with contemporary elegance. The couple's vision of a fairy-tale wedding came alive against the backdrop of Lake Pichola.",
    highlights: ["Boat procession for baraat", "1000+ marigold arrangements", "Live classical music"],
    featured: true,
  },
  {
    id: "maya-raj-goa",
    title: "Sunset Beach Romance",
    couple: "Maya & Raj",
    location: "Goa",
    venue: "W Goa",
    category: "beach",
    date: "February 2025",
    guestCount: 180,
    image: "/images/portfolio/goa-beach-1.jpg",
    images: [
      "/images/portfolio/goa-beach-1.jpg",
      "/images/portfolio/goa-beach-2.jpg",
    ],
    description: "An intimate beach wedding with boho-chic vibes. The ceremony took place during golden hour with the Arabian Sea as the perfect backdrop.",
    highlights: ["Barefoot ceremony", "Floating floral mandap", "Fire dancers at reception"],
    featured: true,
  },
  {
    id: "aisha-vikram-jaipur",
    title: "Heritage Splendor at Samode Palace",
    couple: "Aisha & Vikram",
    location: "Jaipur, Rajasthan",
    venue: "Samode Palace",
    category: "heritage",
    date: "November 2024",
    guestCount: 280,
    image: "/images/portfolio/jaipur-heritage-1.jpg",
    images: [
      "/images/portfolio/jaipur-heritage-1.jpg",
      "/images/portfolio/jaipur-heritage-2.jpg",
    ],
    description: "A celebration of love and legacy at one of Rajasthan's most stunning heritage properties. Every detail honored the couple's Rajput heritage while embracing modern luxury.",
    highlights: ["Elephant welcome", "Sheesh Mahal cocktail night", "Traditional folk performances"],
    featured: true,
  },
  {
    id: "sarah-kabir-dubai",
    title: "Glamour at Burj Al Arab",
    couple: "Sarah & Kabir",
    location: "Dubai, UAE",
    venue: "Burj Al Arab",
    category: "international",
    date: "January 2025",
    guestCount: 200,
    image: "/images/portfolio/dubai-luxury-1.jpg",
    images: [
      "/images/portfolio/dubai-luxury-1.jpg",
      "/images/portfolio/dubai-luxury-2.jpg",
    ],
    description: "A fusion celebration bringing together Indian traditions and Dubai's ultra-luxury hospitality. The couple created an unforgettable experience for guests from around the world.",
    highlights: ["Helicopter arrival", "Fountain show backdrop", "Michelin-star catering"],
    featured: true,
  },
  {
    id: "neha-rohan-mumbai",
    title: "Urban Elegance at Taj Lands End",
    couple: "Neha & Rohan",
    location: "Mumbai, Maharashtra",
    venue: "Taj Lands End",
    category: "urban",
    date: "March 2025",
    guestCount: 400,
    image: "/images/portfolio/mumbai-urban-1.jpg",
    images: [
      "/images/portfolio/mumbai-urban-1.jpg",
      "/images/portfolio/mumbai-urban-2.jpg",
    ],
    description: "A sophisticated city wedding that proved you don't need to travel far for luxury. The Arabian Sea views and impeccable Taj hospitality created magic.",
    highlights: ["Sea-facing mandap", "Celebrity performances", "Luxury car fleet"],
    featured: false,
  },
  {
    id: "kavya-aryan-kerala",
    title: "Backwater Bliss in Kerala",
    couple: "Kavya & Aryan",
    location: "Kumarakom, Kerala",
    venue: "Kumarakom Lake Resort",
    category: "beach",
    date: "October 2024",
    guestCount: 150,
    image: "/images/portfolio/kerala-backwater-1.jpg",
    images: [
      "/images/portfolio/kerala-backwater-1.jpg",
      "/images/portfolio/kerala-backwater-2.jpg",
    ],
    description: "A serene celebration amidst Kerala's enchanting backwaters. Traditional Kerala Sadya met contemporary luxury in this unique destination wedding.",
    highlights: ["Houseboat sangeet", "Kathakali performance", "Ayurvedic spa for guests"],
    featured: false,
  },
  {
    id: "isha-dev-jodhpur",
    title: "Blue City Magic at Umaid Bhawan",
    couple: "Isha & Dev",
    location: "Jodhpur, Rajasthan",
    venue: "Umaid Bhawan Palace",
    category: "palace",
    date: "December 2024",
    guestCount: 320,
    image: "/images/portfolio/jodhpur-palace-1.jpg",
    images: [
      "/images/portfolio/jodhpur-palace-1.jpg",
      "/images/portfolio/jodhpur-palace-2.jpg",
    ],
    description: "An Art Deco dream wedding at one of the world's largest private residences. The palace's golden sandstone glowed as the couple exchanged vows.",
    highlights: ["Private palace wing", "Vintage car collection", "Sunset camel parade"],
    featured: true,
  },
  {
    id: "tara-karan-intimate",
    title: "Intimate Garden Wedding",
    couple: "Tara & Karan",
    location: "Mussoorie, Uttarakhand",
    venue: "JW Marriott Mussoorie",
    category: "intimate",
    date: "April 2025",
    guestCount: 50,
    image: "/images/portfolio/mussoorie-intimate-1.jpg",
    images: [
      "/images/portfolio/mussoorie-intimate-1.jpg",
    ],
    description: "A micro-wedding that proved less is more. Against the backdrop of the Himalayas, 50 of their closest loved ones witnessed their beautiful union.",
    highlights: ["Mountain-view ceremony", "Farm-to-table dining", "Personalized vows"],
    featured: false,
  },
  {
    id: "ananya-veer-thailand",
    title: "Tropical Paradise in Phuket",
    couple: "Ananya & Veer",
    location: "Phuket, Thailand",
    venue: "Amanpuri",
    category: "international",
    date: "May 2025",
    guestCount: 120,
    image: "/images/portfolio/phuket-tropical-1.jpg",
    images: [
      "/images/portfolio/phuket-tropical-1.jpg",
      "/images/portfolio/phuket-tropical-2.jpg",
    ],
    description: "Where Indian grandeur meets Thai hospitality. This three-day celebration featured traditional ceremonies by the Andaman Sea.",
    highlights: ["Thai elephant blessing", "Private yacht party", "Lantern release ceremony"],
    featured: true,
  },
  {
    id: "riya-sameer-jaisalmer",
    title: "Desert Dreams in the Golden City",
    couple: "Riya & Sameer",
    location: "Jaisalmer, Rajasthan",
    venue: "Suryagarh",
    category: "heritage",
    date: "November 2024",
    guestCount: 200,
    image: "/images/portfolio/jaisalmer-desert-1.jpg",
    images: [
      "/images/portfolio/jaisalmer-desert-1.jpg",
      "/images/portfolio/jaisalmer-desert-2.jpg",
    ],
    description: "A magical celebration under the desert stars. The Thar Desert became the canvas for this extraordinary wedding weekend.",
    highlights: ["Dune dinner party", "Rajasthani puppet show", "Sunrise ceremony"],
    featured: false,
  },
  {
    id: "simran-aarav-chandigarh",
    title: "Modern Punjabi Celebration",
    couple: "Simran & Aarav",
    location: "Chandigarh",
    venue: "JW Marriott Chandigarh",
    category: "urban",
    date: "February 2025",
    guestCount: 500,
    image: "/images/portfolio/chandigarh-punjabi-1.jpg",
    images: [
      "/images/portfolio/chandigarh-punjabi-1.jpg",
    ],
    description: "A grand Punjabi wedding that celebrated love, family, and incredible food. Bhangra beats and designer fashion set the tone.",
    highlights: ["Grand baraat", "Live Sufi night", "500+ guest seating"],
    featured: false,
  },
  {
    id: "meera-arjun-coorg",
    title: "Coffee Plantation Romance",
    couple: "Meera & Arjun",
    location: "Coorg, Karnataka",
    venue: "Evolve Back",
    category: "intimate",
    date: "September 2024",
    guestCount: 75,
    image: "/images/portfolio/coorg-plantation-1.jpg",
    images: [
      "/images/portfolio/coorg-plantation-1.jpg",
    ],
    description: "Nestled among coffee plantations and misty hills, this eco-conscious wedding celebrated love in harmony with nature.",
    highlights: ["Plantation tour", "Local Kodava cuisine", "Bonfire sangeet"],
    featured: false,
  },
];

export const getFeaturedPortfolio = () =>
  portfolioItems.filter(item => item.featured);

export const getPortfolioByCategory = (category: string) =>
  category === "all"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === category);

export const getPortfolioItem = (id: string) =>
  portfolioItems.find(item => item.id === id);
