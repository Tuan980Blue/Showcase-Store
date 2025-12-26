'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { usePublicCategory, usePublicProducts, usePublicCategories } from '@/app/(site)/_hooks';
import {
  CategoryDetailHeader,
  CategoryHero,
  CategoryProducts,
  RelatedCategories,
} from './_components';

const CategoryDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;

  // Fetch current category
  const { category, loading, error } = usePublicCategory({ slug });

  // Fetch all products and categories
  const { products: allProducts } = usePublicProducts();
  const { categories: allCategories } = usePublicCategories();

  // Get products in this category
  const categoryProducts = useMemo(() => {
    if (!category || !allProducts.length) {
      return [];
    }
    return allProducts.filter((p) => p.categoryName === category.name);
  }, [category, allProducts]);

  // Get related categories (other categories)
  const relatedCategories = useMemo(() => {
    if (!category || !allCategories.length) {
      return [];
    }
    return allCategories
      .filter((c) => c.id !== category.id)
      .slice(0, 4);
  }, [category, allCategories]);

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
            {/* Header Skeleton */}
            <div className="mb-4 space-y-3">
              <div className="h-4 w-48 animate-pulse rounded bg-[var(--bg-grey)]" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-[var(--bg-grey)] sm:h-10" />
            </div>
            {/* Hero Skeleton */}
            <div className="mb-6 aspect-video w-full animate-pulse rounded-lg bg-[var(--bg-mint)]" />
            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-lg bg-[var(--bg-grey)]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !category) {
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
              {error || 'Không tìm thấy danh mục'}
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
          <CategoryDetailHeader category={category} />

          {/* Category Hero Section */}
          <div className="mb-6">
            <CategoryHero category={category} productCount={categoryProducts.length} />
          </div>

          {/* Products Section */}
          <div className="mb-6">
            <CategoryProducts 
              products={categoryProducts}
              categoryName={category.name}
            />
          </div>

          {/* Related Categories */}
          {relatedCategories.length > 0 && (
            <RelatedCategories 
              categories={relatedCategories}
              currentCategoryId={category.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;

