import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "./brand-mark";
import { PageViews } from "./page-views";
import { getReleases } from "./releases";
import { ScrollReveal } from "./scroll-reveal";
import { githubUrl } from "./site";
import { SiteHeader } from "./site-header";

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

export async function SiteFrame({
  current,
  children,
}: {
  current: "/" | "/tui" | "/changelog";
  children: ReactNode;
}) {
  const { version } = await getReleases().catch(() => ({ version: null }));

  return (
    <div className="site-shell">
      <SiteHeader current={current} version={version} />
      <main className="site-main">{children}</main>
      <ScrollReveal />
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
        <div className="wrap footer-bottom">
          <span>
            © {new Date().getFullYear()} RustCode · Apache-2.0
            <PageViews />
          </span>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          RustCode
        </div>
      </footer>
    </div>
  );
}
