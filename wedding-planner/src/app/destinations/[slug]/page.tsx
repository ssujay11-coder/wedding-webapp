import { Metadata } from "next";
import { notFound } from "next/navigation";
import { locations, getLocationBySlug } from "@/data/locations";
import { LocationPageContent } from "./location-content";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return locations.map((location) => ({
        slug: location.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const location = getLocationBySlug(slug);

    if (!location) {
        return {
            title: "Location Not Found",
        };
    }

    return {
        title: location.metaTitle,
        description: location.metaDescription,
        keywords: location.keywords,
        openGraph: {
            title: location.metaTitle,
            description: location.metaDescription,
            images: [location.heroImage],
            type: "website",
            url: `https://eliteweddingplanner.in/destinations/${slug}`,
            locale: "en_IN",
            siteName: "Elite Wedding Planner",
        },
        twitter: {
            card: "summary_large_image",
            title: location.metaTitle,
            description: location.metaDescription,
            images: [location.heroImage],
        },
        alternates: {
            canonical: `/destinations/${slug}`,
        },
    };
}

export default async function LocationPage({ params }: PageProps) {
    const { slug } = await params;
    const location = getLocationBySlug(slug);

    if (!location) {
        notFound();
    }

    // TouristDestination Schema - for destination wedding locations
    const destinationSchema = {
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        "@id": `https://eliteweddingplanner.in/destinations/${slug}#destination`,
        "name": `${location.name} Wedding Destination`,
        "description": location.introduction,
        "image": location.heroImage,
        "touristType": "Wedding Couples",
        "includesAttraction": location.bestVenues.map(venue => ({
            "@type": "TouristAttraction",
            "name": venue.name,
            "image": venue.image
        })),
        "containedInPlace": {
            "@type": "Country",
            "name": location.country
        }
    };

    // LocalBusiness Schema - for wedding planning service at this location
    const localServiceSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `Elite Wedding Planner - ${location.name}`,
        "description": `Luxury destination wedding planning services in ${location.name}, ${location.country}. ${location.tagline}`,
        "image": location.heroImage,
        "telephone": "+91-8169255519",
        "email": "sales@eliteweddingplanner.in",
        "priceRange": location.budgetRange.min + " - " + location.budgetRange.max,
        "areaServed": {
            "@type": "City",
            "name": location.name
        },
        "parentOrganization": {
            "@id": "https://eliteweddingplanner.in/#organization"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": location.averageRating.toString(),
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": location.weddingsHosted.replace(/[^0-9]/g, '') || "50"
        }
    };

    // FAQ Schema - common questions about destination weddings
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `What is the best time for a wedding in ${location.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `The best wedding season in ${location.name} is ${location.weddingSeasons.best}. It's advisable to avoid ${location.weddingSeasons.avoid}. ${location.weddingSeasons.weather}`
                }
            },
            {
                "@type": "Question",
                "name": `What is the typical budget for a destination wedding in ${location.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `A destination wedding in ${location.name} typically ranges from ${location.budgetRange.min} to ${location.budgetRange.max}. ${location.budgetRange.note}`
                }
            },
            {
                "@type": "Question",
                "name": `What are the top wedding venues in ${location.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `The top wedding venues in ${location.name} include: ${location.bestVenues.map(v => v.name).join(", ")}. Each venue offers unique experiences for luxury destination weddings.`
                }
            },
            {
                "@type": "Question",
                "name": `How do guests travel to ${location.name} for a destination wedding?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `The nearest airport to ${location.name} is ${location.nearestAirport}. ${location.connectivity}`
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
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": location.name,
                "item": `https://eliteweddingplanner.in/destinations/${slug}`
            }
        ]
    };

    const structuredData = [destinationSchema, localServiceSchema, faqSchema, breadcrumbSchema];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <LocationPageContent location={location} />
        </>
    );
}
