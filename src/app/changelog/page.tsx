import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "../brand-mark";
import { getReleases } from "../releases";
import { githubUrl, siteUrl } from "../site";
import { InfiniteReleaseList } from "./infinite-release-list";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Release notes and updates for RustCode, one app for your coding agents.",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    title: "RustCode Changelog",
    description:
      "Release notes and updates for RustCode, the coding agent orchestration app.",
    url: `${siteUrl}/changelog`,
    type: "website",
  },
};

export default async function ChangelogPage() {
  const { releases, hasMore } = await getReleases().catch(() => ({
    version: null,
    releases: [],
    source: "",
    hasMore: false,
  }));

  return (
    <main className="drawably-page min-h-screen overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 sm:py-8">
        <header className="site-header">
          <Link className="brand" href="/" aria-label="RustCode home">
            <BrandMark />
            <span className="brand-name">
              <span>Rust</span>
              <span className="accent">Code</span>
            </span>
          </Link>
          <Link className="github-link" href="/">
            Back to home
          </Link>
        </header>

        <section
          className="changelog changelog-page"
          aria-labelledby="changelog-title"
        >
          <div className="changelog-heading">
            <div>
              <h1 id="changelog-title">RustCode changelog</h1>
              <p className="changelog-intro">
                What&apos;s new in RustCode, the open source orchestration app
                for coding agents.
              </p>
            </div>
            <a
              className="github-link"
              href={`${githubUrl}/releases`}
              target="_blank"
              rel="noopener noreferrer"
            >
              All GitHub releases <span aria-hidden="true">↗</span>
            </a>
          </div>
          {releases.length > 0 ? (
            <InfiniteReleaseList
              initialReleases={releases}
              initialHasMore={hasMore}
            />
          ) : (
            <p className="changelog-empty">
              Release notes are temporarily unavailable. Visit GitHub for the
              latest releases.
            </p>
          )}
        </section>

        <footer className="site-footer">
          <span>Open source under Apache-2.0.</span>
          <span className="platform-note">macOS · Linux · Windows</span>
        </footer>
      </div>
    </main>
  );
}
