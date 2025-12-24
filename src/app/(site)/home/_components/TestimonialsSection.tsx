'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company?: string;
    content: string;
    rating: number;
    avatar?: string;
}

const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Nguyễn Văn A',
        role: 'Chủ cửa hàng điện tử',
        company: 'TechStore HCM',
        content: 'Điện Tử Tuấn Anh đã hỗ trợ tôi lựa chọn và lắp đặt hệ thống trưng bày hoàn chỉnh. Sản phẩm chất lượng, giá cả hợp lý và dịch vụ tư vấn rất chuyên nghiệp.',
        rating: 5,
    },
    {
        id: '2',
        name: 'Trần Thị B',
        role: 'Quản lý cửa hàng',
        content: 'Từ khi hợp tác với Điện Tử Tuấn Anh, cửa hàng của tôi đã có hệ thống trưng bày hiện đại, thu hút khách hàng hơn. Đội ngũ hỗ trợ nhiệt tình, phản hồi nhanh chóng.',
        rating: 5,
    },
    {
        id: '3',
        name: 'Lê Văn C',
        role: 'Doanh nhân',
        company: 'Retail Solutions',
        content: 'Hơn 10 năm kinh nghiệm của họ thực sự thể hiện qua từng sản phẩm và dịch vụ. Tôi rất hài lòng với chất lượng và cam kết của họ.',
        rating: 5,
    },
    {
        id: '4',
        name: 'Phạm Thị D',
        role: 'Chủ dự án',
        content: 'Sản phẩm chính hãng, bảo hành rõ ràng. Đặc biệt là dịch vụ tư vấn online qua Zalo rất tiện lợi, giúp tôi tiết kiệm thời gian và chi phí.',
        rating: 5,
    },
];

const TestimonialsSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const goToSlide = (index: number) => {
        setActiveIndex(index);
    };

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Auto-rotate testimonials
    React.useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <span
                key={i}
                className={`text-lg ${
                    i < rating
                        ? 'text-yellow-400'
                        : 'text-[var(--border-light)]'
                }`}
            >
                ★
            </span>
        ));
    };

    return (
        <section className="border-t border-[var(--border-light)] bg-gradient-to-b from-white to-[var(--bg-mint)]/30 py-12 sm:py-16">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-light)] bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-light)] mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
                        Phản hồi từ khách hàng
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--text-dark)] mb-3">
                        Khách hàng nói gì về chúng tôi
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm sm:text-base text-[var(--text-medium)] leading-relaxed">
                        Hơn 500+ khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng tôi
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Testimonial Cards */}
                    <div className="relative overflow-hidden rounded-2xl">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${activeIndex * 100}%)`,
                            }}
                        >
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="min-w-full px-4 sm:px-6"
                                >
                                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-[var(--border-light)] p-6 sm:p-8 shadow-lg">
                                        <div className="flex items-center gap-1 mb-4">
                                            {renderStars(testimonial.rating)}
                                        </div>
                                        <blockquote className="text-base sm:text-lg text-[var(--text-dark)] leading-relaxed mb-6 italic">
                                            "{testimonial.content}"
                                        </blockquote>
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-navy)] flex items-center justify-center text-white font-semibold text-lg">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[var(--text-dark)]">
                                                    {testimonial.name}
                                                </p>
                                                <p className="text-sm text-[var(--text-medium)]">
                                                    {testimonial.role}
                                                    {testimonial.company && (
                                                        <> · {testimonial.company}</>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2.5 w-2.5 rounded-full transition-all ${
                                    index === activeIndex
                                        ? 'bg-[var(--brand-green)] w-8'
                                        : 'bg-[var(--border-light)] hover:bg-[var(--brand-green)]/50'
                                }`}
                                aria-label={`Xem đánh giá ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 lg:-translate-x-8 rounded-full bg-white border border-[var(--border-light)] p-2 sm:p-3 shadow-lg hover:border-[var(--brand-green)] hover:bg-[var(--bg-mint)] transition-all"
                        aria-label="Đánh giá trước"
                    >
                        <span className="text-xl sm:text-2xl text-[var(--brand-navy)]">‹</span>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 lg:translate-x-8 rounded-full bg-white border border-[var(--border-light)] p-2 sm:p-3 shadow-lg hover:border-[var(--brand-green)] hover:bg-[var(--bg-mint)] transition-all"
                        aria-label="Đánh giá tiếp theo"
                    >
                        <span className="text-xl sm:text-2xl text-[var(--brand-navy)]">›</span>
                    </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {[
                        { label: 'Khách hàng hài lòng', value: '98%' },
                        { label: 'Đánh giá 5 sao', value: '4.9/5' },
                        { label: 'Dự án hoàn thành', value: '500+' },
                        { label: 'Năm kinh nghiệm', value: '10+' },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-4 rounded-xl bg-white/60 border border-[var(--border-light)]"
                        >
                            <p className="text-2xl sm:text-3xl font-bold text-[var(--brand-green)] mb-1">
                                {stat.value}
                            </p>
                            <p className="text-xs sm:text-sm text-[var(--text-medium)]">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;

