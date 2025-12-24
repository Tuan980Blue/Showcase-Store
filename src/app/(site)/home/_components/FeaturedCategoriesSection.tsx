'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { CategoryResponseDto } from '@/types/category.types';

interface FeaturedCategoriesSectionProps {
    categories: CategoryResponseDto[];
    loading: boolean;
}

const FeaturedCategoriesSection: React.FC<FeaturedCategoriesSectionProps> = ({
    categories,
    loading,
}) => {
    // Get top 6 categories by product count, or first 6 if no counts
    const featuredCategories = React.useMemo(() => {
        if (!categories.length) return [];
        
        const sorted = [...categories].sort((a, b) => {
            const countA = a.productCount ?? 0;
            const countB = b.productCount ?? 0;
            return countB - countA;
        });
        
        return sorted.slice(0, 6);
    }, [categories]);

    if (loading) {
        return (
            <section className="border-t border-[var(--border-light)] bg-white py-10 sm:py-12">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="mb-8">
                        <div className="h-6 w-48 bg-[var(--bg-grey)] rounded animate-pulse mb-2" />
                        <div className="h-4 w-64 bg-[var(--bg-grey)] rounded animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="aspect-square bg-[var(--bg-grey)] rounded-xl animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (featuredCategories.length === 0) {
        return null;
    }

    return (
        <section className="border-t border-[var(--border-light)] bg-gradient-to-b from-[var(--bg-mint)]/40 to-white py-10 sm:py-12">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-light)] bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-light)] w-fit">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
                            Danh mục nổi bật
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-dark)]">
                            Khám phá theo danh mục
                        </h2>
                        <p className="max-w-2xl text-sm sm:text-base text-[var(--text-medium)] leading-relaxed">
                            Chọn danh mục yêu thích để xem các sản phẩm phù hợp nhất
                        </p>
                    </div>
                    <Link
                        href="/categories"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-navy)] underline-offset-4 hover:text-[var(--brand-green)] hover:underline"
                    >
                        Xem tất cả danh mục
                        <span className="text-xs">↗</span>
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                    {featuredCategories.map((category) => {
                        const href = category.slug ? `/categories/${category.slug}` : `/products?category=${category.id}`;
                        
                        return (
                            <Link
                                key={category.id}
                                href={href}
                                className="group relative overflow-hidden rounded-2xl border border-[var(--border-light)] bg-white/90 p-4 sm:p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[var(--brand-green)]"
                            >
                                {/* Background gradient effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-green)]/5 via-transparent to-[var(--brand-navy)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* Category image / icon */}
                                <div className="relative mb-4 aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-br from-[var(--bg-mint)] to-[var(--brand-green)]/20 group-hover:scale-105 transition-transform duration-300">
                                    {category.imageUrl ? (
                                        <>
                                            <Image
                                                src={category.imageUrl}
                                                alt={category.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex h-full w-full items-center justify-center">
                                                <div className="text-3xl sm:text-4xl font-bold text-[var(--brand-green)] opacity-60">
                                                    {category.name.charAt(0).toUpperCase()}
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl" />
                                        </>
                                    )}
                                </div>

                                {/* Category info */}
                                <div className="relative z-10">
                                    <h3 className="font-semibold text-[var(--text-dark)] text-sm sm:text-base mb-1 line-clamp-2 group-hover:text-[var(--brand-green)] transition-colors">
                                        {category.name}
                                    </h3>
                                    {typeof category.productCount === 'number' && category.productCount > 0 && (
                                        <p className="text-xs sm:text-sm text-[var(--text-medium)]">
                                            {category.productCount} sản phẩm
                                        </p>
                                    )}
                                </div>

                                {/* Hover arrow indicator */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-[var(--brand-green)] text-xl font-bold">→</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategoriesSection;

