'use client';

import React from 'react';
import Link from 'next/link';

const valueItems = [
    {
        title: 'Tư vấn kỹ thuật tận tâm',
        description:
            'Đội ngũ có kinh nghiệm lâu năm trong ngành điện tử hỗ trợ từ lựa chọn đến lắp đặt.',
    },
    {
        title: 'Sản phẩm chính hãng, rõ nguồn gốc',
        description:
            'Lựa chọn kỹ lưỡng, thông tin minh bạch, bảo hành theo đúng chính sách nhà cung cấp.',
    },
    {
        title: 'Hỗ trợ online qua Zalo / Tiktok',
        description:
            'Giải đáp nhanh chóng, gửi hình ảnh/video thực tế sản phẩm trước khi đặt mua.',
    },
];

const highlightStats = [
    {
        label: 'Năm kinh nghiệm',
        value: '10+',
    },
    {
        label: 'Dự án & khách hàng',
        value: '500+',
    },
    {
        label: 'Mức độ hài lòng',
        value: '4.9/5',
    },
];

const ValuePropsSection: React.FC = () => {
    return (
        <section className="bg-[var(--bg-mint)]/60 border-t border-[var(--border-light)] py-10 sm:py-12">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-2 sm:gap-3 max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-light)] bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-light)]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
                            Vì sao khách hàng chọn Showcase Store
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-dark)]">
                            Giải pháp đáng tin cậy cho thiết bị điện tử & trưng bày
                        </h2>
                        <p className="max-w-3xl text-sm sm:text-base text-[var(--text-medium)] leading-relaxed">
                            Từ tư vấn, lựa chọn linh kiện đến lắp đặt và hậu mãi, chúng tôi đồng
                            hành cùng bạn trong suốt vòng đời sản phẩm để tối ưu chi phí và hiệu
                            quả vận hành.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                        <div className="flex flex-wrap gap-3 text-xs text-[var(--text-light)]">
                            <span className="rounded-full bg-white/80 px-3 py-1 border border-[var(--border-light)]">
                                Tư vấn 1-1
                            </span>
                            <span className="rounded-full bg-white/80 px-3 py-1 border border-[var(--border-light)]">
                                Hỗ trợ từ xa nhanh
                            </span>
                            <span className="rounded-full bg-white/80 px-3 py-1 border border-[var(--border-light)]">
                                Bảo hành rõ ràng
                            </span>
                        </div>

                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-dark)] bg-[var(--brand-navy)] px-4 py-2 text-sm font-medium text-[var(--text-inverse)] shadow-sm transition-all duration-200 hover:border-[var(--brand-green)] hover:bg-[var(--brand-green)] hover:shadow-md"
                        >
                            Tìm hiểu thêm về chúng tôi
                            <span className="text-xs">↗</span>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-3">
                    {valueItems.map((item, index) => (
                        <div
                            key={item.title}
                            className="group relative overflow-hidden rounded-2xl border border-[var(--border-light)] bg-white/90 p-5 sm:p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-navy)]/90 text-sm font-semibold text-[var(--text-inverse)] transition-colors duration-200 group-hover:bg-[var(--brand-green)]">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <h3 className="text-lg font-semibold text-[var(--text-dark)]">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-[var(--text-medium)] leading-relaxed">{item.description}</p>
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[var(--brand-green)]/30 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>

                <div className="mt-8 grid gap-4 rounded-2xl border border-dashed border-[var(--border-light)] bg-white/70 p-4 sm:p-5 md:grid-cols-3">
                    {highlightStats.map((stat) => (
                        <div key={stat.label} className="flex items-baseline gap-3">
                            <div className="text-2xl sm:text-3xl font-semibold text-[var(--brand-green)]">
                                {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm text-[var(--text-medium)] uppercase tracking-[0.16em]">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValuePropsSection;


