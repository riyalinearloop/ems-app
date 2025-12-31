import { redirect } from "next/navigation";
import { getServerAuthCookie } from "@/lib/auth.server";
import WithdrawPouchContainer from "@/components/containers/withdrawPouch/withdrawPouchContainer";

export default async function WithdrawPouchPage() {
  const auth = await getServerAuthCookie();

  if (!auth) {
    redirect("/login");
  }

  return <WithdrawPouchContainer />;
}

