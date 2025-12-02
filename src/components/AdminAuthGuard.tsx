"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("adminAuth");
      if (!raw) return router.replace("/xdm/xadm");
      const parsed = JSON.parse(raw);
      if (!parsed?.expiry || Date.now() > parsed.expiry) {
        localStorage.removeItem("adminAuth");
        return router.replace("/xdm/xadm");
      }
      // otherwise allowed
    } catch (err) {
      router.replace("/xdm/xadm");
    }
  }, [router]);

  return <>{children}</>;
}
