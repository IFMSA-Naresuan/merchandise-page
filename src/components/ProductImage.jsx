export default function ProductImage({ className = "" }) {
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
