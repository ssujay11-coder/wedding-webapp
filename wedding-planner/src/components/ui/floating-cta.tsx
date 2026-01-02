"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  X,
  Calendar,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickCallbackForm } from "@/components/forms/lead-capture-form";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    // Show popup after 15 seconds if user hasn't seen it
    const popupTimer = setTimeout(() => {
      if (!hasShownPopup && window.scrollY > 300) {
        setIsExpanded(true);
        setHasShownPopup(true);
      }
    }, 15000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(popupTimer);
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
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:hidden"
          >
            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/919869829673?text=Hi%2C%20I'm%20interested%20in%20wedding%20planning%20services"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30"
            >
              <MessageCircle className="w-6 h-6 text-white fill-white" />
            </motion.a>

            {/* Call Button */}
            <motion.a
              href="tel:+919869829673"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30"
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
                  className="bg-primary/95 backdrop-blur-md py-4 px-6 shadow-2xl"
                >
                  <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Sparkles className="w-5 h-5 text-secondary" />
                      <p className="text-white font-medium">
                        Ready to plan your dream wedding?
                        <span className="text-white/80 ml-2">Get a free consultation today</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <a
                        href="tel:+919869829673"
                        className="flex items-center gap-2 text-white hover:text-secondary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        +91 98698 29673
                      </a>
                      <Button
                        onClick={() => setIsExpanded(true)}
                        className="bg-white text-primary hover:bg-white/90 font-bold px-6 rounded-full"
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
                  className="bg-gradient-to-r from-primary via-primary to-[#a13553] shadow-2xl overflow-hidden"
                >
                  <div className="max-w-4xl mx-auto py-6 px-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-display italic text-white">
                          Get Your Free Wedding Consultation
                        </h3>
                        <p className="text-white/80 text-sm">
                          Share your details and our expert will call you within 2 hours
                        </p>
                      </div>
                      <button
                        onClick={() => setIsExpanded(false)}
                        className="text-white/60 hover:text-white transition-colors p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <QuickCallbackForm dark className="max-w-xl" />

                    <div className="flex items-center gap-6 mt-4 text-white/60 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        200+ weddings planned
                      </span>
                      <span>14 years experience</span>
                      <span>Award-winning team</span>
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
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
        >
          {/* Header Image */}
          <div className="h-32 bg-gradient-to-br from-primary to-[#a13553] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-white/20" />
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8">
            <h3 className="text-2xl font-display italic text-foreground text-center mb-2">
              Wait! Before You Go...
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Get a free wedding planning consultation worth ₹5,000
            </p>

            <QuickCallbackForm />

            <p className="text-xs text-muted-foreground text-center mt-4">
              No spam, ever. We respect your privacy.
            </p>
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
          <div className="grid grid-cols-2 divide-x divide-border">
            <a
              href="tel:+919869829673"
              className="flex items-center justify-center gap-2 py-4 text-foreground hover:bg-accent transition-colors"
            >
              <Phone className="w-5 h-5 text-primary" />
              <span className="font-medium">Call Now</span>
            </a>
            <a
              href="https://wa.me/919869829673"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span className="font-medium">WhatsApp</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
