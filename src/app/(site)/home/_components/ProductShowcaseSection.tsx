'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { ProductListItemDto } from '@/types/product.types';
import type { CategoryResponseDto } from '@/types/category.types';
import ProductGrid from './ProductGrid';
import ProductFilters, { type FilterState } from './ProductFilters';
import { useProductFilters } from './useProductFilters';
import { HiSearch } from 'react-icons/hi';

interface ProductShowcaseSectionProps {
  products: ProductListItemDto[];
  loading: boolean;
  error: string | null;
  categories: CategoryResponseDto[];
  selectedCategoryId?: string | 'all';
  onCategoryChange?: (id: string | 'all') => void;
}

const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  products,
  loading,
  error,
  categories,
  selectedCategoryId,
  onCategoryChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    categoryId: 'all',
    priceRange: 'all',
    sortBy: 'default',
  });
  
  // Track if category change is from external prop to avoid unnecessary parent updates
  const isExternalCategoryUpdate = useRef(false);
  // Track the last category value we notified parent about
  const lastNotifiedCategoryId = useRef<string | 'all'>(filterState.categoryId);

  // Sync external category selection with internal filter state
  useEffect(() => {
    if (selectedCategoryId !== undefined && selectedCategoryId !== filterState.categoryId) {
      isExternalCategoryUpdate.current = true;
      setFilterState((prev) => ({
        ...prev,
        categoryId: selectedCategoryId,
      }));
      lastNotifiedCategoryId.current = selectedCategoryId;
    }
  }, [selectedCategoryId, filterState.categoryId]);

  // Use the custom hook for filtering logic
  const { filteredProducts } = useProductFilters(products, categories, filterState);

  // Sync category changes to parent component (using useEffect to avoid render-time updates)
  useEffect(() => {
    // Only notify parent if:
    // 1. Category changed internally (not from external prop)
    // 2. The new category is different from what we last notified parent about
    // 3. The change wasn't triggered by an external update
    if (
      onCategoryChange &&
      !isExternalCategoryUpdate.current &&
      filterState.categoryId !== lastNotifiedCategoryId.current
    ) {
      onCategoryChange(filterState.categoryId);
      lastNotifiedCategoryId.current = filterState.categoryId;
    }
    // Reset the flag after handling
    isExternalCategoryUpdate.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState.categoryId]);

  // Handle filter changes
  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    const defaultState: FilterState = {
      searchQuery: '',
      categoryId: 'all',
      priceRange: 'all',
      sortBy: 'default',
    };
    setFilterState(defaultState);
    // onCategoryChange will be called via useEffect when categoryId changes to 'all'
  };

  // Check if any filters are active
  const hasActiveFilters =
    filterState.searchQuery.trim() !== '' ||
    filterState.categoryId !== 'all' ||
    filterState.priceRange !== 'all' ||
    filterState.sortBy !== 'default';

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-semibold uppercase tracking-wide text-[var(--brand-navy)]">
            Sản phẩm dành cho bạn
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-light)] mt-1">
            {filteredProducts.length} sản phẩm {hasActiveFilters && 'phù hợp với bộ lọc'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs sm:text-sm font-medium transition-colors hover:bg-[var(--bg-mint)]"
            style={{
              borderColor: 'var(--border-light)',
              backgroundColor: showFilters ? 'var(--bg-mint)' : 'var(--bg-light)',
              color: 'var(--text-dark)',
            }}
          >
            <HiSearch className="h-4 w-4" />
            <span className="hidden sm:inline">Bộ lọc</span>
            {hasActiveFilters && (
              <span className="ml-1 h-2 w-2 rounded-full bg-[var(--brand-green)]" />
            )}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <ProductFilters
          categories={categories}
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          resultCount={filteredProducts.length}
        />
      )}

      {/* Products Grid */}
      <ProductGrid
        products={filteredProducts}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ProductShowcaseSection;


