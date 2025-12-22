import { useState, useMemo } from "react";
import type { BlogPostResponseDto } from "@/types/blog.types";
import type { BlogCategoryResponseDto } from "@/types/blog.types";

interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  publishStatus: "all" | "published" | "draft";
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface UseBlogFiltersReturn {
  filters: FilterState;
  filteredPosts: BlogPostResponseDto[];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (categoryId: string) => void;
  setPublishStatus: (status: "all" | "published" | "draft") => void;
  setSortBy: (sortBy: string, sortOrder: "asc" | "desc") => void;
  clearFilters: () => void;
}

export const useBlogFilters = (
  posts: BlogPostResponseDto[],
  categories: BlogCategoryResponseDto[]
): UseBlogFiltersReturn => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    selectedCategory: "all",
    publishStatus: "all",
    sortBy: "created",
    sortOrder: "desc",
  });

  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Search filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.slug.toLowerCase().includes(query) ||
          post.summary.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.selectedCategory !== "all") {
      filtered = filtered.filter(
        (post) =>
          categories.find(
            (c) => c.id.toString() === filters.selectedCategory
          )?.name === post.categoryName
      );
    }

    // Publish status filter
    if (filters.publishStatus === "published") {
      filtered = filtered.filter((post) => post.isPublished);
    } else if (filters.publishStatus === "draft") {
      filtered = filtered.filter((post) => !post.isPublished);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "created":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "published":
          comparison =
            (a.publishedAt ? new Date(a.publishedAt).getTime() : 0) -
            (b.publishedAt ? new Date(b.publishedAt).getTime() : 0);
          break;
        case "category":
          comparison = a.categoryName.localeCompare(b.categoryName);
          break;
        default:
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return filters.sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [posts, filters, categories]);

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const setSelectedCategory = (categoryId: string) => {
    setFilters((prev) => ({ ...prev, selectedCategory: categoryId }));
  };

  const setPublishStatus = (status: "all" | "published" | "draft") => {
    setFilters((prev) => ({ ...prev, publishStatus: status }));
  };

  const setSortBy = (sortBy: string, sortOrder: "asc" | "desc") => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      selectedCategory: "all",
      publishStatus: "all",
      sortBy: "created",
      sortOrder: "desc",
    });
  };

  return {
    filters,
    filteredPosts,
    setSearchQuery,
    setSelectedCategory,
    setPublishStatus,
    setSortBy,
    clearFilters,
  };
};

