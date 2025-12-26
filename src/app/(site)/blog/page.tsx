'use client';

import React, { useState, useCallback } from 'react';
import { usePublishedBlogPosts } from '@/app/(site)/_hooks';
import {
  BlogPageHeader,
  BlogCategorySidebar,
  BlogPostGrid,
  BlogFilters,
  type BlogFilterState,
} from './_components';
import { useBlogFilters } from './_hooks/useBlogFilters';

const BlogPage: React.FC = () => {
  // Fetch data
  const {
    posts,
    categories,
    loading: postsLoading,
    categoriesLoading,
    error: postsError,
  } = usePublishedBlogPosts();

  // Filter state
  const [filterState, setFilterState] = useState<BlogFilterState>({
    searchQuery: '',
    categoryId: 'all',
    sortBy: 'newest',
  });

  // Handle filter changes
  const handleFilterChange = useCallback((filters: Partial<BlogFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...filters }));
  }, []);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setFilterState({
      searchQuery: '',
      categoryId: 'all',
      sortBy: 'newest',
    });
  }, []);

  // Handle category selection from sidebar
  const handleCategorySelect = useCallback((categoryId: number | 'all') => {
    setFilterState((prev) => ({ ...prev, categoryId }));
  }, []);

  // Apply filters
  const { filteredPosts } = useBlogFilters({
    posts,
    filterState,
  });

  const isLoading = postsLoading || categoriesLoading;
  const hasError = postsError;

  return (
    <div 
      className="min-h-screen w-full"
      style={{ 
        backgroundColor: 'var(--bg-light)',
        color: 'var(--text-dark)',
      }}
    >
      {/* Main Container */}
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Page Header */}
        <BlogPageHeader
          title="Blog Hướng Dẫn Kỹ Thuật"
          description="Khám phá các bài viết chia sẻ kinh nghiệm, hướng dẫn lắp đặt và tối ưu hệ thống trưng bày. Cập nhật xu hướng mới nhất và các mẹo hữu ích từ đội ngũ chuyên gia."
          postCount={filteredPosts.length}
        />

        {/* Filters Section */}
        <div className="mb-6">
          <BlogFilters
            categories={categories}
            filterState={filterState}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            resultCount={filteredPosts.length}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Sidebar - Categories */}
          <aside className="lg:sticky lg:top-20 lg:col-span-3 lg:self-start">
            <BlogCategorySidebar
              categories={categories}
              loading={categoriesLoading}
              selectedCategoryId={filterState.categoryId}
              onSelectCategory={handleCategorySelect}
            />
          </aside>

          {/* Main Content - Blog Post Grid */}
          <main className="lg:col-span-9">
            {hasError ? (
              <div 
                className="rounded-xl border p-8 text-center"
                style={{ 
                  borderColor: 'var(--state-error)',
                  backgroundColor: 'rgba(230, 80, 80, 0.05)',
                }}
              >
                <p 
                  className="mb-2 text-base font-medium sm:text-lg"
                  style={{ color: 'var(--state-error)' }}
                >
                  {postsError || 'Đã xảy ra lỗi'}
                </p>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--text-light)' }}
                >
                  Vui lòng thử lại sau
                </p>
              </div>
            ) : (
              <BlogPostGrid
                posts={filteredPosts}
                loading={isLoading}
                error={hasError ? postsError : null}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

