import React from 'react';
import type { Metadata } from 'next';
import SidebarCatgory from "@/app/(site)/_components/SidebarCatgory";

export const metadata: Metadata = {
  title: "Trang Chủ",
  description: "Điện Tử Tuấn Anh - Trang chủ cửa hàng chuyên bán linh kiện điện tử, đồ da dụng, sản phẩm sức khỏe chính hãng. Khám phá hàng ngàn sản phẩm chất lượng với giá cả hợp lý.",
  keywords: [
    "trang chủ điện tử tuấn anh",
    "mua linh kiện điện tử online",
    "đồ da dụng giá rẻ",
    "sản phẩm sức khỏe",
    "điện tử việt nam"
  ],
  openGraph: {
    title: "Trang Chủ - Điện Tử Tuấn Anh",
    description: "Khám phá hàng ngàn sản phẩm linh kiện điện tử, đồ da dụng, sản phẩm sức khỏe chính hãng tại Điện Tử Tuấn Anh.",
    url: "/",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

const HomePage = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row">
                <div className="hidden lg:block">
                    <SidebarCatgory />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    {/* Main content của web sẽ được đặt ở đây */}
                </div>
            </div>
        </div>
    );
};

export default HomePage;