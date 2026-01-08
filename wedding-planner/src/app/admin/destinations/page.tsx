"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  MapPin,
  Calendar,
  Globe,
  X,
  Check,
  AlertCircle,
  Image as ImageIcon,
  ChevronDown,
  Filter,
  Eye,
  EyeOff,
  Plane,
  IndianRupee,
} from "lucide-react";
import Image from "next/image";

interface Destination {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string | null;
  country: string;
  tagline: string;
  hero_title: string;
  description: string;
  hero_image_url: string;
  gallery_images: string[];
  best_season: string;
  best_months: string[];
  avg_budget_min: number;
  avg_budget_max: number;
  total_venues: number;
  is_featured: boolean;
  is_international: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const emptyDestination: Partial<Destination> = {
  name: "",
  slug: "",
  city: "",
  state: "",
  country: "India",
  tagline: "",
  hero_title: "",
  description: "",
  hero_image_url: "",
  gallery_images: [],
  best_season: "",
  best_months: [],
  avg_budget_min: 1000000,
  avg_budget_max: 10000000,
  total_venues: 0,
  is_featured: false,
  is_international: false,
  sort_order: 99,
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "featured" | "international" | "domestic">("all");
  const [showModal, setShowModal] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Partial<Destination> | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setDestinations(data || []);
    } catch (err) {
      setError("Failed to fetch destinations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingDestination?.name || !editingDestination?.slug) {
      setError("Name and slug are required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const destinationData = {
        ...editingDestination,
        slug: editingDestination.slug?.toLowerCase().replace(/\s+/g, "-"),
        updated_at: new Date().toISOString(),
      };

      if (editingDestination.id) {
        // Update existing
        const { error } = await (supabase
          .from("destinations") as any)
          .update(destinationData)
          .eq("id", editingDestination.id);

        if (error) throw error;
        setSuccess("Destination updated successfully");
      } else {
        // Create new
        const { error } = await (supabase
          .from("destinations") as any)
          .insert([{ ...destinationData, created_at: new Date().toISOString() }]);

        if (error) throw error;
        setSuccess("Destination created successfully");
      }

      setShowModal(false);
      setEditingDestination(null);
      fetchDestinations();
    } catch (err: any) {
      setError(err.message || "Failed to save destination");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("destinations").delete().eq("id", id);

      if (error) throw error;
      setSuccess("Destination deleted successfully");
      setDeleteConfirm(null);
      fetchDestinations();
    } catch (err: any) {
      setError(err.message || "Failed to delete destination");
    }
  };

  const toggleFeatured = async (destination: Destination) => {
    try {
      const { error } = await (supabase
        .from("destinations") as any)
        .update({ is_featured: !destination.is_featured })
        .eq("id", destination.id);

      if (error) throw error;
      fetchDestinations();
    } catch (err) {
      setError("Failed to update destination");
    }
  };

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === "featured") return matchesSearch && dest.is_featured;
    if (filterType === "international") return matchesSearch && dest.is_international;
    if (filterType === "domestic") return matchesSearch && !dest.is_international;
    return matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const stats = {
    total: destinations.length,
    featured: destinations.filter((d) => d.is_featured).length,
    international: destinations.filter((d) => d.is_international).length,
    domestic: destinations.filter((d) => !d.is_international).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 p-6">
      {/* Notifications */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-xl shadow-lg"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
            <button onClick={() => setError(null)} className="ml-2">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg"
          >
            <Check className="w-5 h-5" />
            {success}
            <button onClick={() => setSuccess(null)} className="ml-2">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-stone-800 mb-2">Destination Management</h1>
        <p className="text-stone-600">Manage wedding destinations across India and internationally</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <Globe className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-stone-800">{stats.total}</p>
              <p className="text-sm text-stone-500">Total Destinations</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-700" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-stone-800">{stats.featured}</p>
              <p className="text-sm text-stone-500">Featured</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Plane className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-stone-800">{stats.international}</p>
              <p className="text-sm text-stone-500">International</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-stone-800">{stats.domestic}</p>
              <p className="text-sm text-stone-500">Domestic</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
          >
            <Filter className="w-5 h-5 text-stone-500" />
            <span className="capitalize">{filterType}</span>
            <ChevronDown className="w-4 h-4 text-stone-400" />
          </button>
          {showFilterDropdown && (
            <div className="absolute top-full mt-2 right-0 bg-white border border-stone-200 rounded-xl shadow-lg z-10 min-w-[160px]">
              {["all", "featured", "international", "domestic"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilterType(type as any);
                    setShowFilterDropdown(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left hover:bg-stone-50 first:rounded-t-xl last:rounded-b-xl capitalize ${
                    filterType === type ? "bg-amber-50 text-amber-700" : "text-stone-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingDestination({ ...emptyDestination });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Destination
        </motion.button>
      </div>

      {/* Destinations Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
              <div className="aspect-[16/10] bg-stone-200 rounded-xl mb-4" />
              <div className="h-6 bg-stone-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-stone-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredDestinations.length === 0 ? (
        <div className="text-center py-16">
          <Globe className="w-16 h-16 text-stone-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-stone-600 mb-2">No destinations found</h3>
          <p className="text-stone-500">
            {searchTerm ? "Try adjusting your search" : "Add your first destination to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl hover:border-amber-200 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {destination.hero_image_url ? (
                    <Image
                      src={destination.hero_image_url}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-stone-400" />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {destination.is_featured && (
                      <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" /> Featured
                      </span>
                    )}
                    {destination.is_international && (
                      <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                        <Plane className="w-3 h-3" /> International
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleFeatured(destination)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        destination.is_featured
                          ? "bg-amber-500 text-white"
                          : "bg-white/90 text-stone-600 hover:bg-amber-500 hover:text-white"
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingDestination(destination);
                        setShowModal(true);
                      }}
                      className="w-8 h-8 rounded-full bg-white/90 text-stone-600 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(destination.id)}
                      className="w-8 h-8 rounded-full bg-white/90 text-stone-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Bottom Info */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-xl font-serif text-white mb-1">{destination.name}</h3>
                    <p className="text-white/80 text-sm flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {destination.city}, {destination.country}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-stone-600 text-sm mb-3 line-clamp-2">{destination.tagline}</p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-stone-500">
                      <Calendar className="w-4 h-4" />
                      <span>{destination.best_season}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-500">
                      <MapPin className="w-4 h-4" />
                      <span>{destination.total_venues} venues</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-stone-500">
                      <IndianRupee className="w-4 h-4" />
                      <span>
                        {formatCurrency(destination.avg_budget_min)} - {formatCurrency(destination.avg_budget_max)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && editingDestination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
                <h2 className="text-xl font-serif text-stone-800">
                  {editingDestination.id ? "Edit Destination" : "Add New Destination"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Destination Name *
                    </label>
                    <input
                      type="text"
                      value={editingDestination.name || ""}
                      onChange={(e) =>
                        setEditingDestination({
                          ...editingDestination,
                          name: e.target.value,
                          slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                        })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      placeholder="e.g., Udaipur"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      value={editingDestination.slug || ""}
                      onChange={(e) =>
                        setEditingDestination({ ...editingDestination, slug: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      placeholder="e.g., udaipur"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">City</label>
                    <input
                      type="text"
                      value={editingDestination.city || ""}
                      onChange={(e) =>
                        setEditingDestination({ ...editingDestination, city: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      placeholder="e.g., Udaipur"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      State/Region
                    </label>
                    <input
                      type="text"
                      value={editingDestination.state || ""}
                      onChange={(e) =>
                        setEditingDestination({ ...editingDestination, state: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      placeholder="e.g., Rajasthan"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Country</label>
                    <input
                      type="text"
                      value={editingDestination.country || ""}
                      onChange={(e) =>
                        setEditingDestination({ ...editingDestination, country: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      placeholder="e.g., India"
                    />
                  </div>

                  {/* Best Season */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Best Season
                    </label>
                    <input
                      type="text"
                      value={editingDestination.best_season || ""}
                      onChange={(e) =>
                        setEditingDestination({ ...editingDestination, best_season: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      placeholder="e.g., October - March"
                    />
                  </div>

                  {/* Tagline - Full Width */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Tagline</label>
                    <input
                      type="text"
                      value={editingDestination.tagline || ""}
                      onChange={(e) =>
                        setEditingDestination({ ...editingDestination, tagline: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      placeholder="e.g., The Venice of the East"
                    />
                  </div>

                  {/* Hero Title - Full Width */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      value={editingDestination.hero_title || ""}
                      onChange={(e) =>
                        setEditingDestination({ ...editingDestination, hero_title: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      placeholder="e.g., Where Royal Dreams Float on Shimmering Lakes"
                    />
                  </div>

                  {/* Description - Full Width */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Description
                    </label>
                    <textarea
                      value={editingDestination.description || ""}
                      onChange={(e) =>
                        setEditingDestination({ ...editingDestination, description: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                      placeholder="Describe this destination..."
                    />
                  </div>

                  {/* Hero Image URL */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Hero Image URL
                    </label>
                    <input
                      type="url"
                      value={editingDestination.hero_image_url || ""}
                      onChange={(e) =>
                        setEditingDestination({
                          ...editingDestination,
                          hero_image_url: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      placeholder="https://..."
                    />
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Min Budget (₹)
                    </label>
                    <input
                      type="number"
                      value={editingDestination.avg_budget_min || 0}
                      onChange={(e) =>
                        setEditingDestination({
                          ...editingDestination,
                          avg_budget_min: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Max Budget (₹)
                    </label>
                    <input
                      type="number"
                      value={editingDestination.avg_budget_max || 0}
                      onChange={(e) =>
                        setEditingDestination({
                          ...editingDestination,
                          avg_budget_max: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  {/* Total Venues & Sort Order */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Total Venues
                    </label>
                    <input
                      type="number"
                      value={editingDestination.total_venues || 0}
                      onChange={(e) =>
                        setEditingDestination({
                          ...editingDestination,
                          total_venues: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={editingDestination.sort_order || 0}
                      onChange={(e) =>
                        setEditingDestination({
                          ...editingDestination,
                          sort_order: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  {/* Best Months */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Best Months
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {months.map((month) => (
                        <button
                          key={month}
                          type="button"
                          onClick={() => {
                            const currentMonths = editingDestination.best_months || [];
                            const newMonths = currentMonths.includes(month)
                              ? currentMonths.filter((m) => m !== month)
                              : [...currentMonths, month];
                            setEditingDestination({
                              ...editingDestination,
                              best_months: newMonths,
                            });
                          }}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                            editingDestination.best_months?.includes(month)
                              ? "bg-amber-500 text-white"
                              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                          }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="md:col-span-2 flex flex-wrap gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingDestination.is_featured || false}
                        onChange={(e) =>
                          setEditingDestination({
                            ...editingDestination,
                            is_featured: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded border-stone-300 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-stone-700">Featured Destination</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingDestination.is_international || false}
                        onChange={(e) =>
                          setEditingDestination({
                            ...editingDestination,
                            is_international: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded border-stone-300 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-stone-700">International Destination</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-200 bg-stone-50">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-stone-600 hover:bg-stone-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      {editingDestination.id ? "Update" : "Create"} Destination
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-stone-800">Delete Destination?</h3>
                  <p className="text-stone-500 text-sm">This action cannot be undone.</p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
