"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Search, Filter, ArrowRight, Sparkles, Globe, Award, Users, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FloralDecoration } from "@/components/decorative/floral-elements";
import { locations, getIndiaLocations, getThailandLocations, getUAELocations } from "@/data/locations";

// Destination stats for hero
const destinationStats = [
    { value: "40+", label: "Destinations", subLabel: "3 Countries" },
    { value: "200+", label: "Weddings", subLabel: "At These Venues" },
    { value: "50+", label: "Luxury Venues", subLabel: "Exclusive Access" },
    { value: "5.0", label: "Avg Rating", subLabel: "Across All Venues" },
];

// FAQs for featured snippets
const destinationFaqs = [
    {
        question: "What are the best destination wedding locations in India?",
        answer: "The top destination wedding locations in India include Udaipur (palace weddings at City Palace, Oberoi Udaivilas), Jaipur (heritage forts and havelis), Goa (beach resorts like W Goa, Taj Exotica), Kerala (backwater resorts), Jaisalmer (desert weddings), and Jim Corbett (jungle resorts). Each offers unique experiences with budgets ranging from ₹50 Lakh to ₹15 Crore+."
    },
    {
        question: "How much does a destination wedding cost in India?",
        answer: "Destination wedding costs in India vary by location: Udaipur palace weddings start at ₹1.5 Crore for 200+ guests; Goa beach weddings from ₹50 Lakh for 100 guests; Jaipur heritage weddings from ₹80 Lakh; Kerala backwater weddings from ₹60 Lakh. Costs include venue, decor, catering, accommodation, and planning services."
    },
    {
        question: "When is the best time for a destination wedding in India?",
        answer: "The best wedding season varies by destination: October-March for Rajasthan (Udaipur, Jaipur, Jaisalmer), November-February for Goa and South India, September-March for Kerala, and October-May for hill stations. Avoid monsoon (June-September) for outdoor venues."
    },
    {
        question: "Does Elite Wedding Planner handle international destination weddings?",
        answer: "Yes, Elite specializes in international destination weddings in Dubai (Palace Downtown, Atlantis), Abu Dhabi (Emirates Palace), Thailand (Phuket, Koh Samui), and Bali. We handle venue booking, guest travel, visas, local vendor coordination, and on-ground execution across 40+ international venues."
    },
];

type CountryFilter = "all" | "India" | "Thailand" | "UAE";

export function DestinationsClient() {
    const [activeFilter, setActiveFilter] = useState<CountryFilter>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredLocations = locations.filter((loc) => {
        const matchesCountry = activeFilter === "all" || loc.country === activeFilter;
        const matchesSearch =
            searchQuery === "" ||
            loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            loc.region.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCountry && matchesSearch;
    });

    const indiaCount = getIndiaLocations().length;
    const thailandCount = getThailandLocations().length;
    const uaeCount = getUAELocations().length;

    return (
        <>
            {/* Hero Section - SEO Optimized with Mobile-First Design */}
            <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 bg-gradient-to-b from-[var(--pastel-blush)] via-white to-[var(--pastel-cream)] overflow-hidden">
                {/* Decorative Elements - Hidden on mobile for performance */}
                <div className="absolute top-20 left-0 opacity-20 pointer-events-none hidden md:block">
                    <FloralDecoration variant="branch" className="w-64 h-32" color="primary" />
                </div>
                <div className="absolute top-32 right-0 opacity-15 pointer-events-none transform scale-x-[-1] hidden md:block">
                    <FloralDecoration variant="branch" className="w-56 h-28" color="gold" />
                </div>
                <div className="absolute bottom-0 left-1/4 opacity-10 pointer-events-none hidden md:block">
                    <FloralDecoration variant="rose" className="w-32 h-32" />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 rounded-full mb-4 md:mb-6"
                        >
                            <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                            <span className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">
                                40+ Dream Destinations
                            </span>
                        </motion.div>

                        {/* H1 - Primary Keyword: "Destination Wedding Locations" */}
                        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic text-foreground mb-4 md:mb-6 leading-tight">
                            <span className="text-primary">Destination Wedding</span> Locations
                        </h1>

                        {/* SEO-rich description with data points */}
                        <p className="max-w-4xl mx-auto text-muted-foreground text-base sm:text-lg font-light leading-relaxed mb-6 md:mb-10">
                            Explore <strong className="text-foreground">40+ handpicked wedding destinations</strong> across
                            <strong className="text-foreground"> India, Dubai & Thailand</strong>—from the royal palaces of
                            <strong className="text-foreground"> Udaipur</strong> to the tropical beaches of
                            <strong className="text-foreground"> Goa</strong> and modern luxury of
                            <strong className="text-foreground"> Dubai</strong>. We&apos;ve hosted <strong className="text-foreground">200+ weddings</strong> at these venues.
                        </p>

                        {/* Stats Grid - Mobile Optimized */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-3xl mx-auto mb-8 md:mb-12">
                            {destinationStats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    className="text-center bg-white/70 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-primary/10"
                                >
                                    <div className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-primary">{stat.value}</div>
                                    <div className="text-xs md:text-sm font-medium text-foreground">{stat.label}</div>
                                    <div className="text-[10px] md:text-xs text-muted-foreground">{stat.subLabel}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Country Stats - Mobile Friendly */}
                        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-sm">
                            <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full">
                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                <span className="text-foreground font-medium">{indiaCount} India</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-teal-500/10 px-3 py-1.5 rounded-full">
                                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                                <span className="text-foreground font-medium">{thailandCount} Thailand</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1.5 rounded-full">
                                <MapPin className="w-3.5 h-3.5 text-secondary" />
                                <span className="text-foreground font-medium">{uaeCount} UAE</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Decorative Divider - Desktop Only */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-8 md:mt-12 max-w-sm mx-auto hidden md:block"
                    >
                        <FloralDecoration variant="divider" className="opacity-50" />
                    </motion.div>
                </div>
            </section>

            {/* Filter & Search Section */}
            <section className="py-8 bg-white border-b border-primary/5 sticky top-16 z-30 backdrop-blur-xl bg-white/95">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-primary/10 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-muted-foreground mr-2" />
                            {(["all", "India", "Thailand", "UAE"] as CountryFilter[]).map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                        activeFilter === filter
                                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                                            : "bg-white text-muted-foreground hover:bg-primary/5 border border-primary/10"
                                    }`}
                                >
                                    {filter === "all" ? "All Destinations" : filter}
                                    {filter !== "all" && (
                                        <span className="ml-1.5 text-xs opacity-70">
                                            ({filter === "India" ? indiaCount : filter === "Thailand" ? thailandCount : uaeCount})
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="py-16 bg-gradient-to-b from-white to-[var(--pastel-cream)]/50">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Results Count */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-muted-foreground mb-8"
                    >
                        Showing <strong className="text-foreground">{filteredLocations.length}</strong> destinations
                        {activeFilter !== "all" && ` in ${activeFilter}`}
                        {searchQuery && ` matching "${searchQuery}"`}
                    </motion.p>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredLocations.map((location, i) => (
                                <motion.div
                                    key={location.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: i * 0.03 }}
                                >
                                    <Link href={`/destinations/${location.slug}`}>
                                        <div className="group card-luxury rounded-2xl overflow-hidden h-full">
                                            {/* Image */}
                                            <div className="relative h-56 overflow-hidden">
                                                <Image
                                                    src={location.heroImage}
                                                    alt={location.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                                {/* Country Badge */}
                                                <div className="absolute top-4 left-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                        location.country === "India"
                                                            ? "bg-primary/90 text-white"
                                                            : location.country === "Thailand"
                                                                ? "bg-teal-500/90 text-white"
                                                                : "bg-secondary/90 text-white"
                                                    }`}>
                                                        {location.country}
                                                    </span>
                                                </div>

                                                {/* Rating */}
                                                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                                                    <Star className="w-3 h-3 text-secondary fill-secondary" />
                                                    <span className="text-xs font-semibold">{location.averageRating}</span>
                                                </div>

                                                {/* Location Name on Image */}
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
                                                        <MapPin className="w-3 h-3" />
                                                        <span>{location.region}</span>
                                                    </div>
                                                    <h3 className="text-xl font-display italic text-white drop-shadow-lg">
                                                        {location.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5">
                                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                                    {location.tagline}
                                                </p>

                                                {/* Popular For Tags */}
                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    {location.popularFor.slice(0, 3).map((tag, j) => (
                                                        <span
                                                            key={j}
                                                            className="px-2 py-0.5 bg-primary/5 text-primary text-xs rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* CTA */}
                                                <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                                                    <span className="text-xs text-muted-foreground">
                                                        {location.weddingsHosted} weddings
                                                    </span>
                                                    <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                                                        Explore
                                                        <ArrowRight className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* No Results */}
                    {filteredLocations.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Sparkles className="w-16 h-16 text-primary/20 mx-auto mb-4" />
                            <h3 className="text-2xl font-display italic text-foreground mb-2">
                                No destinations found
                            </h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filter criteria
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* FAQ Section - GEO Optimized for Featured Snippets */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-2 block">
                            Common Questions
                        </span>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl italic text-foreground">
                            Destination Wedding FAQs
                        </h2>
                    </motion.div>

                    <div className="space-y-3 md:space-y-4">
                        {destinationFaqs.map((faq, i) => (
                            <motion.div
                                key={faq.question}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-accent/50 p-4 md:p-5 rounded-xl hover:bg-accent transition-colors"
                            >
                                <h3 className="font-semibold text-foreground text-sm md:text-base mb-2 flex items-start gap-2">
                                    <span className="text-primary flex-shrink-0">Q:</span>
                                    <span>{faq.question}</span>
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed pl-5">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Mobile Optimized */}
            <section className="py-12 md:py-20 bg-gradient-to-br from-[#221015] via-[#2d1a20] to-[#221015] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 hidden md:block">
                    <FloralDecoration variant="pattern" className="w-full h-full" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-secondary text-xs md:text-sm font-bold tracking-widest uppercase mb-3 md:mb-4 block">
                            Can&apos;t Decide?
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic text-white mb-4 md:mb-6">
                            Let Us Help You Choose the Perfect Destination
                        </h2>
                        <p className="text-white/80 text-base md:text-lg mb-6 md:mb-10 max-w-2xl mx-auto">
                            Our expert planners will help you find the <strong>perfect destination</strong> based on your vision,
                            budget, guest count, and preferred wedding style. <strong>Free consultation.</strong>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/contact">
                                <button className="w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold btn-luxury inline-flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base">
                                    Get Destination Recommendations
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </Link>
                            <Link href="/venues">
                                <button className="w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-semibold inline-flex items-center justify-center gap-2 text-sm md:text-base">
                                    Browse 50+ Venues
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
