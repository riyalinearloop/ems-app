import { NextResponse } from "next/server";
import { getServerAuthCookie } from "@/lib/auth.server";

export async function GET() {
  try {
    const authCookie = await getServerAuthCookie();

    if (!authCookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Return only necessary user info (not sensitive data)
    return NextResponse.json({
      user: {
        id: authCookie.user.id,
        firstName: authCookie.user.firstName,
        lastName: authCookie.user.lastName,
        email: authCookie.user.email,
        userType: authCookie.user.userType,
        permissionGroup: authCookie.user.permissionGroup,
      },
    });
  } catch (error) {
    console.error("Error getting user info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

