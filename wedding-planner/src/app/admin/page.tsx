'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  MessageSquare,
  Star,
  Building2,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalInquiries: number;
  newInquiries: number;
  totalReviews: number;
  pendingReviews: number;
  totalVenues: number;
  totalDestinations: number;
  inquiriesThisWeek: number;
  inquiriesLastWeek: number;
}

interface RecentInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  wedding_city: string;
  guest_count: number;
  budget_range: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInquiries: 0,
    newInquiries: 0,
    totalReviews: 0,
    pendingReviews: 0,
    totalVenues: 0,
    totalDestinations: 0,
    inquiriesThisWeek: 0,
    inquiriesLastWeek: 0
  });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      // Fetch inquiries stats
      const { count: totalInquiries } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });

      const { count: newInquiries } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      // Fetch reviews stats
      const { count: totalReviews } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true });

      const { count: pendingReviews } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Fetch venues and destinations counts
      const { count: totalVenues } = await supabase
        .from('venues')
        .select('*', { count: 'exact', head: true });

      const { count: totalDestinations } = await supabase
        .from('destinations')
        .select('*', { count: 'exact', head: true });

      // Fetch recent inquiries
      const { data: inquiries } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // Weekly comparison
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

      const { count: inquiriesThisWeek } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', oneWeekAgo.toISOString());

      const { count: inquiriesLastWeek } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', twoWeeksAgo.toISOString())
        .lt('created_at', oneWeekAgo.toISOString());

      setStats({
        totalInquiries: totalInquiries || 0,
        newInquiries: newInquiries || 0,
        totalReviews: totalReviews || 0,
        pendingReviews: pendingReviews || 0,
        totalVenues: totalVenues || 0,
        totalDestinations: totalDestinations || 0,
        inquiriesThisWeek: inquiriesThisWeek || 0,
        inquiriesLastWeek: inquiriesLastWeek || 0
      });

      setRecentInquiries(inquiries || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-500/20 text-blue-400',
      contacted: 'bg-yellow-500/20 text-yellow-400',
      qualified: 'bg-purple-500/20 text-purple-400',
      proposal_sent: 'bg-orange-500/20 text-orange-400',
      won: 'bg-green-500/20 text-green-400',
      lost: 'bg-red-500/20 text-red-400'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const weeklyChange = stats.inquiriesLastWeek > 0
    ? ((stats.inquiriesThisWeek - stats.inquiriesLastWeek) / stats.inquiriesLastWeek * 100).toFixed(0)
    : stats.inquiriesThisWeek > 0 ? '100' : '0';

  const isPositiveChange = parseInt(weeklyChange) >= 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/60 mt-1">
          Welcome back! Here&apos;s what&apos;s happening with your wedding platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              {isPositiveChange ? (
                <ArrowUpRight className="w-4 h-4 text-green-400" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-400" />
              )}
              <span className={isPositiveChange ? 'text-green-400' : 'text-red-400'}>
                {weeklyChange}%
              </span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-white">{stats.totalInquiries}</p>
            <p className="text-sm text-white/60 mt-1">Total Inquiries</p>
          </div>
          {stats.newInquiries > 0 && (
            <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 bg-rose-500/20 text-rose-400 text-xs font-medium rounded-full">
              {stats.newInquiries} new
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-white">{stats.totalReviews}</p>
            <p className="text-sm text-white/60 mt-1">Total Reviews</p>
          </div>
          {stats.pendingReviews > 0 && (
            <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full">
              {stats.pendingReviews} pending approval
            </div>
          )}
        </div>

        {/* Venues */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-purple-400" />
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-white">{stats.totalVenues}</p>
            <p className="text-sm text-white/60 mt-1">Venues Listed</p>
          </div>
        </div>

        {/* Destinations */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-white">{stats.totalDestinations}</p>
            <p className="text-sm text-white/60 mt-1">Destinations</p>
          </div>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Inquiries</h2>
          <Link
            href="/admin/inquiries"
            className="text-sm text-rose-500 hover:text-rose-400 transition-colors"
          >
            View All
          </Link>
        </div>

        {recentInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Name</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Contact</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Wedding City</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Guests</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Budget</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{inquiry.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white/80 text-sm">{inquiry.email}</p>
                      <p className="text-white/50 text-xs">{inquiry.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-white/80">
                      {inquiry.wedding_city || '-'}
                    </td>
                    <td className="px-6 py-4 text-white/80">
                      {inquiry.guest_count || '-'}
                    </td>
                    <td className="px-6 py-4 text-white/80">
                      {inquiry.budget_range || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/60 text-sm">
                      {formatDate(inquiry.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No inquiries yet</p>
            <p className="text-white/40 text-sm mt-1">
              Inquiries will appear here when visitors submit the contact form
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/inquiries"
          className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-rose-500/50 transition-colors group"
        >
          <MessageSquare className="w-8 h-8 text-rose-500 mb-4" />
          <h3 className="text-lg font-semibold text-white group-hover:text-rose-400 transition-colors">
            Manage Inquiries
          </h3>
          <p className="text-white/60 text-sm mt-1">
            View and respond to customer inquiries
          </p>
        </Link>

        <Link
          href="/admin/reviews"
          className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-amber-500/50 transition-colors group"
        >
          <Star className="w-8 h-8 text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
            Moderate Reviews
          </h3>
          <p className="text-white/60 text-sm mt-1">
            Approve or reject customer reviews
          </p>
        </Link>

        <Link
          href="/admin/venues"
          className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-colors group"
        >
          <Building2 className="w-8 h-8 text-purple-500 mb-4" />
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
            Manage Venues
          </h3>
          <p className="text-white/60 text-sm mt-1">
            Add, edit, or remove venue listings
          </p>
        </Link>
      </div>
    </div>
  );
}
