import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getMerchandiseProducts } from "../../../lib/sheets.js";

// Force dynamic fetch on every request so data is never cached stale
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const headerList = await headers();
    const oidcToken =
      process.env.VERCEL_OIDC_TOKEN ||
      headerList.get("x-vercel-oidc-token") ||
      headerList.get("authorization")?.replace("Bearer ", "") ||
      request?.headers?.get("x-vercel-oidc-token");

    const products = await getMerchandiseProducts(oidcToken);
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
