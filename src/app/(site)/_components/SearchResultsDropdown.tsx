"use client";

import Link from "next/link";
import Image from "next/image";
import type { ProductListItemDto } from "@/types/product.types";

interface SearchResultsDropdownProps {
    results: ProductListItemDto[];
    loading: boolean;
    error: string | null;
    query: string;
    onClose: () => void;
}

/**
 * SearchResultsDropdown Component
 * Displays search results in a dropdown below the search bar
 */
const SearchResultsDropdown = ({
    results,
    loading,
    error,
    query,
    onClose,
}: SearchResultsDropdownProps) => {
    const trimmedQuery = query.trim();

    if (loading) {
        return (
            <div
                className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-xl z-50 max-h-96 overflow-auto"
                style={{ borderColor: "var(--border-light)" }}
            >
                <div className="px-4 py-8 text-center">
                    <p className="text-sm" style={{ color: "var(--text-medium)" }}>
                        Đang tìm kiếm...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-xl z-50"
                style={{ borderColor: "var(--border-light)" }}
            >
                <div className="px-4 py-4">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!loading && !error && trimmedQuery && results.length === 0) {
        return (
            <div
                className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-xl z-50"
                style={{ borderColor: "var(--border-light)" }}
            >
                <div className="px-4 py-4">
                    <p className="text-sm" style={{ color: "var(--text-medium)" }}>
                        Không tìm thấy sản phẩm phù hợp.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-xl z-50 max-h-96 overflow-auto"
            style={{ borderColor: "var(--border-light)" }}
        >
            <div className="px-3 py-2 border-b text-xs font-semibold uppercase tracking-wide"
                 style={{ borderColor: "var(--border-light)", color: "var(--text-medium)" }}>
                Kết quả tìm kiếm ({results.length})
            </div>
            <ul className="divide-y" style={{ borderColor: "var(--border-light)" }}>
                {results.map((product) => (
                    <li key={product.id}>
                        <Link
                            href={`/products/${product.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                        >
                            {/* Product Image */}
                            <div className="flex-shrink-0 w-16 h-16 relative bg-slate-100 rounded overflow-hidden">
                                {product.imageUrl ? (
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            style={{ color: "var(--text-light)" }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                                <h3
                                    className="text-sm font-medium truncate"
                                    style={{ color: "var(--text-dark)" }}
                                >
                                    {product.name}
                                </h3>
                                <p
                                    className="text-xs mt-1 truncate"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    {product.categoryName}
                                </p>
                                <p
                                    className="text-sm font-semibold mt-1"
                                    style={{ color: "var(--brand-navy)" }}
                                >
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(product.price)}
                                </p>
                            </div>

                            {/* Arrow Icon */}
                            <svg
                                className="flex-shrink-0 w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                style={{ color: "var(--text-light)" }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResultsDropdown;

