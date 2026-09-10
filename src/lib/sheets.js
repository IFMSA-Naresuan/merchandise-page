import { google } from "googleapis";
import { ExternalAccountClient } from "google-auth-library";

/**
 * Parses Google Drive share URL or =HYPERLINK() formula into a direct image CDN URL.
 */
export function parseDriveImageUrl(url) {
  if (!url) return "";
  if (typeof url !== "string") return "";

  // If cell is a =HYPERLINK("https://...", "...") formula, extract the 1st argument (the real URL)
  const hyperlinkMatch = url.match(/=HYPERLINK\(\s*["']([^"']+)["']/i);
  if (hyperlinkMatch) {
    url = hyperlinkMatch[1];
  }

  // If already a direct http URL that isn't Google Drive, return as is
  if (url.startsWith("http") && !url.includes("drive.google.com") && !url.includes("docs.google.com")) {
    return url;
  }

  let fileId = "";

  // Extract ID from /file/d/FILE_ID or /d/FILE_ID
  const fileDMatch = url.match(/\/(?:file\/d|d)\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch) {
    fileId = fileDMatch[1];
  } else {
    const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idParamMatch) {
      fileId = idParamMatch[1];
    } else if (url.match(/^[a-zA-Z0-9_-]{20,}$/)) {
      fileId = url;
    }
  }

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return url;
}

/**
 * Initializes Google Auth Client supporting:
 * 1. Service Account Private Key (GOOGLE_PRIVATE_KEY - Highest Priority & Most Reliable)
 * 2. Workload Identity Federation (GCP_WORKLOAD_IDENTITY_PROVIDER + VERCEL_OIDC_TOKEN)
 */
export async function getSheetsClient() {
  const serviceAccountEmail =
    process.env.GCP_SERVICE_ACCOUNT_EMAIL ||
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    "merch-catalog-reader@project-07cd9b1e-82c4-4b1f-bf3.iam.gserviceaccount.com";

  let auth;

  // Strategy 1: Service Account Key (Highest Priority & Most Reliable)
  if (process.env.GOOGLE_PRIVATE_KEY) {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
    auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
  }
  // Strategy 2: Workload Identity Federation (Vercel OIDC Token)
  else if (process.env.GCP_WORKLOAD_IDENTITY_PROVIDER && process.env.VERCEL_OIDC_TOKEN) {
    auth = ExternalAccountClient.fromJSON({
      type: "external_account",
      audience: `//iam.googleapis.com/${process.env.GCP_WORKLOAD_IDENTITY_PROVIDER}`,
      subject_token_type: "urn:ietf:params:oauth:token-type:id_token",
      token_url: "https://sts.googleapis.com/v1/token",
      service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${serviceAccountEmail}:generateAccessToken`,
      subject_token_supplier: {
        getSubjectToken: async () => process.env.VERCEL_OIDC_TOKEN,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
  } else if (process.env.GCP_WORKLOAD_IDENTITY_PROVIDER && !process.env.VERCEL_OIDC_TOKEN) {
    throw new Error(
      "GCP_WORKLOAD_IDENTITY_PROVIDER is set, but Vercel OIDC Token is not enabled on this project. Please set GOOGLE_PRIVATE_KEY in Vercel Environment Variables instead."
    );
  } else if (process.env.GOOGLE_API_KEY) {
    return google.sheets({ version: "v4", auth: process.env.GOOGLE_API_KEY });
  } else {
    throw new Error(
      "Missing Google Auth credentials. Please set GOOGLE_PRIVATE_KEY in Vercel Environment Variables."
    );
  }

  return google.sheets({ version: "v4", auth });
}

/**
 * Fetches items and variants from Google Sheet dynamically.
 */
export async function getMerchandiseProducts() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID environment variable is missing.");
  }

  const sheets = await getSheetsClient();

  // 1. Retrieve exact tab names from spreadsheet metadata
  let tabNames = [];
  try {
    const spreadsheetMeta = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetTabs = spreadsheetMeta.data.sheets || [];
    tabNames = sheetTabs.map((s) => s.properties.title);
  } catch (metaErr) {
    console.warn("Metadata fetch failed, defaulting to Sheet1/Sheet2:", metaErr.message);
  }

  const itemsTabName =
    tabNames.find((name) => name.toLowerCase().includes("item")) ||
    tabNames[0] ||
    "Sheet1";

  const variantsTabName =
    tabNames.find((name) => name.toLowerCase().includes("variant")) ||
    (tabNames.length > 1 ? tabNames[1] : null);

  // Helper to fetch sheet values safely
  async function fetchSheetValues(tabName, rangeCols) {
    const range = tabName ? `'${tabName}'!${rangeCols}` : rangeCols;
    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
        valueRenderOption: "FORMULA",
      });
      if (res.data && res.data.values && res.data.values.length > 0) {
        return res.data.values;
      }
    } catch (err) {
      console.warn(`FORMULA mode failed for ${range}, trying default:`, err.message);
    }

    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      return res.data?.values || [];
    } catch (err) {
      console.error(`Failed to fetch range ${range}:`, err.message);
      return [];
    }
  }

  const [rawItems, rawVariants] = await Promise.all([
    fetchSheetValues(itemsTabName, "A2:F"),
    variantsTabName ? fetchSheetValues(variantsTabName, "A2:E") : Promise.resolve([]),
  ]);

  // Parse variants list
  const variants = rawVariants
    .filter((row) => row && row[0] && row[0].toString().trim() !== "" && row[0].toString().toLowerCase() !== "variant_id")
    .map((row) => ({
      variantId: (row[0] || "").toString().trim(),
      itemId: (row[1] || "").toString().trim(),
      variantName: (row[2] || "Default").toString().trim(),
      quantity: Number((row[3] || "0").toString().replace(/[^0-9.]/g, "")) || 0,
      imgUrl: parseDriveImageUrl((row[4] || "").toString()),
    }));

  // Parse items list
  const validItemRows = rawItems.filter(
    (row) => row && row[0] && row[0].toString().trim() !== "" && row[0].toString().toLowerCase() !== "item_id"
  );

  const products = validItemRows.map((row) => {
    const itemId = (row[0] || "").toString().trim();
    const itemName = (row[1] || "").toString().trim();
    const price = Number((row[2] || "0").toString().replace(/[^0-9.]/g, "")) || 0;
    const defaultImgUrl = parseDriveImageUrl((row[3] || "").toString());
    const haveVariant = (row[4] || "").toString().toUpperCase().includes("TRUE");
    const outOfStock = (row[5] || "").toString().toUpperCase().includes("TRUE");

    const itemVariants = variants.filter((v) => v.itemId === itemId);

    return {
      itemId,
      name: itemName,
      price,
      defaultImgUrl,
      haveVariant,
      outOfStock,
      variants: itemVariants,
    };
  });

  return products;
}
