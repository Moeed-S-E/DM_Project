import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const username = body?.username;
    const password = body?.password;

    if (!username || !password) {
      return NextResponse.json({ error: "missing username or password" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const ok = bcrypt.compareSync(password, admin.passwordHash);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET || "supersecret", { expiresIn: "1d" });

    return NextResponse.json({ token });
  } catch (err) {
    console.error("xadm login error", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
