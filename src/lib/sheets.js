import { google } from "googleapis";
import { ExternalAccountClient } from "google-auth-library";

const FALLBACK_PRODUCTS = [
  {
    itemId: "pants-32",
    name: "NU Med Pants",
    price: 189,
    defaultImgUrl: "",
    haveVariant: true,
    outOfStock: false,
    variants: [
      { variantId: "pants-default", itemId: "pants-32", variantName: "Default", quantity: 50, imgUrl: "" },
      { variantId: "pants-black", itemId: "pants-32", variantName: "Black", quantity: 50, imgUrl: "" },
      { variantId: "pants-blue", itemId: "pants-32", variantName: "Blue", quantity: 50, imgUrl: "" },
    ],
  },
  {
    itemId: "shoes-32",
    name: "NU Med Shoes",
    price: 99,
    defaultImgUrl: "",
    haveVariant: false,
    outOfStock: false,
    variants: [],
  },
  {
    itemId: "tumbler-30",
    name: "NU Med ThermoShield Tumbler",
    price: 490,
    defaultImgUrl: "",
    haveVariant: false,
    outOfStock: false,
    variants: [],
  },
  {
    itemId: "stickers-31",
    name: "Medical Student Life Stickers",
    price: 89,
    defaultImgUrl: "",
    haveVariant: false,
    outOfStock: false,
    variants: [],
  },
];

/**
 * Parses Google Drive share URL into a direct image CDN URL.
 */
export function parseDriveImageUrl(url) {
  if (!url) return "";
  if (typeof url !== "string") return "";

  if (url.startsWith("http") && !url.includes("drive.google.com") && !url.includes("docs.google.com")) {
    return url;
  }

  let fileId = "";

  const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
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
    return FALLBACK_PRODUCTS;
  }

  try {
    const sheets = await getSheetsClient();

    // Get spreadsheet metadata to retrieve exact sheet tab names dynamically
    const spreadsheetMeta = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheetTabs = spreadsheetMeta.data.sheets || [];
    const tabNames = sheetTabs.map((s) => s.properties.title);

    const itemsTabName =
      tabNames.find((name) => name.toLowerCase().includes("item")) ||
      tabNames[0] ||
      "Sheet1";

    const variantsTabName =
      tabNames.find((name) => name.toLowerCase().includes("variant")) ||
      (tabNames.length > 1 ? tabNames[1] : null);

    const [itemsRes, variantsRes] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `'${itemsTabName}'!A2:F`,
      }),

      variantsTabName
        ? sheets.spreadsheets.values
            .get({
              spreadsheetId,
              range: `'${variantsTabName}'!A2:E`,
            })
            .catch(() => ({ data: { values: [] } }))
        : Promise.resolve({ data: { values: [] } }),
    ]);

    const rawItems = itemsRes.data.values || [];
    const rawVariants = variantsRes.data.values || [];

    const variants = rawVariants.map((row) => ({
      variantId: row[0] || "",
      itemId: row[1] || "",
      variantName: row[2] || "Default",
      quantity: Number(row[3]) || 0,
      imgUrl: parseDriveImageUrl(row[4] || ""),
    }));

    const parsedProducts = rawItems
      .filter((row) => row && row.length > 0 && row[0])
      .map((row) => {
        const itemId = row[0] || "";
        const itemName = row[1] || itemId;
        const price = Number(row[2]) || 0;
        const defaultImgUrl = parseDriveImageUrl(row[3] || "");
        const haveVariant = (row[4] || "").toString().toUpperCase() === "TRUE";
        const outOfStock = (row[5] || "").toString().toUpperCase() === "TRUE";

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

    if (parsedProducts.length > 0) {
      return parsedProducts;
    }
  } catch (err) {
    console.warn("Using fallback merchandise data due to sheet fetch error:", err);
  }

  return FALLBACK_PRODUCTS;
}
