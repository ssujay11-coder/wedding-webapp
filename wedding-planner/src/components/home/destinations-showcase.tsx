"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Sparkles, Crown, Star } from "lucide-react";
import { useRef } from "react";
import { FloralDecoration } from "@/components/decorative/floral-elements";

export function DestinationsShowcase() {
    const destinations = [
        {
            name: "Udaipur",
            tagline: "City of Lakes & Royal Heritage",
            description: "Majestic palaces, shimmering lakes, and regal architecture for a fairy-tale wedding fit for royalty.",
            image: "/images/gallery/venues/venues-006-4g4a3787-lg.webp",
            href: "/destinations/udaipur",
            icon: Crown,
            accent: "from-primary/90 to-secondary/70",
            badge: "Most Popular",
        },
        {
            name: "Goa",
            tagline: "Beach Bliss & Tropical Romance",
            description: "Sun-kissed beaches, Portuguese heritage, and endless ocean views create the perfect backdrop.",
            image: "/images/gallery/couples/couples-023-sdak-3870-lg.webp",
            href: "/destinations/goa",
            icon: Sparkles,
            accent: "from-blue-600/80 to-teal-500/70",
            badge: "Beach Favorite",
        },
        {
            name: "Jaipur",
            tagline: "The Pink City of Dreams",
            description: "Opulent forts, vibrant culture, and timeless Rajasthani grandeur for an unforgettable celebration.",
            image: "/images/gallery/venues/venues-005-4g4a3761-lg.webp",
            href: "/destinations/jaipur",
            icon: Star,
            accent: "from-orange-500/80 to-rose-500/70",
        },
        {
            name: "Dubai",
            tagline: "Modern Luxury & Desert Magic",
            description: "Futuristic elegance meets Arabian tradition in the world's most glamorous destination.",
            image: "/images/gallery/venues/venues-010-4g4a6747-lg.webp",
            href: "/destinations/dubai",
            icon: Sparkles,
            accent: "from-amber-500/80 to-yellow-400/70",
            badge: "International",
        },
    ];

    return (
        <section className="py-32 bg-gradient-to-b from-[var(--pastel-cream)] via-white to-[var(--pastel-blush)] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 opacity-20 pointer-events-none">
                <FloralDecoration variant="corner" className="w-48 h-48" color="primary" />
            </div>
            <div className="absolute top-20 right-0 opacity-15 pointer-events-none transform scale-x-[-1]">
                <FloralDecoration variant="corner" className="w-40 h-40" color="gold" />
            </div>
            <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none rotate-180">
                <FloralDecoration variant="branch" className="w-64 h-32" />
            </div>

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-6"
                    >
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                            Dream Destinations
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-display italic text-foreground mb-6">
                        Where Love Stories
                        <span className="block mt-2 text-shimmer-rose">Come Alive</span>
                    </h2>

                    <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                        From serene beaches to royal palaces, we curate weddings in the world's most breathtaking locations.
                        Each destination offers its unique magic to make your celebration truly unforgettable.
                    </p>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mt-10 max-w-xs mx-auto"
                    >
                        <FloralDecoration variant="divider" className="opacity-50" />
                    </motion.div>
                </motion.div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {destinations.map((destination, index) => (
                        <DestinationCard
                            key={destination.name}
                            destination={destination}
                            index={index}
                        />
                    ))}
                </div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <Link
                        href="/destinations"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 border border-primary/10 hover:border-primary/20"
                    >
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            Explore All 40+ Destinations
                        </span>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

interface DestinationCardProps {
    destination: {
        name: string;
        tagline: string;
        description: string;
        image: string;
        href: string;
        icon: React.ElementType;
        accent: string;
        badge?: string;
    };
    index: number;
}

function DestinationCard({ destination, index }: DestinationCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const Icon = destination.icon;

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
        >
            <Link href={destination.href}>
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="group relative h-[520px] overflow-hidden rounded-3xl cursor-pointer card-luxury"
                >
                    {/* Background Image */}
                    <Image
                        src={destination.image}
                        alt={`${destination.name} wedding destination`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${destination.accent} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Badge */}
                    {destination.badge && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="absolute top-6 right-6"
                        >
                            <span className="px-4 py-2 bg-secondary/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                {destination.badge}
                            </span>
                        </motion.div>
                    )}

                    {/* Decorative Corner */}
                    <div className="absolute top-0 left-0 w-24 h-24 opacity-30 pointer-events-none">
                        <FloralDecoration variant="corner" className="w-full h-full" color="rose" animate={false} />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                        {/* Icon & Location */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Icon className="w-5 h-5 text-secondary" />
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-secondary" />
                                <span className="text-sm uppercase tracking-[0.2em] font-semibold">
                                    {destination.name}
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-3xl md:text-4xl italic mb-4 drop-shadow-lg leading-tight">
                            {destination.tagline}
                        </h3>

                        {/* Description */}
                        <p className="text-white/90 mb-6 font-light leading-relaxed max-w-md">
                            {destination.description}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold uppercase tracking-wider">
                                Explore {destination.name}
                            </span>
                            <motion.div
                                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
                            >
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-3xl transition-all duration-500" />

                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}
