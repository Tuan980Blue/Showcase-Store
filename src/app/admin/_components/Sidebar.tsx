"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  HiHome,
  HiShoppingBag,
  HiViewGrid,
  HiBookOpen,
  HiTag,
  HiUserCircle,
  HiX,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar = ({ isMobileOpen = false, onMobileClose }: SidebarProps) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const menuItems = [
    { 
      href: "/admin", 
      label: "Dashboard",
      icon: HiHome,
    },
    { 
      href: "/admin/products", 
      label: "Products",
      icon: HiShoppingBag,
    },
    { 
      href: "/admin/categories", 
      label: "Categories",
      icon: HiViewGrid,
    },
    { 
      href: "/admin/blogs", 
      label: "Blogs",
      icon: HiBookOpen,
    },
    { 
      href: "/admin/blog-categories", 
      label: "Blog Categories",
      icon: HiTag,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  // Mobile overlay
  const overlay = (
    <AnimatePresence>
      {isMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onMobileClose}
            aria-hidden="true"
          />
        </>
      )}
    </AnimatePresence>
  );

  const sidebarContent = (
    <motion.aside
      initial={false}
      animate={{
        x: isDesktop ? 0 : isMobileOpen ? 0 : -280,
      }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed lg:sticky top-0 left-0 z-50 w-64 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col shadow-2xl lg:shadow-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
            <HiViewGrid className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Admin Panel</h2>
            <p className="text-xs text-gray-400">Management</p>
          </div>
        </div>
        <button
          onClick={onMobileClose}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
          aria-label="Close sidebar"
        >
          <HiX className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => {
                    if (onMobileClose) {
                      // Close mobile sidebar on click (handled by media query in CSS)
                      onMobileClose();
                    }
                  }}
                  className={`
                    group relative flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      active
                        ? "bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-400 shadow-lg shadow-green-500/10"
                        : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    }
                  `}
                >
                  {/* Active indicator */}
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-green-600 rounded-r-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <Icon
                    className={`
                      w-5 h-5 flex-shrink-0
                      transition-transform duration-200
                      ${active ? "text-green-400" : "text-gray-400 group-hover:text-white"}
                      ${active ? "scale-110" : "group-hover:scale-105"}
                    `}
                  />
                  <span className="font-medium text-sm">{item.label}</span>
                  
                  {/* Hover effect */}
                  {!active && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100"
                      initial={false}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer - Account Section */}
      <div className="border-t border-gray-700/50 p-4">
        <Link
          href="/admin/account"
          onClick={() => {
            if (onMobileClose) {
              onMobileClose();
            }
          }}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg
            transition-all duration-200
            ${
              pathname === "/admin/account"
                ? "bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-400"
                : "text-gray-300 hover:text-white hover:bg-gray-700/50"
            }
          `}
        >
          <HiUserCircle
            className={`
              w-5 h-5 flex-shrink-0
              ${pathname === "/admin/account" ? "text-green-400" : "text-gray-400"}
            `}
          />
          <span className="font-medium text-sm">Account Settings</span>
        </Link>
      </div>
    </motion.aside>
  );

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {overlay}
      {sidebarContent}
    </>
  );
};

export default Sidebar;



