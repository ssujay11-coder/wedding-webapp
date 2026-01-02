"use client";

import { motion } from "framer-motion";
import { Award, Users, Globe, Shield, Sparkles, TrendingUp, Clock, Heart, CheckCircle } from "lucide-react";

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Award,
      title: "Award-Winning Excellence",
      description: "Recognized as India's top luxury wedding planners by Vogue India, WeddingSutra, and ShaadiSaga for creating magazine-worthy celebrations.",
      stat: "15+ Awards",
      statLabel: "Industry Recognition"
    },
    {
      icon: Clock,
      title: "14 Years of Mastery",
      description: "Since 2011, we've perfected the art of flawless execution. Our experience means anticipating challenges before they arise.",
      stat: "100%",
      statLabel: "On-Time Delivery"
    },
    {
      icon: Globe,
      title: "Multi-Destination Expertise",
      description: "Seamless coordination across Udaipur, Jaipur, Goa, Kerala, Jaisalmer, Mumbai + international venues in Dubai, Abu Dhabi & Thailand.",
      stat: "40+",
      statLabel: "Premium Destinations"
    },
    {
      icon: Heart,
      title: "₹200 Crore+ Managed",
      description: "Trusted by HNI families and corporate leaders. We've successfully managed budgets from ₹50 Lakh intimate celebrations to ₹15 Crore+ royal weddings.",
      stat: "₹75L",
      statLabel: "Average Budget"
    },
    {
      icon: Shield,
      title: "500+ Vendor Network",
      description: "Exclusive partnerships with India's finest photographers, caterers, decorators, and entertainment artists. Pre-negotiated rates save you 15-25%.",
      stat: "500+",
      statLabel: "Elite Vendors"
    },
    {
      icon: TrendingUp,
      title: "24/7 Dedicated Support",
      description: "Your personal wedding manager is available round-the-clock. From midnight vendor emergencies to last-minute changes—we're always there.",
      stat: "<2 Hrs",
      statLabel: "Avg Response Time"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase">
            Why Elite?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic mt-3 md:mt-4 text-foreground">
            Why 200+ Couples Chose Us for Their Most Important Day
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            We don&apos;t just plan weddings—we craft <span className="font-medium text-foreground">legacy moments</span> that
            exceed expectations and create memories spanning generations.
          </p>
        </motion.div>

        {/* Reasons Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col items-start p-5 sm:p-6 md:p-8 bg-accent rounded-2xl border border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300"
            >
              {/* Top Row: Icon & Stat */}
              <div className="flex items-start justify-between w-full mb-4 md:mb-6">
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  <reason.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                {/* Stat Badge */}
                <div className="text-right">
                  <p className="text-xl md:text-2xl font-display font-bold text-primary">{reason.stat}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{reason.statLabel}</p>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-foreground">{reason.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                {reason.description}
              </p>

              {/* Number Watermark */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-5xl md:text-6xl font-display font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                {String(index + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 md:mt-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-foreground">Free Consultation</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-foreground">No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-foreground">Transparent Pricing</span>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              <span>Schedule Free Consultation</span>
              <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
