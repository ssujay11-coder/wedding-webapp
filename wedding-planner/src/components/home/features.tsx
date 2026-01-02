"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Palette, Plane, Star, Users, Heart, Sparkles, Shield, Clock } from "lucide-react";

export function PhilosophySection() {
    const pillars = [
        {
            icon: Palette,
            title: "Bespoke Design",
            description: "Zero templates. Every element—from invitation suites to table settings—custom-designed to reflect your unique love story."
        },
        {
            icon: Users,
            title: "Dedicated Team",
            description: "12+ specialists assigned exclusively to your wedding: designers, coordinators, logistics experts, and on-ground managers."
        },
        {
            icon: Shield,
            title: "Stress-Free Promise",
            description: "We manage 1,000+ micro-details so you can be fully present. From vendor contracts to emergency backups—we handle it all."
        },
        {
            icon: Star,
            title: "Premium Access",
            description: "Exclusive relationships with India's top 50 luxury venues and 500+ vetted elite vendors across 40+ destinations."
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#fffef5] to-white text-center px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 md:space-y-8 mb-12 md:mb-16"
                >
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-8 md:w-12 h-px bg-primary/30" />
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary opacity-60" />
                        <div className="w-8 md:w-12 h-px bg-primary/30" />
                    </div>

                    <div className="space-y-4">
                        <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase">Our Philosophy</span>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
                            Soft Luxury, <span className="italic text-primary">Timeless Elegance</span>
                        </h2>
                    </div>

                    <div className="w-20 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto" />

                    <div className="max-w-3xl mx-auto space-y-4">
                        <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-light leading-relaxed">
                            We believe extraordinary weddings aren&apos;t about extravagance—they&apos;re about <span className="font-medium text-foreground">intentionality</span>.
                            Every chandelier placement, every floral arrangement, every musical note is curated to tell <em>your</em> unique love story.
                        </p>
                        <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed">
                            Our signature approach blends the <span className="font-medium">rich heritage of Indian wedding traditions</span> with
                            the <span className="font-medium">refined elegance of European editorial design</span>—creating celebrations that feel
                            both magnificently grand and intimately personal.
                        </p>
                    </div>
                </motion.div>

                {/* Four Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/10"
                        >
                            {/* Number Badge */}
                            <div className="absolute top-4 right-4 text-4xl md:text-5xl font-display font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            {/* Icon */}
                            <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <pillar.icon className="w-6 h-6 md:w-7 md:h-7" />
                            </div>

                            {/* Content */}
                            <h3 className="font-heading text-lg md:text-xl mb-2 md:mb-3 text-foreground text-left">{pillar.title}</h3>
                            <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-left">
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-primary/10"
                >
                    <blockquote className="text-lg sm:text-xl md:text-2xl font-display italic text-foreground/80 max-w-3xl mx-auto">
                        &ldquo;The result? Celebrations your guests will reminisce about for decades.&rdquo;
                    </blockquote>
                    <p className="mt-4 text-sm text-muted-foreground">
                        — Featured in Vogue India, WeddingSutra & ShaadiSaga
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export function DestinationsGrid() {
    return (
        <section id="destinations" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-primary text-xs font-bold tracking-widest uppercase">Destinations</span>
                        <h2 className="font-heading text-4xl md:text-5xl mt-2">Where We Create Magic</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[600px] md:grid-rows-2">
                    {/* Udaipur - Large Item */}
                    <div className="relative group md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden cursor-pointer shadow-xl">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: 'url("/images/destinations/udaipur.webp")' }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-8 left-8 text-white">
                            <div className="flex items-center gap-2 mb-2 text-white/80 text-sm uppercase tracking-widest">
                                <MapPin className="w-4 h-4" /> Udaipur, India
                            </div>
                            <h3 className="font-heading text-4xl">Royal Palace Weddings</h3>
                        </div>
                    </div>

                    {/* Goa - Small Item */}
                    <div className="relative group rounded-2xl overflow-hidden cursor-pointer shadow-xl h-[300px] md:h-auto">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: 'url("/images/services/decor.webp")' }}></div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="font-heading text-2xl">Exquisite Decor</h3>
                        </div>
                    </div>

                    {/* Dubai - Small Item */}
                    <div className="relative group rounded-2xl overflow-hidden cursor-pointer shadow-xl h-[300px] md:h-auto">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: 'url("/images/decorative/flowers-overlay.webp")' }}></div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="font-heading text-2xl">Luxury Details</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function ServicesSection() {
    const services = [
        {
            icon: Users,
            title: "Full Service Planning",
            desc: "From venue scouting to the final farewell brunch, we manage every logistical detail so you can remain present in the moment."
        },
        {
            icon: Plane,
            title: "Destination Management",
            desc: "Logistics for guests arriving from around the globe. We handle travel, accommodation, and curated local experiences."
        },
        {
            icon: Palette,
            title: "Design & Styling",
            desc: "Curating a cohesive visual narrative through florals, lighting, linens, and bespoke installations that reflect your essence."
        }
    ];

    return (
        <section className="py-24 bg-surface-rose/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-primary text-xs font-bold tracking-widest uppercase">Expertise</span>
                    <h2 className="font-heading text-4xl md:text-5xl mt-2">Comprehensive Services</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <div key={i} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/10 group">
                            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <s.icon className="w-8 h-8" />
                            </div>
                            <h3 className="font-heading text-2xl mb-4 text-foreground">{s.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {s.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
