import React from 'react';
import type { Metadata } from 'next';
import HomeContentPage from "@/app/(site)/home/page";

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

const Page = () => {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <HomeContentPage />
        </div>
    );
};

export default Page;