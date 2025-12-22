'use client';

import React from 'react';
import Image from 'next/image';
import type { ProductListItemDto } from '@/types/product.types';

interface ProductGridProps {
  products: ProductListItemDto[];
  loading: boolean;
  error: string | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="rounded-lg border p-4 text-sm text-[var(--text-light)]">
        Đang tải sản phẩm, vui lòng chờ...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-lg border p-4 text-sm text-[var(--text-light)]">
        Hiện chưa có sản phẩm phù hợp với bộ lọc. Bạn hãy thử lại sau nhé.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          style={{ borderColor: 'var(--border-light)' }}
        >
          <div className="relative aspect-square w-full bg-[var(--bg-mint)]">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
                priority={false}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[11px] text-[var(--text-light)] sm:text-xs">
                No image
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-2 sm:p-3">
            <h3 className="line-clamp-2 text-[11px] font-medium text-[var(--text-dark)] group-hover:text-[var(--brand-navy)] sm:text-xs md:text-sm">
              {product.name}
            </h3>
            <p className="mt-1 text-[10px] text-[var(--text-light)] sm:text-xs">
              {product.categoryName}
            </p>

            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs font-semibold text-[var(--brand-green)] sm:text-sm">
                {product.price?.toLocaleString('vi-VN')}₫
              </p>
              <div className="flex items-center gap-1.5">
                {product.shopeeLink && (
                  <a
                    href={product.shopeeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-[#ee4d2d] px-2 py-1 text-[9px] font-medium text-white shadow-sm hover:bg-[#d63f22] sm:text-[10px]"
                  >
                    <Image
                      src="/shopee.png"
                      alt="Mua trên Shopee"
                      width={14}
                      height={14}
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    />
                    <span className="hidden sm:inline">Shopee</span>
                  </a>
                )}
                {product.tikTokLink && (
                  <a
                    href={product.tikTokLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-black px-2 py-1 text-[9px] font-medium text-white shadow-sm hover:bg-[#111111] sm:text-[10px]"
                  >
                    <Image
                      src="/tiktok.png"
                      alt="Xem trên TikTok"
                      width={14}
                      height={14}
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    />
                    <span className="hidden sm:inline">TikTok</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ProductGrid;


