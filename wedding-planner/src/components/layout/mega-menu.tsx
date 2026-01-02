"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Heart, Star, ArrowRight, Sparkles, Users, Music, Volume2, Crown, Palmtree, Mountain, Globe, Utensils, Building, Camera, Plane } from "lucide-react";

interface MegaMenuProps {
    type: "destinations" | "services" | "venues";
    isOpen: boolean;
    onClose: () => void;
}

// Featured Destinations - Highlighted
const featuredDestinations = [
    {
        name: "Udaipur",
        slug: "udaipur",
        tagline: "City of Lakes",
        image: "/images/misc/mega-menu-photo-1587474260584-136574528ed5.webp",
        highlight: "Most Popular",
        venueCount: 6,
    },
    {
        name: "Goa",
        slug: "goa",
        tagline: "Beach Paradise",
        image: "/images/misc/mega-menu-photo-1512343879784-a960bf40e7f2.webp",
        highlight: "Trending",
        venueCount: 6,
    },
];

// Destination data organized by region
const destinationRegions = [
    {
        title: "Rajasthan",
        description: "Royal Palace Weddings",
        icon: Crown,
        color: "from-amber-500/20 to-orange-500/20",
        destinations: [
            { name: "Udaipur", slug: "udaipur", tag: "Most Popular" },
            { name: "Jaipur", slug: "jaipur", tag: "" },
            { name: "Jodhpur", slug: "jodhpur", tag: "" },
            { name: "Jaisalmer", slug: "jaisalmer", tag: "" },
            { name: "Pushkar", slug: "pushkar", tag: "" },
            { name: "Ranthambore", slug: "ranthambore", tag: "" },
        ],
    },
    {
        title: "Beach",
        description: "Coastal Celebrations",
        icon: Palmtree,
        color: "from-cyan-500/20 to-blue-500/20",
        destinations: [
            { name: "Goa", slug: "goa", tag: "Trending" },
            { name: "Kerala", slug: "kerala", tag: "" },
            { name: "Andaman", slug: "andaman", tag: "" },
            { name: "Kovalam", slug: "kovalam", tag: "" },
            { name: "Alleppey", slug: "alleppey", tag: "" },
            { name: "Pondicherry", slug: "pondicherry", tag: "" },
        ],
    },
    {
        title: "Hill Stations",
        description: "Mountain Escapes",
        icon: Mountain,
        color: "from-emerald-500/20 to-green-500/20",
        destinations: [
            { name: "Shimla", slug: "shimla", tag: "" },
            { name: "Mussoorie", slug: "mussoorie", tag: "" },
            { name: "Coorg", slug: "coorg", tag: "" },
            { name: "Rishikesh", slug: "rishikesh", tag: "" },
            { name: "Ooty", slug: "ooty", tag: "" },
            { name: "Manali", slug: "manali", tag: "" },
        ],
    },
    {
        title: "International",
        description: "Abroad Destinations",
        icon: Globe,
        color: "from-violet-500/20 to-purple-500/20",
        destinations: [
            { name: "Dubai", slug: "dubai-uae", tag: "Popular" },
            { name: "Phuket", slug: "phuket-thailand", tag: "" },
            { name: "Abu Dhabi", slug: "abu-dhabi-uae", tag: "" },
            { name: "Koh Samui", slug: "koh-samui-thailand", tag: "" },
            { name: "Bangkok", slug: "bangkok-thailand", tag: "" },
        ],
    },
];

// Services data
const services = [
    {
        name: "Complete Wedding Planning",
        href: "/services/complete-wedding-planning",
        description: "End-to-end planning from concept to execution",
        icon: Heart,
    },
    {
        name: "Destination Management",
        href: "/services/hospitality-logistics",
        description: "Guest logistics, travel, and accommodation",
        icon: Plane,
    },
    {
        name: "Decor & Design",
        href: "/services/decor-coordination",
        description: "Creative direction, styling, and florals",
        icon: Sparkles,
    },
    {
        name: "Day-Of Coordination",
        href: "/services/logistics-management",
        description: "Flawless execution on your wedding day",
        icon: Star,
    },
    {
        name: "Guest Management",
        href: "/services/guest-management",
        description: "RSVP tracking and guest experience",
        icon: Users,
    },
    {
        name: "Entertainment",
        href: "/services/entertainment-management",
        description: "Artists, DJs, and performances",
        icon: Music,
    },
    {
        name: "F&B Coordination",
        href: "/services/food-beverage-coordination",
        description: "Menu curation and catering management",
        icon: Utensils,
    },
    {
        name: "Photography & Film",
        href: "/services/technical-production",
        description: "Capturing your precious moments",
        icon: Camera,
    },
];

// Top venues organized by destination - Udaipur & Goa highlighted
const topVenuesByCity = {
    udaipur: [
        { name: "The Oberoi Udaivilas", slug: "oberoi-udaivilas-udaipur", price: "₹80L+", rating: 4.9 },
        { name: "Taj Lake Palace", slug: "taj-lake-palace-udaipur", price: "₹70L+", rating: 4.9 },
        { name: "The Leela Palace", slug: "leela-palace-udaipur", price: "₹60L+", rating: 4.8 },
        { name: "Raffles Udaipur", slug: "raffles-udaipur", price: "₹50L+", rating: 4.7 },
    ],
    goa: [
        { name: "Taj Exotica", slug: "taj-exotica-goa", price: "₹40L+", rating: 4.7 },
        { name: "The Leela Goa", slug: "leela-goa", price: "₹35L+", rating: 4.6 },
        { name: "W Goa", slug: "w-goa-vagator", price: "₹45L+", rating: 4.6 },
        { name: "Park Hyatt Goa", slug: "park-hyatt-goa-cansaulim", price: "₹40L+", rating: 4.5 },
    ],
};

// Venue categories
const venueCategories = [
    { name: "Palace Hotels", count: 15, icon: Crown, category: "Palace" },
    { name: "Beach Resorts", count: 12, icon: Palmtree, category: "Beach Resort" },
    { name: "Heritage Properties", count: 10, icon: Building, category: "Heritage" },
    { name: "Hill Resorts", count: 8, icon: Mountain, category: "Hill Station Resort" },
    { name: "Urban Luxury", count: 5, icon: Star, category: "Urban Luxury Hotel" },
];

export function MegaMenu({ type, isOpen, onClose }: MegaMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 top-20 bg-black/30 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Menu Content */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-0 right-0 top-16 z-50 mx-auto max-w-7xl px-6 pt-4"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl border border-primary/10 overflow-hidden">
                            {type === "destinations" && <DestinationsMenu onClose={onClose} />}
                            {type === "services" && <ServicesMenu onClose={onClose} />}
                            {type === "venues" && <VenuesMenu onClose={onClose} />}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function DestinationsMenu({ onClose }: { onClose: () => void }) {
    return (
        <div className="grid grid-cols-12 min-h-[480px]">
            {/* Featured Destinations - Large Cards */}
            <div className="col-span-5 p-6 bg-gradient-to-br from-rose-50 via-white to-amber-50">
                <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-4 flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    Top Destinations
                </h3>
                <div className="space-y-4">
                    {featuredDestinations.map((dest, i) => (
                        <motion.div
                            key={dest.slug}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={`/destinations/${dest.slug}`}
                                onClick={onClose}
                                className="group block relative overflow-hidden rounded-2xl"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                    {/* Highlight Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                                            {dest.highlight}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <h4 className="text-2xl font-display italic text-white mb-1 drop-shadow-lg">
                                                    {dest.name}
                                                </h4>
                                                <p className="text-white/80 text-sm">{dest.tagline}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white/60 text-xs">Venues</div>
                                                <div className="text-white font-bold text-lg">{dest.venueCount}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Arrow */}
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Destination Lists */}
            <div className="col-span-7 p-6">
                <div className="grid grid-cols-2 gap-6">
                    {destinationRegions.map((region, i) => (
                        <motion.div
                            key={region.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <div className={`flex items-center gap-3 mb-3 p-2 rounded-xl bg-gradient-to-r ${region.color}`}>
                                <div className="w-9 h-9 rounded-lg bg-white/80 flex items-center justify-center shadow-sm">
                                    <region.icon className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground text-sm">{region.title}</h3>
                                    <p className="text-[10px] text-muted-foreground">{region.description}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                                {region.destinations.map((dest) => (
                                    <Link
                                        key={dest.slug}
                                        href={`/destinations/${dest.slug}`}
                                        onClick={onClose}
                                        className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-primary/5 transition-colors group"
                                    >
                                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                                            {dest.name}
                                        </span>
                                        {dest.tag && (
                                            <span className="text-[9px] px-1.5 py-0.5 bg-secondary/10 text-secondary rounded font-bold">
                                                {dest.tag}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 pt-4 border-t border-primary/10 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                        Weddings across <span className="text-primary font-bold">40+ destinations</span> worldwide
                    </p>
                    <Link
                        href="/destinations"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-xs font-semibold hover:bg-primary/90 transition-colors"
                    >
                        View All
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ServicesMenu({ onClose }: { onClose: () => void }) {
    return (
        <div className="grid grid-cols-12">
            {/* Services List */}
            <div className="col-span-8 p-6">
                <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-4">Our Services</h3>
                <div className="grid grid-cols-2 gap-3">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                        >
                            <Link
                                href={service.href}
                                onClick={onClose}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shrink-0 group-hover:from-primary group-hover:to-primary transition-all">
                                    <service.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                        {service.name}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Side */}
            <div className="col-span-4 bg-gradient-to-br from-rose-50 via-amber-50/50 to-rose-50 p-6 flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1"
                >
                    <span className="text-xs font-bold tracking-widest text-secondary uppercase">Start Planning</span>
                    <h3 className="font-display text-2xl italic text-foreground mt-2 mb-3">
                        Your Dream Wedding
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">
                        Let our experts create a celebration that&apos;s uniquely yours.
                    </p>
                    <Link
                        href="/contact"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors text-sm"
                    >
                        Get Free Quote
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mt-auto pt-5 border-t border-primary/10">
                    <div className="text-center">
                        <div className="font-display text-2xl text-primary">200+</div>
                        <div className="text-[10px] text-muted-foreground">Weddings</div>
                    </div>
                    <div className="text-center">
                        <div className="font-display text-2xl text-primary">14</div>
                        <div className="text-[10px] text-muted-foreground">Years</div>
                    </div>
                    <div className="text-center">
                        <div className="font-display text-2xl text-primary">5.0</div>
                        <div className="text-[10px] text-muted-foreground">Rating</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function VenuesMenu({ onClose }: { onClose: () => void }) {
    return (
        <div className="grid grid-cols-12 min-h-[420px]">
            {/* Top Venues by City - Highlighted */}
            <div className="col-span-7 p-6">
                <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-4 flex items-center gap-2">
                    <Crown className="w-3.5 h-3.5" />
                    Top Wedding Venues
                </h3>

                <div className="grid grid-cols-2 gap-6">
                    {/* Udaipur Venues */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/misc/mega-menu-photo-1587474260584-136574528ed5.webp"
                                    alt="Udaipur"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground text-sm">Udaipur</h4>
                                <p className="text-[10px] text-muted-foreground">City of Lakes</p>
                            </div>
                            <span className="ml-auto text-[9px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-bold">
                                Most Popular
                            </span>
                        </div>
                        <div className="space-y-1.5">
                            {topVenuesByCity.udaipur.map((venue, i) => (
                                <motion.div
                                    key={venue.slug}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={`/venues/${venue.slug}`}
                                        onClick={onClose}
                                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors group"
                                    >
                                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                                            {venue.name}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-muted-foreground">{venue.price}</span>
                                            <div className="flex items-center gap-0.5">
                                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                <span className="text-[10px] font-medium">{venue.rating}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <Link
                            href="/destinations/udaipur"
                            onClick={onClose}
                            className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2 hover:underline"
                        >
                            All Udaipur Venues <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    {/* Goa Venues */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/misc/mega-menu-photo-1512343879784-a960bf40e7f2.webp"
                                    alt="Goa"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground text-sm">Goa</h4>
                                <p className="text-[10px] text-muted-foreground">Beach Paradise</p>
                            </div>
                            <span className="ml-auto text-[9px] px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full font-bold">
                                Trending
                            </span>
                        </div>
                        <div className="space-y-1.5">
                            {topVenuesByCity.goa.map((venue, i) => (
                                <motion.div
                                    key={venue.slug}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1 }}
                                >
                                    <Link
                                        href={`/venues/${venue.slug}`}
                                        onClick={onClose}
                                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors group"
                                    >
                                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                                            {venue.name}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-muted-foreground">{venue.price}</span>
                                            <div className="flex items-center gap-0.5">
                                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                <span className="text-[10px] font-medium">{venue.rating}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <Link
                            href="/destinations/goa"
                            onClick={onClose}
                            className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2 hover:underline"
                        >
                            All Goa Venues <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="col-span-5 p-6 bg-gradient-to-br from-rose-50 via-white to-amber-50">
                <h3 className="text-xs font-bold tracking-widest text-secondary uppercase mb-4">Browse by Category</h3>
                <div className="space-y-2">
                    {venueCategories.map((cat, i) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link
                                href={`/venues?category=${encodeURIComponent(cat.category)}`}
                                onClick={onClose}
                                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white transition-colors group"
                            >
                                <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:bg-primary transition-colors">
                                    <cat.icon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                                        {cat.name}
                                    </h4>
                                    <p className="text-[10px] text-muted-foreground">{cat.count} venues</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="mt-4 pt-4 border-t border-primary/10">
                    <Link
                        href="/venues"
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                        View All 50 Venues
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Help CTA */}
                <div className="mt-4 p-3 bg-white rounded-xl border border-primary/10">
                    <p className="text-xs text-muted-foreground mb-2">Need help choosing?</p>
                    <Link
                        href="/contact"
                        onClick={onClose}
                        className="text-sm text-primary font-semibold hover:underline flex items-center gap-1"
                    >
                        Get Expert Recommendations <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
