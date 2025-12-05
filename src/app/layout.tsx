import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData, { createOrganizationSchema, createWebSiteSchema } from "@/app/(site)/_components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dientutuananh.vercel.app'),
  title: {
    default: "ĐIỆN TỬ TUẤN ANH - Chuyên Bán Đồ Da Dụng, Linh Kiện Điện Tử Và Sản Phẩm Sức Khỏe",
    template: "%s | ĐIỆN TỬ TUẤN ANH"
  },
  description: "Điện Tử Tuấn Anh - Cửa hàng chuyên bán linh kiện điện tử, đồ da dụng, sản phẩm sức khỏe chính hãng. Giao hàng nhanh, giá cả hợp lý, tư vấn tận tâm 24/7. Hơn 10 năm kinh nghiệm phục vụ khách hàng.",
  keywords: [
    "điện tử tuấn anh",
    "linh kiện điện tử",
    "đồ da dụng",
    "sản phẩm sức khỏe",
    "mua linh kiện điện tử",
    "cửa hàng điện tử",
    "thiết bị điện tử",
    "phụ kiện điện tử",
    "điện tử giá rẻ",
    "điện tử chính hãng"
  ],
  authors: [{ name: "Điện Tử Tuấn Anh" }],
  creator: "Điện Tử Tuấn Anh",
  publisher: "Điện Tử Tuấn Anh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "Điện Tử Tuấn Anh",
    title: "ĐIỆN TỬ TUẤN ANH - Chuyên Bán Đồ Da Dụng, Linh Kiện Điện Tử Và Sản Phẩm Sức Khỏe",
    description: "Điện Tử Tuấn Anh - Cửa hàng chuyên bán linh kiện điện tử, đồ da dụng, sản phẩm sức khỏe chính hãng. Giao hàng nhanh, giá cả hợp lý, tư vấn tận tâm 24/7.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Điện Tử Tuấn Anh - Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ĐIỆN TỬ TUẤN ANH - Chuyên Bán Đồ Da Dụng, Linh Kiện Điện Tử",
    description: "Cửa hàng chuyên bán linh kiện điện tử, đồ da dụng, sản phẩm sức khỏe chính hãng. Giao hàng nhanh, giá cả hợp lý.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "/",
  },
  category: "E-commerce",
  classification: "Electronics Store",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dientutuananh.com';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = createOrganizationSchema(
    "Điện Tử Tuấn Anh",
    siteUrl,
    `${siteUrl}/logo.png`,
    "Cửa hàng chuyên bán linh kiện điện tử, đồ da dụng, sản phẩm sức khỏe chính hãng. Giao hàng nhanh, giá cả hợp lý, tư vấn tận tâm 24/7.",
    undefined, // Add phone number if available
    [] // Add social media links if available
  );

  const websiteSchema = createWebSiteSchema(
    "Điện Tử Tuấn Anh",
    siteUrl
  );

  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData type="organization" data={organizationSchema} />
        <StructuredData type="website" data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
