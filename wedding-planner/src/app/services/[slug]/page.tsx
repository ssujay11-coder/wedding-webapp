import { notFound } from "next/navigation";
import { services, getAllServiceSlugs, getServiceBySlug } from "@/data/services";
import { ServiceDetailContent } from "./service-detail-content";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all services
export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Elite Wedding Planner",
    };
  }

  return {
    title: `${service.title} | Elite Wedding Planner India`,
    description: service.description.substring(0, 160),
    keywords: [
      service.title,
      "wedding planning",
      "luxury wedding",
      "destination wedding",
      "India wedding",
      "Dubai wedding",
      ...service.features.map(f => f.title)
    ],
    openGraph: {
      title: `${service.title} | Elite Wedding Planner`,
      description: service.tagline,
      images: [service.heroImage],
      type: "website",
    },
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Get related services (exclude current)
  const relatedServices = services
    .filter(s => s.slug !== slug)
    .slice(0, 3);

  // Generate Service Schema (Schema.org)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://eliteweddingplanner.in/services/${slug}#service`,
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://eliteweddingplanner.in/#organization",
      "name": "Elite Wedding Planner",
      "image": "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/EWP-LOGO-WEBP.webp",
      "telephone": "+91-8169255519",
      "priceRange": "$$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Andheri West",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400053",
        "addressCountry": "IN"
      }
    },
    "serviceType": service.title,
    "areaServed": [
      { "@type": "Country", "name": "India" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Thailand" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": service.features.map((feature, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feature.title,
          "description": feature.description
        }
      }))
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": service.stats[0]?.value.replace(/[^0-9]/g, '') || "200"
    },
    "review": {
      "@type": "Review",
      "author": { "@type": "Person", "name": service.testimonialAuthor.split(",")[0] },
      "reviewBody": service.testimonialQuote,
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    }
  };

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Generate BreadcrumbList Schema
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://eliteweddingplanner.in/services/${slug}`
      }
    ]
  };

  const structuredData = [serviceSchema, faqSchema, breadcrumbSchema];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ServiceDetailContent service={service} relatedServices={relatedServices} />
    </>
  );
}
