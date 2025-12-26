'use client';

import React from 'react';
import Link from 'next/link';
import { HiHome, HiChevronRight, HiShoppingBag, HiSparkles } from 'react-icons/hi';

interface ProductPageHeaderProps {
  title?: string;
  description?: string;
  productCount?: number;
}

const ProductPageHeader: React.FC<ProductPageHeaderProps> = ({
  title = 'Tất cả sản phẩm',
  description = 'Khám phá bộ sưu tập sản phẩm đa dạng của chúng tôi',
  productCount,
}) => {
  return (
    <div className="mb-6 sm:mb-8">
      {/* Breadcrumbs */}
      <nav 
        className="mb-4 flex items-center gap-2 text-xs sm:text-sm"
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
          Sản phẩm
        </span>
      </nav>

      {/* Header Content with Gradient Background */}
      <div 
        className="relative overflow-hidden rounded-2xl border p-6 sm:p-8 lg:p-10"
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
                className="flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12"
                style={{ backgroundColor: 'var(--brand-green)' }}
              >
                <HiShoppingBag className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
              <h1 
                className="text-xl font-bold sm:text-2xl lg:text-3xl"
                style={{ color: 'var(--text-dark)' }}
              >
                {title}
              </h1>
            </div>
            <p 
              className="mt-2 text-sm leading-relaxed sm:text-base lg:text-lg"
              style={{ color: 'var(--text-medium)' }}
            >
              {description}
            </p>
          </div>

          {/* Stats Card */}
          {productCount !== undefined && (
            <div 
              className="flex items-center gap-4 rounded-xl border px-4 py-3 sm:px-6 sm:py-4"
              style={{
                borderColor: 'var(--border-light)',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px var(--shadow-soft)',
              }}
            >
              <div 
                className="flex h-12 w-12 items-center justify-center rounded-lg sm:h-14 sm:w-14"
                style={{ backgroundColor: 'var(--bg-mint)' }}
              >
                <HiSparkles className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: 'var(--brand-green)' }} />
              </div>
              <div>
                <p 
                  className="text-xs font-medium sm:text-sm"
                  style={{ color: 'var(--text-light)' }}
                >
                  Tổng sản phẩm
                </p>
                <p 
                  className="text-xl font-bold sm:text-2xl lg:text-3xl"
                  style={{ color: 'var(--brand-green)' }}
                >
                  {productCount.toLocaleString('vi-VN')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPageHeader;

