import ProductCard from "./ProductCard.jsx";

export default function ProductGrid() {
  return (
    <main className="mx-auto max-w-[1280px] p-4 lg:p-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 8 }, (_, index) => (
          <ProductCard
            key={index}
            className={index < 4 ? "flex" : "hidden lg:flex"}
          />
        ))}
      </div>
    </main>
  );
}
