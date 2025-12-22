'use client';

import React from 'react';
import { usePublicProducts, usePublicCategories, usePublishedBlogPosts } from '@/app/(site)/_hooks';
import HeroSection from "@/app/(site)/home/_components/HeroSection";
import ProductShowcaseSection from "@/app/(site)/home/_components/ProductShowcaseSection";
import ValuePropsSection from "@/app/(site)/home/_components/ValuePropsSection";
import BlogTeaserSection from "@/app/(site)/home/_components/BlogTeaserSection";
import SidebarCatgory from "@/app/(site)/home/_components/SidebarCatgory";

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
            {/* Hero / Top section */}
            <HeroSection
                products={products}
                loading={productsLoading}
            />

            {/* Main content grid: sidebar + product showcase */}
            <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 lg:py-8">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                    {/* Sidebar: categories, quick links, simple hints */}
                    <aside className="lg:block hidden lg:sticky lg:top-24 self-start lg:col-span-3 xl:col-span-3">
                        <SidebarCatgory
                            categories={categories}
                            loading={categoriesLoading}
                            error={categoriesError}
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

            {/* Value propositions strip */}
            <ValuePropsSection />

            {/* Blog / content teaser */}
            <BlogTeaserSection
                posts={posts}
                loading={postsLoading}
                error={postsError}
            />
        </div>
    );
};

export default HomeContentPage;