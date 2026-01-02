import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DestinationsClient } from "@/components/destinations/destinations-client";

// SEO Metadata - Following Meta Tags Optimizer Skill
export const metadata: Metadata = {
    title: "Destination Wedding Locations India | 40+ Venues in India, Dubai & Thailand | Elite",
    description: "Explore 40+ luxury destination wedding locations: Udaipur palaces, Goa beaches, Kerala backwaters, Jaipur forts, Dubai resorts & Thailand islands. 200+ weddings delivered. Get venue recommendations.",
    keywords: ["destination wedding India", "wedding destinations", "Udaipur wedding", "Goa wedding", "Kerala wedding", "Dubai wedding", "Thailand wedding", "palace wedding"],
    openGraph: {
        title: "40+ Destination Wedding Locations | Elite Wedding Planner",
        description: "Discover the perfect backdrop for your dream wedding. Royal palaces in Rajasthan, beaches in Goa, backwaters in Kerala, and luxury resorts worldwide.",
        type: "website",
    },
    alternates: {
        canonical: "https://eliteweddingplanner.in/destinations",
    },
};

// JSON-LD for destinations listing
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Destination Wedding Locations",
    description: "40+ luxury destination wedding locations across India, Dubai & Thailand",
    numberOfItems: 40,
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Udaipur",
            description: "Royal palace weddings in the City of Lakes",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Jaipur",
            description: "Heritage fort and haveli weddings in the Pink City",
        },
        {
            "@type": "ListItem",
            position: 3,
            name: "Goa",
            description: "Beach resort weddings on India's western coast",
        },
        {
            "@type": "ListItem",
            position: 4,
            name: "Kerala",
            description: "Backwater resort weddings in God's Own Country",
        },
        {
            "@type": "ListItem",
            position: 5,
            name: "Dubai",
            description: "Luxury resort weddings in the UAE",
        },
    ],
};

// FAQ Schema for featured snippets
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What are the best destination wedding locations in India?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The top destination wedding locations in India include Udaipur (palace weddings at City Palace, Oberoi Udaivilas), Jaipur (heritage forts and havelis), Goa (beach resorts like W Goa, Taj Exotica), Kerala (backwater resorts), Jaisalmer (desert weddings), and Jim Corbett (jungle resorts). Each offers unique experiences with budgets ranging from ₹50 Lakh to ₹15 Crore+.",
            },
        },
        {
            "@type": "Question",
            name: "How much does a destination wedding cost in India?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Destination wedding costs in India vary by location: Udaipur palace weddings start at ₹1.5 Crore for 200+ guests; Goa beach weddings from ₹50 Lakh for 100 guests; Jaipur heritage weddings from ₹80 Lakh; Kerala backwater weddings from ₹60 Lakh. Costs include venue, decor, catering, accommodation, and planning services.",
            },
        },
        {
            "@type": "Question",
            name: "When is the best time for a destination wedding in India?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The best wedding season varies by destination: October-March for Rajasthan (Udaipur, Jaipur, Jaisalmer), November-February for Goa and South India, September-March for Kerala, and October-May for hill stations. Avoid monsoon (June-September) for outdoor venues.",
            },
        },
        {
            "@type": "Question",
            name: "Does Elite Wedding Planner handle international destination weddings?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, Elite specializes in international destination weddings in Dubai (Palace Downtown, Atlantis), Abu Dhabi (Emirates Palace), Thailand (Phuket, Koh Samui), and Bali. We handle venue booking, guest travel, visas, local vendor coordination, and on-ground execution across 40+ international venues.",
            },
        },
    ],
};

export default function DestinationsPage() {
    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Navbar />
            <DestinationsClient />
            <Footer />
        </div>
    );
}
