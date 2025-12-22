"use client";

import React, { useState, useEffect } from "react";
import type {
  BlogPostResponseDto,
  CreateBlogPostDto,
  UpdateBlogPostDto,
} from "@/types/blog.types";
import BlogPostTable from "./_components/BlogPostTable";
import ConfirmModal from "./_components/ConfirmModal";
import AlertMessage from "./_components/AlertMessage";
import PageHeader from "./_components/PageHeader";
import BlogPostFormWrapper from "./_components/BlogPostFormWrapper";
import CreateBlogPostButton from "./_components/CreateBlogPostButton";
import BlogSearchAndFilter from "./_components/BlogSearchAndFilter";
import { useBlogs } from "./_hooks/useBlogs";
import { useBlogFilters } from "./_hooks/useBlogFilters";

const BlogsManagePage = () => {
  // Data management hook
  const {
    posts,
    categories,
    loading,
    categoriesLoading,
    error,
    success,
    showUnpublished,
    setError,
    setSuccess,
    setShowUnpublished,
    createPost,
    updatePost,
    deletePost,
  } = useBlogs();

  // Filtering hook
  const {
    filters,
    filteredPosts,
    setSearchQuery,
    setSelectedCategory,
    setPublishStatus,
    setSortBy,
    clearFilters,
  } = useBlogFilters(posts, categories);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostResponseDto | null>(
    null
  );
  const [formLoading, setFormLoading] = useState(false);

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    post: BlogPostResponseDto | null;
  }>({
    isOpen: false,
    post: null,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState<number | null>(null);

  // Handle create/edit
  const handleCreate = () => {
    if (categories.length === 0) {
      setError(
        "Please wait for categories to load, or create a blog category first."
      );
      return;
    }
    setEditingPost(null);
    setShowForm(true);
    setError(null);
    setSuccess(null);
  };

  const handleEdit = (post: BlogPostResponseDto) => {
    setEditingPost(post);
    setShowForm(true);
    setError(null);
    setSuccess(null);
  };

  const handleFormSubmit = async (
    data: CreateBlogPostDto | UpdateBlogPostDto
  ) => {
    try {
      setFormLoading(true);
      setError(null);

      if (editingPost) {
        await updatePost(editingPost.id, data as UpdateBlogPostDto);
      } else {
        await createPost(data as CreateBlogPostDto);
      }

      setShowForm(false);
      setEditingPost(null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save blog post";
      setError(errorMessage);
      console.error("Error saving blog post:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPost(null);
    setError(null);
  };

  // Handle toggle publish status
  const handleTogglePublish = async (post: BlogPostResponseDto) => {
    try {
      setToggleLoading(post.id);
      setError(null);

      await updatePost(post.id, {
        isPublished: !post.isPublished,
      });

      setSuccess(
        `Blog post ${!post.isPublished ? "published" : "unpublished"} successfully!`
      );
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to update blog post status";
      setError(errorMessage);
      console.error("Error updating blog post status:", err);
    } finally {
      setToggleLoading(null);
    }
  };

  // Handle delete
  const handleDeleteClick = (post: BlogPostResponseDto) => {
    setDeleteConfirm({
      isOpen: true,
      post,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.post) return;

    try {
      setDeleteLoading(true);
      setError(null);
      await deletePost(deleteConfirm.post.id);
      setDeleteConfirm({ isOpen: false, post: null });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete blog post";
      setError(errorMessage);
      console.error("Error deleting blog post:", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, post: null });
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
        title="Blog Post Management"
        description="Create and manage blog posts, articles, and content with advanced search and filters"
        actionButton={
          !showForm && (
            <CreateBlogPostButton
              onClick={handleCreate}
              disabled={categoriesLoading || categories.length === 0}
              title={
                categories.length === 0
                  ? "Please create a blog category first"
                  : "Create new blog post"
              }
            />
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
      {categoriesLoading && (
        <AlertMessage type="info" message="Loading blog categories..." />
      )}
      {!categoriesLoading && categories.length === 0 && (
        <AlertMessage
          type="warning"
          message={
            <>
              <strong>No blog categories found.</strong> Please create a blog
              category first before adding posts.
            </>
          }
        />
      )}

      {/* Form or Table */}
      {showForm ? (
        <BlogPostFormWrapper
          editingPost={editingPost}
          categories={categories}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          loading={formLoading}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          {/* Search and Filter */}
          <div className="mb-6">
            <BlogSearchAndFilter
              searchQuery={filters.searchQuery}
              selectedCategory={filters.selectedCategory}
              publishStatus={filters.publishStatus}
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              categories={categories}
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
              onPublishStatusChange={setPublishStatus}
              onSortChange={setSortBy}
              onClearFilters={clearFilters}
              resultCount={filteredPosts.length}
            />
          </div>

          {/* Blog Post Table */}
          <BlogPostTable
            posts={filteredPosts}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onTogglePublish={handleTogglePublish}
            loading={loading}
            showUnpublished={showUnpublished}
            onToggleShowUnpublished={() => setShowUnpublished(!showUnpublished)}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Blog Post"
        message={
          deleteConfirm.post
            ? `Are you sure you want to delete "${deleteConfirm.post.title}"? This action cannot be undone.`
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

export default BlogsManagePage;
