import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicesClient } from "@/components/services/services-client";

// SEO Metadata - Following Meta Tags Optimizer Skill
export const metadata: Metadata = {
  title: "Wedding Planning Services India | Complete Wedding Management | Elite",
  description: "Explore 10+ luxury wedding planning services: Complete planning, decor design, guest management, entertainment, catering coordination & more. 200+ weddings, 40+ destinations. Get free consultation.",
  keywords: ["wedding planning services India", "wedding planner services", "destination wedding services", "wedding management", "wedding coordination", "wedding decor services"],
  openGraph: {
    title: "Luxury Wedding Planning Services | Elite Wedding Planner",
    description: "Full-service luxury wedding planning across India, Dubai & Thailand. From design to execution, we handle every detail of your dream celebration.",
    type: "website",
  },
  alternates: {
    canonical: "https://eliteweddingplanner.in/services",
  },
};

// JSON-LD for services listing
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wedding Planning Services",
  provider: {
    "@type": "LocalBusiness",
    name: "Elite Wedding Planner",
    url: "https://eliteweddingplanner.in",
  },
  description: "Complete luxury wedding planning services across India, Dubai & Thailand",
  areaServed: ["India", "Dubai", "Thailand"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Wedding Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Complete Wedding Planning",
          description: "End-to-end wedding management from design to execution",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Destination Wedding Planning",
          description: "Luxury destination weddings across 40+ locations",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wedding Decor & Design",
          description: "Bespoke decor design and coordination services",
        },
      },
    ],
  },
};

// FAQ Schema for featured snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What wedding planning services does Elite offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Elite offers 10+ comprehensive wedding services: Complete Wedding Planning, Guest List & RSVP Management, Hospitality & Travel Logistics, Entertainment & Artist Management, Decor Design & Coordination, Food & Beverage Curation, Logistics & Operations, Technical Production, and Crew Support. All services are available individually or as complete packages.",
      },
    },
    {
      "@type": "Question",
      name: "How much do wedding planning services cost in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wedding planning fees vary by scope. Elite's packages start at ₹15 Lakh for intimate celebrations (50-100 guests) and scale for grand weddings. We've managed budgets from ₹50 Lakh to ₹15 Crore+. Schedule a free consultation for a customized quote based on your specific requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer destination wedding planning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we specialize in destination weddings across 40+ locations including Udaipur, Jaipur, Goa, Kerala, Jaisalmer in India, plus international venues in Dubai, Abu Dhabi, Phuket, and Koh Samui. We handle all logistics, travel, accommodation, and local vendor coordination.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in full-service wedding planning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Full-service planning includes: venue selection, complete design & decor, vendor management (50+ vendors), budget tracking, guest management, travel logistics, entertainment booking, catering coordination, day-of execution with 50+ crew, and post-wedding services. You get a dedicated team from first consultation to farewell brunch.",
      },
    },
  ],
};

export default function ServicesPage() {
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
      <ServicesClient />
      <Footer />
    </div>
  );
}
