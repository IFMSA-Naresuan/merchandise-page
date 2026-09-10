import { NextResponse } from "next/server";
import { getMerchandiseProducts } from "../../../lib/sheets.js";

// Revalidate API response every 60 seconds
export const revalidate = 60;

export async function GET() {
  try {
    const products = await getMerchandiseProducts();
    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
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
