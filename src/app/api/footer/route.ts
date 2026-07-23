import { NextResponse } from "next/server";
import { getFooter } from "@/lib/data";

export async function GET() {
  try {
    const data = await getFooter();
    return NextResponse.json(
      {
        success: true,
        data,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/footer:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", message: "Failed to load footer data" },
      { status: 500 }
    );
  }
}
