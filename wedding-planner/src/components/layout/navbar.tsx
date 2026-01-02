"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Instagram, Facebook, Phone, Mail, ArrowRight, MapPin, Heart, Plane, Flower2, Music, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "./logo";
import { MegaMenu } from "./mega-menu";
import { FloralDecoration } from "../decorative/floral-elements";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<"destinations" | "services" | "venues" | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mega menu when scrolling
    useEffect(() => {
        if (scrolled) {
            setActiveMenu(null);
        }
    }, [scrolled]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    const mobileDestinations = [
        { name: "Udaipur", slug: "udaipur", icon: "crown" },
        { name: "Goa", slug: "goa", icon: "beach" },
        { name: "Jaipur", slug: "jaipur", icon: "palace" },
        { name: "Kerala", slug: "kerala", icon: "palm" },
        { name: "Dubai", slug: "dubai", icon: "star" },
        { name: "Explore Venues", slug: "venues", icon: "building" },
    ];

    const mobileServices = [
        { name: "Complete Planning", href: "/services/complete-wedding-planning", icon: Heart },
        { name: "Hospitality & Logistics", href: "/services/hospitality-logistics", icon: Plane },
        { name: "Decor Coordination", href: "/services/decor-coordination", icon: Flower2 },
        { name: "Entertainment", href: "/services/entertainment-management", icon: Music },
    ];

    return (
        <>
            {/* Top Bar - Hidden on scroll */}
            <AnimatePresence>
                {!scrolled && (
                    <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#221015] via-[#2d1a20] to-[#221015] text-white/90"
                    >
                        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-6">
                                <a href="tel:+919869829673" className="flex items-center gap-2 hover:text-secondary transition-colors">
                                    <Phone className="w-3 h-3" />
                                    <span>+91 9869829673</span>
                                </a>
                                <a href="mailto:hello@eliteweddingplanner.in" className="flex items-center gap-2 hover:text-secondary transition-colors">
                                    <Mail className="w-3 h-3" />
                                    <span>hello@eliteweddingplanner.in</span>
                                </a>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-white/60">Follow us:</span>
                                <a href="https://instagram.com/eliteweddingplanner" target="_blank" rel="noopener" className="hover:text-secondary transition-colors">
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a href="https://facebook.com/eliteweddingplanner" target="_blank" rel="noopener" className="hover:text-secondary transition-colors">
                                    <Facebook className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? "top-0 bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 py-3"
                        : "top-8 md:top-10 bg-white/10 backdrop-blur-sm py-4"
                }`}
            >
                {/* Decorative top border when scrolled */}
                {scrolled && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                )}

                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        className="relative z-50"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        onMouseEnter={() => setActiveMenu(null)}
                    >
                        <Logo variant={scrolled ? "default" : "light"} size="md" />
                    </motion.div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {/* Destinations Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveMenu("destinations")}
                        >
                            <button
                                className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5 rounded-full ${
                                    scrolled
                                        ? "text-foreground hover:text-primary hover:bg-primary/5"
                                        : "text-white hover:text-secondary"
                                } ${activeMenu === "destinations" ? (scrolled ? "text-primary bg-primary/5" : "text-secondary") : ""}`}
                            >
                                Destinations
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === "destinations" ? "rotate-180" : ""}`} />
                            </button>
                            {/* Invisible bridge to mega menu */}
                            {activeMenu === "destinations" && (
                                <div className="absolute left-0 right-0 h-8 top-full" />
                            )}
                        </div>

                        {/* Services Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveMenu("services")}
                        >
                            <button
                                className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5 rounded-full ${
                                    scrolled
                                        ? "text-foreground hover:text-primary hover:bg-primary/5"
                                        : "text-white hover:text-secondary"
                                } ${activeMenu === "services" ? (scrolled ? "text-primary bg-primary/5" : "text-secondary") : ""}`}
                            >
                                Services
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === "services" ? "rotate-180" : ""}`} />
                            </button>
                            {/* Invisible bridge to mega menu */}
                            {activeMenu === "services" && (
                                <div className="absolute left-0 right-0 h-8 top-full" />
                            )}
                        </div>

                        {/* Venues Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveMenu("venues")}
                        >
                            <button
                                className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5 rounded-full ${
                                    scrolled
                                        ? "text-foreground hover:text-primary hover:bg-primary/5"
                                        : "text-white hover:text-secondary"
                                } ${activeMenu === "venues" ? (scrolled ? "text-primary bg-primary/5" : "text-secondary") : ""}`}
                            >
                                Venues
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === "venues" ? "rotate-180" : ""}`} />
                            </button>
                            {/* Invisible bridge to mega menu */}
                            {activeMenu === "venues" && (
                                <div className="absolute left-0 right-0 h-8 top-full" />
                            )}
                        </div>

                        {/* Regular Nav Links */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => setActiveMenu(null)}
                                className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full relative group ${
                                    scrolled
                                        ? "text-foreground hover:text-primary hover:bg-primary/5"
                                        : "text-white hover:text-secondary"
                                }`}
                            >
                                {link.name}
                                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-1/2 rounded-full ${
                                    scrolled ? "bg-primary" : "bg-secondary"
                                }`} />
                            </Link>
                        ))}
                    </div>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-3" onMouseEnter={() => setActiveMenu(null)}>
                        <Link href="/contact" className="hidden lg:block">
                            <Button
                                className={`rounded-full px-6 py-2.5 font-semibold transition-all duration-300 btn-luxury ${
                                    scrolled
                                        ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                                        : "bg-white text-primary hover:bg-white/90 shadow-lg shadow-white/20"
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    Plan My Wedding
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </Button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className={`lg:hidden relative z-50 w-12 h-12 flex items-center justify-center rounded-full transition-all ${
                                mobileMenuOpen
                                    ? "bg-primary text-white"
                                    : scrolled
                                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                                        : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mega Menu */}
            <div
                onMouseEnter={() => activeMenu && setActiveMenu(activeMenu)}
                onMouseLeave={() => setActiveMenu(null)}
            >
                <MegaMenu
                    type={activeMenu || "destinations"}
                    isOpen={activeMenu !== null}
                    onClose={() => setActiveMenu(null)}
                />
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="absolute right-0 top-0 bottom-0 w-[85%] max-w-md bg-gradient-to-b from-white via-[var(--pastel-blush)] to-[var(--pastel-peach)] overflow-y-auto"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-20 right-0 opacity-20 pointer-events-none">
                                <FloralDecoration variant="corner" className="w-40 h-40" />
                            </div>
                            <div className="absolute bottom-20 left-0 opacity-15 pointer-events-none rotate-180">
                                <FloralDecoration variant="corner" className="w-32 h-32" />
                            </div>

                            <div className="pt-24 pb-8 px-6 relative">
                                {/* Main Navigation */}
                                <div className="space-y-1 mb-8">
                                    {navLinks.map((link, i) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block py-4 px-4 text-xl font-display text-foreground hover:text-primary hover:bg-white/50 rounded-xl transition-all"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8" />

                                {/* Destinations */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-8"
                                >
                                    <h3 className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4 px-4">
                                        Popular Destinations
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {mobileDestinations.map((dest) => (
                                            <Link
                                                key={dest.slug}
                                                href={`/destinations/${dest.slug}`}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center gap-3 p-3 bg-white/60 rounded-xl hover:bg-white transition-all group"
                                            >
                                                <MapPin className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                                    {dest.name}
                                                </span>
                                            </Link>
                                        ))}
                                        <Link
                                            href="/destinations"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center gap-3 p-3 bg-primary/10 rounded-xl hover:bg-primary/20 transition-all col-span-2"
                                        >
                                            <ArrowRight className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-semibold text-primary">
                                                View All Destinations
                                            </span>
                                        </Link>
                                    </div>
                                </motion.div>

                                {/* Services */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mb-8"
                                >
                                    <h3 className="text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-4 px-4">
                                        Our Services
                                    </h3>
                                    <div className="space-y-2">
                                        {mobileServices.map((service) => (
                                            <Link
                                                key={service.href}
                                                href={service.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center gap-3 p-3 bg-white/60 rounded-xl hover:bg-white transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <service.icon className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                                    {service.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Link
                                        href="/contact"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full py-4 px-6 bg-primary text-white text-center font-semibold rounded-xl btn-luxury"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            Plan My Wedding
                                            <ArrowRight className="w-5 h-5" />
                                        </span>
                                    </Link>
                                </motion.div>

                                {/* Contact Info */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-8 pt-8 border-t border-primary/10"
                                >
                                    <div className="flex items-center justify-center gap-6">
                                        <a href="tel:+919869829673" className="text-primary hover:text-primary/80 transition-colors">
                                            <Phone className="w-5 h-5" />
                                        </a>
                                        <a href="mailto:hello@eliteweddingplanner.in" className="text-primary hover:text-primary/80 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </a>
                                        <a href="https://instagram.com/eliteweddingplanner" target="_blank" rel="noopener" className="text-primary hover:text-primary/80 transition-colors">
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                        <a href="https://facebook.com/eliteweddingplanner" target="_blank" rel="noopener" className="text-primary hover:text-primary/80 transition-colors">
                                            <Facebook className="w-5 h-5" />
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
