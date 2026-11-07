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

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/", label: "Desktop app" },
      { href: "/tui", label: "Terminal harness" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: githubUrl, label: "GitHub", external: true },
      { href: `${githubUrl}/releases`, label: "Releases", external: true },
      {
        href: `${githubUrl}/blob/main/LICENSE`,
        label: "Apache-2.0",
        external: true,
      },
    ],
  },
  {
    title: "Install",
    links: [
      { href: "/#install", label: "macOS · Linux" },
      { href: "/#install", label: "Windows" },
      { href: "/tui#install", label: "Terminal harness" },
    ],
  },
];

export function SiteFrame({
  current,
  children,
}: {
  current: "/" | "/tui" | "/changelog";
  children: ReactNode;
}) {
  const installHref = current === "/changelog" ? "/#install" : "#install";

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
          </nav>
          <div className="header-actions">
            <GithubStars />
            <Link className="nav-cta" href={installHref}>
              Install
            </Link>
          </div>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="wrap footer-main">
          <div className="footer-brand">
            <Link className="brand" href="/" aria-label="RustCode home">
              <BrandMark />
              <span className="brand-word">RustCode</span>
            </Link>
            <p>
              One app for your coding agents.
              <br />
              Open source, local-first.
            </p>
          </div>
          <div className="footer-columns">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2>{column.title}</h2>
                {column.links.map((link) => (
                  <Link
                    key={`${column.title}-${link.label}`}
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          RustCode
        </div>
        <div className="wrap footer-bottom">
          <span>
            © {new Date().getFullYear()} RustCode · Apache-2.0
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
