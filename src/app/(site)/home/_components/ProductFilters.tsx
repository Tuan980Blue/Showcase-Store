'use client';

import React from 'react';
import { HiSearch, HiX } from 'react-icons/hi';
import type { CategoryResponseDto } from '@/types/category.types';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
export type PriceRange = 'all' | 'under-100k' | '100k-500k' | '500k-1m' | '1m-5m' | 'over-5m';

export interface FilterState {
  searchQuery: string;
  categoryId: string | 'all';
  priceRange: PriceRange;
  sortBy: SortOption;
}

interface ProductFiltersProps {
  categories: CategoryResponseDto[];
  filterState: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
  resultCount: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  filterState,
  onFilterChange,
  onClearFilters,
  resultCount,
}) => {
  const { searchQuery, categoryId, priceRange, sortBy } = filterState;

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    categoryId !== 'all' ||
    priceRange !== 'all' ||
    sortBy !== 'default';

  const handleSearchChange = (value: string) => {
    onFilterChange({ searchQuery: value });
  };

  const handleCategoryChange = (value: string | 'all') => {
    onFilterChange({ categoryId: value });
  };

  const handlePriceRangeChange = (value: PriceRange) => {
    onFilterChange({ priceRange: value });
  };

  const handleSortChange = (value: SortOption) => {
    onFilterChange({ sortBy: value });
  };

  const removeFilter = (filterType: keyof FilterState, value: any) => {
    const defaultValues: Record<keyof FilterState, any> = {
      searchQuery: '',
      categoryId: 'all',
      priceRange: 'all',
      sortBy: 'default',
    };
    onFilterChange({ [filterType]: defaultValues[filterType] });
  };

  return (
    <div className="rounded-xl border bg-white/90 p-4 sm:p-5 shadow-sm" style={{ borderColor: 'var(--border-light)' }}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-dark)]">Bộ lọc tìm kiếm</h3>
          <p className="mt-1 text-xs text-[var(--text-light)]">
            {resultCount} sản phẩm {hasActiveFilters && 'phù hợp với bộ lọc'}
          </p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 text-xs text-[var(--brand-green)] hover:underline"
          >
            <HiX className="h-3 w-3" />
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Filter Inputs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Search Input */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="mb-2 block text-xs font-medium text-[var(--text-medium)]">
            Tìm kiếm sản phẩm
          </label>
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-light)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Nhập tên sản phẩm..."
              className="w-full rounded-lg border pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
              style={{
                borderColor: 'var(--border-light)',
                backgroundColor: 'var(--bg-light)',
                color: 'var(--text-dark)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-light)] hover:text-[var(--text-dark)]"
                aria-label="Xóa tìm kiếm"
              >
                <HiX className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="mb-2 block text-xs font-medium text-[var(--text-medium)]">
            Khoảng giá
          </label>
          <select
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
            style={{
              borderColor: 'var(--border-light)',
              backgroundColor: 'var(--bg-light)',
              color: 'var(--text-dark)',
            }}
            value={priceRange}
            onChange={(e) => handlePriceRangeChange(e.target.value as PriceRange)}
          >
            <option value="all">Tất cả mức giá</option>
            <option value="under-100k">Dưới 100.000₫</option>
            <option value="100k-500k">100.000₫ - 500.000₫</option>
            <option value="500k-1m">500.000₫ - 1.000.000₫</option>
            <option value="1m-5m">1.000.000₫ - 5.000.000₫</option>
            <option value="over-5m">Trên 5.000.000₫</option>
          </select>
        </div>

        {/* Sort Options */}
        <div>
          <label className="mb-2 block text-xs font-medium text-[var(--text-medium)]">
            Sắp xếp theo
          </label>
          <select
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
            style={{
              borderColor: 'var(--border-light)',
              backgroundColor: 'var(--bg-light)',
              color: 'var(--text-dark)',
            }}
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá: Thấp → Cao</option>
            <option value="price-desc">Giá: Cao → Thấp</option>
            <option value="name-asc">Tên: A → Z</option>
            <option value="name-desc">Tên: Z → A</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
          <span className="text-xs text-[var(--text-medium)]">Đang lọc:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-mint)] px-2 py-1 text-xs text-[var(--brand-navy)]">
              "{searchQuery}"
              <button
                onClick={() => removeFilter('searchQuery', '')}
                className="hover:text-[var(--brand-green)]"
                aria-label="Xóa tìm kiếm"
              >
                <HiX className="h-3 w-3" />
              </button>
            </span>
          )}
          {categoryId !== 'all' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-mint)] px-2 py-1 text-xs text-[var(--brand-navy)]">
              {categories.find((c) => c.id.toString() === categoryId)?.name || 'Danh mục'}
              <button
                onClick={() => removeFilter('categoryId', 'all')}
                className="hover:text-[var(--brand-green)]"
                aria-label="Xóa danh mục"
              >
                <HiX className="h-3 w-3" />
              </button>
            </span>
          )}
          {priceRange !== 'all' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-mint)] px-2 py-1 text-xs text-[var(--brand-navy)]">
              {getPriceRangeLabel(priceRange)}
              <button
                onClick={() => removeFilter('priceRange', 'all')}
                className="hover:text-[var(--brand-green)]"
                aria-label="Xóa khoảng giá"
              >
                <HiX className="h-3 w-3" />
              </button>
            </span>
          )}
          {sortBy !== 'default' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-mint)] px-2 py-1 text-xs text-[var(--brand-navy)]">
              {getSortLabel(sortBy)}
              <button
                onClick={() => removeFilter('sortBy', 'default')}
                className="hover:text-[var(--brand-green)]"
                aria-label="Xóa sắp xếp"
              >
                <HiX className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Helper functions
const getPriceRangeLabel = (range: PriceRange): string => {
  const labels: Record<PriceRange, string> = {
    'all': 'Tất cả',
    'under-100k': 'Dưới 100k',
    '100k-500k': '100k-500k',
    '500k-1m': '500k-1m',
    '1m-5m': '1m-5m',
    'over-5m': 'Trên 5m',
  };
  return labels[range];
};

const getSortLabel = (sort: SortOption): string => {
  const labels: Record<SortOption, string> = {
    'default': 'Mặc định',
    'price-asc': 'Giá ↑',
    'price-desc': 'Giá ↓',
    'name-asc': 'Tên A-Z',
    'name-desc': 'Tên Z-A',
  };
  return labels[sort];
};

export default ProductFilters;

