'use client';

import React, { useState } from 'react';
import { HiSearch, HiX, HiFilter, HiChevronDown } from 'react-icons/hi';
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
  const [isExpanded, setIsExpanded] = useState(true);
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
    <div 
      className="rounded-xl border bg-white shadow-sm"
      style={{ borderColor: 'var(--border-light)' }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 sm:p-5"
        style={{
          borderBottom: hasActiveFilters ? '1px solid var(--border-light)' : 'none',
        }}
      >
        <div className="flex items-center gap-2">
          <HiFilter className="h-5 w-5 text-[var(--brand-green)]" />
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-dark)] sm:text-base">
              Bộ lọc tìm kiếm
            </h3>
            <p className="mt-0.5 text-xs text-[var(--text-light)]">
              {resultCount} sản phẩm {hasActiveFilters && 'phù hợp với bộ lọc'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-200"
              style={{
                color: 'var(--brand-green)',
                backgroundColor: 'var(--bg-mint)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--brand-mint)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-mint)';
              }}
            >
              <HiX className="h-3 w-3" />
              <span className="hidden sm:inline">Xóa bộ lọc</span>
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-lg p-1.5 transition-colors duration-200 hover:bg-[var(--bg-grey)]"
            aria-label={isExpanded ? 'Thu gọn' : 'Mở rộng'}
          >
            <HiChevronDown
              className={`h-5 w-5 text-[var(--text-medium)] transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Filter Inputs */}
      {isExpanded && (
        <div className="p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  className="w-full rounded-lg border pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] transition-all duration-200"
                  style={{
                    borderColor: 'var(--border-light)',
                    backgroundColor: 'var(--bg-light)',
                    color: 'var(--text-dark)',
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--text-light)] transition-colors duration-200 hover:bg-[var(--bg-grey)] hover:text-[var(--text-dark)]"
                    aria-label="Xóa tìm kiếm"
                  >
                    <HiX className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="mb-2 block text-xs font-medium text-[var(--text-medium)]">
                Danh mục
              </label>
              <select
                className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] transition-all duration-200"
                style={{
                  borderColor: 'var(--border-light)',
                  backgroundColor: 'var(--bg-light)',
                  color: 'var(--text-dark)',
                }}
                value={categoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="mb-2 block text-xs font-medium text-[var(--text-medium)]">
                Khoảng giá
              </label>
              <select
                className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] transition-all duration-200"
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
                className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] transition-all duration-200"
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
            <div 
              className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t"
              style={{ borderColor: 'var(--border-light)' }}
            >
              <span className="text-xs font-medium text-[var(--text-medium)]">Đang lọc:</span>
              {searchQuery && (
                <span 
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--bg-mint)',
                    color: 'var(--brand-navy)',
                  }}
                >
                  "{searchQuery}"
                  <button
                    onClick={() => removeFilter('searchQuery', '')}
                    className="rounded-full p-0.5 transition-colors duration-200 hover:bg-[var(--brand-green)] hover:text-white"
                    aria-label="Xóa tìm kiếm"
                  >
                    <HiX className="h-3 w-3" />
                  </button>
                </span>
              )}
              {categoryId !== 'all' && (
                <span 
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--bg-mint)',
                    color: 'var(--brand-navy)',
                  }}
                >
                  {categories.find((c) => c.id.toString() === categoryId)?.name || 'Danh mục'}
                  <button
                    onClick={() => removeFilter('categoryId', 'all')}
                    className="rounded-full p-0.5 transition-colors duration-200 hover:bg-[var(--brand-green)] hover:text-white"
                    aria-label="Xóa danh mục"
                  >
                    <HiX className="h-3 w-3" />
                  </button>
                </span>
              )}
              {priceRange !== 'all' && (
                <span 
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--bg-mint)',
                    color: 'var(--brand-navy)',
                  }}
                >
                  {getPriceRangeLabel(priceRange)}
                  <button
                    onClick={() => removeFilter('priceRange', 'all')}
                    className="rounded-full p-0.5 transition-colors duration-200 hover:bg-[var(--brand-green)] hover:text-white"
                    aria-label="Xóa khoảng giá"
                  >
                    <HiX className="h-3 w-3" />
                  </button>
                </span>
              )}
              {sortBy !== 'default' && (
                <span 
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--bg-mint)',
                    color: 'var(--brand-navy)',
                  }}
                >
                  {getSortLabel(sortBy)}
                  <button
                    onClick={() => removeFilter('sortBy', 'default')}
                    className="rounded-full p-0.5 transition-colors duration-200 hover:bg-[var(--brand-green)] hover:text-white"
                    aria-label="Xóa sắp xếp"
                  >
                    <HiX className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
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

