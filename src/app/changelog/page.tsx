import type { Metadata } from "next";
import Link from "next/link";
import { getReleases } from "../releases";
import { githubUrl, siteUrl } from "../site";
import { InfiniteReleaseList } from "./infinite-release-list";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Release notes and updates for RustCode, the native terminal AI coding agent.",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    title: "RustCode Changelog",
    description:
      "Release notes and updates for the RustCode terminal AI coding agent.",
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
      <div className="page-grain" aria-hidden="true" />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 sm:py-8">
        <header className="site-header">
          <Link className="brand" href="/" aria-label="RustCode home">
            <span className="brand-mark" aria-hidden="true">
              &gt;_
            </span>
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
              <p className="section-kicker">Release notes</p>
              <h1 id="changelog-title">RustCode changelog</h1>
              <p className="changelog-intro">
                What&apos;s new in RustCode, the native terminal AI coding
                agent.
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
          <span>Built for the command line.</span>
          <span className="platform-note">macOS · Linux · Windows</span>
        </footer>
      </div>
    </main>
  );
}
