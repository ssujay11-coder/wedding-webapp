import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import InquiryConfirmationEmail from '../../../../emails/inquiry-confirmation';
import AdminNotificationEmail from '../../../../emails/admin-notification';

const resendApiKey = process.env.RESEND_API_KEY || 'dummy_key_for_build';
const resend = new Resend(resendApiKey);

// Initialize Supabase client with service role for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, weddingDate, destination, guestCount, budget, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // Send confirmation email to client
    const clientEmail = await resend.emails.send({
      from: 'Elite Wedding Planner <hello@eliteweddingplanner.in>',
      to: [email],
      subject: 'Thank You for Your Inquiry - Elite Wedding Planner',
      react: InquiryConfirmationEmail({
        name,
        email,
        phone,
        weddingDate,
        message,
      }),
    });

    // Send notification to admin
    const adminEmail = await resend.emails.send({
      from: 'Website Inquiries <inquiries@eliteweddingplanner.in>',
      to: ['sales@eliteweddingplanner.in'],
      subject: `New Wedding Inquiry from ${name}`,
      react: AdminNotificationEmail({
        name,
        email,
        phone,
        weddingDate,
        destination,
        guestCount,
        budget,
        message,
        submittedAt,
      }),
    });

    // Store inquiry in Supabase
    let inquiryId = null;
    if (supabase) {
      try {
        const { data: inquiryData, error: dbError } = await supabase
          .from('inquiries')
          .insert([
            {
              name,
              email,
              phone,
              wedding_date: weddingDate || null,
              wedding_city: destination || null,
              guest_count: guestCount ? parseInt(guestCount) : null,
              budget_range: budget || null,
              message,
              source_type: 'contact',
              source_page: request.headers.get('referer') || null,
              status: 'new',
              priority: 'normal',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select('id')
          .single();

        if (dbError) {
          console.error('Supabase error:', dbError);
        } else {
          inquiryId = inquiryData?.id;
        }
      } catch (dbErr) {
        console.error('Database error:', dbErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry sent successfully',
        clientEmailId: clientEmail.data?.id,
        adminEmailId: adminEmail.data?.id,
        inquiryId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending inquiry:', error);
    return NextResponse.json(
      {
        error: 'Failed to send inquiry',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
