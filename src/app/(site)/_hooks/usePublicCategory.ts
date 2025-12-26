'use client';

import { useCallback, useEffect, useState } from 'react';
import { categoryService } from '@/service/services';
import type { CategoryResponseDto } from '@/types/category.types';

interface UsePublicCategoryOptions {
  id?: number;
  slug?: string;
  /** Fetch immediately on mount (default: true when id or slug is provided) */
  enabled?: boolean;
}

interface UsePublicCategoryReturn {
  category: CategoryResponseDto | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

/**
 * Public-only hook to load a single category by id or slug for the storefront.
 * Does not expose any create/update/delete operations.
 */
export const usePublicCategory = (
  options: UsePublicCategoryOptions
): UsePublicCategoryReturn => {
  const { id, slug } = options;
  const enabled = options.enabled ?? Boolean(id || slug);

  const [category, setCategory] = useState<CategoryResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(enabled));
  const [error, setError] = useState<string | null>(null);

  const loadCategory = useCallback(async () => {
    if (!enabled || (!id && !slug)) return;

    try {
      setLoading(true);
      setError(null);

      const data = id
        ? await categoryService.getCategoryById(id)
        : await categoryService.getCategoryBySlug(slug as string);

      setCategory(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load category';
      setError(message);
      console.error('Error loading public category:', err);
    } finally {
      setLoading(false);
    }
  }, [enabled, id, slug]);

  useEffect(() => {
    void loadCategory();
  }, [loadCategory]);

  return {
    category,
    loading,
    error,
    reload: loadCategory,
  };
};

