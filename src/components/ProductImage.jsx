export default function ProductImage({ src, alt = "Product Image", className = "" }) {
  if (src) {
    return (
      <div className={`aspect-square w-full overflow-hidden border-b border-slate-200 bg-slate-100 ${className}`}>
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`
        wireframe-image flex aspect-square
        w-full overflow-hidden
        items-center justify-center
        border border-dashed border-slate-400 bg-slate-50
        p-0.5 text-center font-mono text-[10px] leading-[1.35] text-slate-500
        ${className}
      `}
    >
      <div>
        <strong className="block text-[10px] font-semibold text-slate-700">
          Image
        </strong>
        <span className="lg:hidden">166×166</span>
        <span className="hidden lg:inline">290×290</span>
      </div>
    </div>
  );
}
