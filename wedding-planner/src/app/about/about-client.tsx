"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StatsBar } from "@/components/home/hero-section";
import { motion } from "framer-motion";
import { Award, Heart, Star, Users, MapPin, Calendar, CheckCircle, Quote, Sparkles, Shield, Clock, Globe, TrendingUp, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// GEO-Optimized Data with Quotable Statistics
const companyStats = {
    weddingsPlanned: "200+",
    yearsExperience: 14,
    foundedYear: 2011,
    budgetManaged: "₹200 Crore+",
    destinations: "40+",
    countries: 3,
    vendorNetwork: "500+",
    teamSize: "50+",
    avgRating: 5.0,
    reviewCount: 127,
    avgBudget: "₹75 Lakh",
    successRate: "100%",
};

// Timeline with SEO-rich descriptions and data points
const milestones = [
    {
        year: "2011",
        title: "Foundation",
        description: "Elite Wedding Planner was founded in Mumbai with a vision to bring international standards of luxury wedding planning to India.",
        metric: "1st wedding: ₹25 Lakh budget",
        location: "Mumbai, India"
    },
    {
        year: "2014",
        title: "First Palace Wedding",
        description: "Orchestrated our first royal palace wedding at Udaipur's iconic City Palace for 500 guests, establishing our reputation for grand celebrations.",
        metric: "500 guests | ₹2.5 Crore budget",
        location: "City Palace, Udaipur"
    },
    {
        year: "2016",
        title: "International Expansion",
        description: "Extended services to Thailand (Phuket, Koh Samui) and UAE (Dubai, Abu Dhabi) to serve NRI couples seeking destination weddings.",
        metric: "3 countries | 15+ international venues",
        location: "Dubai, Thailand"
    },
    {
        year: "2018",
        title: "100th Wedding Milestone",
        description: "Celebrated 100 successful weddings with zero failed events, serving families from India, USA, UK, Singapore, and Middle East.",
        metric: "100 weddings | 25,000+ guests served",
        location: "Pan-India"
    },
    {
        year: "2020",
        title: "Digital Innovation",
        description: "Pioneered virtual wedding planning and intimate celebration formats during global challenges, maintaining 100% client satisfaction.",
        metric: "35 intimate weddings | Virtual planning suite",
        location: "Remote + India"
    },
    {
        year: "2023",
        title: "Industry Recognition",
        description: "Recognized as India's Top Luxury Wedding Planner by WeddingSutra, featured in Vogue India's 'Best Wedding Planners' list.",
        metric: "15+ industry awards",
        location: "Featured nationwide"
    },
    {
        year: "2024",
        title: "200+ Celebrations",
        description: "Crossed the 200 luxury wedding milestone with ₹200 Crore+ in managed budgets, establishing as India's most trusted wedding planning company.",
        metric: "₹200Cr+ managed | 50,000+ guests",
        location: "40+ destinations"
    },
];

// Core Values with GEO-optimized descriptions
const values = [
    {
        icon: Heart,
        title: "Passion for Perfection",
        description: "We manage over 1,000 micro-details per wedding—from napkin folds to firework timings. Our obsession with perfection means you experience flawless execution.",
        stat: "1,000+ details",
        statLabel: "Per Wedding"
    },
    {
        icon: Users,
        title: "Client-First Philosophy",
        description: "Your vision is our blueprint. We assign a dedicated 12-member team exclusively to your wedding, ensuring personalized attention throughout the 6-12 month journey.",
        stat: "12+",
        statLabel: "Team Members"
    },
    {
        icon: Shield,
        title: "Uncompromising Quality",
        description: "We partner exclusively with India's top 50 luxury venues and 500+ pre-vetted premium vendors. Every recommendation comes with our quality guarantee.",
        stat: "500+",
        statLabel: "Elite Vendors"
    },
    {
        icon: Sparkles,
        title: "Creative Innovation",
        description: "Blending rich Indian wedding traditions with contemporary European design aesthetics, we create celebrations that feel both timelessly elegant and refreshingly modern.",
        stat: "2 Aesthetics",
        statLabel: "Perfectly Blended"
    },
];

// Awards with complete attribution for authority signals
const awards = [
    { title: "Best Luxury Wedding Planner India", org: "WeddingSutra Awards", year: "2023", category: "Luxury Segment" },
    { title: "Top 10 Destination Wedding Planners", org: "Vogue India", year: "2023", category: "National Ranking" },
    { title: "Excellence in Event Design", org: "ILEA India (International Live Events Association)", year: "2022", category: "Design Excellence" },
    { title: "Best Palace Wedding Specialist", org: "Wedding Planners Association of India", year: "2022", category: "Heritage Weddings" },
    { title: "Outstanding Client Service Award", org: "Bride's Choice Awards", year: "2021", category: "Customer Excellence" },
    { title: "Best Destination Wedding Management", org: "India Wedding Awards", year: "2021", category: "Operations Excellence" },
];

// Team with credentials for E-E-A-T signals
const teamMembers = [
    {
        name: "Founder & Creative Director",
        role: "Visionary Leader",
        image: "/images/team/founder.jpg",
        description: "14+ years of experience orchestrating 200+ luxury weddings across India, Dubai, and Thailand.",
        credentials: "Certified Event Planner | ILEA Member",
        experience: "14+ years"
    },
    {
        name: "Head of Operations",
        role: "Logistics Expert",
        image: "/images/team/operations.jpg",
        description: "Former hospitality director ensuring military-precision execution for weddings up to 2,000 guests.",
        credentials: "Hospitality Management Graduate | Six Sigma Certified",
        experience: "12+ years"
    },
    {
        name: "Lead Designer",
        role: "Creative Genius",
        image: "/images/team/designer.jpg",
        description: "Award-winning designer crafting bespoke visual narratives for each couple's unique love story.",
        credentials: "NID Graduate | International Design Awards Winner",
        experience: "10+ years"
    },
    {
        name: "Client Relations Manager",
        role: "Your Dedicated Guide",
        image: "/images/team/relations.jpg",
        description: "Your single point of contact, available 24/7 with average response time under 2 hours.",
        credentials: "Customer Experience Certified | Multilingual (5 languages)",
        experience: "8+ years"
    },
];

// FAQ Section for Featured Snippets (GEO Optimization)
const faqs = [
    {
        question: "What is Elite Wedding Planner?",
        answer: "Elite Wedding Planner is India's premier luxury wedding planning company, founded in 2011. We have orchestrated 200+ weddings worth ₹200 Crore+ across 40+ destinations in India, Dubai, and Thailand, making us one of the most trusted names in the Indian wedding industry."
    },
    {
        question: "How much does Elite Wedding Planner charge?",
        answer: "Our wedding planning fees vary based on scope, with packages starting at ₹15 Lakh for intimate celebrations (50-100 guests) and scaling for grand weddings. We've managed budgets ranging from ₹50 Lakh to ₹15 Crore+. Schedule a free consultation for a customized quote."
    },
    {
        question: "Which destinations does Elite Wedding Planner cover?",
        answer: "We operate across 40+ destinations including Udaipur, Jaipur, Jodhpur, Goa, Kerala, Jaisalmer, Jim Corbett, Rishikesh, and Mumbai in India, plus international venues in Dubai, Abu Dhabi, Phuket, and Koh Samui."
    },
    {
        question: "What makes Elite Wedding Planner different?",
        answer: "Our differentiators include 14 years of experience, 100% on-time delivery record, exclusive access to India's top 50 luxury venues, 500+ vetted vendor partnerships, 24/7 dedicated support, and a 12+ member team assigned exclusively to each wedding."
    },
];

export function AboutClient() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section - SEO Optimized with H1 containing primary keyword */}
            <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 bg-gradient-to-b from-surface-rose/30 via-white to-white overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-48 md:w-64 h-48 md:h-64 rounded-full bg-primary blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 rounded-full bg-secondary blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4 md:space-y-6"
                    >
                        {/* Trust Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">
                                <Heart className="w-3.5 h-3.5" />
                                Since 2011
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 rounded-full text-secondary-foreground text-xs md:text-sm font-semibold tracking-widest uppercase">
                                <Award className="w-3.5 h-3.5" />
                                Award-Winning
                            </span>
                        </div>

                        {/* H1 - Primary Keyword: "Luxury Wedding Planners India" */}
                        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic text-foreground leading-tight">
                            India&apos;s Premier <span className="text-primary">Luxury Wedding Planners</span>
                        </h1>

                        {/* SEO-rich subtitle with data points */}
                        <p className="max-w-4xl mx-auto text-muted-foreground text-base sm:text-lg md:text-xl font-light leading-relaxed">
                            <strong className="text-foreground">Elite Wedding Planner</strong> is India&apos;s most trusted luxury wedding planning company,
                            having orchestrated <strong className="text-foreground">200+ extraordinary celebrations</strong> worth
                            <strong className="text-foreground"> ₹200 Crore+</strong> across <strong className="text-foreground">40+ destinations</strong> in
                            India, Dubai, and Thailand since 2011.
                        </p>

                        {/* Quick Stats Row - Mobile Optimized */}
                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-4">
                            <div className="text-center">
                                <p className="text-2xl md:text-3xl font-display font-bold text-primary">{companyStats.weddingsPlanned}</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Weddings Planned</p>
                            </div>
                            <div className="w-px h-10 bg-primary/20 hidden sm:block" />
                            <div className="text-center">
                                <p className="text-2xl md:text-3xl font-display font-bold text-primary">{companyStats.yearsExperience}</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Years Experience</p>
                            </div>
                            <div className="w-px h-10 bg-primary/20 hidden sm:block" />
                            <div className="text-center">
                                <p className="text-2xl md:text-3xl font-display font-bold text-primary">{companyStats.budgetManaged}</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Budgets Managed</p>
                            </div>
                            <div className="w-px h-10 bg-primary/20 hidden md:block" />
                            <div className="text-center hidden md:block">
                                <div className="flex items-center gap-0.5 justify-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                                    ))}
                                </div>
                                <p className="text-xs md:text-sm text-muted-foreground">{companyStats.reviewCount} Reviews</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <StatsBar />

            {/* Founder's Message Section - H2 with secondary keywords */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl -z-10 hidden md:block" />
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <Image
                                    src="/images/team.jpg"
                                    alt="Elite Wedding Planner Team - India's Top Luxury Wedding Planning Experts"
                                    width={600}
                                    height={700}
                                    className="w-full h-[350px] sm:h-[400px] md:h-[500px] object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 md:p-8">
                                    <Quote className="w-6 h-6 md:w-8 md:h-8 text-secondary mb-2 md:mb-3" />
                                    <p className="text-white/90 italic text-sm sm:text-base md:text-lg">
                                        &ldquo;We don&apos;t just plan weddings—we orchestrate experiences that become family legacies.&rdquo;
                                    </p>
                                    <p className="text-white/60 text-xs md:text-sm mt-2">— Founder, Elite Wedding Planner</p>
                                </div>
                            </div>

                            {/* Floating Achievement Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-xl shadow-xl p-3 md:p-4 hidden sm:block"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-lg md:text-xl font-display font-bold text-primary">15+</p>
                                        <p className="text-xs text-muted-foreground">Industry Awards</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6 md:space-y-8 order-1 lg:order-2"
                        >
                            <div>
                                <span className="text-primary tracking-widest uppercase text-xs font-bold">Our Philosophy</span>
                                {/* H2 - Secondary Keyword: "Wedding Planning Company India" */}
                                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mt-2 md:mt-3">
                                    Why India&apos;s Elite Families Trust Us With Their
                                    <span className="block italic text-primary font-light">Most Precious Celebrations</span>
                                </h2>
                            </div>

                            {/* GEO-Optimized Content with Quotable Statements */}
                            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                                <p>
                                    <strong className="text-foreground">Elite Wedding Planner</strong> is the culmination of 14 years of relentless pursuit of perfection.
                                    From the royal corridors of <strong className="text-foreground">Udaipur&apos;s City Palace</strong> to the sun-kissed beaches of
                                    <strong className="text-foreground"> Goa&apos;s luxury resorts</strong>, our team has orchestrated over
                                    <strong className="text-foreground"> 200 celebrations</strong>—each unique, each a masterpiece.
                                </p>
                                <p>
                                    We are not just planners; we are your <em>confidants</em>, your <em>designers</em>, and your <em>chaos-managers</em>.
                                    With a dedicated <strong className="text-foreground">12-member team</strong> assigned exclusively to your wedding,
                                    we manage over <strong className="text-foreground">1,000 micro-details</strong>—from napkin folds to firework timings—so
                                    you can be fully present in every moment.
                                </p>
                                <p>
                                    Our approach is rooted in <strong className="text-foreground">&ldquo;soft luxury&rdquo;</strong>—an aesthetic that whispers rather than shouts.
                                    We blend the intricate vibrancy of <strong className="text-foreground">Indian wedding traditions</strong> with the understated elegance of
                                    <strong className="text-foreground"> European editorial design</strong>, creating atmospheres that feel both magnificently grand and intimately personal.
                                </p>
                            </div>

                            {/* Key Differentiators - Quick Scan */}
                            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2">
                                <div className="flex items-center gap-2 text-sm md:text-base">
                                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                                    <span>100% On-Time Delivery</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm md:text-base">
                                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                                    <span>500+ Elite Vendors</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm md:text-base">
                                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                                    <span>24/7 Dedicated Support</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm md:text-base">
                                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                                    <span>50+ Luxury Venues</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-primary/20 text-sm md:text-base"
                                >
                                    Schedule Free Consultation
                                    <Heart className="w-4 h-4 md:w-5 md:h-5" />
                                </Link>
                                <Link
                                    href="/portfolio"
                                    className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 border border-primary/20 hover:border-primary text-primary rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
                                >
                                    View 200+ Weddings
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values - Enhanced with Stats */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-white via-surface-rose/20 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <span className="text-primary tracking-widest uppercase text-xs font-bold">What Drives Us</span>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 md:mt-3">
                            The Four Pillars of <span className="italic text-primary">Elite Excellence</span>
                        </h2>
                        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm md:text-base">
                            These core values have guided 200+ successful weddings and earned us the trust of India&apos;s most discerning families.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                        {values.map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/5 group relative"
                            >
                                {/* Number Badge */}
                                <div className="absolute top-4 right-4 text-4xl md:text-5xl font-display font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                                    {String(i + 1).padStart(2, "0")}
                                </div>

                                <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <value.icon className="w-6 h-6 md:w-7 md:h-7" />
                                </div>
                                <h3 className="font-display text-lg md:text-xl mb-2 md:mb-3 text-foreground">{value.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{value.description}</p>

                                {/* Stat Badge */}
                                <div className="pt-3 md:pt-4 border-t border-primary/10">
                                    <p className="text-xl md:text-2xl font-display font-bold text-primary">{value.stat}</p>
                                    <p className="text-xs text-muted-foreground">{value.statLabel}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Elite Edge */}
            <section className="py-24 bg-[#221015] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-dark.png')] bg-repeat opacity-20" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-secondary tracking-widest uppercase text-xs font-bold">Why Choose Us</span>
                        <h2 className="font-display text-4xl md:text-5xl mt-3">The Elite Edge</h2>
                        <p className="text-white/70 mt-4 max-w-2xl mx-auto">
                            What sets us apart in the world of luxury wedding planning
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors group"
                        >
                            <Calendar className="w-10 h-10 text-primary mb-6" />
                            <h3 className="font-display text-2xl text-primary mb-4">14+ Years Experience</h3>
                            <p className="text-white/70 font-light leading-relaxed">
                                Handling complex, high-budget multi-day events across international borders with flawless precision.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors group"
                        >
                            <MapPin className="w-10 h-10 text-secondary mb-6" />
                            <h3 className="font-display text-2xl text-secondary mb-4">Exclusive Network</h3>
                            <p className="text-white/70 font-light leading-relaxed">
                                Privileged access to heritage palaces, 5-star resorts, and negotiated rates at India's finest venues.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors group"
                        >
                            <Sparkles className="w-10 h-10 text-primary mb-6" />
                            <h3 className="font-display text-2xl text-primary mb-4">In-House Design</h3>
                            <p className="text-white/70 font-light leading-relaxed">
                                In-house production capabilities ensuring your decor is custom-built, not just rented.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Journey Timeline */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary tracking-widest uppercase text-xs font-bold">Our Journey</span>
                        <h2 className="font-display text-4xl md:text-5xl mt-3">Milestones That Define Us</h2>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />

                        <div className="space-y-12">
                            {milestones.map((milestone, i) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className={`bg-surface-rose/30 p-6 rounded-2xl inline-block max-w-md ${i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                            <span className="text-primary font-display text-2xl">{milestone.year}</span>
                                            <h3 className="font-semibold text-foreground text-lg mt-1">{milestone.title}</h3>
                                            <p className="text-muted-foreground text-sm mt-2">{milestone.description}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold shrink-0 z-10 shadow-lg">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>

                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Awards & Recognition */}
            <section className="py-24 bg-gradient-to-b from-surface-rose/20 to-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary tracking-widest uppercase text-xs font-bold">Recognition</span>
                        <h2 className="font-display text-4xl md:text-5xl mt-3">Awards & Accolades</h2>
                        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                            Honored to be recognized by industry leaders for our commitment to excellence
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {awards.map((award, i) => (
                            <motion.div
                                key={award.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-primary/5 hover:shadow-lg transition-shadow"
                            >
                                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                                    <Award className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">{award.title}</h3>
                                    <p className="text-sm text-muted-foreground">{award.org}</p>
                                    <span className="text-xs text-primary font-semibold mt-1 inline-block">{award.year}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Preview */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary tracking-widest uppercase text-xs font-bold">The Team</span>
                        <h2 className="font-display text-4xl md:text-5xl mt-3">Meet Your Wedding Experts</h2>
                        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                            A dedicated team of professionals committed to making your wedding dreams come true
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center group"
                            >
                                <div className="relative mb-6 overflow-hidden rounded-2xl">
                                    <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                        <Users className="w-16 h-16 text-primary/30" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                                        <p className="text-white text-sm px-4">{member.description}</p>
                                    </div>
                                </div>
                                <h3 className="font-display text-lg text-foreground">{member.name}</h3>
                                <p className="text-sm text-primary">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section - GEO Optimized for Featured Snippets */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-white to-surface-rose/20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 md:mb-16"
                    >
                        <span className="text-primary tracking-widest uppercase text-xs font-bold">Common Questions</span>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 md:mt-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm md:text-base">
                            Everything you need to know about working with India&apos;s premier luxury wedding planners.
                        </p>
                    </motion.div>

                    <div className="space-y-4 md:space-y-6">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={faq.question}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-primary/5 hover:shadow-md transition-shadow"
                            >
                                <h3 className="font-semibold text-foreground text-base md:text-lg mb-2 md:mb-3 flex items-start gap-2">
                                    <span className="text-primary">Q:</span>
                                    {faq.question}
                                </h3>
                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed pl-5 md:pl-6">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Questions CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-8 md:mt-12"
                    >
                        <p className="text-muted-foreground text-sm md:text-base mb-4">
                            Have more questions? We&apos;re here to help.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors text-sm md:text-base"
                        >
                            <Phone className="w-4 h-4" />
                            Contact Our Team
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-[#221015] via-[#2d1a20] to-[#221015] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 rounded-full bg-primary blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 rounded-full bg-secondary blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-4 block">
                            Ready to Begin?
                        </span>
                        <h2 className="text-3xl md:text-5xl font-display italic text-white mb-6">
                            Let's Create Your Dream Wedding Together
                        </h2>
                        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                            Every great wedding begins with a conversation. Share your vision with us,
                            and let's start crafting your once-in-a-lifetime celebration.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/contact">
                                <button className="px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-primary/30 inline-flex items-center gap-3">
                                    Schedule Free Consultation
                                    <Heart className="w-5 h-5" />
                                </button>
                            </Link>
                            <Link href="/portfolio">
                                <button className="px-10 py-4 border border-white/30 hover:border-secondary hover:bg-white/5 text-white rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-3">
                                    View Our Portfolio
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
