import { NextResponse } from "next/server";
import { getMerchandiseProducts } from "../../../lib/sheets.js";

// Force dynamic fetch on every request so data is never cached stale
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const products = await getMerchandiseProducts();
    return NextResponse.json(
      {
        success: true,
        count: products.length,
        data: products,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching Google Sheets merchandise data:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch merchandise data",
      },
      { status: 500 }
    );
  }
}
