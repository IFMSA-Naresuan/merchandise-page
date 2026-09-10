import Image from "next/image";

const socialIcons = [
  { name: "Facebook", src: "/icons/facebook.svg", size: 22, url: "https://www.facebook.com/profile.php?id=61592713000806"},
  { name: "Instagram", src: "/icons/instagram.svg", size: 22, url: "https://www.instagram.com/ifmsa_naresuan_th" },
];

{/* NOT IMPLEMENTED
{ name: "YouTube", src: "/icons/youtube.svg", size: 22 },
{ name: "TikTok", src: "/icons/tiktok.svg", size: 22, url: "https://www.tiktok.com/@ifmsa_mednu" },
 */}

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#2b4265] text-white">
      <div className="mx-auto flex min-h-[240px] max-w-[1280px] flex-col items-center px-6 py-8 lg:min-h-[227px]">
        <div
          aria-label="Contact Us"
          className="font-poppins text-4xl font-semibold lg:text-4xl"
        >
          Contact Us
        </div>
      </div>

      <div className="border-t border-white/60">
        <div className="
        mx-auto min-h-[75px] max-w-[1280px] 
        flex flex-col items-center justify-between gap-5 px-6 py-5 
        sm:px-10 
        lg:flex-row lg:gap-8 lg:px-10
        ">
          <p className="font-poppins text-center text-xs font-extralight leading-relaxed tracking-wide lg:text-left lg:text-[12.5px]">
            © Copyright 2026 IFMSA-NU. All rights reserved.
          </p>

          <div className="flex items-center gap-5 lg:gap-7">
            <div
              aria-label="IFMSA social media"
              className="flex items-center gap-5"
            >
              {socialIcons.map((icon) => (
                <a href={icon.url || "#"} key={icon.name} aria-label={icon.name}>
                  <Image
                    key={icon.name}
                    src={icon.src}
                    alt={`${icon.name} contact`}
                    className="brightness-0 invert p-[-2px]"
                    width={icon.size}
                    height={icon.size}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
