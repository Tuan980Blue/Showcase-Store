import { useState, useMemo } from "react";
import type { ProductListItemDto } from "@/types/product.types";
import type { CategoryResponseDto } from "@/types/category.types";

interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  priceRange: { min: number | ""; max: number | "" };
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface UseProductFiltersReturn {
  filters: FilterState;
  filteredProducts: ProductListItemDto[];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (categoryId: string) => void;
  setPriceRange: (range: { min: number | ""; max: number | "" }) => void;
  setSortBy: (sortBy: string, sortOrder: "asc" | "desc") => void;
  clearFilters: () => void;
}

export const useProductFilters = (
  products: ProductListItemDto[],
  categories: CategoryResponseDto[]
): UseProductFiltersReturn => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    selectedCategory: "all",
    priceRange: { min: "", max: "" },
    sortBy: "name",
    sortOrder: "asc",
  });

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.slug.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          categories.find(
            (c) => c.id.toString() === filters.selectedCategory
          )?.name === product.categoryName
      );
    }

    // Price range filter
    if (filters.priceRange.min !== "") {
      filtered = filtered.filter(
        (product) => product.price >= (filters.priceRange.min as number)
      );
    }
    if (filters.priceRange.max !== "") {
      filtered = filtered.filter(
        (product) => product.price <= (filters.priceRange.max as number)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "category":
          comparison = a.categoryName.localeCompare(b.categoryName);
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }
      return filters.sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [products, filters, categories]);

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const setSelectedCategory = (categoryId: string) => {
    setFilters((prev) => ({ ...prev, selectedCategory: categoryId }));
  };

  const setPriceRange = (range: { min: number | ""; max: number | "" }) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const setSortBy = (sortBy: string, sortOrder: "asc" | "desc") => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      selectedCategory: "all",
      priceRange: { min: "", max: "" },
      sortBy: "name",
      sortOrder: "asc",
    });
  };

  return {
    filters,
    filteredProducts,
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    clearFilters,
  };
};

