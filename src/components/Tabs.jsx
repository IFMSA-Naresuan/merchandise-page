import WireframeBlock from "./WireframeBlock.jsx";

const tabLabels = ["All", "mednu31", "mednu32", "mednu33"];

export default function Tabs() {
  return (
    <nav
      aria-label="Merchandise groups"
      className="h-10 overflow-hidden border border-slate-400 bg-[#eef2f7] lg:h-12"
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center gap-2 overflow-hidden px-3 lg:gap-3 lg:px-4">
        {tabLabels.map((label) => (
          <WireframeBlock
            key={label}
            label={label}
            dimensions=""
            className="h-7 w-24 lg:h-8 lg:w-[120px]"
          >
            <div>
              <strong className="block text-[10px] font-semibold text-slate-700">
                {label}
              </strong>
              <span className="lg:hidden">96×28</span>
              <span className="hidden lg:inline">120×32</span>
            </div>
          </WireframeBlock>
        ))}
      </div>
    </nav>
  );
}
