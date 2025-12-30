import { redirect } from "next/navigation";
import { getServerAuthCookie } from "@/lib/auth.server";

export default async function ProtectedPage() {
  const auth = await getServerAuthCookie();

  if (!auth) {
    redirect("/login");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Protected Page</h1>
      <p className="mt-2 text-muted-foreground">
        Logged in as: {auth.user.firstName} {auth.user.lastName}
      </p>
    </main>
  );
}
