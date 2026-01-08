import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Please login to shortlist venues' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { venue_id, notes, event_type } = body;

    if (!venue_id) {
      return NextResponse.json(
        { error: 'Venue ID is required' },
        { status: 400 }
      );
    }

    // Check if already shortlisted
    const { data: existing } = await (supabase as any)
      .from('shortlists')
      .select('id')
      .eq('user_id', user.id)
      .eq('venue_id', venue_id)
      .single();

    if (existing) {
      // Remove from shortlist (toggle)
      const { error } = await (supabase as any)
        .from('shortlists')
        .delete()
        .eq('id', existing.id);

      if (error) throw error;

      return NextResponse.json({
        success: true,
        action: 'removed',
        message: 'Venue removed from shortlist'
      });
    }

    // Add to shortlist
    const { data, error } = await (supabase as any)
      .from('shortlists')
      .insert([
        {
          user_id: user.id,
          venue_id,
          notes: notes || null,
          event_type: event_type || null,
          status: 'shortlisted',
          created_at: new Date().toISOString()
        }
      ])
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      action: 'added',
      message: 'Venue added to shortlist',
      shortlistId: data?.id
    });
  } catch (error) {
    console.error('Shortlist error:', error);
    return NextResponse.json(
      { error: 'Failed to update shortlist' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Please login to view shortlist' },
        { status: 401 }
      );
    }

    const { data, error } = await (supabase as any)
      .from('shortlists')
      .select(`
        *,
        venue:venues(
          id,
          name,
          slug,
          city,
          state,
          hero_image_url,
          rating,
          review_count,
          starting_price,
          max_guest_capacity,
          total_rooms
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ shortlist: data || [] });
  } catch (error) {
    console.error('Error fetching shortlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shortlist' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Please login to manage shortlist' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const venue_id = searchParams.get('venue_id');

    if (!venue_id) {
      return NextResponse.json(
        { error: 'Venue ID is required' },
        { status: 400 }
      );
    }

    const { error } = await (supabase as any)
      .from('shortlists')
      .delete()
      .eq('user_id', user.id)
      .eq('venue_id', venue_id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Venue removed from shortlist'
    });
  } catch (error) {
    console.error('Error removing from shortlist:', error);
    return NextResponse.json(
      { error: 'Failed to remove from shortlist' },
      { status: 500 }
    );
  }
}
