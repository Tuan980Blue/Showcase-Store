'use client';

import React from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import type { ProductResponseDto } from '@/types/product.types';

interface ProductDescriptionProps {
  product: ProductResponseDto;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <div 
      className="rounded-lg border bg-white p-4 shadow-sm sm:p-6 lg:p-8"
      style={{ borderColor: 'var(--border-light)' }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 border-b pb-3 sm:mb-5 sm:gap-3 sm:pb-4" style={{ borderColor: 'var(--border-light)' }}>
        <div 
          className="flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10"
          style={{ backgroundColor: 'var(--bg-mint)' }}
        >
          <HiInformationCircle className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--brand-green)' }} />
        </div>
        <h2 
          className="text-lg font-bold sm:text-xl lg:text-2xl"
          style={{ color: 'var(--text-dark)' }}
        >
          Mô tả sản phẩm
        </h2>
      </div>

      {/* Description Content */}
      <div 
        className="prose prose-sm max-w-none sm:prose-base"
        style={{ color: 'var(--text-medium)' }}
      >
        {product.description ? (
          <div 
            className="whitespace-pre-wrap text-sm leading-relaxed sm:text-base"
            dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br />') }}
            style={{ color: 'var(--text-medium)' }}
          />
        ) : (
          <p className="text-xs italic sm:text-sm" style={{ color: 'var(--text-light)' }}>
            Chưa có mô tả chi tiết cho sản phẩm này.
          </p>
        )}
      </div>

      {/* Additional Info */}
      {product.metaDescription && (
        <div className="mt-4 rounded-lg border p-3 sm:mt-6 sm:p-4" style={{ borderColor: 'var(--border-light)', backgroundColor: 'var(--bg-mint)' }}>
          <p className="text-xs leading-relaxed sm:text-sm" style={{ color: 'var(--text-medium)' }}>
            {product.metaDescription}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;

