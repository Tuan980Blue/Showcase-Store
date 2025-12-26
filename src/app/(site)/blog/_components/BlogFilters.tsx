'use client';

import React from 'react';
import { HiSearch, HiX } from 'react-icons/hi';
import type { BlogCategoryResponseDto } from '@/types/blog.types';

export interface BlogFilterState {
  searchQuery: string;
  categoryId: number | 'all';
  sortBy: 'newest' | 'oldest' | 'title';
}

interface BlogFiltersProps {
  categories: BlogCategoryResponseDto[];
  filterState: BlogFilterState;
  onFilterChange: (filters: Partial<BlogFilterState>) => void;
  onClearFilters: () => void;
  resultCount: number;
}

const BlogFilters: React.FC<BlogFiltersProps> = ({
  categories,
  filterState,
  onFilterChange,
  onClearFilters,
  resultCount,
}) => {
  const hasActiveFilters = 
    filterState.searchQuery !== '' || 
    filterState.categoryId !== 'all' ||
    filterState.sortBy !== 'newest';

  return (
    <div 
      className="rounded-xl border p-4 sm:p-6"
      style={{ 
        borderColor: 'var(--border-light)',
        backgroundColor: 'white',
      }}
    >
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <HiSearch 
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
            style={{ color: 'var(--text-light)' }}
          />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={filterState.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full rounded-lg border pl-10 pr-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0"
            style={{
              borderColor: 'var(--border-light)',
              color: 'var(--text-dark)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-green)';
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(47, 191, 113, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-light)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          {filterState.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-light)' }}
            >
              <HiX className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Filter */}
          <div className="flex flex-1 items-center gap-2">
            <label 
              className="text-sm font-medium whitespace-nowrap"
              style={{ color: 'var(--text-medium)' }}
            >
              Danh mục:
            </label>
            <select
              value={filterState.categoryId}
              onChange={(e) => {
                const value = e.target.value;
                onFilterChange({ 
                  categoryId: value === 'all' ? 'all' : parseInt(value, 10) 
                });
              }}
              className="flex-1 rounded-lg border px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0"
              style={{
                borderColor: 'var(--border-light)',
                color: 'var(--text-dark)',
                backgroundColor: 'white',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-green)';
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(47, 191, 113, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="all">Tất cả</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.blogPostCount})
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <label 
              className="text-sm font-medium whitespace-nowrap"
              style={{ color: 'var(--text-medium)' }}
            >
              Sắp xếp:
            </label>
            <select
              value={filterState.sortBy}
              onChange={(e) => {
                onFilterChange({ 
                  sortBy: e.target.value as BlogFilterState['sortBy']
                });
              }}
              className="rounded-lg border px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0"
              style={{
                borderColor: 'var(--border-light)',
                color: 'var(--text-dark)',
                backgroundColor: 'white',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-green)';
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(47, 191, 113, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="title">Theo tiêu đề</option>
            </select>
          </div>
        </div>

        {/* Active Filters & Clear */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t" style={{ borderColor: 'var(--border-light)' }}>
          <div className="flex items-center gap-2">
            <span 
              className="text-sm"
              style={{ color: 'var(--text-medium)' }}
            >
              Tìm thấy <strong style={{ color: 'var(--text-dark)' }}>{resultCount}</strong> {resultCount === 1 ? 'bài viết' : 'bài viết'}
            </span>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:opacity-80"
              style={{
                color: 'var(--state-error)',
                backgroundColor: 'rgba(230, 80, 80, 0.1)',
              }}
            >
              <HiX className="h-4 w-4" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogFilters;

