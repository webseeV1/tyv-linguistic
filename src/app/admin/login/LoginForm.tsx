"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Connexion impossible.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Connexion impossible. Vérifiez votre réseau.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-tyv-navy"
        >
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-tyv-navy/15 bg-tyv-bg px-4 py-3 text-tyv-text transition-colors focus:border-tyv-sky focus:bg-white"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl bg-tyv-navy px-5 py-3 font-semibold text-white transition-colors hover:bg-tyv-navy-light disabled:opacity-60"
      >
        {busy ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
