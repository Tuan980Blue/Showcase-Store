"use client";

import React from "react";
import type { BlogPostResponseDto } from "@/types/blog.types";

interface BlogPostTableProps {
  posts: BlogPostResponseDto[];
  onEdit: (post: BlogPostResponseDto) => void;
  onDelete: (post: BlogPostResponseDto) => void;
  onTogglePublish?: (post: BlogPostResponseDto) => void;
  loading?: boolean;
  showUnpublished?: boolean;
  onToggleShowUnpublished?: () => void;
}

const BlogPostTable: React.FC<BlogPostTableProps> = ({
  posts,
  onEdit,
  onDelete,
  onTogglePublish,
  loading = false,
  showUnpublished = false,
  onToggleShowUnpublished,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Loading blog posts...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No blog posts found. Create your first post!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {onToggleShowUnpublished && (
        <div className="flex justify-end">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={showUnpublished}
              onChange={onToggleShowUnpublished}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Show unpublished posts
          </label>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Poster
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Summary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Published
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((post) => (
              <tr
                key={post.id}
                className={`hover:bg-gray-50 ${
                  !post.isPublished ? "opacity-75" : ""
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {post.posterUrl ? (
                    <img
                      src={post.posterUrl}
                      alt={post.title}
                      className="h-20 w-32 object-cover rounded border border-gray-200"
                    />
                  ) : (
                    <div className="h-20 w-32 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                      <svg
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-xs">
                    {post.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{post.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {post.categoryName}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-md">
                    {truncateText(post.summary, 80)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.publishedAt ? formatDate(post.publishedAt) : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(post.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {onTogglePublish && (
                      <button
                        onClick={() => onTogglePublish(post)}
                        className={`px-3 py-1 rounded text-xs transition-colors ${
                          post.isPublished
                            ? "text-orange-600 hover:text-orange-900 hover:bg-orange-50"
                            : "text-green-600 hover:text-green-900 hover:bg-green-50"
                        }`}
                        title={post.isPublished ? "Unpublish" : "Publish"}
                      >
                        {post.isPublished ? "Unpublish" : "Publish"}
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(post)}
                      className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(post)}
                      className="text-red-600 hover:text-red-900 px-3 py-1 rounded hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogPostTable;

