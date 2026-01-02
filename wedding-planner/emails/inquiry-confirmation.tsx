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

interface InquiryConfirmationEmailProps {
  name: string;
  email: string;
  phone: string;
  weddingDate?: string;
  message: string;
}

export default function InquiryConfirmationEmail({
  name = 'Valued Client',
  email,
  phone,
  weddingDate,
  message,
}: InquiryConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for your inquiry - Elite Wedding Planner</Preview>
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
          <Heading style={h1}>Thank You, {name}!</Heading>

          <Text style={text}>
            We've received your inquiry and are thrilled at the possibility of being part of your
            special day.
          </Text>

          {/* Inquiry Details */}
          <Section style={detailsSection}>
            <Heading style={h2}>Your Inquiry Details</Heading>
            <Text style={detailText}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={detailText}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={detailText}>
              <strong>Phone:</strong> {phone}
            </Text>
            {weddingDate && (
              <Text style={detailText}>
                <strong>Wedding Date:</strong> {weddingDate}
              </Text>
            )}
            <Text style={detailText}>
              <strong>Message:</strong> {message}
            </Text>
          </Section>

          {/* Next Steps */}
          <Section style={nextStepsSection}>
            <Heading style={h2}>What Happens Next?</Heading>
            <Text style={text}>
              ✨ Our team will review your inquiry within 24-48 hours
              <br />
              📞 We'll reach out to schedule a consultation
              <br />
              💍 We'll discuss your vision and how we can bring it to life
            </Text>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Link href="https://eliteweddingplanner.in/portfolio" style={button}>
              View Our Portfolio
            </Link>
          </Section>

          {/* Footer */}
          <Text style={footer}>
            Elite Wedding Planner
            <br />
            Mumbai, India | 200+ Weddings | 14 Years of Excellence
            <br />
            <Link href="mailto:sales@eliteweddingplanner.in" style={link}>
              sales@eliteweddingplanner.in
            </Link>{' '}
            |{' '}
            <Link href="tel:+918169255519" style={link}>
              +91-8169255519
            </Link>
          </Text>

          <Text style={footer}>
            <Link href="https://instagram.com/eliteweddingplanner" style={link}>
              Instagram
            </Link>{' '}
            •{' '}
            <Link href="https://facebook.com/eliteweddingplanner" style={link}>
              Facebook
            </Link>{' '}
            •{' '}
            <Link href="https://eliteweddingplanner.in" style={link}>
              Website
            </Link>
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
  fontSize: '32px',
  fontWeight: '700',
  textAlign: 'center' as const,
  margin: '0 0 24px',
  fontFamily: 'Playfair Display, serif',
};

const h2 = {
  color: '#181113',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 16px',
};

const text = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px',
};

const detailsSection = {
  padding: '24px',
  backgroundColor: '#fcf8f9',
  borderRadius: '8px',
  margin: '24px 0',
};

const detailText = {
  color: '#181113',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};

const nextStepsSection = {
  margin: '32px 0',
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
