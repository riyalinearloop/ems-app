import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth.server";
import { MainLayout } from "@/components/layouts/MainLayout/MainLayout";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }

  return <MainLayout>{children}</MainLayout>;
}
