"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("adminAuth");
      if (!raw) return router.replace("/admin/login");
      const parsed = JSON.parse(raw);
      if (!parsed?.expiry || Date.now() > parsed.expiry) {
        localStorage.removeItem("adminAuth");
        return router.replace("/admin/login");
      }
      // otherwise allowed
    } catch (err) {
      router.replace("/admin/login");
    }
  }, [router]);

  return <>{children}</>;
}
