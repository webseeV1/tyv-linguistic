import { redirect } from "next/navigation";
import { adminConfigured, isAuthenticated } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <div className="rounded-3xl bg-white p-8 shadow-lg shadow-tyv-navy/10 ring-1 ring-tyv-navy/5">
        <h1 className="font-display text-2xl font-bold text-tyv-navy">
          Espace TYV
        </h1>
        <p className="mt-2 text-sm text-tyv-muted">
          Modifiez les textes et les photos de votre site.
        </p>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
            L&apos;espace n&apos;est pas encore activé. Contactez WebSeeVision.
          </p>
        )}
      </div>
    </main>
  );
}
