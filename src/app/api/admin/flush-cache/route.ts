import { NextResponse } from "next/server";
import { delRedis } from "@/lib/redis";

export async function POST(request: Request) {
  try {
    const headerToken = request.headers.get("x-admin-token");
    const url = new URL(request.url);
    const queryToken = url.searchParams.get("token");

    let bodyToken: string | undefined = undefined;
    try {
      const body = await request.json().catch(() => null);
      if (body && typeof body.token === "string") bodyToken = body.token;
    } catch (e) {}

    const token = headerToken || bodyToken || queryToken || "";

    const envToken = process.env.ADMIN_FLUSH_TOKEN || "";

    // Allow 'root' token in non-production for convenience (matches local admin login)
    const allowed = (process.env.NODE_ENV !== "production" && token === "root") || (envToken && token === envToken);

    if (!allowed) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    // Delete the known cache key(s)
    await delRedis("blogs:list");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("flush-cache error", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
