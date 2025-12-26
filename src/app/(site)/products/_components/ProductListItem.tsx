'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiShoppingBag, HiExternalLink } from 'react-icons/hi';
import type { ProductListItemDto } from '@/types/product.types';

interface ProductListItemProps {
  product: ProductListItemDto;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg sm:flex-row"
      style={{ 
        borderColor: 'var(--border-light)',
      }}
    >
      {/* Image Container */}
      <Link 
        href={`/products/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-[var(--bg-mint)] sm:w-48 sm:flex-shrink-0 lg:w-56"
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 224px, (min-width: 640px) 192px, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <HiShoppingBag className="h-12 w-12 text-[var(--text-light)] mb-2" />
            <span className="text-xs text-[var(--text-light)]">Chưa có hình ảnh</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span 
            className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(47, 191, 113, 0.9)',
              color: 'var(--text-inverse)',
            }}
          >
            {product.categoryName}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8">
        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 
            className="text-lg font-bold leading-tight transition-colors duration-200 group-hover:text-[var(--brand-green)] sm:text-xl lg:text-2xl"
            style={{ color: 'var(--text-dark)' }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <p 
            className="text-2xl font-bold sm:text-3xl lg:text-4xl"
            style={{ color: 'var(--brand-green)' }}
          >
            {product.price?.toLocaleString('vi-VN')}₫
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-auto">
          {product.shopeeLink && (
            <a
              href={product.shopeeLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md sm:px-6 sm:text-base"
              style={{
                backgroundColor: '#ee4d2d',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d63f22';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ee4d2d';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Image
                src="/shopee.png"
                alt="Shopee"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span>Mua trên Shopee</span>
              <HiExternalLink className="h-4 w-4" />
            </a>
          )}
          {product.tikTokLink && (
            <a
              href={product.tikTokLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md sm:px-6 sm:text-base"
              style={{
                backgroundColor: '#000000',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Image
                src="/tiktok.png"
                alt="TikTok"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span>Xem trên TikTok</span>
              <HiExternalLink className="h-4 w-4" />
            </a>
          )}
          {!product.shopeeLink && !product.tikTokLink && (
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md sm:px-6 sm:text-base"
              style={{
                backgroundColor: 'var(--btn-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <HiShoppingBag className="h-5 w-5" />
              <span>Xem chi tiết</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductListItem;

