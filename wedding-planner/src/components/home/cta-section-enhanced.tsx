"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Heart, Phone, Star, Check, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { useState } from "react";

export function CTASectionEnhanced() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#a13553] to-primary" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-white/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] border border-white/5 rounded-full"
        />
        <div className="absolute top-20 left-20 w-2 h-2 bg-secondary rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-32 w-3 h-3 bg-secondary/50 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative */}
            <div className="flex items-center gap-4 mb-6">
              <Heart className="w-8 h-8 text-secondary animate-pulse" />
              <div className="h-px w-16 bg-white/30" />
              <Sparkles className="w-8 h-8 text-secondary animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>

            {/* Heading */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic font-medium text-white leading-tight mb-6">
              Your Dream Wedding <br />
              <span className="text-secondary">Awaits</span>
            </h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/80 font-light mb-8 max-w-xl">
              Ready to start planning? Share your vision and receive a personalized proposal within 48 hours.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {[
                "Free consultation with senior wedding planner",
                "Custom venue recommendations",
                "Detailed budget breakdown",
                "No obligation quote",
              ].map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-white">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact Options */}
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="tel:+919869829673"
                className="flex items-center gap-2 text-white hover:text-secondary transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-medium">+91 98698 29673</span>
              </a>
              <a
                href="https://wa.me/919869829673?text=Hi%2C%20I'm%20interested%20in%20wedding%20planning%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-secondary transition-colors group"
              >
                <div className="w-10 h-10 bg-[#25D366]/20 rounded-full flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="font-medium">WhatsApp</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-8"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                  ))}
                </div>
                <span className="text-white/80 text-sm">5.0 Rating</span>
              </div>
              <div className="text-white/60 text-sm">
                <span className="text-white font-semibold">200+</span> weddings planned
              </div>
              <div className="text-white/60 text-sm">
                <span className="text-white font-semibold">14</span> years experience
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LeadCaptureForm
              variant="modal"
              heading="Get Your Free Quote"
              subheading="Tell us about your dream wedding"
              ctaText="Get Free Proposal"
              source="homepage-cta"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" style={{
        clipPath: "polygon(0 50%, 100% 0%, 100% 100%, 0% 100%)"
      }} />
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
    <div className={`py-12 px-8 rounded-3xl ${
      variant === "dark"
        ? "bg-foreground text-white"
        : "bg-gradient-to-br from-primary/5 via-white to-secondary/5 border border-primary/10"
    }`}>
      <div className="max-w-4xl mx-auto text-center">
        <h3 className={`text-2xl md:text-3xl font-display italic mb-3 ${
          variant === "dark" ? "text-white" : "text-foreground"
        }`}>
          {heading}
        </h3>
        <p className={`mb-6 ${
          variant === "dark" ? "text-white/70" : "text-muted-foreground"
        }`}>
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.location.href = '/contact'}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full font-bold text-lg"
          >
            Get Free Quote
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <a href="tel:+919869829673">
            <Button
              variant="outline"
              className={`px-8 py-6 rounded-full font-semibold text-lg ${
                variant === "dark"
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
    </div>
  );
}

// Minimal strip CTA
export function StripCTA() {
  return (
    <div className="bg-primary py-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-white">
          <Sparkles className="w-5 h-5 text-secondary" />
          <span className="font-medium">Planning a 2026 wedding?</span>
          <span className="text-white/70">Get early-bird venue access</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:+919869829673"
            className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            +91 98698 29673
          </a>
          <Button
            onClick={() => window.location.href = '/contact'}
            className="bg-white text-primary hover:bg-white/90 font-semibold rounded-full"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
