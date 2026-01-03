'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface TextScrambleProps {
    text: string
    className?: string
    duration?: number
    speed?: number
    characterSet?: string
    delay?: number
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function TextScramble({
    text,
    className = '',
    duration = 0.8,
    speed = 0.05,
    characterSet = DEFAULT_CHARS,
    delay = 0,
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text)
    const [isScrambling, setIsScrambling] = useState(false)
    const controls = useAnimation()

    useEffect(() => {
        let timeout: NodeJS.Timeout

        // Start after delay
        timeout = setTimeout(() => {
            scramble()
        }, delay * 1000)

        return () => clearTimeout(timeout)
    }, [text, delay])

    const scramble = async () => {
        setIsScrambling(true)
        const steps = text.length
        let step = 0

        const interval = setInterval(() => {
            let scrambled = ''
            for (let i = 0; i < steps; i++) {
                if (i < step) {
                    scrambled += text[i]
                } else {
                    scrambled += characterSet[Math.floor(Math.random() * characterSet.length)]
                }
            }
            setDisplayText(scrambled)
            step += steps * speed / duration

            if (step >= steps) {
                clearInterval(interval)
                setDisplayText(text)
                setIsScrambling(false)
            }
        }, speed * 1000)
    }

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay }}
        >
            {displayText}
        </motion.span>
    )
}
