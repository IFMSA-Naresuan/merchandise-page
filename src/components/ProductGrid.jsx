"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setProducts(json.data);
        }
      } catch (err) {
        console.warn("Could not fetch merchandise products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1280px] p-4 lg:p-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-200/60" />
          ))}
        </div>
      </div>
    );
  }

  // If no items to show in catalog, display "OUT OF STOCK" fallback banner
  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-[1280px] p-8 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
            🏷️
          </div>
          <h3 className="font-poppins text-xl font-bold text-slate-800 uppercase tracking-wide">
            OUT OF STOCK
          </h3>
          <p className="mt-2 text-sm text-slate-500 font-poppins">
            There are currently no items available in the catalog. Please check back later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] p-4 lg:p-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.itemId} product={product} />
        ))}
      </div>
    </div>
  );
}
