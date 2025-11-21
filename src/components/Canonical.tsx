"use client";
import { useEffect } from "react";

export default function Canonical() {
  useEffect(() => {
    try {
      const current = window.location.origin + window.location.pathname + window.location.search;
      const serverCanonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (serverCanonical) {
        // If the canonical host differs from current origin, replace it so browser SEO tools see a reachable canonical
        try {
          const canonUrl = new URL(serverCanonical.href);
          if (canonUrl.origin !== window.location.origin) {
            serverCanonical.href = current;
          }
        } catch (e) {
          serverCanonical.href = current;
        }
      } else {
        const link = document.createElement("link");
        link.rel = "canonical";
        link.href = current;
        document.head.appendChild(link);
      }
    } catch (e) {
      // noop in non-browser
    }
  }, []);

  return null;
}
