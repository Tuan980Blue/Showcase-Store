"use client";

import React, { useState, useEffect } from "react";
import { productService } from "@/service/services";
import type {
  ProductResponseDto,
  ProductListItemDto,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product.types";
import ProductTable from "./_components/ProductTable";
import ConfirmModal from "./_components/ConfirmModal";
import SearchAndFilter from "./_components/SearchAndFilter";
import AlertMessage from "./_components/AlertMessage";
import PageHeader from "./_components/PageHeader";
import ProductFormWrapper from "./_components/ProductFormWrapper";
import CreateProductButton from "./_components/CreateProductButton";
import { useProducts } from "./_hooks/useProducts";
import { useProductFilters } from "./_hooks/useProductFilters";

const ProductsManagePage = () => {
  // Data management hooks
  const {
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
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  // Filtering hook
  const {
    filters,
    filteredProducts,
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    clearFilters,
  } = useProductFilters(products, categories);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<ProductResponseDto | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    product: ProductListItemDto | null;
  }>({
    isOpen: false,
    product: null,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);


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
        await updateProduct(editingProduct.id, data as UpdateProductDto);
      } else {
        await createProduct(data as CreateProductDto);
      }

      setShowForm(false);
      setEditingProduct(null);
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
      await deleteProduct(deleteConfirm.product.id);
      setDeleteConfirm({ isOpen: false, product: null });
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
      <PageHeader
        title="Product Management"
        description="Manage products, pricing, and inventory with advanced search and filters"
        actionButton={
          !showForm && (
            <CreateProductButton
              onClick={handleCreate}
              disabled={categoriesLoading || categories.length === 0}
              title={
                categories.length === 0
                  ? "Please create a category first"
                  : "Create new product"
              }
            />
          )
        }
      />

      {/* Messages */}
      {error && (
        <AlertMessage type="error" message={error} onDismiss={() => setError(null)} />
      )}
      {success && (
        <AlertMessage
          type="success"
          message={success}
          onDismiss={() => setSuccess(null)}
        />
      )}
      {categoriesLoading && (
        <AlertMessage type="info" message="Loading categories..." />
      )}
      {!categoriesLoading && categories.length === 0 && (
        <AlertMessage
          type="warning"
          message={
            <>
              <strong>No categories found.</strong> Please create a category first
              before adding products.
            </>
          }
        />
      )}

      {/* Form or Table */}
      {showForm ? (
        <ProductFormWrapper
          editingProduct={editingProduct}
          categories={categories}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          loading={formLoading}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          {/* Search and Filter */}
          <div className="mb-6">
            <SearchAndFilter
              searchQuery={filters.searchQuery}
              selectedCategory={filters.selectedCategory}
              priceRange={filters.priceRange}
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              showInactive={showInactive}
              categories={categories}
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
              onPriceRangeChange={setPriceRange}
              onSortChange={setSortBy}
              onToggleInactive={() => setShowInactive(!showInactive)}
              onClearFilters={clearFilters}
              resultCount={filteredProducts.length}
            />
          </div>

          {/* Product Table */}
          <ProductTable
            products={filteredProducts}
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
