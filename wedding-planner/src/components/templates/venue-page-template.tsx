"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  Star,
  Check,
  ChevronRight,
  Phone,
  Calendar,
  Heart,
  Camera,
  Sparkles,
  ArrowRight,
  Play,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export interface VenueData {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroVideo?: string;
  location: {
    city: string;
    state: string;
    address: string;
  };
  capacity: {
    min: number;
    max: number;
  };
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  rating: number;
  reviewCount: number;
  highlights: string[];
  venueTypes: string[];
  amenities: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  gallery: Array<{
    src: string;
    alt: string;
    category: string;
  }>;
  testimonials: Array<{
    name: string;
    quote: string;
    weddingDate: string;
    image?: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  nearbyAttractions?: string[];
  weddingsHosted: number;
  features: string[];
}

interface VenuePageTemplateProps {
  venue: VenueData;
  relatedVenues?: VenueData[];
}

export function VenuePageTemplate({ venue, relatedVenues }: VenuePageTemplateProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [showVideo, setShowVideo] = useState(false);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const galleryCategories = ["All", ...new Set(venue.gallery.map((img) => img.category))];
  const filteredGallery =
    activeGalleryFilter === "All"
      ? venue.gallery
      : venue.gallery.filter((img) => img.category === activeGalleryFilter);

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(0)} Lakh`;
    return `${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src={venue.heroImage}
            alt={venue.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </motion.div>

        {/* Video Play Button */}
        {venue.heroVideo && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            onClick={() => setShowVideo(true)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group"
          >
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 group-hover:bg-white/30 transition-all">
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-sm whitespace-nowrap">
              Watch Tour
            </span>
          </motion.button>
        )}

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10"
        >
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-white/70 text-sm mb-4"
            >
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/venues" className="hover:text-white transition-colors">Venues</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{venue.name}</span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
              {/* Left Content */}
              <div className="lg:col-span-2">
                {/* Location Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                    <MapPin className="w-4 h-4" />
                    {venue.location.city}, {venue.location.state}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary text-sm">
                    <Star className="w-4 h-4 fill-secondary" />
                    {venue.rating} ({venue.reviewCount} reviews)
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4"
                >
                  {venue.name}
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-2xl text-white/80 font-light italic mb-6 max-w-2xl"
                >
                  {venue.tagline}
                </motion.p>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap items-center gap-6 text-white/90"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-secondary" />
                    <span>{venue.capacity.min} - {venue.capacity.max} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-secondary" />
                    <span>{venue.weddingsHosted}+ weddings hosted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-secondary" />
                    <span>{venue.venueTypes.join(", ")}</span>
                  </div>
                </motion.div>
              </div>

              {/* Right - Quick Inquiry Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="hidden lg:block"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-center mb-4">
                    <p className="text-white/70 text-sm">Starting from</p>
                    <p className="text-3xl font-display text-white">
                      ₹{formatPrice(venue.priceRange.min)}
                      <span className="text-lg text-white/70"> onwards</span>
                    </p>
                  </div>
                  <Button
                    onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold"
                  >
                    Check Availability
                    <Calendar className="w-5 h-5 ml-2" />
                  </Button>
                  <a
                    href="tel:+919869829673"
                    className="flex items-center justify-center gap-2 mt-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +91 98698 29673
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-gradient-to-r from-primary/5 via-white to-secondary/5 border-y border-primary/10 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {venue.highlights.map((highlight, i) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content - Details */}
            <div className="lg:col-span-2 space-y-16">
              {/* About Section */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-display italic text-foreground mb-6"
                >
                  About {venue.name}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="prose prose-lg max-w-none text-muted-foreground"
                >
                  <p>{venue.description}</p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                  {venue.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 p-3 bg-accent rounded-xl"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Amenities Section */}
              <div>
                <h2 className="text-3xl font-display italic text-foreground mb-8">
                  Venue Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {venue.amenities.map((amenity, i) => (
                    <motion.div
                      key={amenity.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{amenity.title}</h3>
                        <p className="text-sm text-muted-foreground">{amenity.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gallery Section */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-display italic text-foreground">
                    Photo Gallery
                  </h2>
                  <Camera className="w-6 h-6 text-primary" />
                </div>

                {/* Gallery Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {galleryCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveGalleryFilter(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeGalleryFilter === category
                          ? "bg-primary text-white"
                          : "bg-accent text-foreground hover:bg-primary/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredGallery.slice(0, 9).map((image, i) => (
                    <motion.div
                      key={image.src}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                        i === 0 ? "col-span-2 row-span-2" : ""
                      }`}
                    >
                      <div className={`relative ${i === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div>
                <h2 className="text-3xl font-display italic text-foreground mb-8">
                  What Couples Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {venue.testimonials.map((testimonial, i) => (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-2xl"
                    >
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-4 h-4 text-secondary fill-secondary" />
                        ))}
                      </div>
                      <p className="text-foreground italic mb-4">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.weddingDate}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-3xl font-display italic text-foreground mb-8">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {venue.faqs.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="border border-border rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/50 transition-colors"
                      >
                        <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                        <ChevronRight
                          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                            expandedFaq === i ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      {expandedFaq === i && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          className="px-5 pb-5"
                        >
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Sticky Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24" id="inquiry-form">
                <LeadCaptureForm
                  variant="sidebar"
                  heading={`Inquire About ${venue.name}`}
                  subheading="Get pricing and availability"
                  ctaText="Request Quote"
                  source={`venue-${venue.slug}`}
                />

                {/* Quick Contact */}
                <div className="mt-6 p-6 bg-accent rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-3">Prefer to talk?</p>
                  <a
                    href="tel:+919869829673"
                    className="flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    +91 98698 29673
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">
                    Available Mon-Sat, 10 AM - 7 PM
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white border border-border rounded-xl">
                    <p className="text-2xl font-display text-primary">200+</p>
                    <p className="text-xs text-muted-foreground">Weddings Planned</p>
                  </div>
                  <div className="text-center p-4 bg-white border border-border rounded-xl">
                    <p className="text-2xl font-display text-primary">14</p>
                    <p className="text-xs text-muted-foreground">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display italic text-white mb-6">
              Ready to Book {venue.name}?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let our expert team help you plan the perfect wedding at this stunning venue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full font-bold"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <a href="tel:+919869829673">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 rounded-full"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Venues */}
      {relatedVenues && relatedVenues.length > 0 && (
        <section className="py-20 bg-accent">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-display italic text-foreground text-center mb-12">
              Similar Venues You May Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedVenues.slice(0, 3).map((relatedVenue, i) => (
                <motion.div
                  key={relatedVenue.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/venues/${relatedVenue.slug}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={relatedVenue.heroImage}
                          alt={relatedVenue.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-display text-foreground mb-2">
                          {relatedVenue.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {relatedVenue.location.city}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-semibold">
                            From ₹{formatPrice(relatedVenue.priceRange.min)}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-secondary fill-secondary" />
                            <span className="text-sm">{relatedVenue.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Modal */}
      {showVideo && venue.heroVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 text-white hover:text-secondary transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-5xl aspect-video">
            <iframe
              src={venue.heroVideo}
              className="w-full h-full rounded-2xl"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
