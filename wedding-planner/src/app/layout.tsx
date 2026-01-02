import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({ // Configured Plus Jakarta Sans
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elite Wedding Planner | Luxury Destination Weddings in India & Dubai",
  description: "Award-winning luxury wedding planners with 200+ weddings across Goa, Udaipur, Jaipur, Dubai. Full-service planning, design & coordination. 14 years of excellence creating timeless celebrations.",
  keywords: [
    "luxury wedding planner",
    "destination wedding planner India",
    "Goa wedding planner",
    "Udaipur wedding planner",
    "Jaipur wedding planner",
    "Dubai wedding planner",
    "destination wedding India",
    "royal wedding planner",
    "luxury wedding services",
    "wedding coordinator India",
  ],
  authors: [{ name: "Elite Wedding Planner" }],
  creator: "Elite Wedding Planner",
  publisher: "Elite Wedding Planner",
  metadataBase: new URL("https://eliteweddingplanner.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://eliteweddingplanner.in",
    siteName: "Elite Wedding Planner",
    title: "Elite Wedding Planner | Luxury Destination Weddings",
    description:
      "Award-winning luxury wedding planners specializing in destination weddings across India and Dubai. 200+ weddings, 14 years of creating timeless celebrations.",
    images: [
      {
        url: "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp",
        width: 1200,
        height: 630,
        alt: "Elite Wedding Planner - Luxury Destination Weddings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Wedding Planner | Luxury Destination Weddings",
    description:
      "Award-winning luxury wedding planners with 200+ weddings across Goa, Udaipur, Jaipur, Dubai.",
    images: ["https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization Schema - Enhanced with WeddingEventPlanningService
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "WeddingEventPlanningService"],
    "@id": "https://eliteweddingplanner.in/#organization",
    "name": "Elite Wedding Planner",
    "alternateName": "EWP",
    "url": "https://eliteweddingplanner.in",
    "logo": {
      "@type": "ImageObject",
      "url": "https://eliteweddingplanner.in/images/logo.png",
      "width": 200,
      "height": 200
    },
    "image": "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp",
    "description": "Elite Wedding Planner is an award-winning luxury wedding planning company specializing in destination weddings across India, Dubai, and Thailand. With 14+ years of experience and 200+ successful weddings, we create unforgettable celebrations at palace venues, beach resorts, and 5-star properties.",
    "slogan": "Creating Timeless Celebrations",
    "foundingDate": "2010",
    "telephone": "+91-8169255519",
    "email": "sales@eliteweddingplanner.in",
    "priceRange": "$$$$",
    "currenciesAccepted": "INR, USD, AED",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
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
    "areaServed": [
      { "@type": "Country", "name": "India" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Thailand" },
      { "@type": "City", "name": "Udaipur" },
      { "@type": "City", "name": "Jaipur" },
      { "@type": "City", "name": "Goa" },
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Jodhpur" },
      { "@type": "City", "name": "Mumbai" }
    ],
    "serviceType": [
      "Full Service Wedding Planning",
      "Destination Wedding Planning",
      "Wedding Design & Decor",
      "Day-of Coordination",
      "Luxury Wedding Planning"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Wedding Planning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full Service Wedding Planning",
            "description": "End-to-end wedding planning from concept to execution"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Destination Wedding Planning",
            "description": "Complete destination wedding management across India, Dubai & Thailand"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/eliteweddingplanner",
      "https://www.facebook.com/eliteweddingplanner",
      "https://www.pinterest.com/eliteweddingplanner",
      "https://www.youtube.com/@eliteweddingplanner"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "200",
      "reviewCount": "150"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Priya & Arjun" },
        "datePublished": "2024-12-15",
        "reviewBody": "Elite Wedding Planner turned our dream into the most magical reality. Every detail was perfect.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
      }
    ],
    "award": [
      "Best Destination Wedding Planner 2024",
      "Luxury Wedding Planner of the Year",
      "WeddingWire Couples Choice Award"
    ]
  };

  // WebSite Schema - for sitelinks search box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://eliteweddingplanner.in/#website",
    "url": "https://eliteweddingplanner.in",
    "name": "Elite Wedding Planner",
    "description": "Luxury Destination Wedding Planners in India, Dubai & Thailand",
    "publisher": { "@id": "https://eliteweddingplanner.in/#organization" },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://eliteweddingplanner.in/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // BreadcrumbList Schema - for homepage
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://eliteweddingplanner.in"
      }
    ]
  };

  // Combined structured data array
  const structuredData = [organizationSchema, websiteSchema, breadcrumbSchema];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${jakarta.variable} antialiased font-sans bg-background text-foreground`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
