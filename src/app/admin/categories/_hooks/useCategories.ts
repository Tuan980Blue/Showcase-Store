import { useState, useEffect, useCallback } from "react";
import { categoryService } from "@/service/services";
import type {
  CategoryResponseDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/category.types";

interface UseCategoriesReturn {
  categories: CategoryResponseDto[];
  loading: boolean;
  error: string | null;
  success: string | null;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  loadCategories: () => Promise<void>;
  createCategory: (data: CreateCategoryDto) => Promise<void>;
  updateCategory: (id: number, data: UpdateCategoryDto) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load categories";
      setError(errorMessage);
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(
    async (data: CreateCategoryDto) => {
      await categoryService.createBulkCategories([data]);
      setSuccess("Category created successfully!");
      await loadCategories();
    },
    [loadCategories]
  );

  const updateCategory = useCallback(
    async (id: number, data: UpdateCategoryDto) => {
      await categoryService.updateCategory(id, data);
      setSuccess("Category updated successfully!");
      await loadCategories();
    },
    [loadCategories]
  );

  const deleteCategory = useCallback(
    async (id: number) => {
      await categoryService.deleteCategory(id);
      setSuccess("Category deleted successfully!");
      await loadCategories();
    },
    [loadCategories]
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    success,
    setError,
    setSuccess,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

