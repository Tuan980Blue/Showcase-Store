'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiViewGrid, HiChevronRight, HiX, HiMenu } from 'react-icons/hi';
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen, isMobile]);

  const handleCategoryClick = (categoryId: string | 'all') => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
    // Auto close on mobile after selection
    if (isMobile) {
      setIsMobileOpen(false);
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
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="mb-4 flex w-full items-center justify-between rounded-xl border px-4 py-3 shadow-sm transition-all duration-200 lg:hidden"
        style={{
          borderColor: 'var(--border-light)',
          backgroundColor: 'white',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--brand-green)';
          e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow-soft)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-light)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: 'var(--bg-mint)' }}
          >
            <HiMenu className="h-5 w-5" style={{ color: 'var(--brand-green)' }} />
          </div>
          <div className="text-left">
            <h3 
              className="text-sm font-bold sm:text-base"
              style={{ color: 'var(--text-dark)' }}
            >
              Danh mục sản phẩm
            </h3>
            <p 
              className="text-xs"
              style={{ color: 'var(--text-light)' }}
            >
              {selectedCategoryId === 'all' 
                ? 'Tất cả sản phẩm' 
                : categories.find(c => c.id.toString() === selectedCategoryId)?.name || 'Chọn danh mục'}
            </p>
          </div>
        </div>
        <HiChevronRight 
          className={`h-5 w-5 transition-transform duration-300 ${
            isMobileOpen ? 'rotate-90' : ''
          }`}
          style={{ color: 'var(--text-medium)' }}
        />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Content */}
      <div
        className={`
          rounded-xl border shadow-sm transition-all duration-300 lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:overflow-x-hidden
          ${isMobileOpen && isMobile 
            ? 'fixed inset-x-4 top-20 z-50 max-h-[calc(100vh-120px)] overflow-y-auto' 
            : isMobile 
              ? 'hidden' 
              : 'block'
          }
        `}
        style={{ 
          borderColor: 'var(--border-light)',
          backgroundColor: 'white',
          padding: isMobile ? '1rem' : undefined,
        }}
      >
        <div className="p-4 sm:p-5">
          {/* Mobile Header with Close Button */}
          {isMobile && (
            <div className="mb-4 flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-light)' }}>
              <div className="flex items-center gap-3">
                <div 
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: 'var(--bg-mint)' }}
                >
                  <HiViewGrid className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: 'var(--brand-green)' }} />
                </div>
                <h3 
                  className="text-base font-bold sm:text-lg"
                  style={{ color: 'var(--text-dark)' }}
                >
                  Danh mục sản phẩm
                </h3>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200"
                style={{ 
                  color: 'var(--text-medium)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-grey)';
                  e.currentTarget.style.color = 'var(--text-dark)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-medium)';
                }}
                aria-label="Đóng menu"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Desktop Header */}
          {!isMobile && (
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12"
                style={{ backgroundColor: 'var(--bg-mint)' }}
              >
                <HiViewGrid className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: 'var(--brand-green)' }} />
              </div>
              <h3 
                className="text-base font-bold sm:text-lg lg:text-xl"
                style={{ color: 'var(--text-dark)' }}
              >
                Danh mục sản phẩm
              </h3>
            </div>
          )}

          {/* Category List */}
      <nav className="space-y-1.5 sm:space-y-2">
        <button
          onClick={() => handleCategoryClick('all')}
          className={`group w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 sm:px-4 sm:py-3 sm:text-base ${
            selectedCategoryId === 'all'
              ? 'font-bold shadow-sm'
              : 'font-medium hover:shadow-sm'
          }`}
          style={{
            backgroundColor: selectedCategoryId === 'all' ? 'var(--bg-mint)' : 'transparent',
            color: selectedCategoryId === 'all' ? 'var(--brand-green)' : 'var(--text-medium)',
          }}
          onMouseEnter={(e) => {
            if (selectedCategoryId !== 'all') {
              e.currentTarget.style.backgroundColor = 'var(--bg-grey)';
              e.currentTarget.style.color = 'var(--text-dark)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCategoryId !== 'all') {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-medium)';
            }
          }}
        >
          <span>Tất cả sản phẩm</span>
          {selectedCategoryId === 'all' && (
            <HiChevronRight className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--brand-green)' }} />
          )}
        </button>

        {categories.map((category) => {
          const isSelected = selectedCategoryId === category.id.toString();
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id.toString())}
              className={`group w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 sm:px-4 sm:py-3 sm:text-base ${
                isSelected
                  ? 'font-bold shadow-sm'
                  : 'font-medium hover:shadow-sm'
              }`}
              style={{
                backgroundColor: isSelected ? 'var(--bg-mint)' : 'transparent',
                color: isSelected ? 'var(--brand-green)' : 'var(--text-medium)',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-grey)';
                  e.currentTarget.style.color = 'var(--text-dark)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-medium)';
                }
              }}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                {category.imageUrl && (
                  <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg sm:h-10 sm:w-10">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
                    />
                  </div>
                )}
                <span className="line-clamp-1">{category.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {category.productCount > 0 && (
                  <span 
                    className="text-xs font-medium sm:text-sm"
                    style={{ color: 'var(--text-light)' }}
                  >
                    ({category.productCount})
                  </span>
                )}
                {isSelected && (
                  <HiChevronRight className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--brand-green)' }} />
                )}
              </div>
            </button>
          );
        })}
      </nav>

          {/* View All Categories Link */}
          <div className="mt-5 pt-5 border-t sm:mt-6 sm:pt-6" style={{ borderColor: 'var(--border-light)' }}>
            <Link
              href="/categories"
              className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 sm:py-3 sm:text-base"
              style={{
                color: 'var(--brand-green)',
                backgroundColor: 'var(--bg-mint)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--brand-mint)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow-soft)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-mint)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => {
                // Close mobile sidebar when navigating
                if (isMobile) {
                  setIsMobileOpen(false);
                }
              }}
            >
              <span>Xem tất cả danh mục</span>
              <HiChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySidebar;

