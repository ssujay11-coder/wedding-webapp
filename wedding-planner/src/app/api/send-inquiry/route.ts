import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import InquiryConfirmationEmail from '../../../../emails/inquiry-confirmation';
import AdminNotificationEmail from '../../../../emails/admin-notification';

const resendApiKey = process.env.RESEND_API_KEY || 'dummy_key_for_build';
const resend = new Resend(resendApiKey);

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

    // Store inquiry in Supabase (optional)
    // const { data, error } = await supabase
    //   .from('inquiries')
    //   .insert([
    //     {
    //       name,
    //       email,
    //       phone,
    //       wedding_date: weddingDate,
    //       destination,
    //       guest_count: guestCount,
    //       budget,
    //       message,
    //       created_at: new Date().toISOString(),
    //     },
    //   ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry sent successfully',
        clientEmailId: clientEmail.data?.id,
        adminEmailId: adminEmail.data?.id,
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
