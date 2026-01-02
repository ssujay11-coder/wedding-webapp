import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destination Wedding Locations | Elite Wedding Planner",
  description: "Explore 40+ stunning destination wedding locations across India, Dubai & Thailand. From royal palaces in Udaipur to beach resorts in Goa. Expert planning for your dream destination wedding.",
  keywords: [
    "destination wedding India",
    "destination wedding locations",
    "Udaipur wedding",
    "Goa beach wedding",
    "Jaipur palace wedding",
    "Dubai luxury wedding",
    "Thailand destination wedding",
    "Jodhpur wedding venue",
    "royal wedding India",
    "destination wedding planner"
  ],
  openGraph: {
    title: "Destination Wedding Locations | Elite Wedding Planner",
    description: "Explore 40+ stunning destination wedding locations across India, Dubai & Thailand with Elite Wedding Planner.",
    images: ["https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/udaipur-wedding-planner.webp"],
    type: "website",
    url: "https://eliteweddingplanner.in/destinations",
    locale: "en_IN",
    siteName: "Elite Wedding Planner",
  },
  alternates: {
    canonical: "/destinations",
  },
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ItemList Schema for destinations listing
  const destinationsListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Destination Wedding Locations",
    "description": "Premium destination wedding locations curated by Elite Wedding Planner",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "TouristDestination",
          "name": "Udaipur",
          "description": "The City of Lakes - Royal palace weddings",
          "url": "https://eliteweddingplanner.in/destinations/udaipur"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "TouristDestination",
          "name": "Jaipur",
          "description": "The Pink City - Heritage wedding venues",
          "url": "https://eliteweddingplanner.in/destinations/jaipur"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "TouristDestination",
          "name": "Goa",
          "description": "Beach destination weddings",
          "url": "https://eliteweddingplanner.in/destinations/goa"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "TouristDestination",
          "name": "Jodhpur",
          "description": "The Blue City - Mehrangarh Fort weddings",
          "url": "https://eliteweddingplanner.in/destinations/jodhpur"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "TouristDestination",
          "name": "Dubai",
          "description": "Ultra-luxury international weddings",
          "url": "https://eliteweddingplanner.in/destinations/dubai"
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
        "name": "Destinations",
        "item": "https://eliteweddingplanner.in/destinations"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([destinationsListSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  );
}
