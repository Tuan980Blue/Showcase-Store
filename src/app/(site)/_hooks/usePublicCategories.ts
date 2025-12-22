'use client';

import { useCallback, useEffect, useState } from 'react';
import { categoryService } from '@/service/services';
import type { CategoryResponseDto } from '@/types/category.types';

interface UsePublicCategoriesReturn {
  categories: CategoryResponseDto[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

/**
 * Public-only hook to load product categories for the storefront.
 * Uses only read APIs and does not expose any admin category operations.
 */
export const usePublicCategories = (): UsePublicCategoriesReturn => {
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load categories';
      setError(message);
      console.error('Error loading public categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    reload: loadCategories,
  };
};


