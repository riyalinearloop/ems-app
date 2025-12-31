import { redirect } from "next/navigation";
import { getServerAuthCookie } from "@/lib/auth.server";
import ReturnPouchContainer from "@/components/containers/returnPouch/returnPouchContainer";

export default async function ReturnPouchPage() {
  const auth = await getServerAuthCookie();

  if (!auth) {
    redirect("/login");
  }

  return <ReturnPouchContainer />;
}

