import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/admin-auth";
import { readContent, writeContent } from "@/content/store";
import { validateOverrides } from "@/content/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  return NextResponse.json(await readContent());
}

export async function PUT(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { values?: unknown } | null;
  const result = validateOverrides(body?.values);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const doc = await writeContent(result.values);

  // Les pages publiques sont régénérées immédiatement.
  revalidatePath("/", "layout");
  revalidatePath("/en");

  return NextResponse.json({ ok: true, updatedAt: doc.updatedAt });
}
