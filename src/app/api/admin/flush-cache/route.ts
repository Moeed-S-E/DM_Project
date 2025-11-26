import { NextRequest, NextResponse } from "next/server";
import { delRedis } from "@/lib/redis";

// Protected endpoint to flush specific caches. Requires a secret header.
export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get("x-cache-secret");
    if (!secret || secret !== process.env.CACHE_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // invalidate common cache keys used by the app
    const keys = ["blogs:list", "products:list"];
    const results = [] as Array<{ key: string; result: any }>;
    for (const k of keys) {
      try {
        const r = await delRedis(k);
        results.push({ key: k, result: r });
      } catch (err) {
        results.push({ key: k, result: String(err) });
      }
    }

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    console.error("Error flushing cache", err);
    return NextResponse.json({ error: "Failed to flush cache" }, { status: 500 });
  }
}
