"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/service/services/auth.service";
import { apiClient } from "@/service/api/client";
import { STORAGE_KEYS } from "@/service/api/constants";

type Props = {
  children: ReactNode;
};

const PUBLIC_PATHS = ["/admin/login"];

const AdminGuard = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const enforceAuth = async () => {
      if (PUBLIC_PATHS.includes(pathname)) {
        setIsReady(true);
        return;
      }

      const accessToken = apiClient.getToken();
      const refreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
          : null;

      if (accessToken) {
        setIsReady(true);
        return;
      }

      if (refreshToken) {
        try {
          await authService.refreshToken(refreshToken);
          setIsReady(true);
          return;
        } catch (error) {
          console.error("Auto refresh failed", error);
        }
      }

      router.replace("/admin/login");
    };

    enforceAuth();
  }, [pathname, router]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-700">
        Checking session...
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;

