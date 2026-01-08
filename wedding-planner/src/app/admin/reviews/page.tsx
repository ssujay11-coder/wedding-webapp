'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Star,
  Check,
  X,
  Eye,
  Calendar,
  MapPin,
  Users,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  AlertCircle
} from 'lucide-react';

interface Review {
  id: string;
  reviewer_name: string;
  reviewer_email?: string;
  reviewer_city?: string;
  venue_id?: string;
  destination_id?: string;
  review_type: string;
  rating: number;
  title?: string;
  content: string;
  rating_venue?: number;
  rating_food?: number;
  rating_service?: number;
  rating_value?: number;
  rating_ambiance?: number;
  pros?: string[];
  cons?: string[];
  wedding_date?: string;
  wedding_type?: string;
  guest_count?: number;
  events_hosted?: string[];
  photos?: string[];
  status: string;
  admin_notes?: string;
  created_at: string;
  venue?: { name: string; slug: string };
  destination?: { name: string; slug: string };
}

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500/20 text-yellow-400' },
  { value: 'approved', label: 'Approved', color: 'bg-green-500/20 text-green-400' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-500/20 text-red-400' },
  { value: 'flagged', label: 'Flagged', color: 'bg-orange-500/20 text-orange-400' }
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchReviews();
  }, [statusFilter]);

  async function fetchReviews() {
    try {
      let query = (supabase as any)
        .from('reviews')
        .select(`
          *,
          venue:venues(name, slug),
          destination:destinations(name, slug)
        `)
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateReviewStatus(id: string, status: string) {
    try {
      const { error } = await (supabase as any)
        .from('reviews')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setReviews(prev =>
        prev.map(rev => rev.id === id ? { ...rev, status } : rev)
      );

      if (selectedReview?.id === id) {
        setSelectedReview(prev => prev ? { ...prev, status } : null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  const getStatusColor = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option?.color || 'bg-gray-500/20 text-gray-400';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'
            }`}
          />
        ))}
      </div>
    );
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
      <div>
        <h1 className="text-2xl font-bold text-white">Reviews</h1>
        <p className="text-white/60 mt-1">
          Moderate and manage customer reviews
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === 'all'
              ? 'bg-white/20 text-white'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          All ({reviews.length})
        </button>
        {statusOptions.map(option => {
          const count = statusFilter === 'all'
            ? reviews.filter(r => r.status === option.value).length
            : option.value === statusFilter ? reviews.length : 0;
          return (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === option.value
                  ? option.color.replace('/20', '/40')
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-medium">
                      {review.reviewer_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{review.reviewer_name}</p>
                      <p className="text-white/50 text-sm">
                        {review.reviewer_city && `${review.reviewer_city} • `}
                        {formatDate(review.created_at)}
                      </p>
                    </div>
                    <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </div>

                  {/* Rating & Title */}
                  <div className="flex items-center gap-3 mb-2">
                    {renderStars(review.rating)}
                    {review.title && (
                      <span className="text-white font-medium">{review.title}</span>
                    )}
                  </div>

                  {/* Venue/Destination */}
                  {(review.venue || review.destination) && (
                    <p className="text-white/60 text-sm mb-2">
                      <span className="capitalize">{review.review_type}</span>:{' '}
                      <span className="text-rose-400">
                        {review.venue?.name || review.destination?.name}
                      </span>
                    </p>
                  )}

                  {/* Content */}
                  <p className="text-white/80 line-clamp-3">{review.content}</p>

                  {/* Wedding Details */}
                  {(review.wedding_date || review.guest_count) && (
                    <div className="flex items-center gap-4 mt-3 text-sm text-white/50">
                      {review.wedding_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(review.wedding_date)}
                        </span>
                      )}
                      {review.guest_count && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {review.guest_count} guests
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setSelectedReview(review);
                      setShowDetail(true);
                    }}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4 text-white/60" />
                  </button>
                  {review.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateReviewStatus(review.id, 'approved')}
                        className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                        title="Approve"
                      >
                        <Check className="w-4 h-4 text-green-400" />
                      </button>
                      <button
                        onClick={() => updateReviewStatus(review.id, 'rejected')}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                        title="Reject"
                      >
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#111] border border-white/10 rounded-xl p-12 text-center">
            <Star className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No reviews found</p>
            <p className="text-white/40 text-sm mt-1">
              {statusFilter === 'pending'
                ? 'No reviews pending approval'
                : 'Reviews will appear here when customers submit them'}
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetail && selectedReview && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setShowDetail(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-[#111] border-l border-white/10 z-50 overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Review Details</h2>
              <button
                onClick={() => setShowDetail(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Reviewer Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white text-xl font-medium">
                  {selectedReview.reviewer_name.charAt(0)}
                </div>
                <div>
                  <p className="text-xl font-semibold text-white">{selectedReview.reviewer_name}</p>
                  <p className="text-white/50">{selectedReview.reviewer_city || 'Location not provided'}</p>
                  {selectedReview.reviewer_email && (
                    <p className="text-white/50 text-sm">{selectedReview.reviewer_email}</p>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-3">Overall Rating</h3>
                <div className="flex items-center gap-3">
                  {renderStars(selectedReview.rating)}
                  <span className="text-2xl font-bold text-white">{selectedReview.rating}/5</span>
                </div>
              </div>

              {/* Detailed Ratings */}
              {(selectedReview.rating_venue || selectedReview.rating_food) && (
                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-3">Detailed Ratings</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedReview.rating_venue && (
                      <div className="bg-white/5 p-3 rounded-lg">
                        <p className="text-xs text-white/40">Venue</p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(selectedReview.rating_venue)}
                        </div>
                      </div>
                    )}
                    {selectedReview.rating_food && (
                      <div className="bg-white/5 p-3 rounded-lg">
                        <p className="text-xs text-white/40">Food</p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(selectedReview.rating_food)}
                        </div>
                      </div>
                    )}
                    {selectedReview.rating_service && (
                      <div className="bg-white/5 p-3 rounded-lg">
                        <p className="text-xs text-white/40">Service</p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(selectedReview.rating_service)}
                        </div>
                      </div>
                    )}
                    {selectedReview.rating_value && (
                      <div className="bg-white/5 p-3 rounded-lg">
                        <p className="text-xs text-white/40">Value</p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(selectedReview.rating_value)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Review Content */}
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-3">Review</h3>
                {selectedReview.title && (
                  <p className="text-lg font-semibold text-white mb-2">{selectedReview.title}</p>
                )}
                <p className="text-white/80 whitespace-pre-wrap">{selectedReview.content}</p>
              </div>

              {/* Pros & Cons */}
              {((selectedReview.pros?.length ?? 0) > 0 || (selectedReview.cons?.length ?? 0) > 0) && (
                <div className="grid grid-cols-2 gap-4">
                  {(selectedReview.pros?.length ?? 0) > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4" /> Pros
                      </h3>
                      <ul className="space-y-1">
                        {selectedReview.pros?.map((pro, i) => (
                          <li key={i} className="text-white/70 text-sm">• {pro}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(selectedReview.cons?.length ?? 0) > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-red-400 mb-2 flex items-center gap-2">
                        <ThumbsDown className="w-4 h-4" /> Cons
                      </h3>
                      <ul className="space-y-1">
                        {selectedReview.cons?.map((con, i) => (
                          <li key={i} className="text-white/70 text-sm">• {con}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Status Actions */}
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-3">Status</h3>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateReviewStatus(selectedReview.id, option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedReview.status === option.value
                          ? option.color
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
