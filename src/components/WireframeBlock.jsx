export default function WireframeBlock({
  label,
  descriptions,
  dimensions,
  className = "",
  children,
}) {
  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden border border-dashed border-slate-400 bg-slate-50 p-0.5 text-center font-mono text-[10px] leading-[1.35] text-slate-500 ${className}`}>
      {children ?? (
        <div>
          <strong className="block text-[10px] font-semibold text-slate-700">
            {label}
          </strong>
          {dimensions}
        </div>
      )}
    </div>
  );
}
