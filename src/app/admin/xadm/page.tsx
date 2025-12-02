"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    alert("Invalid credentials");
    setLoading(false);
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
        </form>
      </div>
    </main>
  );
}
