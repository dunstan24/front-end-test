import { NextResponse } from "next/server";
import { getTemplates } from "@/lib/data";

/**
 * Endpoint REST API: GET /api/templates
 * 
 * Mengembalikan daftar template unggulan dalam format JSON konsisten.
 * Mendukung Query Parameters:
 * - `category`: Menyaring template berdasarkan kategori (misal: ?category=SaaS)
 * - `query`: Mencari template berdasarkan kata kunci nama/deskripsi (misal: ?query=Aura)
 */
export async function GET(request: Request) {
  try {
    // Ambil parameter URL query dari HTTP Request
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const query = searchParams.get("query") || undefined;

    // Panggil fungsi data layer tunggal untuk mendapatkan data yang telah difilter
    const result = await getTemplates({ category, query });

    // Kembalikan response JSON standar dengan HTTP Status 200 OK
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
    // Tangani error jika terjadi kegagalan pembacaan data (HTTP Status 500)
    console.error("Error pada GET /api/templates:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal Server Error", 
        message: "Gagal mengambil data resource template" 
      },
      { status: 500 }
    );
  }
}
