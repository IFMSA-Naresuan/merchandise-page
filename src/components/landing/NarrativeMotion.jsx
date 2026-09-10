"use client";

import { useEffect, useRef } from "react";

// All server-rendered content remains visible without JS. Only elements still
// below the viewport are prepared for a one-time reveal; scrolling stays native.
export default function NarrativeMotion({ children }) {
  const root = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(root.current.querySelectorAll("[data-reveal]"));
    let observer;

    function configure() {
      observer?.disconnect();
      elements.forEach((element) => element.removeAttribute("data-reveal-state"));
      if (media.matches || !("IntersectionObserver" in window)) return;

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal-state", "visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

      elements.forEach((element) => {
        if (element.getBoundingClientRect().top >= window.innerHeight) {
          element.setAttribute("data-reveal-state", "pending");
          observer.observe(element);
        }
      });
    }

    configure();
    media.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      media.removeEventListener("change", configure);
      elements.forEach((element) => element.removeAttribute("data-reveal-state"));
    };
  }, []);

  return <div ref={root} className="landing-narrative">{children}</div>;
}
