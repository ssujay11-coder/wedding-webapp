'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ShortlistButtonProps {
  venueId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function ShortlistButton({
  venueId,
  className = '',
  size = 'md',
  showText = false
}: ShortlistButtonProps) {
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createClient();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  useEffect(() => {
    checkShortlistStatus();
  }, [venueId]);

  async function checkShortlistStatus() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);

    const { data } = await supabase
      .from('shortlists')
      .select('id')
      .eq('user_id', user.id)
      .eq('venue_id', venueId)
      .single();

    setIsShortlisted(!!data);
  }

  async function toggleShortlist() {
    if (loading) return;

    if (!isLoggedIn) {
      // Redirect to login
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/shortlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ venue_id: venueId })
      });

      const data = await response.json();

      if (data.success) {
        setIsShortlisted(data.action === 'added');
      }
    } catch (error) {
      console.error('Error toggling shortlist:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleShortlist();
      }}
      disabled={loading}
      className={`
        ${showText ? 'px-4 py-2 gap-2' : sizeClasses[size]}
        flex items-center justify-center rounded-full
        transition-all duration-300
        ${isShortlisted
          ? 'bg-rose-500 text-white hover:bg-rose-600'
          : 'bg-black/40 backdrop-blur-sm text-white/80 hover:bg-black/60 hover:text-white'
        }
        ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      title={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
    >
      <Heart
        className={`
          ${iconSizes[size]}
          transition-all duration-300
          ${isShortlisted ? 'fill-current' : ''}
        `}
      />
      {showText && (
        <span className="text-sm font-medium">
          {isShortlisted ? 'Shortlisted' : 'Shortlist'}
        </span>
      )}
    </button>
  );
}

export default ShortlistButton;
