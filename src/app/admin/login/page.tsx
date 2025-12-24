 "use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/service/services/auth.service";
import { ApiError } from "@/service/api/client";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await authService.login({ username, password });
      router.push("/admin");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--bg-light)] flex items-center justify-center">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white/80 shadow-2xl backdrop-blur border border-[var(--border-light)]">
        <div className="relative grid md:grid-cols-[1.1fr,1fr]">
          <div className="hidden md:flex flex-col justify-between bg-[var(--brand-navy)] text-[var(--text-inverse)] p-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-mint)]" />
                Secure Admin Portal
              </div>
              <h1 className="mt-6 text-3xl font-semibold leading-tight">
                Showcase Store <span className="text-[var(--brand-mint)]">Admin</span>
              </h1>
              <p className="mt-4 text-sm text-[var(--text-light)] max-w-sm">
                Manage products, track performance, and keep your storefront up to date
                with a streamlined administration experience.
              </p>
                <p className="text-[10px] text-[var(--text-light)]">
                    Need help accessing your account? Contact your system administrator.
                </p>
            </div>
          </div>

          <div className="relative bg-[var(--bg-overlay-white)] p-8 md:p-10">
            <div className="mb-2 md:mb-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-light)]">
                Admin Portal
              </p>
              <p className="mt-1 text-sm text-[var(--text-medium)]">
                Use your administrator credentials to access the dashboard.
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-md border border-[var(--state-error)] bg-red-50/80 px-3 py-2 text-sm text-[var(--state-error)]">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--text-medium)]">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-light)] bg-white px-3 py-2.5 text-sm text-[var(--text-dark)] shadow-sm focus:border-[var(--brand-green)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/20"
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-[var(--text-medium)]">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium text-[var(--brand-green)] hover:text-[var(--btn-primary-hover)]"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-light)] bg-white px-3 py-2.5 pr-11 text-sm text-[var(--text-dark)] shadow-sm focus:border-[var(--brand-green)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/20"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--text-light)] hover:text-[var(--text-medium)]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88M9.88 9.88 7 7m2.88 2.88 7.07 7.07M7 7 4 4m3 3 3.17 3.17M10.73 5.08A9.12 9.12 0 0 1 12 5c4.5 0 8.27 2.94 9.5 7-0.46 1.53-1.3 2.9-2.4 4M6.53 6.53C4.42 7.64 2.84 9.51 2.5 12c.46 1.53 1.3 2.9 2.4 4 1.1 1.1 2.47 1.94 4 2.4a9.68 9.68 0 0 0 3.1.1" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1.5 12C2.78 7.94 6.55 5 11 5s8.22 2.94 9.5 7c-1.28 4.06-5.05 7-9.5 7s-8.22-2.94-9.5-7Z" />
                        <circle cx="11" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[var(--btn-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--text-inverse)] shadow-sm transition hover:bg-[var(--btn-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-[10px] text-[var(--text-light)]">
              By signing in, you confirm that you are an authorized administrator of
              this Showcase Store environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

