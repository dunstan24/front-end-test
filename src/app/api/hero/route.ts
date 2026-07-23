import { NextResponse } from "next/server";
import { getHero } from "@/lib/data";

export async function GET() {
  try {
    const data = await getHero();
    return NextResponse.json(
      {
        success: true,
        data,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/hero:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", message: "Failed to load hero section data" },
      { status: 500 }
    );
  }
}
