"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { EditableItem } from "@/content/fields";
import type { Group } from "@/content/schema";
import type { Locale } from "@/i18n";

type GroupDef = { id: Group; label: string; help?: string };
type Value = string | string[];

const same = (a: Value, b: Value) =>
  Array.isArray(a) || Array.isArray(b)
    ? JSON.stringify(a) === JSON.stringify(b)
    : a === b;

const LOCALE_LABEL: Record<Locale, string> = {
  fr: "Site en français",
  en: "Site en anglais",
};

export function AdminEditor({
  items,
  groups,
  updatedAt,
}: {
  items: EditableItem[];
  groups: GroupDef[];
  updatedAt: string;
}) {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("fr");
  const [values, setValues] = useState<Record<string, Value>>(() =>
    Object.fromEntries(items.map((i) => [i.id, i.value])),
  );
  const [status, setStatus] = useState<
    { kind: "idle" | "saving" } | { kind: "saved" | "error"; message: string }
  >({ kind: "idle" });

  const changed = useMemo(
    () => items.filter((i) => !same(values[i.id], i.value)),
    [items, values],
  );

  // Évite de perdre une saisie en fermant l'onglet par mégarde.
  useEffect(() => {
    if (changed.length === 0) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [changed.length]);

  const setValue = (id: string, value: Value) => {
    setValues((v) => ({ ...v, [id]: value }));
    setStatus({ kind: "idle" });
  };

  const visible = (item: EditableItem) =>
    item.scope === "shared" || item.locale === locale;

  async function save() {
    setStatus({ kind: "saving" });

    // Seules les valeurs qui diffèrent du contenu d'origine sont enregistrées ;
    // un champ remis à l'identique revient donc au texte livré avec le site.
    const payload: Record<string, Value> = {};
    for (const item of items) {
      const value = values[item.id];
      if (!same(value, item.defaultValue)) payload[item.id] = value;
    }

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values: payload }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({ kind: "error", message: data.error ?? "Enregistrement impossible." });
        return;
      }
      setStatus({
        kind: "saved",
        message: "Modifications enregistrées. Elles sont en ligne sur le site.",
      });
      router.refresh();
    } catch {
      setStatus({ kind: "error", message: "Enregistrement impossible. Vérifiez votre réseau." });
    }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="pb-32">
      <header className="sticky top-0 z-20 border-b border-tyv-navy/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
          <div className="mr-auto">
            <h1 className="font-display text-xl font-bold text-tyv-navy">
              Espace TYV
            </h1>
            <p className="text-xs text-tyv-muted">
              {updatedAt
                ? `Dernière modification le ${new Date(updatedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : "Aucune modification pour le moment"}
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-3 py-2 text-sm font-medium text-tyv-navy transition-colors hover:bg-tyv-bg"
          >
            Voir le site
          </a>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl px-3 py-2 text-sm font-medium text-tyv-muted transition-colors hover:bg-tyv-bg"
          >
            Se déconnecter
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl bg-white p-5 text-sm leading-relaxed text-tyv-muted ring-1 ring-tyv-navy/5">
          Modifiez ce que vous voulez, puis cliquez sur <strong>Enregistrer</strong>{" "}
          en bas de page. Les changements apparaissent sur le site en quelques
          secondes. Pour revenir au contenu d&apos;origine, utilisez le lien
          «&nbsp;Rétablir&nbsp;» sous le champ concerné.
        </div>

        {/* Choix de la langue : les photos et coordonnées sont communes. */}
        <div className="mt-6 flex gap-2 rounded-2xl bg-white p-2 ring-1 ring-tyv-navy/5">
          {(["fr", "en"] as Locale[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              aria-pressed={locale === l}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                locale === l
                  ? "bg-tyv-navy text-white"
                  : "text-tyv-navy hover:bg-tyv-bg"
              }`}
            >
              {LOCALE_LABEL[l]}
            </button>
          ))}
        </div>

        {groups.map((group) => {
          const groupItems = items.filter(
            (i) => i.group === group.id && visible(i),
          );
          if (groupItems.length === 0) return null;

          return (
            <section
              key={group.id}
              className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-tyv-navy/5 sm:p-8"
            >
              <h2 className="font-display text-lg font-bold text-tyv-navy">
                {group.label}
              </h2>
              {group.help && (
                <p className="mt-1 text-sm text-tyv-muted">{group.help}</p>
              )}

              <div className="mt-6 space-y-7">
                {groupItems.map((item) => (
                  <FieldRow
                    key={item.id}
                    item={item}
                    value={values[item.id]}
                    onChange={(v) => setValue(item.id, v)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-tyv-navy/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
          <p className="mr-auto text-sm text-tyv-muted" aria-live="polite">
            {status.kind === "saved" || status.kind === "error" ? (
              <span
                className={
                  status.kind === "saved" ? "text-green-700" : "text-red-700"
                }
              >
                {status.message}
              </span>
            ) : changed.length === 0 ? (
              "Aucune modification en attente"
            ) : (
              `${changed.length} modification${changed.length > 1 ? "s" : ""} en attente`
            )}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={status.kind === "saving" || changed.length === 0}
            className="rounded-xl bg-tyv-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-tyv-navy-light disabled:opacity-40"
          >
            {status.kind === "saving" ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── Un champ ─────────────────────────────────── */

function FieldRow({
  item,
  value,
  onChange,
}: {
  item: EditableItem;
  value: Value;
  onChange: (v: Value) => void;
}) {
  const modified = !same(value, item.defaultValue);

  return (
    <div>
      <label
        htmlFor={item.id}
        className="block text-sm font-semibold text-tyv-navy"
      >
        {item.label}
      </label>
      {item.help && <p className="mt-1 text-xs text-tyv-muted">{item.help}</p>}

      <div className="mt-2">
        {item.type === "text" && (
          <input
            id={item.id}
            type="text"
            value={value as string}
            maxLength={item.maxLength ?? 300}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border border-tyv-navy/15 bg-tyv-bg px-4 py-3 text-tyv-text transition-colors focus:border-tyv-sky focus:bg-white"
          />
        )}

        {item.type === "textarea" && (
          <textarea
            id={item.id}
            value={value as string}
            maxLength={item.maxLength ?? 2000}
            rows={Math.min(14, Math.max(3, String(value).split("\n").length + 1))}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border border-tyv-navy/15 bg-tyv-bg px-4 py-3 font-sans text-tyv-text transition-colors focus:border-tyv-sky focus:bg-white"
          />
        )}

        {item.type === "image" && (
          <ImageField
            value={value as string}
            ratio={item.ratio}
            onChange={onChange}
          />
        )}

        {item.type === "gallery" && (
          <GalleryField
            value={value as string[]}
            ratio={item.ratio}
            onChange={onChange}
          />
        )}
      </div>

      {modified && (
        <button
          type="button"
          onClick={() => onChange(item.defaultValue)}
          className="mt-2 text-xs font-medium text-tyv-sky underline-offset-2 hover:underline"
        >
          Rétablir le contenu d&apos;origine
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────── Visuels ──────────────────────────────────── */

/** Dépose un fichier et renvoie son adresse, ou un message d'erreur. */
async function upload(file: File): Promise<{ url?: string; error?: string }> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/media", { method: "POST", body });
  const data = (await res.json().catch(() => ({}))) as {
    url?: string;
    error?: string;
  };
  if (!res.ok) return { error: data.error ?? "Envoi impossible." };
  return { url: data.url };
}

function Thumb({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="h-24 w-36 shrink-0 rounded-xl object-cover ring-1 ring-tyv-navy/10"
    />
  );
}

function UploadButton({
  label,
  onUploaded,
  onError,
}: {
  label: string;
  onUploaded: (url: string) => void;
  onError: (message: string | null) => void;
}) {
  const [busy, setBusy] = useState(false);

  return (
    <label
      className={`inline-flex cursor-pointer items-center rounded-xl border border-tyv-navy/15 px-4 py-2 text-sm font-medium text-tyv-navy transition-colors hover:bg-tyv-bg ${
        busy ? "pointer-events-none opacity-60" : ""
      }`}
    >
      {busy ? "Envoi…" : label}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          setBusy(true);
          onError(null);
          const { url, error } = await upload(file);
          setBusy(false);
          if (url) onUploaded(url);
          else onError(error ?? "Envoi impossible.");
        }}
      />
    </label>
  );
}

function ImageField({
  value,
  ratio,
  onChange,
}: {
  value: string;
  ratio?: string;
  onChange: (v: string) => void;
}) {
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        {value && <Thumb src={value} />}
        <div>
          <UploadButton label="Remplacer la photo" onUploaded={onChange} onError={setError} />
          <p className="mt-2 text-xs text-tyv-muted">
            JPG, PNG ou WebP · 5 Mo maximum{ratio ? ` · ${ratio}` : ""}
          </p>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}

function GalleryField({
  value,
  ratio,
  onChange,
}: {
  value: string[];
  ratio?: string;
  onChange: (v: string[]) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const list = value ?? [];

  const move = (index: number, delta: number) => {
    const next = list.slice();
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const remove = (index: number) => {
    if (list.length === 1) {
      setError("Gardez au moins une photo dans cette section.");
      return;
    }
    if (!window.confirm("Supprimer cette photo du site ?")) return;
    onChange(list.filter((_, i) => i !== index));
  };

  return (
    <div>
      <ul className="space-y-3">
        {list.map((src, index) => (
          <li
            key={`${src}-${index}`}
            className="flex flex-wrap items-center gap-3 rounded-2xl bg-tyv-bg p-3"
          >
            <Thumb src={src} />
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Monter"
                className="rounded-lg border border-tyv-navy/15 bg-white px-3 py-2 text-sm disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === list.length - 1}
                aria-label="Descendre"
                className="rounded-lg border border-tyv-navy/15 bg-white px-3 py-2 text-sm disabled:opacity-30"
              >
                ↓
              </button>
              <ReplaceOne
                onUploaded={(url) =>
                  onChange(list.map((s, i) => (i === index ? url : s)))
                }
                onError={setError}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-700 transition-colors hover:bg-red-50"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <UploadButton
          label="Ajouter une photo"
          onUploaded={(url) => onChange([...list, url])}
          onError={setError}
        />
        <p className="mt-2 text-xs text-tyv-muted">
          JPG, PNG ou WebP · 5 Mo maximum{ratio ? ` · ${ratio}` : ""}
        </p>
      </div>

      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}

function ReplaceOne({
  onUploaded,
  onError,
}: {
  onUploaded: (url: string) => void;
  onError: (message: string | null) => void;
}) {
  return (
    <UploadButton label="Remplacer" onUploaded={onUploaded} onError={onError} />
  );
}
