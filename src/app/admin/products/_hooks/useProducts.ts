import { useState, useEffect, useCallback } from "react";
import { productService, categoryService } from "@/service/services";
import type {
  ProductResponseDto,
  ProductListItemDto,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product.types";
import type { CategoryResponseDto } from "@/types/category.types";

interface UseProductsReturn {
  products: ProductListItemDto[];
  categories: CategoryResponseDto[];
  loading: boolean;
  categoriesLoading: boolean;
  error: string | null;
  success: string | null;
  showInactive: boolean;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  setShowInactive: (show: boolean) => void;
  loadProducts: () => Promise<void>;
  loadCategories: () => Promise<void>;
  createProduct: (data: CreateProductDto) => Promise<void>;
  updateProduct: (id: string, data: UpdateProductDto) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<ProductListItemDto[]>([]);
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts(showInactive);
      setProducts(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load products";
      setError(errorMessage);
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  }, [showInactive]);

  const loadCategories = useCallback(async () => {
    try {
      setCategoriesLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err: unknown) {
      console.error("Error loading categories:", err);
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  const createProduct = useCallback(
    async (data: CreateProductDto) => {
      await productService.createProduct(data);
      setSuccess("Product created successfully!");
      await loadProducts();
    },
    [loadProducts]
  );

  const updateProduct = useCallback(
    async (id: string, data: UpdateProductDto) => {
      await productService.updateProduct(id, data);
      setSuccess("Product updated successfully!");
      await loadProducts();
    },
    [loadProducts]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      await productService.deleteProduct(id);
      setSuccess("Product deleted successfully!");
      await loadProducts();
    },
    [loadProducts]
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    categories,
    loading,
    categoriesLoading,
    error,
    success,
    showInactive,
    setError,
    setSuccess,
    setShowInactive,
    loadProducts,
    loadCategories,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

