"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { BrandMark } from "./brand-mark";
import { githubUrl } from "./site";

const navItems = [
  { href: "/", label: "App" },
  { href: "/tui", label: "TUI" },
  { href: "/changelog", label: "Changelog" },
] as const;

type Current = "/" | "/tui" | "/changelog";

function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

export function SiteHeader({
  current,
  version,
}: {
  current: Current;
  version: string | null;
}) {
  const installHref = current === "/changelog" ? "/#install" : "#install";
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  // Scroll state + a progress hairline driven by a CSS variable.
  useEffect(() => {
    const header = headerRef.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      header?.style.setProperty(
        "--progress",
        String(max > 0 ? Math.min(1, y / max) : 0),
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function movePill(target: HTMLElement | null) {
    const nav = navRef.current;
    if (!nav || !target) {
      setPill(null);
      return;
    }
    const a = nav.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    setPill({ x: b.left - a.left, w: b.width });
  }

  return (
    <header
      ref={headerRef}
      className="site-header"
      data-scrolled={scrolled || undefined}
      data-open={open || undefined}
    >
      <div className="header-bar">
        <div className="header-start">
          <Link
            className="brand"
            href="/"
            aria-label="RustCode home"
            onClick={() => setOpen(false)}
          >
            <BrandMark />
            <span className="brand-word">RustCode</span>
          </Link>
          {version && (
            <Link
              className="release-chip"
              href="/changelog"
              aria-label={`Latest release ${version}, see the changelog`}
            >
              <span aria-hidden="true" />
              {version}
            </Link>
          )}
        </div>

        <nav
          ref={navRef}
          className="site-nav"
          aria-label="Main"
          onMouseLeave={() => setPill(null)}
        >
          <span
            className="nav-pill"
            aria-hidden="true"
            data-visible={pill ? true : undefined}
            style={
              pill
                ? ({
                    "--pill-x": `${pill.x}px`,
                    "--pill-w": `${pill.w}px`,
                  } as CSSProperties)
                : undefined
            }
          />
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current === item.href ? "page" : undefined}
              onMouseEnter={(event) => movePill(event.currentTarget)}
              onFocus={(event) => movePill(event.currentTarget)}
              onBlur={() => setPill(null)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="gh-button"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RustCode on GitHub"
            data-tip="Source on GitHub"
          >
            <GithubIcon />
          </a>
          <Link className="nav-cta" href={installHref}>
            <span>Install</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M8 3v9M4.5 8.5L8 12l3.5-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <button
            type="button"
            className="menu-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>

        <span className="header-progress" aria-hidden="true" />
      </div>

      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current === item.href ? "page" : undefined}
            tabIndex={open ? undefined : -1}
            style={{ "--i": index } as CSSProperties}
            onClick={() => setOpen(false)}
          >
            {item.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
