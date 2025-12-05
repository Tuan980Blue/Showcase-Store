import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Giới Thiệu",
  description: "Tìm hiểu về Điện Tử Tuấn Anh - Hơn 10 năm kinh nghiệm trong lĩnh vực điện tử. Chúng tôi chuyên cung cấp linh kiện điện tử, đồ da dụng, sản phẩm sức khỏe chính hãng với dịch vụ tư vấn tận tâm 24/7.",
  keywords: [
    "giới thiệu điện tử tuấn anh",
    "về chúng tôi",
    "lịch sử cửa hàng điện tử",
    "điện tử tuấn anh",
    "thông tin cửa hàng"
  ],
  openGraph: {
    title: "Giới Thiệu - Điện Tử Tuấn Anh",
    description: "Hơn 10 năm kinh nghiệm phục vụ khách hàng với hơn 50K khách hàng hài lòng. Điện Tử Tuấn Anh - Đồng hành cùng bạn.",
    url: "/about",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

