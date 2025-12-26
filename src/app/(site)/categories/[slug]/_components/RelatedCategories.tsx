'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowRight, HiShoppingBag, HiViewGrid } from 'react-icons/hi';
import type { CategoryResponseDto } from '@/types/category.types';

interface RelatedCategoriesProps {
  categories: CategoryResponseDto[];
  currentCategoryId: number;
}

const RelatedCategories: React.FC<RelatedCategoriesProps> = ({ categories, currentCategoryId }) => {
  if (!categories.length) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 
            className="text-lg font-bold sm:text-xl lg:text-2xl"
            style={{ color: 'var(--text-dark)' }}
          >
            Danh mục khác
          </h2>
          <p 
            className="mt-0.5 text-xs sm:text-sm"
            style={{ color: 'var(--text-light)' }}
          >
            Khám phá thêm các danh mục khác
          </p>
        </div>
        <Link
          href="/categories"
          className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:shadow-sm sm:flex sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          style={{
            color: 'var(--brand-green)',
            backgroundColor: 'var(--bg-mint)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--brand-mint)';
            e.currentTarget.style.transform = 'translateX(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-mint)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <span>Xem tất cả</span>
          <HiArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const href = category.slug ? `/categories/${category.slug}` : `/products?categoryId=${category.id}`;
          
          return (
            <Link
              key={category.id}
              href={href}
              className="group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ borderColor: 'var(--border-light)' }}
            >
              {/* Background gradient effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-green)]/5 via-transparent to-[var(--brand-navy)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[var(--bg-mint)] to-[var(--brand-green)]/20">
                {category.imageUrl ? (
                  <>
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="text-3xl font-bold sm:text-4xl"
                        style={{ color: 'var(--brand-green)' }}
                      >
                        {category.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </>
                )}
                
                {/* Product Count Badge */}
                {category.productCount > 0 && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <div 
                      className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-md shadow-sm sm:px-2.5 sm:py-1 sm:text-xs"
                      style={{
                        backgroundColor: 'rgba(47, 191, 113, 0.95)',
                        color: 'var(--text-inverse)',
                      }}
                    >
                      <HiShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>{category.productCount}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="relative flex flex-1 flex-col p-3 sm:p-4">
                {/* Category Name */}
                <h3 
                  className="mb-1.5 text-sm font-bold leading-tight transition-colors duration-200 group-hover:text-[var(--brand-green)] sm:text-base lg:text-lg"
                  style={{ color: 'var(--text-dark)' }}
                >
                  {category.name}
                </h3>

                {/* Footer with arrow */}
                <div className="mt-auto flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-light)' }}>
                  <span 
                    className="text-xs font-medium sm:text-sm"
                    style={{ color: 'var(--text-light)' }}
                  >
                    {category.productCount > 0 
                      ? `${category.productCount} sản phẩm` 
                      : 'Xem chi tiết'}
                  </span>
                  <HiArrowRight 
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 sm:h-5 sm:w-5"
                    style={{ color: 'var(--brand-green)' }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedCategories;

