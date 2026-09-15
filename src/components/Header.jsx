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
    <header className="site-header" onKeyDown={closeOnEscape}>
      <a className="site-header__skip-link" href="#main-content">{nav.skipLabel}</a>
      <div className="landing-container site-header__inner">
        <a className="site-header__brand" href="#top">
          <span className="site-header__brand-dot" aria-hidden="true" />{nav.brand}
        </a>
        <nav aria-label="Primary navigation" className="site-header__desktop-nav">
          {nav.items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <details ref={menu} className="site-header__mobile-menu">
          <summary ref={menuSummary} className="site-header__menu-toggle">
            {nav.menuLabel}<span aria-hidden="true" />
          </summary>
          <nav aria-label="Primary navigation" className="site-header__mobile-nav">
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
