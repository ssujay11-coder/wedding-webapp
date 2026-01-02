"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

export function ClientTestimonials() {
  const testimonials = [
    {
      name: "Priya & Arjun",
      location: "Udaipur, 2024",
      image: "/images/testimonials/couple-1.webp",
      quote:
        "Elite Wedding Planner transformed our vague ideas into a masterpiece. The team understood the cultural nuances of our fusion wedding perfectly. Every detail was executed flawlessly, from the lakeside ceremony to the royal reception.",
      rating: 5,
    },
    {
      name: "Sarah & Marco",
      location: "Goa, 2024",
      image: "/images/testimonials/couple-2.webp",
      quote:
        "Planning a destination wedding felt overwhelming until we found Elite. They handled everything—from guest logistics to beachfront décor—with grace and professionalism. Our guests are still raving about it!",
      rating: 5,
    },
    {
      name: "Aisha & Vikram",
      location: "Jaipur, 2023",
      image: "/images/testimonials/couple-3.webp",
      quote:
        "The design and execution were beyond our wildest dreams. Ruchita and her team brought our vision to life with exquisite taste and attention to detail. We couldn't have asked for a more perfect day.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-accent">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
          <span className="text-primary text-sm font-bold tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-display italic mt-4 text-foreground">
            Real Stories, Real Love
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Don't just take our word for it—hear from the couples who trusted us with their
            most important day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 text-center border border-transparent hover:border-primary/10"
            >
              {/* Image */}
              <div className="relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-primary/20 transition-all">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="112px"
                />
              </div>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground italic mb-6 leading-relaxed font-light">
                "{testimonial.quote}"
              </p>

              {/* Name & Location */}
              <div className="border-t border-border pt-6">
                <h4 className="font-display text-xl font-semibold text-foreground">
                  {testimonial.name}
                </h4>
                <span className="text-xs uppercase tracking-widest text-primary font-bold mt-1 block">
                  {testimonial.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/portfolio"
            className="inline-block text-primary hover:text-primary/80 font-semibold transition-colors border-b-2 border-primary/30 hover:border-primary pb-1"
          >
            View Full Portfolio & More Stories
          </a>
        </motion.div>
      </div>
    </section>
  );
}
