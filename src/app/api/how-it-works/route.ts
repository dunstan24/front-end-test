import { NextResponse } from "next/server";
import { getHowItWorks } from "@/lib/data";

export async function GET() {
  try {
    const data = await getHowItWorks();
    return NextResponse.json(
      {
        success: true,
        data,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/how-it-works:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", message: "Failed to load how-it-works process data" },
      { status: 500 }
    );
  }
}
