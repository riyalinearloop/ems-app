import { redirect } from "next/navigation";
import { getServerAuthCookie } from "@/lib/auth.server";
import InventoryTransferContainer from "@/components/containers/inventoryTransfer/inventoryTransferContainer";

export default async function InventoryTransferPage() {
  const auth = await getServerAuthCookie();

  if (!auth) {
    redirect("/login");
  }

  return <InventoryTransferContainer />;
}
