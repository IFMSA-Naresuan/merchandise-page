"use client";

import { useState } from "react";

// Map common color names to CSS hex codes for variant selector dots
const COLOR_MAP = {
  black: "#1e293b",
  blue: "#2563eb",
  navy: "#1e3a8a",
  red: "#dc2626",
  green: "#166534",
  teal: "#16766c",
  white: "#ffffff",
  grey: "#64748b",
  gray: "#64748b",
  pink: "#ec4899",
  yellow: "#eab308",
  purple: "#9333ea",
};

function getVariantColor(variantName = "") {
  const normalized = variantName.toLowerCase().trim();
  for (const [key, color] of Object.entries(COLOR_MAP)) {
    if (normalized.includes(key)) {
      return color;
    }
  }
  return null;
}

export default function ProductCard({ product }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  if (!product) return null;

  const {
    name,
    price,
    defaultImgUrl,
    outOfStock,
    variants = [],
  } = product;

  // Selected variant & active image logic
  const activeVariant = variants[selectedVariantIndex];
  const activeImage = activeVariant?.imgUrl || defaultImgUrl;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Top Image Box */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        {activeImage ? (
          <img
            src={activeImage}
            alt={activeVariant?.variantName ? `${name} - ${activeVariant.variantName}` : name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xs font-medium text-slate-400">
            No Image
          </div>
        )}

        {/* Out of Stock Overlay Badge */}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
            <span className="rounded-full bg-rose-600 px-3 py-1 font-poppins text-xs font-bold uppercase tracking-wider text-white shadow-md">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
        <div>
          {/* Top Meta: Tag Chip + Variant Selector Dots */}
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <span className="inline-block rounded-full bg-[#eaf4f2] px-2.5 py-0.5 font-poppins text-[11px] font-semibold text-[#16766c]">
              MEDNU Official
            </span>

            {/* Interactive Variant Dots */}
            {variants.length > 1 && (
              <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Product variants">
                {variants.map((v, idx) => {
                  const hexColor = getVariantColor(v.variantName);
                  const isSelected = selectedVariantIndex === idx;

                  return (
                    <button
                      key={v.variantId || idx}
                      type="button"
                      onClick={() => setSelectedVariantIndex(idx)}
                      title={v.variantName}
                      className={`h-3.5 w-3.5 rounded-full border transition-all cursor-pointer ${
                        isSelected
                          ? "ring-2 ring-[#16766c] ring-offset-1 scale-110 border-transparent"
                          : "border-slate-300 opacity-70 hover:opacity-100"
                      }`}
                      style={{
                        backgroundColor: hexColor || "#16766c",
                      }}
                    >
                      <span className="sr-only">{v.variantName}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Title */}
          <h4 className="font-poppins text-sm font-semibold text-slate-800 line-clamp-1 sm:text-base">
            {name}
          </h4>

          {/* Subtitle / Variant Label */}
          <p className="mt-0.5 text-xs text-slate-400 font-poppins line-clamp-1">
            {activeVariant?.variantName && activeVariant.variantName !== "Default"
              ? `Variant: ${activeVariant.variantName}`
              : "IFMSA-NU Merchandise"}
          </p>
        </div>

        {/* Bottom Bar: Price Only (No "ใส่ตะกร้า" button) */}
        <div className="mt-2 flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400">
              ราคา
            </span>
            <span className="font-poppins text-lg font-bold text-slate-900 sm:text-xl">
              ฿{price}
            </span>
          </div>

          {outOfStock ? (
            <span className="font-poppins text-xs font-semibold text-rose-500">
              Out of Stock
            </span>
          ) : (
            <span className="font-poppins text-xs font-medium text-emerald-600">
              Available
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
