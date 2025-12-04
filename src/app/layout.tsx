import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ĐIỆN TỬ TUẤN ANH - CHUYÊN BÁN ĐỒ DA DỤNG, LINH KIỆN ĐIỆN TỬ VÀ NHIỀU SẢN PHẨM SỨC KHOẺ",
  description: "T-Shop (Hardware Shop) là cửa hàng chuyên bán các sản phẩm Điện tử",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
