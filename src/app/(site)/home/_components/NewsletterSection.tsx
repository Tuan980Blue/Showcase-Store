'use client';

import React, { useState } from 'react';

const NewsletterSection: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !email.includes('@')) {
            setStatus('error');
            return;
        }

        setStatus('loading');
        
        // Simulate API call - replace with actual newsletter subscription endpoint
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
    };

    return (
        <section className="border-t border-[var(--border-light)] bg-gradient-to-br from-[var(--brand-navy)] via-[var(--brand-navy)]/95 to-[var(--brand-green)]/20 py-12 sm:py-16">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/90 mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
                        Đăng ký nhận tin
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                        Nhận thông tin mới nhất về sản phẩm & ưu đãi
                    </h2>
                    
                    <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                        Đăng ký ngay để nhận thông báo về sản phẩm mới, combo ưu đãi và các chương trình khuyến mãi đặc biệt
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            className="flex-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-6 py-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-[var(--brand-green)] transition-all"
                            disabled={status === 'loading' || status === 'success'}
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="rounded-full bg-[var(--brand-green)] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[var(--brand-green)]/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' && 'Đang gửi...'}
                            {status === 'success' && '✓ Đã đăng ký!'}
                            {status === 'idle' && 'Đăng ký ngay'}
                            {status === 'error' && 'Thử lại'}
                        </button>
                    </form>

                    {status === 'error' && (
                        <p className="mt-3 text-sm text-red-300">
                            Vui lòng nhập địa chỉ email hợp lệ
                        </p>
                    )}

                    {status === 'success' && (
                        <p className="mt-3 text-sm text-[var(--brand-green)] font-medium">
                            Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi thông tin mới nhất đến email của bạn.
                        </p>
                    )}

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
                        <div className="flex items-center gap-2">
                            <span className="text-[var(--brand-green)]">✓</span>
                            <span>Không spam</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[var(--brand-green)]">✓</span>
                            <span>Hủy đăng ký bất cứ lúc nào</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[var(--brand-green)]">✓</span>
                            <span>Ưu đãi độc quyền</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;

