"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";

const FALLBACK_GRID_PRODUCTS = [
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

export default function ProductGrid() {
  const [products, setProducts] = useState(FALLBACK_GRID_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
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

  return (
    <div className="mx-auto max-w-[1280px] p-4 lg:p-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {products.map((product, idx) => (
          <ProductCard key={product.itemId || idx} product={product} />
        ))}
      </div>
    </div>
  );
}
