'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiShoppingBag, HiExternalLink, HiCheckCircle, HiShare } from 'react-icons/hi';
import type { ProductResponseDto } from '@/types/product.types';

interface ProductInfoProps {
  product: ProductResponseDto;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link vào clipboard!');
    }
  };

  return (
    <div className="space-y-4">
      {/* Product Name */}
      <div>
        <h1 
          className="text-xl font-bold leading-tight sm:text-2xl lg:text-3xl"
          style={{ color: 'var(--text-dark)' }}
        >
          {product.name}
        </h1>
        <div className="mt-1.5 flex items-center gap-2">
          <Link
            href={`/products?categoryId=${product.categoryId}`}
            className="text-xs font-medium transition-colors duration-200 hover:underline sm:text-sm"
            style={{ color: 'var(--brand-green)' }}
          >
            {product.categoryName}
          </Link>
        </div>
      </div>

      {/* Price */}
      <div className="rounded-lg border p-3 sm:p-4" style={{ borderColor: 'var(--border-light)', backgroundColor: 'var(--bg-mint)' }}>
        <div className="flex items-baseline gap-2">
          <p 
            className="text-2xl font-bold sm:text-3xl lg:text-4xl"
            style={{ color: 'var(--brand-green)' }}
          >
            {product.price.toLocaleString('vi-VN')}₫
          </p>
        </div>
        <p className="mt-1.5 text-xs sm:text-sm" style={{ color: 'var(--text-light)' }}>
          Giá đã bao gồm VAT
        </p>
      </div>

      {/* Product Status */}
      <div className="flex items-center gap-1.5">
        <HiCheckCircle className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--state-success)' }} />
        <span className="text-xs font-medium sm:text-sm" style={{ color: 'var(--text-medium)' }}>
          Sản phẩm đang có sẵn
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {product.shopeeLink && (
          <a
            href={product.shopeeLink}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
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
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
            <span>Mua ngay trên Shopee</span>
            <HiExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        )}
        
        {product.tikTokLink && (
          <a
            href={product.tikTokLink}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
            style={{
              borderColor: '#000000',
              backgroundColor: '#000000',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a';
              e.currentTarget.style.borderColor = '#1a1a1a';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.borderColor = '#000000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Image
              src="/tiktok.png"
              alt="TikTok"
              width={20}
              height={20}
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
            <span>Xem trên TikTok Shop</span>
            <HiExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        )}

        {!product.shopeeLink && !product.tikTokLink && (
          <div className="rounded-lg border p-4 text-center" style={{ borderColor: 'var(--border-light)', backgroundColor: 'var(--bg-light)' }}>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-medium)' }}>
              Liên hệ với chúng tôi để đặt hàng
            </p>
          </div>
        )}

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:shadow-sm sm:px-6 sm:py-2.5 sm:text-sm"
          style={{
            borderColor: 'var(--border-light)',
            backgroundColor: 'white',
            color: 'var(--text-dark)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--brand-green)';
            e.currentTarget.style.color = 'var(--brand-green)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-light)';
            e.currentTarget.style.color = 'var(--text-dark)';
          }}
        >
          <HiShare className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Chia sẻ sản phẩm</span>
        </button>
      </div>

      {/* Quick Info */}
      <div 
        className="rounded-lg border p-3 sm:p-4"
        style={{ 
          borderColor: 'var(--border-light)',
          backgroundColor: 'var(--bg-light)',
        }}
      >
        <h3 
          className="mb-3 text-sm font-bold sm:text-base"
          style={{ color: 'var(--text-dark)' }}
        >
          Thông tin nhanh
        </h3>
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium sm:text-sm" style={{ color: 'var(--text-medium)' }}>
              Danh mục:
            </span>
            <Link
              href={`/products?categoryId=${product.categoryId}`}
              className="text-xs font-semibold transition-colors duration-200 hover:underline sm:text-sm"
              style={{ color: 'var(--brand-green)' }}
            >
              {product.categoryName}
            </Link>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium sm:text-sm" style={{ color: 'var(--text-medium)' }}>
              Trạng thái:
            </span>
            <span className="text-xs font-semibold sm:text-sm" style={{ color: 'var(--state-success)' }}>
              Còn hàng
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

