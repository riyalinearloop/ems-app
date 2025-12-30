import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { AuthPayload } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate payload structure
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const payload: AuthPayload = {
      user: body.user,
      accessToken: body.accessToken,
      session: body.session,
      org: body.org,
      customer: body.customer,
    };

    // Validate required fields
    if (!payload.user || !payload.accessToken || !payload.org) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          received: {
            hasUser: !!payload.user,
            hasAccessToken: !!payload.accessToken,
            hasOrg: !!payload.org,
          },
        },
        { status: 400 }
      );
    }

    try {
      const cookieStore = await cookies();
      const cookieValue = JSON.stringify(payload);

      cookieStore.set("emsAuth", cookieValue, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return NextResponse.json({ success: true });
    } catch (cookieError: any) {
      console.error("Cookie setting error:", cookieError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to set cookie",
          details:
            process.env.NODE_ENV === "development"
              ? cookieError.message
              : undefined,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Set cookie route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process request",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
