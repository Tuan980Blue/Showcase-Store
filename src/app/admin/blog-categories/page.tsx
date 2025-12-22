"use client";

import React, { useState, useEffect } from "react";
import { blogCategoryService } from "@/service/services";
import type {
  BlogCategoryResponseDto,
  CreateBlogCategoryDto,
  UpdateBlogCategoryDto,
} from "@/types/blog.types";
import BlogCategoryTable from "./_components/BlogCategoryTable";
import BlogCategoryForm from "./_components/BlogCategoryForm";
import ConfirmModal from "./_components/ConfirmModal";

const BlogCategoriesManagePage = () => {
  const [categories, setCategories] = useState<BlogCategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<BlogCategoryResponseDto | null>(null);

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    category: BlogCategoryResponseDto | null;
  }>({
    isOpen: false,
    category: null,
  });

  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Load categories
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogCategoryService.getAllCategories();
      setCategories(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load blog categories";
      setError(errorMessage);
      console.error("Error loading blog categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Handle create/edit
  const handleCreate = () => {
    setEditingCategory(null);
    setShowForm(true);
    setError(null);
    setSuccess(null);
  };

  const handleEdit = (category: BlogCategoryResponseDto) => {
    setEditingCategory(category);
    setShowForm(true);
    setError(null);
    setSuccess(null);
  };

  const handleFormSubmit = async (
    data: CreateBlogCategoryDto | UpdateBlogCategoryDto
  ) => {
    try {
      setFormLoading(true);
      setError(null);

      if (editingCategory) {
        // Update existing category
        await blogCategoryService.updateCategory(
          editingCategory.id,
          data as UpdateBlogCategoryDto
        );
        setSuccess("Blog category updated successfully!");
      } else {
        // Create new category
        await blogCategoryService.createCategory(data as CreateBlogCategoryDto);
        setSuccess("Blog category created successfully!");
      }

      setShowForm(false);
      setEditingCategory(null);
      await loadCategories();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save blog category";
      setError(errorMessage);
      console.error("Error saving blog category:", err);
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
  const handleDeleteClick = (category: BlogCategoryResponseDto) => {
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

      await blogCategoryService.deleteCategory(deleteConfirm.category.id);
      setSuccess("Blog category deleted successfully!");
      setDeleteConfirm({ isOpen: false, category: null });
      await loadCategories();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to delete blog category";
      setError(errorMessage);
      console.error("Error deleting blog category:", err);
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Blog Category Management
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage blog categories and organize your content
          </p>
        </div>
        {!showForm && (
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            + Create Category
          </button>
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

      {/* Form or Table */}
      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingCategory ? "Edit Blog Category" : "Create New Blog Category"}
          </h2>
          <BlogCategoryForm
            category={editingCategory}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={formLoading}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <BlogCategoryTable
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            loading={loading}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Blog Category"
        message={
          deleteConfirm.category
            ? `Are you sure you want to delete "${deleteConfirm.category.name}"? This action cannot be undone.${
                deleteConfirm.category.blogPostCount > 0
                  ? `\n\nNote: This category has ${deleteConfirm.category.blogPostCount} blog post(s) and cannot be deleted.`
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

export default BlogCategoriesManagePage;

