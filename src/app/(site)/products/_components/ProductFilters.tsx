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
      className="sticky top-0 z-40 mb-6 rounded-xl border bg-white shadow-lg transition-all duration-300 lg:relative lg:top-auto lg:z-auto lg:shadow-sm"
      style={{ 
        borderColor: 'var(--border-light)',
        backgroundColor: 'white',
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 sm:p-5 lg:p-6"
        style={{
          borderBottom: hasActiveFilters ? '1px solid var(--border-light)' : 'none',
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12"
            style={{ backgroundColor: 'var(--bg-mint)' }}
          >
            <HiFilter className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: 'var(--brand-green)' }} />
          </div>
          <div>
            <h3 
              className="text-sm font-bold sm:text-base lg:text-lg"
              style={{ color: 'var(--text-dark)' }}
            >
              Bộ lọc tìm kiếm
            </h3>
            <p 
              className="mt-0.5 text-xs sm:text-sm"
              style={{ color: 'var(--text-light)' }}
            >
              <span className="font-semibold" style={{ color: 'var(--brand-green)' }}>
                {resultCount}
              </span>
              {' '}sản phẩm {hasActiveFilters && 'phù hợp'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 sm:text-sm"
              style={{
                color: 'var(--brand-green)',
                backgroundColor: 'var(--bg-mint)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--brand-mint)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-mint)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <HiX className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Xóa bộ lọc</span>
              <span className="sm:hidden">Xóa</span>
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-lg p-2 transition-all duration-200"
            style={{ 
              backgroundColor: isExpanded ? 'var(--bg-grey)' : 'transparent',
            }}
            onMouseEnter={(e) => {
              if (!isExpanded) {
                e.currentTarget.style.backgroundColor = 'var(--bg-grey)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isExpanded) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
            aria-label={isExpanded ? 'Thu gọn' : 'Mở rộng'}
          >
            <HiChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              style={{ color: 'var(--text-medium)' }}
            />
          </button>
        </div>
      </div>

      {/* Filter Inputs */}
      {isExpanded && (
        <div className="p-4 sm:p-5 lg:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search Input */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label 
                className="mb-2 block text-xs font-semibold sm:text-sm"
                style={{ color: 'var(--text-medium)' }}
              >
                Tìm kiếm sản phẩm
              </label>
              <div className="relative">
                <HiSearch 
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 sm:h-5 sm:w-5" 
                  style={{ color: 'var(--text-light)' }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Nhập tên sản phẩm..."
                  className="w-full rounded-lg border pl-10 pr-10 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:py-3 sm:text-base"
                  style={{
                    borderColor: 'var(--border-light)',
                    backgroundColor: 'var(--bg-light)',
                    color: 'var(--text-dark)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand-green)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(47, 191, 113, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition-all duration-200 hover:scale-110"
                    style={{ color: 'var(--text-light)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text-dark)';
                      e.currentTarget.style.backgroundColor = 'var(--bg-grey)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-light)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    aria-label="Xóa tìm kiếm"
                  >
                    <HiX className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label 
                className="mb-2 block text-xs font-semibold sm:text-sm"
                style={{ color: 'var(--text-medium)' }}
              >
                Danh mục
              </label>
              <select
                className="w-full rounded-lg border px-3 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:py-3 sm:text-base"
                style={{
                  borderColor: 'var(--border-light)',
                  backgroundColor: 'var(--bg-light)',
                  color: 'var(--text-dark)',
                }}
                value={categoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand-green)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(47, 191, 113, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
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
              <label 
                className="mb-2 block text-xs font-semibold sm:text-sm"
                style={{ color: 'var(--text-medium)' }}
              >
                Khoảng giá
              </label>
              <select
                className="w-full rounded-lg border px-3 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:py-3 sm:text-base"
                style={{
                  borderColor: 'var(--border-light)',
                  backgroundColor: 'var(--bg-light)',
                  color: 'var(--text-dark)',
                }}
                value={priceRange}
                onChange={(e) => handlePriceRangeChange(e.target.value as PriceRange)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand-green)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(47, 191, 113, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
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
              <label 
                className="mb-2 block text-xs font-semibold sm:text-sm"
                style={{ color: 'var(--text-medium)' }}
              >
                Sắp xếp theo
              </label>
              <select
                className="w-full rounded-lg border px-3 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:py-3 sm:text-base"
                style={{
                  borderColor: 'var(--border-light)',
                  backgroundColor: 'var(--bg-light)',
                  color: 'var(--text-dark)',
                }}
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand-green)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(47, 191, 113, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
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
              className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t sm:mt-6 sm:gap-3"
              style={{ borderColor: 'var(--border-light)' }}
            >
              <span 
                className="text-xs font-semibold sm:text-sm"
                style={{ color: 'var(--text-medium)' }}
              >
                Đang lọc:
              </span>
              {searchQuery && (
                <span 
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm"
                  style={{
                    backgroundColor: 'var(--bg-mint)',
                    color: 'var(--brand-navy)',
                  }}
                >
                  <span className="max-w-[120px] truncate sm:max-w-none">"{searchQuery}"</span>
                  <button
                    onClick={() => removeFilter('searchQuery', '')}
                    className="flex-shrink-0 rounded-full p-0.5 transition-all duration-200 hover:scale-110"
                    style={{
                      color: 'var(--text-medium)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--brand-green)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-medium)';
                    }}
                    aria-label="Xóa tìm kiếm"
                  >
                    <HiX className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </button>
                </span>
              )}
              {categoryId !== 'all' && (
                <span 
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm"
                  style={{
                    backgroundColor: 'var(--bg-mint)',
                    color: 'var(--brand-navy)',
                  }}
                >
                  <span className="max-w-[120px] truncate sm:max-w-none">
                    {categories.find((c) => c.id.toString() === categoryId)?.name || 'Danh mục'}
                  </span>
                  <button
                    onClick={() => removeFilter('categoryId', 'all')}
                    className="flex-shrink-0 rounded-full p-0.5 transition-all duration-200 hover:scale-110"
                    style={{
                      color: 'var(--text-medium)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--brand-green)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-medium)';
                    }}
                    aria-label="Xóa danh mục"
                  >
                    <HiX className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </button>
                </span>
              )}
              {priceRange !== 'all' && (
                <span 
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm"
                  style={{
                    backgroundColor: 'var(--bg-mint)',
                    color: 'var(--brand-navy)',
                  }}
                >
                  {getPriceRangeLabel(priceRange)}
                  <button
                    onClick={() => removeFilter('priceRange', 'all')}
                    className="flex-shrink-0 rounded-full p-0.5 transition-all duration-200 hover:scale-110"
                    style={{
                      color: 'var(--text-medium)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--brand-green)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-medium)';
                    }}
                    aria-label="Xóa khoảng giá"
                  >
                    <HiX className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </button>
                </span>
              )}
              {sortBy !== 'default' && (
                <span 
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm"
                  style={{
                    backgroundColor: 'var(--bg-mint)',
                    color: 'var(--brand-navy)',
                  }}
                >
                  {getSortLabel(sortBy)}
                  <button
                    onClick={() => removeFilter('sortBy', 'default')}
                    className="flex-shrink-0 rounded-full p-0.5 transition-all duration-200 hover:scale-110"
                    style={{
                      color: 'var(--text-medium)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--brand-green)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-medium)';
                    }}
                    aria-label="Xóa sắp xếp"
                  >
                    <HiX className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
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

