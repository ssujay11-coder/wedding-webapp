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
  Sun,
  Cloud,
  Sparkles,
  ArrowRight,
  Play,
  X,
  Clock,
  Award,
  Camera,
  Plane,
  Building2,
  UtensilsCrossed,
  Music,
  Palette,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export interface LocationData {
  name: string;
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroVideo?: string;
  description: string;
  shortDescription: string;
  state: string;
  country: string;
  weather: {
    bestMonths: string[];
    avgTemp: string;
    monsoon: string;
  };
  weddingsHosted: number;
  startingPrice: number;
  avgBudget: {
    min: number;
    max: number;
  };
  topVenues: Array<{
    name: string;
    slug: string;
    image: string;
    type: string;
    capacity: string;
    priceRange: string;
  }>;
  whyChoose: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  weddingTypes: string[];
  vendors: {
    photographers: number;
    decorators: number;
    caterers: number;
    mehendiArtists: number;
  };
  gallery: string[];
  testimonials: Array<{
    couple: string;
    quote: string;
    venue: string;
    image?: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  nearbyAirport: string;
  travelTime: string;
  attractions: string[];
}

interface LocationLandingTemplateProps {
  location: LocationData;
}

export function LocationLandingTemplate({ location }: LocationLandingTemplateProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [showVideo, setShowVideo] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(0)} Lakh`;
    return `${(price / 1000).toFixed(0)}K`;
  };

  const iconMap: { [key: string]: any } = {
    palace: Building2,
    food: UtensilsCrossed,
    culture: Music,
    decor: Palette,
    weather: Sun,
    travel: Plane,
    camera: Camera,
    award: Award,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Full Impact */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src={location.heroImage}
            alt={`${location.name} Wedding Destination`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 1 }}
            className="absolute top-20 right-20 w-96 h-96 border border-white/20 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-40 left-10 w-64 h-64 border border-white/20 rounded-full"
          />
        </div>

        {/* Video Play Button */}
        {location.heroVideo && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
            onClick={() => setShowVideo(true)}
            className="absolute top-1/3 right-1/4 z-20 group hidden lg:block"
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/20 transition-all">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </motion.button>
        )}

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex items-end z-10"
        >
          <div className="w-full pb-16 md:pb-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                {/* Left - Main Content */}
                <div>
                  {/* Location Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-6"
                  >
                    <MapPin className="w-4 h-4 text-secondary" />
                    {location.state}, {location.country}
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
                  >
                    {location.heroTitle}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl text-white/80 font-light mb-8 max-w-xl"
                  >
                    {location.heroSubtitle}
                  </motion.p>

                  {/* Trust Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap items-center gap-6 mb-8"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Heart className="w-5 h-5 text-secondary fill-secondary" />
                      <span className="font-semibold">{location.weddingsHosted}+</span>
                      <span className="text-white/70">Weddings</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Star className="w-5 h-5 text-secondary fill-secondary" />
                      <span className="font-semibold">5.0</span>
                      <span className="text-white/70">Rating</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Building2 className="w-5 h-5 text-secondary" />
                      <span className="font-semibold">{location.topVenues.length}+</span>
                      <span className="text-white/70">Venues</span>
                    </div>
                  </motion.div>

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Button
                      onClick={() => document.getElementById("inquiry-section")?.scrollIntoView({ behavior: "smooth" })}
                      className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-full font-bold shadow-2xl shadow-primary/30"
                    >
                      Plan My Wedding
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <a href="tel:+919869829673">
                      <Button
                        variant="outline"
                        className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full backdrop-blur-sm"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Call Expert
                      </Button>
                    </a>
                  </motion.div>
                </div>

                {/* Right - Quick Form (Desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="hidden lg:block"
                >
                  <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                    <div className="text-center mb-6">
                      <p className="text-white/70 text-sm mb-1">Weddings starting from</p>
                      <p className="text-4xl font-display text-white">
                        ₹{formatPrice(location.startingPrice)}
                      </p>
                    </div>
                    <LeadCaptureForm
                      variant="hero"
                      dark
                      ctaText="Get Free Quote"
                      source={`location-${location.slug}`}
                    />
                    <p className="text-white/50 text-xs text-center mt-4">
                      Response within 2 hours during business hours
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-white/60"
          >
            <span className="text-xs uppercase tracking-widest mb-2">Explore</span>
            <ChevronRight className="w-6 h-6 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-gradient-to-r from-primary/5 via-white to-secondary/5 border-b py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Sun className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Best Time</p>
              <p className="font-semibold text-foreground">{location.weather.bestMonths.join(", ")}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <Cloud className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Average Temp</p>
              <p className="font-semibold text-foreground">{location.weather.avgTemp}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Plane className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Nearest Airport</p>
              <p className="font-semibold text-foreground">{location.nearbyAirport}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Clock className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">From Airport</p>
              <p className="font-semibold text-foreground">{location.travelTime}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary uppercase tracking-widest text-sm font-medium">Why {location.name}</span>
            <h2 className="text-4xl md:text-5xl font-display italic text-foreground mt-4 mb-6">
              The Perfect Destination for Your Love Story
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {location.shortDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {location.whyChoose.map((reason, i) => {
              const IconComponent = iconMap[reason.icon] || Sparkles;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-3xl border border-transparent hover:border-primary/20 transition-all hover:shadow-xl">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{reason.title}</h3>
                    <p className="text-muted-foreground">{reason.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Venues Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          >
            <div>
              <span className="text-primary uppercase tracking-widest text-sm font-medium">Handpicked For You</span>
              <h2 className="text-4xl md:text-5xl font-display italic text-foreground mt-4">
                Top Wedding Venues
              </h2>
            </div>
            <Link
              href={`/venues?location=${location.slug}`}
              className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all mt-4 md:mt-0"
            >
              View All Venues
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {location.topVenues.map((venue, i) => (
              <motion.div
                key={venue.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/venues/${venue.slug}`}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground">
                          {venue.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display text-foreground mb-2 group-hover:text-primary transition-colors">
                        {venue.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {venue.capacity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold text-lg">{venue.priceRange}</span>
                        <span className="text-sm text-primary font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Network Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary uppercase tracking-widest text-sm font-medium">Expert Network</span>
              <h2 className="text-4xl md:text-5xl font-display italic text-foreground mt-4 mb-6">
                Trusted Vendors at Your Service
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our curated network of {location.name}'s finest wedding professionals ensures every detail is perfect.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl">
                  <Camera className="w-8 h-8 text-primary mb-3" />
                  <p className="text-3xl font-display text-foreground">{location.vendors.photographers}+</p>
                  <p className="text-muted-foreground">Photographers</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl">
                  <Palette className="w-8 h-8 text-primary mb-3" />
                  <p className="text-3xl font-display text-foreground">{location.vendors.decorators}+</p>
                  <p className="text-muted-foreground">Decorators</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl">
                  <UtensilsCrossed className="w-8 h-8 text-primary mb-3" />
                  <p className="text-3xl font-display text-foreground">{location.vendors.caterers}+</p>
                  <p className="text-muted-foreground">Caterers</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl">
                  <Sparkles className="w-8 h-8 text-primary mb-3" />
                  <p className="text-3xl font-display text-foreground">{location.vendors.mehendiArtists}+</p>
                  <p className="text-muted-foreground">Mehendi Artists</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {location.gallery.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-2xl ${
                      i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                    }`}
                  >
                    <Image src={img} alt={`${location.name} wedding`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inquiry Section */}
      <section id="inquiry-section" className="py-24 bg-gradient-to-br from-primary via-[#a13553] to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-80 h-80 border border-white rounded-full" />
            <div className="absolute bottom-20 right-20 w-96 h-96 border border-white rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display italic text-white mb-6">
                Start Planning Your {location.name} Wedding
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Share your vision with us and receive a personalized wedding proposal within 48 hours.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Free venue recommendations based on your budget",
                  "Detailed cost breakdown for your guest count",
                  "Vendor suggestions from our trusted network",
                  "Sample itineraries and timeline planning",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-white">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <a
                  href="tel:+919869829673"
                  className="flex items-center gap-2 text-white hover:text-secondary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +91 98698 29673
                </a>
                <a
                  href="https://wa.me/919869829673"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-secondary transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <LeadCaptureForm
                variant="modal"
                heading={`Plan Your ${location.name} Wedding`}
                subheading="Get a personalized quote in 48 hours"
                ctaText="Get Free Proposal"
                source={`location-${location.slug}-cta`}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary uppercase tracking-widest text-sm font-medium">Love Stories</span>
            <h2 className="text-4xl md:text-5xl font-display italic text-foreground mt-4">
              Couples Who Said "I Do" in {location.name}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {location.testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.couple}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-lg"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-secondary fill-secondary" />
                  ))}
                </div>
                <p className="text-lg text-foreground italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary fill-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.couple}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.venue}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display italic text-foreground">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {location.faqs.map((faq, i) => (
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
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-accent/50 transition-colors"
                >
                  <span className="font-semibold text-foreground text-lg pr-4">{faq.question}</span>
                  <ChevronRight
                    className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                      expandedFaq === i ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expandedFaq === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    className="px-6 pb-6"
                  >
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-display italic text-white mb-6">
              Let's Create Your Perfect {location.name} Wedding
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join {location.weddingsHosted}+ couples who trusted us with their special day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById("inquiry-section")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-6 rounded-full font-bold"
              >
                Start Planning Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <a href="tel:+919869829673">
                <Button
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-10 py-6 rounded-full"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +91 98698 29673
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && location.heroVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 text-white hover:text-secondary transition-colors"
          >
            <X className="w-10 h-10" />
          </button>
          <div className="w-full max-w-6xl aspect-video">
            <iframe
              src={location.heroVideo}
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
