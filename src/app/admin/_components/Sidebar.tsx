"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { authService } from "@/service/services/auth.service";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { href: "/admin/products", label: "Products" },
  ];

  const handleLogout = async () => {
    await authService.logout();
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  pathname === item.href ? "bg-gray-700" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-4 border-t border-gray-700 mt-4">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;



