import { readMedia } from "@/content/store";
import { MEDIA_KEY } from "@/content/validate";

export const runtime = "nodejs";

/**
 * Sert un visuel déposé par TYV. Le nom de fichier est généré par le serveur
 * et vérifié ici : impossible de demander autre chose qu'une image du dépôt.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  if (!MEDIA_KEY.test(key)) {
    return new Response("Not found", { status: 404 });
  }

  const media = await readMedia(key);
  if (!media) return new Response("Not found", { status: 404 });

  const body = media.data.buffer.slice(
    media.data.byteOffset,
    media.data.byteOffset + media.data.byteLength,
  ) as ArrayBuffer;

  return new Response(body, {
    headers: {
      "Content-Type": media.contentType,
      "Content-Disposition": "inline",
      "X-Content-Type-Options": "nosniff",
      // Le nom du fichier change à chaque dépôt : cache long sans risque.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
