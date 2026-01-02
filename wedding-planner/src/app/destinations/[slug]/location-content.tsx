"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import type { WeddingLocation } from "@/data/locations";
import { getTestimonialsByLocation, getTestimonialsByCountry, getRandomTestimonials } from "@/data/testimonials";
import { CinematicHero, AnimatedTitle, LuxuryCard, ParallaxImage } from "@/components/ui/luxury-components";
import {
    Calendar, Plane, Star, ArrowRight, Quote, ChevronDown,
    CalendarDays, Globe, Wallet, IndianRupee, Users, Heart,
    MapPin, MessageCircle, Award, Check, UtensilsCrossed,
    Camera, Sparkles, Building, Lightbulb, Clock, Target,
    PartyPopper, TrendingUp
} from "lucide-react";

// Quick Stats for hero area
const getLocationStats = (location: WeddingLocation) => [
    { value: location.weddingsHosted, label: "Weddings Hosted", icon: Heart },
    { value: location.averageRating.toFixed(1), label: "Client Rating", icon: Star },
    { value: location.guestCapacity, label: "Guest Capacity", icon: Users },
    { value: location.bestVenues.length + "+", label: "Premium Venues", icon: Building },
];

// Wedding Planning Tips Data
interface WeddingTip {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const getWeddingTips = (location: WeddingLocation): WeddingTip[] => {
    return [
        {
            icon: <CalendarDays className="w-6 h-6" />,
            title: "Timing is Everything",
            description: `Secure your venue 12-18 months in advance. The most magical wedding weather in ${location.name} is during ${location.weddingSeasons.best}.`
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Local Essence",
            description: `Infuse your celebration with ${location.name}'s spirit—incorporate ${location.traditions[0]} or local artisan gifts for an authentic touch.`
        },
        {
            icon: <Wallet className="w-6 h-6" />,
            title: "Smart Budgeting",
            description: `${location.budgetRange.note} Consider off-peak days for better rates without compromising on luxury.`
        }
    ];
};

// FAQ Data
interface FAQ {
    question: string;
    answer: string;
}

const getFAQs = (location: WeddingLocation): FAQ[] => {
    return [
        {
            question: `When is the perfect time for a wedding in ${location.name}?`,
            answer: `The golden season is ${location.weddingSeasons.best}. You'll enjoy ${location.weddingSeasons.weather} Avoid ${location.weddingSeasons.avoid} to ensure flawless outdoor events.`
        },
        {
            question: `What is the expected investment?`,
            answer: `Luxury celebrations typically range from ${location.budgetRange.min} to ${location.budgetRange.max}. This varies based on guest count and your vision for customization.`
        },
        {
            question: `How do we handle guest logistics?`,
            answer: `The nearest airport is ${location.nearestAirport}, with ${location.connectivity} We arrange seamless transfers and can secure room blocks at varying price points for your guests.`
        },
        {
            question: `Can you assist with local vendors?`,
            answer: `Absolutely. We have exclusive access to ${location.name}'s top photographers, decorators, and caterers, ensuring your wedding team is world-class.`
        }
    ];
};

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
    return (
        <motion.div
            initial={false}
            className="border-b border-gray-100 last:border-0"
        >
            <button
                onClick={onToggle}
                className="w-full py-8 flex items-center justify-between text-left group"
            >
                <span className="text-lg md:text-xl font-display italic text-foreground/80 group-hover:text-primary transition-colors pr-8">
                    {faq.question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-primary/50"
                >
                    <ChevronDown className="w-4 h-4 text-primary" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-muted-foreground leading-relaxed max-w-3xl">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function LocationPageContent({ location }: { location: WeddingLocation }) {
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);
    const tips = getWeddingTips(location);
    const faqs = getFAQs(location);
    const stats = getLocationStats(location);

    // Testimonials logic
    let testimonials = getTestimonialsByLocation(location.name);
    if (testimonials.length < 2) testimonials = getTestimonialsByCountry(location.country);
    if (testimonials.length < 2) testimonials = getRandomTestimonials(3);
    const displayTestimonials = testimonials.slice(0, 3);

    return (
        <div className="min-h-screen bg-[#fafaf9] selection:bg-rose-100 selection:text-rose-900">
            <Navbar />

            {/* 1. Cinematic Hero */}
            <CinematicHero
                image={location.heroImage}
                title={location.name}
                subtitle={location.tagline}
                badge={`${location.country} • ${location.region}`}
            />

            <main className="relative z-10 -mt-20">
                {/* Quick Stats Bar - Mobile Optimized */}
                <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-8 sm:mb-12">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                            {stats.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
                                        </div>
                                        <p className="font-display text-xl sm:text-2xl text-gray-900">{stat.value}</p>
                                        <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 2. Introduction: Magazine Style - Mobile Optimized */}
                <section className="px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto mb-16 sm:mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* Left: Text Content */}
                        <div className="lg:col-span-5 pt-8 lg:pt-20">
                            <div className="lg:sticky lg:top-32">
                                <span className="block text-xs font-bold tracking-[0.2em] text-primary mb-4 sm:mb-6 uppercase">
                                    The Destination
                                </span>
                                <AnimatedTitle className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 sm:mb-8 leading-[1.1]">
                                    {location.introduction.split(".")[0]}.
                                </AnimatedTitle>
                                <p className="text-base sm:text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-6 sm:mb-10">
                                    {location.introduction.split(".").slice(1).join(".")}
                                </p>

                                <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-10">
                                    {location.highlights.slice(0, 3).map((h, i) => (
                                        <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 bg-white/50 text-xs sm:text-sm tracking-wide text-gray-600">
                                            {h}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA Buttons - Mobile Stack */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <Link href="/contact" className="w-full sm:w-auto">
                                        <Button size="lg" className="w-full sm:w-auto rounded-full px-6 sm:px-8 bg-gray-900 text-white hover:bg-gray-800 transition-all font-light tracking-wide">
                                            Start Planning
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                        <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-6 sm:px-8 border-gray-300 hover:bg-gray-50">
                                            <MessageCircle className="w-4 h-4 mr-2" />
                                            WhatsApp
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right: Masonry Gallery - Mobile Optimized */}
                        <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4 md:gap-8">
                            <ParallaxImage
                                src={location.galleryImages[0]}
                                alt={`${location.name} wedding venue`}
                                className="col-span-2 h-[250px] sm:h-[350px] md:h-[500px] rounded-2xl sm:rounded-t-[4rem] sm:rounded-b-lg"
                            />
                            <ParallaxImage
                                src={location.galleryImages[1] || location.heroImage}
                                alt={`${location.name} wedding ceremony`}
                                className="col-span-1 h-[180px] sm:h-[250px] md:h-[400px] rounded-xl sm:rounded-lg sm:mt-12"
                            />
                            <ParallaxImage
                                src={location.galleryImages[2] || location.heroImage}
                                alt={`${location.name} wedding reception`}
                                className="col-span-1 h-[180px] sm:h-[250px] md:h-[400px] rounded-xl sm:rounded-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* Why Wed Here Section */}
                <section className="py-12 sm:py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="text-center mb-8 sm:mb-12">
                            <span className="text-xs font-bold tracking-[0.2em] text-primary mb-3 uppercase block">Why {location.name}</span>
                            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl italic text-gray-900">Reasons Couples Choose {location.name}</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {location.whyWedHere.map((reason, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 hover:shadow-lg transition-all group"
                                >
                                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-500 transition-colors">
                                        <Check className="w-5 h-5 text-rose-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{reason}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Popular For Tags */}
                <section className="py-8 sm:py-12 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                            <span className="text-sm text-gray-500 mr-2">Popular for:</span>
                            {location.popularFor.map((item, i) => (
                                <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-gray-200 shadow-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Venue Showcase: Dark Elegance */}
                <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

                    <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                            <div>
                                <span className="text-rose-300 tracking-[0.2em] text-xs font-bold uppercase block mb-4">Exceptional Venues</span>
                                <AnimatedTitle className="text-5xl md:text-7xl">
                                    Finest Addresses
                                </AnimatedTitle>
                            </div>
                            <Link href="/venues" className="hidden md:flex items-center gap-2 text-rose-200 border-b border-rose-200/30 pb-1 hover:text-white hover:border-white transition-all">
                                View Collection <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {location.bestVenues.slice(0, 3).map((venue, i) => (
                                <Link href={`/venues/${venue.slug}`} key={i} className="group block">
                                    <div className="relative h-[500px] rounded-sm overflow-hidden mb-6">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                        <Image
                                            src={venue.image}
                                            alt={venue.name}
                                            fill
                                            className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                        />
                                        <div className="absolute bottom-6 left-6 z-20">
                                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-widest text-white border border-white/20 inline-block mb-2">
                                                Featured
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-display italic text-white group-hover:text-rose-200 transition-colors">
                                        {venue.name}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Stats & Info: Minimal Grid - Mobile Optimized */}
                <section className="py-16 sm:py-32 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                        <div className="bg-white p-6 sm:p-12 flex flex-col items-center text-center group hover:bg-gray-50 transition-colors">
                            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="font-display text-lg sm:text-2xl mb-2">Best Season</h3>
                            <p className="text-muted-foreground text-sm sm:text-base">{location.weddingSeasons.best}</p>
                        </div>
                        <div className="bg-white p-6 sm:p-12 flex flex-col items-center text-center group hover:bg-gray-50 transition-colors">
                            <IndianRupee className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="font-display text-lg sm:text-2xl mb-2">Budget Range</h3>
                            <p className="text-muted-foreground text-sm sm:text-base">{location.budgetRange.min} - {location.budgetRange.max}</p>
                        </div>
                        <div className="bg-white p-6 sm:p-12 flex flex-col items-center text-center group hover:bg-gray-50 transition-colors">
                            <Plane className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="font-display text-lg sm:text-2xl mb-2">Nearest Airport</h3>
                            <p className="text-muted-foreground text-sm sm:text-base">{location.nearestAirport}</p>
                        </div>
                    </div>

                    {/* Connectivity Info */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
                        <p className="text-center text-gray-500 text-sm sm:text-base">
                            <MapPin className="w-4 h-4 inline-block mr-1" />
                            {location.connectivity}
                        </p>
                    </div>
                </section>

                {/* Local Attractions & Experiences */}
                <section className="py-12 sm:py-20 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                            {/* Local Attractions */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                                        <Camera className="w-5 h-5 text-rose-500" />
                                    </div>
                                    <h3 className="font-display text-xl sm:text-2xl italic">Guest Experiences</h3>
                                </div>
                                <p className="text-gray-500 text-sm mb-4">
                                    Beyond the wedding, {location.name} offers memorable experiences for your guests:
                                </p>
                                <ul className="space-y-3">
                                    {location.localAttractions.map((attraction, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Sparkles className="w-4 h-4 text-rose-400 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700 text-sm sm:text-base">{attraction}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Cuisine Specialties */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                                        <UtensilsCrossed className="w-5 h-5 text-rose-500" />
                                    </div>
                                    <h3 className="font-display text-xl sm:text-2xl italic">Culinary Excellence</h3>
                                </div>
                                <p className="text-gray-500 text-sm mb-4">
                                    Delight your guests with {location.name}&apos;s renowned cuisine:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {location.cuisineSpecialties.map((cuisine, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 border border-gray-200 shadow-sm">
                                            {cuisine}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Traditions */}
                        <div className="mt-8 sm:mt-12 p-6 sm:p-8 bg-white rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Award className="w-5 h-5 text-rose-500" />
                                <h4 className="font-semibold text-gray-900">Local Wedding Traditions</h4>
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {location.traditions.map((tradition, i) => (
                                    <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-rose-50 text-rose-700 rounded-full text-xs sm:text-sm font-medium">
                                        {tradition}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Research-Based Content: Planning Tips & Insider Secrets */}
                {(location.planningTips || location.insiderSecrets) && (
                    <section className="py-16 sm:py-24 bg-white">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                                {/* Planning Tips */}
                                {location.planningTips && location.planningTips.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Target className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-display text-xl sm:text-2xl italic text-gray-900">Planning Tips</h3>
                                                <p className="text-sm text-gray-500">Expert advice for {location.name} weddings</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {location.planningTips.map((tip, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100"
                                                >
                                                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                        {i + 1}
                                                    </span>
                                                    <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Insider Secrets */}
                                {location.insiderSecrets && location.insiderSecrets.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                                <Lightbulb className="w-6 h-6 text-amber-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-display text-xl sm:text-2xl italic text-gray-900">Insider Secrets</h3>
                                                <p className="text-sm text-gray-500">Tips from our wedding planners</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {location.insiderSecrets.map((secret, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100"
                                                >
                                                    <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                                    <p className="text-gray-700 text-sm leading-relaxed">{secret}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Best Photo Locations */}
                {location.bestPhotoLocations && location.bestPhotoLocations.length > 0 && (
                    <section className="py-16 sm:py-20 bg-gray-50">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="text-center mb-10">
                                <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Camera className="w-7 h-7 text-rose-500" />
                                </div>
                                <h2 className="font-display text-2xl sm:text-3xl italic text-gray-900 mb-2">Best Photo Locations</h2>
                                <p className="text-gray-500 text-sm">Capture stunning memories at these iconic spots in {location.name}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {location.bestPhotoLocations.map((photo, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-5 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{photo.spot}</h4>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{photo.timing}</span>
                                                </div>
                                            </div>
                                            <Camera className="w-5 h-5 text-rose-400 flex-shrink-0" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Guest Experiences */}
                {location.guestExperiences && location.guestExperiences.length > 0 && (
                    <section className="py-16 sm:py-20 bg-white">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="text-center mb-10">
                                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <PartyPopper className="w-7 h-7 text-purple-500" />
                                </div>
                                <h2 className="font-display text-2xl sm:text-3xl italic text-gray-900 mb-2">Guest Experience Ideas</h2>
                                <p className="text-gray-500 text-sm">Keep your guests entertained with these {location.name} activities</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {location.guestExperiences.map((exp, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-gray-900">{exp.activity}</h4>
                                            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                                {exp.duration}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Real Wedding Stats */}
                {location.realWeddingStats && (
                    <section className="py-12 sm:py-16 bg-gradient-to-r from-rose-500 to-pink-500">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6">
                            <div className="text-center mb-8">
                                <TrendingUp className="w-10 h-10 text-white/80 mx-auto mb-3" />
                                <h2 className="font-display text-2xl sm:text-3xl italic text-white mb-2">
                                    {location.name} Wedding Statistics
                                </h2>
                                <p className="text-white/70 text-sm">Based on weddings we&apos;ve coordinated</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                                    <p className="text-2xl sm:text-3xl font-bold text-white">{location.realWeddingStats.averageBudget}</p>
                                    <p className="text-xs text-white/70 mt-1">Avg Budget</p>
                                </div>
                                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                                    <p className="text-2xl sm:text-3xl font-bold text-white">{location.realWeddingStats.averageGuestCount}</p>
                                    <p className="text-xs text-white/70 mt-1">Avg Guests</p>
                                </div>
                                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl col-span-2 md:col-span-1">
                                    <p className="text-lg sm:text-xl font-bold text-white">{location.realWeddingStats.popularMonths}</p>
                                    <p className="text-xs text-white/70 mt-1">Peak Season</p>
                                </div>
                                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                                    <p className="text-2xl sm:text-3xl font-bold text-white">{location.realWeddingStats.repeatBookingRate}</p>
                                    <p className="text-xs text-white/70 mt-1">Repeat Rate</p>
                                </div>
                                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                                    <p className="text-2xl sm:text-3xl font-bold text-white">{location.realWeddingStats.vendorSatisfaction}</p>
                                    <p className="text-xs text-white/70 mt-1">Satisfaction</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 5. Expert Tips & FAQ */}
                <section className="py-32 bg-[#fafaf9] max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div>
                            <span className="text-xs font-bold tracking-[0.2em] text-primary mb-6 uppercase block">
                                Expert Guidance
                            </span>
                            <AnimatedTitle className="text-4xl md:text-5xl mb-12">
                                Planning Essentials
                            </AnimatedTitle>

                            <div className="space-y-8">
                                {tips.map((tip, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 text-primary shadow-sm">
                                            {tip.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">{tip.title}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="font-display text-2xl italic mb-6">Common Questions</h3>
                            {faqs.map((faq, i) => (
                                <FAQItem key={i} faq={faq} isOpen={openFAQ === i} onToggle={() => setOpenFAQ(openFAQ === i ? null : i)} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Testimonials Carousel */}
                <section className="py-32 border-t border-gray-200 bg-white">
                    <div className="max-w-[1400px] mx-auto px-6 text-center">
                        <Quote className="w-16 h-16 text-rose-100 mx-auto mb-8" />
                        <h2 className="text-4xl md:text-6xl font-display italic mb-20 text-gray-900">
                            Love Stories from {location.name}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            {displayTestimonials.map((t, i) => (
                                <LuxuryCard key={i} className="h-full bg-gray-50/50">
                                    <div className="flex items-center gap-1 mb-6">
                                        {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                                    </div>
                                    <p className="text-lg text-gray-700 italic font-light mb-8 leading-relaxed">&quot;{t.quote}&quot;</p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                            <Image src={t.image || "/images/users/user-1.jpg"} alt={t.coupleName} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-gray-900">{t.coupleName}</p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">{t.venue}</p>
                                        </div>
                                    </div>
                                </LuxuryCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. Final CTA - Mobile Optimized */}
                <section className="min-h-[60vh] sm:min-h-[80vh] relative flex items-center justify-center bg-gray-900 text-white overflow-hidden py-16 sm:py-0">
                    <Image
                        src={location.galleryImages[3] || location.heroImage}
                        alt={`Wedding in ${location.name}`}
                        fill
                        className="object-cover opacity-30"
                    />
                    <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6">
                        <AnimatedTitle className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-6 sm:mb-8">
                            Your Journey Begins Here
                        </AnimatedTitle>
                        <p className="text-lg sm:text-xl md:text-2xl font-light text-white/80 mb-8 sm:mb-12">
                            Let us craft your perfect wedding in {location.name}.
                        </p>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 text-white/70 text-xs sm:text-sm">
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                Free Consultation
                            </span>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                {location.weddingsHosted} Weddings
                            </span>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                {location.averageRating} Rating
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto bg-white text-gray-900 hover:bg-rose-50 text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 rounded-full shadow-2xl hover:scale-105 transition-transform"
                                >
                                    Start Planning
                                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                </Button>
                            </Link>
                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 rounded-full shadow-2xl"
                                >
                                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    WhatsApp Us
                                </Button>
                            </a>
                        </div>

                        <p className="text-white/50 text-xs sm:text-sm mt-6">
                            Or call us at <a href="tel:+919876543210" className="text-white/70 hover:text-white underline">+91 98765 43210</a>
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
