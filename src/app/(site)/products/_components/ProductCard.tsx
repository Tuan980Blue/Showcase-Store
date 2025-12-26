'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiShoppingBag, HiExternalLink } from 'react-icons/hi';
import type { ProductListItemDto } from '@/types/product.types';

interface ProductCardProps {
  product: ProductListItemDto;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ 
        borderColor: 'var(--border-light)',
      }}
    >
      {/* Image Container */}
      <Link 
        href={`/products/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-[var(--bg-mint)]"
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
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
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm sm:text-xs"
            style={{
              backgroundColor: 'rgba(47, 191, 113, 0.9)',
              color: 'var(--text-inverse)',
            }}
          >
            {product.categoryName}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 
            className="line-clamp-2 text-sm font-semibold leading-tight text-[var(--text-dark)] transition-colors duration-200 group-hover:text-[var(--brand-green)] sm:text-base"
            style={{ minHeight: '2.5rem' }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <p 
            className="text-lg font-bold text-[var(--brand-green)] sm:text-xl"
          >
            {product.price?.toLocaleString('vi-VN')}₫
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center gap-2">
          {product.shopeeLink && (
            <a
              href={product.shopeeLink}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:shadow-md sm:text-sm"
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
                width={16}
                height={16}
                className="h-4 w-4"
              />
              <span>Mua trên Shopee</span>
              <HiExternalLink className="h-3 w-3" />
            </a>
          )}
          {product.tikTokLink && (
            <a
              href={product.tikTokLink}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:shadow-md sm:text-sm"
              style={{
                backgroundColor: '#000000',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
              }}
            >
              <Image
                src="/tiktok.png"
                alt="TikTok"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              <span>Xem trên TikTok</span>
              <HiExternalLink className="h-3 w-3" />
            </a>
          )}
          {!product.shopeeLink && !product.tikTokLink && (
            <Link
              href={`/products/${product.slug}`}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:shadow-md sm:text-sm"
              style={{
                backgroundColor: 'var(--btn-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary)';
              }}
            >
              <HiShoppingBag className="h-4 w-4" />
              <span>Xem chi tiết</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

