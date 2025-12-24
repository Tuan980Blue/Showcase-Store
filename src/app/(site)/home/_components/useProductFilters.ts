import { useMemo } from 'react';
import type { ProductListItemDto } from '@/types/product.types';
import type { CategoryResponseDto } from '@/types/category.types';
import type { FilterState, PriceRange, SortOption } from './ProductFilters';

export const useProductFilters = (
  products: ProductListItemDto[],
  categories: CategoryResponseDto[],
  filterState: FilterState
) => {
  // Get price range limits
  const getPriceRangeLimits = (range: PriceRange): { min: number; max: number } => {
    switch (range) {
      case 'under-100k':
        return { min: 0, max: 100000 };
      case '100k-500k':
        return { min: 100000, max: 500000 };
      case '500k-1m':
        return { min: 500000, max: 1000000 };
      case '1m-5m':
        return { min: 1000000, max: 5000000 };
      case 'over-5m':
        return { min: 5000000, max: Infinity };
      default:
        return { min: 0, max: Infinity };
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (filterState.categoryId !== 'all') {
      const selectedCategory = categories.find(
        (c) => c.id.toString() === filterState.categoryId
      );
      if (selectedCategory) {
        filtered = filtered.filter(
          (p) => p.categoryName === selectedCategory.name
        );
      }
    }

    // Filter by search query
    if (filterState.searchQuery.trim()) {
      const query = filterState.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    if (filterState.priceRange !== 'all') {
      const { min, max } = getPriceRangeLimits(filterState.priceRange);
      filtered = filtered.filter((p) => {
        const price = p.price ?? 0;
        return price >= min && price <= max;
      });
    }

    // Sort products
    const sorted = [...filtered];
    switch (filterState.sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case 'price-desc':
        sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name, 'vi'));
        break;
      default:
        // Keep original order
        break;
    }

    return sorted;
  }, [products, categories, filterState]);

  return {
    filteredProducts,
  };
};

