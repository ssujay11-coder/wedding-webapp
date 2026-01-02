"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PremiumContactForm } from "@/components/contact/premium-contact-form";
import { WizardContainer } from "@/components/lead-wizard/wizard-container";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle, Clock, Award, Users, Star, CheckCircle, Shield } from "lucide-react";

// Trust stats for hero section
const heroStats = [
    { value: "200+", label: "Weddings Planned", icon: Award, subLabel: "Since 2011" },
    { value: "<24h", label: "Response Time", icon: Clock, subLabel: "Guaranteed" },
    { value: "5.0", label: "Client Rating", icon: Star, subLabel: "127 Reviews" },
    { value: "Free", label: "Consultation", icon: Users, subLabel: "No Obligation" },
];

// Contact FAQs for featured snippets
const contactFaqs = [
    {
        question: "How do I book a wedding consultation with Elite?",
        answer: "You can book a free consultation by filling out the form on this page, calling us at +91 9869829673, or WhatsApp us directly. We respond to all inquiries within 24 hours with a personalized consultation plan."
    },
    {
        question: "What happens during the first wedding consultation?",
        answer: "During your free 30-minute consultation, we discuss your wedding vision, preferred destinations, guest count, budget range, and timeline. We then provide a customized proposal with venue options, service packages, and estimated costs—all with no obligation."
    },
    {
        question: "How much does Elite Wedding Planner charge?",
        answer: "Our wedding planning fees depend on scope and services. Packages start at ₹15 Lakh for intimate celebrations (50-100 guests). We've managed budgets from ₹50 Lakh to ₹15 Crore+. Schedule a free consultation for a customized quote."
    },
    {
        question: "What is Elite's response time for inquiries?",
        answer: "We guarantee a response within 24 hours for all inquiries. For urgent matters, call us directly at +91 9869829673 or WhatsApp for immediate assistance. Our team is available Monday-Saturday, 10 AM - 7 PM IST."
    },
];

export function ContactClient() {
    const [formType, setFormType] = useState<"premium" | "wizard">("premium");

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section - SEO Optimized with Mobile-First Design */}
            <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 text-center bg-gradient-to-br from-primary/5 via-white to-secondary/5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Trust Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4 md:mb-6">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-800 text-sm font-medium">Free Consultation • No Obligation</span>
                    </div>

                    {/* H1 - Primary Keyword: "Contact Wedding Planner" */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display italic text-foreground mb-4 md:mb-6 leading-tight">
                        Book Your <span className="text-primary">Free Wedding Consultation</span>
                    </h1>

                    {/* SEO-rich description with data points */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light max-w-3xl mx-auto mb-6 md:mb-8">
                        Join <strong className="text-foreground">200+ happy couples</strong> who trusted us with their dream weddings.
                        Our team responds within <strong className="text-foreground">24 hours</strong> with a personalized proposal—
                        absolutely <strong className="text-foreground">free and no obligation</strong>.
                    </p>

                    {/* Quick Stats - Mobile Optimized Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-3xl mx-auto mt-8 md:mt-12">
                        {heroStats.map((stat, i) => {
                            const StatIcon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    className="text-center bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-primary/10"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <StatIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                    </div>
                                    <div className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</div>
                                    <div className="text-xs md:text-sm font-medium text-foreground">{stat.label}</div>
                                    <div className="text-[10px] md:text-xs text-muted-foreground">{stat.subLabel}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </section>

            {/* Main Contact Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Contact Details */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-3xl border border-primary/10"
                            >
                                <h2 className="text-3xl font-display italic mb-6 text-foreground">Get in Touch</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Call Us</p>
                                            <a href="tel:+919869829673" className="text-lg text-foreground hover:text-primary transition-colors">
                                                +91 9869829673
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Email Us</p>
                                            <a href="mailto:hello@eliteweddingplanner.in" className="text-lg text-foreground hover:text-primary transition-colors break-all">
                                                hello@eliteweddingplanner.in
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Visit Us</p>
                                            <p className="text-lg text-foreground">
                                                Mumbai • Goa • Rajasthan<br />
                                                <span className="text-sm text-muted-foreground font-light">By Appointment Only</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="mt-8 pt-8 border-t border-primary/10">
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Follow Us</p>
                                    <div className="flex gap-3">
                                        <a
                                            href="https://instagram.com/eliteweddingplanner"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                                        >
                                            <Instagram className="w-6 h-6" />
                                        </a>
                                        <a
                                            href="https://facebook.com/eliteweddingplanner"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                                        >
                                            <Facebook className="w-6 h-6" />
                                        </a>
                                        <a
                                            href="https://wa.me/919869829673"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                                        >
                                            <MessageCircle className="w-6 h-6" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Join Our Team */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-br from-[#221015] to-[#3a1a25] p-8 rounded-3xl text-white"
                            >
                                <h2 className="text-3xl font-display italic mb-4">Join Our Team</h2>
                                <p className="text-white/80 font-light mb-6">
                                    Are you a passionate wedding planner or designer? We're always looking for exceptional talent to join our award-winning team.
                                </p>
                                <a
                                    href="mailto:careers@eliteweddingplanner.in"
                                    className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors font-semibold"
                                >
                                    Apply Now
                                    <span className="text-xl">→</span>
                                </a>
                            </motion.div>

                            {/* Office Hours */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white p-8 rounded-3xl border border-border"
                            >
                                <h3 className="text-xl font-display italic mb-4 text-foreground">Office Hours</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Monday - Friday</span>
                                        <span className="font-semibold">10 AM - 7 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Saturday</span>
                                        <span className="font-semibold">11 AM - 5 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Sunday</span>
                                        <span className="font-semibold">By Appointment</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            {/* Form Type Toggle */}
                            <div className="flex justify-center gap-4 mb-8">
                                <button
                                    onClick={() => setFormType("premium")}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all ${formType === "premium"
                                            ? "bg-primary text-white shadow-lg"
                                            : "bg-white text-muted-foreground border border-border hover:border-primary"
                                        }`}
                                >
                                    Quick Inquiry
                                </button>
                                <button
                                    onClick={() => setFormType("wizard")}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all ${formType === "wizard"
                                            ? "bg-primary text-white shadow-lg"
                                            : "bg-white text-muted-foreground border border-border hover:border-primary"
                                        }`}
                                >
                                    Guided Planning
                                </button>
                            </div>

                            {/* Form Container */}
                            <motion.div
                                key={formType}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {formType === "premium" ? <PremiumContactForm /> : <WizardContainer />}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators - Enhanced with Stats */}
            <section className="py-12 md:py-16 bg-accent">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display italic text-center mb-8 md:mb-12">
                        Why <span className="text-primary">200+ Couples</span> Choose Elite
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center bg-white p-5 md:p-6 rounded-2xl"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Clock className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-primary mb-1">&lt;24 Hours</div>
                            <h3 className="text-base md:text-lg font-bold mb-1">Response Time</h3>
                            <p className="text-muted-foreground text-sm">
                                Guaranteed response with personalized plan
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-center bg-white p-5 md:p-6 rounded-2xl"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Users className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-primary mb-1">12+ Members</div>
                            <h3 className="text-base md:text-lg font-bold mb-1">Dedicated Team</h3>
                            <p className="text-muted-foreground text-sm">
                                Experts assigned exclusively to your wedding
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-center bg-white p-5 md:p-6 rounded-2xl"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Shield className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-primary mb-1">100%</div>
                            <h3 className="text-base md:text-lg font-bold mb-1">Confidential</h3>
                            <p className="text-muted-foreground text-sm">
                                Your information is completely private
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-center bg-white p-5 md:p-6 rounded-2xl"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Award className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-primary mb-1">5.0 Rating</div>
                            <h3 className="text-base md:text-lg font-bold mb-1">Proven Excellence</h3>
                            <p className="text-muted-foreground text-sm">
                                14 years, 127 verified reviews
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section - GEO Optimized for Featured Snippets */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-2 block">
                            Common Questions
                        </span>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl italic text-foreground">
                            Consultation FAQs
                        </h2>
                    </motion.div>

                    <div className="space-y-3 md:space-y-4">
                        {contactFaqs.map((faq, i) => (
                            <motion.div
                                key={faq.question}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-accent/50 p-4 md:p-5 rounded-xl hover:bg-accent transition-colors"
                            >
                                <h3 className="font-semibold text-foreground text-sm md:text-base mb-2 flex items-start gap-2">
                                    <span className="text-primary flex-shrink-0">Q:</span>
                                    <span>{faq.question}</span>
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed pl-5">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Strip */}
            <section className="py-8 md:py-12 bg-gradient-to-r from-primary to-primary/90">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-display italic text-white mb-4">
                        Ready to Start Your Wedding Journey?
                    </h2>
                    <p className="text-white/80 mb-6 text-sm md:text-base">
                        Call us now or scroll up to fill the form. <strong>Free consultation, no obligation.</strong>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="tel:+919869829673"
                            className="inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors text-sm md:text-base"
                        >
                            <Phone className="w-4 h-4" />
                            Call: +91 9869829673
                        </a>
                        <a
                            href="https://wa.me/919869829673"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors text-sm md:text-base"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
