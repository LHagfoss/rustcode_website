"use client";

import { useEffect } from "react";

// Adds `is-in` to every [data-reveal] element the first time it scrolls into
// view. Content stays visible without JavaScript: the hidden start state only
// applies once `reveal-ready` is on <html>.
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    for (const target of targets) {
      target
        .querySelectorAll<HTMLElement>("[data-stagger] > *")
        .forEach((child, index) => {
          child.style.setProperty("--i", String(index));
        });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    for (const target of targets) {
      // Anything already on screen at load shows immediately.
      if (target.getBoundingClientRect().top < window.innerHeight * 0.9) {
        target.classList.add("is-in");
      } else {
        observer.observe(target);
      }
    }
    root.classList.add("reveal-ready");

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
