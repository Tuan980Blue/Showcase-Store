"use client";

import React, { useState, useEffect } from "react";
import { productService, categoryService } from "@/service/services";
import type {
  ProductResponseDto,
  ProductListItemDto,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product.types";
import type { CategoryResponseDto } from "@/types/category.types";
import ProductTable from "./_components/ProductTable";
import ProductForm from "./_components/ProductForm";
import ConfirmModal from "./_components/ConfirmModal";

const ProductsManagePage = () => {
  const [products, setProducts] = useState<ProductListItemDto[]>([]);
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<ProductResponseDto | null>(null);

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    product: ProductListItemDto | null;
  }>({
    isOpen: false,
    product: null,
  });

  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Load products
  const loadProducts = async () => {
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
  };

  // Load categories
  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err: unknown) {
      console.error("Error loading categories:", err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [showInactive]);

  // Handle create/edit
  const handleCreate = () => {
    if (categories.length === 0) {
      setError("Please wait for categories to load, or create a category first.");
      return;
    }
    setEditingProduct(null);
    setShowForm(true);
    setError(null);
    setSuccess(null);
  };

  const handleEdit = async (product: ProductListItemDto) => {
    try {
      setError(null);
      setSuccess(null);
      
      // Fetch full product details for editing
      const fullProduct = await productService.getProductById(product.id);
      setEditingProduct(fullProduct);
      setShowForm(true);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load product details";
      setError(errorMessage);
      console.error("Error loading product:", err);
    }
  };

  const handleFormSubmit = async (
    data: CreateProductDto | UpdateProductDto
  ) => {
    try {
      setFormLoading(true);
      setError(null);

      if (editingProduct) {
        // Update existing product
        await productService.updateProduct(
          editingProduct.id,
          data as UpdateProductDto
        );
        setSuccess("Product updated successfully!");
      } else {
        // Create new product
        await productService.createProduct(data as CreateProductDto);
        setSuccess("Product created successfully!");
      }

      setShowForm(false);
      setEditingProduct(null);
      await loadProducts();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save product";
      setError(errorMessage);
      console.error("Error saving product:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    setError(null);
  };

  // Handle delete
  const handleDeleteClick = (product: ProductListItemDto) => {
    setDeleteConfirm({
      isOpen: true,
      product,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.product) return;

    try {
      setDeleteLoading(true);
      setError(null);

      await productService.deleteProduct(deleteConfirm.product.id);
      setSuccess("Product deleted successfully!");
      setDeleteConfirm({ isOpen: false, product: null });
      await loadProducts();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete product";
      setError(errorMessage);
      console.error("Error deleting product:", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, product: null });
  };

  // Auto-hide success message
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage products, pricing, and inventory
          </p>
        </div>
        {!showForm && (
          <div className="flex gap-3">
            <button
              onClick={() => setShowInactive(!showInactive)}
              className={`px-4 py-2 rounded border transition-colors ${
                showInactive
                  ? "bg-gray-100 border-gray-300 text-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {showInactive ? "Hide Inactive" : "Show Inactive"}
            </button>
            <button
              onClick={handleCreate}
              disabled={categoriesLoading || categories.length === 0}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title={
                categories.length === 0
                  ? "Please create a category first"
                  : "Create new product"
              }
            >
              + Create Product
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {categoriesLoading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
          Loading categories...
        </div>
      )}

      {!categoriesLoading && categories.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          No categories found. Please create a category first before adding products.
        </div>
      )}

      {/* Form or Table */}
      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingProduct ? "Edit Product" : "Create New Product"}
          </h2>
          <ProductForm
            product={editingProduct}
            categories={categories}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={formLoading}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            loading={loading}
            showInactive={showInactive}
            onToggleShowInactive={() => setShowInactive(!showInactive)}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Product"
        message={
          deleteConfirm.product
            ? `Are you sure you want to delete "${deleteConfirm.product.name}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        loading={deleteLoading}
        variant="danger"
      />
    </div>
  );
};

export default ProductsManagePage;
