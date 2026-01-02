import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface AdminNotificationEmailProps {
  name: string;
  email: string;
  phone: string;
  weddingDate?: string;
  destination?: string;
  guestCount?: string;
  budget?: string;
  message: string;
  submittedAt: string;
}

export default function AdminNotificationEmail({
  name,
  email,
  phone,
  weddingDate,
  destination,
  guestCount,
  budget,
  message,
  submittedAt,
}: AdminNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Wedding Inquiry from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src="https://eliteweddingplanner.in/images/logo.png"
              width="60"
              height="60"
              alt="Elite Wedding Planner"
            />
          </Section>

          {/* Heading */}
          <Heading style={h1}>🎉 New Wedding Inquiry</Heading>

          <Text style={urgentText}>A new inquiry has been submitted. Please respond within 24 hours.</Text>

          {/* Client Details */}
          <Section style={detailsSection}>
            <Heading style={h2}>Client Information</Heading>
            <table style={table}>
              <tr>
                <td style={tableLabel}>Name:</td>
                <td style={tableValue}>{name}</td>
              </tr>
              <tr>
                <td style={tableLabel}>Email:</td>
                <td style={tableValue}>
                  <Link href={`mailto:${email}`} style={link}>
                    {email}
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={tableLabel}>Phone:</td>
                <td style={tableValue}>
                  <Link href={`tel:${phone}`} style={link}>
                    {phone}
                  </Link>
                </td>
              </tr>
              {weddingDate && (
                <tr>
                  <td style={tableLabel}>Wedding Date:</td>
                  <td style={tableValue}>{weddingDate}</td>
                </tr>
              )}
              {destination && (
                <tr>
                  <td style={tableLabel}>Destination:</td>
                  <td style={tableValue}>{destination}</td>
                </tr>
              )}
              {guestCount && (
                <tr>
                  <td style={tableLabel}>Guest Count:</td>
                  <td style={tableValue}>{guestCount}</td>
                </tr>
              )}
              {budget && (
                <tr>
                  <td style={tableLabel}>Budget:</td>
                  <td style={tableValue}>{budget}</td>
                </tr>
              )}
              <tr>
                <td style={tableLabel}>Submitted:</td>
                <td style={tableValue}>{submittedAt}</td>
              </tr>
            </table>
          </Section>

          {/* Message */}
          <Section style={messageSection}>
            <Heading style={h2}>Client Message</Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Link href={`mailto:${email}?subject=Re: Your Wedding Inquiry`} style={button}>
              Reply to Client
            </Link>
          </Section>

          {/* Footer */}
          <Text style={footer}>
            This inquiry was submitted via eliteweddingplanner.in contact form
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f8f6f6',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
};

const logoSection = {
  textAlign: 'center' as const,
  marginBottom: '32px',
};

const h1 = {
  color: '#ee2b5b',
  fontSize: '28px',
  fontWeight: '700',
  textAlign: 'center' as const,
  margin: '0 0 16px',
};

const h2 = {
  color: '#181113',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px',
};

const urgentText = {
  color: '#d4af37',
  fontSize: '14px',
  fontWeight: '600',
  textAlign: 'center' as const,
  margin: '0 0 24px',
  padding: '12px',
  backgroundColor: '#fffbf0',
  borderRadius: '6px',
};

const detailsSection = {
  padding: '24px',
  backgroundColor: '#fcf8f9',
  borderRadius: '8px',
  margin: '24px 0',
};

const table = {
  width: '100%',
};

const tableLabel = {
  color: '#888',
  fontSize: '14px',
  padding: '8px 0',
  fontWeight: '600',
  width: '140px',
};

const tableValue = {
  color: '#181113',
  fontSize: '14px',
  padding: '8px 0',
};

const messageSection = {
  margin: '24px 0',
  padding: '24px',
  backgroundColor: '#f8f6f6',
  borderRadius: '8px',
  borderLeft: '4px solid #ee2b5b',
};

const messageText = {
  color: '#181113',
  fontSize: '15px',
  lineHeight: '24px',
  margin: 0,
  whiteSpace: 'pre-wrap' as const,
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#ee2b5b',
  borderRadius: '50px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
};

const footer = {
  color: '#888',
  fontSize: '12px',
  lineHeight: '20px',
  textAlign: 'center' as const,
  margin: '32px 0 8px',
};

const link = {
  color: '#ee2b5b',
  textDecoration: 'none',
};
