// Comprehensive Wedding Planning Services Data
// Based on actual services offered - NOT catering (5-star hotels have in-house catering)

// Icon names as strings for serialization compatibility with RSC
export type ServiceIconName =
  | "CalendarHeart"
  | "Users"
  | "Plane"
  | "Music"
  | "Flower2"
  | "UtensilsCrossed"
  | "Truck"
  | "Tv"
  | "UserCheck"
  | "Sparkles"
  | "Heart"
  | "Crown"
  | "Gem"
  | "Star";

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  iconName: ServiceIconName;
  heroImage: string;
  emotionalHook: string;
  painPoints: string[];
  solutions: string[];
  features: ServiceFeature[];
  process: ProcessStep[];
  testimonialQuote: string;
  testimonialAuthor: string;
  stats: ServiceStat[];
  faqs: FAQ[];
  cta: {
    primary: string;
    secondary: string;
  };
}

export interface ServiceFeature {
  title: string;
  description: string;
  iconName?: ServiceIconName;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const services: ServiceDetail[] = [
  {
    slug: "complete-wedding-planning",
    title: "Complete Wedding Planning",
    tagline: "From 'Yes' to 'I Do' — We Handle Everything",
    description: "Your wedding is the most important celebration of your life. Why spend countless sleepless nights juggling vendors, budgets, and timelines when you could be savoring this beautiful journey? Our Complete Wedding Planning service transforms the overwhelming into the extraordinary, giving you the freedom to be a bride or groom — not a project manager.",
    iconName: "CalendarHeart",
    heroImage: "/images/services/complete-planning.webp",
    emotionalHook: "Imagine walking down the aisle knowing every single detail has been perfected — from the first flower petal to the last goodbye. That's not a dream. That's what we deliver.",
    painPoints: [
      "Endless vendor calls that eat into your work and personal time",
      "Budget overruns that spiral out of control without expert guidance",
      "Family opinions pulling you in different directions",
      "The fear of something going wrong on the most important day",
      "Missing out on enjoying your own engagement because you're 'too busy planning'"
    ],
    solutions: [
      "One dedicated planner who becomes your wedding confidant and project commander",
      "Transparent budgeting with real-time tracking — no surprises, ever",
      "Diplomatic family coordination that keeps everyone happy (including you)",
      "Backup plans for backup plans — weather, vendors, logistics covered",
      "You focus on the joy. We focus on the execution."
    ],
    features: [
      {
        title: "Vision to Reality Design",
        description: "We don't just plan weddings — we translate your love story into an immersive experience. Every color, texture, and moment is curated to reflect who you are as a couple."
      },
      {
        title: "Budget Architecture",
        description: "Our proprietary budget framework has saved couples an average of 15-20% while upgrading their wedding experience. We know where to invest and where to save."
      },
      {
        title: "Vendor Dream Team Assembly",
        description: "Access to 200+ vetted vendors across India, Dubai, and Thailand. We negotiate, coordinate, and manage — you just approve."
      },
      {
        title: "Timeline Engineering",
        description: "Military-precision timelines that account for every second. Your guests experience seamless magic; they never see the orchestra we're conducting behind the scenes."
      },
      {
        title: "Crisis Prevention Protocol",
        description: "In 14 years, we've seen it all. Rain at outdoor weddings? Generator failures? Missing makeup artists? We have protocols for everything."
      },
      {
        title: "Family Politics Navigation",
        description: "Let's be honest — weddings bring out opinions. We act as the diplomatic buffer, ensuring traditions are honored while your vision remains intact."
      }
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Vision",
        description: "A deep-dive consultation where we understand not just what you want, but why. Your love story becomes our creative brief."
      },
      {
        step: "02",
        title: "Strategy & Budget",
        description: "We architect your budget, prioritize investments, and create a realistic roadmap that doesn't sacrifice magic for money."
      },
      {
        step: "03",
        title: "Design & Curation",
        description: "Mood boards, 3D renderings, and vendor presentations. You see your wedding before it happens."
      },
      {
        step: "04",
        title: "Execution & Celebration",
        description: "We command the operation. You walk down the aisle. Every moment unfolds exactly as imagined — or better."
      }
    ],
    testimonialQuote: "We thought we'd have to choose between a destination wedding and keeping our sanity. Elite gave us both. Every detail, from my grandmother's special dietary needs to the surprise fireworks, was handled with such care that we could actually BE at our wedding instead of running it.",
    testimonialAuthor: "Priya & Arjun, Udaipur Palace Wedding",
    stats: [
      { value: "500+", label: "Weddings Planned" },
      { value: "₹200Cr+", label: "Budgets Managed" },
      { value: "100%", label: "On-Time Delivery" },
      { value: "14", label: "Years Experience" }
    ],
    faqs: [
      {
        question: "How early should we start planning?",
        answer: "For destination weddings, 12-18 months is ideal. For local weddings, 6-9 months gives us the best vendor options. That said, we've executed stunning weddings in as little as 3 months — we just work differently, not less."
      },
      {
        question: "What if we already have some vendors booked?",
        answer: "Perfect! We seamlessly integrate your existing vendors into our management system. We're not here to replace your choices — we're here to elevate them."
      },
      {
        question: "How involved do we need to be?",
        answer: "As involved as you want to be. Some couples love every decision; others want to show up and be surprised. We adapt to your style."
      },
      {
        question: "What's included vs. extra?",
        answer: "Our planning fee covers all coordination, design, and management. Vendor costs, rentals, and actual services are separate and transparently tracked in your budget."
      }
    ],
    cta: {
      primary: "Start Your Planning Journey",
      secondary: "Download Our Wedding Planning Guide"
    }
  },
  {
    slug: "guest-management",
    title: "Guest List & RSVP Management",
    tagline: "Because Your Guests Deserve the Royal Treatment",
    description: "Your guests are traveling across cities, countries, and continents to celebrate your love. They're taking time off work, booking flights, and preparing outfits. The least we can do? Make them feel like VIPs from the moment they receive your invitation to the moment they leave with unforgettable memories.",
    iconName: "Users",
    heroImage: "/images/services/guest-management.webp",
    emotionalHook: "When your grandmother lands in Jaipur and there's someone holding a sign with her name, ready with her favorite chai — that's not just hospitality. That's love, orchestrated.",
    painPoints: [
      "Tracking 300+ guests across multiple events with different dietary needs",
      "RSVP chaos — who's coming to the Sangeet but skipping the Haldi?",
      "International guests with visa, currency, and travel confusion",
      "VIP family members requiring special attention and seating",
      "Last-minute additions and cancellations derailing your plans"
    ],
    solutions: [
      "Digital RSVP system with real-time tracking and automatic reminders",
      "Personalized guest profiles capturing preferences, allergies, and relationships",
      "Dedicated guest liaison for VIP and elderly guests",
      "Flexible headcount management with smart buffer calculations",
      "Seamless communication in multiple languages"
    ],
    features: [
      {
        title: "Smart RSVP Platform",
        description: "Custom digital invitations with integrated RSVP for multiple events. Guests can indicate dietary preferences, plus-ones, and event-specific attendance."
      },
      {
        title: "Guest Relationship Mapping",
        description: "We create visual maps of guest relationships to optimize seating, avoid awkward encounters, and ensure important people are positioned perfectly."
      },
      {
        title: "Real-Time Headcount Dashboard",
        description: "Access live attendance numbers anytime. Know exactly who's confirmed, pending, or declined — by event, by meal, by day."
      },
      {
        title: "Communication Concierge",
        description: "From save-the-dates to thank-you notes, we manage all guest communication with the perfect balance of warmth and information."
      },
      {
        title: "Special Needs Coordination",
        description: "Wheelchair accessibility, dietary restrictions, child care, prayer room requirements — every guest's needs are anticipated and addressed."
      },
      {
        title: "Gift Registry Management",
        description: "Optional integration with gift registries, tracking, and thank-you card coordination."
      }
    ],
    process: [
      {
        step: "01",
        title: "Guest Census",
        description: "We help you finalize your guest list, categorize relationships, and set attendance expectations."
      },
      {
        step: "02",
        title: "Platform Setup",
        description: "Custom RSVP system configured with your wedding details, events, and branding."
      },
      {
        step: "03",
        title: "Outreach & Tracking",
        description: "We manage all invitation dispatch, follow-ups, and response tracking."
      },
      {
        step: "04",
        title: "Real-Time Management",
        description: "Continuous monitoring and adjustment as RSVPs flow in and plans solidify."
      }
    ],
    testimonialQuote: "We had 450 guests from 7 countries. The thought of managing RSVPs made me want to elope. Elite's system was so seamless that my cousin in London and my aunt in Chennai had the exact same smooth experience. Zero confusion, zero stress.",
    testimonialAuthor: "Meera & Vikram, Mumbai Grand Wedding",
    stats: [
      { value: "50,000+", label: "Guests Managed" },
      { value: "98%", label: "RSVP Response Rate" },
      { value: "15+", label: "Countries Coordinated" },
      { value: "0", label: "Guest Left Behind" }
    ],
    faqs: [
      {
        question: "Can we send physical invitations too?",
        answer: "Absolutely! We coordinate digital and physical invitations. Many couples do a beautiful printed card followed by digital RSVP for convenience."
      },
      {
        question: "How do you handle last-minute additions?",
        answer: "We build 5-10% buffer into all our planning. Last-minute additions are accommodated smoothly without disrupting vendor arrangements."
      },
      {
        question: "What about guests who don't RSVP?",
        answer: "We have a polite follow-up sequence, and when needed, we make personal calls. In 14 years, we've achieved 98% response rates."
      }
    ],
    cta: {
      primary: "Simplify Your Guest Management",
      secondary: "See Demo RSVP System"
    }
  },
  {
    slug: "hospitality-logistics",
    title: "Hospitality & Travel Logistics",
    tagline: "Your Guests' Journey is Part of the Celebration",
    description: "A destination wedding isn't just an event — it's an experience that begins the moment your guests book their flights. When 200 people converge from different cities and countries, every detail matters. Lost luggage, missed pickups, or confused guests can mar the celebratory spirit. We ensure every arrival feels like a welcome and every departure feels like a fond farewell.",
    iconName: "Plane",
    heroImage: "/images/services/hospitality.webp",
    emotionalHook: "Your best friend lands at 2 AM after a delayed flight. Instead of hunting for a taxi, she's greeted by name, handed a welcome kit with tomorrow's schedule, and whisked to a pre-arranged room. She texts you: 'I already feel like royalty.' That's hospitality done right.",
    painPoints: [
      "Coordinating arrivals and departures across different times and airports",
      "Elderly guests or children needing special attention during travel",
      "International guests unfamiliar with local customs and currency",
      "Room allocation politics — who gets the suite, who feels slighted",
      "Guests getting lost in sprawling venue properties"
    ],
    solutions: [
      "Centralized travel desk with dedicated coordinators",
      "24/7 guest helpline for any issues during their stay",
      "Welcome kits with local essentials, schedule, and contact information",
      "Thoughtful room allocation that considers relationships and preferences",
      "On-ground guides at all major venues and events"
    ],
    features: [
      {
        title: "Airport Meet & Greet",
        description: "Uniformed representatives with name placards, immediate luggage assistance, and smooth transfers in premium vehicles."
      },
      {
        title: "Welcome Experience",
        description: "Custom welcome hampers in rooms — local treats, personalized schedules, emergency contact cards, and thoughtful touches that reflect your theme."
      },
      {
        title: "Hotel Coordination",
        description: "We liaise with hotels for early check-ins, late check-outs, room upgrades for VIPs, and any special requests."
      },
      {
        title: "Transportation Fleet",
        description: "Coordinated vehicle fleet for all wedding events. No guest is ever left waiting or wondering how to get somewhere."
      },
      {
        title: "24/7 Guest Helpline",
        description: "Dedicated phone line for guests to call with any question — from 'Where's tonight's venue?' to 'I need a doctor.'"
      },
      {
        title: "Departure Coordination",
        description: "Airport drops, train transfers, and farewell gifts. We ensure goodbyes are as smooth as hellos."
      }
    ],
    process: [
      {
        step: "01",
        title: "Travel Intel",
        description: "We collect all guest travel details — flights, preferences, special needs."
      },
      {
        step: "02",
        title: "Accommodation Planning",
        description: "Strategic room allocation, VIP upgrades, and hotel briefings."
      },
      {
        step: "03",
        title: "Logistics Mapping",
        description: "Complete transportation schedules, backup vehicles, and route planning."
      },
      {
        step: "04",
        title: "On-Ground Execution",
        description: "Our team is stationed at airports, hotels, and venues ensuring seamless movement."
      }
    ],
    testimonialQuote: "My 80-year-old Nani was terrified of traveling to Udaipur alone. Elite arranged a flight companion, wheelchair assistance, and had her favorite mithai waiting in her room. She cried happy tears before the wedding even started.",
    testimonialAuthor: "Kavya & Rahul, Udaipur Lake Palace Wedding",
    stats: [
      { value: "200+", label: "Events Managed" },
      { value: "10,000+", label: "Guest Transfers" },
      { value: "50+", label: "Airports Covered" },
      { value: "Zero", label: "Missed Pickups" }
    ],
    faqs: [
      {
        question: "What about international guests needing visas?",
        answer: "We provide invitation letters and documentation support. For destination weddings in Thailand or Dubai, we guide guests through visa requirements."
      },
      {
        question: "Can you help with group flight bookings?",
        answer: "Yes! We negotiate group discounts and coordinate bookings for guests traveling from the same city."
      },
      {
        question: "What if a flight is delayed?",
        answer: "We monitor all arriving flights. Delays trigger automatic rescheduling of pickups and hotel coordination for early check-in if needed."
      }
    ],
    cta: {
      primary: "Plan Your Guest Journey",
      secondary: "Download Hospitality Checklist"
    }
  },
  {
    slug: "entertainment-management",
    title: "Entertainment & Artist Management",
    tagline: "Create Moments They'll Talk About for Decades",
    description: "Entertainment isn't just about booking a DJ and calling it done. It's about understanding the energy of each event, curating performances that resonate with your crowd, and creating those goosebump moments when the entire room is collectively swept away. We've worked with Bollywood's biggest names and discovered hidden gems who become the talk of your wedding.",
    iconName: "Music",
    heroImage: "/images/services/entertainment.webp",
    emotionalHook: "The moment when your carefully choreographed Sangeet performance makes your father cry. When the surprise artist brings everyone to their feet. When the DJ reads the room so perfectly that no one wants the night to end. These are the moments we engineer.",
    painPoints: [
      "Not knowing which artists are worth their fee and which are overhyped",
      "Sangeet choreography that looks amateur instead of professional",
      "Entertainment that falls flat because it doesn't match your crowd",
      "Technical issues — poor sound, lighting disasters, missed cues",
      "Artist tantrums, last-minute cancellations, or no-shows"
    ],
    solutions: [
      "Curated artist roster vetted through years of wedding experience",
      "Professional choreographers who make anyone look graceful",
      "Crowd-reading expertise — we match entertainment to your guest demographics",
      "Full technical production management — sound, lights, and visuals",
      "Backup artist arrangements and rock-solid contracts"
    ],
    features: [
      {
        title: "Artist Curation",
        description: "From Arijit Singh to local folk performers, we have relationships with artists across all genres and budgets. We match the performer to your vibe."
      },
      {
        title: "Sangeet Production",
        description: "Choreographers, costume designers, rehearsal scheduling, and stage management. Your family's performances look TV-show polished."
      },
      {
        title: "DJ & Band Selection",
        description: "We audition and recommend DJs and bands based on your music preferences — from Bollywood to EDM to classical fusion."
      },
      {
        title: "Sound & Light Design",
        description: "Professional production teams ensure crystal-clear sound, mood-perfect lighting, and special effects that elevate every moment."
      },
      {
        title: "Surprise Elements",
        description: "Flash mobs, drone shows, fireworks, celebrity messages — we ideate and execute the unexpected."
      },
      {
        title: "Artist Liaison",
        description: "We manage all artist requirements — green rooms, hospitality, sound checks, and payments. You never deal with demands or drama."
      }
    ],
    process: [
      {
        step: "01",
        title: "Vibe Discovery",
        description: "We understand your musical tastes, family dynamics, and the energy you want for each event."
      },
      {
        step: "02",
        title: "Artist Matching",
        description: "Curated recommendations with videos, testimonials, and transparent pricing."
      },
      {
        step: "03",
        title: "Production Planning",
        description: "Technical requirements, stage plots, and rehearsal schedules finalized."
      },
      {
        step: "04",
        title: "Showtime Management",
        description: "Our team manages all artist arrivals, sound checks, and performance execution."
      }
    ],
    testimonialQuote: "When Shankar-Ehsaan-Loy started playing my parents' wedding song as a surprise, I saw my father break down for the first time. Elite didn't just book a band — they created a moment we'll cherish forever.",
    testimonialAuthor: "Ananya & Siddharth, Jaipur Celebration",
    stats: [
      { value: "100+", label: "Celebrity Artists Managed" },
      { value: "2000+", label: "Sangeet Performances" },
      { value: "50+", label: "Choreographers Network" },
      { value: "Zero", label: "Artist No-Shows" }
    ],
    faqs: [
      {
        question: "Can you get any artist we want?",
        answer: "We have direct relationships with most major artists and agencies. If someone is available, we can usually make it happen. We'll always be honest about feasibility and alternatives."
      },
      {
        question: "How early should we book artists?",
        answer: "A-list Bollywood artists need 6-12 months advance booking. Local bands and DJs typically need 2-4 months."
      },
      {
        question: "What if we have shy family members for Sangeet?",
        answer: "Our choreographers specialize in making nervous dancers look confident. We adjust complexity and provide enough rehearsal time for everyone to shine."
      }
    ],
    cta: {
      primary: "Curate Your Entertainment",
      secondary: "Browse Artist Portfolio"
    }
  },
  {
    slug: "decor-coordination",
    title: "Decor Design & Coordination",
    tagline: "We Don't Decorate Venues — We Transform Them",
    description: "Décor isn't just about flowers and fabrics. It's about creating an environment that takes your guests' breath away the moment they walk in. It's about every element — from the entrance archway to the napkin rings — telling the same visual story. We work with India's finest decorators as your design partners, ensuring your Pinterest dreams become three-dimensional reality.",
    iconName: "Flower2",
    heroImage: "/images/services/decor.webp",
    emotionalHook: "When your guests walk into the mandap and audibly gasp. When your Instagram feed floods with 'This can't be real' comments. When your venue looks like it belongs in a Karan Johar film. That's not decoration. That's transformation.",
    painPoints: [
      "Decorators who oversell and underdeliver",
      "Pinterest boards that look nothing like the actual execution",
      "Budget inflation — quoted price vs. final invoice shocks",
      "Mismatched elements because no one had a unified vision",
      "Day-of setup disasters delaying your event timeline"
    ],
    solutions: [
      "Vetted decorator partnerships with proven track records",
      "3D visualization so you see exactly what you'll get",
      "Fixed-price contracts with every element itemized",
      "Unified design language across all events and elements",
      "Site visits and setup management by our team"
    ],
    features: [
      {
        title: "Design Consultation",
        description: "We translate your vision into a cohesive design concept — colors, textures, styles, and themes that flow through every event."
      },
      {
        title: "Decorator Selection",
        description: "We match you with decorators whose style aligns with your vision and budget. No more generic setups."
      },
      {
        title: "3D Visualization",
        description: "See your décor before it's built. We provide detailed renderings of key installations so there are no surprises."
      },
      {
        title: "Vendor Coordination",
        description: "We manage all décor vendors — florists, lighting designers, furniture rentals, installation crews."
      },
      {
        title: "On-Site Supervision",
        description: "Our team is present during all setups, ensuring every element matches the approved design."
      },
      {
        title: "Quality Checkpoints",
        description: "Multiple inspection stages before your first guest arrives. If something isn't perfect, we fix it."
      }
    ],
    process: [
      {
        step: "01",
        title: "Vision Boarding",
        description: "We create comprehensive mood boards based on your inspirations, colors, and style preferences."
      },
      {
        step: "02",
        title: "Decorator Matching",
        description: "Curated decorator presentations with portfolios, pricing, and style analysis."
      },
      {
        step: "03",
        title: "Design Finalization",
        description: "3D renderings, itemized quotes, and contract finalization with approved designs."
      },
      {
        step: "04",
        title: "Execution Oversight",
        description: "Setup supervision, quality checks, and real-time adjustments as needed."
      }
    ],
    testimonialQuote: "I showed Elite a photo of a wedding in Italy that I loved. They recreated that exact feeling in Jaipur — but with Indian elements that made it ours. Guests thought we'd hired international designers.",
    testimonialAuthor: "Riya & Karan, Jaipur Heritage Wedding",
    stats: [
      { value: "200+", label: "Decorator Partners" },
      { value: "50+", label: "Design Awards Won" },
      { value: "95%", label: "Vision Match Rate" },
      { value: "Zero", label: "Setup Delays" }
    ],
    faqs: [
      {
        question: "Do you provide decoration or just coordinate?",
        answer: "We are design consultants and coordinators. We work with professional decorators to execute your vision. This gives you access to specialists while having us as your quality advocates."
      },
      {
        question: "What if I don't have a clear vision?",
        answer: "Many couples don't! We ask questions about your personal style, favorite places, colors you love, and build a vision together from scratch."
      },
      {
        question: "Can you work with a decorator I already have?",
        answer: "Absolutely. We can coordinate with any decorator while ensuring they align with your overall vision and our quality standards."
      }
    ],
    cta: {
      primary: "Design Your Dream Décor",
      secondary: "View Design Portfolio"
    }
  },
  {
    slug: "food-beverage-coordination",
    title: "Food & Beverage Coordination",
    tagline: "Because Great Weddings are Remembered by Great Food",
    description: "In Indian weddings, food isn't just sustenance — it's culture, love, and hospitality expressed through flavors. While 5-star venues have exceptional in-house catering, the magic lies in customization, curation, and flawless execution. We work with venue chefs and specialty caterers to craft menus that become talking points long after the wedding ends.",
    iconName: "UtensilsCrossed",
    heroImage: "/images/services/food-beverage.webp",
    emotionalHook: "Your Punjabi aunt raving about the Hyderabadi biryani. Your American colleagues experiencing Indian street food elegantly presented. Your grandmother finding her childhood recipes on the menu. Food tells stories. We help you tell yours.",
    painPoints: [
      "Standard hotel menus that don't reflect your family's food culture",
      "Dietary restrictions lost in large-scale catering",
      "Bar service that runs out at peak hours",
      "Food presentation that doesn't match the décor aesthetic",
      "Timing issues — cold starters, delayed mains, chaotic service"
    ],
    solutions: [
      "Custom menu development with venue chefs and specialty caterers",
      "Detailed dietary tracking from RSVP through to plate service",
      "Bar inventory planning based on realistic consumption models",
      "Food styling that complements your overall design theme",
      "Service timeline choreography for seamless dining experience"
    ],
    features: [
      {
        title: "Menu Curation",
        description: "We work with venue chefs to customize menus that honor your family traditions while surprising guests with creative touches."
      },
      {
        title: "Specialty Station Design",
        description: "Live counters, fusion food carts, regional specialty stations — we design experiences, not just buffets."
      },
      {
        title: "Tasting Sessions",
        description: "Organized tastings with family to finalize menus. We coordinate schedules and gather feedback systematically."
      },
      {
        title: "Bar & Beverage Planning",
        description: "Signature cocktails, premium spirits allocation, mocktail bars — planned based on your guest count and preferences."
      },
      {
        title: "Dietary Management",
        description: "Vegan, Jain, halal, kosher, allergies — every restriction is tracked and communicated to kitchen teams."
      },
      {
        title: "Service Choreography",
        description: "We time food service with event flow. Hot food arrives hot. Dessert follows speeches. Chai appears when needed."
      }
    ],
    process: [
      {
        step: "01",
        title: "Culinary Discovery",
        description: "Understanding your food culture, family favorites, and dietary landscape."
      },
      {
        step: "02",
        title: "Menu Development",
        description: "Collaborative menu creation with venue and specialty caterers."
      },
      {
        step: "03",
        title: "Tasting & Refinement",
        description: "Organized tastings with family feedback integration."
      },
      {
        step: "04",
        title: "Service Execution",
        description: "On-ground coordination ensuring every course serves perfectly."
      }
    ],
    testimonialQuote: "We had vegan guests from LA, Jain relatives from Gujarat, and my dad who only eats home-style North Indian. Elite created a menu that made everyone feel considered without it feeling like a hospital cafeteria. The Awadhi dum biryani is still legendary in our family.",
    testimonialAuthor: "Neha & Arjun, Mumbai Wedding",
    stats: [
      { value: "1000+", label: "Custom Menus Created" },
      { value: "30+", label: "Cuisine Specialists" },
      { value: "100%", label: "Dietary Compliance" },
      { value: "50,000+", label: "Guests Fed" }
    ],
    faqs: [
      {
        question: "Do you handle catering or just coordinate?",
        answer: "We are coordinators, not caterers. Five-star hotels have excellent in-house catering teams. We work WITH them to customize, elevate, and ensure flawless execution. For outside venues, we manage caterer selection and oversight."
      },
      {
        question: "What about guests with multiple restrictions?",
        answer: "We create individual profiles for guests with complex needs and ensure kitchen teams are personally briefed. We've successfully catered to Jain-vegan-gluten-free combinations."
      },
      {
        question: "Can we incorporate our family recipes?",
        answer: "Absolutely! We love this. We arrange for your family recipes to be learned and scaled by professional chefs."
      }
    ],
    cta: {
      primary: "Plan Your Wedding Menu",
      secondary: "Download Menu Guide"
    }
  },
  {
    slug: "logistics-management",
    title: "Logistics & Operations Management",
    tagline: "The Invisible Excellence Behind Seamless Celebrations",
    description: "A 500-guest, 4-day destination wedding is essentially a complex logistics operation. Multiple venues, concurrent events, moving equipment, VIP transport, vendor coordination — it's like running a small festival. This is where weddings succeed or fail, often invisibly. Our logistics expertise ensures your wedding runs with clockwork precision while looking effortlessly magical.",
    iconName: "Truck",
    heroImage: "/images/services/logistics.webp",
    emotionalHook: "You never see logistics done well — you only notice when it fails. The genius of our work is that you'll never think about the 47 vehicles coordinated, the 200 room keys managed, or the 3 AM emergency protocol activated. You just experience magic.",
    painPoints: [
      "Multiple venues without coordinated transportation",
      "Equipment and décor moving between event locations",
      "VIP guests needing special handling and security",
      "Vendor load-in chaos delaying event start times",
      "No one person having the complete picture"
    ],
    solutions: [
      "Centralized logistics command with detailed operational plans",
      "Vehicle fleet management with real-time tracking",
      "Equipment and material transfer protocols",
      "VIP movement coordination with security integration",
      "Vendor load-in schedules that prevent bottlenecks"
    ],
    features: [
      {
        title: "Operations Master Plan",
        description: "A comprehensive document covering every movement, timing, and contingency. Shared with all stakeholders, updated in real-time."
      },
      {
        title: "Transportation Grid",
        description: "Complete vehicle allocation — guest shuttles, VIP cars, vendor transport, equipment trucks. Every journey mapped."
      },
      {
        title: "Material Movement",
        description: "Décor elements, equipment, personal items — tracked and transported between venues without loss or damage."
      },
      {
        title: "Vendor Coordination Hub",
        description: "All vendors receive detailed schedules, load-in times, contact points. We run daily briefings before each event."
      },
      {
        title: "Real-Time Command Center",
        description: "Our team operates from a central command with radio communication, monitoring all movements and events."
      },
      {
        title: "Contingency Protocols",
        description: "Weather backup plans, medical emergencies, vendor no-shows — we have protocols for everything."
      }
    ],
    process: [
      {
        step: "01",
        title: "Logistics Mapping",
        description: "Complete assessment of venues, distances, capacities, and operational requirements."
      },
      {
        step: "02",
        title: "Resource Allocation",
        description: "Vehicle fleet, equipment, and crew assignments finalized."
      },
      {
        step: "03",
        title: "Vendor Briefings",
        description: "All stakeholders aligned with schedules, contacts, and protocols."
      },
      {
        step: "04",
        title: "Live Operations",
        description: "Command center activated, real-time coordination, issue resolution."
      }
    ],
    testimonialQuote: "We had events in three different Udaipur venues over 4 days. 300 guests. Décor moving between locations. Elite made it look easy. The Maharani Suite guests were seated 30 seconds after the boat docked. That's not luck — that's military-grade planning.",
    testimonialAuthor: "Simran & Dev, Udaipur Multi-Venue Wedding",
    stats: [
      { value: "1000+", label: "Events Managed" },
      { value: "100+", label: "Multi-Venue Weddings" },
      { value: "Zero", label: "Logistics Failures" },
      { value: "24/7", label: "Command Center" }
    ],
    faqs: [
      {
        question: "Do we need this if we have a venue coordinator?",
        answer: "Venue coordinators handle their specific venue. We coordinate across all vendors, venues, and logistics. For multi-venue weddings, this is essential. For single-venue, it ensures nothing falls through cracks."
      },
      {
        question: "What's the command center?",
        answer: "A physical or virtual base where our team monitors all operations. We have radio contact with on-ground coordinators at every venue and event."
      },
      {
        question: "How do you handle emergencies?",
        answer: "We have protocols for medical emergencies (doctors on call), weather events (covered backups), vendor failures (replacement contacts), and more. In 14 years, we've resolved every issue before guests noticed."
      }
    ],
    cta: {
      primary: "Ensure Seamless Operations",
      secondary: "Request Logistics Assessment"
    }
  },
  {
    slug: "technical-production",
    title: "Technical & Production Management",
    tagline: "Where Technology Meets Celebration",
    description: "Modern weddings are productions. LED screens, intelligent lighting, surround sound, live streaming, drone coverage — technology can elevate an event from beautiful to breathtaking. But technology is also where things go wrong if not managed expertly. We bring production-grade technical management to ensure every technical element works flawlessly.",
    iconName: "Tv",
    heroImage: "/images/services/technical.webp",
    emotionalHook: "The moment the LED screens display your journey video, perfectly synced with Arijit's live performance, while intelligent lights paint the room in your wedding colors — that's not magic. That's technical excellence, invisible and perfect.",
    painPoints: [
      "Sound systems that screech with feedback during speeches",
      "Lighting that washes out photos or makes videos look amateur",
      "LED screens with wrong aspect ratios distorting content",
      "Live streaming failures leaving international family disappointed",
      "Generator failures in the middle of events"
    ],
    solutions: [
      "Production-grade equipment specifications and vendor selection",
      "Sound engineering that ensures crisp audio in any space",
      "Lighting design that photographs beautifully while creating ambiance",
      "Content formatting and display management",
      "Redundant power and technical backup systems"
    ],
    features: [
      {
        title: "Sound Engineering",
        description: "Professional sound design for each venue — acoustics assessment, speaker placement, and live mixing for perfect audio."
      },
      {
        title: "Lighting Design",
        description: "Intelligent lighting plots that create mood, support photography, and synchronize with music for dynamic effects."
      },
      {
        title: "LED & Visual Production",
        description: "Large-format displays, projection mapping, and visual content management with proper formatting and cue sheets."
      },
      {
        title: "Live Streaming",
        description: "Broadcast-quality streaming for guests who can't attend — multiple cameras, professional direction, dedicated bandwidth."
      },
      {
        title: "Power Management",
        description: "Detailed electrical planning with backup generators and UPS systems. No blackouts, ever."
      },
      {
        title: "Tech Crew Management",
        description: "We coordinate all technical vendors — sound, lights, video, streaming — ensuring seamless collaboration."
      }
    ],
    process: [
      {
        step: "01",
        title: "Technical Assessment",
        description: "Venue evaluation for power, acoustics, rigging points, and technical requirements."
      },
      {
        step: "02",
        title: "Production Planning",
        description: "Detailed technical specifications, equipment lists, and vendor selection."
      },
      {
        step: "03",
        title: "Setup & Testing",
        description: "Advance setup, sound checks, and full technical rehearsals before events."
      },
      {
        step: "04",
        title: "Live Operations",
        description: "Technical direction throughout events with troubleshooting and adjustments."
      }
    ],
    testimonialQuote: "We live-streamed our wedding to 500 relatives across 3 continents. Elite set up a mini broadcast studio. My grandmother in Chennai saw my pheras in 4K. She said she felt like she was there. That made my wedding complete.",
    testimonialAuthor: "Aisha & Rohan, Dubai Streaming Wedding",
    stats: [
      { value: "500+", label: "Productions Managed" },
      { value: "100%", label: "Technical Uptime" },
      { value: "50+", label: "Countries Streamed To" },
      { value: "Zero", label: "Technical Failures" }
    ],
    faqs: [
      {
        question: "Do we need a separate production team?",
        answer: "For intimate weddings, venue technical staff may suffice. For larger events or those with specific technical elements (live streaming, LED walls, special effects), dedicated production is essential."
      },
      {
        question: "Can you create our wedding videos for screens?",
        answer: "We coordinate with your videographer to create content, or connect you with motion graphics specialists for journey videos and displays."
      },
      {
        question: "What about international guests needing live streaming?",
        answer: "We set up secure, password-protected streams on platforms of your choice. Multi-camera production with professional switching and dedicated internet lines ensure broadcast quality."
      }
    ],
    cta: {
      primary: "Upgrade Your Production",
      secondary: "View Technical Portfolio"
    }
  },
  {
    slug: "crew-manpower",
    title: "Crew & Manpower Support",
    tagline: "The People Behind Your Perfect Day",
    description: "A wedding of 400 guests across 4 days requires an army of trained professionals — ushers, runners, backstage crew, security, and support staff. These are the invisible hands that ensure every glass is filled, every guest is guided, and every emergency is handled before it becomes a crisis. We deploy, train, and manage this crucial human infrastructure.",
    iconName: "UserCheck",
    heroImage: "/images/services/crew.webp",
    emotionalHook: "The usher who notices your elderly uncle struggling to find his seat and gracefully guides him. The backstage runner who catches the flower girl's wobbling headdress seconds before the entrance. These aren't accidents — they're trained professionals executing at the highest level.",
    painPoints: [
      "Untrained venue staff who don't understand wedding dynamics",
      "Not enough hands during peak moments — entrance, dinner service, farewells",
      "Security that's either too aggressive or too passive",
      "Backstage chaos with no one managing artist and vendor needs",
      "Small issues escalating because no one caught them early"
    ],
    solutions: [
      "Trained wedding crew — professionals who understand ceremonies and emotions",
      "Strategic deployment based on event flow and crowd analysis",
      "Discrete, professional security that maintains atmosphere",
      "Backstage management keeping performers and vendors on schedule",
      "Roving problem-solvers who handle issues before they're noticed"
    ],
    features: [
      {
        title: "Guest Services Team",
        description: "Trained ushers for seating guidance, elderly assistance, and crowd management. They know your guest VIP list."
      },
      {
        title: "Event Runners",
        description: "Rapid-response team for last-minute needs — fetching forgotten items, coordinating between areas, solving problems."
      },
      {
        title: "Backstage Management",
        description: "Green room coordination, artist requirements, vendor liaison — everything happening behind the scenes runs smoothly."
      },
      {
        title: "Security Services",
        description: "Discrete, professional security that maintains safety without disrupting celebration atmosphere."
      },
      {
        title: "Bridal Support",
        description: "Dedicated attendants for bride and groom — dress adjustment, touch-ups, personal needs throughout events."
      },
      {
        title: "Load-In/Out Crews",
        description: "Efficient setup and breakdown teams ensuring venue transitions happen on schedule."
      }
    ],
    process: [
      {
        step: "01",
        title: "Requirements Assessment",
        description: "Analysis of event scale, venues, and specific staffing needs."
      },
      {
        step: "02",
        title: "Team Assembly",
        description: "Selection and briefing of appropriate crew for each role."
      },
      {
        step: "03",
        title: "Training & Briefings",
        description: "Event-specific training on timelines, VIPs, and protocols."
      },
      {
        step: "04",
        title: "Deployment & Supervision",
        description: "On-ground management ensuring every team member performs perfectly."
      }
    ],
    testimonialQuote: "I was so nervous about my lehenga train during the pheras. The Elite crew member assigned to me adjusted it every time I moved — so subtly that photos show no wrinkles or bunching. That attention to detail is priceless.",
    testimonialAuthor: "Tanya & Amit, Jaipur Wedding",
    stats: [
      { value: "5000+", label: "Crew Members Deployed" },
      { value: "100+", label: "Event Types Covered" },
      { value: "48hr", label: "Training Programs" },
      { value: "Zero", label: "Major Incidents" }
    ],
    faqs: [
      {
        question: "How do we know crew members are trustworthy?",
        answer: "All crew undergo background checks and work through our vetted partner agencies. For VIP events, additional security screening is conducted."
      },
      {
        question: "What if we need last-minute additional staff?",
        answer: "We always maintain a buffer of on-call staff and can deploy additional crew within hours if needed."
      },
      {
        question: "Do crew members know our customs and traditions?",
        answer: "We brief all crew on specific cultural and religious elements of your wedding. They understand when to be visible and when to be invisible."
      }
    ],
    cta: {
      primary: "Staff Your Wedding",
      secondary: "Request Crew Quote"
    }
  }
];

// Get all service slugs for static generation
export function getAllServiceSlugs(): string[] {
  return services.map(service => service.slug);
}

// Get service by slug
export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find(service => service.slug === slug);
}

// Featured services for homepage
export const featuredServices = [
  {
    slug: "complete-wedding-planning",
    title: "Complete Wedding Planning",
    shortDesc: "From 'Yes' to 'I Do' — every detail managed",
    iconName: "CalendarHeart" as ServiceIconName
  },
  {
    slug: "hospitality-logistics",
    title: "Hospitality & Logistics",
    shortDesc: "VIP treatment for every guest",
    iconName: "Plane" as ServiceIconName
  },
  {
    slug: "entertainment-management",
    title: "Entertainment Management",
    shortDesc: "Moments that become legends",
    iconName: "Music" as ServiceIconName
  },
  {
    slug: "decor-coordination",
    title: "Decor Coordination",
    shortDesc: "Transforming venues into dreams",
    iconName: "Flower2" as ServiceIconName
  }
];

// Service categories for navigation
export const serviceCategories = [
  {
    title: "Planning Services",
    services: ["complete-wedding-planning", "guest-management", "logistics-management"]
  },
  {
    title: "Experience Services",
    services: ["entertainment-management", "decor-coordination", "food-beverage-coordination"]
  },
  {
    title: "Execution Services",
    services: ["hospitality-logistics", "technical-production", "crew-manpower"]
  }
];
