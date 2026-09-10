import { google } from "googleapis";
import { ExternalAccountClient } from "google-auth-library";

/**
 * Parses Google Drive share URL or =HYPERLINK() formula into a direct image CDN URL.
 * Handles formats like:
 * - =HYPERLINK("https://drive.google.com/file/d/FILE_ID/view?usp=sharing", "H/view...")
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - FILE_ID directly
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
 * 1. Workload Identity Federation via Vercel OIDC (Production)
 * 2. Service Account Private Key (Local Development / Fallback)
 */
export async function getSheetsClient() {
  const serviceAccountEmail =
    process.env.GCP_SERVICE_ACCOUNT_EMAIL ||
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    "merch-catalog-reader@project-07cd9b1e-82c4-4b1f-bf3.iam.gserviceaccount.com";

  let auth;

  // Strategy 1: Workload Identity Federation (Vercel OIDC Provider)
  if (process.env.GCP_WORKLOAD_IDENTITY_PROVIDER && process.env.VERCEL_OIDC_TOKEN) {
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
  }
  // Strategy 2: Service Account Key (Local Development / Fallback)
  else if (process.env.GOOGLE_PRIVATE_KEY) {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
    auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
  } else if (process.env.GOOGLE_API_KEY) {
    return google.sheets({ version: "v4", auth: process.env.GOOGLE_API_KEY });
  } else {
    throw new Error(
      "Missing Google Auth credentials. Please set GOOGLE_PRIVATE_KEY or GCP_WORKLOAD_IDENTITY_PROVIDER in environment variables."
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

  // Get spreadsheet metadata to retrieve exact sheet tab names dynamically
  const spreadsheetMeta = await sheets.spreadsheets.get({
    spreadsheetId,
  });

  const sheetTabs = spreadsheetMeta.data.sheets || [];
  const tabNames = sheetTabs.map((s) => s.properties.title);

  // Find items tab name (or fallback to 1st tab)
  const itemsTabName =
    tabNames.find((name) => name.toLowerCase().includes("item")) ||
    tabNames[0] ||
    "Sheet1";

  // Find variants tab name (or fallback to 2nd tab if present)
  const variantsTabName =
    tabNames.find((name) => name.toLowerCase().includes("variant")) ||
    (tabNames.length > 1 ? tabNames[1] : null);

  // Fetch items and variants using actual tab names with valueRenderOption FORMULA
  const [itemsRes, variantsRes] = await Promise.all([
    sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${itemsTabName}'!A2:F`,
      valueRenderOption: "FORMULA",
    }),

    variantsTabName
      ? sheets.spreadsheets.values
          .get({
            spreadsheetId,
            range: `'${variantsTabName}'!A2:E`,
            valueRenderOption: "FORMULA",
          })
          .catch(() => ({ data: { values: [] } }))
      : Promise.resolve({ data: { values: [] } }),
  ]);

  const rawItems = itemsRes.data.values || [];
  const rawVariants = variantsRes.data.values || [];

  // Parse variants list
  const variants = rawVariants
    .filter((row) => row && row[0] && row[0].toString().trim() !== "")
    .map((row) => ({
      variantId: (row[0] || "").toString().trim(),
      itemId: (row[1] || "").toString().trim(),
      variantName: (row[2] || "Default").toString().trim(),
      quantity: Number((row[3] || "0").toString().replace(/[^0-9.]/g, "")) || 0,
      imgUrl: parseDriveImageUrl((row[4] || "").toString()),
    }));

  // Parse items and attach matching variants
  const validItemRows = rawItems.filter(
    (row) => row && row[0] && row[0].toString().trim() !== ""
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
