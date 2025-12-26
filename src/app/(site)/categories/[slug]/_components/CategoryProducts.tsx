'use client';

import React, { useState, useMemo } from 'react';
import { useProductFilters } from '@/app/(site)/products/_hooks/useProductFilters';
import { usePublicCategories } from '@/app/(site)/_hooks';
import ProductGrid from '@/app/(site)/products/_components/ProductGrid';
import ProductFilters, { type FilterState } from '@/app/(site)/products/_components/ProductFilters';
import type { ProductListItemDto } from '@/types/product.types';

interface CategoryProductsProps {
  products: ProductListItemDto[];
  categoryName: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ products, categoryName }) => {
  const { categories } = usePublicCategories();
  
  // Filter state - category is already filtered, so we only need other filters
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    categoryId: 'all', // Keep as 'all' since we're already in a category
    priceRange: 'all',
    sortBy: 'default',
  });

  // Handle filter changes
  const handleFilterChange = (filters: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...filters }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilterState({
      searchQuery: '',
      categoryId: 'all',
      priceRange: 'all',
      sortBy: 'default',
    });
  };

  // Apply filters (only price, search, sort - category is already filtered)
  const { filteredProducts } = useProductFilters(
    products,
    categories,
    filterState
  );

  if (!products.length) {
    return (
      <div 
        className="rounded-lg border p-8 text-center sm:p-12"
        style={{ 
          borderColor: 'var(--border-light)',
          backgroundColor: 'var(--bg-light)',
        }}
      >
        <p className="text-base font-semibold text-[var(--text-medium)] sm:text-lg">
          Chưa có sản phẩm nào trong danh mục này
        </p>
        <p className="mt-1.5 text-xs text-[var(--text-light)] sm:text-sm">
          Vui lòng quay lại sau
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <ProductFilters
        categories={categories}
        filterState={filterState}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        resultCount={filteredProducts.length}
      />

      {/* Products Grid */}
      <ProductGrid
        products={filteredProducts}
        loading={false}
        error={null}
      />
    </div>
  );
};

export default CategoryProducts;

