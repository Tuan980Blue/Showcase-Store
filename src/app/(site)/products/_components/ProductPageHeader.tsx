'use client';

import React from 'react';
import Link from 'next/link';
import { HiHome, HiChevronRight } from 'react-icons/hi';

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
      <nav className="mb-4 flex items-center gap-2 text-sm text-[var(--text-light)]">
        <Link
          href="/"
          className="flex items-center gap-1 transition-colors duration-200 hover:text-[var(--brand-green)]"
        >
          <HiHome className="h-4 w-4" />
          <span>Trang chủ</span>
        </Link>
        <HiChevronRight className="h-4 w-4" />
        <span className="text-[var(--text-medium)]">Sản phẩm</span>
      </nav>

      {/* Header Content */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 
            className="text-lg font-bold text-[var(--text-dark)] sm:text-xl lg:text-2xl"
          >
            {title}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-medium)] sm:text-base">
            {description}
          </p>
        </div>
        {productCount !== undefined && (
          <div 
            className="rounded-lg px-4 py-2 text-center sm:text-right"
            style={{
              backgroundColor: 'var(--bg-mint)',
            }}
          >
            <p className="text-xs text-[var(--text-light)] sm:text-sm">
              Tổng cộng
            </p>
            <p 
              className="text-lg font-bold text-[var(--brand-green)] sm:text-xl"
            >
              {productCount.toLocaleString('vi-VN')} sản phẩm
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPageHeader;

