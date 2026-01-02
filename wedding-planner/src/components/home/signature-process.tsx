"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Calendar, CheckCircle, FileText, Palette, ClipboardList, Users } from "lucide-react";
import Image from "next/image";

export function SignatureProcess() {
  const steps = [
    {
      icon: Sparkles,
      number: "01",
      title: "Discovery",
      duration: "Week 1-2",
      description: "Personal consultation to understand your vision, budget, guest count, cultural requirements, and non-negotiables for your perfect celebration.",
      deliverables: ["Vision Board", "Budget Framework", "Destination Shortlist", "Initial Timeline"]
    },
    {
      icon: Palette,
      number: "02",
      title: "Design",
      duration: "Week 3-8",
      description: "Our creative team develops your unique wedding concept with mood boards, venue tours, 3D renders, and curated vendor presentations.",
      deliverables: ["Design Deck", "3D Venue Renders", "Color Palette", "Vendor Recommendations"]
    },
    {
      icon: ClipboardList,
      number: "03",
      title: "Planning",
      duration: "Month 2-10",
      description: "Meticulous coordination of 1,000+ details—vendor contracts, timeline creation, guest management, travel logistics, and contingency planning.",
      deliverables: ["Master Timeline", "Vendor Contracts", "Guest Portal", "Floor Plans"]
    },
    {
      icon: CheckCircle,
      number: "04",
      title: "Execution",
      duration: "Final 2 Weeks",
      description: "50+ crew members on-site for flawless delivery. Real-time coordination, rehearsals, emergency handling—so you can be fully present.",
      deliverables: ["On-Site Team", "Run Sheets", "Backup Plans", "24/7 Support"]
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-accent overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase">
              Our Approach
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic mb-4 md:mb-6 mt-3 md:mt-4 text-foreground leading-tight">
              Your Wedding Journey: From &ldquo;Yes&rdquo; to &ldquo;I Do&rdquo;
            </h2>
            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-4 md:mb-6">
              Our 4-phase methodology transforms wedding planning from overwhelming to exciting.
              Perfected over <span className="font-medium text-foreground">200+ weddings</span>, this process ensures
              no detail is overlooked while keeping the journey joyful and collaborative.
            </p>

            {/* Timeline Badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full border border-primary/10 shadow-sm">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Average Timeline</p>
                <p className="text-xs text-muted-foreground">6-12 Months (Flexible based on your date)</p>
              </div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2"
          >
            <Image
              src="/images/heroes/home-hero.webp"
              alt="Elite Wedding Planning Process - From consultation to celebration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />

            {/* Floating Stats */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-2">
              <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg text-center flex-1">
                <p className="text-lg md:text-xl font-display font-bold text-primary">200+</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Weddings</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg text-center flex-1">
                <p className="text-lg md:text-xl font-display font-bold text-primary">100%</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">On-Time</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg text-center flex-1">
                <p className="text-lg md:text-xl font-display font-bold text-primary">5.0</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Steps Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group bg-white/60 backdrop-blur-sm p-5 md:p-6 rounded-2xl border border-white/80 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              {/* Step Header */}
              <div className="flex items-start gap-3 mb-3 md:mb-4">
                <div className="relative">
                  <span className="absolute -top-2 -left-2 text-4xl md:text-5xl font-display font-bold text-primary/10">
                    {step.number}
                  </span>
                  <div className="relative z-10 h-11 w-11 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="text-xs text-primary font-medium">{step.duration}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-3 md:mb-4">
                {step.description}
              </p>

              {/* Deliverables */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Deliverables:</p>
                <div className="flex flex-wrap gap-1.5">
                  {step.deliverables.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 text-[10px] md:text-xs bg-primary/5 text-primary px-2 py-1 rounded-full"
                    >
                      <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connector Line - Desktop Only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary/30 to-transparent z-20" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-10 md:mt-14"
        >
          <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">
            Ready to start your wedding journey? Our process has delivered <span className="font-medium text-foreground">200+ flawless celebrations</span>.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            <span>Begin Your Journey</span>
            <Heart className="w-4 h-4 fill-white" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
