import { useState, useEffect, useCallback } from "react";
import { blogPostService, blogCategoryService } from "@/service/services";
import type {
  BlogPostResponseDto,
  CreateBlogPostDto,
  UpdateBlogPostDto,
} from "@/types/blog.types";
import type { BlogCategoryResponseDto } from "@/types/blog.types";

interface UseBlogsReturn {
  posts: BlogPostResponseDto[];
  categories: BlogCategoryResponseDto[];
  loading: boolean;
  categoriesLoading: boolean;
  error: string | null;
  success: string | null;
  showUnpublished: boolean;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  setShowUnpublished: (show: boolean) => void;
  loadPosts: () => Promise<void>;
  loadCategories: () => Promise<void>;
  createPost: (data: CreateBlogPostDto) => Promise<void>;
  updatePost: (id: number, data: UpdateBlogPostDto) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

export const useBlogs = (): UseBlogsReturn => {
  const [posts, setPosts] = useState<BlogPostResponseDto[]>([]);
  const [categories, setCategories] = useState<BlogCategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showUnpublished, setShowUnpublished] = useState(false);

  const loadPosts = useCallback(async () => {
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
  }, [showUnpublished]);

  const loadCategories = useCallback(async () => {
    try {
      setCategoriesLoading(true);
      const data = await blogCategoryService.getAllCategories();
      setCategories(data);
    } catch (err: unknown) {
      console.error("Error loading blog categories:", err);
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  const createPost = useCallback(
    async (data: CreateBlogPostDto) => {
      await blogPostService.createPost(data);
      setSuccess("Blog post created successfully!");
      await loadPosts();
    },
    [loadPosts]
  );

  const updatePost = useCallback(
    async (id: number, data: UpdateBlogPostDto) => {
      await blogPostService.updatePost(id, data);
      setSuccess("Blog post updated successfully!");
      await loadPosts();
    },
    [loadPosts]
  );

  const deletePost = useCallback(
    async (id: number) => {
      await blogPostService.deletePost(id);
      setSuccess("Blog post deleted successfully!");
      await loadPosts();
    },
    [loadPosts]
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
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
    loadPosts,
    loadCategories,
    createPost,
    updatePost,
    deletePost,
  };
};

