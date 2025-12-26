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
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-dark)] sm:text-base">
            Tìm kiếm & Sắp xếp
          </h3>
          <p className="mt-0.5 text-xs text-[var(--text-light)]">
            {resultCount} danh mục {hasActiveFilters && 'phù hợp với bộ lọc'}
          </p>
        </div>
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

      {/* Search and Sort Inputs */}
      {isExpanded && (
        <div className="p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Search Input */}
            <div>
              <label className="mb-2 block text-xs font-medium text-[var(--text-medium)]">
                Tìm kiếm danh mục
              </label>
              <div className="relative">
                <HiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-light)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Nhập tên danh mục..."
                  className="w-full rounded-lg border pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] transition-all duration-200"
                  style={{
                    borderColor: 'var(--border-light)',
                    backgroundColor: 'var(--bg-light)',
                    color: 'var(--text-dark)',
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--text-light)] transition-colors duration-200 hover:bg-[var(--bg-grey)] hover:text-[var(--text-dark)]"
                    aria-label="Xóa tìm kiếm"
                  >
                    <HiX className="h-4 w-4" />
                  </button>
                )}
              </div>
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
                onChange={(e) => onSortChange(e.target.value as SortOption)}
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
                    onClick={() => onSearchChange('')}
                    className="rounded-full p-0.5 transition-colors duration-200 hover:bg-[var(--brand-green)] hover:text-white"
                    aria-label="Xóa tìm kiếm"
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
                    onClick={() => onSortChange('default')}
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

