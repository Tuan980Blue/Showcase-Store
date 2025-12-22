'use client';

import { useCallback, useEffect, useState } from 'react';
import { productService } from '@/service/services';
import type { ProductListItemDto } from '@/types/product.types';

interface UsePublicProductsReturn {
  products: ProductListItemDto[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

/**
 * Public-only hook to load visible products for the storefront.
 * Uses the product listing API with includeInactive = false so it never relies on admin privileges.
 */
export const usePublicProducts = (): UsePublicProductsReturn => {
  const [products, setProducts] = useState<ProductListItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Public storefront should only see active products
      const data = await productService.getAllProducts(false);
      setProducts(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load products';
      setError(message);
      console.error('Error loading public products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    reload: loadProducts,
  };
};


