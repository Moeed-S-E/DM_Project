import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;
    const filename = formData.get("filename") as string;
    if (!file || !folder || !filename) {
      return NextResponse.json({ error: "Missing file, folder, or filename" }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadDir = path.join(process.cwd(), "public", folder);
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);
    // Return filename (no leading slash) so frontend stores just the filename.
    // Full public URL is available at `/${folder}/${filename}` when needed.
    return NextResponse.json({ url: filename });
  } catch (e) {
    console.error("Upload error:", e instanceof Error ? e.message : e, e);
    const errMsg = e instanceof Error ? e.message : String(e);
    const errStack = e instanceof Error && (e as Error).stack ? (e as Error).stack : undefined;
    return NextResponse.json({ error: `Failed to upload image: ${errMsg}`, stack: errStack }, { status: 500 });
  }
}