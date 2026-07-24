import { NextResponse } from "next/server";
import { getMarqueeTestimonials } from "@/lib/data";

export async function GET() {
  try {
    const data = await getMarqueeTestimonials();
    return NextResponse.json(
      {
        success: true,
        data,
        meta: { total: data.items.length, timestamp: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/marquee-testimonials:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", message: "Failed to load marquee testimonials" },
      { status: 500 }
    );
  }
}
