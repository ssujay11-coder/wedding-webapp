"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Users, Heart, Star, ArrowRight, Filter, X, Eye, Trophy, Camera, Globe, Building, ChevronDown, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Portfolio Statistics
const portfolioStats = [
    { value: "200+", label: "Weddings Curated", subLabel: "Since 2015" },
    { value: "₹200Cr+", label: "Celebrations Managed", subLabel: "Total Value" },
    { value: "40+", label: "Destinations Covered", subLabel: "Across 3 Countries" },
    { value: "5.0", label: "Client Rating", subLabel: "500+ Reviews" },
];

// Category Stats
const categoryHighlights = [
    { category: "Palace Weddings", count: "45+", avgGuests: "400", avgBudget: "₹2.5Cr", icon: Building },
    { category: "Beach Weddings", count: "50+", avgGuests: "200", avgBudget: "₹1.5Cr", icon: Globe },
    { category: "Hill Station", count: "35+", avgGuests: "180", avgBudget: "₹1.2Cr", icon: Camera },
    { category: "International", count: "25+", avgGuests: "150", avgBudget: "₹3Cr", icon: Trophy },
];

// Portfolio FAQs for GEO/Featured Snippets
const portfolioFaqs = [
    {
        question: "How many weddings has Elite Wedding Planner organized?",
        answer: "Elite Wedding Planner has successfully curated over 200 luxury weddings since 2015, managing celebrations worth more than ₹200 crores across 40+ destinations in India, Thailand, and UAE. Our portfolio includes palace weddings in Rajasthan, beach celebrations in Goa, and intimate ceremonies in the Himalayas."
    },
    {
        question: "What types of weddings does Elite Wedding Planner specialize in?",
        answer: "We specialize in five categories: Palace Weddings at heritage properties like Taj Lake Palace and Umaid Bhawan, Beach Weddings at luxury resorts in Goa and Kerala, Hill Station Weddings in Shimla and Mussoorie, International Destination Weddings in Thailand and Dubai, and Intimate Weddings for 50-100 guests at boutique venues."
    },
    {
        question: "What is the average budget for weddings in your portfolio?",
        answer: "Our portfolio spans diverse budgets: Intimate weddings start at ₹50 lakhs, Beach and Hill Station weddings average ₹1-1.5 crores, Palace weddings range from ₹2-3 crores, and Grand international celebrations can exceed ₹5 crores. The average wedding in our portfolio is approximately ₹1.5 crores."
    },
    {
        question: "Can I see real wedding photos and client testimonials?",
        answer: "Yes, our portfolio showcases real weddings with photos, videos, and authentic client testimonials. Each wedding story includes venue details, guest count, highlights, and couple quotes. We maintain strict privacy with client consent and can share more detailed case studies during consultations."
    },
];

// Wedding story types
type WeddingCategory = "all" | "palace" | "beach" | "hill-station" | "international" | "intimate";

interface WeddingStory {
    id: string;
    title: string;
    couple: string;
    location: string;
    venue: string;
    date: string;
    guestCount: string;
    category: WeddingCategory;
    heroImage: string;
    galleryImages: string[];
    description: string;
    highlights: string[];
    testimonial?: string;
    featured?: boolean;
}

// Wedding portfolio data
const weddingStories: WeddingStory[] = [
    {
        id: "priya-arjun-udaipur",
        title: "A Royal Romance",
        couple: "Priya & Arjun",
        location: "Udaipur, Rajasthan",
        venue: "Taj Lake Palace",
        date: "December 2023",
        guestCount: "350",
        category: "palace",
        heroImage: "/images/portfolio/gallery-photo-1519741497674-611481863552.webp",
        galleryImages: [
            "/images/portfolio/gallery-photo-1511285560929-80b456fea0bc.webp",
            "/images/portfolio/gallery-photo-1465495976277-4387d4b0b4c6.webp",
            "/images/portfolio/gallery-photo-1519167758481-83f550bb49b3.webp",
        ],
        description: "A three-day celebration at the iconic Taj Lake Palace, featuring traditional Rajasthani ceremonies with a modern luxury aesthetic.",
        highlights: ["Floating Palace Ceremony", "Fireworks Over Lake Pichola", "Rajasthani Folk Performances"],
        testimonial: "Elite Wedding Planner turned our dream into the most magical reality. Every detail was perfect.",
        featured: true,
    },
    {
        id: "ananya-vikram-goa",
        title: "Sunset Bliss",
        couple: "Ananya & Vikram",
        location: "Goa",
        venue: "W Goa",
        date: "February 2024",
        guestCount: "200",
        category: "beach",
        heroImage: "/images/portfolio/gallery-photo-1606800052052-a08af7148866.webp",
        galleryImages: [
            "/images/portfolio/gallery-photo-1529636798458-92182e662485.webp",
            "/images/portfolio/gallery-photo-1464366400600-7168b8af9bc3.webp",
            "/images/portfolio/gallery-photo-1507003211169-0a1dd7228f2d.webp",
        ],
        description: "A bohemian-chic beach wedding with barefoot elegance, featuring a stunning sunset ceremony on pristine Arabian Sea shores.",
        highlights: ["Sunset Beach Ceremony", "Bohemian Floral Arch", "Beach Bonfire Reception"],
        featured: true,
    },
    {
        id: "meera-rohan-jaipur",
        title: "Pink City Splendor",
        couple: "Meera & Rohan",
        location: "Jaipur, Rajasthan",
        venue: "Rambagh Palace",
        date: "November 2023",
        guestCount: "500",
        category: "palace",
        heroImage: "/images/portfolio/gallery-photo-1583939003579-730e3918a45a.webp",
        galleryImages: [
            "/images/portfolio/gallery-photo-1520854221256-17451cc331bf.webp",
            "/images/portfolio/gallery-photo-1469371670807-013ccf25f16a.webp",
            "/images/portfolio/gallery-photo-1523438885200-e635ba2c371e.webp",
        ],
        description: "A grand celebration at the former residence of the Jaipur royal family, blending regal traditions with contemporary luxury.",
        highlights: ["Royal Procession Entry", "Heritage Venue Decor", "Michelin-Star Catering"],
        featured: true,
    },
    {
        id: "nisha-karan-shimla",
        title: "Mountain Magic",
        couple: "Nisha & Karan",
        location: "Shimla, Himachal Pradesh",
        venue: "Wildflower Hall",
        date: "October 2023",
        guestCount: "150",
        category: "hill-station",
        heroImage: "https://images.unsplash.com/photo-1470076892663-af684e5e15af?w=800&q=80",
        galleryImages: [
            "/images/portfolio/gallery-photo-1478146896981-b80fe463b330.webp",
            "/images/portfolio/gallery-photo-1519225421980-715cb0215aed.webp",
            "/images/portfolio/gallery-photo-1509927083803-4bd519298ac4.webp",
        ],
        description: "An intimate mountain wedding surrounded by Himalayan peaks, featuring rustic elegance and breathtaking views.",
        highlights: ["Himalayan Backdrop Ceremony", "Cedar Forest Photoshoot", "Mountain-View Reception"],
    },
    {
        id: "tara-dev-phuket",
        title: "Thai Paradise",
        couple: "Tara & Dev",
        location: "Phuket, Thailand",
        venue: "Amanpuri",
        date: "January 2024",
        guestCount: "120",
        category: "international",
        heroImage: "/images/portfolio/gallery-photo-1510076857177-7470076d4098.webp",
        galleryImages: [
            "/images/portfolio/gallery-photo-1494955870715-979ca4f13bf0.webp",
            "/images/portfolio/gallery-photo-1519741497674-611481863552.webp",
            "/images/portfolio/gallery-photo-1511795409834-ef04bbd61622.webp",
        ],
        description: "A luxurious destination wedding combining Thai hospitality with Indian grandeur at one of Asia's finest resorts.",
        highlights: ["Cliff-Top Ceremony", "Thai-Indian Fusion Cuisine", "Infinity Pool Party"],
        featured: true,
    },
    {
        id: "sakshi-aditya-dubai",
        title: "Desert Dreams",
        couple: "Sakshi & Aditya",
        location: "Dubai, UAE",
        venue: "One&Only Royal Mirage",
        date: "March 2024",
        guestCount: "400",
        category: "international",
        heroImage: "/images/locations/galleryImages-0-photo-1512453979798-5ea266f8880c.webp",
        galleryImages: [
            "/images/locations/image-photo-1582719508461-905c673771fd.webp",
            "/images/portfolio/gallery-photo-1546874177-9e664107314e.webp",
            "/images/portfolio/gallery-photo-1518684079-3c830dcef090.webp",
        ],
        description: "An opulent celebration in the heart of Dubai, featuring Arabian luxury merged with traditional Indian ceremonies.",
        highlights: ["Desert Safari Mehendi", "Beachfront Sangeet", "Ballroom Grand Reception"],
    },
    {
        id: "kavya-rahul-kerala",
        title: "Backwater Bliss",
        couple: "Kavya & Rahul",
        location: "Kumarakom, Kerala",
        venue: "Kumarakom Lake Resort",
        date: "September 2023",
        guestCount: "180",
        category: "beach",
        heroImage: "/images/locations/galleryImages-3-photo-1544735716-392fe2489ffa.webp",
        galleryImages: [
            "/images/portfolio/gallery-photo-1524492412937-b28074a5d7da.webp",
            "/images/portfolio/gallery-photo-1548013146-72479768bada.webp",
            "/images/portfolio/gallery-photo-1506905925346-21bda4d32df4.webp",
        ],
        description: "A serene Kerala wedding on the tranquil backwaters, featuring traditional Nair ceremonies and natural elegance.",
        highlights: ["Houseboat Procession", "Traditional Sadya Feast", "Kathakali Performance"],
    },
    {
        id: "riya-amit-jodhpur",
        title: "Blue City Romance",
        couple: "Riya & Amit",
        location: "Jodhpur, Rajasthan",
        venue: "Umaid Bhawan Palace",
        date: "December 2023",
        guestCount: "280",
        category: "palace",
        heroImage: "https://images.unsplash.com/photo-1524772353931-dc5cd0f3cf0b?w=800&q=80",
        galleryImages: [
            "/images/portfolio/gallery-photo-1552664730-d307ca884978.webp",
            "https://images.unsplash.com/photo-1549494155-10a01d1f9ad6?w=400&q=80",
            "/images/portfolio/gallery-photo-1516450360452-9312f5e86fc7.webp",
        ],
        description: "A magnificent wedding at the world's largest private residence, featuring Art Deco grandeur and Rajasthani royalty.",
        highlights: ["Palace Lawn Ceremony", "Vintage Car Procession", "Champagne Tower Reception"],
    },
    {
        id: "pooja-nikhil-coorg",
        title: "Coffee Estate Romance",
        couple: "Pooja & Nikhil",
        location: "Coorg, Karnataka",
        venue: "Evolve Back Resort",
        date: "August 2023",
        guestCount: "100",
        category: "intimate",
        heroImage: "/images/portfolio/gallery-photo-1464366400600-7168b8af9bc3.webp",
        galleryImages: [
            "/images/portfolio/gallery-photo-1515934751635-c81c6bc9a2d8.webp",
            "/images/portfolio/gallery-photo-1470290378698-263fa7ca60ab.webp",
            "https://images.unsplash.com/photo-1529543544277-82e8f6d0c1a4?w=400&q=80",
        ],
        description: "An intimate celebration amidst misty coffee plantations, featuring eco-luxury and understated elegance.",
        highlights: ["Plantation Ceremony", "Farm-to-Table Dining", "Bonfire Night"],
    },
    {
        id: "simran-aryan-rishikesh",
        title: "Sacred River Celebration",
        couple: "Simran & Aryan",
        location: "Rishikesh, Uttarakhand",
        venue: "Ananda in the Himalayas",
        date: "April 2024",
        guestCount: "80",
        category: "intimate",
        heroImage: "/images/portfolio/gallery-photo-1544928147-79a2dbc1f389.webp",
        galleryImages: [
            "/images/portfolio/gallery-photo-1506905925346-21bda4d32df4.webp",
            "/images/portfolio/gallery-photo-1545569341-9eb8b30979d9.webp",
            "/images/portfolio/gallery-photo-1469474968028-56623f02e42e.webp",
        ],
        description: "A spiritual wedding experience at a Himalayan wellness retreat, combining sacred traditions with holistic luxury.",
        highlights: ["Ganga Aarti Ceremony", "Yoga & Wellness Sessions", "Mountain Sunrise Blessing"],
    },
    {
        id: "aisha-omar-mussoorie",
        title: "Queen of Hills",
        couple: "Aisha & Omar",
        location: "Mussoorie, Uttarakhand",
        venue: "JW Marriott Mussoorie",
        date: "May 2024",
        guestCount: "220",
        category: "hill-station",
        heroImage: "/images/locations/galleryImages-3-photo-1506905925346-21bda4d32df4.webp",
        galleryImages: [
            "/images/portfolio/gallery-photo-1469371670807-013ccf25f16a.webp",
            "/images/portfolio/gallery-photo-1478146896981-b80fe463b330.webp",
            "/images/portfolio/gallery-photo-1519167758481-83f550bb49b3.webp",
        ],
        description: "A multicultural celebration in the misty hills, blending diverse traditions with mountain elegance.",
        highlights: ["Mountain View Nikah", "Fusion Sangeet Night", "Colonial-Era Venue"],
    },
    {
        id: "sneha-varun-andaman",
        title: "Island Paradise",
        couple: "Sneha & Varun",
        location: "Andaman Islands",
        venue: "Taj Exotica Resort",
        date: "February 2024",
        guestCount: "60",
        category: "intimate",
        heroImage: "/images/portfolio/gallery-photo-1439130490301-25e322d88054.webp",
        galleryImages: [
            "/images/portfolio/gallery-photo-1507525428034-b723cf961d3e.webp",
            "/images/portfolio/gallery-photo-1510414842594-a61c69b5ae57.webp",
            "/images/portfolio/gallery-photo-1519046904884-53103b34b206.webp",
        ],
        description: "An exclusive island wedding on pristine white sand beaches, featuring barefoot luxury and tropical elegance.",
        highlights: ["Beach Ceremony", "Underwater Photography", "Private Island Reception"],
    },
];

const categories = [
    { id: "all", label: "All Weddings", count: weddingStories.length },
    { id: "palace", label: "Palace", count: weddingStories.filter(w => w.category === "palace").length },
    { id: "beach", label: "Beach", count: weddingStories.filter(w => w.category === "beach").length },
    { id: "hill-station", label: "Hill Station", count: weddingStories.filter(w => w.category === "hill-station").length },
    { id: "international", label: "International", count: weddingStories.filter(w => w.category === "international").length },
    { id: "intimate", label: "Intimate", count: weddingStories.filter(w => w.category === "intimate").length },
];

export function PortfolioContent() {
    const [activeCategory, setActiveCategory] = useState<WeddingCategory>("all");
    const [selectedWedding, setSelectedWedding] = useState<WeddingStory | null>(null);

    const filteredWeddings = activeCategory === "all"
        ? weddingStories
        : weddingStories.filter(w => w.category === activeCategory);

    const featuredWeddings = weddingStories.filter(w => w.featured);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-surface-rose/30 via-white to-white overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Trust Badge */}
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
                            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-semibold">
                                <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                                Award-Winning
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary/10 rounded-full text-secondary text-xs sm:text-sm font-semibold">
                                <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                                200+ Celebrations
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-100 rounded-full text-green-700 text-xs sm:text-sm font-semibold">
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                                5.0 Rating
                            </span>
                        </div>

                        {/* SEO-Optimized H1 */}
                        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl italic text-foreground mb-4 sm:mb-6">
                            Luxury Wedding Portfolio – <br className="hidden sm:block" />
                            <span className="text-primary">Real Stories, Real Magic</span>
                        </h1>

                        <p className="max-w-4xl mx-auto text-muted-foreground text-base sm:text-lg md:text-xl font-light leading-relaxed mb-6 sm:mb-8 px-2">
                            Explore <strong>200+ luxury destination weddings</strong> we&apos;ve curated across <strong>India, Thailand, and UAE</strong>. From <strong>royal palace celebrations</strong> in Udaipur to <strong>beachfront ceremonies</strong> in Goa – every wedding in our portfolio is a testament to timeless elegance.
                        </p>

                        {/* Quick Stats - Mobile 2x2 Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8">
                            {portfolioStats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-primary/10 shadow-sm"
                                >
                                    <p className="font-display text-xl sm:text-2xl md:text-3xl text-primary">{stat.value}</p>
                                    <p className="text-xs sm:text-sm text-foreground font-medium">{stat.label}</p>
                                    <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.subLabel}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <Link href="/contact">
                                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                                    Plan Your Wedding
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </Link>
                            <a href="tel:+919876543210" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-primary/30 hover:bg-primary/5 text-foreground rounded-full font-semibold transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                                    <Phone className="w-4 h-4" />
                                    Speak to Expert
                                </button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Category Highlights Section */}
            <section className="py-12 sm:py-16 bg-white border-y border-primary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-12">
                        <span className="text-primary tracking-widest uppercase text-xs font-bold">Portfolio Breakdown</span>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3">Wedding Categories We Excel In</h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {categoryHighlights.map((cat, i) => {
                            const Icon = cat.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-gradient-to-br from-surface-rose/50 to-white rounded-2xl p-4 sm:p-6 border border-primary/10 hover:shadow-lg transition-all group"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-white" />
                                    </div>
                                    <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">{cat.category}</h3>
                                    <p className="font-display text-2xl sm:text-3xl text-primary mb-2">{cat.count}</p>
                                    <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                                        <p>Avg Guests: <strong className="text-foreground">{cat.avgGuests}</strong></p>
                                        <p>Avg Budget: <strong className="text-foreground">{cat.avgBudget}</strong></p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Weddings */}
            <section className="py-20 bg-gradient-to-b from-white to-surface-rose/20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary tracking-widest uppercase text-xs font-bold">Featured</span>
                        <h2 className="font-display text-4xl md:text-5xl mt-3">Signature Celebrations</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featuredWeddings.slice(0, 4).map((wedding, i) => (
                            <motion.div
                                key={wedding.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                                onClick={() => setSelectedWedding(wedding)}
                            >
                                <div className="aspect-[4/3] relative">
                                    <Image
                                        src={wedding.heroImage}
                                        alt={wedding.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <span className="inline-block px-3 py-1 bg-secondary/90 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
                                            {wedding.category.replace("-", " ")}
                                        </span>
                                        <h3 className="font-display text-3xl text-white mb-2">{wedding.title}</h3>
                                        <p className="text-white/80 text-lg font-light">{wedding.couple}</p>
                                        <div className="flex items-center gap-4 mt-4 text-white/70 text-sm">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {wedding.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                {wedding.guestCount} guests
                                            </span>
                                        </div>
                                    </div>

                                    {/* View Button */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                            <Eye className="w-5 h-5 text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filter & Gallery */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id as WeddingCategory)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeCategory === cat.id
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "bg-surface-rose/30 text-foreground hover:bg-primary/10"
                                }`}
                            >
                                {cat.label}
                                <span className="ml-1.5 text-xs opacity-70">({cat.count})</span>
                            </button>
                        ))}
                    </div>

                    {/* Wedding Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredWeddings.map((wedding, i) => (
                                <motion.div
                                    key={wedding.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="group rounded-2xl overflow-hidden bg-white border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                                    onClick={() => setSelectedWedding(wedding)}
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={wedding.heroImage}
                                            alt={wedding.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider rounded-full">
                                                {wedding.category.replace("-", " ")}
                                            </span>
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                                                <Eye className="w-6 h-6 text-primary" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="font-display text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                                            {wedding.title}
                                        </h3>
                                        <p className="text-primary font-medium mb-3">{wedding.couple}</p>

                                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {wedding.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {wedding.date}
                                            </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {wedding.description}
                                        </p>

                                        {/* Highlights Tags */}
                                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-primary/5">
                                            {wedding.highlights.slice(0, 2).map((highlight, j) => (
                                                <span
                                                    key={j}
                                                    className="px-2 py-1 bg-surface-rose/50 text-xs text-foreground rounded-full"
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Wedding Detail Modal */}
            <AnimatePresence>
                {selectedWedding && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedWedding(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header Image */}
                            <div className="relative h-72 md:h-96">
                                <Image
                                    src={selectedWedding.heroImage}
                                    alt={selectedWedding.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <button
                                    onClick={() => setSelectedWedding(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
                                        {selectedWedding.category.replace("-", " ")}
                                    </span>
                                    <h2 className="font-display text-4xl text-white">{selectedWedding.title}</h2>
                                    <p className="text-white/80 text-xl mt-2">{selectedWedding.couple}</p>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                {/* Quick Info */}
                                <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-primary/10">
                                    <div className="text-center">
                                        <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">Location</p>
                                        <p className="font-medium">{selectedWedding.location}</p>
                                    </div>
                                    <div className="text-center">
                                        <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">Date</p>
                                        <p className="font-medium">{selectedWedding.date}</p>
                                    </div>
                                    <div className="text-center">
                                        <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">Guests</p>
                                        <p className="font-medium">{selectedWedding.guestCount}</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <h3 className="font-display text-2xl mb-4">The Story</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {selectedWedding.description}
                                    </p>
                                </div>

                                {/* Venue */}
                                <div className="mb-8">
                                    <h3 className="font-display text-2xl mb-4">Venue</h3>
                                    <p className="text-primary font-medium">{selectedWedding.venue}</p>
                                </div>

                                {/* Highlights */}
                                <div className="mb-8">
                                    <h3 className="font-display text-2xl mb-4">Wedding Highlights</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedWedding.highlights.map((highlight, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-2 bg-surface-rose/50 text-foreground rounded-full"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Testimonial */}
                                {selectedWedding.testimonial && (
                                    <div className="bg-surface-rose/30 p-6 rounded-2xl">
                                        <div className="flex items-center gap-1 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                                            ))}
                                        </div>
                                        <p className="text-foreground italic text-lg mb-3">
                                            "{selectedWedding.testimonial}"
                                        </p>
                                        <p className="text-primary font-medium">— {selectedWedding.couple}</p>
                                    </div>
                                )}

                                {/* Gallery Preview */}
                                <div className="mt-8">
                                    <h3 className="font-display text-2xl mb-4">Gallery</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {selectedWedding.galleryImages.map((img, i) => (
                                            <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                                                <Image
                                                    src={img}
                                                    alt={`${selectedWedding.title} gallery ${i + 1}`}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-8 pt-8 border-t border-primary/10 text-center">
                                    <p className="text-muted-foreground mb-4">Want a wedding like this?</p>
                                    <Link href="/contact">
                                        <button className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all inline-flex items-center gap-2">
                                            Start Planning Your Wedding
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAQ Section for GEO */}
            <section className="py-16 sm:py-20 bg-surface-rose/20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 sm:mb-12"
                    >
                        <span className="text-primary tracking-widest uppercase text-xs font-bold">Common Questions</span>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3">Portfolio FAQs</h2>
                    </motion.div>

                    <div className="space-y-4">
                        {portfolioFaqs.map((faq, i) => (
                            <motion.details
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white rounded-xl sm:rounded-2xl border border-primary/10 overflow-hidden"
                            >
                                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer list-none hover:bg-surface-rose/30 transition-colors">
                                    <h3 className="font-semibold text-foreground text-sm sm:text-base pr-4">{faq.question}</h3>
                                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                                </div>
                            </motion.details>
                        ))}
                    </div>

                    {/* Quick Stats Reminder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 sm:mt-12 p-4 sm:p-6 bg-white rounded-2xl border border-primary/10 text-center"
                    >
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Join <strong className="text-primary">200+ couples</strong> who trusted us with their special day.
                            Our portfolio includes <strong>₹200Cr+</strong> worth of celebrations across <strong>40+ destinations</strong>.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-24 bg-gradient-to-br from-[#221015] via-[#2d1a20] to-[#221015] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-4 block">
                            Your Turn
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display italic text-white mb-4 sm:mb-6">
                            Ready to Write Your Own Love Story?
                        </h2>
                        <p className="text-white/80 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
                            Join our portfolio of extraordinary celebrations. Let us create
                            a wedding that&apos;s uniquely, beautifully, and perfectly yours.
                        </p>

                        {/* Trust Strip */}
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 text-white/70 text-xs sm:text-sm">
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                Free Consultation
                            </span>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                Custom Packages
                            </span>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                No Obligation
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <Link href="/contact">
                                <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-primary/30 inline-flex items-center justify-center gap-3 text-sm sm:text-base">
                                    Start Planning
                                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </Link>
                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-3 text-sm sm:text-base">
                                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                    WhatsApp Us
                                </button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
