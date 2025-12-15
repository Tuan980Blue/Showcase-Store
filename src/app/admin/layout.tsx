"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import AdminGuard from "./_components/AdminGuard";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        {!isLoginPage && <Sidebar />}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </AdminGuard>
  );
}
