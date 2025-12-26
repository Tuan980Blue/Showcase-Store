'use client';

import React from 'react';
import { HiBookOpen, HiChevronRight } from 'react-icons/hi';
import type { BlogCategoryResponseDto } from '@/types/blog.types';

interface BlogCategorySidebarProps {
  categories: BlogCategoryResponseDto[];
  loading?: boolean;
  selectedCategoryId?: number | 'all';
  onSelectCategory?: (categoryId: number | 'all') => void;
}

const BlogCategorySidebar: React.FC<BlogCategorySidebarProps> = ({
  categories,
  loading = false,
  selectedCategoryId = 'all',
  onSelectCategory,
}) => {
  const handleCategoryClick = (categoryId: number | 'all') => {
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
      className="rounded-xl border p-4 shadow-sm lg:sticky lg:top-20 lg:max-h-[calc(100vh-100px)] lg:overflow-auto"
      style={{ 
        borderColor: 'var(--border-light)',
        backgroundColor: 'white',
      }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <HiBookOpen className="h-5 w-5" style={{ color: 'var(--brand-green)' }} />
        <h3 
          className="text-base font-semibold sm:text-lg"
          style={{ color: 'var(--text-dark)' }}
        >
          Danh mục blog
        </h3>
      </div>

      {/* Category List */}
      <nav className="space-y-1">
        <button
          onClick={() => handleCategoryClick('all')}
          className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 ${
            selectedCategoryId === 'all'
              ? 'font-semibold'
              : 'hover:opacity-80'
          }`}
          style={{
            backgroundColor: selectedCategoryId === 'all' ? 'var(--bg-mint)' : 'transparent',
            color: selectedCategoryId === 'all' ? 'var(--brand-green)' : 'var(--text-medium)',
          }}
          onMouseEnter={(e) => {
            if (selectedCategoryId !== 'all') {
              e.currentTarget.style.backgroundColor = 'var(--bg-grey)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCategoryId !== 'all') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <span>Tất cả bài viết</span>
          {selectedCategoryId === 'all' && (
            <HiChevronRight className="h-4 w-4" style={{ color: 'var(--brand-green)' }} />
          )}
        </button>

        {categories.map((category) => {
          const isSelected = selectedCategoryId === category.id;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                isSelected
                  ? 'font-semibold'
                  : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: isSelected ? 'var(--bg-mint)' : 'transparent',
                color: isSelected ? 'var(--brand-green)' : 'var(--text-medium)',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-grey)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div className="flex items-center gap-2">
                <span>{category.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {category.blogPostCount > 0 && (
                  <span 
                    className="text-xs"
                    style={{ color: 'var(--text-light)' }}
                  >
                    ({category.blogPostCount})
                  </span>
                )}
                {isSelected && (
                  <HiChevronRight className="h-4 w-4" style={{ color: 'var(--brand-green)' }} />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {categories.length === 0 && !loading && (
        <div 
          className="mt-4 rounded-lg p-3 text-center text-sm"
          style={{ 
            backgroundColor: 'var(--bg-grey)',
            color: 'var(--text-light)',
          }}
        >
          Chưa có danh mục nào
        </div>
      )}
    </div>
  );
};

export default BlogCategorySidebar;

