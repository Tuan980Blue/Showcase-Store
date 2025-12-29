'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiShoppingBag, HiExternalLink, HiEye } from 'react-icons/hi';
import type { ProductListItemDto } from '@/types/product.types';

interface ProductCardProps {
  product: ProductListItemDto;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white transition-all duration-500 hover:shadow-xl sm:rounded-2xl sm:hover:shadow-2xl"
      style={{
        boxShadow: '0 1px 3px rgba(15, 34, 56, 0.06), 0 1px 2px rgba(15, 34, 56, 0.04)',
      }}
    >
      {/* Image Container with Professional Overlay */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[var(--bg-mint)] to-[var(--bg-light)]">
        <Link 
          href={`/products/${product.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`Xem chi tiết ${product.name}`}
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
              <div 
                className="mb-2 rounded-full p-3 sm:mb-3 sm:p-4"
                style={{ backgroundColor: 'rgba(47, 191, 113, 0.1)' }}
              >
                <HiShoppingBag className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: 'var(--text-light)' }} />
              </div>
              <span 
                className="text-[10px] font-medium sm:text-xs"
                style={{ color: 'var(--text-light)' }}
              >
                Chưa có hình ảnh
              </span>
            </div>
          )}
        </Link>

        {/* Subtle Gradient Overlay on Hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 transition-all duration-500 group-hover:from-black/5 group-hover:via-black/2 group-hover:to-black/10"
        />

        {/* Category Badge - Top Left */}
        <div className="absolute left-2 top-2 z-20 sm:left-3 sm:top-3">
          <span 
            className="inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide shadow-sm backdrop-blur-sm sm:rounded-lg sm:px-2.5 sm:py-1 sm:text-[10px]"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: 'var(--brand-green)',
              boxShadow: '0 2px 8px rgba(15, 34, 56, 0.1)',
            }}
          >
            {product.categoryName}
          </span>
        </div>

        {/* Quick View Button - Appears on Hover (hidden on mobile) */}
        <div className="absolute bottom-2 right-2 z-20 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 sm:bottom-3 sm:right-3">
          <Link
            href={`/products/${product.slug}`}
            className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 sm:flex sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-xs"
            style={{
              backgroundColor: 'rgba(15, 34, 56, 0.9)',
              boxShadow: '0 4px 12px rgba(15, 34, 56, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(15, 34, 56, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(15, 34, 56, 0.9)';
            }}
          >
            <HiEye className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Xem nhanh</span>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 lg:p-5">
        {/* Product Name */}
        <Link 
          href={`/products/${product.slug}`}
          className="mb-2 block sm:mb-3"
        >
          <h3 
            className="line-clamp-2 text-xs font-semibold leading-tight transition-colors duration-200 group-hover:text-[var(--brand-green)] sm:text-sm sm:leading-snug lg:text-base"
            style={{ 
              color: 'var(--text-dark)',
              minHeight: '2.25rem',
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="mb-3 flex items-baseline gap-2 sm:mb-4">
          <span 
            className="text-lg font-bold tracking-tight sm:text-xl lg:text-2xl"
            style={{ color: 'var(--brand-green)' }}
          >
            {product.price?.toLocaleString('vi-VN')}₫
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col gap-1.5 sm:gap-2">
          {/* Shopee Link */}
          {product.shopeeLink && (
            <a
              href={product.shopeeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
              style={{
                backgroundColor: '#ee4d2d',
                boxShadow: '0 2px 8px rgba(238, 77, 45, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d63f22';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(238, 77, 45, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ee4d2d';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(238, 77, 45, 0.3)';
              }}
            >
              <Image
                src="/shopee.png"
                alt="Shopee"
                width={16}
                height={16}
                className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
              />
              <span className="hidden sm:inline">Mua trên Shopee</span>
              <span className="sm:hidden">Shopee</span>
              <HiExternalLink className="h-3 w-3 opacity-70 transition-opacity group-hover/btn:opacity-100 sm:h-4 sm:w-4" />
            </a>
          )}

          {/* TikTok Link */}
          {product.tikTokLink && (
            <a
              href={product.tikTokLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
              style={{
                backgroundColor: '#000000',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.25)';
              }}
            >
              <Image
                src="/tiktok.png"
                alt="TikTok"
                width={16}
                height={16}
                className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
              />
              <span className="hidden sm:inline">Xem trên TikTok</span>
              <span className="sm:hidden">TikTok</span>
              <HiExternalLink className="h-3 w-3 opacity-70 transition-opacity group-hover/btn:opacity-100 sm:h-4 sm:w-4" />
            </a>
          )}

          {/* Fallback - View Details (only if no external links) */}
          {!product.shopeeLink && !product.tikTokLink && (
            <Link
              href={`/products/${product.slug}`}
              className="group/btn flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
              style={{
                backgroundColor: 'var(--btn-primary)',
                boxShadow: '0 2px 8px rgba(47, 191, 113, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 191, 113, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(47, 191, 113, 0.3)';
              }}
            >
              <HiShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Xem chi tiết</span>
            </Link>
          )}

          {/* Secondary Action - View Details Link (if has external links) */}
          {(product.shopeeLink || product.tikTokLink) && (
            <Link
              href={`/products/${product.slug}`}
              className="flex items-center justify-center gap-1 rounded-lg border px-3 py-2 text-[10px] font-medium transition-all duration-200 hover:bg-[var(--bg-mint)] sm:gap-1.5 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-xs"
              style={{
                borderColor: 'var(--border-light)',
                color: 'var(--text-medium)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--brand-green)';
                e.currentTarget.style.borderColor = 'var(--brand-green)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-medium)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              <span>Xem chi tiết</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
