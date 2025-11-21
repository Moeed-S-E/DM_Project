import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const message = (body.message || "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "name, email and message are required" }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "invalid email" }, { status: 400 });
    }

    const record = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
  } catch (err) {
    console.error("/api/contact error:", err);
    // Expose error details in development to aid debugging
    if (process.env.NODE_ENV !== "production") {
      const message = err instanceof Error ? err.message : String(err);
      const stack = err && typeof err === "object" && 'stack' in err ? (err as any).stack : undefined;
      return NextResponse.json({ error: message, stack }, { status: 500 });
    }
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
