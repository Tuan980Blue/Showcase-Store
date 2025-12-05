"use client";

import {useMemo, useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';

// Christmas snow theme items - moved outside component to avoid recreation
const CHRISTMAS_ITEMS: readonly { icon: string; weight: number }[] = [
    {icon: '❄️', weight: 0.5},  // Snowflakes - most common
    {icon: '⛄', weight: 0.2},  // Snowman
    {icon: '🎄', weight: 0.15}, // Christmas tree
    {icon: '🎁', weight: 0.1},  // Gift
    {icon: '❄️', weight: 0.05},  // Star
] as const;

// Seeded RNG to keep SSR and CSR deterministic - moved outside component
const createRng = (seed: number): (() => number) => {
    let t = seed >>> 0;
    return () => {
        t += 0x6D2B79F5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
};

// Pre-compute all items array once - no need to recreate
const ALL_CHRISTMAS_ITEMS: readonly string[] = (() => {
    const arr: string[] = [];
    const baseCount = 20; // fixed for deterministic SSR/CSR
    CHRISTMAS_ITEMS.forEach(item => {
        const count = Math.floor(item.weight * baseCount);
        for (let i = 0; i < count; i++) arr.push(item.icon);
    });
    return arr;
})();

type SnowItem = {
    id: number;
    delay: number;
    duration: number;
    x: number;
    size: number;
    rotation: number;
    icon: string;
    opacity: number;
};

const EnhancedPopcornAnimation = () => {
    // Only render on client to avoid hydration mismatches
    const [isMounted, setIsMounted] = useState(false);
    // Track if component is visible in viewport
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Use IntersectionObserver to detect when component enters viewport
    useEffect(() => {
        if (!isMounted || !containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of component is visible
                rootMargin: '50px', // Start animation slightly before entering viewport
            }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [isMounted]);

    // Generate snow items with positions and timing - only when visible
    const snowItems = useMemo<SnowItem[]>(() => {
        if (!isVisible) return []; // Don't generate items until visible

        const len = 20; // Reduced from 24 for better performance
        const rng = createRng(123456789);
        return Array.from({length: len}, (_, i): SnowItem => {
            const delay = rng() * 8;
            const duration = 4 + rng() * 6;
            const x = rng() * 100;
            const size = 1.1 + rng() * 1.2;
            const rotation = rng() * 720;
            const icon = ALL_CHRISTMAS_ITEMS[Math.floor(rng() * ALL_CHRISTMAS_ITEMS.length)];
            const opacity = 0.3 + rng() * 0.4;
            return {id: i, delay, duration, x, size, rotation, icon, opacity};
        });
    }, [isVisible]); // Regenerate when visibility changes

    // Don't render on server to prevent hydration mismatch
    if (!isMounted) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
        >
            {isVisible && snowItems.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute"
                    style={{
                        left: `${item.x}%`,
                        top: '-100px',
                        fontSize: `${item.size}em`,
                        opacity: item.opacity,
                        willChange: 'transform, opacity',
                    }}
                    initial={{
                        y: -100,
                        rotate: item.rotation,
                        scale: 0.5
                    }}
                    animate={{
                        y: '110vh',
                        rotate: item.rotation + 720, // Rotate 2 full turns while falling
                        scale: 1,
                    }}
                    transition={{
                        duration: item.duration,
                        delay: item.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {item.icon}
                </motion.div>
            ))}
        </div>
    );
};

export default EnhancedPopcornAnimation;
