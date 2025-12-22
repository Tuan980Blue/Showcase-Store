"use client";

import React, { useEffect } from "react";
import type {
  CreateProductDto,
  UpdateProductDto,
  ProductResponseDto,
} from "@/types/product.types";
import type { CategoryResponseDto } from "@/types/category.types";
import ImageUpload from "./ImageUpload";

interface ProductFormProps {
  product?: ProductResponseDto | null;
  categories: CategoryResponseDto[];
  onSubmit: (data: CreateProductDto | UpdateProductDto) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = React.useState<CreateProductDto>({
    name: "",
    description: "",
    price: 0,
    imageUrl: null,
    shopeeLink: null,
    tiktokLink: null,
    categoryId: 0,
    metaTitle: null,
    metaDescription: null,
  });

  const [isActive, setIsActive] = React.useState(true);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof CreateProductDto | "categoryId" | "price", string>>
  >({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        imageUrl: product.imageUrl || null,
        shopeeLink: product.shopeeLink || null,
        tiktokLink: product.tiktokLink || null,
        categoryId: product.categoryId || 0,
        metaTitle: product.metaTitle || null,
        metaDescription: product.metaDescription || null,
      });
      setIsActive(product.isActive);
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        imageUrl: null,
        shopeeLink: null,
        tiktokLink: null,
        categoryId: categories.length > 0 ? categories[0].id : 0,
        metaTitle: null,
        metaDescription: null,
      });
      setIsActive(true);
    }
    setErrors({});
  }, [product, categories]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "categoryId" ? Number(value) : value,
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
      imageUrl: url,
    }));
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
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
      const submitData: CreateProductDto | UpdateProductDto = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: formData.price,
        imageUrl: formData.imageUrl?.trim() || null,
        shopeeLink: formData.shopeeLink?.trim() || null,
        tiktokLink: formData.tiktokLink?.trim() || null,
        categoryId: formData.categoryId,
        metaTitle: formData.metaTitle?.trim() || null,
        metaDescription: formData.metaDescription?.trim() || null,
      };

      // Add isActive for updates
      if (product) {
        (submitData as UpdateProductDto).isActive = isActive;
      }

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
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name <span className="text-red-500">*</span>
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
              placeholder="Enter product name"
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
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
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price (VND) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="1000"
              className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter price"
              required
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          {product && (
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Active Product
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Inactive products won't be displayed on the website
              </p>
            </div>
          )}

          <div>
            <label
              htmlFor="shopeeLink"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Shopee Link
            </label>
            <input
              type="url"
              id="shopeeLink"
              name="shopeeLink"
              value={formData.shopeeLink || ""}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="https://shopee.vn/..."
            />
          </div>

          <div>
            <label
              htmlFor="tiktokLink"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              TikTok Link
            </label>
            <input
              type="url"
              id="tiktokLink"
              name="tiktokLink"
              value={formData.tiktokLink || ""}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="https://www.tiktok.com/..."
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <ImageUpload
            value={formData.imageUrl}
            onChange={handleImageChange}
            folder="products"
            disabled={loading}
          />

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter product description"
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="metaTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              SEO Title
            </label>
            <input
              type="text"
              id="metaTitle"
              name="metaTitle"
              value={formData.metaTitle || ""}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter SEO title"
            />
          </div>

          <div>
            <label
              htmlFor="metaDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              SEO Description
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              value={formData.metaDescription || ""}
              onChange={handleChange}
              rows={3}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter SEO description"
            />
          </div>
        </div>
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
            ? product
              ? "Updating..."
              : "Creating..."
            : product
            ? "Update Product"
            : "Create Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

