import { redirect } from "next/navigation";
import { getServerAuthCookie } from "@/lib/auth.server";
import IncidentsContainer from "@/components/containers/incidents/incidentsContainer";

export default async function IncidentsPage() {
  const auth = await getServerAuthCookie();

  if (!auth) {
    redirect("/login");
  }

  return <IncidentsContainer />;
}

