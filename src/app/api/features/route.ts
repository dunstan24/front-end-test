import { NextResponse } from "next/server";
import { getFeatures } from "@/lib/data";

export async function GET() {
  try {
    const data = await getFeatures();
    return NextResponse.json(
      {
        success: true,
        data,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/features:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", message: "Failed to load features data" },
      { status: 500 }
    );
  }
}
