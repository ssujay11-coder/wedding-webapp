"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Phone,
    MessageCircle,
    X,
    Calendar,
    ArrowRight,
    Sparkles,
    Heart,
    Clock,
    Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickCallbackForm } from "@/components/forms/lead-capture-form";

// Pulsing Notification Dot
function PulsingDot() {
    return (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
        </span>
    );
}

export function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasShownPopup, setHasShownPopup] = useState(false);
    const [activeViewers, setActiveViewers] = useState(14);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIsExpanded(false);
            }
        };

        const popupTimer = setTimeout(() => {
            if (!hasShownPopup && window.scrollY > 300) {
                setIsExpanded(true);
                setHasShownPopup(true);
            }
        }, 15000);

        // Simulate active viewers
        const viewerInterval = setInterval(() => {
            setActiveViewers(Math.floor(Math.random() * 8) + 10);
        }, 8000);

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(popupTimer);
            clearInterval(viewerInterval);
        };
    }, [hasShownPopup]);

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Floating Action Buttons - Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-20 right-4 z-50 flex flex-col gap-3 md:hidden"
                    >
                        {/* WhatsApp Button */}
                        <motion.a
                            href="https://wa.me/919869829673?text=Hi%2C%20I'm%20interested%20in%20wedding%20planning%20services"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/40"
                        >
                            <MessageCircle className="w-6 h-6 text-white fill-white" />
                            <PulsingDot />
                        </motion.a>

                        {/* Call Button */}
                        <motion.a
                            href="tel:+919869829673"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-14 h-14 bg-gradient-to-br from-primary to-[#9a1a40] rounded-full flex items-center justify-center shadow-lg shadow-primary/40"
                        >
                            <Phone className="w-6 h-6 text-white" />
                        </motion.a>
                    </motion.div>

                    {/* Desktop Floating Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="hidden md:block fixed bottom-0 left-0 right-0 z-50"
                    >
                        {/* Collapsed Bar */}
                        <AnimatePresence>
                            {!isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-gradient-to-r from-primary via-[#9a1a40] to-primary backdrop-blur-md py-4 px-6 shadow-2xl border-t border-white/10"
                                >
                                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            {/* Live Activity */}
                                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                </span>
                                                <span className="text-white/90 text-xs font-medium">
                                                    {activeViewers} people viewing
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <motion.div
                                                    animate={{ rotate: [0, 10, -10, 0] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    <Sparkles className="w-5 h-5 text-secondary" />
                                                </motion.div>
                                                <p className="text-white font-medium">
                                                    Ready to plan your dream wedding?
                                                </p>
                                                <span className="text-white/70 text-sm hidden lg:inline">
                                                    Get a free consultation today
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {/* Free Consultation Badge */}
                                            <div className="trust-badge text-foreground text-[10px] px-3 py-1 hidden lg:flex items-center gap-1">
                                                <Heart className="w-3 h-3 text-primary" />
                                                Free Expert Consultation
                                            </div>

                                            <a
                                                href="tel:+919869829673"
                                                className="flex items-center gap-2 text-white hover:text-secondary transition-colors group"
                                            >
                                                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                                    <Phone className="w-4 h-4" />
                                                </div>
                                                <span className="hidden lg:inline">+91 98698 29673</span>
                                            </a>

                                            <Button
                                                onClick={() => setIsExpanded(true)}
                                                className="btn-gold text-foreground font-bold px-6 py-2 rounded-full"
                                            >
                                                Get Free Quote
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Expanded Form Panel */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="bg-gradient-to-r from-primary via-[#9a1a40] to-[#7a1535] shadow-2xl overflow-hidden border-t border-white/10"
                                >
                                    <div className="max-w-4xl mx-auto py-8 px-6">
                                        <div className="flex items-start justify-between mb-6">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-2xl font-heading italic text-white">
                                                        Free Consultation with Expert Planner
                                                    </h3>
                                                </div>
                                                <p className="text-white/70 text-sm flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    Our expert will call you within 2 hours
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setIsExpanded(false)}
                                                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <QuickCallbackForm dark className="max-w-xl" />

                                        <div className="flex items-center gap-8 mt-6 text-white/60 text-sm">
                                            <span className="flex items-center gap-2">
                                                <Heart className="w-4 h-4 text-secondary" />
                                                200+ weddings planned
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Star className="w-4 h-4 text-secondary fill-secondary" />
                                                5.0 rating (127 reviews)
                                            </span>
                                            <span>14 years experience</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Exit Intent Popup
export function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 10 && !sessionStorage.getItem("exitPopupShown")) {
                setIsVisible(true);
                sessionStorage.setItem("exitPopupShown", "true");
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);
        return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsVisible(false)}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    onClick={(e) => e.stopPropagation()}
                    className="glass-panel-luxury rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="h-36 bg-gradient-to-br from-primary via-[#9a1a40] to-[#7a1535] relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <Heart className="w-20 h-20 text-white/10" />
                            </motion.div>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <Sparkles className="w-8 h-8 text-secondary mb-2" />
                            <span className="text-sm uppercase tracking-[0.2em] text-white/80">Exclusive Offer</span>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-8">
                        <h3 className="section-heading text-2xl text-foreground text-center mb-2">
                            Wait! Before You Go...
                        </h3>
                        <p className="text-muted-foreground text-center mb-6">
                            Get a <span className="text-primary font-semibold">free consultation with an expert wedding planner</span>
                        </p>

                        <QuickCallbackForm />

                        <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-secondary fill-secondary" />
                                5.0 Rating
                            </span>
                            <span>•</span>
                            <span>200+ Weddings</span>
                            <span>•</span>
                            <span>No Spam</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// Sticky Mobile Bottom Bar
export function StickyMobileBar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-2xl safe-bottom"
                >
                    {/* Top Bar */}
                    <div className="bg-gradient-to-r from-primary to-[#9a1a40] py-1.5 text-center">
                        <span className="text-white text-xs flex items-center justify-center gap-2">
                            <Sparkles className="w-3 h-3 text-secondary" />
                            Free Consultation with Expert Wedding Planner
                        </span>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-border">
                        <a
                            href="tel:+919869829673"
                            className="flex items-center justify-center gap-2 py-4 text-foreground hover:bg-accent transition-colors"
                        >
                            <Phone className="w-5 h-5 text-primary" />
                            <span className="font-semibold">Call Now</span>
                        </a>
                        <a
                            href="https://wa.me/919869829673?text=Hi%2C%20I'm%20interested%20in%20wedding%20planning%20services"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white"
                        >
                            <MessageCircle className="w-5 h-5 fill-white" />
                            <span className="font-semibold">WhatsApp</span>
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
