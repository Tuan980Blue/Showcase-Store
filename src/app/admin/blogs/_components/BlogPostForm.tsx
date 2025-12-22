"use client";

import React, { useEffect } from "react";
import type {
  CreateBlogPostDto,
  UpdateBlogPostDto,
  BlogPostResponseDto,
} from "@/types/blog.types";
import type { BlogCategoryResponseDto } from "@/types/blog.types";
import ImageUpload from "../../products/_components/ImageUpload";

interface BlogPostFormProps {
  post?: BlogPostResponseDto | null;
  categories: BlogCategoryResponseDto[];
  onSubmit: (data: CreateBlogPostDto | UpdateBlogPostDto) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({
  post,
  categories,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = React.useState<CreateBlogPostDto>({
    title: "",
    summary: "",
    content: "",
    posterUrl: null,
    youtubeUrl: null,
    categoryId: 0,
    isPublished: false,
  });

  const [errors, setErrors] = React.useState<
    Partial<Record<keyof CreateBlogPostDto | "categoryId", string>>
  >({});

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        summary: post.summary || "",
        content: post.content || "",
        posterUrl: post.posterUrl || null,
        youtubeUrl: post.youtubeUrl || null,
        categoryId: post.categoryId || 0,
        isPublished: post.isPublished || false,
      });
    } else {
      setFormData({
        title: "",
        summary: "",
        content: "",
        posterUrl: null,
        youtubeUrl: null,
        categoryId: categories.length > 0 ? categories[0].id : 0,
        isPublished: false,
      });
    }
    setErrors({});
  }, [post, categories]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "categoryId"
          ? Number(value)
          : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleImageChange = (url: string | null) => {
    setFormData((prev) => ({
      ...prev,
      posterUrl: url,
    }));
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Summary is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!formData.categoryId || formData.categoryId === 0) {
      newErrors.categoryId = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      // Convert empty strings to null for optional fields
      const submitData: CreateBlogPostDto | UpdateBlogPostDto = {
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        posterUrl: formData.posterUrl?.trim() || null,
        youtubeUrl: formData.youtubeUrl?.trim() || null,
        categoryId: formData.categoryId,
        isPublished: formData.isPublished,
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Post Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter blog post title"
              required
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${
                errors.categoryId ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value={0}>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={3}
              className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${
                errors.summary ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter a brief summary of the post"
              required
            />
            {errors.summary && (
              <p className="mt-1 text-sm text-red-600">{errors.summary}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              This will be displayed as a preview/excerpt
            </p>
          </div>

          <div>
            <label
              htmlFor="youtubeUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              YouTube URL
            </label>
            <input
              type="url"
              id="youtubeUrl"
              name="youtubeUrl"
              value={formData.youtubeUrl || ""}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="mt-1 text-xs text-gray-500">
              Optional: Add a YouTube video URL
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Publish immediately
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Unpublished posts are saved as drafts
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <ImageUpload
            value={formData.posterUrl}
            onChange={handleImageChange}
            folder="blog/posters"
            disabled={loading}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="border-t pt-6">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={15}
          className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 font-mono text-sm ${
            errors.content ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter the full blog post content (HTML/Markdown supported)"
          required
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          You can use HTML or Markdown formatting
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading
            ? post
              ? "Updating..."
              : "Creating..."
            : post
            ? "Update Post"
            : "Create Post"}
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;

