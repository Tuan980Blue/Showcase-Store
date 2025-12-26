'use client';

import React, { useState } from 'react';
import { HiSearch, HiX, HiChevronDown } from 'react-icons/hi';
import type { CategoryResponseDto } from '@/types/category.types';

export type SortOption = 'default' | 'name-asc' | 'name-desc' | 'products-asc' | 'products-desc';

interface CategorySearchProps {
  categories: CategoryResponseDto[];
  searchQuery: string;
  sortBy: SortOption;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}

const CategorySearch: React.FC<CategorySearchProps> = ({
  categories,
  searchQuery,
  sortBy,
  onSearchChange,
  onSortChange,
  resultCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const hasActiveFilters = searchQuery.trim() !== '' || sortBy !== 'default';

  return (
    <div 
      className="sticky top-0 z-40 mb-4 rounded-lg border bg-white shadow-lg transition-all duration-300 lg:relative lg:top-auto lg:z-auto lg:shadow-sm"
      style={{ 
        borderColor: 'var(--border-light)',
        backgroundColor: 'white',
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 sm:p-4 lg:p-5"
        style={{
          borderBottom: hasActiveFilters ? '1px solid var(--border-light)' : 'none',
        }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10"
            style={{ backgroundColor: 'var(--bg-mint)' }}
          >
            <HiSearch className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--brand-green)' }} />
          </div>
          <div>
            <h3 
              className="text-sm font-bold sm:text-base lg:text-lg"
              style={{ color: 'var(--text-dark)' }}
            >
              Tìm kiếm & Sắp xếp
            </h3>
            <p 
              className="mt-0.5 text-xs sm:text-sm"
              style={{ color: 'var(--text-light)' }}
            >
              <span className="font-semibold" style={{ color: 'var(--brand-green)' }}>
                {resultCount}
              </span>
              {' '}danh mục {hasActiveFilters && 'phù hợp'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-lg p-1.5 transition-all duration-200"
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
            className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            style={{ color: 'var(--text-medium)' }}
          />
        </button>
      </div>

      {/* Search and Sort Inputs */}
      {isExpanded && (
        <div className="p-3 sm:p-4 lg:p-5">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {/* Search Input */}
            <div>
              <label 
                className="mb-1.5 block text-xs font-semibold sm:text-sm"
                style={{ color: 'var(--text-medium)' }}
              >
                Tìm kiếm danh mục
              </label>
              <div className="relative">
                <HiSearch 
                  className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 sm:left-3 sm:h-5 sm:w-5" 
                  style={{ color: 'var(--text-light)' }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Nhập tên danh mục..."
                  className="w-full rounded-lg border pl-9 pr-9 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:pl-10 sm:pr-10 sm:py-2.5 sm:text-base"
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
                    onClick={() => onSearchChange('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 transition-all duration-200 hover:scale-110 sm:right-3"
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
                    <HiX className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label 
                className="mb-1.5 block text-xs font-semibold sm:text-sm"
                style={{ color: 'var(--text-medium)' }}
              >
                Sắp xếp theo
              </label>
              <select
                className="w-full rounded-lg border px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:py-2.5 sm:text-base"
                style={{
                  borderColor: 'var(--border-light)',
                  backgroundColor: 'var(--bg-light)',
                  color: 'var(--text-dark)',
                }}
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
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
                <option value="name-asc">Tên: A → Z</option>
                <option value="name-desc">Tên: Z → A</option>
                <option value="products-asc">Số sản phẩm: Ít → Nhiều</option>
                <option value="products-desc">Số sản phẩm: Nhiều → Ít</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div 
              className="mt-3 flex flex-wrap items-center gap-2 pt-3 border-t sm:mt-4 sm:gap-3 sm:pt-4"
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
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 sm:px-3 sm:py-1.5 sm:text-sm"
                  style={{
                    backgroundColor: 'var(--bg-mint)',
                    color: 'var(--brand-navy)',
                  }}
                >
                  <span className="max-w-[120px] truncate sm:max-w-none">"{searchQuery}"</span>
                  <button
                    onClick={() => onSearchChange('')}
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
              {sortBy !== 'default' && (
                <span 
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 sm:px-3 sm:py-1.5 sm:text-sm"
                  style={{
                    backgroundColor: 'var(--bg-mint)',
                    color: 'var(--brand-navy)',
                  }}
                >
                  {getSortLabel(sortBy)}
                  <button
                    onClick={() => onSortChange('default')}
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

// Helper function
const getSortLabel = (sort: SortOption): string => {
  const labels: Record<SortOption, string> = {
    'default': 'Mặc định',
    'name-asc': 'Tên A-Z',
    'name-desc': 'Tên Z-A',
    'products-asc': 'Sản phẩm ↑',
    'products-desc': 'Sản phẩm ↓',
  };
  return labels[sort];
};

export default CategorySearch;

