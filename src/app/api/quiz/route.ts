import { NextResponse } from "next/server";
import { getQuiz } from "@/lib/data";

export async function GET() {
  try {
    const data = await getQuiz();
    return NextResponse.json(
      {
        success: true,
        data,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/quiz:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", message: "Failed to load quiz data" },
      { status: 500 }
    );
  }
}
