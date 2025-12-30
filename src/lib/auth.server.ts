// Server-side auth utilities
import { cookies } from "next/headers";
import type { AuthPayload } from "./auth";

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("emsAuth");
    return !!authCookie?.value;
  } catch {
    return false;
  }
};

export const getServerAuthCookie = async (): Promise<AuthPayload | null> => {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("emsAuth");

    if (authCookie?.value) {
      try {
        return JSON.parse(decodeURIComponent(authCookie.value));
      } catch (error) {
        console.error("Error parsing server auth cookie:", error);
        return null;
      }
    }
    return null;
  } catch {
    return null;
  }
};
