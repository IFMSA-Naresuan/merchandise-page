import WireframeBlock from "./WireframeBlock.jsx";
import WireframeIcon from "./WireframeIcon.jsx";

export default function Header() {
  return (
    <header className="h-30 border border-slate-400 bg-[#2b4265]">
      <div className="mx-auto hidden h-full max-w-[1280px] grid-cols-[160px_1fr_160px] items-center px-6 lg:grid">
        <WireframeBlock
          label="Logo"
          descriptions="Logo, hidden for 1024px and higher"
          dimensions="160×40"
          className="h-10 w-40"
        />

        <WireframeBlock
          label="Nav links (Home / Shop / About / Contact)"
          dimensions="360×20"
          className="h-5 w-[360px] justify-self-center"
        />

        <div className="flex justify-self-end gap-4">
          <WireframeIcon label="Search" size={24} />
        </div>
      </div>

      <div className="mx-auto grid h-full max-w-[1280px] grid-cols-[44px_1fr_44px] items-center px-2 lg:hidden">
        <WireframeIcon label="Menu" size={44} />

        <WireframeBlock
          label="Logo"
          dimensions="100×28"
          className="h-7 w-[100px] justify-self-center"
        />

        <div aria-hidden="true" className="size-11" />
      </div>
    </header>
  );
}
