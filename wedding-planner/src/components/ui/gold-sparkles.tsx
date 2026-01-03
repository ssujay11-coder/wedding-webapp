"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Sparkle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

interface GoldSparklesProps {
    className?: string;
}

export function GoldSparkles({ className = "" }: GoldSparklesProps) {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        // Generate static sparkles on client side
        const count = 15; // Number of sparkles
        const newSparkles = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // %
            y: Math.random() * 100, // %
            size: Math.random() * 2 + 1, // px
            duration: Math.random() * 2 + 2, // s
            delay: Math.random() * 2, // s
        }));
        setSparkles(newSparkles);
    }, []);

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
            {sparkles.map((sparkle) => (
                <motion.div
                    key={sparkle.id}
                    className="absolute rounded-full bg-[var(--gold)] shadow-[0_0_8px_1px_var(--gold)]"
                    style={{
                        left: `${sparkle.x}%`,
                        top: `${sparkle.y}%`,
                        width: sparkle.size,
                        height: sparkle.size,
                    }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0, 1.2, 0],
                    }}
                    transition={{
                        duration: sparkle.duration,
                        repeat: Infinity,
                        delay: sparkle.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
