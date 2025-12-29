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
                <div className="relative overflow-hidden rounded-lg bg-white shadow-sm">
                    {/* Carousel */}
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${activeIndex * 100}%)`,
                        }}
                    >
                        {offers.map((offer) => (
                            <div
                                key={offer.id}
                                className="min-w-full relative"
                            >
                                <div className="relative overflow-hidden min-h-[180px] flex items-center bg-gradient-to-r from-[var(--bg-light)] to-white">
                                    {/* Background Image */}
                                    <div className="absolute inset-0 opacity-20">
                                        <Image
                                            src={offer.background}
                                            alt={offer.title}
                                            fill
                                            className="object-cover"
                                            priority={offer.id === offers[0].id}
                                            sizes="100vw"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 w-full px-4 py-5">
                                        <div className="flex items-center gap-3 mb-3">
                                            {/* Icon */}
                                            {offer.icon && (
                                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl shadow-sm">
                                                    {offer.icon}
                                                </div>
                                            )}
                                            
                                            {/* Title & Badge */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    {offer.badge && (
                                                        <span 
                                                            className="inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold uppercase"
                                                            style={{
                                                                backgroundColor: 'var(--brand-green)',
                                                                color: 'var(--text-inverse)',
                                                            }}
                                                        >
                                                            {offer.badge}
                                                        </span>
                                                    )}
                                                    <h3 
                                                        className="text-lg font-bold leading-tight"
                                                        style={{ color: 'var(--text-dark)' }}
                                                    >
                                                        {offer.title}
                                                    </h3>
                                                </div>
                                                <p 
                                                    className="text-sm leading-relaxed"
                                                    style={{ color: 'var(--text-medium)' }}
                                                >
                                                    {offer.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <div className="mt-3">
                                            <Link
                                                href={offer.ctaLink}
                                                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                                                style={{
                                                    backgroundColor: 'var(--btn-primary)',
                                                    color: 'var(--text-inverse)',
                                                }}
                                            >
                                                {offer.ctaText}
                                                <span>→</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation dots */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {offers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`rounded-full transition-all duration-200 ${
                                    index === activeIndex
                                        ? 'bg-[var(--brand-green)] w-6 h-1.5'
                                        : 'bg-gray-300 w-1.5 h-1.5'
                                }`}
                                aria-label={`Xem ưu đãi ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffersSection;

