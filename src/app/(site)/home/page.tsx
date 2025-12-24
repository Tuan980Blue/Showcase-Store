'use client';

import React from 'react';
import { usePublicProducts, usePublicCategories, usePublishedBlogPosts } from '@/app/(site)/_hooks';
import HeroSection from "@/app/(site)/home/_components/HeroSection";
import ProductShowcaseSection from "@/app/(site)/home/_components/ProductShowcaseSection";
import ValuePropsSection from "@/app/(site)/home/_components/ValuePropsSection";
import BlogTeaserSection from "@/app/(site)/home/_components/BlogTeaserSection";
import SidebarCatgory from "@/app/(site)/home/_components/SidebarCatgory";
import FeaturedCategoriesSection from "@/app/(site)/home/_components/FeaturedCategoriesSection";
import TrendingProductsSection from "@/app/(site)/home/_components/TrendingProductsSection";
import SpecialOffersSection from "@/app/(site)/home/_components/SpecialOffersSection";
import TestimonialsSection from "@/app/(site)/home/_components/TestimonialsSection";
import NewsletterSection from "@/app/(site)/home/_components/NewsletterSection";

const HomeContentPage: React.FC = () => {
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<string | 'all'>('all');

    const {
        products,
        loading: productsLoading,
        error: productsError,
    } = usePublicProducts();

    const {
        categories,
        loading: categoriesLoading,
        error: categoriesError,
    } = usePublicCategories();

    const {
        posts,
        loading: postsLoading,
        error: postsError,
    } = usePublishedBlogPosts();

    return (
        <div
            className="w-full bg-[var(--bg-light)] text-[var(--text-dark)]"
            style={{ backgroundColor: 'var(--bg-light)', color: 'var(--text-dark)' }}
        >
            {/* Special Offers Banner */}
            <SpecialOffersSection />

            {/* Hero / Top section */}
            <div className={"container mx-auto px-2 sm:px-4 lg:px-6 py-4 lg:py-6"}>
                <HeroSection
                    products={products}
                    loading={productsLoading}
                />
            </div>

            {/* Featured Categories Section */}
            <FeaturedCategoriesSection
                categories={categories}
                loading={categoriesLoading}
            />

            {/* Trending Products Section */}
            <TrendingProductsSection
                products={products}
                loading={productsLoading}
            />

            {/* Main content grid: sidebar + product showcase */}
            <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 lg:py-8">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                    {/* Sidebar: categories, quick links, simple hints */}
                    <aside className="lg:block hidden lg:sticky lg:top-16 self-start lg:col-span-3 xl:col-span-3">
                        <SidebarCatgory
                            categories={categories}
                            loading={categoriesLoading}
                            error={categoriesError}
                            selectedCategoryId={selectedCategoryId}
                            onSelectCategory={setSelectedCategoryId}
                        />
                    </aside>

                    {/* Main product showcase area */}
                    <section className="lg:col-span-9 xl:col-span-9">
                        <ProductShowcaseSection
                            products={products}
                            loading={productsLoading}
                            error={productsError}
                            categories={categories}
                            selectedCategoryId={selectedCategoryId}
                            onCategoryChange={setSelectedCategoryId}
                        />
                    </section>
                </div>
            </div>

            {/* Blog / content teaser */}
            <BlogTeaserSection
                posts={posts}
                loading={postsLoading}
                error={postsError}
            />

            {/* Value propositions strip */}
            <ValuePropsSection />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Newsletter Signup Section */}
            <NewsletterSection />
        </div>
    );
};

export default HomeContentPage;