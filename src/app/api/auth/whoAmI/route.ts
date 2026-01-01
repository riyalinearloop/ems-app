import { NextResponse } from "next/server";
import { getServerAuthCookie } from "@/lib/auth.server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Check if cookie exists
    const cookieStore = await cookies();
    const emsAuthCookie = cookieStore.get("emsAuth");

    if (!emsAuthCookie?.value) {
      console.log("whoAmI: No emsAuth cookie found");
      return NextResponse.json(
        { error: { message: "Unauthorized - No authentication cookie found" } },
        { status: 401 }
      );
    }

    const authCookie = await getServerAuthCookie();

    if (!authCookie) {
      console.log("whoAmI: Failed to parse auth cookie");
      return NextResponse.json(
        { error: { message: "Unauthorized - Invalid authentication cookie" } },
        { status: 401 }
      );
    }

    if (!authCookie.user) {
      console.log("whoAmI: Auth cookie missing user data");
      return NextResponse.json(
        { error: { message: "Unauthorized - Missing user data" } },
        { status: 401 }
      );
    }

    // Determine user type from permissionGroup or userType
    const userType =
      authCookie.user.permissionGroup?.type ||
      (authCookie.user.userType?.toLowerCase() === "paramedic"
        ? "paramedic"
        : "logistic");

    // Return user data in the format expected by the frontend
    return NextResponse.json({
      user: {
        id: authCookie.user.id,
        firstName: authCookie.user.firstName,
        lastName: authCookie.user.lastName,
        email: authCookie.user.email,
        phone: authCookie.user.phone,
        userType: authCookie.user.userType,
        orgId: authCookie.org,
        permissionGroup: authCookie.user.permissionGroup || {
          type: userType,
        },
      },
      session: authCookie.session,
      permissionGroup: authCookie.user.permissionGroup || {
        type: userType,
      },
    });
  } catch (error) {
    console.error("Error in whoAmI API:", error);
    return NextResponse.json(
      { error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
