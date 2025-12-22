"use client";

import React, { useState, useEffect } from "react";
import { blogPostService, blogCategoryService } from "@/service/services";
import type {
  BlogPostResponseDto,
  CreateBlogPostDto,
  UpdateBlogPostDto,
} from "@/types/blog.types";
import type { BlogCategoryResponseDto } from "@/types/blog.types";
import BlogPostTable from "./_components/BlogPostTable";
import BlogPostForm from "./_components/BlogPostForm";
import ConfirmModal from "./_components/ConfirmModal";

const BlogsManagePage = () => {
  const [posts, setPosts] = useState<BlogPostResponseDto[]>([]);
  const [categories, setCategories] = useState<BlogCategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showUnpublished, setShowUnpublished] = useState(false);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostResponseDto | null>(
    null
  );

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    post: BlogPostResponseDto | null;
  }>({
    isOpen: false,
    post: null,
  });

  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState<number | null>(null);

  // Load posts
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogPostService.getAllPosts(showUnpublished);
      setPosts(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load blog posts";
      setError(errorMessage);
      console.error("Error loading blog posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await blogCategoryService.getAllCategories();
      setCategories(data);
    } catch (err: unknown) {
      console.error("Error loading blog categories:", err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [showUnpublished]);

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
        // Update existing post
        await blogPostService.updatePost(
          editingPost.id,
          data as UpdateBlogPostDto
        );
        setSuccess("Blog post updated successfully!");
      } else {
        // Create new post
        await blogPostService.createPost(data as CreateBlogPostDto);
        setSuccess("Blog post created successfully!");
      }

      setShowForm(false);
      setEditingPost(null);
      await loadPosts();
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

      await blogPostService.updatePost(post.id, {
        isPublished: !post.isPublished,
      });

      setSuccess(
        `Blog post ${!post.isPublished ? "published" : "unpublished"} successfully!`
      );
      await loadPosts();
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

      await blogPostService.deletePost(deleteConfirm.post.id);
      setSuccess("Blog post deleted successfully!");
      setDeleteConfirm({ isOpen: false, post: null });
      await loadPosts();
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Blog Post Management
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Create and manage blog posts, articles, and content
          </p>
        </div>
        {!showForm && (
          <div className="flex gap-3">
            <button
              onClick={() => setShowUnpublished(!showUnpublished)}
              className={`px-4 py-2 rounded border transition-colors ${
                showUnpublished
                  ? "bg-gray-100 border-gray-300 text-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {showUnpublished ? "Hide Drafts" : "Show Drafts"}
            </button>
            <button
              onClick={handleCreate}
              disabled={categoriesLoading || categories.length === 0}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title={
                categories.length === 0
                  ? "Please create a blog category first"
                  : "Create new blog post"
              }
            >
              + Create Post
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
          Loading blog categories...
        </div>
      )}

      {!categoriesLoading && categories.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          No blog categories found. Please create a blog category first before
          adding posts.
        </div>
      )}

      {/* Form or Table */}
      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
          <BlogPostForm
            post={editingPost}
            categories={categories}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={formLoading}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <BlogPostTable
            posts={posts}
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
