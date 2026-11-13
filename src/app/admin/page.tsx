import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import { readContent } from "@/content/store";
import { buildItems } from "@/content/fields";
import { GROUPS } from "@/content/schema";
import { AdminEditor } from "./AdminEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const doc = await readContent();
  return (
    <AdminEditor
      items={buildItems(doc.values)}
      groups={GROUPS}
      updatedAt={doc.updatedAt}
    />
  );
}
