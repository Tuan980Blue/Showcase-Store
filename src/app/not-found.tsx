'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiHome, HiExclamationCircle, HiArrowLeft } from "react-icons/hi";

export default function NotFound() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);

    //useEffect 1: giam countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    //useEffect 2: redirect khi countdown = 0
    useEffect(() => {
        if (countdown === 0) {
            router.push("/");
        }
    }, [countdown, router]);
    //ESLint rule (và React team) bắt buộc bạn phải thêm nó vào dependency array
    // — để đảm bảo tính an toàn & ổn định của hook

    const handleGoHome = () => {
        router.push("/");
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: "var(--bg-light)" }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated Background Elements */}
                <div 
                    className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse"
                    style={{ backgroundColor: "var(--brand-green)" }}
                />
                <div 
                    className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"
                    style={{ backgroundColor: "var(--brand-navy)" }}
                />
                <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-5 blur-3xl"
                    style={{ backgroundColor: "var(--brand-mint)" }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-12 text-center">
                <div className="max-w-2xl mx-auto">
                    {/* Error Icon */}
                    <div className="mb-8 flex justify-center">
                        <div 
                            className="relative w-32 h-32 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "var(--bg-mint)" }}
                        >
                            <HiExclamationCircle 
                                className="w-20 h-20"
                                style={{ color: "var(--brand-green)" }}
                            />
                            <div 
                                className="absolute inset-0 rounded-full animate-ping opacity-20"
                                style={{ backgroundColor: "var(--brand-green)" }}
                            />
                        </div>
                    </div>

                    {/* Error Code */}
                    <h1 
                        className="text-2xl sm:text-6xl font-bold mb-4 tracking-tight"
                        style={{ color: "var(--state-error)" }}
                    >
                        404
                    </h1>

                    {/* Description */}
                    <h2 
                        className="text-2xl sm:text-3xl font-semibold mb-4"
                        style={{ color: "var(--text-dark)" }}
                    >
                        Trang không tồn tại
                    </h2>
                    <p 
                        className="text-base sm:text-lg mb-8 leading-relaxed"
                        style={{ color: "var(--text-medium)" }}
                    >
                        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
                        <br />
                        Về trang chủ sau <span
                            className="font-bold text-lg"
                            style={{ color: "var(--brand-green)" }}
                        >{countdown}</span> giây.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <button
                            onClick={handleGoHome}
                            className="group px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:shadow-lg flex items-center gap-2"
                            style={{ 
                                backgroundColor: "var(--btn-primary)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "var(--btn-primary-hover)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "var(--btn-primary)";
                            }}
                        >
                            <HiHome className="w-5 h-5" />
                            <span>Về trang chủ</span>
                        </button>
                        <Link
                            href="/products"
                            className="group px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:shadow-lg flex items-center gap-2 border-2"
                            style={{ 
                                color: "var(--btn-secondary)",
                                borderColor: "var(--btn-secondary)",
                                backgroundColor: "transparent"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "var(--btn-secondary)";
                                e.currentTarget.style.color = "var(--text-inverse)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "var(--btn-secondary)";
                            }}
                        >
                            <HiArrowLeft className="w-5 h-5" />
                            <span>Xem sản phẩm</span>
                        </Link>
                    </div>

                    {/* Additional Help */}
                    <div 
                        className="mt-12 p-6 rounded-lg"
                        style={{ 
                            backgroundColor: "var(--bg-mint)",
                            border: "1px solid var(--border-light)"
                        }}
                    >
                        <p 
                            className="text-sm mb-4"
                            style={{ color: "var(--text-medium)" }}
                        >
                            Bạn có thể:
                        </p>
                        <ul 
                            className="text-sm space-y-2 text-left max-w-md mx-auto"
                            style={{ color: "var(--text-medium)" }}
                        >
                            <li className="flex items-start gap-2">
                                <span style={{ color: "var(--brand-green)" }}>•</span>
                                <span>Kiểm tra lại URL bạn đã nhập</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span style={{ color: "var(--brand-green)" }}>•</span>
                                <span>Sử dụng thanh tìm kiếm để tìm sản phẩm</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span style={{ color: "var(--brand-green)" }}>•</span>
                                <span>Quay lại trang chủ và duyệt các danh mục</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
