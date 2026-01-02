import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Portfolio | Real Weddings by Elite Wedding Planner",
  description: "Explore our portfolio of 200+ luxury weddings across Udaipur, Goa, Jaipur, Jodhpur & Dubai. Palace weddings, beach celebrations, heritage venues. See real couples' celebrations.",
  keywords: [
    "wedding portfolio",
    "real weddings India",
    "luxury wedding gallery",
    "destination wedding photos",
    "Udaipur wedding portfolio",
    "Goa wedding gallery",
    "palace wedding photos",
    "Indian wedding inspiration",
    "wedding planner portfolio",
    "Elite Wedding Planner weddings"
  ],
  openGraph: {
    title: "Wedding Portfolio | Real Weddings by Elite Wedding Planner",
    description: "Explore our portfolio of 200+ luxury weddings across India's most stunning destinations.",
    images: ["https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp"],
    type: "website",
    url: "https://eliteweddingplanner.in/portfolio",
  },
  alternates: {
    canonical: "/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ImageGallery Schema for portfolio
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Elite Wedding Planner Portfolio",
    "description": "A collection of 200+ luxury weddings planned and executed by Elite Wedding Planner across India, Dubai, and Thailand",
    "url": "https://eliteweddingplanner.in/portfolio",
    "provider": {
      "@type": "Organization",
      "@id": "https://eliteweddingplanner.in/#organization"
    },
    "about": {
      "@type": "Thing",
      "name": "Luxury Wedding Planning",
      "description": "Portfolio showcasing destination weddings at palaces, beaches, and heritage venues"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": 200,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Event",
            "name": "Royal Palace Wedding - Udaipur",
            "description": "A royal celebration at Taj Lake Palace",
            "location": {
              "@type": "Place",
              "name": "Udaipur, Rajasthan"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Event",
            "name": "Beach Wedding - Goa",
            "description": "Sunset ceremony by the Arabian Sea",
            "location": {
              "@type": "Place",
              "name": "Goa"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Event",
            "name": "Heritage Wedding - Jaipur",
            "description": "Grand celebration at Samode Palace",
            "location": {
              "@type": "Place",
              "name": "Jaipur, Rajasthan"
            }
          }
        }
      ]
    }
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
        "name": "Portfolio",
        "item": "https://eliteweddingplanner.in/portfolio"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([portfolioSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  );
}
