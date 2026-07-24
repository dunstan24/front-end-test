import { NextResponse } from "next/server";
import { getTemplates } from "@/lib/data";

/**
 * REST API Endpoint: GET /api/templates
 * 
 * Returns featured template data in a structured JSON format.
 * Supports Query Parameters:
 * - `category`: Filter templates by category (e.g. ?category=SaaS)
 * - `query`: Search templates by keyword in name/description (e.g. ?query=Aura)
 */
export async function GET(request: Request) {
  try {
    // Extract query parameters from URL
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const query = searchParams.get("query") || undefined;

    // Fetch filtered data using single-source data fetcher
    const result = await getTemplates({ category, query });

    // Return standard JSON response with HTTP status 200 OK
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
    // Handle error with HTTP 500 status code
    console.error("Error in GET /api/templates:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal Server Error", 
        message: "Failed to load template resources" 
      },
      { status: 500 }
    );
  }
}
