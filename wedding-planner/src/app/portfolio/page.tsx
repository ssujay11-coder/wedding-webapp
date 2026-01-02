import { Metadata } from "next";
import { PortfolioContent } from "./portfolio-content";

export const metadata: Metadata = {
    title: "Luxury Wedding Portfolio | 200+ Destination Weddings in India & Abroad",
    description:
        "Explore 200+ luxury destination weddings curated by Elite Wedding Planner. Palace weddings in Udaipur & Jaipur, beach celebrations in Goa & Thailand, and intimate ceremonies across 40+ destinations. Real stories, real magic.",
    keywords: [
        "luxury wedding portfolio India",
        "destination wedding photos",
        "palace wedding Udaipur",
        "beach wedding Goa photos",
        "Taj Lake Palace wedding",
        "Umaid Bhawan wedding",
        "Indian wedding planner portfolio",
        "celebrity wedding planner India",
        "luxury wedding inspiration",
        "royal wedding India",
        "Thailand destination wedding",
        "Dubai Indian wedding",
    ],
    openGraph: {
        title: "Luxury Wedding Portfolio | 200+ Real Wedding Stories | Elite Wedding Planner",
        description:
            "Browse 200+ luxury destination weddings worth ₹200Cr+ across India, Thailand & UAE. Palace, beach, and intimate celebrations at 5-star venues.",
        type: "website",
        images: ["/images/portfolio/og-image.jpg"],
    },
    alternates: {
        canonical: "https://eliteweddingplanner.in/portfolio",
    },
};

// Enhanced JSON-LD for portfolio page
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Elite Wedding Planner - Luxury Wedding Portfolio",
    description:
        "Comprehensive portfolio showcasing 200+ luxury destination weddings worth over ₹200 crores across 40+ destinations in India, Thailand, and UAE",
    url: "https://eliteweddingplanner.in/portfolio",
    mainEntity: {
        "@type": "ItemList",
        name: "Wedding Portfolio Categories",
        numberOfItems: 200,
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                item: {
                    "@type": "CreativeWork",
                    name: "Palace Weddings",
                    description: "45+ royal celebrations at heritage palaces including Taj Lake Palace, Umaid Bhawan, and Rambagh Palace in Rajasthan",
                    genre: "Palace/Heritage Wedding",
                },
            },
            {
                "@type": "ListItem",
                position: 2,
                item: {
                    "@type": "CreativeWork",
                    name: "Beach Weddings",
                    description: "50+ romantic beach ceremonies at luxury resorts in Goa, Kerala, and Andaman Islands",
                    genre: "Beach/Coastal Wedding",
                },
            },
            {
                "@type": "ListItem",
                position: 3,
                item: {
                    "@type": "CreativeWork",
                    name: "Hill Station Weddings",
                    description: "35+ scenic weddings in Shimla, Mussoorie, and Himachal Pradesh mountain retreats",
                    genre: "Mountain/Hill Station Wedding",
                },
            },
            {
                "@type": "ListItem",
                position: 4,
                item: {
                    "@type": "CreativeWork",
                    name: "International Destination Weddings",
                    description: "25+ luxury destination weddings in Thailand, Dubai, and UAE",
                    genre: "International Destination Wedding",
                },
            },
        ],
    },
    publisher: {
        "@type": "Organization",
        name: "Elite Wedding Planner",
        url: "https://eliteweddingplanner.in",
        logo: {
            "@type": "ImageObject",
            url: "https://eliteweddingplanner.in/logo.png",
        },
    },
};

// FAQ Schema for Portfolio Page
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "How many weddings has Elite Wedding Planner organized?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Elite Wedding Planner has successfully curated over 200 luxury weddings since 2015, managing celebrations worth more than ₹200 crores across 40+ destinations in India, Thailand, and UAE.",
            },
        },
        {
            "@type": "Question",
            name: "What types of weddings does Elite Wedding Planner specialize in?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We specialize in five categories: Palace Weddings at heritage properties like Taj Lake Palace and Umaid Bhawan, Beach Weddings at luxury resorts in Goa and Kerala, Hill Station Weddings in Shimla and Mussoorie, International Destination Weddings in Thailand and Dubai, and Intimate Weddings for 50-100 guests at boutique venues.",
            },
        },
        {
            "@type": "Question",
            name: "What is the average budget for weddings in your portfolio?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Our portfolio spans diverse budgets: Intimate weddings start at ₹50 lakhs, Beach and Hill Station weddings average ₹1-1.5 crores, Palace weddings range from ₹2-3 crores, and Grand international celebrations can exceed ₹5 crores. The average wedding in our portfolio is approximately ₹1.5 crores.",
            },
        },
        {
            "@type": "Question",
            name: "Can I see real wedding photos and client testimonials?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, our portfolio showcases real weddings with photos, videos, and authentic client testimonials. Each wedding story includes venue details, guest count, highlights, and couple quotes.",
            },
        },
    ],
};

export default function PortfolioPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <PortfolioContent />
        </>
    );
}
