"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  Star,
  Phone,
  Mail,
  Globe,
  Calendar,
  Plane,
  Train,
  Car,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  Check,
  Award,
  Utensils,
  Building,
  Sun,
  Heart,
  Share2,
  MessageCircle,
  Clock,
  Music,
  Wine,
  Palette,
  FileText,
  CreditCard,
  Shield,
  Navigation,
  ParkingCircle,
  HelpCircle,
  Landmark,
  Lightbulb,
  Camera,
  Sparkles,
  Target,
  TrendingUp,
  MapPinned,
  Quote,
  Wallet,
  Timer,
} from "lucide-react";
import type { WeddingVenue } from "@/data/venues";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";

interface VenueDetailClientProps {
  venue: WeddingVenue;
}

export function VenueDetailClient({ venue }: VenueDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "spaces" | "features" | "logistics" | "faqs" | "policies">("overview");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: venue.name,
          text: venue.shortDescription,
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in hosting my wedding at ${venue.name}. Can you share more details about availability and packages?`
    );
    window.open(`https://wa.me/919869829673?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative h-[60vh] sm:h-[70vh] min-h-[400px] sm:min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src={venue.heroImage || "/images/venues/placeholder-hero.jpg"}
            alt={`${venue.name} - Luxury Wedding Venue in ${venue.city}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category Badges - Mobile Scroll */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 overflow-x-auto scrollbar-hide pb-1">
                <span className="px-2 sm:px-3 py-1 bg-primary/90 text-white text-xs sm:text-sm font-medium rounded-full whitespace-nowrap">
                  {venue.category}
                </span>
                <span className="px-2 sm:px-3 py-1 bg-white/20 text-white text-xs sm:text-sm font-medium rounded-full backdrop-blur-sm whitespace-nowrap flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {venue.starRating} Star
                </span>
                {venue.helipadAvailable && (
                  <span className="px-2 sm:px-3 py-1 bg-yellow-500/90 text-white text-xs sm:text-sm font-medium rounded-full whitespace-nowrap">
                    Helipad
                  </span>
                )}
                {venue.googleRating && venue.googleRating >= 4.5 && (
                  <span className="px-2 sm:px-3 py-1 bg-green-500/90 text-white text-xs sm:text-sm font-medium rounded-full whitespace-nowrap">
                    Highly Rated
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display italic text-white mb-3 sm:mb-4">
                {venue.name}
              </h1>

              {/* Location & Ratings - Mobile Grid */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/90 text-sm sm:text-base mb-4 sm:mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{venue.city}, {venue.state}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                  <span>{venue.googleRating || "N/A"} Rating</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{venue.guestCapacity?.min || 50}-{venue.guestCapacity?.max || 500} Guests</span>
                </div>
              </div>

              {/* Action Buttons - Mobile Stack */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  WhatsApp Inquiry
                </button>
                <div className="flex gap-2 sm:gap-4">
                  <button
                    onClick={handleShare}
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold flex items-center justify-center gap-2 backdrop-blur-sm transition-colors text-sm sm:text-base"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                  <Link
                    href="/contact"
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
                  >
                    Get Quote
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Price Banner - Mobile Optimized */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-white text-center sm:text-left">
              <span className="text-white/80 text-xs sm:text-sm">Starting from</span>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{venue.startingPrice || "Price on Request"}</p>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 text-white/90 text-sm sm:text-base">
              {venue.accommodationRooms && (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{venue.accommodationRooms} Rooms</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Up to {venue.guestCapacity?.max || 500} Guests</span>
              </div>
              {venue.weddingSpaces && (
                <div className="hidden sm:flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{venue.weddingSpaces.length} Venues</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="py-6 sm:py-8 bg-gradient-to-br from-gray-50 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">{venue.starRating || 5}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Star Rating</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 fill-green-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">{venue.googleRating || "4.8"}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Google Rating</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">{venue.guestCapacity?.max || 500}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Max Guests</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">{venue.accommodationRooms || "N/A"}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Rooms Available</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">{venue.weddingSpaces?.length || 0}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Wedding Venues</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide">
            {[
              { id: "overview", label: "Overview" },
              { id: "spaces", label: "Wedding Spaces" },
              { id: "features", label: "Features" },
              { id: "logistics", label: "How to Reach" },
              { id: "policies", label: "Policies" },
              { id: "faqs", label: "FAQs" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Short Description */}
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-2xl border border-primary/10">
                    <p className="text-lg text-foreground leading-relaxed italic">
                      &ldquo;{venue.shortDescription}&rdquo;
                    </p>
                  </div>

                  {/* Long Description */}
                  <div className="prose prose-lg max-w-none">
                    {(venue.longDescription || "").split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Why Choose Section */}
                  {venue.whyChoose && venue.whyChoose.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display italic mb-6">
                        Why Choose {venue.name}
                      </h2>
                      <div className="grid gap-3">
                        {venue.whyChoose.map((reason, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-4 bg-white rounded-xl border border-border hover:border-primary/30 transition-colors"
                          >
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-primary" />
                            </div>
                            <p className="text-foreground">{reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ideal For */}
                  {venue.idealFor && venue.idealFor.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display italic mb-6">Ideal For</h2>
                      <div className="flex flex-wrap gap-3">
                        {venue.idealFor.map((item, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-secondary/10 text-foreground rounded-full text-sm flex items-center gap-2"
                          >
                            <Heart className="w-4 h-4 text-primary" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Awards */}
                  {venue.awards && venue.awards.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display italic mb-6">Awards & Recognition</h2>
                      <div className="grid gap-3">
                        {venue.awards.map((award, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200"
                          >
                            <Award className="w-6 h-6 text-yellow-600" />
                            <span className="font-medium text-foreground">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Unique Selling Points - Featured Snippet Optimized */}
                  {venue.uniqueSellingPoints && venue.uniqueSellingPoints.length > 0 && (
                    <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 p-6 sm:p-8 rounded-2xl border border-primary/10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Target className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-display italic">What Makes {venue.name} Special</h2>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {venue.uniqueSellingPoints.map((point, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm"
                          >
                            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-foreground font-medium">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Insider Tips - Expert Content */}
                  {venue.insiderTips && venue.insiderTips.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <Lightbulb className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-display italic">Insider Tips from Our Planners</h2>
                          <p className="text-sm text-muted-foreground">Based on 200+ weddings we&apos;ve coordinated</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {venue.insiderTips.map((tip, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl"
                          >
                            <span className="w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {index + 1}
                            </span>
                            <p className="text-foreground leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Planning Timeline */}
                  {venue.planningTimeline && venue.planningTimeline.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Timer className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-display italic">Wedding Planning Timeline</h2>
                          <p className="text-sm text-muted-foreground">Recommended milestones for {venue.name}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-primary to-secondary" />
                        <div className="space-y-4">
                          {venue.planningTimeline.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-4 pl-0 relative"
                            >
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-primary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 z-10 shadow-lg">
                                {item.months}
                              </div>
                              <div className="flex-1 p-4 bg-white rounded-xl border border-border shadow-sm">
                                <p className="text-foreground font-medium">{item.task}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Signature Experiences */}
                  {venue.signatureExperiences && venue.signatureExperiences.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-display italic">Signature Wedding Experiences</h2>
                      </div>
                      <div className="grid gap-4">
                        {venue.signatureExperiences.map((exp, index) => (
                          <div
                            key={index}
                            className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100"
                          >
                            <h3 className="text-lg font-semibold text-foreground mb-2">{exp.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* What to Expect */}
                  {venue.whatToExpect && venue.whatToExpect.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-display italic">What to Expect at Your Wedding</h2>
                      </div>
                      <div className="grid gap-3">
                        {venue.whatToExpect.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
                          >
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-foreground">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Photography Spots */}
                  {venue.photographySpots && venue.photographySpots.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                          <Camera className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-display italic">Best Photography Spots</h2>
                          <p className="text-sm text-muted-foreground">Recommended by top wedding photographers</p>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {venue.photographySpots.map((spot, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 rounded-xl"
                          >
                            <Camera className="w-5 h-5 text-rose-500 flex-shrink-0" />
                            <span className="text-foreground font-medium">{spot}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Nearby Attractions for Guests */}
                  {venue.nearbyAttractions && venue.nearbyAttractions.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <MapPinned className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-display italic">Nearby Attractions for Guests</h2>
                          <p className="text-sm text-muted-foreground">Keep your guests entertained during the celebration</p>
                        </div>
                      </div>
                      <div className="grid gap-4">
                        {venue.nearbyAttractions.map((attraction, index) => (
                          <div
                            key={index}
                            className="p-5 bg-white rounded-xl border border-border hover:border-teal-300 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-semibold text-foreground mb-1">{attraction.name}</h3>
                                <p className="text-sm text-muted-foreground">{attraction.description}</p>
                              </div>
                              <span className="text-xs font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full whitespace-nowrap">
                                {attraction.distance}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Real Wedding Stories */}
                  {venue.realWeddingStories && venue.realWeddingStories.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <Quote className="w-5 h-5 text-pink-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-display italic">Real Wedding Stories</h2>
                          <p className="text-sm text-muted-foreground">Couples who celebrated at {venue.name}</p>
                        </div>
                      </div>
                      <div className="grid gap-6">
                        {venue.realWeddingStories.map((story, index) => (
                          <div
                            key={index}
                            className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100"
                          >
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <span className="font-display italic text-lg text-foreground">{story.couple}</span>
                              <span className="text-sm text-muted-foreground">• {story.date}</span>
                              <span className="text-sm text-muted-foreground">• {story.guestCount} guests</span>
                            </div>
                            <p className="text-sm font-medium text-primary mb-3">{story.highlight}</p>
                            <blockquote className="text-muted-foreground italic border-l-4 border-pink-300 pl-4">
                              &ldquo;{story.testimonial}&rdquo;
                            </blockquote>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Budget Breakdown Guide */}
                  {venue.budgetBreakdown && venue.budgetBreakdown.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-display italic">Budget Planning Guide</h2>
                          <p className="text-sm text-muted-foreground">Typical allocation for weddings at {venue.name}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {venue.budgetBreakdown.map((item, index) => (
                          <div
                            key={index}
                            className="p-4 bg-white rounded-xl border border-border"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-foreground">{item.category}</span>
                              <span className="text-lg font-bold text-emerald-600">{item.percentage}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                              <div
                                className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full"
                                style={{ width: item.percentage }}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">{item.note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vendor Recommendations */}
                  {venue.vendorRecommendations && venue.vendorRecommendations.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-border">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-display italic">Vendor Selection Tips</h2>
                          <p className="text-sm text-muted-foreground">Expert recommendations for this venue</p>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {venue.vendorRecommendations.map((rec, index) => (
                          <div
                            key={index}
                            className="p-4 bg-white rounded-xl border border-border"
                          >
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{rec.category}</span>
                            <p className="text-sm text-foreground mt-2">{rec.tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pros and Cons - Transparent Review */}
                  {((venue.pros && venue.pros.length > 0) || (venue.cons && venue.cons.length > 0)) && (
                    <div>
                      <h2 className="text-2xl font-display italic mb-6">Honest Assessment</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        {venue.pros && venue.pros.length > 0 && (
                          <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                            <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                              <Check className="w-5 h-5" />
                              What We Love
                            </h3>
                            <ul className="space-y-3">
                              {venue.pros.map((pro, index) => (
                                <li key={index} className="flex items-start gap-2 text-green-900">
                                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {venue.cons && venue.cons.length > 0 && (
                          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
                            <h3 className="font-semibold text-amber-800 mb-4 flex items-center gap-2">
                              <HelpCircle className="w-5 h-5" />
                              Things to Consider
                            </h3>
                            <ul className="space-y-3">
                              {venue.cons.map((con, index) => (
                                <li key={index} className="flex items-start gap-2 text-amber-900">
                                  <span className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-1">•</span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Wedding Spaces Tab */}
              {activeTab === "spaces" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-display italic">Wedding Spaces & Venue Dimensions</h2>
                  <p className="text-muted-foreground">
                    {venue.name} offers {venue.weddingSpaces.length} distinct wedding venues, each designed to create memorable celebrations.
                  </p>
                  <div className="grid gap-4">
                    {venue.weddingSpaces.map((space, index) => (
                      <div
                        key={index}
                        className="p-6 bg-white rounded-2xl border border-border hover:shadow-lg transition-all"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                              {space.name}
                            </h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              space.type === "Indoor"
                                ? "bg-blue-100 text-blue-700"
                                : space.type === "Outdoor"
                                ? "bg-green-100 text-green-700"
                                : space.type === "Poolside"
                                ? "bg-cyan-100 text-cyan-700"
                                : space.type === "Rooftop"
                                ? "bg-purple-100 text-purple-700"
                                : space.type === "Beachfront"
                                ? "bg-amber-100 text-amber-700"
                                : space.type === "Lakeside"
                                ? "bg-teal-100 text-teal-700"
                                : "bg-gray-100 text-gray-700"
                            }`}>
                              {space.type}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-foreground">
                              <Users className="w-5 h-5 text-primary" />
                              <span className="text-2xl font-bold">{space.capacity}</span>
                              <span className="text-muted-foreground">guests</span>
                            </div>
                            {space.sqft && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {space.sqft.toLocaleString()} sq. ft.
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Dimensions if available */}
                        {space.dimensions && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-sm font-medium text-muted-foreground mb-2">Dimensions:</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="px-3 py-1 bg-gray-100 rounded-lg">
                                Length: {space.dimensions.length}
                              </span>
                              <span className="px-3 py-1 bg-gray-100 rounded-lg">
                                Width: {space.dimensions.width}
                              </span>
                              {space.dimensions.height && (
                                <span className="px-3 py-1 bg-gray-100 rounded-lg">
                                  Height: {space.dimensions.height}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Features if available */}
                        {space.features && space.features.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {space.features.map((feature, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Features Tab */}
              {activeTab === "features" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Features */}
                  {venue.features && venue.features.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display italic mb-6">Venue Features & Amenities</h2>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {venue.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                          >
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cuisines */}
                  {venue.cuisineTypes && venue.cuisineTypes.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display italic mb-6">Cuisine Options</h2>
                      <div className="flex flex-wrap gap-3">
                        {venue.cuisineTypes.map((cuisine, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-white border border-border rounded-full text-foreground flex items-center gap-2 hover:border-primary transition-colors"
                          >
                            <Utensils className="w-4 h-4 text-primary" />
                            {cuisine}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Logistics Tab - How to Reach */}
              {activeTab === "logistics" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Address */}
                  {venue.address && (
                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-2xl border border-primary/10">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Full Address</h3>
                          <p className="text-muted-foreground">{venue.address}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Travel Options */}
                  <div>
                    <h2 className="text-2xl font-display italic mb-6">Getting There</h2>
                    <div className="grid gap-4">
                      {/* From Airport */}
                      <div className="p-6 bg-white rounded-2xl border border-border">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Plane className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">
                              From {venue.nearestAirport}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              Distance: {venue.distanceFromAirport}
                            </p>
                            {venue.drivingDirections?.fromAirport && (
                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Navigation className="w-4 h-4 text-primary" />
                                  <span className="text-sm font-medium">Driving Directions</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {venue.drivingDirections.fromAirport}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* From Railway */}
                      {venue.nearestRailway && (
                        <div className="p-6 bg-white rounded-2xl border border-border">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Train className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-1">
                                From {venue.nearestRailway}
                              </h3>
                              {venue.distanceFromRailway && (
                                <p className="text-sm text-muted-foreground mb-3">
                                  Distance: {venue.distanceFromRailway}
                                </p>
                              )}
                              {venue.drivingDirections?.fromRailway && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Navigation className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium">Driving Directions</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {venue.drivingDirections.fromRailway}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* From City Center */}
                      {venue.drivingDirections?.fromCityCenter && (
                        <div className="p-6 bg-white rounded-2xl border border-border">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Car className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-1">
                                From {venue.city} City Center
                              </h3>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Navigation className="w-4 h-4 text-primary" />
                                  <span className="text-sm font-medium">Driving Directions</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {venue.drivingDirections.fromCityCenter}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Landmarks */}
                  {venue.drivingDirections?.landmarks && venue.drivingDirections.landmarks.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display italic mb-6">Nearby Landmarks</h2>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {venue.drivingDirections.landmarks.map((landmark, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-border"
                          >
                            <Landmark className="w-5 h-5 text-primary" />
                            <span className="text-foreground">{landmark}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Parking Info */}
                  {venue.drivingDirections?.parkingInfo && (
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-border">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <ParkingCircle className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Parking Information</h3>
                          <p className="text-muted-foreground">{venue.drivingDirections.parkingInfo}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Best Seasons */}
                  {venue.bestSeasons && venue.bestSeasons.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display italic mb-6">Best Time to Visit</h2>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                          {venue.bestSeasons.map((season, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-full text-foreground flex items-center gap-2"
                            >
                              <Calendar className="w-4 h-4 text-orange-500" />
                              {season}
                            </span>
                          ))}
                        </div>
                        {venue.weatherNote && (
                          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="flex items-start gap-3">
                              <Sun className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <p className="text-blue-900">{venue.weatherNote}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Policies Tab */}
              {activeTab === "policies" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-display italic mb-6">Wedding Policies</h2>

                  <div className="grid gap-4">
                    {/* Alcohol Policy */}
                    {venue.alcoholPolicy && (
                      <div className="p-5 bg-white rounded-2xl border border-border">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Wine className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Alcohol Policy</h3>
                            <p className="text-muted-foreground text-sm">{venue.alcoholPolicy}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Music Policy */}
                    {venue.musicPolicy && (
                      <div className="p-5 bg-white rounded-2xl border border-border">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Music className="w-5 h-5 text-pink-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Music & DJ Policy</h3>
                            <p className="text-muted-foreground text-sm">{venue.musicPolicy}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Decor Policy */}
                    {venue.decorPolicy && (
                      <div className="p-5 bg-white rounded-2xl border border-border">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Palette className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Decoration Policy</h3>
                            <p className="text-muted-foreground text-sm">{venue.decorPolicy}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cancellation Policy */}
                    {venue.cancellationPolicy && (
                      <div className="p-5 bg-white rounded-2xl border border-border">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Cancellation Policy</h3>
                            <p className="text-muted-foreground text-sm">{venue.cancellationPolicy}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment Terms */}
                    {venue.paymentTerms && (
                      <div className="p-5 bg-white rounded-2xl border border-border">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CreditCard className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Payment Terms</h3>
                            <p className="text-muted-foreground text-sm">{venue.paymentTerms}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Security Deposit */}
                    {venue.securityDeposit && (
                      <div className="p-5 bg-white rounded-2xl border border-border">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Security Deposit</h3>
                            <p className="text-muted-foreground text-sm">{venue.securityDeposit}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Policy Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${venue.outsideVendorsAllowed ? 'bg-green-100' : 'bg-red-100'}`}>
                        {venue.outsideVendorsAllowed ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <X className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">Outside Vendors</p>
                      <p className="text-sm font-medium">{venue.outsideVendorsAllowed ? 'Allowed' : 'Not Allowed'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${venue.exclusiveUseAvailable ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {venue.exclusiveUseAvailable ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <X className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">Exclusive Use</p>
                      <p className="text-sm font-medium">{venue.exclusiveUseAvailable ? 'Available' : 'Not Available'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${venue.weddingCoordinator ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {venue.weddingCoordinator ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <X className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">In-house Coordinator</p>
                      <p className="text-sm font-medium">{venue.weddingCoordinator ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${venue.helipadAvailable ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {venue.helipadAvailable ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <X className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">Helipad</p>
                      <p className="text-sm font-medium">{venue.helipadAvailable ? 'Available' : 'Not Available'}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* FAQs Tab */}
              {activeTab === "faqs" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-display italic mb-6">Frequently Asked Questions</h2>

                  {venue.faqs && venue.faqs.length > 0 ? (
                    <div className="space-y-3">
                      {venue.faqs.map((faq, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl border border-border overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            className="w-full p-5 flex items-start justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <HelpCircle className="w-4 h-4 text-primary" />
                              </div>
                              <span className="font-medium text-foreground">{faq.question}</span>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                                expandedFaq === index ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {expandedFaq === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="px-5 pb-5 pl-16">
                                  <p className="text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Have questions? Contact us directly for detailed information.
                      </p>
                      <button
                        onClick={handleWhatsAppInquiry}
                        className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-medium inline-flex items-center gap-2 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Ask on WhatsApp
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Gallery */}
              {venue.galleryImages && venue.galleryImages.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display italic mb-6">Photo Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {venue.galleryImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                      >
                        <Image
                          src={image || "/images/venues/placeholder.jpg"}
                          alt={`${venue.name} - Image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Lead Capture Form */}
                <LeadCaptureForm
                  variant="sidebar"
                  heading={`Inquire About ${venue.name}`}
                  subheading="Get pricing and availability"
                  ctaText="Get Free Quote"
                  source={`venue-${venue.slug}`}
                />

                {/* Quick Contact Options */}
                <div className="bg-accent rounded-2xl p-6">
                  <p className="text-sm text-muted-foreground mb-4">Prefer to talk directly?</p>
                  <div className="space-y-3">
                    <button
                      onClick={handleWhatsAppInquiry}
                      className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp Inquiry
                    </button>
                    <a
                      href="tel:+919869829673"
                      className="w-full px-6 py-3 bg-white border border-border hover:border-primary text-foreground rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="w-5 h-5 text-primary" />
                      +91 98698 29673
                    </a>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/10 p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Venue</h3>
                  <div className="space-y-4">
                    {venue.phone && (
                      <a
                        href={`tel:${venue.phone}`}
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-5 h-5 text-primary" />
                        <span>{venue.phone}</span>
                      </a>
                    )}
                    {venue.email && (
                      <a
                        href={`mailto:${venue.email}`}
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors break-all"
                      >
                        <Mail className="w-5 h-5 text-primary" />
                        <span className="text-sm">{venue.email}</span>
                      </a>
                    )}
                    {venue.website && (
                      <a
                        href={venue.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                      >
                        <Globe className="w-5 h-5 text-primary" />
                        <span>Visit Website</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Ratings Card */}
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h3 className="text-lg font-semibold mb-4">Ratings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Google</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold">{venue.googleRating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">TripAdvisor</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-green-500 fill-green-500" />
                        <span className="font-bold">{venue.tripAdvisorRating}</span>
                      </div>
                    </div>
                    {venue.weddingWireRating && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">WeddingWire</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-pink-500 fill-pink-500" />
                          <span className="font-bold">{venue.weddingWireRating}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Map Preview */}
                {venue.coordinates && (
                  <div className="bg-white rounded-2xl border border-border overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${venue.coordinates.lng}!3d${venue.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDM0JzMzLjYiTiA3M8KwNDAnNTQuOCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{venue.city}, {venue.state}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev !== null ? (prev - 1 + venue.galleryImages.length) % venue.galleryImages.length : null
                );
              }}
              className="absolute left-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev !== null ? (prev + 1) % venue.galleryImages.length : null
                );
              }}
              className="absolute right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-5xl aspect-[16/10] mx-4">
              <Image
                src={venue.galleryImages[selectedImage] || "/images/venues/placeholder.jpg"}
                alt={`${venue.name} - Image ${selectedImage + 1}`}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {selectedImage + 1} / {venue.galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#221015] to-[#3a1a25]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display italic text-white mb-3 sm:mb-4">
            Ready to Start Planning?
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-6 sm:mb-8">
            Let us help you create an unforgettable celebration at {venue.name}
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-white/70 text-xs sm:text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Free Consultation
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Best Price Guarantee
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              200+ Weddings
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={handleWhatsAppInquiry}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Chat on WhatsApp
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-white/90 text-primary rounded-full font-semibold flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              Schedule Consultation
            </Link>
          </div>

          <p className="text-white/50 text-xs sm:text-sm mt-4 sm:mt-6">
            Or call us at <a href="tel:+919869829673" className="text-white/70 hover:text-white underline">+91 98698 29673</a>
          </p>
        </div>
      </section>
    </div>
  );
}
