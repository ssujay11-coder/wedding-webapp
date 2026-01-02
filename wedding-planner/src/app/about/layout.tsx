import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Elite Wedding Planner | India's Premier Luxury Wedding Planners",
  description: "14+ years of creating extraordinary weddings. 200+ celebrations across India, Dubai & Thailand. Meet the team behind India's most sought-after luxury wedding planning company.",
  keywords: [
    "about Elite Wedding Planner",
    "luxury wedding planner India",
    "wedding planner team",
    "destination wedding experts",
    "Indian wedding specialists",
    "award-winning wedding planner",
    "wedding planning company India",
    "Elite Wedding Planner story"
  ],
  openGraph: {
    title: "About Elite Wedding Planner | India's Premier Luxury Wedding Planners",
    description: "14+ years of creating extraordinary weddings. 200+ celebrations across India, Dubai & Thailand.",
    images: ["https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp"],
    type: "website",
    url: "https://eliteweddingplanner.in/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // AboutPage Schema
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Elite Wedding Planner",
    "description": "Learn about India's premier luxury wedding planning company with 14+ years of experience",
    "url": "https://eliteweddingplanner.in/about",
    "mainEntity": {
      "@id": "https://eliteweddingplanner.in/#organization"
    }
  };

  // Organization Schema with detailed info
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://eliteweddingplanner.in/#organization",
    "name": "Elite Wedding Planner",
    "alternateName": "EWP",
    "url": "https://eliteweddingplanner.in",
    "logo": "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/EWP-LOGO-WEBP.webp",
    "image": "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp",
    "description": "Elite Wedding Planner is India's premier luxury wedding planning company, specializing in destination weddings across India, Dubai, and Thailand. With 14+ years of experience and 200+ successful weddings, we create unforgettable celebrations.",
    "foundingDate": "2011",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mumbai",
        "addressCountry": "IN"
      }
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 20,
      "maxValue": 50
    },
    "slogan": "Creating Timeless Celebrations",
    "knowsAbout": [
      "Luxury Wedding Planning",
      "Destination Weddings",
      "Indian Weddings",
      "Palace Weddings",
      "Beach Weddings",
      "Wedding Design",
      "Event Management"
    ],
    "award": [
      "Best Luxury Wedding Planner - WeddingSutra Awards 2023",
      "Top 10 Destination Wedding Planners - Vogue India 2023",
      "Excellence in Event Design - ILEA India 2022",
      "Best Palace Wedding Specialist - Wedding Planners Association 2022"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Wedding Planners Association of India"
      },
      {
        "@type": "Organization",
        "name": "International Live Events Association (ILEA)"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/eliteweddingplanner",
      "https://www.facebook.com/eliteweddingplanner",
      "https://www.pinterest.com/eliteweddingplanner",
      "https://www.youtube.com/@eliteweddingplanner"
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
        "name": "About",
        "item": "https://eliteweddingplanner.in/about"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([aboutPageSchema, organizationSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  );
}
