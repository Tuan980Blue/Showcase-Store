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
      <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6">
        {/* Page Header */}
        <CategoryPageHeader
          title="Tất cả danh mục"
          description="Khám phá các danh mục sản phẩm đa dạng và phong phú của chúng tôi"
          categoryCount={filteredCategories.length}
        />

        {/* Search and Sort Section */}
        <div className="mb-4 sm:mb-6">
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
          <CategoryGrid
            categories={filteredCategories}
            loading={categoriesLoading}
            error={categoriesError}
          />
        </main>
      </div>
    </div>
  );
};

export default CategoriesPage;

