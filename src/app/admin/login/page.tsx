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

    // Simple local check for development — change to server auth in production
    if (username === "root" && password === "root") {
      // Cache auth for 2 minutes
      try {
        localStorage.setItem(
          "adminAuth",
          JSON.stringify({ token: "root", expiry: Date.now() + 2 * 60 * 1000 })
        );
      } catch (e) {
        console.warn("Could not persist admin auth", e);
      }

      // Redirect to dashboard
      router.push("/admin/dashboard");
      return;
    }

    alert("Invalid credentials");
    setLoading(false);
  };

  return (
    <main className="max-w-xs mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6 text-text-primary">Admin Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="p-3 rounded border"
          name="username"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-3 rounded border"
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
          className="px-6 py-3 rounded-lg bg-primary-blue text-base-white font-semibold shadow hover:bg-secondary-teal transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
