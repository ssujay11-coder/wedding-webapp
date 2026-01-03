"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Heart, Phone, Star, Sparkles, MessageCircle, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { useState, useEffect } from "react";

// Animated Background Orbs
function FloatingOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(201, 169, 98, 0.4) 0%, transparent 70%)",
                }}
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full opacity-15"
                style={{
                    background: "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
                }}
                animate={{
                    y: [0, 30, 0],
                    x: [0, -20, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}

// Live Activity Indicator
function LiveActivity() {
    const [activeUsers, setActiveUsers] = useState(12);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveUsers(Math.floor(Math.random() * 8) + 8);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
        >
            <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-white/90 text-sm font-medium">
                {activeUsers} couples planning right now
            </span>
        </motion.div>
    );
}

export function CTASectionEnhanced() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#9a1a40] to-[#7a1535]" />

            {/* Decorative Pattern */}
            <div className="absolute inset-0 bg-pattern-dots opacity-5" />

            {/* Floating Orbs */}
            <FloatingOrbs />

            {/* Decorative Circles */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full pointer-events-none"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                        {/* Top Badges */}
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            <LiveActivity />
                        </div>

                        {/* Heading */}
                        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl italic text-white leading-tight mb-6">
                            Your Dream Wedding <br />
                            <span className="text-shimmer-gold">Awaits</span>
                        </h2>

                        {/* Description */}
                        <p className="text-xl md:text-2xl text-white/80 font-light mb-8 max-w-xl">
                            Share your vision and receive a personalized proposal within 48 hours.
                            <span className="text-secondary font-medium"> No obligation.</span>
                        </p>

                        {/* Benefits List with Icons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {[
                                { icon: Calendar, text: "Free consultation call" },
                                { icon: Heart, text: "Curated venue options" },
                                { icon: Shield, text: "Transparent pricing" },
                                { icon: Award, text: "Dedicated planner" },
                            ].map(({ icon: Icon, text }, i) => (
                                <motion.div
                                    key={text}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10"
                                >
                                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-4 h-4 text-secondary" />
                                    </div>
                                    <span className="text-white text-sm font-medium">{text}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Contact Options */}
                        <div className="flex flex-wrap items-center gap-6 mb-10">
                            <a
                                href="tel:+919869829673"
                                className="flex items-center gap-3 text-white hover:text-secondary transition-colors group"
                            >
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/20">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/50 uppercase tracking-wider">Call Us</p>
                                    <p className="font-semibold">+91 98698 29673</p>
                                </div>
                            </a>
                            <a
                                href="https://wa.me/919869829673?text=Hi%2C%20I'm%20interested%20in%20wedding%20planning%20services"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-white hover:text-[#25D366] transition-colors group"
                            >
                                <div className="w-12 h-12 bg-[#25D366]/20 rounded-full flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors border border-[#25D366]/30">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/50 uppercase tracking-wider">WhatsApp</p>
                                    <p className="font-semibold">Quick Response</p>
                                </div>
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="pt-8 border-t border-white/10"
                        >
                            <div className="flex flex-wrap items-center gap-8">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                                        ))}
                                    </div>
                                    <span className="text-white/80 text-sm">5.0 (127 Reviews)</span>
                                </div>
                                <div className="text-white/60 text-sm">
                                    <span className="text-white font-semibold">200+</span> weddings planned
                                </div>
                                <div className="text-white/60 text-sm">
                                    <span className="text-white font-semibold">14</span> years experience
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                        className="relative"
                    >
                        {/* Form Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-3xl blur-2xl opacity-50" />

                        <div className="relative">
                            <LeadCaptureForm
                                variant="modal"
                                heading="Get Your Free Quote"
                                subheading="Tell us about your dream wedding"
                                ctaText="Get Free Proposal"
                                source="homepage-cta"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path
                        d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
                        fill="var(--background)"
                    />
                </svg>
            </div>
        </section>
    );
}

// Compact inline CTA for use within sections
export function InlineCTA({
    heading = "Ready to Start Planning?",
    subheading = "Get a free consultation with our expert team",
    variant = "light"
}: {
    heading?: string;
    subheading?: string;
    variant?: "light" | "dark";
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`py-12 px-8 rounded-3xl ${variant === "dark"
                    ? "bg-foreground text-white"
                    : "bg-gradient-to-br from-primary/5 via-white to-secondary/5 border border-primary/10"
                }`}
        >
            <div className="max-w-4xl mx-auto text-center">
                <h3 className={`section-heading text-2xl md:text-3xl mb-3 ${variant === "dark" ? "text-white" : "text-foreground"
                    }`}>
                    {heading}
                </h3>
                <p className={`mb-6 ${variant === "dark" ? "text-white/70" : "text-muted-foreground"
                    }`}>
                    {subheading}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => window.location.href = '/contact'}
                        className="btn-luxury text-white px-8 py-6 rounded-full font-semibold text-lg"
                    >
                        Get Free Quote
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <a href="tel:+919869829673">
                        <Button
                            variant="outline"
                            className={`px-8 py-6 rounded-full font-semibold text-lg ${variant === "dark"
                                    ? "border-white/30 text-white hover:bg-white/10"
                                    : "border-primary/30 text-primary hover:bg-primary/5"
                                }`}
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Call Now
                        </Button>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

// Urgency Strip CTA
export function StripCTA() {
    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-gradient-to-r from-primary via-[#9a1a40] to-primary py-3"
        >
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-white">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Sparkles className="w-5 h-5 text-secondary" />
                    </motion.div>
                    <span className="font-medium">Planning your dream wedding?</span>
                    <span className="text-white/70 hidden sm:inline">Free consultation with expert planner</span>
                </div>
                <div className="flex items-center gap-4">
                    <a
                        href="tel:+919869829673"
                        className="text-white/80 hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                        <Phone className="w-4 h-4" />
                        <span className="hidden sm:inline">+91 98698 29673</span>
                    </a>
                    <Button
                        onClick={() => window.location.href = '/contact'}
                        className="bg-white text-primary hover:bg-white/90 font-semibold rounded-full px-5 py-2 text-sm"
                    >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
