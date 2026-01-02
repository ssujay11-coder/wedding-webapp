"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DesignStylingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-12 px-6 text-center bg-accent">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="w-6 h-6 text-primary" />
            <span className="text-sm uppercase tracking-widest text-primary">Design & Styling</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display italic text-foreground mb-6">Award-Winning Creative</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Curating a cohesive visual narrative through florals, lighting, linens, and bespoke installations that reflect your essence.
          </p>
        </motion.div>
      </section>
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display italic mb-6">Bespoke Design Concepts</h2>
          <p className="text-lg text-muted-foreground mb-8">From concept to execution, we create stunning visual experiences tailored to your style.</p>
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
