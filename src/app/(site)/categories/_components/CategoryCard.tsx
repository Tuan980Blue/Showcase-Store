'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowRight, HiShoppingBag } from 'react-icons/hi';
import type { CategoryResponseDto } from '@/types/category.types';

interface CategoryCardProps {
  category: CategoryResponseDto;
  priority?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, priority = false }) => {
  const href = category.slug ? `/categories/${category.slug}` : `/products?category=${category.id}`;

  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ 
        borderColor: 'var(--border-light)',
      }}
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
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={priority}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="text-3xl font-bold sm:text-4xl lg:text-5xl"
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

        {/* Description */}
        {category.description && (
          <p 
            className="mb-2.5 line-clamp-2 text-xs leading-relaxed sm:text-sm"
            style={{ color: 'var(--text-medium)' }}
          >
            {category.description}
          </p>
        )}

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
};

export default CategoryCard;

