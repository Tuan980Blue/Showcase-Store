'use client';

import { useCallback, useState } from 'react';
import { searchService } from '@/service/services';
import type { ProductListItemDto } from '@/types/product.types';

interface UseProductSearchReturn {
  results: ProductListItemDto[];
  loading: boolean;
  error: string | null;
  query: string;
  search: (query: string) => Promise<void>;
  clear: () => void;
}

/**
 * Public-only hook that wraps the product search API for the storefront.
 * Always uses includeInactive = false so it never depends on admin visibility.
 */
export const useProductSearch = (): UseProductSearchReturn => {
  const [results, setResults] = useState<ProductListItemDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const search = useCallback(async (rawQuery: string) => {
    const trimmed = rawQuery.trim();
    setQuery(rawQuery);

    if (!trimmed) {
      setResults([]);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchService.searchProducts(trimmed, false);
      setResults(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to search products';
      setError(message);
      console.error('Error searching products on site:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    query,
    search,
    clear,
  };
};


