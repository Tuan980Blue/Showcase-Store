'use client';

import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductListItem from './ProductListItem';
import ViewToggle, { type ViewMode } from './ViewToggle';
import Pagination from './Pagination';
import { HiShoppingBag, HiEmojiSad } from 'react-icons/hi';
import type { ProductListItemDto } from '@/types/product.types';

interface ProductGridProps {
  products: ProductListItemDto[];
  loading?: boolean;
  error?: string | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  error = null,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === 'grid' ? 20 : 10;

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Reset to page 1 when products change
  useEffect(() => {
    setCurrentPage(1);
  }, [products.length]);

  if (loading) {
    return (
      <>
        <div className="mb-4 flex items-center justify-end">
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
          : "space-y-4"
        }>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={`flex overflow-hidden rounded-xl border bg-white shadow-sm ${
                viewMode === 'list' ? 'flex-row' : 'flex-col'
              }`}
              style={{ borderColor: 'var(--border-light)' }}
            >
              <div className={`animate-pulse bg-[var(--bg-mint)] ${
                viewMode === 'list' ? 'aspect-square w-32 sm:w-40' : 'aspect-square w-full'
              }`} />
              <div className={`flex flex-1 flex-col p-4 sm:p-5 ${viewMode === 'list' ? 'justify-center' : ''}`}>
                <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-[var(--bg-grey)]" />
                <div className="mb-4 h-3 w-1/2 animate-pulse rounded bg-[var(--bg-grey)]" />
                <div className="h-10 w-full animate-pulse rounded-lg bg-[var(--bg-grey)]" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div 
        className="rounded-xl border p-8 text-center sm:p-12"
        style={{ 
          borderColor: 'var(--state-error)',
          backgroundColor: 'rgba(230, 80, 80, 0.05)',
        }}
      >
        <HiEmojiSad className="mx-auto h-12 w-12 sm:h-16 sm:w-16" style={{ color: 'var(--state-error)' }} />
        <p className="mt-4 text-base font-semibold text-[var(--state-error)] sm:text-lg">
          {error}
        </p>
        <p className="mt-2 text-sm text-[var(--text-light)]">
          Vui lòng thử lại sau
        </p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div 
        className="rounded-xl border p-12 text-center sm:p-16"
        style={{ 
          borderColor: 'var(--border-light)',
          backgroundColor: 'var(--bg-light)',
        }}
      >
        <HiShoppingBag className="mx-auto h-16 w-16 sm:h-20 sm:w-20" style={{ color: 'var(--text-light)' }} />
        <p className="mt-4 text-lg font-semibold text-[var(--text-medium)] sm:text-xl">
          Không tìm thấy sản phẩm nào
        </p>
        <p className="mt-2 text-sm text-[var(--text-light)] sm:text-base">
          Hãy thử điều chỉnh bộ lọc của bạn để tìm thấy nhiều sản phẩm hơn
        </p>
      </div>
    );
  }

  return (
    <>
      {/* View Toggle and Results Info */}
      <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div 
          className="text-sm font-medium sm:text-base"
          style={{ color: 'var(--text-medium)' }}
        >
          Tìm thấy <span className="font-bold" style={{ color: 'var(--brand-green)' }}>{products.length}</span> sản phẩm
        </div>
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {/* Product Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
        : "space-y-4"
      }>
        {paginatedProducts.map((product, index) => (
          viewMode === 'grid' ? (
            <ProductCard 
              key={product.id} 
              product={product}
              priority={index < 4}
            />
          ) : (
            <ProductListItem
              key={product.id}
              product={product}
            />
          )
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </>
  );
};

export default ProductGrid;

