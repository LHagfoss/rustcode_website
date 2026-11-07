import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "./brand-mark";
import { GithubStars } from "./github-stars";
import { PageViews } from "./page-views";
import { githubUrl } from "./site";

const navItems = [
  { href: "/", label: "App" },
  { href: "/tui", label: "TUI" },
  { href: "/changelog", label: "Changelog" },
] as const;

export function SiteFrame({
  current,
  children,
}: {
  current: "/" | "/tui" | "/changelog";
  children: ReactNode;
}) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="wrap header-inner">
          <Link className="brand" href="/" aria-label="RustCode home">
            <BrandMark />
            <span className="brand-word">RustCode</span>
          </Link>
          <nav className="site-nav" aria-label="Main">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <GithubStars />
          </nav>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="wrap footer-inner">
          <span>
            Apache-2.0
            <PageViews />
          </span>
          <span className="footer-links">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <Link href="/tui">TUI</Link>
            <Link href="/changelog">Changelog</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
