"use client";

import React, { useState, useEffect } from "react";
import type {
  CategoryResponseDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/category.types";
import CategoryTable from "./_components/CategoryTable";
import ConfirmModal from "./_components/ConfirmModal";
import AlertMessage from "./_components/AlertMessage";
import PageHeader from "./_components/PageHeader";
import CategoryFormWrapper from "./_components/CategoryFormWrapper";
import CreateCategoryButton from "./_components/CreateCategoryButton";
import CategorySearchAndFilter from "./_components/CategorySearchAndFilter";
import { useCategories } from "./_hooks/useCategories";
import { useCategoryFilters } from "./_hooks/useCategoryFilters";

const CategoriesManagePage = () => {
  // Data management hook
  const {
    categories,
    loading,
    error,
    success,
    setError,
    setSuccess,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  // Filtering hook
  const {
    filters,
    filteredCategories,
    setSearchQuery,
    setSortBy,
    setProductCountFilter,
    clearFilters,
  } = useCategoryFilters(categories);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryResponseDto | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    category: CategoryResponseDto | null;
  }>({
    isOpen: false,
    category: null,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Handle create/edit
  const handleCreate = () => {
    setEditingCategory(null);
    setShowForm(true);
    setError(null);
    setSuccess(null);
  };

  const handleEdit = (category: CategoryResponseDto) => {
    setEditingCategory(category);
    setShowForm(true);
    setError(null);
    setSuccess(null);
  };

  const handleFormSubmit = async (
    data: CreateCategoryDto | UpdateCategoryDto
  ) => {
    try {
      setFormLoading(true);
      setError(null);

      if (editingCategory) {
        await updateCategory(editingCategory.id, data as UpdateCategoryDto);
      } else {
        await createCategory(data as CreateCategoryDto);
      }

      setShowForm(false);
      setEditingCategory(null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save category";
      setError(errorMessage);
      console.error("Error saving category:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
    setError(null);
  };

  // Handle delete
  const handleDeleteClick = (category: CategoryResponseDto) => {
    setDeleteConfirm({
      isOpen: true,
      category,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.category) return;

    try {
      setDeleteLoading(true);
      setError(null);
      await deleteCategory(deleteConfirm.category.id);
      setDeleteConfirm({ isOpen: false, category: null });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete category";
      setError(errorMessage);
      console.error("Error deleting category:", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, category: null });
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
        title="Category Management"
        description="Manage product categories and their SEO settings"
        actionButton={
          !showForm && (
            <CreateCategoryButton onClick={handleCreate} />
          )
        }
      />

      {/* Messages */}
      {error && (
        <AlertMessage
          type="error"
          message={error}
          onDismiss={() => setError(null)}
        />
      )}
      {success && (
        <AlertMessage
          type="success"
          message={success}
          onDismiss={() => setSuccess(null)}
        />
      )}

      {/* Form or Table */}
      {showForm ? (
        <CategoryFormWrapper
          editingCategory={editingCategory}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          loading={formLoading}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          {/* Search and Filter */}
          <div className="mb-6">
            <CategorySearchAndFilter
              searchQuery={filters.searchQuery}
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              productCountFilter={filters.productCountFilter}
              onSearchChange={setSearchQuery}
              onSortChange={setSortBy}
              onProductCountFilterChange={setProductCountFilter}
              onClearFilters={clearFilters}
              resultCount={filteredCategories.length}
            />
          </div>

          {/* Category Table */}
          <CategoryTable
            categories={filteredCategories}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            loading={loading}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Category"
        message={
          deleteConfirm.category
            ? `Are you sure you want to delete "${deleteConfirm.category.name}"? This action cannot be undone.${
                deleteConfirm.category.productCount > 0
                  ? `\n\nNote: This category has ${deleteConfirm.category.productCount} product(s) and cannot be deleted.`
                  : ""
              }`
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

export default CategoriesManagePage;
