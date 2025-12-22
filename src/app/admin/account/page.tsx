"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/service/services/auth.service";
import { apiClient } from "@/service/api/client";

interface AdminInfo {
  id: string;
  username: string;
  email: string;
  role: string;
}

const decodeJWT = (token: string): AdminInfo | null => {
  try {
    // JWT format: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    // Add padding if needed for base64 decoding
    const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decodedPayload = atob(paddedPayload.replace(/-/g, "+").replace(/_/g, "/"));
    const claims = JSON.parse(decodedPayload);

    // Map .NET ClaimTypes to our interface
    // Backend uses: ClaimTypes.NameIdentifier, ClaimTypes.Name, ClaimTypes.Email, ClaimTypes.Role
    // Try multiple possible claim name formats
    const nameIdentifierClaim = 
      claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
      claims.sub ||
      claims.nameid ||
      "";

    const nameClaim =
      claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      claims.name ||
      claims.unique_name ||
      "";

    const emailClaim =
      claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ||
      claims.email ||
      "";

    const roleClaim =
      claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      claims.role ||
      "Admin";

    return {
      id: nameIdentifierClaim,
      username: nameClaim,
      email: emailClaim,
      role: roleClaim,
    };
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

const AccountPage = () => {
  const router = useRouter();
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const token = apiClient.getToken();
    if (token) {
      const decoded = decodeJWT(token);
      setAdminInfo(decoded);
    }
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await authService.logout();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, clear local tokens and redirect
      router.push("/admin/login");
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Information</h1>
        <p className="text-sm text-gray-600 mt-1">
          View and manage your admin account details
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile</h2>
        
        {adminInfo ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="text-gray-900 bg-gray-50 px-4 py-2 rounded border border-gray-200">
                {adminInfo.username || "N/A"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="text-gray-900 bg-gray-50 px-4 py-2 rounded border border-gray-200">
                {adminInfo.email || "N/A"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="text-gray-900 bg-gray-50 px-4 py-2 rounded border border-gray-200">
                {adminInfo.role || "Admin"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User ID
              </label>
              <div className="text-gray-900 bg-gray-50 px-4 py-2 rounded border border-gray-200 font-mono text-sm">
                {adminInfo.id || "N/A"}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-600 py-4">
            Unable to load account information. Please try logging in again.
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions</h2>
        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {logoutLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default AccountPage;

