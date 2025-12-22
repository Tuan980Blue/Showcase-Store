"use client";

import React, {useState, useEffect, useMemo} from "react";
import {productService, categoryService, blogPostService, blogCategoryService} from "@/service/services";
import type {ProductListItemDto} from "@/types/product.types";
import type {BlogPostResponseDto} from "@/types/blog.types";
import type {CategoryResponseDto} from "@/types/category.types";
import type {BlogCategoryResponseDto} from "@/types/blog.types";
import StatsCard from "./_components/dashboard/StatsCard";
import QuickActions from "./_components/dashboard/QuickActions";
import RecentItems from "./_components/dashboard/RecentItems";
import ProductsByCategoryChart from "./_components/dashboard/ProductsByCategoryChart";
import BlogPostsByCategoryChart from "./_components/dashboard/BlogPostsByCategoryChart";
import ActivityOverTimeChart from "./_components/dashboard/ActivityOverTimeChart";
import CategoryDistributionChart from "./_components/dashboard/CategoryDistributionChart";
import Image from "next/image";
import Link from "next/link";

const DashboardAdminPage = () => {
    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        blogPosts: 0,
        blogCategories: 0,
    });
    const [recentProducts, setRecentProducts] = useState<ProductListItemDto[]>([]);
    const [recentPosts, setRecentPosts] = useState<BlogPostResponseDto[]>([]);
    const [allProducts, setAllProducts] = useState<ProductListItemDto[]>([]);
    const [allPosts, setAllPosts] = useState<BlogPostResponseDto[]>([]);
    const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
    const [blogCategories, setBlogCategories] = useState<BlogCategoryResponseDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);

            // Load all data in parallel
            const [products, categoriesData, posts, blogCategoriesData] = await Promise.all([
                productService.getAllProducts(true).catch(() => []),
                categoryService.getAllCategories().catch(() => []),
                blogPostService.getAllPosts(true).catch(() => []),
                blogCategoryService.getAllCategories().catch(() => []),
            ]);

            setAllProducts(products);
            setAllPosts(posts);
            setCategories(categoriesData);
            setBlogCategories(blogCategoriesData);

            setStats({
                products: products.length,
                categories: categoriesData.length,
                blogPosts: posts.length,
                blogCategories: blogCategoriesData.length,
            });

            // Get recent items (last 5) - sort by date if available
            const sortedProducts = [...products].slice(0, 5);
            const sortedPosts = [...posts]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5);

            setRecentProducts(sortedProducts);
            setRecentPosts(sortedPosts);
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const quickActions = [
        {
            title: "Create Product",
            description: "Add a new product to your store",
            href: "/admin/products",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                </svg>
            ),
            color: "blue" as const,
        },
        {
            title: "Create Blog Post",
            description: "Write a new blog article",
            href: "/admin/blogs",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
            ),
            color: "purple" as const,
        },
        {
            title: "Manage Categories",
            description: "Organize your product categories",
            href: "/admin/categories",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            ),
            color: "green" as const,
        },
        {
            title: "Manage Blog Categories",
            description: "Organize your blog categories",
            href: "/admin/blog-categories",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
            ),
            color: "orange" as const,
        },
    ];

    const recentProductsItems = recentProducts.map((product) => ({
        id: product.id,
        title: product.name,
        type: "product" as const,
        date: new Date().toISOString(), // Products don't have createdAt in ProductListItemDto
        href: `/admin/products`,
    }));

    const recentPostsItems = recentPosts.map((post) => ({
        id: post.id,
        title: post.title,
        type: "blog" as const,
        date: post.createdAt,
        status: post.isPublished ? "Published" : "Draft",
        href: `/admin/blogs`,
    }));

    // Chart data processing
    const productsByCategoryData = useMemo(() => {
        const categoryCounts: Record<string, number> = {};
        allProducts.forEach((product) => {
            const categoryName = product.categoryName || "Uncategorized";
            categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
        });

        const colors = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#06B6D4", "#EC4899", "#84CC16"];
        return Object.entries(categoryCounts).map(([name, value], index) => ({
            name,
            value,
            color: colors[index % colors.length],
        }));
    }, [allProducts]);

    const blogPostsByCategoryData = useMemo(() => {
        const categoryCounts: Record<string, number> = {};
        allPosts.forEach((post) => {
            const categoryName = post.categoryName || "Uncategorized";
            categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
        });

        const colors = ["#8B5CF6", "#F59E0B", "#3B82F6", "#10B981", "#EF4444", "#06B6D4", "#EC4899", "#84CC16"];
        return Object.entries(categoryCounts).map(([name, value], index) => ({
            name,
            value,
            color: colors[index % colors.length],
        }));
    }, [allPosts]);

    const activityOverTimeData = useMemo(() => {
        // Group blog posts by month
        const monthlyData: Record<string, { products: number; blogPosts: number; label: string }> = {};

        // Process blog posts
        allPosts.forEach((post) => {
            const date = new Date(post.createdAt);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
            const monthLabel = date.toLocaleDateString("en-US", {month: "short", year: "numeric"});

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = {products: 0, blogPosts: 0, label: monthLabel};
            }
            monthlyData[monthKey].blogPosts += 1;
        });

        // Convert to array and sort by date
        return Object.entries(monthlyData)
            .map(([key, value]) => ({
                month: value.label || key,
                products: value.products,
                blogPosts: value.blogPosts,
            }))
            .sort((a, b) => {
                // Simple sort by month string (works for recent months)
                return a.month.localeCompare(b.month);
            })
            .slice(-6); // Last 6 months
    }, [allPosts]);

    const categoryDistributionData = useMemo(() => {
        // Combine product categories and blog categories
        const categoryMap: Record<string, { products: number; blogPosts: number }> = {};

        // Add product categories
        categories.forEach((cat) => {
            categoryMap[cat.name] = {
                products: cat.productCount || 0,
                blogPosts: 0,
            };
        });

        // Add blog categories
        blogCategories.forEach((cat) => {
            if (categoryMap[cat.name]) {
                categoryMap[cat.name].blogPosts = cat.blogPostCount || 0;
            } else {
                categoryMap[cat.name] = {
                    products: 0,
                    blogPosts: cat.blogPostCount || 0,
                };
            }
        });

        return Object.entries(categoryMap)
            .map(([name, counts]) => ({
                name: name.length > 15 ? name.substring(0, 15) + "..." : name,
                products: counts.products,
                blogPosts: counts.blogPosts,
            }))
            .filter((item) => item.products > 0 || item.blogPosts > 0)
            .slice(0, 10); // Top 10 categories
    }, [categories, blogCategories]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                {/* Left - Logo */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    <div
                        className="flex items-center justify-center rounded-xl"
                    >
                        <Image
                            src="/logo1.png"
                            alt="Điện tử Tuấn Anh Logo"
                            width={82}
                            height={82}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="flex flex-col">
                        <Link
                            href="/admin"
                            className="text-sm sm:text-lg md:text-xl font-bold leading-tight transition-all duration-200 hover:text-opacity-70"
                            style={{
                                color: "var(--brand-navy)",
                                textTransform: "uppercase",
                                letterSpacing: "0.02em",
                            }}
                        >
                            Điện Tử Tuấn Anh
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                            Welcome to your admin panel. Here&apos;s an overview of your store.
                        </p>
                    </div>
                    <div className="relative group">
                        <Link href="/admin/account" className="p-2 rounded hover:bg-gray-200 inline-block transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        </Link>

                        {/* Tooltip */}
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                            Chỉnh sửa thông tin shop
                            {/* Tooltip arrow */}
                            <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></span>
                        </span>
                    </div>
                </div>

            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Products"
                    value={stats.products}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                        </svg>
                    }
                    color="blue"
                    loading={loading}
                    href="/admin/products"
                />
                <StatsCard
                    title="Product Categories"
                    value={stats.categories}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    }
                    color="green"
                    loading={loading}
                    href="/admin/categories"
                />
                <StatsCard
                    title="Blog Posts"
                    value={stats.blogPosts}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    }
                    color="purple"
                    loading={loading}
                    href="/admin/blogs"
                />
                <StatsCard
                    title="Blog Categories"
                    value={stats.blogCategories}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                        </svg>
                    }
                    color="orange"
                    loading={loading}
                    href="/admin/blog-categories"
                />
            </div>

            {/* Quick Actions */}
            <QuickActions actions={quickActions}/>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProductsByCategoryChart
                    data={productsByCategoryData}
                    loading={loading}
                />
                <BlogPostsByCategoryChart
                    data={blogPostsByCategoryData}
                    loading={loading}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ActivityOverTimeChart
                    data={activityOverTimeData}
                    loading={loading}
                />
                <CategoryDistributionChart
                    data={categoryDistributionData}
                    loading={loading}
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentItems
                    title="Recent Products"
                    items={recentProductsItems}
                    loading={loading}
                    emptyMessage="No products yet. Create your first product!"
                />
                <RecentItems
                    title="Recent Blog Posts"
                    items={recentPostsItems}
                    loading={loading}
                    emptyMessage="No blog posts yet. Create your first post!"
                />
            </div>

            {/* Additional Info Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Getting Started
                        </h3>
                        <p className="text-sm text-gray-700 mb-3">
                            Welcome to your admin dashboard! Here are some quick tips to get you started:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                            <li>Create product categories before adding products</li>
                            <li>Create blog categories before writing blog posts</li>
                            <li>Use the quick actions above to quickly navigate to common tasks</li>
                            <li>Click on any statistic card to view detailed information</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdminPage;
