import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { isAuthenticated } from "@/lib/admin-auth";
import { writeMedia } from "@/content/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024; // 5 Mo

/** Types acceptés. Le SVG est refusé : il peut embarquer du script. */
const ALLOWED: { type: string; ext: string; matches: (b: Uint8Array) => boolean }[] = [
  {
    type: "image/jpeg",
    ext: "jpg",
    matches: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  {
    type: "image/png",
    ext: "png",
    matches: (b) =>
      b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 &&
      b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a,
  },
  {
    type: "image/webp",
    ext: "webp",
    matches: (b) =>
      b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
      b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50,
  },
];

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: "Le fichier est vide." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image trop lourde : 5 Mo maximum." },
      { status: 413 },
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());

  // Le type réel est déduit du contenu du fichier, pas de son nom ni de
  // l'en-tête envoyé par le navigateur.
  const kind = ALLOWED.find((a) => a.matches(bytes));
  if (!kind) {
    return NextResponse.json(
      { error: "Format non accepté. Utilisez une image JPG, PNG ou WebP." },
      { status: 415 },
    );
  }

  const key = `img_${randomBytes(8).toString("hex")}.${kind.ext}`;
  await writeMedia(key, bytes, kind.type);

  return NextResponse.json({ ok: true, url: `/api/media/${key}` });
}
