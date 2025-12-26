'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { HiShoppingBag, HiExternalLink, HiArrowRight } from 'react-icons/hi';
import type { ProductListItemDto } from '@/types/product.types';

interface RelatedProductsProps {
  products: ProductListItemDto[];
  categoryName: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, categoryName }) => {
  const router = useRouter();

  if (!products.length) return null;

  const handleCardClick = (slug: string, e: React.MouseEvent) => {
    // Don't navigate if clicking on a link or button
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    router.push(`/products/${slug}`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 
            className="text-lg font-bold sm:text-xl lg:text-2xl"
            style={{ color: 'var(--text-dark)' }}
          >
            Sản phẩm liên quan
          </h2>
          <p 
            className="mt-0.5 text-xs sm:text-sm"
            style={{ color: 'var(--text-light)' }}
          >
            Cùng danh mục: {categoryName}
          </p>
        </div>
        <Link
          href={`/products?categoryId=${products[0]?.categoryName || ''}`}
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

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={(e) => handleCardClick(product.slug, e)}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ borderColor: 'var(--border-light)' }}
          >
            {/* Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-[var(--bg-mint)]">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <HiShoppingBag className="h-12 w-12 mb-2" style={{ color: 'var(--text-light)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-light)' }}>Chưa có hình ảnh</span>
                </div>
              )}
              
              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <span 
                  className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm sm:text-xs"
                  style={{
                    backgroundColor: 'rgba(47, 191, 113, 0.9)',
                    color: 'var(--text-inverse)',
                  }}
                >
                  {product.categoryName}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-3 sm:p-4">
              {/* Product Name */}
              <h3 
                className="line-clamp-2 text-sm font-bold leading-tight transition-colors duration-200 group-hover:text-[var(--brand-green)] sm:text-base"
                style={{ 
                  color: 'var(--text-dark)',
                  minHeight: '2.5rem',
                }}
              >
                {product.name}
              </h3>

              {/* Price */}
              <div className="mt-2 flex items-baseline gap-2">
                <p 
                  className="text-lg font-bold sm:text-xl"
                  style={{ color: 'var(--brand-green)' }}
                >
                  {product.price.toLocaleString('vi-VN')}₫
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex flex-col gap-2">
                {product.shopeeLink ? (
                  <a
                    href={product.shopeeLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md sm:text-sm"
                    style={{
                      backgroundColor: '#ee4d2d',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#d63f22';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ee4d2d';
                    }}
                  >
                    <Image
                      src="/shopee.png"
                      alt="Shopee"
                      width={14}
                      height={14}
                      className="h-3.5 w-3.5"
                    />
                    <span className="hidden sm:inline">Shopee</span>
                    <HiExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/products/${product.slug}`);
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm"
                    style={{
                      backgroundColor: 'var(--btn-primary)',
                      color: 'white',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--btn-primary)';
                    }}
                  >
                    <HiShoppingBag className="h-3.5 w-3.5" />
                    <span>Xem chi tiết</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

