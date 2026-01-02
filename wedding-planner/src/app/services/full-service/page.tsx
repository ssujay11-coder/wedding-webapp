"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FullServicePage() {
  const features = [
    "Complete venue sourcing and selection",
    "Vendor coordination and management",
    "Full design concept development",
    "Timeline and budget management",
    "Guest logistics and accommodation",
    "Pre-wedding event planning",
    "Ceremony and reception coordination",
    "Post-wedding farewell brunch"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12 px-6 text-center bg-accent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-sm uppercase tracking-widest text-primary">Full-Service Planning</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display italic text-foreground mb-6">
            12+ Months of Excellence
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From venue scouting to the final farewell brunch, we manage every logistical detail
            so you can remain present in the moment.
          </p>
        </motion.div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display italic mb-6">What's Included</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-primary/5 p-10 rounded-2xl">
              <h3 className="text-2xl font-display italic mb-4">Perfect For</h3>
              <p className="text-muted-foreground mb-6">
                Couples who want a completely hands-off experience and prefer to focus on enjoying
                their engagement while we handle every detail of the wedding planning process.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Starts 12-18 months before wedding</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Unlimited planning hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Complete vendor management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display italic mb-6">
            Ready to Start Planning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's create your dream wedding together.
          </p>
          <Link href="/contact">
            <Button className="bg-primary text-white hover:bg-primary/90 text-lg px-10 py-6 rounded-full">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
