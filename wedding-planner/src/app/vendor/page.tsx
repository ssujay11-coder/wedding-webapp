"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Plus,
  Edit2,
  Eye,
  EyeOff,
  Star,
  MapPin,
  Users,
  IndianRupee,
  Calendar,
  TrendingUp,
  MessageSquare,
  Clock,
  ChevronRight,
  Settings,
  Bell,
  LogOut,
  BarChart3,
  Image as ImageIcon,
  Phone,
  Mail,
  Globe,
  Check,
  X,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface VenueStats {
  totalViews: number;
  totalInquiries: number;
  totalShortlisted: number;
  avgRating: number;
  totalReviews: number;
}

interface Venue {
  id: string;
  name: string;
  slug: string;
  category: string;
  city: string;
  state: string;
  cover_image_url: string;
  price_per_plate_veg: number;
  capacity_max: number;
  rating: number;
  total_reviews: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
}

interface Inquiry {
  id: string;
  venue_id: string;
  venue_name: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  event_date: string;
  guest_count: number;
  message: string;
  status: "new" | "contacted" | "converted" | "closed";
  created_at: string;
}

export default function VendorDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<VenueStats>({
    totalViews: 0,
    totalInquiries: 0,
    totalShortlisted: 0,
    avgRating: 0,
    totalReviews: 0,
  });
  const [activeTab, setActiveTab] = useState<"overview" | "venues" | "inquiries" | "analytics">("overview");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login?redirect=/vendor");
      return;
    }

    // Check if user is a vendor
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const userProfile = profile as { role?: string } | null;
    if (!userProfile || userProfile.role !== "vendor") {
      router.push("/dashboard");
      return;
    }

    setUser({ ...user, ...userProfile });
    fetchVendorData(user.id);
  };

  const fetchVendorData = async (userId: string) => {
    setLoading(true);
    try {
      // Fetch vendor's venues
      const { data: venuesData, error: venuesError } = await supabase
        .from("venues")
        .select("*")
        .eq("vendor_id", userId)
        .order("created_at", { ascending: false });

      if (venuesError) throw venuesError;
      const typedVenues = (venuesData || []) as Venue[];
      setVenues(typedVenues);

      // Calculate stats
      const totalReviews = typedVenues.reduce((sum, v) => sum + (v.total_reviews || 0), 0);
      const avgRating = typedVenues.length
        ? typedVenues.reduce((sum, v) => sum + (v.rating || 0), 0) / typedVenues.length
        : 0;

      setStats({
        totalViews: Math.floor(Math.random() * 10000) + 1000, // Placeholder
        totalInquiries: Math.floor(Math.random() * 100) + 10,
        totalShortlisted: Math.floor(Math.random() * 50) + 5,
        avgRating: avgRating,
        totalReviews: totalReviews,
      });

      // Fetch inquiries (placeholder data)
      setInquiries([
        {
          id: "1",
          venue_id: typedVenues[0]?.id || "",
          venue_name: typedVenues[0]?.name || "Your Venue",
          user_name: "Priya Sharma",
          user_email: "priya@email.com",
          user_phone: "+91 98765 43210",
          event_date: "2025-03-15",
          guest_count: 300,
          message: "Looking for a royal wedding setup for my daughter's wedding.",
          status: "new",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          venue_id: typedVenues[0]?.id || "",
          venue_name: typedVenues[0]?.name || "Your Venue",
          user_name: "Rahul Mehta",
          user_email: "rahul@email.com",
          user_phone: "+91 87654 32109",
          event_date: "2025-04-20",
          guest_count: 500,
          message: "Interested in hosting a grand reception ceremony.",
          status: "contacted",
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ]);
    } catch (err) {
      console.error(err);
      setError("Failed to load vendor data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const toggleVenueActive = async (venue: Venue) => {
    try {
      const { error } = await (supabase
        .from("venues") as any)
        .update({ is_active: !venue.is_active })
        .eq("id", venue.id);

      if (error) throw error;
      setSuccess(`Venue ${venue.is_active ? "deactivated" : "activated"} successfully`);
      fetchVendorData(user.id);
    } catch (err) {
      setError("Failed to update venue");
    }
  };

  const updateInquiryStatus = async (inquiryId: string, status: Inquiry["status"]) => {
    // In production, this would update the database
    setInquiries(prev =>
      prev.map(inq =>
        inq.id === inquiryId ? { ...inq, status } : inq
      )
    );
    setSuccess("Inquiry status updated");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-purple-50/30 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-purple-50/30 to-stone-100">
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

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-stone-200 p-6 hidden lg:block">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-lg text-stone-800">Vendor Portal</h1>
            <p className="text-xs text-stone-500">Manage your listings</p>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "venues", label: "My Venues", icon: Building2 },
            { id: "inquiries", label: "Inquiries", icon: MessageSquare },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id
                  ? "bg-purple-50 text-purple-700"
                  : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Link
            href="/vendor/settings"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:bg-stone-50 transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-serif text-stone-800">
              Welcome back, {user?.full_name || "Vendor"}
            </h1>
            <p className="text-stone-600">Here&apos;s what&apos;s happening with your venues</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors">
              <Bell className="w-5 h-5 text-stone-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <Link
              href="/vendor/add-venue"
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Venue
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-stone-800">{stats.totalViews.toLocaleString()}</p>
                <p className="text-sm text-stone-500">Total Views</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-stone-800">{stats.totalInquiries}</p>
                <p className="text-sm text-stone-500">Inquiries</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-pink-700" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-stone-800">{stats.totalShortlisted}</p>
                <p className="text-sm text-stone-500">Shortlisted</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-stone-800">{stats.avgRating.toFixed(1)}</p>
                <p className="text-sm text-stone-500">Avg Rating</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-purple-700" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-stone-800">{venues.length}</p>
                <p className="text-sm text-stone-500">My Venues</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Inquiries */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-stone-800">Recent Inquiries</h2>
                <button
                  onClick={() => setActiveTab("inquiries")}
                  className="text-purple-600 text-sm hover:underline flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {inquiries.slice(0, 3).map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">
                      {inquiry.user_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-800">{inquiry.user_name}</p>
                      <p className="text-sm text-stone-500 truncate">{inquiry.message}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-stone-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(inquiry.event_date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {inquiry.guest_count} guests
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        inquiry.status === "new"
                          ? "bg-blue-100 text-blue-700"
                          : inquiry.status === "contacted"
                          ? "bg-amber-100 text-amber-700"
                          : inquiry.status === "converted"
                          ? "bg-green-100 text-green-700"
                          : "bg-stone-100 text-stone-700"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Venues Quick View */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-stone-800">My Venues</h2>
                <button
                  onClick={() => setActiveTab("venues")}
                  className="text-purple-600 text-sm hover:underline flex items-center gap-1"
                >
                  Manage <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {venues.length === 0 ? (
                  <div className="text-center py-8">
                    <Building2 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                    <p className="text-stone-500">No venues yet</p>
                    <Link
                      href="/vendor/add-venue"
                      className="inline-flex items-center gap-1 text-purple-600 text-sm mt-2 hover:underline"
                    >
                      <Plus className="w-4 h-4" /> Add your first venue
                    </Link>
                  </div>
                ) : (
                  venues.slice(0, 3).map((venue) => (
                    <div
                      key={venue.id}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors"
                    >
                      <div className="w-16 h-12 rounded-lg overflow-hidden relative bg-stone-100">
                        {venue.cover_image_url ? (
                          <Image
                            src={venue.cover_image_url}
                            alt={venue.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-stone-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-stone-800 truncate">{venue.name}</p>
                        <p className="text-sm text-stone-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {venue.city}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            venue.is_active ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <span className="text-sm text-stone-500">
                          {venue.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "venues" && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-stone-800">My Venues ({venues.length})</h2>
                <Link
                  href="/vendor/add-venue"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Venue
                </Link>
              </div>
            </div>

            {venues.length === 0 ? (
              <div className="text-center py-16">
                <Building2 className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-stone-600 mb-2">No venues yet</h3>
                <p className="text-stone-500 mb-4">Start by adding your first venue</p>
                <Link
                  href="/vendor/add-venue"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Venue
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {venues.map((venue) => (
                  <div
                    key={venue.id}
                    className="p-6 hover:bg-stone-50/50 transition-colors"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-32 h-24 rounded-xl overflow-hidden relative bg-stone-100 flex-shrink-0">
                        {venue.cover_image_url ? (
                          <Image
                            src={venue.cover_image_url}
                            alt={venue.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-stone-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-medium text-stone-800">{venue.name}</h3>
                            <p className="text-stone-500 flex items-center gap-1.5 mt-1">
                              <MapPin className="w-4 h-4" />
                              {venue.city}, {venue.state}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {venue.is_featured && (
                              <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3" /> Featured
                              </span>
                            )}
                            <span
                              className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                venue.is_active
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {venue.is_active ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 mt-4 text-sm">
                          <span className="flex items-center gap-1.5 text-stone-600">
                            <IndianRupee className="w-4 h-4" />
                            {formatCurrency(venue.price_per_plate_veg)}/plate
                          </span>
                          <span className="flex items-center gap-1.5 text-stone-600">
                            <Users className="w-4 h-4" />
                            Up to {venue.capacity_max} guests
                          </span>
                          <span className="flex items-center gap-1.5 text-stone-600">
                            <Star className="w-4 h-4 text-amber-500" />
                            {venue.rating?.toFixed(1) || "N/A"} ({venue.total_reviews || 0} reviews)
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                          <Link
                            href={`/vendor/venues/${venue.id}/edit`}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </Link>
                          <button
                            onClick={() => toggleVenueActive(venue)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                              venue.is_active
                                ? "text-red-600 hover:bg-red-50"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                          >
                            {venue.is_active ? (
                              <>
                                <EyeOff className="w-4 h-4" /> Deactivate
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4" /> Activate
                              </>
                            )}
                          </button>
                          <Link
                            href={`/venues/${venue.slug}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                            target="_blank"
                          >
                            <Globe className="w-4 h-4" />
                            View Live
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "inquiries" && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-200">
              <h2 className="text-lg font-medium text-stone-800">Inquiries ({inquiries.length})</h2>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-16">
                <MessageSquare className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-stone-600 mb-2">No inquiries yet</h3>
                <p className="text-stone-500">Inquiries from potential clients will appear here</p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-700 font-medium text-lg">
                        {inquiry.user_name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-stone-800">{inquiry.user_name}</h3>
                            <p className="text-sm text-stone-500">For: {inquiry.venue_name}</p>
                          </div>
                          <select
                            value={inquiry.status}
                            onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value as any)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border-0 cursor-pointer ${
                              inquiry.status === "new"
                                ? "bg-blue-100 text-blue-700"
                                : inquiry.status === "contacted"
                                ? "bg-amber-100 text-amber-700"
                                : inquiry.status === "converted"
                                ? "bg-green-100 text-green-700"
                                : "bg-stone-100 text-stone-700"
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>

                        <p className="mt-3 text-stone-600">{inquiry.message}</p>

                        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                          <span className="flex items-center gap-1.5 text-stone-500">
                            <Calendar className="w-4 h-4" />
                            Event: {formatDate(inquiry.event_date)}
                          </span>
                          <span className="flex items-center gap-1.5 text-stone-500">
                            <Users className="w-4 h-4" />
                            {inquiry.guest_count} guests
                          </span>
                          <span className="flex items-center gap-1.5 text-stone-500">
                            <Clock className="w-4 h-4" />
                            Received: {formatDate(inquiry.created_at)}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          <a
                            href={`mailto:${inquiry.user_email}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            Email
                          </a>
                          <a
                            href={`tel:${inquiry.user_phone}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-800 mb-6">Analytics</h2>
            <div className="text-center py-16">
              <TrendingUp className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-stone-600 mb-2">Coming Soon</h3>
              <p className="text-stone-500">
                Detailed analytics with views, conversion rates, and performance insights
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-2 lg:hidden z-40">
        <div className="flex items-center justify-around">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "venues", label: "Venues", icon: Building2 },
            { id: "inquiries", label: "Inquiries", icon: MessageSquare },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                activeTab === item.id
                  ? "text-purple-700"
                  : "text-stone-500"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
