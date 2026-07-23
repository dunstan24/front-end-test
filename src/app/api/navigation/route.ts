import { NextResponse } from "next/server";
import { getNavigation } from "@/lib/data";

export async function GET() {
  try {
    const data = await getNavigation();
    return NextResponse.json(
      {
        success: true,
        data,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/navigation:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", message: "Failed to load navigation data" },
      { status: 500 }
    );
  }
}
