import { redirect } from "next/navigation";
import { getServerAuthCookie } from "@/lib/auth.server";
import DashboardContainer from "@/components/containers/dashboard/dashboardContainer";

export default async function DashboardPage() {
  const auth = await getServerAuthCookie();

  if (!auth) {
    redirect("/login");
  }

  const userType =
    auth?.user?.permissionGroup?.type || auth?.user?.userType || "logistic";

  return <DashboardContainer userType={userType as "logistic" | "paramedic"} />;
}
