import { redirect } from "next/navigation";
import { getServerAuthCookie } from "@/lib/auth.server";
import LivePouchContainer from "@/components/containers/livePouchStatus/livePouchContainer";

export default async function LivePouchStatusPage() {
  const auth = await getServerAuthCookie();

  if (!auth) {
    redirect("/login");
  }

  return <LivePouchContainer />;
}

