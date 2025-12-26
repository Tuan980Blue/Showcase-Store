'use client';

import React from 'react';
import Image from 'next/image';
import { HiViewGrid, HiShoppingBag, HiSparkles } from 'react-icons/hi';
import type { CategoryResponseDto } from '@/types/category.types';

interface CategoryHeroProps {
  category: CategoryResponseDto;
  productCount: number;
}

const CategoryHero: React.FC<CategoryHeroProps> = ({ category, productCount }) => {
  return (
    <div 
      className="relative overflow-hidden rounded-lg border"
      style={{ 
        borderColor: 'var(--border-light)',
        background: 'linear-gradient(135deg, var(--bg-light) 0%, var(--bg-mint) 100%)',
      }}
    >
      {/* Decorative Elements */}
      <div 
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10 blur-2xl"
        style={{ backgroundColor: 'var(--brand-green)' }}
      />
      <div 
        className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full opacity-10 blur-xl"
        style={{ backgroundColor: 'var(--brand-navy)' }}
      />

      <div className="relative z-10 grid gap-4 p-4 sm:grid-cols-2 sm:gap-6 sm:p-6 lg:p-8">
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden rounded-lg bg-[var(--bg-mint)] sm:aspect-square">
          {category.imageUrl ? (
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="text-5xl font-bold sm:text-6xl lg:text-7xl"
                style={{ color: 'var(--brand-green)' }}
              >
                {category.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center space-y-4">
          {/* Category Name */}
          <div className="flex items-center gap-2">
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12"
              style={{ backgroundColor: 'var(--brand-green)' }}
            >
              <HiViewGrid className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <h1 
              className="text-xl font-bold sm:text-2xl lg:text-3xl"
              style={{ color: 'var(--text-dark)' }}
            >
              {category.name}
            </h1>
          </div>

          {/* Description */}
          {category.description && (
            <p 
              className="text-sm leading-relaxed sm:text-base lg:text-lg"
              style={{ color: 'var(--text-medium)' }}
            >
              {category.description}
            </p>
          )}

          {/* Stats */}
          <div 
            className="flex items-center gap-4 rounded-lg border px-4 py-3"
            style={{
              borderColor: 'var(--border-light)',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px var(--shadow-soft)',
            }}
          >
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12"
              style={{ backgroundColor: 'var(--bg-mint)' }}
            >
              <HiSparkles className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: 'var(--brand-green)' }} />
            </div>
            <div>
              <p 
                className="text-xs font-medium sm:text-sm"
                style={{ color: 'var(--text-light)' }}
              >
                Sản phẩm trong danh mục
              </p>
              <p 
                className="text-xl font-bold sm:text-2xl lg:text-3xl"
                style={{ color: 'var(--brand-green)' }}
              >
                {productCount.toLocaleString('vi-VN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;

