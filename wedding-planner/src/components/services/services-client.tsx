"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Sparkles,
  Star,
  CheckCircle,
  Phone,
  Calendar,
  Award,
  CalendarHeart,
  Users,
  Plane,
  Music,
  Flower2,
  UtensilsCrossed,
  Truck,
  Tv,
  UserCheck,
  Crown,
  Gem,
  LucideIcon,
  Clock,
  Shield,
  BadgePercent,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { FloralDecoration } from "@/components/decorative/floral-elements";
import { services, serviceCategories, ServiceIconName } from "@/data/services";

// Icon mapping for resolving icon names to components
const iconMap: Record<ServiceIconName, LucideIcon> = {
  CalendarHeart,
  Users,
  Plane,
  Music,
  Flower2,
  UtensilsCrossed,
  Truck,
  Tv,
  UserCheck,
  Sparkles,
  Heart,
  Crown,
  Gem,
  Star,
};

export function ServicesClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Enhanced process steps with deliverables and timeline
  const processSteps = [
    {
      step: "01",
      title: "Dream",
      subtitle: "Week 1-2",
      description: "Share your vision. We listen—not just to your Pinterest boards, but to your love story, cultural requirements, family dynamics, and the emotions you want to create.",
      deliverables: ["Vision Board", "Budget Framework", "Destination Shortlist"],
      icon: Heart
    },
    {
      step: "02",
      title: "Design",
      subtitle: "Week 3-8",
      description: "We architect your celebration. Every vendor, every moment, every backup plan. You see 3D visualizations, mood boards, and venue renders before a single flower is ordered.",
      deliverables: ["3D Renders", "Vendor Proposals", "Design Deck"],
      icon: Sparkles
    },
    {
      step: "03",
      title: "Deliver",
      subtitle: "D-Day & Beyond",
      description: "We execute with military precision—50+ crew members on-site. You walk into your wedding as a guest, not a project manager. Every detail perfected. Every moment magical.",
      deliverables: ["50+ Crew On-Site", "24/7 Support", "Backup Plans"],
      icon: Star
    }
  ];

  // Enhanced stats with context - GEO optimized with quotable data
  const stats = [
    { value: "200+", label: "Weddings Delivered", subLabel: "Since 2011" },
    { value: "14", label: "Years of Excellence", subLabel: "Award-Winning" },
    { value: "40+", label: "Destinations", subLabel: "India • Dubai • Thailand" },
    { value: "₹200Cr+", label: "Budgets Managed", subLabel: "₹50L to ₹15Cr+" }
  ];

  // Enhanced reasons with specific data points
  const reasons = [
    {
      title: "We're Not Just Planners — We're Partners",
      description: "A dedicated 12-member team becomes your confidants, advisors, and calm in every storm. When family opinions clash or vendors disappoint, we're your shield.",
      stat: "12+",
      statLabel: "Team Members Per Wedding",
      icon: Users
    },
    {
      title: "14 Years of 'We've Seen It All'",
      description: "Rain at an outdoor mandap? Generator failure at midnight? Missing makeup artist? We've handled it all with 100% on-time delivery across 200+ weddings.",
      stat: "100%",
      statLabel: "On-Time Delivery Rate",
      icon: Clock
    },
    {
      title: "Access to the Best of the Best",
      description: "Our 500+ vendor relationships are 14 years deep. We get the priority slots, negotiated rates (15-25% savings), and exceptional service that others can't access.",
      stat: "500+",
      statLabel: "Elite Vendor Partners",
      icon: Shield
    },
    {
      title: "Your Budget is Sacred",
      description: "We've saved couples an average of 15-20% while upgrading their experience. We know where to invest for maximum impact and where we can achieve magic for less.",
      stat: "15-20%",
      statLabel: "Average Savings",
      icon: BadgePercent
    }
  ];

  // FAQ for featured snippets - GEO optimized
  const serviceFaqs = [
    {
      question: "What wedding planning services does Elite offer?",
      answer: "Elite offers 10+ comprehensive wedding services: Complete Wedding Planning, Guest List & RSVP Management, Hospitality & Travel Logistics, Entertainment & Artist Management, Decor Design & Coordination, Food & Beverage Curation, Logistics & Operations, Technical Production, and Crew Support. All services are available individually or as complete packages."
    },
    {
      question: "How much do wedding planning services cost in India?",
      answer: "Wedding planning fees vary by scope. Elite's packages start at ₹15 Lakh for intimate celebrations (50-100 guests) and scale for grand weddings. We've managed budgets from ₹50 Lakh to ₹15 Crore+. Schedule a free consultation for a customized quote based on your specific requirements."
    },
    {
      question: "Do you offer destination wedding planning?",
      answer: "Yes, we specialize in destination weddings across 40+ locations including Udaipur, Jaipur, Goa, Kerala, Jaisalmer in India, plus international venues in Dubai, Abu Dhabi, Phuket, and Koh Samui. We handle all logistics, travel, accommodation, and local vendor coordination."
    },
    {
      question: "What is included in full-service wedding planning?",
      answer: "Full-service planning includes: venue selection, complete design & decor, vendor management (50+ vendors), budget tracking, guest management, travel logistics, entertainment booking, catering coordination, day-of execution with 50+ crew, and post-wedding services. You get a dedicated team from first consultation to farewell brunch."
    }
  ];

  return (
    <div ref={containerRef}>
      {/* Hero Section - Mobile Optimized with SEO H1 */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background Elements */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-b from-[var(--pastel-blush)] via-white to-[var(--pastel-cream)]"
        />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none hidden md:block">
          <FloralDecoration variant="pattern" className="w-full h-full" />
        </div>
        <div className="absolute top-20 left-0 opacity-20 pointer-events-none hidden md:block">
          <FloralDecoration variant="branch" className="w-64 h-32" color="primary" />
        </div>
        <div className="absolute top-32 right-0 opacity-15 pointer-events-none transform scale-x-[-1] hidden md:block">
          <FloralDecoration variant="branch" className="w-56 h-28" color="gold" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Trust Badges */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                10+ Services
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 rounded-full text-secondary-foreground text-xs md:text-sm font-semibold tracking-widest uppercase">
                <Award className="w-3.5 h-3.5" />
                Award-Winning
              </span>
            </motion.div>

            {/* H1 - Primary Keyword: "Wedding Planning Services" */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic text-foreground mb-4 md:mb-6 leading-tight">
              Complete <span className="text-primary">Wedding Planning Services</span>
              <br className="hidden sm:block" />
              <span className="text-shimmer-gold">Crafted for Perfection</span>
            </h1>

            {/* SEO-rich description with data points */}
            <p className="max-w-4xl mx-auto text-muted-foreground text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed mb-6 md:mb-10">
              From <strong className="text-foreground">complete wedding management</strong> to specialized services—
              we offer <strong className="text-foreground">10+ luxury wedding services</strong> across
              <strong className="text-foreground"> 40+ destinations</strong> in India, Dubai & Thailand.
              <span className="block mt-2 text-sm md:text-base">Your wedding should be the beginning of forever—not the end of your sanity.</span>
            </p>

            {/* CTAs - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link href="/contact">
                <Button className="w-full sm:w-auto btn-luxury bg-primary hover:bg-primary/90 text-white rounded-full px-6 md:px-10 py-5 md:py-6 text-base md:text-lg shadow-xl shadow-primary/20">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
              <Link href="#services">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-6 md:px-10 py-5 md:py-6 text-base md:text-lg border-2 border-primary/30 text-primary hover:bg-primary/5"
                >
                  Explore 10+ Services
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats - Enhanced with Sub-labels, Mobile Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4 md:p-0 bg-white/50 md:bg-transparent rounded-xl md:rounded-none backdrop-blur-sm md:backdrop-blur-none">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-primary mb-1 md:mb-2">
                  {stat.value}
                </div>
                <div className="text-foreground font-semibold text-sm md:text-base">{stat.label}</div>
                <div className="text-muted-foreground text-xs md:text-sm">{stat.subLabel}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Emotional Hook Section */}
      <section className="py-24 bg-gradient-to-br from-[#221015] via-[#2d1a20] to-[#221015] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <FloralDecoration variant="pattern" className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-6xl italic text-white mb-8 leading-tight">
              "The best wedding planners are the ones you don't notice —
              <span className="text-secondary"> because everything is simply perfect."</span>
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              That's our philosophy. We orchestrate 47 vendors, 300 guests, and 1,000 details
              so seamlessly that you only experience magic — never logistics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">
              Our Expertise
            </span>
            <h2 className="font-display text-4xl md:text-6xl italic text-foreground mb-6">
              Every Detail, Perfected
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From the first vision board to the final farewell, we manage every aspect of your celebration.
              Click any service to discover the depth of our expertise.
            </p>
          </motion.div>

          {/* Service Categories */}
          {serviceCategories.map((category) => (
            <div key={category.title} className="mb-16">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-display italic text-primary mb-8 flex items-center gap-3"
              >
                <div className="w-12 h-[2px] bg-primary/50" />
                {category.title}
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((serviceSlug, index) => {
                  const service = services.find(s => s.slug === serviceSlug);
                  if (!service) return null;

                  const ServiceIcon = iconMap[service.iconName] || CalendarHeart;

                  return (
                    <motion.div
                      key={service.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/services/${service.slug}`}>
                        <div className="group card-luxury bg-white p-8 rounded-3xl h-full transition-all duration-500 hover:-translate-y-2">
                          {/* Icon */}
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                            <ServiceIcon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                          </div>

                          {/* Content */}
                          <h4 className="text-2xl font-display italic mb-3 text-foreground group-hover:text-primary transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {service.tagline}
                          </p>

                          {/* Features Preview */}
                          <div className="space-y-2 mb-6">
                            {service.features.slice(0, 3).map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                <span>{feature.title}</span>
                              </div>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                            <span>Explore Details</span>
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section - Enhanced with Deliverables */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--pastel-cream)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-3 md:mb-4 block">
              Our Approach
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl italic text-foreground mb-4 md:mb-6">
              Dream → Design → Deliver
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Our proven 3-phase methodology has delivered <strong className="text-foreground">200+ flawless weddings</strong>. Here&apos;s how we turn your vision into reality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative bg-white p-5 md:p-6 lg:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
                >
                  {/* Connecting Line - Desktop Only */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-14 left-[85%] w-[30%] h-[2px] bg-gradient-to-r from-primary/30 to-transparent z-10" />
                  )}

                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <StepIcon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                    </div>
                    <div>
                      <span className="text-3xl md:text-4xl font-display text-primary/30">{step.step}</span>
                      <h3 className="text-xl md:text-2xl font-display italic text-foreground -mt-1">
                        {step.title}
                      </h3>
                      <p className="text-xs md:text-sm text-primary font-medium">{step.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="pt-4 border-t border-primary/10">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">What You Get:</p>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 text-xs bg-primary/5 text-primary px-2 py-1 rounded-full"
                        >
                          <CheckCircle className="w-3 h-3" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Enhanced with Stats */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-3 md:mb-4 block">
                Why Elite?
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic text-foreground mb-6 md:mb-8 leading-tight">
                Because Your Wedding Deserves More Than &apos;Good Enough&apos;
              </h2>

              <div className="space-y-4 md:space-y-6">
                {reasons.map((reason, index) => {
                  const ReasonIcon = reason.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-3 md:gap-4 p-4 bg-accent/50 rounded-xl hover:bg-accent transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <ReasonIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
                          <h4 className="text-base md:text-lg font-bold text-foreground">
                            {reason.title}
                          </h4>
                          <div className="flex items-center gap-1 text-primary">
                            <span className="text-lg md:text-xl font-display font-bold">{reason.stat}</span>
                            <span className="text-[10px] md:text-xs text-muted-foreground uppercase">{reason.statLabel}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp"
                  alt="Elite Wedding Planning Team"
                  width={600}
                  height={700}
                  className="object-cover w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Overlay Content */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <Award className="w-10 h-10 text-primary" />
                      <div>
                        <div className="font-bold text-lg">Award Winning Team</div>
                        <div className="text-sm text-muted-foreground">Recognized by WeddingSutra & more</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 opacity-20 pointer-events-none">
                <FloralDecoration variant="rose" className="w-full h-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-gradient-to-br from-[var(--pastel-rose)]/30 to-[var(--pastel-lavender)]/30">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FloralDecoration variant="divider" className="w-48 mx-auto mb-8 opacity-50" />

            <blockquote className="text-3xl md:text-4xl font-display italic text-foreground leading-relaxed mb-8">
              "We thought we'd have to choose between a destination wedding and keeping our sanity.
              Elite gave us both. Every detail, from my grandmother's special dietary needs
              to the surprise fireworks, was handled with such care that we could actually
              BE at our wedding instead of running it."
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">Priya & Arjun</div>
                <div className="text-muted-foreground">Udaipur Palace Wedding</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - GEO Optimized for Featured Snippets */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-3 block">
              Common Questions
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-4 text-sm md:text-base max-w-2xl mx-auto">
              Everything you need to know about our wedding planning services.
            </p>
          </motion.div>

          <div className="space-y-4 md:space-y-6">
            {serviceFaqs.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-accent/50 p-5 md:p-6 rounded-2xl hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold text-foreground text-base md:text-lg mb-2 md:mb-3 flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">Q:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed pl-5 md:pl-6">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#221015] via-[#2d1a20] to-[#221015] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 hidden md:block">
          <FloralDecoration variant="pattern" className="w-full h-full" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-secondary mx-auto mb-4 md:mb-6" />
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl italic text-white mb-4 md:mb-6">
              Ready to Start Planning?
            </h2>
            <p className="text-white/80 text-base md:text-xl mb-6 md:mb-10 max-w-2xl mx-auto">
              Let&apos;s talk about your vision, your budget, and how we can create
              the wedding you&apos;ve always imagined. <strong>The first consultation is free.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link href="/contact">
                <Button className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 rounded-full px-6 md:px-10 py-5 md:py-6 text-base md:text-lg shadow-xl btn-luxury">
                  <Calendar className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="tel:+919876543210">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-6 md:px-10 py-5 md:py-6 text-base md:text-lg"
                >
                  <Phone className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                  Call: +91 98765 43210
                </Button>
              </Link>
            </div>

            <p className="text-white/60 text-xs md:text-sm mt-4 md:mt-6">
              No pressure. No commitment. Just a conversation about your dreams.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
