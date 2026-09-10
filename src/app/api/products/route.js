import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getMerchandiseProducts } from "../../../lib/sheets.js";
import { getVercelOidcToken } from "@vercel/oidc";

// Force dynamic fetch on every request so data is never cached stale
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  let oidcTokenDetected = false;
  let oidcTokenPreview = null;
  
  try {
    const headerList = await headers();
    let oidcToken =
      process.env.VERCEL_OIDC_TOKEN ||
      headerList.get("x-vercel-oidc-token") ||
      headerList.get("authorization")?.replace("Bearer ", "");

    if (!oidcToken) {
      try {
        oidcToken = await getVercelOidcToken();
      } catch (e) {
        // SDK fallback check
      }
    }

    if (oidcToken) {
      oidcTokenDetected = true;
      oidcTokenPreview = `${oidcToken.substring(0, 10)}...`;
    }

    const products = await getMerchandiseProducts(oidcToken);

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        diagnostics: {
          hasSheetId: Boolean(process.env.GOOGLE_SHEET_ID),
          hasWifProvider: Boolean(process.env.GCP_WORKLOAD_IDENTITY_PROVIDER),
          hasServiceAccountEmail: Boolean(process.env.GCP_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL),
          oidcTokenDetected,
          oidcTokenPreview,
        },
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
        diagnostics: {
          hasSheetId: Boolean(process.env.GOOGLE_SHEET_ID),
          hasWifProvider: Boolean(process.env.GCP_WORKLOAD_IDENTITY_PROVIDER),
          hasServiceAccountEmail: Boolean(process.env.GCP_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL),
          oidcTokenDetected,
          oidcTokenPreview,
          errorStack: error.stack || null,
        },
      },
      { status: 500 }
    );
  }
}
