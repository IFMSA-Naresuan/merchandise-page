"use client";

import { useRef } from "react";
import { landingContent } from "../content/landing.js";

export default function Header() {
  const menu = useRef(null);
  const menuSummary = useRef(null);
  const { nav } = landingContent;

  function closeOnEscape(event) {
    if (event.key === "Escape" && menu.current?.open) {
      menu.current.open = false;
      menuSummary.current?.focus();
    }
  }

  return (
    <header className="landing-header" onKeyDown={closeOnEscape}>
      <a className="skip-link" href="#main-content">{nav.skipLabel}</a>
      <div className="landing-shell header-inner">
        <a className="header-brand" href="#top">
          <span className="brand-node" aria-hidden="true" />{nav.brand}
        </a>
        <nav aria-label="Primary navigation" className="header-navigation">
          {nav.items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <details ref={menu} className="mobile-menu">
          <summary ref={menuSummary} className="menu-toggle">
            {nav.menuLabel}<span aria-hidden="true" />
          </summary>
          <nav aria-label="Primary navigation" className="mobile-navigation">
            {nav.items.map((item) => (
              <a key={item.href} href={item.href} onClick={() => { menu.current.open = false; }}>
                {item.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
