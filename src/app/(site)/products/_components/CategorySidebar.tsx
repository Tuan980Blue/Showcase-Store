'use client';

import React from 'react';
import Link from 'next/link';
import { HiViewGrid, HiChevronRight } from 'react-icons/hi';
import type { CategoryResponseDto } from '@/types/category.types';

interface CategorySidebarProps {
  categories: CategoryResponseDto[];
  loading?: boolean;
  selectedCategoryId?: string | 'all';
  onSelectCategory?: (categoryId: string | 'all') => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  loading = false,
  selectedCategoryId = 'all',
  onSelectCategory,
}) => {
  const handleCategoryClick = (categoryId: string | 'all') => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
  };

  if (loading) {
    return (
      <div 
        className="rounded-xl border p-4"
        style={{ 
          borderColor: 'var(--border-light)',
          backgroundColor: 'white',
        }}
      >
        <div className="mb-4 h-6 w-32 animate-pulse rounded bg-[var(--bg-grey)]" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-full animate-pulse rounded-lg bg-[var(--bg-grey)]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
        className="rounded-lg border p-3 sm:p-4 shadow-sm lg:max-h-[calc(100vh-100px)] lg:overflow-auto"
      style={{ 
        borderColor: 'var(--border-light)',
        backgroundColor: 'white',
      }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <HiViewGrid className="h-5 w-5 text-[var(--brand-green)]" />
        <h3 className="text-base font-semibold text-[var(--text-dark)] sm:text-lg">
          Danh mục sản phẩm
        </h3>
      </div>

      {/* Category List */}
      <nav className="space-y-1">
        <button
          onClick={() => handleCategoryClick('all')}
          className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 ${
            selectedCategoryId === 'all'
              ? 'font-semibold text-[var(--brand-green)]'
              : 'text-[var(--text-medium)] hover:text-[var(--text-dark)]'
          }`}
          style={{
            backgroundColor: selectedCategoryId === 'all' ? 'var(--bg-mint)' : 'transparent',
          }}
        >
          <span>Tất cả sản phẩm</span>
          {selectedCategoryId === 'all' && (
            <HiChevronRight className="h-4 w-4 text-[var(--brand-green)]" />
          )}
        </button>

        {categories.map((category) => {
          const isSelected = selectedCategoryId === category.id.toString();
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id.toString())}
              className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                isSelected
                  ? 'font-semibold text-[var(--brand-green)]'
                  : 'text-[var(--text-medium)] hover:text-[var(--text-dark)]'
              }`}
              style={{
                backgroundColor: isSelected ? 'var(--bg-mint)' : 'transparent',
              }}
            >
              <div className="flex items-center gap-2">
                {category.imageUrl && (
                  <div className="relative h-8 w-8 overflow-hidden rounded-md">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <span>{category.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {category.productCount > 0 && (
                  <span 
                    className="text-xs text-[var(--text-light)]"
                  >
                    ({category.productCount})
                  </span>
                )}
                {isSelected && (
                  <HiChevronRight className="h-4 w-4 text-[var(--brand-green)]" />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* View All Categories Link */}
      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
        <Link
          href="/categories"
          className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200"
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
          <span>Xem tất cả danh mục</span>
          <HiChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default CategorySidebar;

