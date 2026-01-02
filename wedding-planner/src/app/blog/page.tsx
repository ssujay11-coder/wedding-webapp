import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogClient } from "@/components/blog/blog-client";
import { getAllBlogPosts, getAllCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Wedding Planning Blog | Expert Tips, Trends & Destination Guides",
  description:
    "Expert wedding planning insights from 14 years of luxury celebrations. Destination guides, budget tips, vendor selection, decor trends, and real wedding inspiration for Indian weddings.",
  keywords: [
    "wedding planning tips",
    "Indian wedding blog",
    "destination wedding guide",
    "wedding budget planning",
    "wedding decor ideas",
    "bridal tips India",
    "wedding vendor selection",
    "luxury wedding trends",
    "wedding planning checklist",
    "Udaipur wedding guide",
    "Goa wedding tips",
  ],
  openGraph: {
    title: "Wedding Planning Blog | Elite Wedding Planner",
    description:
      "Expert insights from 200+ luxury weddings. Planning tips, destination guides, and real wedding inspiration.",
    type: "website",
    images: ["/images/blog/og-image.jpg"],
  },
  alternates: {
    canonical: "https://eliteweddingplanner.in/blog",
  },
};

// JSON-LD for blog listing
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Elite Wedding Planner Blog",
  description:
    "Expert wedding planning insights, destination guides, and luxury wedding inspiration from India's premier wedding planning team",
  url: "https://eliteweddingplanner.in/blog",
  publisher: {
    "@type": "Organization",
    name: "Elite Wedding Planner",
    url: "https://eliteweddingplanner.in",
    logo: {
      "@type": "ImageObject",
      url: "https://eliteweddingplanner.in/logo.png",
    },
  },
  blogPost: [
    {
      "@type": "BlogPosting",
      headline: "Complete Guide to Destination Weddings in Udaipur",
      description: "Everything you need to know about planning a royal wedding in the City of Lakes",
    },
    {
      "@type": "BlogPosting",
      headline: "Wedding Budget Planning: A Complete Breakdown",
      description: "Expert tips on allocating your wedding budget effectively",
    },
  ],
};

// FAQ Schema for blog page
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How early should I start planning my destination wedding in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For destination weddings in India, we recommend starting 12-18 months in advance. Popular venues like Taj Lake Palace and Umaid Bhawan get booked 18-24 months ahead for peak wedding season (October-March). Starting early ensures venue availability and vendor coordination.",
      },
    },
    {
      "@type": "Question",
      name: "What is the average cost of a luxury wedding in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Luxury weddings in India typically range from ₹50 lakhs to ₹5+ crores. Beach weddings in Goa average ₹75 lakhs-1.5 crores, palace weddings in Rajasthan range from ₹1.5-3 crores, and international destination weddings can exceed ₹3-5 crores depending on location and guest count.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best months for outdoor weddings in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ideal months for outdoor weddings in India are October to March. Rajasthan and North India are best from November to February. Beach destinations like Goa are perfect from October to March. Hill stations offer pleasant weather from April to June and September to November.",
      },
    },
    {
      "@type": "Question",
      name: "How do I choose the right wedding planner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Look for planners with 5+ years experience, strong vendor networks, portfolio of similar weddings, transparent pricing, and positive reviews. Interview 3-5 planners, check references, and ensure they understand your vision. A good planner should have destination expertise and crisis management skills.",
      },
    },
  ],
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getAllCategories();

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
      <BlogClient initialPosts={posts} categories={categories} />
      <Footer />
    </div>
  );
}
