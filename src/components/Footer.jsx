export default function Footer() {
  return (
    <footer
      className="
        mx-auto
        flex items-center justify-center
        h-40 overflow-hidden
        border border-zinc-200 bg-slate-50
        p-0.5
        text-center font-mono text-[10px] leading-[1.35] text-slate-500

        lg:h-[140px]
      "
    >
      <div className="max-w-[1280px]">
        <strong className="block text-[10px] font-semibold text-slate-700">
          <span className="lg:hidden">
            Footer (stacked links)
          </span>
          <span className="hidden lg:inline">
            Footer (links / socials / org info)
          </span>
        </strong>
        <span className="lg:hidden">375×160</span>
        <span className="hidden lg:inline">1280×140</span>
      </div>
    </footer>
  );
}
