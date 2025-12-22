"use client";

import React from "react";
import Link from "next/link";

interface RecentItem {
  id: string | number;
  title: string;
  type: "product" | "blog" | "category" | "blog-category";
  date: string;
  status?: string;
  href: string;
}

interface RecentItemsProps {
  title: string;
  items: RecentItem[];
  loading?: boolean;
  emptyMessage?: string;
}

const RecentItems: React.FC<RecentItemsProps> = ({
  title,
  items,
  loading = false,
  emptyMessage = "No recent items",
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "product":
        return "bg-blue-100 text-blue-800";
      case "blog":
        return "bg-purple-100 text-purple-800";
      case "category":
        return "bg-green-100 text-green-800";
      case "blog-category":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">{emptyMessage}</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(
                      item.type
                    )}`}
                  >
                    {item.type.replace("-", " ")}
                  </span>
                  {item.status && (
                    <span className="text-xs text-gray-500">{item.status}</span>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(item.date)}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentItems;

