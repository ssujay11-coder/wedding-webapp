"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Heart, MapPin, Calendar, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";

// 3D Tilt Card Component
function TiltCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

const weddings = [
    {
        id: 1,
        title: "A Regal Palace Affair",
        subtitle: "Lakshmi & Arjun",
        location: "Lake Palace, Udaipur",
        image: "/images/portfolio/palace-wedding-1.webp",
        guests: "450 Guests",
        date: "December 2024",
        category: "Royal Palace",
        featured: true,
    },
    {
        id: 2,
        title: "Sunset Beach Romance",
        subtitle: "Priya & Rohan",
        location: "Goa Beach Resort",
        image: "/images/portfolio/beach-wedding-1.webp",
        guests: "200 Guests",
        date: "January 2025",
        category: "Beach",
    },
    {
        id: 3,
        title: "Heritage Grandeur",
        subtitle: "Ananya & Vikram",
        location: "Taj Rambagh Palace, Jaipur",
        image: "/images/portfolio/heritage-wedding-1.webp",
        guests: "350 Guests",
        date: "November 2024",
        category: "Heritage",
    },
    {
        id: 4,
        title: "Desert Dreams",
        subtitle: "Meera & Aditya",
        location: "Suryagarh, Jaisalmer",
        image: "/images/portfolio/palace-wedding-1.webp",
        guests: "180 Guests",
        date: "February 2025",
        category: "Desert",
    },
];

export function FeaturedWeddings() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-secondary/5 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <div className="mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                    >
                        <div>
                            <span className="section-subheading mb-4 block">Our Portfolio</span>
                            <h2 className="section-heading text-4xl md:text-5xl lg:text-6xl text-foreground">
                                Featured Celebrations
                            </h2>
                            <p className="mt-4 text-muted-foreground text-lg max-w-xl">
                                Each wedding we create is a masterpiece—a perfect fusion of tradition,
                                luxury, and your unique love story.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Link
                                href="/portfolio"
                                className="group inline-flex items-center gap-3 px-6 py-3 bg-foreground text-white rounded-full font-medium hover:bg-primary transition-colors duration-300"
                            >
                                View All Weddings
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Featured Large Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                        className="md:col-span-2 md:row-span-2"
                        onMouseEnter={() => setHoveredId(weddings[0].id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <TiltCard className="relative h-[500px] md:h-[700px] rounded-3xl overflow-hidden cursor-pointer group">
                            <Image
                                src={weddings[0].image}
                                alt={weddings[0].title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 66vw"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                            {/* Decorative Corner */}
                            <div className="absolute top-6 left-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, type: "spring" }}
                                    className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                                >
                                    <span className="text-white text-sm font-medium flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-secondary" />
                                        Featured Wedding
                                    </span>
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={hoveredId === weddings[0].id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-center gap-4 mb-4"
                                >
                                    <span className="px-3 py-1 bg-secondary/20 backdrop-blur-sm text-secondary text-xs font-semibold rounded-full">
                                        {weddings[0].category}
                                    </span>
                                    <span className="text-white/70 text-sm flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {weddings[0].date}
                                    </span>
                                </motion.div>

                                <p className="text-white/70 text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {weddings[0].location}
                                </p>

                                <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white italic mb-2">
                                    {weddings[0].title}
                                </h3>

                                <p className="text-white/80 text-lg mb-4">{weddings[0].subtitle}</p>

                                <div className="flex items-center gap-6 text-white/60 text-sm">
                                    <span className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        {weddings[0].guests}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Heart className="w-4 h-4 text-primary" />
                                        View Story
                                    </span>
                                </div>

                                {/* Hover Line */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"
                                    initial={{ scaleX: 0 }}
                                    animate={hoveredId === weddings[0].id ? { scaleX: 1 } : { scaleX: 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ transformOrigin: "left" }}
                                />
                            </div>
                        </TiltCard>
                    </motion.div>

                    {/* Smaller Cards */}
                    {weddings.slice(1).map((wedding, index) => (
                        <motion.div
                            key={wedding.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 * (index + 1), ease: [0.16, 1, 0.3, 1] as const }}
                            onMouseEnter={() => setHoveredId(wedding.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <TiltCard className="relative h-[340px] rounded-2xl overflow-hidden cursor-pointer group">
                                <Image
                                    src={wedding.image}
                                    alt={wedding.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-foreground text-xs font-semibold rounded-full">
                                        {wedding.category}
                                    </span>
                                </div>

                                {/* Content - Revealed on Hover */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 p-6"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={hoveredId === wedding.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="text-white/70 text-xs uppercase tracking-widest mb-1 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {wedding.location}
                                    </p>
                                    <h4 className="font-heading text-xl text-white italic mb-1">
                                        {wedding.title}
                                    </h4>
                                    <p className="text-white/70 text-sm">{wedding.subtitle}</p>
                                </motion.div>

                                {/* Hover Border Effect */}
                                <motion.div
                                    className="absolute inset-0 border-2 border-secondary/50 rounded-2xl pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={hoveredId === wedding.id ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-muted-foreground mb-6 text-lg">
                        Ready to create your own legendary celebration?
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 btn-luxury text-white rounded-full font-semibold text-lg"
                    >
                        <Heart className="w-5 h-5" />
                        Start Planning Your Wedding
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
