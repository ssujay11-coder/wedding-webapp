'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  ChevronDown,
  X,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  partner1_name?: string;
  partner2_name?: string;
  wedding_date?: string;
  wedding_city?: string;
  guest_count?: number;
  budget_range?: string;
  message?: string;
  source_type?: string;
  source_page?: string;
  status: string;
  priority: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

const statusOptions = [
  { value: 'new', label: 'New', color: 'bg-blue-500/20 text-blue-400' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-500/20 text-yellow-400' },
  { value: 'qualified', label: 'Qualified', color: 'bg-purple-500/20 text-purple-400' },
  { value: 'proposal_sent', label: 'Proposal Sent', color: 'bg-orange-500/20 text-orange-400' },
  { value: 'negotiating', label: 'Negotiating', color: 'bg-cyan-500/20 text-cyan-400' },
  { value: 'won', label: 'Won', color: 'bg-green-500/20 text-green-400' },
  { value: 'lost', label: 'Lost', color: 'bg-red-500/20 text-red-400' },
  { value: 'spam', label: 'Spam', color: 'bg-gray-500/20 text-gray-400' }
];

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'text-gray-400' },
  { value: 'normal', label: 'Normal', color: 'text-white' },
  { value: 'high', label: 'High', color: 'text-orange-400' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-400' }
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  async function fetchInquiries() {
    try {
      let query = (supabase as any)
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateInquiryStatus(id: string, status: string) {
    try {
      const { error } = await (supabase as any)
        .from('inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setInquiries(prev =>
        prev.map(inq => inq.id === id ? { ...inq, status } : inq)
      );

      if (selectedInquiry?.id === id) {
        setSelectedInquiry(prev => prev ? { ...prev, status } : null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  async function updateInquiryNotes(id: string, notes: string) {
    try {
      const { error } = await (supabase as any)
        .from('inquiries')
        .update({ notes, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setInquiries(prev =>
        prev.map(inq => inq.id === id ? { ...inq, notes } : inq)
      );
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  }

  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.phone?.includes(searchTerm) ||
    inquiry.wedding_city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option?.color || 'bg-gray-500/20 text-gray-400';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatWeddingDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

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
          <h1 className="text-2xl font-bold text-white">Inquiries</h1>
          <p className="text-white/60 mt-1">
            Manage and respond to customer inquiries
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-rose-500/50 transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white focus:outline-none focus:border-rose-500/50 transition-colors cursor-pointer"
          >
            <option value="all">All Status</option>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {statusOptions.map(option => {
          const count = inquiries.filter(i => i.status === option.value).length;
          return (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === option.value
                  ? option.color.replace('/20', '/40')
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {option.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Inquiries List */}
      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        {filteredInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Lead</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Wedding Details</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Budget</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Source</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedInquiry(inquiry);
                      setShowDetail(true);
                    }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">{inquiry.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3 text-white/40" />
                          <span className="text-white/60 text-sm">{inquiry.email}</span>
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center gap-2 mt-0.5">
                            <Phone className="w-3 h-3 text-white/40" />
                            <span className="text-white/60 text-sm">{inquiry.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {inquiry.wedding_city && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-white/40" />
                            <span className="text-white/80 text-sm">{inquiry.wedding_city}</span>
                          </div>
                        )}
                        {inquiry.guest_count && (
                          <div className="flex items-center gap-2">
                            <Users className="w-3 h-3 text-white/40" />
                            <span className="text-white/60 text-sm">{inquiry.guest_count} guests</span>
                          </div>
                        )}
                        {inquiry.wedding_date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-white/40" />
                            <span className="text-white/60 text-sm">{formatWeddingDate(inquiry.wedding_date)}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white/80">{inquiry.budget_range || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white/60 text-sm capitalize">
                        {inquiry.source_type || 'direct'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={inquiry.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateInquiryStatus(inquiry.id, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer focus:outline-none ${getStatusColor(inquiry.status)}`}
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-white/60 text-sm whitespace-nowrap">
                      {formatDate(inquiry.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${inquiry.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4 text-white/60" />
                        </a>
                        {inquiry.phone && (
                          <a
                            href={`tel:${inquiry.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            title="Call"
                          >
                            <Phone className="w-4 h-4 text-white/60" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No inquiries found</p>
            <p className="text-white/40 text-sm mt-1">
              {searchTerm ? 'Try adjusting your search terms' : 'Inquiries will appear here when visitors submit forms'}
            </p>
          </div>
        )}
      </div>

      {/* Detail Sidebar */}
      {showDetail && selectedInquiry && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setShowDetail(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-[#111] border-l border-white/10 z-50 overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Inquiry Details</h2>
              <button
                onClick={() => setShowDetail(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xl font-semibold text-white">{selectedInquiry.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-white/40" />
                    <a href={`mailto:${selectedInquiry.email}`} className="text-rose-400 hover:text-rose-300">
                      {selectedInquiry.email}
                    </a>
                  </div>
                  {selectedInquiry.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-white/40" />
                      <a href={`tel:${selectedInquiry.phone}`} className="text-white/80 hover:text-white">
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Wedding Details */}
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-3">Wedding Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedInquiry.wedding_city && (
                    <div className="bg-white/5 p-3 rounded-lg">
                      <p className="text-xs text-white/40">Location</p>
                      <p className="text-white mt-1">{selectedInquiry.wedding_city}</p>
                    </div>
                  )}
                  {selectedInquiry.wedding_date && (
                    <div className="bg-white/5 p-3 rounded-lg">
                      <p className="text-xs text-white/40">Date</p>
                      <p className="text-white mt-1">{formatWeddingDate(selectedInquiry.wedding_date)}</p>
                    </div>
                  )}
                  {selectedInquiry.guest_count && (
                    <div className="bg-white/5 p-3 rounded-lg">
                      <p className="text-xs text-white/40">Guest Count</p>
                      <p className="text-white mt-1">{selectedInquiry.guest_count}</p>
                    </div>
                  )}
                  {selectedInquiry.budget_range && (
                    <div className="bg-white/5 p-3 rounded-lg">
                      <p className="text-xs text-white/40">Budget</p>
                      <p className="text-white mt-1">{selectedInquiry.budget_range}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              {selectedInquiry.message && (
                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-3">Message</h3>
                  <p className="text-white/80 bg-white/5 p-4 rounded-lg whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </p>
                </div>
              )}

              {/* Status */}
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-3">Status</h3>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateInquiryStatus(selectedInquiry.id, option.value)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedInquiry.status === option.value
                          ? option.color
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-3">Internal Notes</h3>
                <textarea
                  value={selectedInquiry.notes || ''}
                  onChange={(e) => {
                    setSelectedInquiry(prev => prev ? { ...prev, notes: e.target.value } : null);
                  }}
                  onBlur={(e) => updateInquiryNotes(selectedInquiry.id, e.target.value)}
                  placeholder="Add notes about this inquiry..."
                  className="w-full h-32 p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-rose-500/50 resize-none"
                />
              </div>

              {/* Meta Info */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Received</span>
                  <span className="text-white/60">{formatDate(selectedInquiry.created_at)}</span>
                </div>
                {selectedInquiry.source_type && (
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-white/40">Source</span>
                    <span className="text-white/60 capitalize">{selectedInquiry.source_type}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
