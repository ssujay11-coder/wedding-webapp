import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Elite Wedding Planner | Book Your Free Consultation",
  description: "Ready to plan your dream wedding? Contact Elite Wedding Planner for a free consultation. 200+ weddings across Goa, Udaipur, Jaipur, Dubai. Call +91-8169255519 or fill out our form.",
  keywords: [
    "contact wedding planner",
    "wedding planning consultation",
    "book wedding planner India",
    "destination wedding inquiry",
    "luxury wedding planner contact",
    "wedding planner Mumbai",
    "free wedding consultation",
    "Elite Wedding Planner contact"
  ],
  openGraph: {
    title: "Contact Elite Wedding Planner | Book Your Free Consultation",
    description: "Ready to plan your dream destination wedding? Contact our expert team for a complimentary consultation. 14+ years of experience, 200+ weddings.",
    images: ["https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp"],
    type: "website",
    url: "https://eliteweddingplanner.in/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // LocalBusiness Schema with ContactPoint
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://eliteweddingplanner.in/#organization",
    "name": "Elite Wedding Planner",
    "image": "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp",
    "telephone": "+91-8169255519",
    "email": "sales@eliteweddingplanner.in",
    "url": "https://eliteweddingplanner.in",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Andheri West",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400053",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.1197,
      "longitude": 72.8464
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "11:00",
        "closes": "17:00"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-8169255519",
        "contactType": "sales",
        "areaServed": ["IN", "AE", "TH"],
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "email": "sales@eliteweddingplanner.in",
        "contactType": "customer service"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/eliteweddingplanner",
      "https://www.facebook.com/eliteweddingplanner",
      "https://www.pinterest.com/eliteweddingplanner"
    ]
  };

  // ContactPage Schema
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Elite Wedding Planner",
    "description": "Contact Elite Wedding Planner for a free wedding planning consultation",
    "url": "https://eliteweddingplanner.in/contact",
    "mainEntity": {
      "@id": "https://eliteweddingplanner.in/#organization"
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
        "name": "Contact",
        "item": "https://eliteweddingplanner.in/contact"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, contactPageSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  );
}
