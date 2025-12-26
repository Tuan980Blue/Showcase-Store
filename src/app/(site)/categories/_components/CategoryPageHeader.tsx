'use client';

import React from 'react';
import Link from 'next/link';
import { HiHome, HiChevronRight, HiViewGrid, HiSparkles } from 'react-icons/hi';

interface CategoryPageHeaderProps {
  title?: string;
  description?: string;
  categoryCount?: number;
}

const CategoryPageHeader: React.FC<CategoryPageHeaderProps> = ({
  title = 'Tất cả danh mục',
  description = 'Khám phá các danh mục sản phẩm đa dạng và phong phú của chúng tôi',
  categoryCount,
}) => {
  return (
    <div className="mb-4 sm:mb-6">
      {/* Breadcrumbs */}
      <nav 
        className="mb-3 flex items-center gap-1.5 text-xs sm:gap-2 sm:text-sm"
        style={{ color: 'var(--text-light)' }}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 transition-all duration-200 hover:bg-[var(--bg-mint)]"
          style={{ color: 'var(--text-light)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--brand-green)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-light)';
          }}
        >
          <HiHome className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="font-medium">Trang chủ</span>
        </Link>
        <HiChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span 
          className="font-medium"
          style={{ color: 'var(--text-medium)' }}
        >
          Danh mục
        </span>
      </nav>

      {/* Header Content with Gradient Background */}
      <div 
        className="relative overflow-hidden rounded-xl border p-4 sm:p-6 lg:p-8"
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

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-6">
          {/* Title Section */}
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
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
                {title}
              </h1>
            </div>
            <p 
              className="mt-1.5 text-sm leading-relaxed sm:text-base lg:text-lg"
              style={{ color: 'var(--text-medium)' }}
            >
              {description}
            </p>
          </div>

          {/* Stats Card */}
          {categoryCount !== undefined && (
            <div 
              className="flex items-center gap-3 rounded-lg border px-3 py-2.5 sm:px-4 sm:py-3"
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
                  Tổng danh mục
                </p>
                <p 
                  className="text-xl font-bold sm:text-2xl lg:text-3xl"
                  style={{ color: 'var(--brand-green)' }}
                >
                  {categoryCount.toLocaleString('vi-VN')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPageHeader;

