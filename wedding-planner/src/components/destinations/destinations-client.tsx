"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin, Star, Search, Filter, ArrowRight, Sparkles,
    Globe, Award, Users, Calendar, CheckCircle, ChevronDown
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FloralDecoration } from "@/components/decorative/floral-elements";
import { TextScramble } from "@/components/ui/text-scramble";
import { GoldSparkles } from "@/components/ui/gold-sparkles";
import { locations, getIndiaLocations, getThailandLocations, getUAELocations } from "@/data/locations";

// Destination stats for hero
const destinationStats = [
    { value: "40+", label: "Destinations", subLabel: "Worldwide" },
    { value: "200+", label: "Weddings", subLabel: "Curated" },
    { value: "50+", label: "Venues", subLabel: "Exclusive" },
    { value: "5.0", label: "Rating", subLabel: "Client Love" },
];

// FAQs for featured snippets - Enhanced
const destinationFaqs = [
    {
        question: "What are the best destination wedding locations in India?",
        answer: "The top destination wedding locations include Udaipur for royal palace grandeur, Jaipur for heritage forts, Goa for luxury beach resorts, and Kerala for serene backwaters. Each offers a unique, world-class experience blending tradition with modern luxury."
    },
    {
        question: "How much does a destination wedding cost?",
        answer: "Costs vary significantly by location and scale. Palace weddings in Udaipur often range from ₹1.5 Cr+, while intimate beach weddings in Goa may start from ₹50 Lakh. Our team creates bespoke packages tailored to your specific vision and budget."
    },
    {
        question: "When is the best time for a destination wedding?",
        answer: "For most Indian destinations (Rajasthan, Goa), the ideal season is October to March. For international locations like Thailand or Bali, consider November to February or July to August for the best weather."
    },
    {
        question: "Do you handle international logistics?",
        answer: "Absolutely. We specialize in end-to-end management for international weddings in Dubai, Thailand, Bali, and beyond—handling everything from venue booking and visas to guest transfers and local vendor coordination."
    },
];

type CountryFilter = "all" | "India" | "Thailand" | "UAE";

export function DestinationsClient() {
    const [activeFilter, setActiveFilter] = useState<CountryFilter>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredLocations = useMemo(() => {
        return locations.filter((loc) => {
            const matchesCountry = activeFilter === "all" || loc.country === activeFilter;
            const matchesSearch =
                searchQuery === "" ||
                loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                loc.region.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCountry && matchesSearch;
        });
    }, [activeFilter, searchQuery]);

    const indiaCount = getIndiaLocations().length;
    const thailandCount = getThailandLocations().length;
    const uaeCount = getUAELocations().length;

    return (
        <div className="bg-sheet-background min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24 pb-20">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/gallery/venues/venues-006-4g4a3787-lg.webp"
                        alt="Luxury Wedding Venues"
                        fill
                        className="object-cover opacity-15 grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/90" />
                    <GoldSparkles className="opacity-40" />
                </div>

                {/* Decorative Florals */}
                <div className="absolute top-0 left-0 opacity-15 pointer-events-none hidden lg:block">
                    <FloralDecoration variant="corner" className="w-[400px] h-[400px]" />
                </div>
                <div className="absolute bottom-0 right-0 opacity-15 pointer-events-none transform rotate-180 hidden lg:block">
                    <FloralDecoration variant="corner" className="w-[300px] h-[300px]" />
                </div>

                <div className="container max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/20 bg-white/50 backdrop-blur-sm text-xs font-bold tracking-[0.2em] uppercase text-primary">
                            Global Portfolio
                        </span>

                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-[1.1]">
                            <span className="block font-normal text-3xl md:text-4xl italic font-serif text-muted-foreground mb-2">Curated</span>
                            <TextScramble className="text-primary/90 font-medium" text="Destinations" />
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-10">
                            Discover a portfolio of the world's most exclusive wedding destinations, handpicked for their breathtaking beauty, luxury hospitality, and timeless romance.
                        </p>

                        {/* Interactive Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {destinationStats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="p-4 rounded-xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-md transition-all duration-500 group"
                                >
                                    <div className="text-3xl font-display text-primary mb-1 group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-foreground/80">{stat.label}</div>
                                    <div className="text-[10px] text-muted-foreground mt-0.5">{stat.subLabel}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Sticky Glass Filter Bar */}
            <div className="sticky top-20 z-40 pb-6 px-4 pointer-events-none">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="max-w-5xl mx-auto pointer-events-auto"
                >
                    <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5 rounded-full p-2 flex flex-col md:flex-row items-center gap-2">
                        {/* Search Input */}
                        <div className="relative w-full md:w-64 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search places..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-transparent rounded-full text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:bg-white/50 transition-all font-medium"
                            />
                        </div>

                        <div className="w-px h-8 bg-black/5 hidden md:block" />

                        {/* Country Filters - Desktop */}
                        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
                            {(["all", "India", "Thailand", "UAE"] as CountryFilter[]).map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-5 py-2 rounded-full text-sm transition-all duration-300 relative overflow-hidden group ${activeFilter === filter
                                        ? "text-white shadow-md"
                                        : "text-muted-foreground hover:bg-black/5"
                                        }`}
                                >
                                    {activeFilter === filter && (
                                        <motion.div
                                            layoutId="activeFilterBg"
                                            className="absolute inset-0 bg-primary"
                                            initial={false}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 font-medium">
                                        {filter === "all" ? "All Locations" : filter}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Mobile Filter Toggle */}
                        <div className="md:hidden w-full flex justify-between px-2">
                            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                                {activeFilter === "all" ? "All Locations" : activeFilter}
                            </span>
                            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="p-2">
                                <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Filter Dropdown */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="md:hidden mt-2 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-xl"
                            >
                                <div className="p-2 space-y-1">
                                    {(["all", "India", "Thailand", "UAE"] as CountryFilter[]).map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => {
                                                setActiveFilter(filter);
                                                setIsFilterOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeFilter === filter ? "bg-primary/10 text-primary" : "text-muted-foreground"
                                                }`}
                                        >
                                            {filter === "all" ? "All Locations" : filter}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Main Content Grid - Editorial Layout */}
            <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[400px]"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredLocations.map((location, i) => {
                            // Logic to vary card sizes for "masonry" look (simulated with grid spans)
                            // Every 1st item of 5 is large, every 5th item is wide
                            const isLarge = i % 7 === 0;
                            const isWide = i % 7 === 4;

                            return (
                                <motion.div
                                    key={location.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isLarge ? "md:col-span-2 md:row-span-2" : isWide ? "md:col-span-2" : ""
                                        }`}
                                >
                                    <Link href={`/destinations/${location.slug}`} className="block h-full w-full">
                                        {/* Image Container */}
                                        <div className="absolute inset-0 overflow-hidden">
                                            <Image
                                                src={location.heroImage}
                                                alt={location.name}
                                                fill
                                                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                            />
                                            {/* Gradient Overlays */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        </div>

                                        {/* Content Badge */}
                                        <div className="absolute top-6 left-6 z-20">
                                            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                                                {location.country}
                                            </span>
                                        </div>

                                        {/* Rating Badge */}
                                        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                            <div className="bg-glass-dark backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
                                                <Star className="w-3 h-3 text-[var(--gold)] fill-[var(--gold)]" />
                                                <span className="text-xs font-semibold text-white">{location.averageRating}</span>
                                            </div>
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-end justify-between mb-2">
                                                <div>
                                                    <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                        <MapPin className="w-3 h-3" />
                                                        {location.region}
                                                    </div>
                                                    <h3 className={`font-display text-white leading-tight ${isLarge ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
                                                        {location.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            <p className={`text-white/80 line-clamp-2 font-light ${isLarge ? "text-lg max-w-lg" : "text-sm"} opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0`}>
                                                {location.tagline}
                                            </p>

                                            {/* Hover Detail: Explore Button */}
                                            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                                <span className="text-white/60 text-xs">
                                                    {location.weddingsHosted} weddings hosted
                                                </span>
                                                <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group/btn">
                                                    Explore Destination
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* No Results State */}
                {filteredLocations.length === 0 && (
                    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                            <Sparkles className="w-8 h-8 text-primary/40" />
                        </div>
                        <h3 className="font-display text-3xl text-foreground mb-3">No Destinations Found</h3>
                        <p className="text-muted-foreground max-w-md">
                            We couldn&apos;t find any destinations matching "{searchQuery}". Try a different search term or browse our full collection.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
                            className="mt-8 text-primary font-semibold hover:underline"
                        >
                            View All Destinations
                        </button>
                    </div>
                )}
            </section>

            {/* Editorial FAQ Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <FloralDecoration variant="vine" className="absolute top-20 left-0 w-64 h-[400px] opacity-10" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Expert Insights</span>
                        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">Planning Your Destination Wedding</h2>
                        <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
                    </div>

                    <div className="grid gap-6">
                        {destinationFaqs.map((faq, i) => (
                            <div key={i} className="bg-[#FAF9F6] p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/10 group">
                                <h3 className="font-display text-xl text-foreground mb-3 flex items-start gap-4">
                                    <span className="text-primary/40 font-serif italic text-2xl">Q.</span>
                                    {faq.question}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed pl-10 group-hover:text-foreground/80 transition-colors">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
