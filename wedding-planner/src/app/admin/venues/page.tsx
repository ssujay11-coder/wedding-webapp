'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  MapPin,
  Users,
  Building2,
  ChevronDown,
  X,
  Check,
  Image as ImageIcon,
  Globe,
  Phone,
  Mail,
  ExternalLink,
  MoreVertical
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Venue {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  category: string;
  star_rating: number;
  google_rating: number;
  starting_price: string;
  guest_capacity_min: number;
  guest_capacity_max: number;
  hero_image_url: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const categories = [
  'Palace Hotel',
  'Beach Resort',
  'Heritage Hotel',
  'Luxury Hotel',
  'Boutique Hotel',
  'Fort Hotel',
  'Lake Resort',
  'Hill Resort',
  'Destination Resort'
];

export default function AdminVenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const supabase = createClient();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    city: '',
    state: '',
    category: 'Palace Hotel',
    star_rating: 5,
    google_rating: 4.5,
    starting_price: '',
    guest_capacity_min: 50,
    guest_capacity_max: 500,
    hero_image_url: '',
    is_featured: false,
    is_active: true
  });

  useEffect(() => {
    fetchVenues();
  }, [categoryFilter]);

  async function fetchVenues() {
    try {
      let query = supabase
        .from('venues')
        .select('*')
        .order('created_at', { ascending: false });

      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase error:', error);
        // If venues table doesn't exist, show empty
        setVenues([]);
      } else {
        setVenues(data || []);
      }
    } catch (error) {
      console.error('Error fetching venues:', error);
      setVenues([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveVenue() {
    try {
      const venueData = {
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        updated_at: new Date().toISOString()
      };

      if (editingVenue) {
        const { error } = await (supabase
          .from('venues') as any)
          .update(venueData)
          .eq('id', editingVenue.id);

        if (error) throw error;

        setVenues(prev =>
          prev.map(v => v.id === editingVenue.id ? { ...v, ...venueData } : v)
        );
      } else {
        const { data, error } = await (supabase
          .from('venues') as any)
          .insert([{ ...venueData, created_at: new Date().toISOString() }])
          .select()
          .single();

        if (error) throw error;

        setVenues(prev => [data as Venue, ...prev]);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving venue:', error);
      alert('Error saving venue. Please try again.');
    }
  }

  async function handleDeleteVenue(id: string) {
    try {
      const { error } = await supabase
        .from('venues')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setVenues(prev => prev.filter(v => v.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting venue:', error);
      alert('Error deleting venue. Please try again.');
    }
  }

  async function toggleFeatured(id: string, current: boolean) {
    try {
      const { error } = await (supabase
        .from('venues') as any)
        .update({ is_featured: !current, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setVenues(prev =>
        prev.map(v => v.id === id ? { ...v, is_featured: !current } : v)
      );
    } catch (error) {
      console.error('Error updating venue:', error);
    }
  }

  async function toggleActive(id: string, current: boolean) {
    try {
      const { error } = await (supabase
        .from('venues') as any)
        .update({ is_active: !current, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setVenues(prev =>
        prev.map(v => v.id === id ? { ...v, is_active: !current } : v)
      );
    } catch (error) {
      console.error('Error updating venue:', error);
    }
  }

  function resetForm() {
    setFormData({
      name: '',
      slug: '',
      city: '',
      state: '',
      category: 'Palace Hotel',
      star_rating: 5,
      google_rating: 4.5,
      starting_price: '',
      guest_capacity_min: 50,
      guest_capacity_max: 500,
      hero_image_url: '',
      is_featured: false,
      is_active: true
    });
    setEditingVenue(null);
    setShowAddModal(false);
  }

  function openEditModal(venue: Venue) {
    setFormData({
      name: venue.name,
      slug: venue.slug,
      city: venue.city,
      state: venue.state,
      category: venue.category,
      star_rating: venue.star_rating,
      google_rating: venue.google_rating,
      starting_price: venue.starting_price,
      guest_capacity_min: venue.guest_capacity_min,
      guest_capacity_max: venue.guest_capacity_max,
      hero_image_url: venue.hero_image_url,
      is_featured: venue.is_featured,
      is_active: venue.is_active
    });
    setEditingVenue(venue);
    setShowAddModal(true);
  }

  const filteredVenues = venues.filter(venue =>
    venue.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.state?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Venues</h1>
          <p className="text-white/60 mt-1">
            Manage wedding venue listings
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Venue
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-rose-500/50 transition-colors"
          />
        </div>

        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white focus:outline-none focus:border-rose-500/50 transition-colors cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#111] border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold text-white">{venues.length}</p>
          <p className="text-sm text-white/60">Total Venues</p>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold text-white">{venues.filter(v => v.is_active).length}</p>
          <p className="text-sm text-white/60">Active</p>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold text-white">{venues.filter(v => v.is_featured).length}</p>
          <p className="text-sm text-white/60">Featured</p>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold text-white">{new Set(venues.map(v => v.city)).size}</p>
          <p className="text-sm text-white/60">Cities</p>
        </div>
      </div>

      {/* Venues Grid */}
      {filteredVenues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] bg-white/5">
                {venue.hero_image_url ? (
                  <Image
                    src={venue.hero_image_url}
                    alt={venue.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-12 h-12 text-white/20" />
                  </div>
                )}
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {venue.is_featured && (
                    <span className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  )}
                  {!venue.is_active && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex gap-1">
                  <Link
                    href={`/venues/${venue.slug}`}
                    target="_blank"
                    className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-white">{venue.name}</h3>
                    <div className="flex items-center gap-1 mt-1 text-white/60 text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>{venue.city}, {venue.state}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-white font-medium">{venue.google_rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full">
                    {venue.category}
                  </span>
                  <span className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full">
                    {venue.star_rating} Star
                  </span>
                  <span className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {venue.guest_capacity_min}-{venue.guest_capacity_max}
                  </span>
                </div>

                {venue.starting_price && (
                  <p className="mt-3 text-rose-400 font-medium">{venue.starting_price}</p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => openEditModal(venue)}
                    className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => toggleFeatured(venue.id, venue.is_featured)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      venue.is_featured
                        ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                    title={venue.is_featured ? 'Remove from Featured' : 'Add to Featured'}
                  >
                    <Star className={`w-4 h-4 ${venue.is_featured ? 'fill-amber-400' : ''}`} />
                  </button>
                  <button
                    onClick={() => toggleActive(venue.id, venue.is_active)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      venue.is_active
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    }`}
                    title={venue.is_active ? 'Deactivate' : 'Activate'}
                  >
                    {venue.is_active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(venue.id)}
                    className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#111] border border-white/10 rounded-xl p-12 text-center">
          <Building2 className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/60">No venues found</p>
          <p className="text-white/40 text-sm mt-1">
            {searchTerm ? 'Try adjusting your search' : 'Add your first venue to get started'}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Venue
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={resetForm}
          />
          <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-[#111] border border-white/10 rounded-xl z-50 overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#111]">
              <h2 className="text-lg font-semibold text-white">
                {editingVenue ? 'Edit Venue' : 'Add New Venue'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Venue Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Taj Lake Palace"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-rose-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="taj-lake-palace-udaipur"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-rose-500/50"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Udaipur"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-rose-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="Rajasthan"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-rose-500/50"
                  />
                </div>
              </div>

              {/* Category & Ratings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rose-500/50"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Star Rating</label>
                  <select
                    value={formData.star_rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, star_rating: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rose-500/50"
                  >
                    <option value={3}>3 Star</option>
                    <option value={4}>4 Star</option>
                    <option value={5}>5 Star</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Google Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.google_rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, google_rating: parseFloat(e.target.value) }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rose-500/50"
                  />
                </div>
              </div>

              {/* Capacity & Price */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Min Guests</label>
                  <input
                    type="number"
                    value={formData.guest_capacity_min}
                    onChange={(e) => setFormData(prev => ({ ...prev, guest_capacity_min: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rose-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Max Guests</label>
                  <input
                    type="number"
                    value={formData.guest_capacity_max}
                    onChange={(e) => setFormData(prev => ({ ...prev, guest_capacity_max: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rose-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Starting Price</label>
                  <input
                    type="text"
                    value={formData.starting_price}
                    onChange={(e) => setFormData(prev => ({ ...prev, starting_price: e.target.value }))}
                    placeholder="₹25,00,000+"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-rose-500/50"
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Hero Image URL</label>
                <input
                  type="url"
                  value={formData.hero_image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, hero_image_url: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-rose-500/50"
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-rose-500 focus:ring-rose-500/20"
                  />
                  <span className="text-white/80">Featured Venue</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-rose-500 focus:ring-rose-500/20"
                  />
                  <span className="text-white/80">Active</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={handleSaveVenue}
                  disabled={!formData.name || !formData.city || !formData.state}
                  className="flex-1 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:bg-white/10 disabled:text-white/40 text-white rounded-lg font-medium transition-colors"
                >
                  {editingVenue ? 'Save Changes' : 'Add Venue'}
                </button>
                <button
                  onClick={resetForm}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#111] border border-white/10 rounded-xl z-50 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Venue?</h3>
            <p className="text-white/60 mb-6">
              This action cannot be undone. The venue will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteVenue(deleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
