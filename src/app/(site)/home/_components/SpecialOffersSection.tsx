'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Offer {
    id: string;
    title: string;
    background: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    badge?: string;
    icon?: string;
}

const offers: Offer[] = [
    {
        id: '1',
        title: 'Sản phẩm mới ra mắt',
        background: '/camera.png',
        description: 'Các sản phẩm vừa ra mắt được chú trọng',
        ctaText: 'Xem ngay',
        ctaLink: '/products',
        badge: 'HOT',
        icon: '🔥',
    },
    {
        id: '2',
        title: 'Miễn phí vận chuyển',
        background: '/freeship.png',
        description: 'Đơn hàng trên 500.000₫ được miễn phí vận chuyển toàn quốc',
        ctaText: 'Mua ngay',
        ctaLink: '/products',
        badge: 'NEW',
        icon: '🚚',
    },
    {
        id: '3',
        title: 'Tư vấn miễn phí',
        background: '/contact.png',
        description: 'Nhận tư vấn 1-1 miễn phí qua Zalo, TikTok hoặc Shopee',
        ctaText: 'Liên hệ ngay',
        ctaLink: '/about',
        icon: '💬',
    },
];

const SpecialOffersSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % offers.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="border-t border-[var(--border-light)] bg-[var(--bg-light)]">
            <div className="container mx-auto">
                <div className="relative overflow-hidden rounded-b-2xl shadow-md" style={{ boxShadow: `0 4px 16px var(--shadow-soft)` }}>
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${activeIndex * 100}%)`,
                        }}
                    >
                        {offers.map((offer) => (
                            <div
                                key={offer.id}
                                className="min-w-full relative"
                            >
                                <div
                                    className="relative overflow-hidden min-h-[200px] sm:min-h-[220px] md:min-h-[240px] flex items-center"
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0 opacity-30">
                                        <Image
                                            src={offer.background}
                                            alt={offer.title}
                                            fill
                                            className="object-cover"
                                            priority={offer.id === offers[0].id}
                                            sizes="100vw"
                                        />
                                    </div>

                                    {/* Very light overlay for subtle contrast */}
                                    <div 
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(135deg, rgba(15, 34, 56, 0.15) 0%, rgba(47, 191, 113, 0.1) 100%)`,
                                        }}
                                    />

                                    {/* Subtle background shapes */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <div 
                                            className="absolute top-4 right-8 w-16 h-16 rounded-full opacity-15"
                                            style={{ backgroundColor: 'var(--brand-green)' }}
                                        />
                                        <div 
                                            className="absolute bottom-6 left-12 w-12 h-12 rounded-full opacity-10"
                                            style={{ backgroundColor: 'var(--brand-navy)' }}
                                        />
                                        <div 
                                            className="absolute top-1/2 right-16 w-8 h-8 rounded-full opacity-20"
                                            style={{ backgroundColor: 'var(--brand-green)' }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8">
                                        <div className="max-w-5xl mx-auto">
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                                                {/* Icon */}
                                                <div className="flex-shrink-0 order-2 sm:order-1">
                                                    <div 
                                                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl"
                                                        style={{
                                                            backgroundColor: 'var(--bg-overlay-white)',
                                                            boxShadow: `0 4px 12px var(--shadow-soft)`,
                                                        }}
                                                    >
                                                        <span>{offer.icon}</span>
                                                    </div>
                                                </div>

                                                {/* Text Content */}
                                                <div className="flex-1 order-1 sm:order-2 text-center sm:text-left">
                                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-3">
                                                        {offer.badge && (
                                                            <span 
                                                                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                                                                style={{
                                                                    backgroundColor: 'var(--brand-green)',
                                                                    color: 'var(--text-inverse)',
                                                                    boxShadow: `0 2px 8px rgba(47, 191, 113, 0.4)`,
                                                                }}
                                                            >
                                                                <span>✨</span>
                                                                {offer.badge}
                                                            </span>
                                                        )}
                                                        <h3 
                                                            className="text-xl sm:text-2xl md:text-3xl font-bold"
                                                            style={{ color: 'var(--text-dark)' }}
                                                        >
                                                            {offer.title}
                                                        </h3>
                                                    </div>
                                                    <p 
                                                        className="text-sm sm:text-base text-[var(--text-medium)] mb-4 max-w-2xl mx-auto sm:mx-0"
                                                    >
                                                        {offer.description}
                                                    </p>
                                                    <div className="flex justify-center sm:justify-start">
                                                        <Link
                                                            href={offer.ctaLink}
                                                            className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300"
                                                            style={{
                                                                backgroundColor: 'var(--btn-primary)',
                                                                color: 'var(--text-inverse)',
                                                                boxShadow: `0 4px 12px rgba(47, 191, 113, 0.3)`,
                                                            }}
                                                        >
                                                            {offer.ctaText}
                                                            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* Decorative sparkles */}
                                                <div className="hidden md:block absolute top-2 right-4 text-2xl opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}>
                                                    ✨
                                                </div>
                                                <div className="hidden md:block absolute bottom-2 left-4 text-xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}>
                                                    ⭐
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                        {offers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`rounded-full transition-all duration-300 ${
                                    index === activeIndex
                                        ? 'bg-[var(--brand-green)] w-6 h-1.5 shadow-sm'
                                        : 'bg-[var(--border-dark)]/50 w-1.5 h-1.5 hover:bg-[var(--border-dark)]'
                                }`}
                                aria-label={`Xem ưu đãi ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Previous/Next buttons - smaller */}
                    <button
                        onClick={() => setActiveIndex((prev) => (prev - 1 + offers.length) % offers.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center transition-colors duration-300 hover:bg-white shadow-md border border-[var(--border-light)]"
                        aria-label="Ưu đãi trước"
                        style={{ color: 'var(--brand-navy)' }}
                    >
                        <span className="text-lg font-bold">‹</span>
                    </button>
                    <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % offers.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center transition-colors duration-300 hover:bg-white shadow-md border border-[var(--border-light)]"
                        aria-label="Ưu đãi tiếp theo"
                        style={{ color: 'var(--brand-navy)' }}
                    >
                        <span className="text-lg font-bold">›</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffersSection;

