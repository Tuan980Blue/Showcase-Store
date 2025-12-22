"use client";

import React from "react";
import type { CategoryResponseDto } from "@/types/category.types";
import CategoryForm from "./CategoryForm";
import type {
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/category.types";

interface CategoryFormWrapperProps {
  editingCategory: CategoryResponseDto | null;
  onSubmit: (data: CreateCategoryDto | UpdateCategoryDto) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const CategoryFormWrapper: React.FC<CategoryFormWrapperProps> = ({
  editingCategory,
  onSubmit,
  onCancel,
  loading,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div
          className={`p-2 rounded-lg ${
            editingCategory ? "bg-blue-100" : "bg-green-100"
          }`}
        >
          {editingCategory ? (
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {editingCategory ? "Edit Category" : "Create New Category"}
        </h2>
      </div>
      <CategoryForm
        category={editingCategory}
        onSubmit={onSubmit}
        onCancel={onCancel}
        loading={loading}
      />
    </div>
  );
};

export default CategoryFormWrapper;

