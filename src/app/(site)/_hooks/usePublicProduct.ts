'use client';

import { useCallback, useEffect, useState } from 'react';
import { productService } from '@/service/services';
import type { ProductResponseDto } from '@/types/product.types';

interface UsePublicProductOptions {
  id?: string;
  slug?: string;
  /** Fetch immediately on mount (default: true when id or slug is provided) */
  enabled?: boolean;
}

interface UsePublicProductReturn {
  product: ProductResponseDto | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

/**
 * Public-only hook to load a single product by id or slug for the storefront.
 * Does not expose any create/update/delete operations.
 */
export const usePublicProduct = (
  options: UsePublicProductOptions
): UsePublicProductReturn => {
  const { id, slug } = options;
  const enabled = options.enabled ?? Boolean(id || slug);

  const [product, setProduct] = useState<ProductResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(enabled));
  const [error, setError] = useState<string | null>(null);

  const loadProduct = useCallback(async () => {
    if (!enabled || (!id && !slug)) return;

    try {
      setLoading(true);
      setError(null);

      const data = id
        ? await productService.getProductById(id)
        : await productService.getProductBySlug(slug as string);

      setProduct(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load product';
      setError(message);
      console.error('Error loading public product:', err);
    } finally {
      setLoading(false);
    }
  }, [enabled, id, slug]);

  useEffect(() => {
    void loadProduct();
  }, [loadProduct]);

  return {
    product,
    loading,
    error,
    reload: loadProduct,
  };
};


