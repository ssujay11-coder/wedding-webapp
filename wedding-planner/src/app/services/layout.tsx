import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Planning Services | Elite Wedding Planner India",
  description: "Complete wedding planning services including destination management, guest coordination, entertainment, decor design, and logistics. 14+ years of experience crafting luxury weddings across India, Dubai & Thailand.",
  keywords: [
    "wedding planning services",
    "luxury wedding services",
    "destination wedding services India",
    "wedding coordination",
    "wedding decor services",
    "wedding entertainment",
    "guest management services",
    "wedding logistics",
    "full service wedding planning",
    "wedding planner services Mumbai"
  ],
  openGraph: {
    title: "Wedding Planning Services | Elite Wedding Planner",
    description: "From complete wedding planning to day-of coordination. Explore our comprehensive wedding services designed for luxury celebrations.",
    images: ["https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp"],
    type: "website",
    url: "https://eliteweddingplanner.in/services",
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ItemList Schema for services listing
  const servicesListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Wedding Planning Services",
    "description": "Complete wedding planning services by Elite Wedding Planner",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Complete Wedding Planning",
          "description": "End-to-end wedding planning from concept to execution",
          "url": "https://eliteweddingplanner.in/services/complete-wedding-planning"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Guest List & RSVP Management",
          "description": "Complete guest coordination and RSVP tracking",
          "url": "https://eliteweddingplanner.in/services/guest-management"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "Hospitality & Travel Logistics",
          "description": "VIP guest management and travel coordination",
          "url": "https://eliteweddingplanner.in/services/hospitality-logistics"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "name": "Entertainment & Artist Management",
          "description": "Celebrity artists and entertainment coordination",
          "url": "https://eliteweddingplanner.in/services/entertainment-management"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Service",
          "name": "Decor Design & Coordination",
          "description": "Luxury wedding decor design and execution",
          "url": "https://eliteweddingplanner.in/services/decor-coordination"
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "Service",
          "name": "Food & Beverage Coordination",
          "description": "Custom menu curation and catering coordination",
          "url": "https://eliteweddingplanner.in/services/food-beverage-coordination"
        }
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": {
          "@type": "Service",
          "name": "Logistics & Operations Management",
          "description": "Multi-venue logistics and operations coordination",
          "url": "https://eliteweddingplanner.in/services/logistics-management"
        }
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": {
          "@type": "Service",
          "name": "Technical & Production Management",
          "description": "Sound, lighting, and AV production management",
          "url": "https://eliteweddingplanner.in/services/technical-production"
        }
      },
      {
        "@type": "ListItem",
        "position": 9,
        "item": {
          "@type": "Service",
          "name": "Crew & Manpower Support",
          "description": "Professional event crew and staffing",
          "url": "https://eliteweddingplanner.in/services/crew-manpower"
        }
      }
    ]
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://eliteweddingplanner.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://eliteweddingplanner.in/services"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([servicesListSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  );
}
