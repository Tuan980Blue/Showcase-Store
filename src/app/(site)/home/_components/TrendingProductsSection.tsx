'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProductListItemDto } from '@/types/product.types';

interface TrendingProductsSectionProps {
    products: ProductListItemDto[];
    loading: boolean;
}

const TrendingProductsSection: React.FC<TrendingProductsSectionProps> = ({
    products,
    loading,
}) => {
    // Get top 8 products (or first 8 if no sorting available)
    const trendingProducts = React.useMemo(() => {
        if (!products.length) return [];
        // In a real app, you'd sort by views, sales, or trending score
        // For now, just take first 8 products
        return products.slice(0, 6);
    }, [products]);

    if (loading) {
        return (
            <section className="border-t border-[var(--border-light)] bg-white py-10 sm:py-12">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="mb-8">
                        <div className="h-6 w-48 bg-[var(--bg-grey)] rounded animate-pulse mb-2" />
                        <div className="h-4 w-64 bg-[var(--bg-grey)] rounded animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-[var(--bg-grey)] rounded-xl aspect-square animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (trendingProducts.length === 0) {
        return null;
    }

    return (
        <section className="border-t border-[var(--border-light)] bg-gradient-to-b from-white to-[var(--bg-light)] py-10 sm:py-12">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-light)] bg-[var(--bg-mint)]/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--brand-navy)] w-fit">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)] animate-pulse" />
                            Sản phẩm đang hot
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-dark)]">
                            Sản phẩm bán chạy
                        </h2>
                        <p className="max-w-2xl text-sm sm:text-base text-[var(--text-medium)] leading-relaxed">
                            Những sản phẩm được khách hàng yêu thích và đặt mua nhiều nhất
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-navy)] underline-offset-4 hover:text-[var(--brand-green)] hover:underline"
                    >
                        Xem tất cả sản phẩm
                        <span className="text-xs">↗</span>
                    </Link>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4">
                    {trendingProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="group relative overflow-hidden rounded-2xl border border-[var(--border-light)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[var(--brand-green)]"
                        >
                            {/* Trending badge */}
                            {index < 3 && (
                                <div className="absolute top-2 left-2 z-10 rounded-full bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-navy)] px-2 py-1 text-[9px] font-bold text-white shadow-lg">
                                    #{index + 1} HOT
                                </div>
                            )}

                            {/* Product image */}
                            <div className="relative aspect-square w-full overflow-hidden bg-[var(--bg-mint)]">
                                {product.imageUrl ? (
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-light)]">
                                        Chưa có hình ảnh
                                    </div>
                                )}
                                
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Product info */}
                            <div className="p-3 sm:p-4">
                                <p className="text-[10px] text-[var(--text-light)] mb-1 uppercase tracking-wide">
                                    {product.categoryName}
                                </p>
                                <h3 className="line-clamp-2 text-sm font-semibold text-[var(--text-dark)] mb-2 group-hover:text-[var(--brand-green)] transition-colors">
                                    {product.name}
                                </h3>
                                
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-base font-bold text-[var(--brand-green)]">
                                        {product.price?.toLocaleString('vi-VN')}₫
                                    </p>
                                    <div className="flex items-center gap-1">
                                        {product.shopeeLink && (
                                            <a
                                                href={product.shopeeLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#ee4d2d] hover:bg-[#d63f22] transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Image
                                                    src="/shopee.png"
                                                    alt="Shopee"
                                                    width={14}
                                                    height={14}
                                                    className="w-3.5 h-3.5"
                                                />
                                            </a>
                                        )}
                                        {product.tikTokLink && (
                                            <a
                                                href={product.tikTokLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black hover:bg-[#111111] transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Image
                                                    src="/tiktok.png"
                                                    alt="TikTok"
                                                    width={14}
                                                    height={14}
                                                    className="w-3.5 h-3.5"
                                                />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProductsSection;

