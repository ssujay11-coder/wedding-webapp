"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Star, Sparkles, Heart, MapPin, Users, Award, TrendingUp, Play } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

// Magnetic button hook for premium interactions
function useMagnetic(ref: React.RefObject<HTMLElement | null>, strength = 0.3) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        x.set(deltaX);
        y.set(deltaY);
    }, [ref, strength, x, y]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [ref, handleMouseMove, handleMouseLeave]);

    return { x: useSpring(x, { stiffness: 150, damping: 15 }), y: useSpring(y, { stiffness: 150, damping: 15 }) };
}

// Magnetic Button Component
function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const { x, y } = useMagnetic(ref, 0.4);

    return (
        <motion.a
            ref={ref}
            href={href}
            style={{ x, y }}
            className={className}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.a>
    );
}

// Animated Counter for Stats
function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = value;
                    const duration = 2000;
                    const stepTime = Math.abs(Math.floor(duration / end));
                    const timer = setInterval(() => {
                        start += 1;
                        setCount(start);
                        if (start >= end) clearInterval(timer);
                    }, stepTime);
                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// Floating Particles Effect
function FloatingParticles() {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 2 + Math.random() * 4,
            delay: Math.random() * 5,
            duration: 10 + Math.random() * 20,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        background: particle.id % 3 === 0
                            ? "linear-gradient(135deg, #c9a962 0%, #f5e6c8 100%)"
                            : particle.id % 3 === 1
                                ? "rgba(255, 255, 255, 0.6)"
                                : "linear-gradient(135deg, #c41e4a 0%, #e86b8a 100%)",
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

// Falling Rose Petals
function FallingPetals() {
    const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number; rotation: number }>>([]);

    useEffect(() => {
        const newPetals = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 8,
            duration: 12 + Math.random() * 8,
            size: 14 + Math.random() * 10,
            rotation: Math.random() * 360,
        }));
        setPetals(newPetals);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {petals.map((petal) => (
                <motion.div
                    key={petal.id}
                    className="absolute"
                    style={{ left: `${petal.left}%`, top: -30 }}
                    initial={{ y: -50, opacity: 0, rotate: petal.rotation }}
                    animate={{
                        y: ["0vh", "105vh"],
                        x: [0, Math.sin(petal.id) * 80, -Math.sin(petal.id) * 60, Math.sin(petal.id) * 40],
                        rotate: [petal.rotation, petal.rotation + 720],
                        opacity: [0, 0.7, 0.7, 0],
                    }}
                    transition={{
                        duration: petal.duration,
                        delay: petal.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <svg width={petal.size} height={petal.size} viewBox="0 0 24 24" fill="none">
                        <ellipse
                            cx="12"
                            cy="12"
                            rx="10"
                            ry="5"
                            fill={petal.id % 4 === 0 ? "#c41e4a" : petal.id % 4 === 1 ? "#f8d7e0" : petal.id % 4 === 2 ? "#c9a962" : "#ffecd2"}
                            opacity="0.8"
                            transform="rotate(45 12 12)"
                        />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax transforms
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 800], [1, 1.15]);
    const textY = useTransform(scrollY, [0, 400], [0, 80]);

    // Smooth spring animations
    const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
            },
        },
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen overflow-hidden flex items-center justify-center hero-cinematic"
        >
            {/* Background with Parallax */}
            <motion.div style={{ scale: smoothScale }} className="absolute inset-0 z-0">
                <Image
                    src="/images/gallery/couples/couples-023-sdak-3870-lg.webp"
                    alt="Luxury Destination Wedding - Stunning bridal processional at exclusive waterfront venue in India"
                    fill
                    priority
                    quality={90}
                    sizes="100vw"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZGYyZjgiLz48L3N2Zz4="
                />

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/15" />
                <div className="hero-vignette" />
                <div className="hero-grain hidden md:block" />

                {/* Golden Light Leak Effect */}
                <motion.div
                    className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20"
                    style={{
                        background: "radial-gradient(ellipse at top right, rgba(201, 169, 98, 0.4) 0%, transparent 70%)",
                    }}
                    animate={{ opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Floating Particles - Desktop Only */}
            <div className="hidden md:block">
                <FloatingParticles />
                <FallingPetals />
            </div>

            {/* Main Content */}
            <motion.div
                style={{ y: textY, opacity }}
                className="relative z-20 text-center px-4 sm:px-6 max-w-6xl mx-auto"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6 md:space-y-8"
                >
                    {/* Top Badge - Authority */}
                    <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3">
                        <div className="trust-badge text-foreground">
                            <Award className="w-4 h-4 text-secondary" />
                            <span>Award-Winning Since 2011</span>
                        </div>
                        <div className="trust-badge text-foreground">
                            <Heart className="w-4 h-4 text-primary" />
                            <span>Free Expert Consultation</span>
                        </div>
                    </motion.div>

                    {/* Pre-headline */}
                    <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
                        <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-secondary/60" />
                        <span className="section-subheading text-white/90 text-[10px] sm:text-xs">
                            India&apos;s Premier Destination Wedding Planners
                        </span>
                        <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-secondary/60" />
                    </motion.div>

                    {/* Main Headline */}
                    <motion.div variants={itemVariants}>
                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-light tracking-tight leading-[1.05]">
                            <span className="block">Where Dreams Become</span>
                            <span className="block mt-2 md:mt-4 italic">
                                <span className="text-shimmer-gold">Legendary</span>
                                <span className="text-white/90"> Celebrations</span>
                            </span>
                        </h1>
                    </motion.div>

                    {/* Value Proposition */}
                    <motion.p
                        variants={itemVariants}
                        className="text-white/85 text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed"
                    >
                        From the majestic palaces of{" "}
                        <span className="text-secondary font-medium">Udaipur</span> to the sun-kissed shores of{" "}
                        <span className="text-secondary font-medium">Goa</span>—we&apos;ve orchestrated{" "}
                        <span className="font-semibold text-white">200+ flawless weddings</span> worth{" "}
                        <span className="font-semibold text-white">₹200 Crore+</span>
                    </motion.p>

                    {/* Quick Stats Strip */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white/80 text-sm"
                    >
                        {[
                            { icon: Users, label: "50,000+ Guests Served" },
                            { icon: MapPin, label: "40+ Destinations" },
                            { icon: TrendingUp, label: "100% Client Satisfaction" },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                <Icon className="w-4 h-4 text-secondary" />
                                <span className="text-xs sm:text-sm">{label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="pt-4 md:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <MagneticButton
                            href="/contact"
                            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold text-white bg-primary rounded-full overflow-hidden btn-luxury"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Start Planning My Dream Wedding
                            </span>
                        </MagneticButton>

                        <MagneticButton
                            href="/portfolio"
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 text-base sm:text-lg font-medium text-white border-2 border-white/30 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-secondary/60 transition-all duration-300"
                        >
                            <Play className="w-5 h-5" />
                            View 200+ Real Weddings
                        </MagneticButton>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        variants={itemVariants}
                        className="pt-8 md:pt-12"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                            {/* Star Rating */}
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.5 + i * 0.1 }}
                                        >
                                            <Star className="w-5 h-5 text-secondary fill-secondary" />
                                        </motion.div>
                                    ))}
                                </div>
                                <span className="text-white/80 text-sm font-medium">5.0 (127 Reviews)</span>
                            </div>

                            <div className="hidden sm:block w-px h-6 bg-white/20" />

                            {/* Trust Indicators */}
                            <div className="flex items-center gap-6 text-white/70 text-sm">
                                <span><span className="text-white font-semibold">14</span> Years Excellence</span>
                                <span><span className="text-white font-semibold">500+</span> Premium Vendors</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-3 text-white/50"
                >
                    <span className="text-xs uppercase tracking-[0.25em] font-medium">Discover</span>
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 bg-secondary rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        </section>
    );
}

// Enhanced Stats Bar with Animation
export function StatsBar() {
    const stats = [
        { value: 200, suffix: "+", label: "Weddings Planned", subLabel: "Since 2011", icon: Heart },
        { value: 200, prefix: "₹", suffix: "Cr+", label: "Budgets Managed", subLabel: "Trusted by HNI Families", icon: TrendingUp },
        { value: 50, suffix: "K+", label: "Guests Delighted", subLabel: "Across 3 Countries", icon: Users },
        { value: 40, suffix: "+", label: "Destinations", subLabel: "India • Dubai • Thailand", icon: MapPin },
        { value: 500, suffix: "+", label: "Premium Vendors", subLabel: "Exclusive Network", icon: Sparkles },
        { value: 5, suffix: ".0", label: "Client Rating", subLabel: "127 Reviews", icon: Star, showStars: true },
    ];

    return (
        <section className="relative w-full py-16 md:py-20 bg-gradient-editorial overflow-hidden">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 bg-pattern-dots opacity-50" />

            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="section-subheading">Our Track Record</span>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center group"
                        >
                            <div className="relative mb-3">
                                {/* Hover Effect Background */}
                                <div className="absolute inset-0 -m-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500" />

                                {stat.showStars ? (
                                    <div className="flex flex-col items-center gap-2 relative">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, j) => (
                                                <Star key={j} className="w-4 h-4 text-secondary fill-secondary" />
                                            ))}
                                        </div>
                                        <span className="text-3xl md:text-4xl font-heading text-primary font-medium">
                                            {stat.value}{stat.suffix}
                                        </span>
                                    </div>
                                ) : (
                                    <motion.p
                                        className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary relative"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {stat.prefix}{stat.value}{stat.suffix}
                                    </motion.p>
                                )}
                            </div>

                            <p className="text-xs uppercase tracking-[0.15em] text-foreground font-semibold mb-1">
                                {stat.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {stat.subLabel}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-12 md:mt-16 mx-auto max-w-sm"
                >
                    <div className="divider-elegant" />
                </motion.div>

                {/* Trust Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-center text-sm md:text-base text-muted-foreground mt-8 font-light italic"
                >
                    Trusted by India&apos;s most discerning families for their most precious celebrations
                </motion.p>
            </div>
        </section>
    );
}
