"use client";

import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// --- Animated Title Component ---
interface AnimatedTitleProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function AnimatedTitle({ children, className, delay = 0 }: AnimatedTitleProps) {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className={cn("font-display italic tracking-tight", className)}
        >
            {children}
        </motion.h2>
    );
}

// --- Luxury Card Component ---
interface LuxuryCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function LuxuryCard({ children, className, hoverEffect = true }: LuxuryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={cn(
                "relative overflow-hidden bg-white/80 backdrop-blur-md border border-white/20 p-8 shadow-sm transition-all duration-500",
                hoverEffect && "hover:shadow-2xl hover:bg-white/90 hover:-translate-y-1",
                className
            )}
        >
            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-multiply" />

            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

// --- Parallax Image Component ---
interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    sizes?: string;
}

export function ParallaxImage({ src, alt, className, priority = false, sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" }: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

    return (
        <div ref={ref} className={cn("relative overflow-hidden", className)}>
            <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    sizes={sizes}
                    className="object-cover"
                />
            </motion.div>
        </div>
    );
}

// --- Reveal Text Component ---
interface RevealTextProps {
    text: string;
    className?: string;
    stagger?: number;
}

export function RevealText({ text, className, stagger = 0.02 }: RevealTextProps) {
    const words = text.split(" ");
    return (
        <span className={cn("inline-block", className)}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.2em] -mb-1 pb-1">
                    <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * stagger, ease: "easeOut" }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

// --- Cinematic Hero Component ---
interface CinematicHeroProps {
    image: string;
    title: string;
    subtitle?: string;
    badge?: string;
}

export function CinematicHero({ image, title, subtitle, badge }: CinematicHeroProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
                <Image src={image} alt={title} fill priority className="object-cover" />
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            <motion.div style={{ opacity }} className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
                {badge && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block mb-6 px-4 py-1.5 border border-white/30 rounded-full backdrop-blur-sm bg-white/10 uppercase tracking-[0.2em] text-xs font-medium"
                    >
                        {badge}
                    </motion.div>
                )}
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-display italic tracking-tighter mb-6 drop-shadow-2xl">
                    <RevealText text={title} stagger={0.1} />
                </h1>
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto tracking-wide leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-xs tracking-widest uppercase"
            >
                <span>Scroll to Explore</span>
                <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
        </div>
    );
}
