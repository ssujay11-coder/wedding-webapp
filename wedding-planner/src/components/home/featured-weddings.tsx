"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function FeaturedWeddings() {
  const weddings = [
    {
      title: "Royal Lakeside Palace",
      location: "Udaipur, India",
      image: "/images/portfolio/palace-wedding-1.webp",
      size: "large",
    },
    {
      title: "Beachfront Elegance",
      location: "Goa, India",
      image: "/images/portfolio/beach-wedding-1.webp",
      size: "small",
    },
    {
      title: "Heritage Romance",
      location: "Jaipur, India",
      image: "/images/portfolio/heritage-wedding-1.webp",
      size: "small",
    },
  ];

  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display italic text-foreground">
              Featured Weddings
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/portfolio"
              className="group flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View Portfolio
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:h-[600px] md:grid-rows-2">
          {/* Main Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative col-span-1 h-[400px] overflow-hidden rounded-2xl sm:col-span-2 sm:h-auto md:row-span-2 group cursor-pointer"
          >
            <Image
              src={weddings[0].image}
              alt={weddings[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white z-10">
              <p className="text-xs uppercase tracking-widest mb-2 text-white/90">
                {weddings[0].location}
              </p>
              <h3 className="font-display text-3xl md:text-4xl italic">
                {weddings[0].title}
              </h3>
            </div>
          </motion.div>

          {/* Side Images */}
          {weddings.slice(1).map((wedding, index) => (
            <motion.div
              key={wedding.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative h-[300px] overflow-hidden rounded-2xl sm:h-auto group cursor-pointer"
            >
              <Image
                src={wedding.image}
                alt={wedding.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs uppercase tracking-widest mb-1">
                  {wedding.location}
                </p>
                <h4 className="font-display text-xl italic">{wedding.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
