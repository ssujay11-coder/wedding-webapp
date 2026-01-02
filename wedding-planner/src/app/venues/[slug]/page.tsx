import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VenueDetailClient } from "@/components/venues/venue-detail-client";
import { getVenueBySlug, venues } from "@/data/venues";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return venues.map((venue) => ({
    slug: venue.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);

  if (!venue) {
    return {
      title: "Venue Not Found | Elite Wedding Planner",
    };
  }

  return {
    title: venue.metaTitle,
    description: venue.metaDescription,
    keywords: venue.keywords,
    openGraph: {
      title: venue.metaTitle,
      description: venue.metaDescription,
      type: "article",
      images: [
        {
          url: venue.heroImage,
          width: 1200,
          height: 630,
          alt: `${venue.name} Wedding Venue`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: venue.metaTitle,
      description: venue.metaDescription,
      images: [venue.heroImage],
    },
  };
}

export default async function VenueDetailPage({ params }: Props) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);

  if (!venue) {
    notFound();
  }

  // JSON-LD structured data for the venue
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: venue.name,
    description: venue.shortDescription,
    image: venue.heroImage,
    address: {
      "@type": "PostalAddress",
      addressLocality: venue.city,
      addressRegion: venue.state,
      addressCountry: "IN",
    },
    ...(venue.coordinates && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: venue.coordinates.lat,
        longitude: venue.coordinates.lng,
      },
    }),
    starRating: {
      "@type": "Rating",
      ratingValue: venue.starRating || 5,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: venue.googleRating || 4.5,
      reviewCount: 100,
    },
    priceRange: venue.startingPrice || "Price on Request",
    telephone: venue.phone,
    email: venue.email,
    url: venue.website,
    amenityFeature: (venue.features || []).map((feature) => ({
      "@type": "LocationFeatureSpecification",
      name: feature,
    })),
  };

  // FAQ Schema for venue FAQs
  const faqSchema = venue.faqs && venue.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: venue.faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://eliteweddingplanner.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Venues",
        item: "https://eliteweddingplanner.in/venues",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: venue.name,
        item: `https://eliteweddingplanner.in/venues/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <VenueDetailClient venue={venue} />
      <Footer />
    </div>
  );
}
