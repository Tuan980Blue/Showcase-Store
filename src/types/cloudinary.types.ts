// Cloudinary Types - Matching Backend DTOs

export interface CloudinaryUploadResultDto {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  resourceType: string;
}

export interface CloudinaryTransformOptionsDto {
  width?: number | null;
  height?: number | null;
  crop?: string | null;
  gravity?: string | null;
  quality?: number | null;
  format?: string | null;
  effect?: string | null;
}

export interface CloudinaryUploadFromUrlDto {
  imageUrl: string;
  folder?: string | null;
}

export interface CloudinaryDeleteResponseDto {
  message: string;
  publicId: string;
}

