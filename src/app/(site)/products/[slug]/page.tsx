'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { usePublicProduct, usePublicProducts } from '@/app/(site)/_hooks';
import {
  ProductDetailHeader,
  ProductImageGallery,
  ProductInfo,
  ProductDescription,
  RelatedProducts,
} from './_components';

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;

  // Fetch current product
  const { product, loading, error } = usePublicProduct({ slug });

  // Fetch all products for related products
  const { products: allProducts } = usePublicProducts();

  // Get related products from same category
  const relatedProducts = useMemo(() => {
    if (!product || !allProducts.length) {
      return [];
    }
    return allProducts
      .filter((p) => p.categoryName === product.categoryName && p.id !== product.id)
      .slice(0, 4);
  }, [product, allProducts]);

  // Loading state
  if (loading) {
    return (
      <div 
        className="min-h-screen w-full"
        style={{ 
          backgroundColor: 'var(--bg-light)',
          color: 'var(--text-dark)',
        }}
      >
        <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
              {/* Image Gallery Skeleton */}
              <div className="space-y-3">
                <div className="aspect-square w-full animate-pulse rounded-lg bg-[var(--bg-mint)]" />
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-square animate-pulse rounded-lg bg-[var(--bg-grey)]" />
                  ))}
                </div>
              </div>
              {/* Product Info Skeleton */}
              <div className="space-y-3">
                <div className="h-6 w-3/4 animate-pulse rounded bg-[var(--bg-grey)] sm:h-8" />
                <div className="h-5 w-1/2 animate-pulse rounded bg-[var(--bg-grey)] sm:h-6" />
                <div className="h-24 w-full animate-pulse rounded bg-[var(--bg-grey)] sm:h-32" />
                <div className="h-10 w-full animate-pulse rounded-lg bg-[var(--bg-grey)] sm:h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div 
        className="min-h-screen w-full flex items-center justify-center"
        style={{ 
          backgroundColor: 'var(--bg-light)',
          color: 'var(--text-dark)',
        }}
      >
        <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6">
          <div 
            className="rounded-lg border p-6 text-center sm:p-8"
            style={{ 
              borderColor: 'var(--state-error)',
              backgroundColor: 'rgba(230, 80, 80, 0.05)',
            }}
          >
            <p className="text-base font-semibold text-[var(--state-error)] sm:text-lg">
              {error || 'Không tìm thấy sản phẩm'}
            </p>
            <p className="mt-1.5 text-xs text-[var(--text-light)] sm:text-sm">
              Vui lòng thử lại sau
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full"
      style={{ 
        backgroundColor: 'var(--bg-light)',
        color: 'var(--text-dark)',
      }}
    >
      {/* Main Container */}
      <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumbs & Header */}
          <ProductDetailHeader product={product} />

          {/* Main Product Section */}
          <div className="mb-6 grid gap-4 lg:grid-cols-2 lg:gap-6">
            {/* Image Gallery */}
            <div className="lg:sticky lg:top-20 lg:self-start">
              <ProductImageGallery product={product} />
            </div>

            {/* Product Info */}
            <div>
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Product Description */}
          <div className="mb-6">
            <ProductDescription product={product} />
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <RelatedProducts 
              products={relatedProducts}
              categoryName={product.categoryName}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

