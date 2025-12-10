'use client';

import React, { useState } from 'react';
import { cloudinaryService } from '@/service/services';
import type {
  CloudinaryUploadResultDto,
  CloudinaryTransformOptionsDto,
} from '@/types/cloudinary.types';
import { HiCloudUpload, HiLink, HiTrash, HiSparkles, HiCheckCircle, HiXCircle, HiPhotograph } from 'react-icons/hi';

const CloudinaryDemo = () => {
  const [uploadedImage, setUploadedImage] = useState<CloudinaryUploadResultDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [folder, setFolder] = useState('demo');
  const [transformOptions, setTransformOptions] = useState<CloudinaryTransformOptionsDto>({
    width: null,
    height: null,
    crop: null,
    quality: null,
    format: null,
  });
  const [transformedUrl, setTransformedUrl] = useState<string | null>(null);

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (error instanceof Error && error.message) return error.message;
    if (typeof error === 'string') return error;
    return fallback;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(null);
    setTransformedUrl(null);

    try {
      const result = await cloudinaryService.uploadImage(file, folder || null);
      setUploadedImage(result);
      setSuccess('Upload thành công!');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Lỗi khi upload ảnh'));
    } finally {
      setLoading(false);
    }
  };

  const handleUrlUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      setError('Vui lòng nhập URL ảnh');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    setTransformedUrl(null);

    try {
      const result = await cloudinaryService.uploadImageFromUrl(imageUrl, folder || null);
      setUploadedImage(result);
      setSuccess('Upload từ URL thành công!');
      setImageUrl('');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Lỗi khi upload ảnh từ URL'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!uploadedImage) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

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
  };

  const handleTransform = async () => {
    if (!uploadedImage) {
      setError('Vui lòng upload ảnh trước');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const options: CloudinaryTransformOptionsDto = {};
      if (transformOptions.width) options.width = transformOptions.width;
      if (transformOptions.height) options.height = transformOptions.height;
      if (transformOptions.crop) options.crop = transformOptions.crop;
      if (transformOptions.quality) options.quality = transformOptions.quality;
      if (transformOptions.format) options.format = transformOptions.format;

      const result = await cloudinaryService.transformImage(uploadedImage.publicId, options);
      setTransformedUrl(result.secureUrl);
      setSuccess('Transform ảnh thành công!');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Lỗi khi transform ảnh'));
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[var(--text-dark)] mb-2">
            Cloudinary API Demo
          </h1>
          <p className="text-[var(--text-medium)]">
            Demo các tính năng upload, transform và xóa ảnh với Cloudinary
          </p>
        </div>

        {/* Messages */}
        {(error || success) && (
          <div className="mb-6 p-4 rounded-lg flex items-center justify-between"
            style={{
              backgroundColor: error ? '#fee' : '#efe',
              border: `1px solid ${error ? 'var(--state-error)' : 'var(--state-success)'}`,
            }}
          >
            <div className="flex items-center gap-2">
              {error ? (
                <HiXCircle className="text-[var(--state-error)] text-xl" />
              ) : (
                <HiCheckCircle className="text-[var(--state-success)] text-xl" />
              )}
              <span className={error ? 'text-[var(--state-error)]' : 'text-[var(--state-success)]'}>
                {error || success}
              </span>
            </div>
            <button
              onClick={clearMessages}
              className="text-[var(--text-light)] hover:text-[var(--text-dark)]"
            >
              <HiXCircle className="text-xl" />
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
              <HiCloudUpload className="text-[var(--brand-green)]" />
              Upload Ảnh
            </h2>

            {/* Folder Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                Thư mục (Folder)
              </label>
              <input
                type="text"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                placeholder="demo"
                className="w-full px-4 py-2 border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
              />
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                Upload từ File
              </label>
              <div className="border-2 border-dashed border-[var(--border-light)] rounded-lg p-6 text-center hover:border-[var(--brand-green)] transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={loading}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <HiPhotograph className="text-4xl text-[var(--text-light)]" />
                  <span className="text-[var(--text-medium)]">
                    Click để chọn ảnh hoặc kéo thả vào đây
                  </span>
                  <span className="text-sm text-[var(--text-light)]">
                    Hỗ trợ: JPG, PNG, GIF, WEBP
                  </span>
                </label>
              </div>
            </div>

            {/* URL Upload */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                Upload từ URL
              </label>
              <form onSubmit={handleUrlUpload} className="flex gap-2">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  disabled={loading}
                  className="flex-1 px-4 py-2 border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
                />
                <button
                  type="submit"
                  disabled={loading || !imageUrl.trim()}
                  className="px-6 py-2 bg-[var(--brand-green)] text-white rounded-lg hover:bg-[var(--btn-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  <HiLink />
                  Upload
                </button>
              </form>
            </div>
          </div>

          {/* Transform Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
              <HiSparkles className="text-[var(--brand-green)]" />
              Transform Ảnh
            </h2>

            {uploadedImage ? (
              <>
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      value={transformOptions.width || ''}
                      onChange={(e) =>
                        setTransformOptions({
                          ...transformOptions,
                          width: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                      placeholder="800"
                      className="w-full px-4 py-2 border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      value={transformOptions.height || ''}
                      onChange={(e) =>
                        setTransformOptions({
                          ...transformOptions,
                          height: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                      placeholder="600"
                      className="w-full px-4 py-2 border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Crop
                    </label>
                    <select
                      value={transformOptions.crop || ''}
                      onChange={(e) =>
                        setTransformOptions({
                          ...transformOptions,
                          crop: e.target.value || null,
                        })
                      }
                      className="w-full px-4 py-2 border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
                    >
                      <option value="">None</option>
                      <option value="fill">Fill</option>
                      <option value="fit">Fit</option>
                      <option value="scale">Scale</option>
                      <option value="thumb">Thumb</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Quality (1-100)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={transformOptions.quality || ''}
                      onChange={(e) =>
                        setTransformOptions({
                          ...transformOptions,
                          quality: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                      placeholder="80"
                      className="w-full px-4 py-2 border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Format
                    </label>
                    <select
                      value={transformOptions.format || ''}
                      onChange={(e) =>
                        setTransformOptions({
                          ...transformOptions,
                          format: e.target.value || null,
                        })
                      }
                      className="w-full px-4 py-2 border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
                    >
                      <option value="">Original</option>
                      <option value="jpg">JPG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WebP</option>
                      <option value="gif">GIF</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleTransform}
                  disabled={loading}
                  className="w-full px-6 py-2 bg-[var(--brand-green)] text-white rounded-lg hover:bg-[var(--btn-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                >
                  <HiSparkles />
                  Transform Ảnh
                </button>
              </>
            ) : (
              <div className="text-center py-8 text-[var(--text-light)]">
                Vui lòng upload ảnh trước để sử dụng tính năng transform
              </div>
            )}
          </div>
        </div>

        {/* Image Display Section */}
        {uploadedImage && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-[var(--text-dark)] flex items-center gap-2">
                <HiPhotograph className="text-[var(--brand-green)]" />
                Ảnh Đã Upload
              </h2>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-[var(--state-error)] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-opacity"
              >
                <HiTrash />
                Xóa Ảnh
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Original Image */}
              <div>
                <h3 className="text-lg font-medium text-[var(--text-dark)] mb-2">Ảnh Gốc</h3>
                <div className="border border-[var(--border-light)] rounded-lg overflow-hidden">
                  <img
                    src={uploadedImage.secureUrl}
                    alt="Uploaded"
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-2 text-sm text-[var(--text-medium)] space-y-1">
                  <p><strong>Public ID:</strong> {uploadedImage.publicId}</p>
                  <p><strong>Kích thước:</strong> {uploadedImage.width} x {uploadedImage.height}px</p>
                  <p><strong>Định dạng:</strong> {uploadedImage.format}</p>
                  <p><strong>Dung lượng:</strong> {(uploadedImage.bytes / 1024).toFixed(2)} KB</p>
                </div>
              </div>

              {/* Transformed Image */}
              <div>
                <h3 className="text-lg font-medium text-[var(--text-dark)] mb-2">Ảnh Đã Transform</h3>
                {transformedUrl ? (
                  <>
                    <div className="border border-[var(--border-light)] rounded-lg overflow-hidden">
                      <img
                        src={transformedUrl}
                        alt="Transformed"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="mt-2">
                      <a
                        href={transformedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--brand-green)] hover:underline"
                      >
                        Mở ảnh trong tab mới
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="border border-[var(--border-light)] rounded-lg p-8 text-center text-[var(--text-light)]">
                    Chưa có ảnh transform. Sử dụng form bên trên để transform ảnh.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--brand-green)]"></div>
              <p className="text-[var(--text-dark)]">Đang xử lý...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CloudinaryDemo;
