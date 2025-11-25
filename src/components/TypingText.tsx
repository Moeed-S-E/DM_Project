"use client";
import { useEffect, useState } from "react";

export default function TypingText({
  text,
  speed = 50,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let idx = 0;
    let timeout: number | undefined;

    function tick() {
      if (idx <= text.length) {
        setDisplayed(text.slice(0, idx));
        idx++;
        timeout = window.setTimeout(tick, speed);
      }
    }

    tick();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [text, speed]);

  return <span className={className}>{displayed}</span>;
}
