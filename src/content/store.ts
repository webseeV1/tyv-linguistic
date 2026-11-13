import { getStore } from "@netlify/blobs";
import { promises as fs } from "node:fs";
import path from "node:path";
import { EMPTY_DOC, type ContentDoc, type Overrides } from "./schema";

/**
 * Persistance des contenus modifiés par TYV.
 *
 * En production : Netlify Blobs (inclus dans l'hébergement déjà utilisé,
 * aucun service ni base de données supplémentaire).
 * En développement local (`npm run dev` hors `netlify dev`) : dossier
 * `.content-dev/`, ignoré par Git.
 *
 * Toute erreur de lecture est absorbée : le site réaffiche alors les contenus
 * d'origine du code plutôt que de tomber en panne.
 */

const CONTENT_STORE = "tyv-content";
const MEDIA_STORE = "tyv-media";
const DOC_KEY = "overrides";

const DEV_DIR = path.join(process.cwd(), ".content-dev");
const DEV_MEDIA_DIR = path.join(DEV_DIR, "media");

type MediaMeta = { contentType: string; uploadedAt: string };

const blobs = (name: string) => {
  try {
    return getStore({ name, consistency: "strong" });
  } catch {
    return null; // contexte Netlify absent → repli fichier local
  }
};

/* ────────────────────────── Contenus (textes & chemins) ───────────────────── */

export async function readContent(): Promise<ContentDoc> {
  const store = blobs(CONTENT_STORE);
  try {
    if (store) {
      const doc = (await store.get(DOC_KEY, { type: "json" })) as ContentDoc | null;
      return doc?.values ? doc : EMPTY_DOC;
    }
    const raw = await fs.readFile(path.join(DEV_DIR, "content.json"), "utf8");
    const doc = JSON.parse(raw) as ContentDoc;
    return doc?.values ? doc : EMPTY_DOC;
  } catch {
    return EMPTY_DOC;
  }
}

export async function readOverrides(): Promise<Overrides> {
  return (await readContent()).values;
}

export async function writeContent(values: Overrides): Promise<ContentDoc> {
  const doc: ContentDoc = {
    version: 1,
    updatedAt: new Date().toISOString(),
    values,
  };
  const store = blobs(CONTENT_STORE);
  if (store) {
    await store.setJSON(DOC_KEY, doc);
  } else {
    await fs.mkdir(DEV_DIR, { recursive: true });
    await fs.writeFile(
      path.join(DEV_DIR, "content.json"),
      JSON.stringify(doc, null, 2),
      "utf8",
    );
  }
  return doc;
}

/* ──────────────────────────────── Visuels ─────────────────────────────────── */

export async function writeMedia(
  key: string,
  data: Uint8Array,
  contentType: string,
): Promise<void> {
  const meta: MediaMeta = { contentType, uploadedAt: new Date().toISOString() };
  const store = blobs(MEDIA_STORE);
  if (store) {
    const buffer = data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    ) as ArrayBuffer;
    await store.set(key, buffer, { metadata: meta });
    return;
  }
  await fs.mkdir(DEV_MEDIA_DIR, { recursive: true });
  await fs.writeFile(path.join(DEV_MEDIA_DIR, key), data);
  await fs.writeFile(
    path.join(DEV_MEDIA_DIR, `${key}.meta.json`),
    JSON.stringify(meta),
    "utf8",
  );
}

export async function readMedia(
  key: string,
): Promise<{ data: Uint8Array; contentType: string } | null> {
  const store = blobs(MEDIA_STORE);
  try {
    if (store) {
      const res = await store.getWithMetadata(key, { type: "arrayBuffer" });
      if (!res) return null;
      const meta = res.metadata as Partial<MediaMeta>;
      return {
        data: new Uint8Array(res.data as ArrayBuffer),
        contentType: meta?.contentType ?? "application/octet-stream",
      };
    }
    const data = await fs.readFile(path.join(DEV_MEDIA_DIR, key));
    let contentType = "application/octet-stream";
    try {
      const meta = JSON.parse(
        await fs.readFile(path.join(DEV_MEDIA_DIR, `${key}.meta.json`), "utf8"),
      ) as MediaMeta;
      contentType = meta.contentType;
    } catch {
      /* métadonnées absentes : type générique */
    }
    return { data: new Uint8Array(data), contentType };
  } catch {
    return null;
  }
}
