import { redirect } from "next/navigation";
import { getServerAuthCookie } from "@/lib/auth.server";
import NotificationsContainer from "@/components/containers/notifications/notificationsContainer";

export default async function NotificationPage() {
  const auth = await getServerAuthCookie();

  if (!auth) {
    redirect("/login");
  }

  return <NotificationsContainer />;
}
