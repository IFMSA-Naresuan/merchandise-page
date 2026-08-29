import ProductImage from "./ProductImage.jsx";
import TextLine from "./TextLine.jsx";

export default function ProductCard({ className = "" }) {
  return (
    <article className={`min-w-0 flex-col ${className}`}>
      <ProductImage />

      <div className="flex h-[78px] flex-col items-start justify-center gap-2 border border-t-0 border-slate-400 bg-[#eef2f7] p-2 lg:h-[104px]">
        <TextLine label="name" className="h-2.5 w-[70%]" />

        <div className="flex w-full gap-2">
          <TextLine label="price" className="h-2.5 w-[35%]" />
          <TextLine
            label="batch/gen tag chip (e.g. mednu31)"
            className="h-[18px] w-[40%]"
          />
        </div>

        <TextLine
          label="sold-out badge (conditional)"
          className="h-3.5 w-1/2"
        />
      </div>
    </article>
  );
}
