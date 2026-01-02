"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-32 bg-primary overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full animate-float" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-white rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-white rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Icon */}
          <div className="flex items-center justify-center gap-4">
            <Heart className="w-12 h-12 text-white animate-bounce-gentle" />
            <div className="h-px w-16 bg-white/30" />
            <Calendar className="w-12 h-12 text-white animate-bounce-gentle" style={{ animationDelay: "0.5s" }} />
          </div>

          {/* Heading */}
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl italic font-medium text-white leading-tight">
            Your Dream Wedding <br />
            Awaits
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
            Ready to start planning? Let's discuss your vision and create something timeless together.
            Your perfect day is just a conversation away.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Link href="/contact">
              <Button className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-7 rounded-full shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 font-bold">
                Plan My Wedding
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-10 py-7 rounded-full transition-all duration-300 font-semibold"
              >
                View Portfolio
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-12 flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>200+ Weddings Planned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>14 Years Excellence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Award-Winning Team</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{
        clipPath: "polygon(0 60%, 100% 0%, 100% 100%, 0% 100%)"
      }} />
    </section>
  );
}
