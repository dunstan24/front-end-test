import { NextResponse } from "next/server";
import { getCaseStudy } from "@/lib/data";

export async function GET() {
  try {
    const data = await getCaseStudy();
    return NextResponse.json(
      {
        success: true,
        data,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/case-study:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", message: "Failed to load case study data" },
      { status: 500 }
    );
  }
}
