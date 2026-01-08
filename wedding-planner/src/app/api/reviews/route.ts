import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      reviewer_name,
      reviewer_email,
      reviewer_city,
      venue_id,
      destination_id,
      review_type,
      rating,
      title,
      content,
      rating_venue,
      rating_food,
      rating_service,
      rating_value,
      rating_ambiance,
      pros,
      cons,
      wedding_date,
      wedding_type,
      guest_count,
      events_hosted
    } = body;

    // Validate required fields
    if (!reviewer_name || !content || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields: reviewer_name, content, and rating are required' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          reviewer_name,
          reviewer_email: reviewer_email || null,
          reviewer_city: reviewer_city || null,
          venue_id: venue_id || null,
          destination_id: destination_id || null,
          review_type: review_type || 'planner',
          rating,
          title: title || null,
          content,
          rating_venue: rating_venue || null,
          rating_food: rating_food || null,
          rating_service: rating_service || null,
          rating_value: rating_value || null,
          rating_ambiance: rating_ambiance || null,
          pros: pros || null,
          cons: cons || null,
          wedding_date: wedding_date || null,
          wedding_type: wedding_type || null,
          guest_count: guest_count || null,
          events_hosted: events_hosted || null,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit review' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Review submitted successfully! It will be visible after approval.',
        reviewId: data?.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const venue_id = searchParams.get('venue_id');
    const destination_id = searchParams.get('destination_id');
    const review_type = searchParams.get('review_type');

    let query = supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (venue_id) {
      query = query.eq('venue_id', venue_id);
    }
    if (destination_id) {
      query = query.eq('destination_id', destination_id);
    }
    if (review_type) {
      query = query.eq('review_type', review_type);
    }

    const { data, error } = await query.limit(20);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reviews: data || [] });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
