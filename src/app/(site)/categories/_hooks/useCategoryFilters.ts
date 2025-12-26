import { useMemo } from 'react';
import type { CategoryResponseDto } from '@/types/category.types';
import type { SortOption } from '../_components/CategorySearch';

export const useCategoryFilters = (
  categories: CategoryResponseDto[],
  searchQuery: string,
  sortBy: SortOption
) => {
  // Filter and sort categories
  const filteredCategories = useMemo(() => {
    let filtered = categories;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          (c.description && c.description.toLowerCase().includes(query)) ||
          (c.slug && c.slug.toLowerCase().includes(query))
      );
    }

    // Sort categories
    const sorted = [...filtered];
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name, 'vi'));
        break;
      case 'products-asc':
        sorted.sort((a, b) => (a.productCount ?? 0) - (b.productCount ?? 0));
        break;
      case 'products-desc':
        sorted.sort((a, b) => (b.productCount ?? 0) - (a.productCount ?? 0));
        break;
      default:
        // Keep original order
        break;
    }

    return sorted;
  }, [categories, searchQuery, sortBy]);

  return {
    filteredCategories,
  };
};

