import { redirect } from "next/navigation";
import { getServerAuthCookie } from "@/lib/auth.server";
import OrderManagementContainer from "@/components/containers/orderManagement/orderManagementContainer";

export default async function OrderManagementPage() {
  const auth = await getServerAuthCookie();

  if (!auth) {
    redirect("/login");
  }

  return <OrderManagementContainer />;
}
