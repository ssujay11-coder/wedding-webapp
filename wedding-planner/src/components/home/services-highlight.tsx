"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, Plane, Palette, Clock, ArrowRight } from "lucide-react";

export function ServicesHighlight() {
  const services = [
    {
      icon: Heart,
      title: "Full-Service Planning",
      tagline: "12+ Months of Excellence",
      description:
        "From venue scouting to the final farewell brunch, we manage every logistical detail so you can remain present in the moment.",
      features: ["Venue Selection", "Vendor Coordination", "Design Concept", "Timeline Management"],
      href: "/services/full-service",
      image: "/images/gallery/ceremonies/ceremonies-073-tpl-stutidhruv-wedding-1051-hero.webp",
    },
    {
      icon: Plane,
      title: "Destination Management",
      tagline: "Multi-City Logistics",
      description:
        "Seamless coordination for guests arriving from around the globe. We handle travel, accommodation, and curated local experiences.",
      features: ["Travel Coordination", "Guest Logistics", "Hotel Blocks", "Welcome Events"],
      href: "/services/destination",
      image: "/images/gallery/couples/couples-023-sdak-3870-lg.webp",
    },
    {
      icon: Palette,
      title: "Design & Styling",
      tagline: "Award-Winning Creative",
      description:
        "Curating a cohesive visual narrative through florals, lighting, linens, and bespoke installations that reflect your essence.",
      features: ["Floral Design", "Décor Concepts", "Lighting Design", "Custom Installations"],
      href: "/services/design",
      image: "/images/gallery/decor/decor-022-pp-619-lg.webp",
    },
    {
      icon: Clock,
      title: "Day-Of Coordination",
      tagline: "Flawless Execution",
      description:
        "Expert oversight on your wedding day, ensuring every moment unfolds perfectly while you enjoy the celebration.",
      features: ["Timeline Execution", "Vendor Management", "Problem Solving", "Guest Flow"],
      href: "/services/day-of",
      image: "/images/gallery/entertainment/entertainment-004-mod-0365-lg.webp",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-bold tracking-widest uppercase">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-display italic mt-4 text-foreground">
            Comprehensive Wedding Services
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Whether you need full-service planning or expert coordination on the day, we tailor our
            services to bring your vision to life with sophistication and ease.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 group-hover:from-black/95 group-hover:via-black/70 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col p-8 min-h-[450px]">
                {/* Icon */}
                <div className="mb-6 h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-secondary group-hover:scale-110 transition-all duration-300 border border-white/20">
                  <service.icon className="w-8 h-8" />
                </div>

                {/* Title & Tagline */}
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-secondary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-secondary font-semibold uppercase tracking-wider mb-4">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="text-white/80 font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all group/link bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full w-fit hover:bg-secondary hover:text-white border border-white/20"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Decorative Corner Shine */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
