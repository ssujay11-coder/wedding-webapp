'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  ArrowRight,
  Play,
  Star,
  MapPin,
  Users,
  Calendar,
  Crown,
  Heart,
  Sparkles,
  Award,
  ChevronDown,
  Phone,
  MessageCircle
} from 'lucide-react';

// Hero destinations for background rotation
const heroDestinations = [
  {
    name: 'Udaipur',
    tagline: 'The City of Lakes',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80',
    description: 'Where royal dreams float on shimmering lakes'
  },
  {
    name: 'Jaipur',
    tagline: 'The Pink City',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=80',
    description: 'Where every wedding becomes a royal affair'
  },
  {
    name: 'Goa',
    tagline: 'Beach Paradise',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=80',
    description: 'Where the ocean whispers your love story'
  },
  {
    name: 'Kerala',
    tagline: "God's Own Country",
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=80',
    description: 'Where nature blesses every union'
  }
];

const stats = [
  { number: '500+', label: 'Dream Weddings', icon: Heart },
  { number: '50+', label: 'Luxury Venues', icon: Crown },
  { number: '15+', label: 'Destinations', icon: MapPin },
  { number: '4.9', label: 'Client Rating', icon: Star }
];

const featuredVenues = [
  {
    name: 'Taj Lake Palace',
    location: 'Udaipur',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    price: 'From ₹50L',
    rating: 4.9,
    slug: 'taj-lake-palace'
  },
  {
    name: 'Rambagh Palace',
    location: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    price: 'From ₹40L',
    rating: 4.9,
    slug: 'rambagh-palace'
  },
  {
    name: 'Taj Exotica',
    location: 'Goa',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    price: 'From ₹35L',
    rating: 4.8,
    slug: 'taj-exotica-goa'
  },
  {
    name: 'Leela Palace',
    location: 'Udaipur',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    price: 'From ₹45L',
    rating: 4.8,
    slug: 'leela-palace-udaipur'
  }
];

const testimonials = [
  {
    couple: 'Priya & Rahul',
    location: 'Mumbai',
    venue: 'Taj Lake Palace, Udaipur',
    quote: 'From the moment we arrived by boat at sunset, we knew we had made the perfect choice. Our wedding was pure magic.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
    rating: 5
  },
  {
    couple: 'Ananya & Vikram',
    location: 'Delhi',
    venue: 'Rambagh Palace, Jaipur',
    quote: 'Elite Wedding Planner transformed our vision into reality. Every detail was perfect, from decor to coordination.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80',
    rating: 5
  },
  {
    couple: 'Meera & Sameer',
    location: 'Bangalore',
    venue: 'Alila Diwa, Goa',
    quote: 'Our guests are still talking about our wedding! The paddy field sunset ceremony was absolutely breathtaking.',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
    rating: 5
  }
];

export default function HomePageV2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Auto-rotate hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroDestinations.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Cinematic Full Screen */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        {/* Background Image Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ scale }}
            className="absolute inset-0"
          >
            <Image
              src={heroDestinations[currentSlide].image}
              alt={heroDestinations[currentSlide].name}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <motion.div
          style={{ opacity }}
          className="relative h-full flex flex-col items-center justify-center text-center px-4"
        >
          {/* Destination indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80">
              <MapPin className="w-4 h-4 text-rose-400" />
              Now showing: {heroDestinations[currentSlide].name}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-5xl leading-tight"
          >
            <span className="block text-white/90">Your Dream Wedding</span>
            <span className="block mt-2 bg-gradient-to-r from-rose-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
              Deserves a Royal Stage
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl"
          >
            {heroDestinations[currentSlide].description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/contact"
              className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 rounded-full font-semibold text-white transition-all duration-300 flex items-center gap-2 shadow-lg shadow-rose-500/25"
            >
              Begin Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setIsVideoPlaying(true)}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full font-semibold text-white transition-all duration-300 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Our Story
            </button>
          </motion.div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {heroDestinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-rose-500'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-6 h-6 text-white/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 -mt-20 mx-4 lg:mx-auto lg:max-w-6xl">
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#111] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-6 h-6 text-rose-400 mx-auto mb-2" />
                  <p className="text-3xl md:text-4xl font-bold text-white">{stat.number}</p>
                  <p className="text-white/60 text-sm mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 rounded-full text-rose-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Handpicked for You
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-white">Iconic Venues for</span>{' '}
              <span className="text-rose-400">Iconic Celebrations</span>
            </h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              From floating palaces to beachfront resorts, discover venues that will make your wedding legendary
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVenues.map((venue, index) => (
              <motion.div
                key={venue.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/venues/${venue.slug}`}
                  className="group block relative h-80 rounded-2xl overflow-hidden"
                >
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-white/90 text-sm">{venue.rating}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                      {venue.name}
                    </h3>
                    <p className="text-white/60 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {venue.location}
                    </p>
                    <p className="text-rose-400 font-semibold mt-2">{venue.price}</p>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/venues"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-rose-500/50 rounded-full text-white hover:text-rose-400 transition-colors"
            >
              Explore All Venues
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-400 text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Love Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-white">Real Couples,</span>{' '}
              <span className="text-rose-400">Real Magic</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.couple}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-rose-500/30 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/80 italic mb-6">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.couple}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.couple}</p>
                    <p className="text-white/50 text-sm">{testimonial.venue}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-white">Ready to Create</span>{' '}
              <span className="text-rose-400">Your Love Story?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Let&apos;s design a celebration as unique as your love. Our team is ready to make your dream wedding a reality.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 rounded-full font-semibold text-white transition-all duration-300 flex items-center gap-2 shadow-lg shadow-rose-500/25"
              >
                Start Planning Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+918169255519"
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full font-semibold text-white transition-all duration-300 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Fixed WhatsApp Button */}
      <a
        href="https://wa.me/918169255519?text=Hi! I'm interested in planning my destination wedding."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
