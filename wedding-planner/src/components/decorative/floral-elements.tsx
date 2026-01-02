"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface FloralDecorationProps {
    variant: "corner" | "divider" | "pattern" | "petals" | "vine" | "rose" | "branch";
    className?: string;
    animate?: boolean;
    color?: "primary" | "secondary" | "gold" | "rose" | "sage";
}

const colorMap = {
    primary: "#ee2b5b",
    secondary: "#d4af37",
    gold: "#d4af37",
    rose: "#fdd5e0",
    sage: "#a8c5a8",
};

export function FloralDecoration({
    variant,
    className,
    animate = true,
    color = "primary",
}: FloralDecorationProps) {
    const fillColor = colorMap[color];
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    switch (variant) {
        case "corner":
            return (
                <motion.svg
                    initial={animate ? { opacity: 0, scale: 0.8 } : {}}
                    animate={animate ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn("text-primary", className)}
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Decorative corner floral */}
                    <path
                        d="M180 10C180 10 160 30 140 35C120 40 100 35 100 35C100 35 120 55 125 75C130 95 120 115 120 115"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.6"
                    />
                    <path
                        d="M190 30C190 30 165 45 145 55C125 65 105 65 105 65"
                        stroke={fillColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.4"
                    />
                    {/* Flower 1 */}
                    <g transform="translate(150, 20)">
                        <circle cx="0" cy="0" r="8" fill={fillColor} opacity="0.3" />
                        <circle cx="0" cy="-10" r="5" fill={fillColor} opacity="0.5" />
                        <circle cx="8" cy="-5" r="5" fill={fillColor} opacity="0.5" />
                        <circle cx="8" cy="5" r="5" fill={fillColor} opacity="0.5" />
                        <circle cx="0" cy="10" r="5" fill={fillColor} opacity="0.5" />
                        <circle cx="-8" cy="5" r="5" fill={fillColor} opacity="0.5" />
                        <circle cx="-8" cy="-5" r="5" fill={fillColor} opacity="0.5" />
                        <circle cx="0" cy="0" r="4" fill="#d4af37" opacity="0.8" />
                    </g>
                    {/* Flower 2 */}
                    <g transform="translate(175, 55)">
                        <circle cx="0" cy="0" r="6" fill={fillColor} opacity="0.25" />
                        <circle cx="0" cy="-7" r="4" fill={fillColor} opacity="0.4" />
                        <circle cx="6" cy="-3" r="4" fill={fillColor} opacity="0.4" />
                        <circle cx="6" cy="4" r="4" fill={fillColor} opacity="0.4" />
                        <circle cx="0" cy="7" r="4" fill={fillColor} opacity="0.4" />
                        <circle cx="-6" cy="4" r="4" fill={fillColor} opacity="0.4" />
                        <circle cx="-6" cy="-3" r="4" fill={fillColor} opacity="0.4" />
                        <circle cx="0" cy="0" r="3" fill="#d4af37" opacity="0.7" />
                    </g>
                    {/* Leaves */}
                    <ellipse cx="130" cy="45" rx="15" ry="6" fill="#a8c5a8" opacity="0.3" transform="rotate(-30 130 45)" />
                    <ellipse cx="165" cy="35" rx="12" ry="5" fill="#a8c5a8" opacity="0.25" transform="rotate(-45 165 35)" />
                    <ellipse cx="185" cy="70" rx="10" ry="4" fill="#a8c5a8" opacity="0.2" transform="rotate(-60 185 70)" />
                </motion.svg>
            );

        case "divider":
            return (
                <motion.svg
                    initial={animate ? { opacity: 0, scaleX: 0 } : {}}
                    animate={animate ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("w-full h-12", className)}
                    viewBox="0 0 400 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Center flower */}
                    <g transform="translate(200, 25)">
                        <circle cx="0" cy="0" r="10" fill={fillColor} opacity="0.3" />
                        <circle cx="0" cy="-12" r="6" fill={fillColor} opacity="0.5" />
                        <circle cx="10" cy="-6" r="6" fill={fillColor} opacity="0.5" />
                        <circle cx="10" cy="6" r="6" fill={fillColor} opacity="0.5" />
                        <circle cx="0" cy="12" r="6" fill={fillColor} opacity="0.5" />
                        <circle cx="-10" cy="6" r="6" fill={fillColor} opacity="0.5" />
                        <circle cx="-10" cy="-6" r="6" fill={fillColor} opacity="0.5" />
                        <circle cx="0" cy="0" r="5" fill="#d4af37" opacity="0.8" />
                    </g>
                    {/* Lines */}
                    <line x1="20" y1="25" x2="170" y2="25" stroke={fillColor} strokeWidth="1" opacity="0.3" />
                    <line x1="230" y1="25" x2="380" y2="25" stroke={fillColor} strokeWidth="1" opacity="0.3" />
                    {/* Small flowers left */}
                    <circle cx="50" cy="25" r="3" fill={fillColor} opacity="0.4" />
                    <circle cx="100" cy="25" r="2" fill={fillColor} opacity="0.3" />
                    <circle cx="140" cy="25" r="4" fill={fillColor} opacity="0.4" />
                    {/* Small flowers right */}
                    <circle cx="260" cy="25" r="4" fill={fillColor} opacity="0.4" />
                    <circle cx="300" cy="25" r="2" fill={fillColor} opacity="0.3" />
                    <circle cx="350" cy="25" r="3" fill={fillColor} opacity="0.4" />
                    {/* Leaves */}
                    <ellipse cx="70" cy="20" rx="10" ry="4" fill="#a8c5a8" opacity="0.3" transform="rotate(-20 70 20)" />
                    <ellipse cx="330" cy="30" rx="10" ry="4" fill="#a8c5a8" opacity="0.3" transform="rotate(20 330 30)" />
                </motion.svg>
            );

        case "pattern":
            return (
                <svg
                    className={cn("w-full h-full", className)}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <pattern id="floralPattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                            {/* Tiny flower */}
                            <circle cx="12.5" cy="12.5" r="3" fill={fillColor} opacity="0.1" />
                            <circle cx="12.5" cy="8" r="2" fill={fillColor} opacity="0.15" />
                            <circle cx="16" cy="10.5" r="2" fill={fillColor} opacity="0.15" />
                            <circle cx="16" cy="14.5" r="2" fill={fillColor} opacity="0.15" />
                            <circle cx="12.5" cy="17" r="2" fill={fillColor} opacity="0.15" />
                            <circle cx="9" cy="14.5" r="2" fill={fillColor} opacity="0.15" />
                            <circle cx="9" cy="10.5" r="2" fill={fillColor} opacity="0.15" />
                            <circle cx="12.5" cy="12.5" r="1.5" fill="#d4af37" opacity="0.2" />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#floralPattern)" />
                </svg>
            );

        case "petals":
            // Avoid hydration mismatch by rendering only after mount
            if (!mounted) return <div className={cn("relative pointer-events-none", className)} />;

            return (
                <div className={cn("relative pointer-events-none", className)}>
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: -20, opacity: 0, rotate: 0 }}
                            animate={{
                                y: [0, 100, 200],
                                opacity: [0, 1, 0],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 6 + Math.random() * 4,
                                repeat: Infinity,
                                delay: i * 0.8,
                                ease: "easeInOut",
                            }}
                            className="absolute"
                            style={{
                                left: `${10 + Math.random() * 80}%`,
                                top: "-20px",
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <ellipse
                                    cx="10"
                                    cy="10"
                                    rx="8"
                                    ry="4"
                                    fill={i % 2 === 0 ? fillColor : "#fdd5e0"}
                                    opacity="0.6"
                                    transform="rotate(45 10 10)"
                                />
                            </svg>
                        </motion.div>
                    ))}
                </div>
            );

        case "vine":
            return (
                <motion.svg
                    initial={animate ? { pathLength: 0, opacity: 0 } : {}}
                    animate={animate ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className={cn("", className)}
                    viewBox="0 0 300 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        d="M10 50 Q50 20 90 50 T170 50 T250 50 T290 50"
                        stroke="#a8c5a8"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                    {/* Leaves along the vine */}
                    <ellipse cx="50" cy="35" rx="12" ry="5" fill="#a8c5a8" opacity="0.4" transform="rotate(-30 50 35)" />
                    <ellipse cx="90" cy="55" rx="10" ry="4" fill="#a8c5a8" opacity="0.35" transform="rotate(20 90 55)" />
                    <ellipse cx="130" cy="40" rx="11" ry="5" fill="#a8c5a8" opacity="0.4" transform="rotate(-25 130 40)" />
                    <ellipse cx="170" cy="55" rx="10" ry="4" fill="#a8c5a8" opacity="0.35" transform="rotate(25 170 55)" />
                    <ellipse cx="210" cy="42" rx="12" ry="5" fill="#a8c5a8" opacity="0.4" transform="rotate(-20 210 42)" />
                    <ellipse cx="250" cy="55" rx="10" ry="4" fill="#a8c5a8" opacity="0.35" transform="rotate(30 250 55)" />
                    {/* Small flowers */}
                    <circle cx="70" cy="45" r="4" fill={fillColor} opacity="0.4" />
                    <circle cx="150" cy="48" r="5" fill={fillColor} opacity="0.5" />
                    <circle cx="230" cy="47" r="4" fill={fillColor} opacity="0.4" />
                </motion.svg>
            );

        case "rose":
            return (
                <motion.svg
                    initial={animate ? { scale: 0, rotate: -45 } : {}}
                    animate={animate ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                    className={cn("", className)}
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Rose petals - layered circles */}
                    <circle cx="30" cy="30" r="25" fill={fillColor} opacity="0.15" />
                    <circle cx="30" cy="25" r="15" fill={fillColor} opacity="0.25" />
                    <circle cx="35" cy="28" r="12" fill={fillColor} opacity="0.3" />
                    <circle cx="25" cy="32" r="12" fill={fillColor} opacity="0.3" />
                    <circle cx="30" cy="35" r="10" fill={fillColor} opacity="0.35" />
                    <circle cx="28" cy="28" r="8" fill={fillColor} opacity="0.4" />
                    <circle cx="32" cy="32" r="7" fill={fillColor} opacity="0.45" />
                    <circle cx="30" cy="30" r="5" fill={fillColor} opacity="0.5" />
                    {/* Center */}
                    <circle cx="30" cy="30" r="3" fill="#d4af37" opacity="0.6" />
                    {/* Leaves */}
                    <ellipse cx="15" cy="50" rx="12" ry="6" fill="#a8c5a8" opacity="0.4" transform="rotate(-30 15 50)" />
                    <ellipse cx="45" cy="50" rx="12" ry="6" fill="#a8c5a8" opacity="0.4" transform="rotate(30 45 50)" />
                </motion.svg>
            );

        case "branch":
            return (
                <motion.svg
                    initial={animate ? { opacity: 0, x: -20 } : {}}
                    animate={animate ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn("", className)}
                    viewBox="0 0 200 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Main branch */}
                    <path
                        d="M10 80 Q50 70 80 50 Q110 30 150 35 Q180 40 190 30"
                        stroke="#8b7355"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />
                    {/* Smaller branches */}
                    <path d="M50 68 Q60 55 55 45" stroke="#8b7355" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M100 38 Q110 25 120 28" stroke="#8b7355" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M140 36 Q150 50 160 48" stroke="#8b7355" strokeWidth="2" fill="none" strokeLinecap="round" />
                    {/* Cherry blossoms */}
                    <g transform="translate(55, 42)">
                        <circle cx="0" cy="0" r="6" fill={fillColor} opacity="0.4" />
                        <circle cx="0" cy="-7" r="4" fill={fillColor} opacity="0.6" />
                        <circle cx="6" cy="-3" r="4" fill={fillColor} opacity="0.6" />
                        <circle cx="6" cy="4" r="4" fill={fillColor} opacity="0.6" />
                        <circle cx="0" cy="7" r="4" fill={fillColor} opacity="0.6" />
                        <circle cx="-6" cy="4" r="4" fill={fillColor} opacity="0.6" />
                        <circle cx="-6" cy="-3" r="4" fill={fillColor} opacity="0.6" />
                        <circle cx="0" cy="0" r="2" fill="#d4af37" opacity="0.8" />
                    </g>
                    <g transform="translate(120, 25)">
                        <circle cx="0" cy="0" r="5" fill={fillColor} opacity="0.35" />
                        <circle cx="0" cy="-6" r="3.5" fill={fillColor} opacity="0.5" />
                        <circle cx="5" cy="-2" r="3.5" fill={fillColor} opacity="0.5" />
                        <circle cx="5" cy="3" r="3.5" fill={fillColor} opacity="0.5" />
                        <circle cx="0" cy="6" r="3.5" fill={fillColor} opacity="0.5" />
                        <circle cx="-5" cy="3" r="3.5" fill={fillColor} opacity="0.5" />
                        <circle cx="-5" cy="-2" r="3.5" fill={fillColor} opacity="0.5" />
                        <circle cx="0" cy="0" r="2" fill="#d4af37" opacity="0.7" />
                    </g>
                    <g transform="translate(160, 45)">
                        <circle cx="0" cy="0" r="5" fill={fillColor} opacity="0.35" />
                        <circle cx="0" cy="-6" r="3.5" fill={fillColor} opacity="0.5" />
                        <circle cx="5" cy="-2" r="3.5" fill={fillColor} opacity="0.5" />
                        <circle cx="5" cy="3" r="3.5" fill={fillColor} opacity="0.5" />
                        <circle cx="0" cy="6" r="3.5" fill={fillColor} opacity="0.5" />
                        <circle cx="-5" cy="3" r="3.5" fill={fillColor} opacity="0.5" />
                        <circle cx="-5" cy="-2" r="3.5" fill={fillColor} opacity="0.5" />
                        <circle cx="0" cy="0" r="2" fill="#d4af37" opacity="0.7" />
                    </g>
                    {/* Leaves */}
                    <ellipse cx="70" cy="58" rx="10" ry="4" fill="#a8c5a8" opacity="0.4" transform="rotate(-20 70 58)" />
                    <ellipse cx="110" cy="35" rx="8" ry="3" fill="#a8c5a8" opacity="0.35" transform="rotate(15 110 35)" />
                    <ellipse cx="175" cy="32" rx="9" ry="4" fill="#a8c5a8" opacity="0.4" transform="rotate(-10 175 32)" />
                </motion.svg>
            );

        default:
            return null;
    }
}

// Floating petals animation overlay
export function FloatingPetals({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className={cn("fixed inset-0 pointer-events-none overflow-hidden z-50", className)} />;

    return (
        <div className={cn("fixed inset-0 pointer-events-none overflow-hidden z-50", className)}>
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        y: -100,
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                        opacity: 0,
                        rotate: 0,
                    }}
                    animate={{
                        y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
                        x: `+=${Math.random() * 200 - 100}`,
                        opacity: [0, 0.6, 0.6, 0],
                        rotate: 720,
                    }}
                    transition={{
                        duration: 8 + Math.random() * 6,
                        repeat: Infinity,
                        delay: i * 1.5,
                        ease: "linear",
                    }}
                    className="absolute"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <ellipse
                            cx="8"
                            cy="8"
                            rx="7"
                            ry="3"
                            fill={i % 3 === 0 ? "#ee2b5b" : i % 3 === 1 ? "#fdd5e0" : "#d4af37"}
                            opacity="0.5"
                            transform={`rotate(${Math.random() * 90} 8 8)`}
                        />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}

// Gold sparkle effect
export function GoldSparkles({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)} />;

    return (
        <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-secondary rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
