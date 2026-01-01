import { redirect } from "next/navigation";
import { getServerAuthCookie } from "@/lib/auth.server";
import PouchManagementContainer from "@/components/containers/pouchManagement/pouchManagementContainer";

export default async function PouchManagementPage() {
  const auth = await getServerAuthCookie();

  if (!auth) {
    redirect("/login");
  }

  return <PouchManagementContainer />;
}
