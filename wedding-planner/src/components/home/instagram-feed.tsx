"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function InstagramFeed() {
  const instagramPosts = [
    {
      image: "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/udaipur-wedding-planner.webp",
      alt: "Udaipur palace wedding setup",
    },
    {
      image: "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/goa-wedding-planner.webp",
      alt: "Goa beach wedding ceremony",
    },
    {
      image: "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/jaipur-wedding-planner.webp",
      alt: "Jaipur royal wedding décor",
    },
    {
      image: "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp",
      alt: "Luxury wedding mandap design",
    },
    {
      image: "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/wedding-planner-india.webp",
      alt: "Indian wedding celebration",
    },
    {
      image: "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/destination-wedding-planner.webp",
      alt: "Destination wedding planning",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-primary" />
            <span className="text-primary text-sm font-bold tracking-widest uppercase">
              @eliteweddingplanner
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display italic text-foreground">
            Follow Our Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Get daily inspiration and behind-the-scenes glimpses of our latest weddings
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={index}
              href="https://instagram.com/eliteweddingplanner"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="https://instagram.com/eliteweddingplanner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <Instagram className="w-5 h-5" />
            Follow on Instagram
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
