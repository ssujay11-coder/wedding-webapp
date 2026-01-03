"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  Star,
  Search,
  Filter,
  X,
  ChevronDown,
  Grid,
  List,
  SlidersHorizontal,
  ArrowRight,
  Heart,
} from "lucide-react";
import type { WeddingVenue, VenueRegion, VenueCategory } from "@/data/venues";
import { TextScramble } from "@/components/ui/text-scramble";
import { FloralDecoration, GoldSparkles } from "@/components/decorative/floral-elements";

interface VenuesListClientProps {
  venues: WeddingVenue[];
}

const regions: VenueRegion[] = ["North", "South", "West", "East", "Central"];
const categories: VenueCategory[] = [
  "Palace",
  "Beach Resort",
  "Hill Station",
  "Heritage",
  "Urban Luxury",
  "Backwater",
  "Desert",
];

const priceRanges = [
  { label: "All Budgets", min: 0, max: 1000 },
  { label: "Under ₹50 Lakhs", min: 0, max: 50 },
  { label: "₹50 - ₹100 Lakhs", min: 50, max: 100 },
  { label: "₹100 - ₹200 Lakhs", min: 100, max: 200 },
  { label: "Above ₹200 Lakhs", min: 200, max: 1000 },
];

const capacityRanges = [
  { label: "Any Size", min: 0, max: 2000 },
  { label: "Intimate (under 100)", min: 0, max: 100 },
  { label: "Medium (100-300)", min: 100, max: 300 },
  { label: "Large (300-500)", min: 300, max: 500 },
  { label: "Grand (500+)", min: 500, max: 2000 },
];

const sortOptions = [
  { value: "featured", label: "Featured Collection" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "capacity", label: "Largest Capacity" },
];

export function VenuesListClient({ venues }: VenuesListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<VenueRegion | "All">("All");
  const [selectedCategory, setSelectedCategory] = useState<VenueCategory | "All">("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [selectedCapacity, setSelectedCapacity] = useState(capacityRanges[0]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredVenues = useMemo(() => {
    let result = [...venues];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (venue) =>
          venue.name.toLowerCase().includes(query) ||
          venue.city.toLowerCase().includes(query) ||
          venue.state.toLowerCase().includes(query)
      );
    }

    if (selectedRegion !== "All") {
      result = result.filter((venue) => venue.region === selectedRegion);
    }

    if (selectedCategory !== "All") {
      result = result.filter((venue) => venue.category === selectedCategory);
    }

    if (selectedPriceRange.min > 0 || selectedPriceRange.max < 1000) {
      result = result.filter(
        (venue) =>
          (venue.priceRange?.min || 0) >= selectedPriceRange.min &&
          (venue.priceRange?.min || 0) <= selectedPriceRange.max
      );
    }

    if (selectedCapacity.min > 0 || selectedCapacity.max < 2000) {
      result = result.filter(
        (venue) =>
          (venue.guestCapacity?.max || 0) >= selectedCapacity.min &&
          (venue.guestCapacity?.min || 0) <= selectedCapacity.max
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.priceRange?.min || 0) - (b.priceRange?.min || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.priceRange?.min || 0) - (a.priceRange?.min || 0));
        break;
      case "rating":
        result.sort((a, b) => (b.googleRating || 0) - (a.googleRating || 0));
        break;
      case "capacity":
        result.sort((a, b) => (b.guestCapacity?.max || 0) - (a.guestCapacity?.max || 0));
        break;
    }

    return result;
  }, [venues, searchQuery, selectedRegion, selectedCategory, selectedPriceRange, selectedCapacity, sortBy]);

  const activeFiltersCount = [
    selectedRegion !== "All",
    selectedCategory !== "All",
    selectedPriceRange !== priceRanges[0],
    selectedCapacity !== capacityRanges[0],
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedRegion("All");
    setSelectedCategory("All");
    setSelectedPriceRange(priceRanges[0]);
    setSelectedCapacity(capacityRanges[0]);
    setSortBy("featured");
  };

  const venueStats = [
    { value: "50+", label: "Luxury Venues", subLabel: "5-Star Properties" },
    { value: "7", label: "Categories", subLabel: "Palace to Beach" },
    { value: "200+", label: "Weddings Hosted", subLabel: "At These Venues" },
    { value: "5.0", label: "Avg Rating", subLabel: "Verified Reviews" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]"> {/* Premium Off-White Background */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/images/lux-pattern.png')] opacity-5" />
        <div className="absolute top-0 right-0 pointer-events-none opacity-20">
          <FloralDecoration variant="branch" className="w-[400px] h-[300px]" color="gold" />
        </div>
        <div className="absolute bottom-0 left-0 pointer-events-none opacity-20 transform scale-x-[-1]">
          <FloralDecoration variant="branch" className="w-[300px] h-[200px]" color="primary" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full mb-6 border border-primary/10 shadow-sm">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-primary text-sm font-semibold tracking-wide uppercase">The Elite Collection</span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display italic text-foreground mb-6 leading-tight">
              India's Most <br className="hidden md:block" />
              <span className="text-shimmer-gold relative inline-block">
                <TextScramble text="Luxury Venues" />
                <GoldSparkles className="absolute -top-6 -right-8" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              Discover a curated selection of <strong className="text-foreground">50+ prestigious 5-star properties</strong>.
              From the royal palaces of Udaipur to the pristine beaches of Goa, find the perfect
              backdrop for your legendary celebration.
            </p>

            {/* Search Bar - Enhanced */}
            <div className="max-w-2xl mx-auto mb-16 relative z-20">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-gold/20 to-primary/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative flex items-center bg-white rounded-full shadow-xl shadow-primary/5 p-2 border border-primary/10">
                  <div className="pl-4 text-muted-foreground">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name, city, or state..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground/60 px-4 py-3 text-base"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                  <button className="hidden md:block bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-primary/5 pt-8">
              {venueStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="text-center"
                >
                  <div className="text-3xl font-display text-primary mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-foreground uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-primary/5 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filters */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <FilterDropdown
                label="Region"
                value={selectedRegion}
                options={["All", ...regions]}
                onChange={(v) => setSelectedRegion(v as any)}
              />
              <FilterDropdown
                label="Category"
                value={selectedCategory}
                options={["All", ...categories]}
                onChange={(v) => setSelectedCategory(v as any)}
              />
              <FilterSelect
                label="Price Range"
                value={priceRanges.findIndex((p) => p === selectedPriceRange).toString()}
                options={priceRanges.map((r, i) => ({ label: r.label, value: i.toString() }))}
                onChange={(v) => setSelectedPriceRange(priceRanges[parseInt(v)])}
              />
              <FilterSelect
                label="Capacity"
                value={capacityRanges.findIndex((p) => p === selectedCapacity).toString()}
                options={capacityRanges.map((r, i) => ({ label: r.label, value: i.toString() }))}
                onChange={(v) => setSelectedCapacity(capacityRanges[parseInt(v)])}
              />

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-full font-medium transition-colors whitespace-nowrap"
                >
                  Clear Filters ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 ml-auto">
              <div className="relative min-w-[180px] hidden md:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-full border border-primary/10 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer hover:border-primary/30 transition-colors"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              <div className="flex items-center bg-white border border-primary/10 rounded-full p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition-all ${viewMode === "grid" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:bg-gray-50"
                    }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full transition-all ${viewMode === "list" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:bg-gray-50"
                    }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <strong className="text-foreground">{filteredVenues.length}</strong> exclusive properties
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredVenues.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24 bg-white rounded-3xl border border-primary/5 shadow-sm"
              >
                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-primary/40" />
                </div>
                <h3 className="text-2xl font-display italic text-foreground mb-2">No venues match your criteria</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  Try adjusting your filters or search query to find your perfect venue.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-lg"
                >
                  Reset All Filters
                </button>
              </motion.div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                {filteredVenues.map((venue, index) => (
                  <motion.div
                    key={venue.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {viewMode === "grid" ? (
                      <VenueCardGrid venue={venue} />
                    ) : (
                      <VenueCardList venue={venue} />
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Concierge CTA */}
      <section className="py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <FloralDecoration variant="pattern" className="w-full h-full" color="gold" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="text-shimmer-gold text-sm font-bold tracking-widest uppercase mb-4 block">
            The Elite Experience
          </span>
          <h2 className="text-4xl md:text-6xl font-display italic mb-6">
            Still searching for perfection?
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Our luxury concierge team has exclusive access to offline inventory and negotiated rates.
            Let us curate a personalized venue portfolio for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-10 py-4 bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 hover:to-rose-600/90 text-white rounded-full font-semibold transition-all shadow-lg shadow-primary/25 inline-flex items-center justify-center gap-2"
            >
              Connect with Concierge
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/destinations"
              className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-full font-semibold transition-all inline-flex items-center justify-center"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

function FilterDropdown({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) {
  return (
    <div className="relative group">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-4 pr-10 py-2.5 rounded-full border border-primary/10 bg-white text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer hover:border-primary/30 transition-all shadow-sm group-hover:shadow-md min-w-[140px]"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt === "All" ? `All ${label}s` : opt}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none transition-transform group-hover:rotate-180" />
      <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/20 rounded-full pointer-events-none transition-all"></div>
    </div>
  )
}

function FilterSelect({ label, value, options, onChange }: { label: string, value: string, options: { label: string, value: string }[], onChange: (v: string) => void }) {
  return (
    <div className="relative group">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-4 pr-10 py-2.5 rounded-full border border-primary/10 bg-white text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer hover:border-primary/30 transition-all shadow-sm group-hover:shadow-md min-w-[160px]"
      >
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none transition-transform group-hover:rotate-180" />
    </div>
  )
}

function VenueCardGrid({ venue }: { venue: WeddingVenue }) {
  return (
    <Link href={`/venues/${venue.slug}`} className="group block h-full">
      <div className="relative overflow-hidden rounded-[20px] bg-white border border-primary/5 shadow-sm group-hover:shadow-xl group-hover:translate-y-[-4px] transition-all duration-500">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={venue.heroImage || "/images/venues/placeholder.jpg"}
            alt={venue.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              {venue.category}
            </span>
          </div>
          <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300 delay-100">
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-white/30">
              <Heart className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Bottom Info OVERLAY */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-1.5 text-white/90 text-xs font-medium mb-1.5 opacity-90">
              <MapPin className="w-3.5 h-3.5" />
              {venue.city}, {venue.state}
            </div>
            <h3 className="text-white text-xl font-display font-medium leading-tight mb-2 group-hover:text-shimmer-gold transition-colors">
              {venue.name}
            </h3>
            {/* Price - Revealed nicely */}
            <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
              <span className="text-white text-xs font-semibold">{venue.startingPrice}</span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 bg-white">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-bold text-foreground">{venue.googleRating}</span>
              <span className="text-xs text-muted-foreground">(Guest rated)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium bg-gray-50 px-2 py-1 rounded-md">
              <Users className="w-3.5 h-3.5" />
              {venue.guestCapacity?.min}-{venue.guestCapacity?.max}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {venue.features?.slice(0, 3).map((f, i) => (
              <span key={i} className="px-2 py-1 bg-[#F5F5F0] rounded text-[11px] font-medium text-gray-600">
                {f}
              </span>
            ))}
            {venue.features && venue.features.length > 3 && (
              <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[11px] font-medium text-gray-500">
                +{venue.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Hover Glow Border */}
        <div className="absolute inset-0 border-2 border-primary/0 rounded-[20px] group-hover:border-primary/20 pointer-events-none transition-colors duration-500"></div>
      </div>
    </Link>
  )
}

function VenueCardList({ venue }: { venue: WeddingVenue }) {
  return (
    <Link href={`/venues/${venue.slug}`} className="group block">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-primary/5 shadow-sm group-hover:shadow-md transition-all duration-300">
        {/* Large Image */}
        <div className="relative w-full md:w-[320px] lg:w-[400px] h-[240px] md:h-auto flex-shrink-0">
          <Image
            src={venue.heroImage || "/images/venues/placeholder.jpg"}
            alt={venue.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              {venue.category}
            </span>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium mb-2">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {venue.city}, {venue.state}
              </div>
              <h3 className="text-2xl font-display italic text-foreground group-hover:text-primary transition-colors mb-2">
                {venue.name}
              </h3>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-lg font-bold text-primary">{venue.startingPrice}</div>
              <div className="text-xs text-muted-foreground">Starting Package</div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 max-w-2xl">
            {venue.shortDescription}
          </p>

          <div className="flex items-center gap-6 border-t border-gray-100 pt-5 mt-auto">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <div>
                <div className="text-sm font-bold text-foreground">{venue.googleRating}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Rating</div>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                <Users className="w-4 h-4 text-muted-foreground" />
                {venue.guestCapacity?.max}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Max Capacity</div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                {venue.accommodationRooms}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Rooms</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
