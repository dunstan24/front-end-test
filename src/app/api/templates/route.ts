import { NextResponse } from "next/server";
import { getTemplates } from "@/lib/data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const query = searchParams.get("query") || undefined;

    const result = await getTemplates({ category, query });

    return NextResponse.json(
      {
        success: true,
        data: result.featured,
        meta: {
          header: result.header,
          total: result.total,
          filtersApplied: { category: category || null, query: query || null },
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/templates:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", message: "Failed to load templates resource" },
      { status: 500 }
    );
  }
}
