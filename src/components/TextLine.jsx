export default function TextLine({ label, className = "" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-sm bg-[#eef2f7] font-mono text-[9px] leading-none text-slate-500 ${className}`}
    >
      {label}
    </div>
  );
}
