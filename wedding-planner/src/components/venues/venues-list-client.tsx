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
} from "lucide-react";
import type { WeddingVenue, VenueRegion, VenueCategory } from "@/data/venues";

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
  { value: "featured", label: "Featured" },
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

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (venue) =>
          venue.name.toLowerCase().includes(query) ||
          venue.city.toLowerCase().includes(query) ||
          venue.state.toLowerCase().includes(query)
      );
    }

    // Region filter
    if (selectedRegion !== "All") {
      result = result.filter((venue) => venue.region === selectedRegion);
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((venue) => venue.category === selectedCategory);
    }

    // Price filter
    if (selectedPriceRange.min > 0 || selectedPriceRange.max < 1000) {
      result = result.filter(
        (venue) =>
          (venue.priceRange?.min || 0) >= selectedPriceRange.min &&
          (venue.priceRange?.min || 0) <= selectedPriceRange.max
      );
    }

    // Capacity filter
    if (selectedCapacity.min > 0 || selectedCapacity.max < 2000) {
      result = result.filter(
        (venue) =>
          (venue.guestCapacity?.max || 0) >= selectedCapacity.min &&
          (venue.guestCapacity?.min || 0) <= selectedCapacity.max
      );
    }

    // Sort
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

  // Stats for the hero section
  const venueStats = [
    { value: "50+", label: "Luxury Venues", subLabel: "5-Star Properties" },
    { value: "7", label: "Categories", subLabel: "Palace to Beach" },
    { value: "200+", label: "Weddings Hosted", subLabel: "At These Venues" },
    { value: "5.0", label: "Avg Rating", subLabel: "Verified Reviews" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - SEO Optimized with Mobile-First Design */}
      <section className="relative pt-24 md:pt-28 pb-8 md:pb-12 px-4 sm:px-6 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-4">
              <Star className="w-3.5 h-3.5 text-primary fill-primary" />
              <span className="text-primary text-xs md:text-sm font-semibold">50+ Handpicked 5-Star Properties</span>
            </div>

            {/* H1 - Primary Keyword: "Luxury Wedding Venues India" */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display italic text-foreground mb-4 md:mb-6 leading-tight">
              India&apos;s Top <span className="text-primary">Luxury Wedding Venues</span>
            </h1>

            {/* SEO-rich description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-6 md:mb-8">
              Explore <strong className="text-foreground">50+ handpicked 5-star wedding venues</strong>—from
              <strong className="text-foreground"> Udaipur&apos;s majestic palaces</strong> and
              <strong className="text-foreground"> Goa&apos;s beachfront resorts</strong> to
              <strong className="text-foreground"> Kerala&apos;s backwater retreats</strong>. All venues
              personally vetted after hosting <strong className="text-foreground">200+ weddings</strong>.
            </p>

            {/* Stats Grid - Mobile Friendly */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto mb-6 md:mb-8">
              {venueStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="text-center bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-primary/10"
                >
                  <div className="text-xl md:text-2xl font-display font-bold text-primary">{stat.value}</div>
                  <div className="text-xs md:text-sm font-medium text-foreground">{stat.label}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground">{stat.subLabel}</div>
                </motion.div>
              ))}
            </div>

            {/* Search Bar - Mobile Optimized */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search venues by name, city, or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 md:py-4 rounded-full border border-border bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground text-sm md:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-0 z-40 bg-white border-b shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Region Filter */}
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value as VenueRegion | "All")}
                  className="appearance-none pl-4 pr-10 py-2 rounded-full border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="All">All Regions</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region} India
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as VenueCategory | "All")}
                  className="appearance-none pl-4 pr-10 py-2 rounded-full border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="All">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select
                  value={priceRanges.findIndex((p) => p === selectedPriceRange)}
                  onChange={(e) => setSelectedPriceRange(priceRanges[parseInt(e.target.value)])}
                  className="appearance-none pl-4 pr-10 py-2 rounded-full border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {priceRanges.map((range, index) => (
                    <option key={index} value={index}>
                      {range.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Capacity Filter */}
              <div className="relative">
                <select
                  value={capacityRanges.findIndex((c) => c === selectedCapacity)}
                  onChange={(e) => setSelectedCapacity(capacityRanges[parseInt(e.target.value)])}
                  className="appearance-none pl-4 pr-10 py-2 rounded-full border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {capacityRanges.map((range, index) => (
                    <option key={index} value={index}>
                      {range.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 text-sm text-primary hover:text-primary/80 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 rounded-full border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === "grid" ? "bg-white shadow-sm text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === "list" ? "bg-white shadow-sm text-primary" : "text-muted-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Results Count */}
              <span className="text-sm text-muted-foreground">
                {filteredVenues.length} venues
              </span>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pt-4 grid grid-cols-2 gap-3">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value as VenueRegion | "All")}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-white text-sm"
                  >
                    <option value="All">All Regions</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region} India
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as VenueCategory | "All")}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-white text-sm"
                  >
                    <option value="All">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <select
                    value={priceRanges.findIndex((p) => p === selectedPriceRange)}
                    onChange={(e) => setSelectedPriceRange(priceRanges[parseInt(e.target.value)])}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-white text-sm"
                  >
                    {priceRanges.map((range, index) => (
                      <option key={index} value={index}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={capacityRanges.findIndex((c) => c === selectedCapacity)}
                    onChange={(e) => setSelectedCapacity(capacityRanges[parseInt(e.target.value)])}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-white text-sm"
                  >
                    {capacityRanges.map((range, index) => (
                      <option key={index} value={index}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="mt-3 w-full py-2 text-sm text-primary font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Venues Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {filteredVenues.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No venues found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVenues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <VenueCard venue={venue} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredVenues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <VenueListItem venue={venue} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Enhanced with Mobile Design */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-2 block">
            Can&apos;t Decide?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display italic text-foreground mb-3 md:mb-4">
            Get Personalized Venue Recommendations
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Our wedding experts have hosted <strong className="text-foreground">200+ weddings</strong> at these venues.
            We&apos;ll help you find the perfect match based on your vision, budget, and guest count.
            <strong className="text-foreground"> Free consultation.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-colors text-sm md:text-base"
            >
              Get Free Venue Recommendations
            </Link>
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 border border-primary/20 hover:border-primary text-primary rounded-full font-semibold transition-colors text-sm md:text-base"
            >
              Explore 40+ Destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function VenueCard({ venue }: { venue: WeddingVenue }) {
  return (
    <Link
      href={`/venues/${venue.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={venue.heroImage || "/images/venues/placeholder.jpg"}
          alt={venue.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium rounded-full">
            {venue.category}
          </span>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-semibold">{venue.startingPrice}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-display italic text-foreground mb-2 group-hover:text-primary transition-colors">
          {venue.name}
        </h3>

        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>
            {venue.city}, {venue.state}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {venue.shortDescription}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{venue.googleRating || "N/A"}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>
              {venue.guestCapacity?.min || 0}-{venue.guestCapacity?.max || 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function VenueListItem({ venue }: { venue: WeddingVenue }) {
  return (
    <Link
      href={`/venues/${venue.slug}`}
      className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full md:w-80 h-60 md:h-auto flex-shrink-0">
        <Image
          src={venue.heroImage || "/images/venues/placeholder.jpg"}
          alt={venue.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium rounded-full">
            {venue.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-xl font-display italic text-foreground group-hover:text-primary transition-colors">
              {venue.name}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span>
                {venue.city}, {venue.state}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-primary">{venue.startingPrice || "Price on Request"}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground justify-end">
              <Users className="w-4 h-4" />
              <span>
                {venue.guestCapacity?.min || 0}-{venue.guestCapacity?.max || 0} guests
              </span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">{venue.shortDescription}</p>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{venue.googleRating || "N/A"}</span>
            <span className="text-sm text-muted-foreground">Google</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">
              {venue.accommodationRooms || 0} rooms
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">
              {venue.weddingSpaces?.length || 0} wedding spaces
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {(venue.features || []).slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-xs text-muted-foreground rounded-full"
            >
              {feature}
            </span>
          ))}
          {(venue.features?.length || 0) > 3 && (
            <span className="px-3 py-1 bg-primary/10 text-xs text-primary rounded-full">
              +{(venue.features?.length || 0) - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
