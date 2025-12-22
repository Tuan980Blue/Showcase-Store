'use client';

import React, { useMemo, useState, useEffect } from 'react';
import type { ProductListItemDto } from '@/types/product.types';
import type { CategoryResponseDto } from '@/types/category.types';
import ProductGrid from './ProductGrid';

interface ProductShowcaseSectionProps {
  products: ProductListItemDto[];
  loading: boolean;
  error: string | null;
  categories: CategoryResponseDto[];
  selectedCategoryId?: string | 'all';
  onCategoryChange?: (id: string | 'all') => void;
}

const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  products,
  loading,
  error,
  categories,
  selectedCategoryId,
  onCategoryChange,
}) => {
  const [internalCategory, setInternalCategory] = useState<string | 'all'>('all');
  const activeCategory = selectedCategoryId ?? internalCategory;

  useEffect(() => {
    if (selectedCategoryId !== undefined) {
      // keep internal state in sync when controlled externally
      setInternalCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;

    const selectedCategory = categories.find(
      (c) => c.id.toString() === activeCategory
    );

    if (!selectedCategory) return products;

    return products.filter(
      (p) => p.categoryName === selectedCategory.name
    );
  }, [products, categories, activeCategory]);

  const handleSelect = (id: string | 'all') => {
    setInternalCategory(id);
    onCategoryChange?.(id);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Toolbar: title + simple category filter */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-navy)] sm:text-base">
            Sản phẩm dành cho bạn
          </h2>
          <p className="text-xs text-[var(--text-light)] sm:text-sm">
            Lọc nhanh theo danh mục để tìm đúng sản phẩm phù hợp.
          </p>
        </div>

        {categories.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-[var(--text-medium)] sm:text-sm">
              Danh mục:
            </label>
            <select
              className="rounded border px-2 py-1 text-xs sm:text-sm"
              style={{
                borderColor: 'var(--border-light)',
                backgroundColor: 'var(--bg-light)',
                color: 'var(--text-dark)',
              }}
              value={activeCategory}
              onChange={(e) => handleSelect(e.target.value as string)}
            >
              <option value="all">Tất cả</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <ProductGrid
        products={filteredProducts}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ProductShowcaseSection;


