import { useState, useMemo } from "react";
import type { CategoryResponseDto } from "@/types/category.types";

interface FilterState {
  searchQuery: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  productCountFilter: "all" | "with-products" | "no-products";
}

interface UseCategoryFiltersReturn {
  filters: FilterState;
  filteredCategories: CategoryResponseDto[];
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: string, sortOrder: "asc" | "desc") => void;
  setProductCountFilter: (filter: "all" | "with-products" | "no-products") => void;
  clearFilters: () => void;
}

export const useCategoryFilters = (
  categories: CategoryResponseDto[]
): UseCategoryFiltersReturn => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    sortBy: "name",
    sortOrder: "asc",
    productCountFilter: "all",
  });

  const filteredCategories = useMemo(() => {
    let filtered = [...categories];

    // Search filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (category) =>
          category.name.toLowerCase().includes(query) ||
          category.slug.toLowerCase().includes(query) ||
          (category.description &&
            category.description.toLowerCase().includes(query))
      );
    }

    // Product count filter
    if (filters.productCountFilter === "with-products") {
      filtered = filtered.filter((category) => category.productCount > 0);
    } else if (filters.productCountFilter === "no-products") {
      filtered = filtered.filter((category) => category.productCount === 0);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "created":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "products":
          comparison = a.productCount - b.productCount;
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }
      return filters.sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [categories, filters]);

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const setSortBy = (sortBy: string, sortOrder: "asc" | "desc") => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  const setProductCountFilter = (
    filter: "all" | "with-products" | "no-products"
  ) => {
    setFilters((prev) => ({ ...prev, productCountFilter: filter }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      sortBy: "name",
      sortOrder: "asc",
      productCountFilter: "all",
    });
  };

  return {
    filters,
    filteredCategories,
    setSearchQuery,
    setSortBy,
    setProductCountFilter,
    clearFilters,
  };
};

