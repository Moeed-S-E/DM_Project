"use client";

import { useState } from "react";

export default function FlushCacheButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFlush = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const raw = localStorage.getItem("adminAuth");
      let token = "";
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          token = parsed?.token || "";
        } catch (e) {}
      }

      const res = await fetch("/api/xdm/flush-cache", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const txt = await res.json().catch(() => ({}));
        setMessage(`Failed: ${res.status} ${txt?.error || ""}`);
      } else {
        setMessage("Cache flushed successfully.");
      }
    } catch (e: any) {
      setMessage(`Error: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleFlush}
        disabled={loading}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Flushing..." : "Flush Blog Cache"}
      </button>
      {message ? <p className="mt-2 text-sm text-[var(--text-muted)]">{message}</p> : null}
    </div>
  );
}
