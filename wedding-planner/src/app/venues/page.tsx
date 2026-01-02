import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VenuesListClient } from "@/components/venues/venues-list-client";
import { venues } from "@/data/venues";

export const metadata: Metadata = {
  title: "India's Top 50 Luxury Wedding Venues | 5-Star Resorts & Palace Hotels",
  description:
    "Discover India's most prestigious 5-star wedding venues. From Udaipur's lakeside palaces to Goa's beach resorts, find the perfect luxury destination for your dream wedding.",
  keywords: [
    "luxury wedding venues India",
    "5 star wedding hotels",
    "destination wedding venues",
    "palace wedding India",
    "beach wedding venues Goa",
    "Udaipur wedding venues",
    "best wedding resorts India",
  ],
  openGraph: {
    title: "India's Top 50 Luxury Wedding Venues | Elite Wedding Planner",
    description:
      "Explore curated collection of India's finest 5-star wedding venues - palaces, beach resorts, and luxury hotels for unforgettable destination weddings.",
    type: "website",
  },
};

// JSON-LD for venue listing page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "India's Top 50 Luxury Wedding Venues",
  description:
    "Curated collection of India's finest 5-star wedding venues for luxury destination weddings",
  numberOfItems: venues.length,
  itemListElement: venues.slice(0, 20).map((venue, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "LodgingBusiness",
      name: venue.name,
      description: venue.shortDescription,
      address: {
        "@type": "PostalAddress",
        addressLocality: venue.city,
        addressRegion: venue.state,
        addressCountry: "IN",
      },
      starRating: {
        "@type": "Rating",
        ratingValue: venue.starRating,
      },
    },
  })),
};

export default function VenuesPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <VenuesListClient venues={venues} />
      <Footer />
    </div>
  );
}
