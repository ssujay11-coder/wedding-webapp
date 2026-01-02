"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Star, Sparkles, Heart, MapPin, Users, Award } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { FloralDecoration, GoldSparkles } from "@/components/decorative/floral-elements";
import Image from "next/image";
import { StartPlanningButton } from "./start-planning-button";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden flex items-center justify-center text-center py-20 md:py-0">
            {/* Background Image with Parallax */}
            <motion.div style={{ scale }} className="absolute inset-0 z-0">
                <Image
                    src="/images/heroes/home-hero.webp"
                    alt="Luxury Destination Wedding in India - Elite Wedding Planner orchestrating grand celebrations at royal palaces and beach resorts"
                    fill
                    priority
                    quality={90}
                    sizes="100vw"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZGYyZjgiLz48L3N2Zz4="
                />
                {/* Luxurious Multi-layer Overlay for Better Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#221015]/70 via-[#221015]/40 to-[#221015]/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
                {/* Vignette Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
            </motion.div>

            {/* Floating Decorative Elements - Hidden on mobile for performance */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden hidden md:block">
                {/* Top Left Floral */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 0.4, x: 0 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="absolute top-20 left-0"
                >
                    <FloralDecoration variant="branch" className="w-64 h-32 opacity-60" color="rose" />
                </motion.div>

                {/* Top Right Floral */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 0.4, x: 0 }}
                    transition={{ delay: 1.2, duration: 1.5 }}
                    className="absolute top-32 right-0 transform scale-x-[-1]"
                >
                    <FloralDecoration variant="branch" className="w-56 h-28 opacity-50" color="gold" />
                </motion.div>

                {/* Bottom decorative elements */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 0.3, y: 0 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    className="absolute bottom-32 left-10"
                >
                    <FloralDecoration variant="rose" className="w-20 h-20" color="rose" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 0.25, y: 0 }}
                    transition={{ delay: 1.7, duration: 1.5 }}
                    className="absolute bottom-40 right-16"
                >
                    <FloralDecoration variant="rose" className="w-16 h-16" color="gold" />
                </motion.div>

                {/* Gold Sparkles Overlay */}
                <GoldSparkles className="opacity-30" />

                {/* Animated Petals */}
                <FallingPetals />
            </div>

            {/* Main Content - Optimized for Mobile */}
            <motion.div style={{ y, opacity }} className="relative z-20 space-y-6 md:space-y-8 px-4 sm:px-6 max-w-5xl mx-auto text-white">
                {/* Decorative line above tagline */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="w-16 md:w-20 h-[2px] mx-auto bg-gradient-to-r from-transparent via-secondary to-transparent"
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-4 md:space-y-6"
                >
                    {/* Pre-headline with Award Badge */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                            <Award className="w-3.5 h-3.5 text-secondary" />
                            <span className="text-xs font-medium text-white/90">Award-Winning Since 2011</span>
                        </div>
                    </div>

                    {/* Tagline with Icon - SEO Optimized */}
                    <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
                        <Sparkles className="w-4 h-4 text-secondary animate-pulse hidden sm:block" />
                        <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs sm:text-sm md:text-base font-medium text-white/90 drop-shadow-lg">
                            India&apos;s #1 Luxury Destination Wedding Planners
                        </span>
                        <Sparkles className="w-4 h-4 text-secondary animate-pulse hidden sm:block" />
                    </div>

                    {/* Main Heading - Mobile Optimized Typography */}
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-[1.1]">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="block drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                        >
                            Where Dreams Become
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="block italic font-light mt-1 md:mt-2"
                        >
                            <span className="text-shimmer-gold">Legendary Celebrations</span>
                        </motion.span>
                    </h1>
                </motion.div>

                {/* Description - Data-Rich & SEO Optimized */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="space-y-4"
                >
                    <p className="text-white/90 text-base sm:text-lg md:text-xl font-light tracking-wide max-w-3xl mx-auto drop-shadow-md leading-relaxed px-2">
                        From the majestic palaces of <span className="font-medium text-secondary">Udaipur</span> to the sun-kissed shores of <span className="font-medium text-secondary">Goa</span>,
                        we&apos;ve orchestrated <span className="font-semibold">200+ flawless weddings</span> worth
                        <span className="font-semibold"> ₹200 Crore+</span> across
                        <span className="font-medium text-secondary"> 40+ destinations</span> in India, Dubai & Thailand.
                    </p>

                    {/* Quick Stats Row - Mobile Friendly */}
                    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs sm:text-sm text-white/80">
                        <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <Users className="w-3.5 h-3.5 text-secondary" />
                            <span>50,000+ Guests Served</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <MapPin className="w-3.5 h-3.5 text-secondary" />
                            <span>3 Countries</span>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Buttons - Mobile Optimized */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="pt-4 md:pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                >
                    <StartPlanningButton />

                    <Button
                        onClick={() => window.location.href = '/portfolio'}
                        variant="outline"
                        className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 hover:border-secondary text-base sm:text-lg px-8 py-6 sm:py-7 rounded-full backdrop-blur-sm transition-all duration-300"
                    >
                        View 200+ Real Weddings
                    </Button>
                </motion.div>

                {/* Trust Badges - Enhanced with Reviews Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="pt-6 md:pt-8"
                >
                    {/* Desktop Trust Badges */}
                    <div className="hidden sm:flex items-center justify-center gap-4 md:gap-6 text-sm text-white/80">
                        <div className="flex items-center gap-1.5 group cursor-pointer">
                            <div className="flex -space-x-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                                ))}
                            </div>
                            <span className="group-hover:text-white transition-colors">5.0 (127 Reviews)</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/30" />
                        <span>200+ Weddings Planned</span>
                        <div className="w-1 h-1 rounded-full bg-white/30" />
                        <span>14 Years of Excellence</span>
                        <div className="w-1 h-1 rounded-full bg-white/30" />
                        <span>500+ Premium Vendors</span>
                    </div>

                    {/* Mobile Trust Badges - 2x2 Grid */}
                    <div className="sm:hidden grid grid-cols-2 gap-2 text-xs text-white/80 max-w-xs mx-auto">
                        <div className="flex items-center justify-center gap-1 bg-white/5 backdrop-blur-sm py-2 px-3 rounded-lg">
                            <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                            <span>5.0 (127 Reviews)</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 bg-white/5 backdrop-blur-sm py-2 px-3 rounded-lg">
                            <Heart className="w-3.5 h-3.5 text-secondary" />
                            <span>200+ Weddings</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 bg-white/5 backdrop-blur-sm py-2 px-3 rounded-lg">
                            <Award className="w-3.5 h-3.5 text-secondary" />
                            <span>14 Years</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 bg-white/5 backdrop-blur-sm py-2 px-3 rounded-lg">
                            <Users className="w-3.5 h-3.5 text-secondary" />
                            <span>500+ Vendors</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 text-white/60"
                >
                    <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 bg-secondary rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Decorative bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
        </section>
    );
}

// Falling Petals Animation
function FallingPetals() {
    const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

    useEffect(() => {
        const newPetals = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 8 + Math.random() * 6,
            size: 12 + Math.random() * 12,
        }));
        setPetals(newPetals);
    }, []);

    return (
        <>
            {petals.map((petal) => (
                <motion.div
                    key={petal.id}
                    initial={{ y: -50, x: 0, rotate: 0, opacity: 0 }}
                    animate={{
                        y: ["0vh", "100vh"],
                        x: [0, Math.sin(petal.id) * 50, -Math.sin(petal.id) * 30, 0],
                        rotate: [0, 360, 720],
                        opacity: [0, 0.6, 0.6, 0],
                    }}
                    transition={{
                        duration: petal.duration,
                        delay: petal.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute"
                    style={{ left: `${petal.left}%`, top: -20 }}
                >
                    <svg width={petal.size} height={petal.size} viewBox="0 0 20 20" fill="none">
                        <ellipse
                            cx="10"
                            cy="10"
                            rx="8"
                            ry="4"
                            fill={petal.id % 3 === 0 ? "#ee2b5b" : petal.id % 3 === 1 ? "#fdd5e0" : "#d4af37"}
                            opacity="0.7"
                            transform={`rotate(${45 + petal.id * 15} 10 10)`}
                        />
                    </svg>
                </motion.div>
            ))}
        </>
    );
}

export function StatsBar() {
    const stats = [
        {
            value: "200+",
            label: "Weddings Planned",
            subLabel: "Since 2011",
            icon: Heart
        },
        {
            value: "₹200Cr+",
            label: "Budgets Managed",
            subLabel: "Trusted by HNI Families",
            icon: Award
        },
        {
            value: "50,000+",
            label: "Guests Delighted",
            subLabel: "Across 3 Countries",
            icon: Users
        },
        {
            value: "40+",
            label: "Destinations",
            subLabel: "India • Dubai • Thailand",
            icon: MapPin
        },
        {
            value: "500+",
            label: "Premium Vendors",
            subLabel: "Exclusive Network",
            icon: Sparkles
        },
        {
            value: "5.0",
            label: "Client Rating",
            subLabel: "127 Verified Reviews",
            icon: Star,
            showStars: true
        },
    ];

    return (
        <div className="w-full bg-gradient-to-r from-[var(--pastel-blush)] via-white to-[var(--pastel-peach)] border-y border-primary/5 py-12 md:py-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30 hidden md:block">
                <FloralDecoration variant="pattern" className="w-full h-full" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
                {/* Section Header - Mobile Only */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:hidden"
                >
                    <span className="text-primary text-xs font-bold tracking-widest uppercase">Our Track Record</span>
                </motion.div>

                {/* Stats Grid - Responsive */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            className="text-center group p-4 md:p-0 rounded-xl md:rounded-none bg-white/50 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
                        >
                            <div className="relative inline-block">
                                {/* Decorative circle behind - Desktop only */}
                                <div className="absolute inset-0 -m-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 hidden md:block" />

                                {stat.showStars ? (
                                    <div className="flex flex-col items-center gap-1 relative">
                                        <div className="flex items-center gap-0.5 justify-center">
                                            {[...Array(5)].map((_, j) => (
                                                <motion.div
                                                    key={j}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.3 + j * 0.08 }}
                                                >
                                                    <Star className="w-4 h-4 md:w-5 md:h-5 text-secondary fill-secondary" />
                                                </motion.div>
                                            ))}
                                        </div>
                                        <span className="text-2xl md:text-3xl font-display text-primary font-medium">{stat.value}</span>
                                    </div>
                                ) : (
                                    <motion.p
                                        className="font-display text-2xl sm:text-3xl md:text-4xl text-primary relative font-medium"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {stat.value}
                                    </motion.p>
                                )}
                            </div>
                            <p className="text-xs uppercase tracking-[0.12em] md:tracking-[0.15em] text-foreground mt-2 font-semibold">
                                {stat.label}
                            </p>
                            <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 font-medium">
                                {stat.subLabel}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative divider - Desktop only */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-10 md:mt-12 mx-auto max-w-md hidden md:block"
                >
                    <FloralDecoration variant="divider" className="opacity-60" />
                </motion.div>

                {/* Trust Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="text-center text-sm md:text-base text-muted-foreground mt-6 md:mt-8 font-light"
                >
                    Trusted by India&apos;s most discerning families for their most precious celebrations
                </motion.p>
            </div>
        </div>
    );
}
