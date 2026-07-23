import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const template = searchParams.get("template") || undefined;

    const result = await getTestimonials({ template });

    return NextResponse.json(
      {
        success: true,
        data: result.grid,
        meta: {
          header: result.header,
          total: result.total,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/testimonials:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: "Failed to load testimonials resource data",
      },
      { status: 500 }
    );
  }
}
