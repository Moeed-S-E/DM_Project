"use client";
import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("./HeroSection"), {
  ssr: false,
  loading: () => <div className="w-full h-[60vh] bg-[var(--level1-bg)]" />,
});

export default function HeroLoader() {
  return <HeroSection />;
}
