import WireframeBlock from "./WireframeBlock.jsx";
import WireframeIcon from "./WireframeIcon.jsx";
import Image from "next/image";

export default function Header() {
  return (
    <header className="h-30 border border-slate-400 bg-[#2b4265]">
      <div className="mx-auto hidden h-full max-w-[1280px] grid-cols-[160px_1fr_160px] items-center px-6 lg:grid">
        <div>
          <h1 className="
            text-3xl text-white
            font-bold
            tracking-wide
            ">
            I F M S A
          </h1>
        </div>
        <div className="w-[360px] items-center justify-self-center gap-4 lg:flex"/>
        <div className="flex justify-self-end gap-4">
          <button className="bg-transparent border-none cursor-pointer">
          <Image
            src="/icons/search.svg"
            className="invert"
            alt="Search"
            width={24}
            height={24}
          />
          </button>
        </div>
      </div>

      <div className="mx-auto grid h-full max-w-[1280px] grid-cols-[44px_1fr_44px] items-center px-2 lg:hidden">
        <div className="flex justify-self-end gap-4">
          <button className="bg-transparent border-none cursor-pointer">
          <Image
            src="/icons/menu.svg"
            className="invert"
            alt="Menu"
            width={44}
            height={44}
          />
          </button>
        </div>
        <h1 className="
            text-4xl text-white
            font-bold
            tracking-wide
            justify-self-center
            ">
            I F M S A
        </h1>
      </div>

    </header>
  );
}
