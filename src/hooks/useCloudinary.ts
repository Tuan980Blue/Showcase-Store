'use client';

import { useCallback, useState } from 'react';
import { cloudinaryService } from '@/service/services';
import type {
  CloudinaryTransformOptionsDto,
  CloudinaryUploadResultDto,
} from '@/types';

const createInitialTransformOptions = (): CloudinaryTransformOptionsDto => ({
  width: null,
  height: null,
  crop: null,
  gravity: null,
  quality: null,
  format: null,
  effect: null,
});

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === 'string') return error;
  return fallback;
};

export const useCloudinary = (defaultFolder = 'demo') => {
  const [uploadedImage, setUploadedImage] =
    useState<CloudinaryUploadResultDto | null>(null);
  const [transformedUrl, setTransformedUrl] = useState<string | null>(null);
  const [transformOptions, setTransformOptions] =
    useState<CloudinaryTransformOptionsDto>(createInitialTransformOptions);
  const [folder, setFolder] = useState<string>(defaultFolder);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const uploadFile = useCallback(
    async (file: File | null | undefined, targetFolder?: string | null) => {
      if (!file) return;

      setLoading(true);
      clearMessages();
      setTransformedUrl(null);

      try {
        const result = await cloudinaryService.uploadImage(
          file,
          targetFolder ?? folder ?? null
        );
        setUploadedImage(result);
        setSuccess('Upload thành công!');
      } catch (err: unknown) {
        setError(getErrorMessage(err, 'Lỗi khi upload ảnh'));
      } finally {
        setLoading(false);
      }
    },
    [clearMessages, folder]
  );

  const uploadFromUrl = useCallback(
    async (url: string, targetFolder?: string | null) => {
      if (!url.trim()) {
        setError('Vui lòng nhập URL ảnh');
        return;
      }

      setLoading(true);
      clearMessages();
      setTransformedUrl(null);

      try {
        const result = await cloudinaryService.uploadImageFromUrl(
          url,
          targetFolder ?? folder ?? null
        );
        setUploadedImage(result);
        setSuccess('Upload từ URL thành công!');
        setImageUrl('');
      } catch (err: unknown) {
        setError(getErrorMessage(err, 'Lỗi khi upload ảnh từ URL'));
      } finally {
        setLoading(false);
      }
    },
    [clearMessages, folder]
  );

  const deleteImage = useCallback(async () => {
    if (!uploadedImage) return;

    setLoading(true);
    clearMessages();

    try {
      await cloudinaryService.deleteImage(uploadedImage.publicId);
      setUploadedImage(null);
      setTransformedUrl(null);
      setSuccess('Xóa ảnh thành công!');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Lỗi khi xóa ảnh'));
    } finally {
      setLoading(false);
    }
  }, [clearMessages, uploadedImage]);

  const transformImage = useCallback(async () => {
    if (!uploadedImage) {
      setError('Vui lòng upload ảnh trước');
      return;
    }

    setLoading(true);
    clearMessages();

    try {
      const result = await cloudinaryService.transformImage(
        uploadedImage.publicId,
        transformOptions
      );
      setTransformedUrl(result.secureUrl);
      setSuccess('Transform ảnh thành công!');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Lỗi khi transform ảnh'));
    } finally {
      setLoading(false);
    }
  }, [clearMessages, transformOptions, uploadedImage]);

  const resetTransformOptions = useCallback(() => {
    setTransformOptions(createInitialTransformOptions());
  }, []);

  return {
    state: {
      uploadedImage,
      transformedUrl,
      transformOptions,
      folder,
      imageUrl,
      loading,
      error,
      success,
    },
    actions: {
      setFolder,
      setImageUrl,
      setTransformOptions,
      resetTransformOptions,
      clearMessages,
      uploadFile,
      uploadFromUrl,
      deleteImage,
      transformImage,
    },
  };
};
