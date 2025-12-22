'use client';

import React, { useEffect, useState } from 'react';
import type { ProductListItemDto } from '@/types/product.types';
import Image from "next/image";

interface HeroSectionProps {
  products: ProductListItemDto[];
  loading: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ products, loading }) => {
  const featured = products.slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);

  const canSlide = !loading && featured.length > 0;
  const goTo = (nextIndex: number) => {
    if (!featured.length) return;
    const len = featured.length;
    setActiveIndex(((nextIndex % len) + len) % len);
  };

  useEffect(() => {
    if (!canSlide) return;
    const timer = setInterval(() => {
      goTo(activeIndex + 1);
    }, 3800);
    return () => clearInterval(timer);
  }, [activeIndex, canSlide]);

  return (
    <section
      aria-label="Sản phẩm nổi bật"
      className="relative overflow-hidden rounded-2xl border bg-white/80 px-4 py-4 shadow-sm backdrop-blur-sm sm:px-6 sm:py-5"
      style={{ borderColor: 'var(--border-light)' }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_55%)]" />

      <div className="grid items-stretch gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2.4fr)]">
        {/* Left: brand highlight / small info */}
        <div className="flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-mint)]/80 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[var(--brand-navy)] sm:text-[11px]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
              Điện Tử Tuấn Anh · Sản phẩm tuyển chọn
            </p>
            <h1 className="text-base font-semibold tracking-tight text-[var(--text-dark)] sm:text-lg md:text-xl">
              Khám phá những mẫu nổi bật được khách hàng yêu thích nhất
            </h1>
            <p className="max-w-md text-[11px] leading-relaxed text-[var(--text-light)] sm:text-xs md:text-[13px]">
              Bộ sưu tập được cập nhật liên tục với các sản phẩm phù hợp nhiều ngành hàng,
              giúp bạn lựa chọn online một cách chuyên nghiệp và nhanh chóng.
            </p>
          </div>

          {/* Trust / info strip */}
          <div className="grid grid-cols-2 gap-2 text-[10px] sm:grid-cols-3 sm:text-[11px]">
            <div className="flex items-start gap-2 rounded-xl bg-[var(--bg-mint)]/60 px-2 py-1.5">
              <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-white text-[10px] font-bold text-[var(--brand-green)] shadow-sm sm:h-6 sm:w-6 sm:text-[11px]">
                <div className="flex h-full w-full items-center justify-center">New</div>
              </div>
              <div className="space-y-0.5">
                <p className="font-semibold text-[var(--text-dark)]">Mẫu mới mỗi tuần</p>
                <p className="text-[9px] text-[var(--text-light)] sm:text-[10px]">
                  Sản phẩm được cập nhật liên tục theo xu hướng.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-xl bg-[var(--bg-mint)]/40 px-2 py-1.5">
              <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-white text-[10px] font-bold text-[var(--brand-navy)] shadow-sm sm:h-6 sm:w-6 sm:text-[11px]">
                <div className="flex h-full w-full items-center justify-center">24/7</div>
              </div>
              <div className="space-y-0.5">
                <p className="font-semibold text-[var(--text-dark)]">Tư vấn tận tâm</p>
                <p className="text-[9px] text-[var(--text-light)] sm:text-[10px]">
                  Hỗ trợ chọn mẫu qua Zalo, TikTok, Shopee.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-xl bg-white/80 px-2 py-1.5 shadow-sm">
              <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[var(--brand-green)] text-[10px] font-bold text-white sm:h-6 sm:w-6 sm:text-[11px]">
                <div className="flex h-full w-full items-center justify-center">%</div>
              </div>
              <div className="space-y-0.5">
                <p className="font-semibold text-[var(--text-dark)]">Giá tốt linh hoạt</p>
                <p className="text-[9px] text-[var(--text-light)] sm:text-[10px]">
                  Ưu đãi theo combo &amp; chiến dịch bán hàng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: featured product slider */}
        <div className="flex items-stretch">
          <div className="flex w-full flex-col rounded-2xl border bg-white/95 p-3 shadow-sm sm:p-4 md:p-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-navy)] sm:text-sm">
                  Sản phẩm mới ra
                </h2>
                <p className="text-[10px] text-[var(--text-light)] sm:text-xs">
                  Gợi ý mẫu phù hợp cho sự lựa chọn của bạn.
                </p>
              </div>
              {featured.length > 0 && (
                <span className="shrink-0 rounded-full bg-[var(--bg-mint)]/60 px-2 py-1 text-[10px] font-medium text-[var(--brand-navy)] sm:text-xs">
                  {activeIndex + 1}/{featured.length}
                </span>
              )}
            </div>

            {loading && (
              <div className="flex flex-1 flex-col justify-center gap-3 text-xs text-[var(--text-light)] sm:text-sm">
                <div className="h-32 w-full animate-pulse rounded-xl bg-[var(--bg-mint)]/40 sm:h-36 md:h-40" />
                <p>Đang tải sản phẩm...</p>
              </div>
            )}

            {!loading && featured.length === 0 && (
              <div className="flex flex-1 flex-col justify-center text-xs text-[var(--text-light)] sm:text-sm">
                <p>Sản phẩm sẽ được cập nhật trong thời gian tới.</p>
              </div>
            )}

            {canSlide && (
              <div className="flex flex-1 flex-col justify-between space-y-3">
                <div className="flex gap-3 sm:gap-4">
                  <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl bg-[var(--bg-mint)] sm:w-32 md:w-36">
                    {/* Platform badge */}
                    {(featured[activeIndex].shopeeLink || featured[activeIndex].tikTokLink) && (
                      <div className="absolute left-1 top-1 z-10 flex items-center gap-1 rounded-full bg-black/55 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm sm:left-1.5 sm:top-1.5 sm:text-[10px]">
                        {featured[activeIndex].shopeeLink && (
                          <span className="inline-flex items-center gap-0.5">
                            <span className="h-3 w-3 rounded-[4px] bg-white">
                              <Image
                                src="/shopee.png"
                                alt="Shopee"
                                width={12}
                                height={12}
                                className="h-full w-full object-contain"
                              />
                            </span>
                            <span className="hidden sm:inline">Shopee</span>
                          </span>
                        )}
                        {featured[activeIndex].tikTokLink && (
                          <span className="inline-flex items-center gap-0.5">
                            <span className="h-3 w-3 rounded-[4px] bg-white">
                              <Image
                                src="/tiktok.png"
                                alt="TikTok"
                                width={12}
                                height={12}
                                className="h-full w-full object-contain"
                              />
                            </span>
                            <span className="hidden sm:inline">TikTok</span>
                          </span>
                        )}
                      </div>
                    )}

                    {featured[activeIndex].imageUrl ? (
                      <Image
                        src={featured[activeIndex].imageUrl}
                        alt={featured[activeIndex].name}
                        fill
                        sizes="(min-width:768px) 180px, 140px"
                        className="object-cover"
                        priority={false}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[11px] text-[var(--text-light)] sm:text-xs">
                        Chưa có hình ảnh
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="line-clamp-2 text-sm font-semibold text-[var(--text-dark)] sm:text-base">
                      {featured[activeIndex].name}
                    </p>
                    <p className="text-[11px] text-[var(--text-light)] sm:text-xs">
                      {featured[activeIndex].categoryName}
                    </p>
                    <p className="text-sm font-bold text-[var(--brand-green)] sm:text-base">
                      {featured[activeIndex].price?.toLocaleString('vi-VN')}₫
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-[var(--bg-mint)]/70 px-2 py-0.5 text-[9px] font-medium text-[var(--brand-navy)] sm:text-[10px]">
                        Thiết kế bắt mắt
                      </span>
                      <span className="rounded-full bg-[var(--bg-mint)]/40 px-2 py-0.5 text-[9px] text-[var(--text-light)] sm:text-[10px]">
                        Phù hợp nhiều ngành hàng
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {featured[activeIndex].shopeeLink && (
                        <a
                          href={featured[activeIndex].shopeeLink!}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-[#ee4d2d] px-2.5 py-1 text-[9px] font-medium text-white shadow-sm hover:bg-[#d63f22] sm:text-[10px]"
                        >
                          <Image
                            src="/shopee.png"
                            alt="Mua trên Shopee"
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                          />
                          <span className="hidden sm:inline">Shopee</span>
                        </a>
                      )}
                      {featured[activeIndex].tikTokLink && (
                        <a
                          href={featured[activeIndex].tikTokLink!}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-black px-2.5 py-1 text-[9px] font-medium text-white shadow-sm hover:bg-[#111111] sm:text-[10px]"
                        >
                          <Image
                            src="/tiktok.png"
                            alt="Xem trên TikTok"
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                          />
                          <span className="hidden sm:inline">TikTok</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-1.5">
                    {featured.map((product, idx) => (
                      <button
                        key={product.id}
                        onClick={() => goTo(idx)}
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          idx === activeIndex
                            ? 'bg-[var(--brand-green)] scale-110'
                            : 'bg-[var(--border-light)] hover:bg-[var(--brand-green)]/70'
                        }`}
                        aria-label={`Xem sản phẩm ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => goTo(activeIndex - 1)}
                      className="rounded-full border px-2 py-1 text-xs font-semibold text-[var(--brand-navy)] transition hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] sm:px-3"
                      style={{ borderColor: 'var(--border-light)' }}
                      aria-label="Sản phẩm trước"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => goTo(activeIndex + 1)}
                      className="rounded-full border px-2 py-1 text-xs font-semibold text-[var(--brand-navy)] transition hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] sm:px-3"
                      style={{ borderColor: 'var(--border-light)' }}
                      aria-label="Sản phẩm tiếp theo"
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


