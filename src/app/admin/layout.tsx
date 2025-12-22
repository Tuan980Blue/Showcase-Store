"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "./_components/Sidebar";
import AdminGuard from "./_components/AdminGuard";
import { HiMenu } from "react-icons/hi";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    // Use cleanup function to avoid synchronous setState
    return () => {
      setIsMobileSidebarOpen(false);
    };
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileSidebarOpen]);

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        {!isLoginPage && (
          <>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
              aria-label="Open sidebar"
            >
              <HiMenu className="w-6 h-6" />
            </button>

            {/* Sidebar */}
            <Sidebar
              isMobileOpen={isMobileSidebarOpen}
              onMobileClose={() => setIsMobileSidebarOpen(false)}
            />
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-w-0">
          <div className="p-4 lg:p-6 pt-16 lg:pt-6">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
