import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="
        mx-auto
        flex flex-col items-center justify-center
        h-40 overflow-hidden
        border border-zinc-200 bg-slate-50
        p-4
        text-center font-mono text-[10px] leading-[1.35] text-slate-500

        lg:h-[140px]
      "
    >
      <div className="max-w-[1280px] w-full h-full flex flex-col items-center justify-between">
        <div className="flex-1 flex items-center justify-center">
          <strong className="block text-[14px] font-bold text-[#2b4265]">
            <div className="lg:hidden">
              <span>
                Contact Us
              </span>
            </div>
            <div className="hidden lg:inline">
              <div className="my-2 text-[14px] font-bold text-[#2b4265]">
                Contact Us
              </div>
              <Image
                src="/icons/facebook.svg"
                alt="Facebook contact"
                className="mx-3 inline-block"
                width={36}
                height={36}
              />
              <Image
                src="/icons/instagram.svg"
                alt="Instagram contact"
                className="mx-3 inline-block"
                width={36}
                height={36}
              />
              <Image
                src="/icons/youtube.svg"
                alt="YouTube contact"
                className="mx-3 inline-block"
                width={40}
                height={40}
              />
              <Image
                src="/icons/tiktok.svg"
                alt="TikTok contact"
                className="mx-3 inline-block"
                width={36}
                height={36}
              />
            </div>
          </strong>
          {/*
          <span className="lg:hidden">375×160</span>
          <span className="hidden lg:inline">1280×140</span>
          */}
        </div>
        <div className="mt-auto w-full shrink-0 text-center text-[10px] leading-[1.35] text-slate-500 lg:pt-2">
          Copyright © 2026 IFMSA-NU. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
