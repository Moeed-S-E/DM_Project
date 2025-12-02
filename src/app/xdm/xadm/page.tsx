"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiBase } from '@/lib/apiBase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${apiBase()}/api/xdm/xadm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body?.error || 'Invalid credentials');
        return;
      }

      const data = await res.json().catch(() => ({}));
      const token = data?.token;
      if (!token) {
        setError('Login failed: no token received');
        return;
      }

      // Save admin auth with expiry matching server JWT (1 day)
      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('adminAuth', JSON.stringify({ token, expiry, username }));

      // Redirect to admin dashboard
      router.push('/xdm/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] flex items-center justify-center px-4">
      <div className="max-w-xs w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
        <form className="bg-[var(--card-bg)] border border-[var(--level1-border)] rounded-lg p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="p-3 rounded border border-[var(--level1-border)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
            name="username"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="p-3 rounded border border-[var(--level1-border)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-[var(--primary-blue)] text-white font-semibold shadow-lg hover:shadow-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error ? <p className="text-sm text-red-500 mt-2">{error}</p> : null}
        </form>
      </div>
    </main>
  );
}
