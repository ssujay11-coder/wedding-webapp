"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Sparkles,
  Star,
  CheckCircle,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  Quote,
  MessageCircle,
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
  LucideIcon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { FloralDecoration } from "@/components/decorative/floral-elements";
import { ServiceDetail, ServiceIconName } from "@/data/services";

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

interface ServiceDetailContentProps {
  service: ServiceDetail;
  relatedServices: ServiceDetail[];
}

export function ServiceDetailContent({ service, relatedServices }: ServiceDetailContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const ServiceIcon = iconMap[service.iconName] || CalendarHeart;

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-0 opacity-10 pointer-events-none">
          <FloralDecoration variant="branch" className="w-64 h-32" color="gold" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ opacity }}
            className="max-w-3xl"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/70 mb-6">
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-white">{service.title}</span>
            </div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6"
            >
              <ServiceIcon className="w-10 h-10 text-white" />
            </motion.div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-7xl italic text-white mb-6 leading-tight">
              {service.title}
            </h1>

            {/* Tagline */}
            <p className="text-2xl md:text-3xl text-secondary font-display italic mb-6">
              {service.tagline}
            </p>

            {/* Description */}
            <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
              {service.emotionalHook}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button className="btn-luxury bg-white text-primary hover:bg-white/90 rounded-full px-10 py-6 text-lg">
                  <Calendar className="mr-2 w-5 h-5" />
                  {service.cta.primary}
                </Button>
              </Link>
              <Link href="https://wa.me/919876543210">
                <Button
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-6 text-lg"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  WhatsApp Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20"
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {service.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-display text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Pain Points */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-6">
                <span className="text-red-600 text-sm font-semibold tracking-widest uppercase">
                  The Struggles You Know
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl italic text-foreground mb-8">
                Sound Familiar?
              </h2>

              <div className="space-y-4">
                {service.painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 bg-red-50/50 rounded-xl border border-red-100"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground">{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-6">
                <span className="text-green-600 text-sm font-semibold tracking-widest uppercase">
                  Our Solutions
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl italic text-foreground mb-8">
                How We Fix It
              </h2>

              <div className="space-y-4">
                {service.solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 bg-green-50/50 rounded-xl border border-green-100"
                  >
                    <CheckCircle className="flex-shrink-0 w-6 h-6 text-green-600" />
                    <p className="text-muted-foreground">{solution}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-24 bg-gradient-to-b from-[var(--pastel-cream)] to-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-5xl italic text-foreground mb-6">
              The Full Story
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-xl text-muted-foreground leading-relaxed text-center">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">
              What's Included
            </span>
            <h2 className="font-display text-4xl md:text-5xl italic text-foreground">
              Every Detail Covered
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-gradient-to-br from-white to-[var(--pastel-cream)]/50 rounded-3xl border border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <CheckCircle className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-[#221015] via-[#2d1a20] to-[#221015] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <FloralDecoration variant="pattern" className="w-full h-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-4 block">
              Our Process
            </span>
            <h2 className="font-display text-4xl md:text-5xl italic text-white">
              How We Work
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Connecting Line */}
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-gradient-to-r from-secondary/50 to-transparent" />
                )}

                <div className="text-center">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-secondary/30">
                    <span className="text-4xl font-display text-secondary">{step.step}</span>
                  </div>
                  <h3 className="text-2xl font-display italic text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-gradient-to-br from-[var(--pastel-rose)]/30 to-[var(--pastel-lavender)]/30">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Quote className="w-16 h-16 text-primary/30 mx-auto mb-8" />

            <blockquote className="text-2xl md:text-3xl font-display italic text-foreground leading-relaxed mb-8">
              "{service.testimonialQuote}"
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">{service.testimonialAuthor}</div>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">
              Common Questions
            </span>
            <h2 className="font-display text-4xl md:text-5xl italic text-foreground">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-primary/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-primary/5 transition-colors"
                >
                  <span className="font-semibold text-lg text-foreground pr-4">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-[var(--pastel-cream)] to-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">
                Explore More
              </span>
              <h2 className="font-display text-4xl md:text-5xl italic text-foreground">
                Related Services
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((related, index) => {
                const RelatedIcon = iconMap[related.iconName] || CalendarHeart;
                return (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/services/${related.slug}`}>
                      <div className="group card-luxury bg-white p-8 rounded-3xl h-full transition-all duration-500 hover:-translate-y-2">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                          <RelatedIcon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-display italic mb-3 text-foreground group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {related.tagline}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          <span>Learn More</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#221015] via-[#2d1a20] to-[#221015] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <FloralDecoration variant="pattern" className="w-full h-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ServiceIcon className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-6xl italic text-white mb-6">
              Ready for {service.title}?
            </h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
              Let's discuss how we can make your wedding vision a reality.
              The first consultation is complimentary.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-6 text-lg shadow-xl btn-luxury">
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="tel:+919876543210">
                <Button
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-6 text-lg"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call: +91 98765 43210
                </Button>
              </Link>
            </div>

            <Link href="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white mt-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Services
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
