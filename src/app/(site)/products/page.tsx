'use client';

import React, { useState, useCallback } from 'react';
import { usePublicProducts, usePublicCategories } from '@/app/(site)/_hooks';
import ProductPageHeader from './_components/ProductPageHeader';
import ProductFilters, { type FilterState } from './_components/ProductFilters';
import CategorySidebar from './_components/CategorySidebar';
import ProductGrid from './_components/ProductGrid';
import { useProductFilters } from './_hooks/useProductFilters';

const ProductsPage: React.FC = () => {
  // Fetch data
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

  // Filter state
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    categoryId: 'all',
    priceRange: 'all',
    sortBy: 'default',
  });

  // Handle filter changes
  const handleFilterChange = useCallback((filters: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...filters }));
  }, []);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setFilterState({
      searchQuery: '',
      categoryId: 'all',
      priceRange: 'all',
      sortBy: 'default',
    });
  }, []);

  // Handle category selection from sidebar
  const handleCategorySelect = useCallback((categoryId: string | 'all') => {
    setFilterState((prev) => ({ ...prev, categoryId }));
  }, []);

  // Apply filters
  const { filteredProducts } = useProductFilters(
    products,
    categories,
    filterState
  );

  const isLoading = productsLoading || categoriesLoading;
  const hasError = productsError || categoriesError;

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
        <ProductPageHeader
          title="Tất cả sản phẩm"
          description="Khám phá bộ sưu tập sản phẩm đa dạng và chất lượng cao của chúng tôi"
          productCount={filteredProducts.length}
        />

        {/* Filters Section */}
        <div className="mb-6">
          <ProductFilters
            categories={categories}
            filterState={filterState}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            resultCount={filteredProducts.length}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Sidebar - Categories */}
          <aside className="lg:sticky lg:top-20 lg:col-span-3 lg:self-start">
            <CategorySidebar
              categories={categories}
              loading={categoriesLoading}
              selectedCategoryId={filterState.categoryId}
              onSelectCategory={handleCategorySelect}
            />
          </aside>

          {/* Main Content - Product Grid */}
          <main className="lg:col-span-9">
            {hasError ? (
              <div 
                className="rounded-xl border p-8 text-center"
                style={{ 
                  borderColor: 'var(--state-error)',
                  backgroundColor: 'rgba(230, 80, 80, 0.05)',
                }}
              >
                <p className="text-base font-medium text-[var(--state-error)] sm:text-lg">
                  {productsError || categoriesError || 'Đã xảy ra lỗi'}
                </p>
                <p className="mt-2 text-sm text-[var(--text-light)]">
                  Vui lòng thử lại sau
                </p>
              </div>
            ) : (
              <ProductGrid
                products={filteredProducts}
                loading={isLoading}
                error={hasError ? (productsError || categoriesError) : null}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

