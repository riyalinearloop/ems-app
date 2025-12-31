import { redirect } from "next/navigation";
import { isAuthenticated, getServerAuthCookie } from "@/lib/auth.server";
import { MainLayout } from "@/components/layouts/MainLayout/MainLayout";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }

  const authCookie = await getServerAuthCookie();

  const userType =
    authCookie?.user?.permissionGroup?.type ||
    authCookie?.user?.userType ||
    "logistic";

  return (
    <MainLayout userType={userType as "logistic" | "paramedic"}>
      {children}
    </MainLayout>
  );
}
