"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plane, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DestinationManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-12 px-6 text-center bg-accent">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="w-6 h-6 text-primary" />
            <span className="text-sm uppercase tracking-widest text-primary">Destination Management</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display italic text-foreground mb-6">Multi-City Logistics</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Seamless coordination for guests arriving from around the globe. We handle travel, accommodation, and curated local experiences.
          </p>
        </motion.div>
      </section>
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display italic mb-6">Specialized Logistics Management</h2>
          <p className="text-lg text-muted-foreground mb-8">Perfect for destination weddings with guests traveling from multiple locations.</p>
          <Link href="/contact">
            <Button className="bg-primary text-white hover:bg-primary/90 text-lg px-10 py-6 rounded-full">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
