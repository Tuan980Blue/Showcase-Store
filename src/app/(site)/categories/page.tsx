'use client';

import React, { useState, useCallback } from 'react';
import { usePublicCategories } from '@/app/(site)/_hooks';
import CategoryPageHeader from './_components/CategoryPageHeader';
import CategorySearch, { type SortOption } from './_components/CategorySearch';
import CategoryGrid from './_components/CategoryGrid';
import { useCategoryFilters } from './_hooks/useCategoryFilters';

const CategoriesPage: React.FC = () => {
  // Fetch data
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = usePublicCategories();

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Handle search change
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((sort: SortOption) => {
    setSortBy(sort);
  }, []);

  // Apply filters
  const { filteredCategories } = useCategoryFilters(
    categories,
    searchQuery,
    sortBy
  );

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
        <CategoryPageHeader
          title="Tất cả danh mục"
          description="Khám phá các danh mục sản phẩm đa dạng và phong phú của chúng tôi"
          categoryCount={filteredCategories.length}
        />

        {/* Search and Sort Section */}
        <div className="mb-6">
          <CategorySearch
            categories={categories}
            searchQuery={searchQuery}
            sortBy={sortBy}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            resultCount={filteredCategories.length}
          />
        </div>

        {/* Categories Grid */}
        <main>
          {categoriesError ? (
            <div 
              className="rounded-xl border p-8 text-center"
              style={{ 
                borderColor: 'var(--state-error)',
                backgroundColor: 'rgba(230, 80, 80, 0.05)',
              }}
            >
              <p className="text-base font-medium text-[var(--state-error)] sm:text-lg">
                {categoriesError || 'Đã xảy ra lỗi'}
              </p>
              <p className="mt-2 text-sm text-[var(--text-light)]">
                Vui lòng thử lại sau
              </p>
            </div>
          ) : (
            <CategoryGrid
              categories={filteredCategories}
              loading={categoriesLoading}
              error={categoriesError}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoriesPage;

