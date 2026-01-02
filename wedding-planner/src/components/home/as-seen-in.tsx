"use client";

import { motion } from "framer-motion";

export function AsSeenIn() {
  const publications = [
    { name: "VOGUE", style: "font-serif text-2xl italic" },
    { name: "BAZAAR", style: "font-sans text-xl font-bold tracking-tighter" },
    { name: "Brides", style: "font-serif text-xl font-bold uppercase" },
    { name: "Tatler", style: "font-serif text-xl italic" },
    { name: "ELLE", style: "font-sans text-lg font-light uppercase tracking-[0.2em]" },
  ];

  return (
    <section className="w-full border-b border-border bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground"
        >
          As Featured In
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 sm:justify-between sm:gap-12"
        >
          {publications.map((pub, index) => (
            <motion.span
              key={pub.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className={`${pub.style} text-foreground hover:text-primary transition-colors cursor-default`}
            >
              {pub.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
