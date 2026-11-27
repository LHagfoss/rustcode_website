import type { Metadata } from "next";
import Link from "next/link";
import { githubUrl, siteUrl } from "../site";
import { SiteFrame } from "../site-shell";
import { docPages } from "./docs";

const description =
  "Documentation for RustCode, the agentic development environment (ADE): install it, run Claude Code, Codex, Gemini CLI, OpenCode and Pi, and configure the app and rc CLI.";

export const metadata: Metadata = {
  title: "Docs",
  description,
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "RustCode docs",
    description,
    url: `${siteUrl}/docs`,
    type: "website",
  },
};

export default function DocsIndex() {
  return (
    <SiteFrame current="/docs">
      <div className="wrap">
        <div className="page-head">
          <h1>Docs</h1>
          <p>{description}</p>
          <a
            className="text-link"
            href={`${githubUrl}/tree/main/docs`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Every doc on GitHub ↗
          </a>
        </div>
        <ul className="doc-index">
          {docPages.map((page) => (
            <li key={page.slug}>
              <Link href={`/docs/${page.slug}`}>
                <strong>{page.title}</strong>
                <span>{page.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SiteFrame>
  );
}
