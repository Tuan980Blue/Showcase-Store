"use client";

import React, { useEffect } from "react";
import type { CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto } from "@/types/category.types";

interface CategoryFormProps {
  category?: CategoryResponseDto | null;
  onSubmit: (data: CreateCategoryDto | UpdateCategoryDto) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = React.useState<CreateCategoryDto>({
    name: "",
    description: "",
    seoTitle: "",
    seoDescription: "",
  });
  const [errors, setErrors] = React.useState<Partial<Record<keyof CreateCategoryDto, string>>>({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        seoTitle: category.seoTitle || "",
        seoDescription: category.seoDescription || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        seoTitle: "",
        seoDescription: "",
      });
    }
    setErrors({});
  }, [category]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof CreateCategoryDto]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateCategoryDto, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
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
      const submitData: CreateCategoryDto | UpdateCategoryDto = {
        name: formData.name.trim(),
        description: formData.description?.trim() || null,
        seoTitle: formData.seoTitle?.trim() || null,
        seoDescription: formData.seoDescription?.trim() || null,
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter category name"
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={3}
          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter category description"
        />
      </div>

      <div>
        <label
          htmlFor="seoTitle"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          SEO Title
        </label>
        <input
          type="text"
          id="seoTitle"
          name="seoTitle"
          value={formData.seoTitle || ""}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter SEO title"
        />
      </div>

      <div>
        <label
          htmlFor="seoDescription"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          SEO Description
        </label>
        <textarea
          id="seoDescription"
          name="seoDescription"
          value={formData.seoDescription || ""}
          onChange={handleChange}
          rows={2}
          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter SEO description"
        />
      </div>

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
            ? category
              ? "Updating..."
              : "Creating..."
            : category
            ? "Update Category"
            : "Create Category"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;

