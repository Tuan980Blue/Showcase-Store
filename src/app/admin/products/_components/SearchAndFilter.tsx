"use client";

import React, { useState, useEffect } from "react";
import type { CategoryResponseDto } from "@/types/category.types";

interface SearchAndFilterProps {
  searchQuery: string;
  selectedCategory: string;
  priceRange: { min: number | ""; max: number | "" };
  sortBy: string;
  sortOrder: "asc" | "desc";
  showInactive: boolean;
  categories: CategoryResponseDto[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onPriceRangeChange: (range: { min: number | ""; max: number | "" }) => void;
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
  onToggleInactive: () => void;
  onClearFilters: () => void;
  resultCount: number;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  selectedCategory,
  priceRange,
  sortBy,
  sortOrder,
  showInactive,
  categories,
  onSearchChange,
  onCategoryChange,
  onPriceRangeChange,
  onSortChange,
  onToggleInactive,
  onClearFilters,
  resultCount,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "all" ||
    priceRange.min !== "" ||
    priceRange.max !== "" ||
    sortBy !== "name";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products by name or slug..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-4 py-2.5 rounded-lg border transition-all flex items-center gap-2 ${
              showAdvancedFilters || hasActiveFilters
                ? "bg-blue-50 border-blue-300 text-blue-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                {([
                  searchQuery && 1,
                  selectedCategory !== "all" && 1,
                  (priceRange.min !== "" || priceRange.max !== "") && 1,
                  sortBy !== "name" && 1,
                ]
                  .filter(Boolean) as number[])
                  .reduce((a, b) => a + b, 0)}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range - Min */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Min Price (VND)
              </label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  onPriceRangeChange({
                    ...priceRange,
                    min: e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
                placeholder="0"
                min="0"
                step="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Price Range - Max */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Max Price (VND)
              </label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  onPriceRangeChange({
                    ...priceRange,
                    max: e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
                placeholder="No limit"
                min="0"
                step="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Sort By
              </label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value, sortOrder)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="category">Category</option>
                </select>
                <button
                  onClick={() =>
                    onSortChange(sortBy, sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
                >
                  {sortOrder === "asc" ? (
                    <svg
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showInactive}
                onChange={onToggleInactive}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Show inactive products
              </span>
            </label>

            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{resultCount}</span>{" "}
              product{resultCount !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>
      )}

      {/* Quick Filter Tags */}
      {hasActiveFilters && !showAdvancedFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Search: "{searchQuery}"
              <button
                onClick={() => onSearchChange("")}
                className="hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {selectedCategory !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Category:{" "}
              {categories.find((c) => c.id.toString() === selectedCategory)
                ?.name || selectedCategory}
              <button
                onClick={() => onCategoryChange("all")}
                className="hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {(priceRange.min !== "" || priceRange.max !== "") && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Price:{" "}
              {priceRange.min !== ""
                ? formatPrice(priceRange.min as number)
                : "0"}
              {" - "}
              {priceRange.max !== ""
                ? formatPrice(priceRange.max as number)
                : "∞"}
              <button
                onClick={() => onPriceRangeChange({ min: "", max: "" })}
                className="hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {sortBy !== "name" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Sort: {sortBy} ({sortOrder})
              <button
                onClick={() => onSortChange("name", "asc")}
                className="hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;

