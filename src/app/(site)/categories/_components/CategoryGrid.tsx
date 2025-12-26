'use client';

import React from 'react';
import CategoryCard from './CategoryCard';
import { HiViewGrid, HiEmojiSad } from 'react-icons/hi';
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <div className="aspect-square w-full animate-pulse bg-gradient-to-br from-[var(--bg-mint)] to-[var(--brand-green)]/20" />
            <div className="flex flex-1 flex-col p-3 sm:p-4">
              <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-[var(--bg-grey)] sm:h-5" />
              <div className="mb-3 h-3 w-full animate-pulse rounded bg-[var(--bg-grey)] sm:h-4" />
              <div className="mt-auto h-6 w-full animate-pulse rounded bg-[var(--bg-grey)] sm:h-8" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="rounded-lg border p-6 text-center sm:p-8"
        style={{ 
          borderColor: 'var(--state-error)',
          backgroundColor: 'rgba(230, 80, 80, 0.05)',
        }}
      >
        <HiEmojiSad className="mx-auto h-12 w-12 sm:h-16 sm:w-16" style={{ color: 'var(--state-error)' }} />
        <p className="mt-4 text-base font-semibold text-[var(--state-error)] sm:text-lg">
          {error}
        </p>
        <p className="mt-1.5 text-xs text-[var(--text-light)] sm:text-sm">
          Vui lòng thử lại sau
        </p>
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div 
        className="rounded-lg border p-8 text-center sm:p-12"
        style={{ 
          borderColor: 'var(--border-light)',
          backgroundColor: 'var(--bg-light)',
        }}
      >
        <HiViewGrid className="mx-auto h-12 w-12 sm:h-16 sm:w-16" style={{ color: 'var(--text-light)' }} />
        <p className="mt-4 text-base font-semibold text-[var(--text-medium)] sm:text-lg">
          Không tìm thấy danh mục nào
        </p>
        <p className="mt-1.5 text-xs text-[var(--text-light)] sm:text-sm">
          Hãy thử tìm kiếm với từ khóa khác
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 lg:grid-cols-4 xl:grid-cols-5">
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

