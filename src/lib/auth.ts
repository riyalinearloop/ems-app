// Client-side auth utilities
export interface AuthPayload {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    userType: string;
  };
  accessToken: string;
  session: any;
  org: string;
  customer?: string;
}

export const setAuthCookie = async (payload: AuthPayload): Promise<void> => {
  if (typeof document !== "undefined") {
    try {
      // Use API route to set httpOnly cookie for better security
      const response = await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to set cookie via API:", errorData);
        // Fallback to client-side cookie if API route fails
        const cookieValue = JSON.stringify(payload);
        document.cookie = `emsAuth=${encodeURIComponent(
          cookieValue
        )}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
      }
    } catch (error) {
      console.error("Error setting cookie:", error);
      // Fallback to client-side cookie if fetch fails
      const cookieValue = JSON.stringify(payload);
      document.cookie = `emsAuth=${encodeURIComponent(
        cookieValue
      )}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    }
  }
};

export const getAuthCookie = (): AuthPayload | null => {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    const emsAuthCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("emsAuth=")
    );

    if (emsAuthCookie) {
      try {
        const cookieValue = decodeURIComponent(emsAuthCookie.split("=")[1]);
        return JSON.parse(cookieValue);
      } catch (error) {
        console.error("Error parsing auth cookie:", error);
        return null;
      }
    }
  }
  return null;
};

export const removeAuthCookie = (): void => {
  if (typeof document !== "undefined") {
    document.cookie = "emsAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

export const logout = async (): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    // Get the current auth cookie to extract sessionId
    const authCookie = getAuthCookie();

    // Call the logout API if we have a session
    if (authCookie?.session?.id && authCookie?.accessToken && authCookie?.org) {
      try {
        const { logoutAPI } = await import("@/lib/api/auth");
        await logoutAPI({
          sessionId: authCookie.session.id,
          Authorization: `Bearer ${authCookie.accessToken}`,
          org: authCookie.org,
        });
      } catch (apiError) {
        // Log error but continue with cookie clearing
        console.error("Logout API error:", apiError);
      }
    }

    // Clear the cookie via API route (httpOnly cookie)
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to clear cookie via API:", error);
      // Fallback to client-side cookie removal
      removeAuthCookie();
    }

    // Also remove client-side cookie as fallback
    removeAuthCookie();

    // Redirect to login page
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
    // Ensure cookie is removed even if there's an error
    removeAuthCookie();
    window.location.href = "/login";
  }
};

export const isAuthenticatedClient = (): boolean => {
  if (typeof window !== "undefined") {
    return getAuthCookie() !== null;
  }
  return false;
};
