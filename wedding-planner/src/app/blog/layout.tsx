import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Planning Blog | Expert Tips & Inspiration | Elite Wedding Planner",
  description: "Expert wedding planning advice, destination guides, and inspiration from India's premier luxury wedding planners. Tips for Udaipur, Goa, Jaipur, Dubai weddings and more.",
  keywords: [
    "wedding planning blog",
    "wedding tips",
    "destination wedding guide",
    "Indian wedding planning",
    "luxury wedding ideas",
    "wedding inspiration",
    "wedding trends",
    "wedding planning advice",
    "bridal tips",
    "wedding venue guide"
  ],
  openGraph: {
    title: "Wedding Planning Blog | Elite Wedding Planner",
    description: "Expert wedding planning advice and inspiration from India's premier luxury wedding planners.",
    images: ["https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp"],
    type: "website",
    url: "https://eliteweddingplanner.in/blog",
    siteName: "Elite Wedding Planner",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Blog Schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://eliteweddingplanner.in/blog#blog",
    "name": "Elite Wedding Planner Blog",
    "description": "Expert wedding planning advice, destination guides, and inspiration from India's premier luxury wedding planners",
    "url": "https://eliteweddingplanner.in/blog",
    "publisher": {
      "@type": "Organization",
      "@id": "https://eliteweddingplanner.in/#organization",
      "name": "Elite Wedding Planner",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/EWP-LOGO-WEBP.webp"
      }
    },
    "blogPost": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "BlogPosting",
          "headline": "Top 12 Wedding Trends for 2026",
          "url": "https://eliteweddingplanner.in/blog/wedding-trends-2026"
        },
        {
          "@type": "BlogPosting",
          "headline": "Top 10 Wedding Trends for 2025",
          "url": "https://eliteweddingplanner.in/blog/wedding-trends-2025"
        }
      ]
    },
    "inLanguage": "en-IN"
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
        "name": "Blog",
        "item": "https://eliteweddingplanner.in/blog"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([blogSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  );
}
