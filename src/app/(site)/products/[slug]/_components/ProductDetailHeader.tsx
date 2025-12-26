'use client';

import React from 'react';
import Link from 'next/link';
import { HiHome, HiChevronRight } from 'react-icons/hi';
import type { ProductResponseDto } from '@/types/product.types';

interface ProductDetailHeaderProps {
  product: ProductResponseDto;
}

const ProductDetailHeader: React.FC<ProductDetailHeaderProps> = ({ product }) => {
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
        <Link
          href="/products"
          className="rounded-lg px-2 py-1 font-medium transition-all duration-200 hover:bg-[var(--bg-mint)]"
          style={{ color: 'var(--text-light)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--brand-green)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-light)';
          }}
        >
          Sản phẩm
        </Link>
        <HiChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span 
          className="font-medium"
          style={{ color: 'var(--text-medium)' }}
        >
          {product.name}
        </span>
      </nav>
    </div>
  );
};

export default ProductDetailHeader;

