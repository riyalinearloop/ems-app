import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(_request: NextRequest) {
  try {
    const cookieStore = await cookies();

    // Clear the emsAuth cookie
    cookieStore.delete("emsAuth");

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: unknown) {
    console.error("Logout error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to logout";
    const errorStack =
      error instanceof Error && process.env.NODE_ENV === "development"
        ? error.stack
        : undefined;

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: errorStack,
      },
      { status: 500 }
    );
  }
}
