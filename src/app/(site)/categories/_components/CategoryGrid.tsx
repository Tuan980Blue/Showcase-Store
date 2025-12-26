'use client';

import React from 'react';
import CategoryCard from './CategoryCard';
import type { CategoryResponseDto } from '@/types/category.types';

interface CategoryGridProps {
  categories: CategoryResponseDto[];
  loading?: boolean;
  error?: string | null;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  loading = false,
  error = null,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <div className="aspect-square w-full animate-pulse bg-gradient-to-br from-[var(--bg-mint)] to-[var(--brand-green)]/20" />
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-[var(--bg-grey)]" />
              <div className="mb-4 h-4 w-full animate-pulse rounded bg-[var(--bg-grey)]" />
              <div className="mt-auto h-8 w-full animate-pulse rounded bg-[var(--bg-grey)]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="rounded-xl border p-6 text-center"
        style={{ 
          borderColor: 'var(--state-error)',
          backgroundColor: 'rgba(230, 80, 80, 0.05)',
        }}
      >
        <p className="text-sm font-medium text-[var(--state-error)] sm:text-base">
          {error}
        </p>
        <p className="mt-2 text-xs text-[var(--text-light)] sm:text-sm">
          Vui lòng thử lại sau
        </p>
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div 
        className="rounded-xl border p-12 text-center"
        style={{ 
          borderColor: 'var(--border-light)',
          backgroundColor: 'var(--bg-light)',
        }}
      >
        <p className="text-base font-medium text-[var(--text-medium)] sm:text-lg">
          Không tìm thấy danh mục nào
        </p>
        <p className="mt-2 text-sm text-[var(--text-light)]">
          Hãy thử tìm kiếm với từ khóa khác
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category, index) => (
        <CategoryCard 
          key={category.id} 
          category={category}
          priority={index < 4}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;

