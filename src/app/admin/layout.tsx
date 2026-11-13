import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace TYV",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-tyv-bg text-tyv-text">{children}</div>;
}
