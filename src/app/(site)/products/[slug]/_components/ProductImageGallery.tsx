'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { HiShoppingBag, HiZoomIn } from 'react-icons/hi';
import type { ProductResponseDto } from '@/types/product.types';

interface ProductImageGalleryProps {
  product: ProductResponseDto;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Use product image as main image, can be extended to support multiple images
  const images = product.imageUrl ? [product.imageUrl] : [];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!product.imageUrl) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  };

  if (!product.imageUrl) {
    return (
      <div 
        className="flex aspect-square w-full items-center justify-center rounded-lg border"
        style={{ 
          borderColor: 'var(--border-light)',
          backgroundColor: 'var(--bg-mint)',
        }}
      >
        <div className="text-center">
          <HiShoppingBag className="mx-auto h-12 w-12 mb-2 sm:h-16 sm:w-16" style={{ color: 'var(--text-light)' }} />
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-light)' }}>Chưa có hình ảnh</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div
        className="group relative aspect-square w-full overflow-hidden rounded-lg border bg-white shadow-sm"
        style={{ borderColor: 'var(--border-light)' }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{
            transform: isZoomed ? `scale(2)` : 'scale(1)',
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        
        {/* Zoom Indicator */}
        {isZoomed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div 
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-2"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            >
              <HiZoomIn className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--brand-green)' }} />
              <span className="text-xs font-medium sm:text-sm" style={{ color: 'var(--text-dark)' }}>
                Di chuột để zoom
              </span>
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <span 
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-md shadow-sm sm:px-2.5 sm:py-1 sm:text-xs"
            style={{
              backgroundColor: 'rgba(47, 191, 113, 0.95)',
              color: 'var(--text-inverse)',
            }}
          >
            {product.categoryName}
          </span>
        </div>
      </div>

      {/* Thumbnails (if multiple images) */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                selectedImage === index ? 'ring-2 ring-offset-2' : ''
              }`}
              style={{
                borderColor: selectedImage === index ? 'var(--brand-green)' : 'var(--border-light)',
                ringColor: 'var(--brand-green)',
              }}
              onMouseEnter={(e) => {
                if (selectedImage !== index) {
                  e.currentTarget.style.borderColor = 'var(--brand-green)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedImage !== index) {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                }
              }}
            >
              <Image
                src={image}
                alt={`${product.name} - ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 12.5vw, 25vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;

