import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection, StatsBar } from "@/components/home/hero-section";
import { AsSeenIn } from "@/components/home/as-seen-in";
import { PhilosophySection } from "@/components/home/features";
import { FeaturedWeddings } from "@/components/home/featured-weddings";
import { ServicesHighlight } from "@/components/home/services-highlight";
import { SignatureProcess } from "@/components/home/signature-process";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { DestinationsShowcase } from "@/components/home/destinations-showcase";
import { ClientTestimonials } from "@/components/home/client-testimonials";
import { CTASectionEnhanced } from "@/components/home/cta-section-enhanced";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { FloatingCTA, StickyMobileBar } from "@/components/ui/floating-cta";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-background selection:bg-primary/20">

      <Navbar />

      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Stats Bar */}
      <StatsBar />

      {/* Section 3: As Seen In (Authority) */}
      <AsSeenIn />

      {/* Main Content */}
      <main className="relative z-20">

        {/* Section 4: Philosophy */}
        <PhilosophySection />

        {/* Section 5: Featured Weddings */}
        <FeaturedWeddings />

        {/* Section 6: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 7: Services Highlight */}
        <ServicesHighlight />

        {/* Section 8: Signature Process */}
        <SignatureProcess />

        {/* Section 9: Destinations Showcase */}
        <DestinationsShowcase />

        {/* Section 10: Client Testimonials */}
        <ClientTestimonials />

        {/* Section 11: Call to Action with Lead Form */}
        <CTASectionEnhanced />

        {/* Section 12: Instagram Feed */}
        <InstagramFeed />

      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA - Desktop */}
      <FloatingCTA />

      {/* Sticky Mobile Bar */}
      <StickyMobileBar />
    </div>
  );
}
