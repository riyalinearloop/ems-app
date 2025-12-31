import { redirect } from "next/navigation";
import { getServerAuthCookie } from "@/lib/auth.server";
import PouchHistoryContainer from "@/components/containers/pouchHistory/pouchHistoryContainer";

export default async function PouchHistoryPage() {
  const auth = await getServerAuthCookie();

  if (!auth) {
    redirect("/login");
  }

  return <PouchHistoryContainer />;
}

