import type { Metadata } from "next";
import { getReleases } from "../releases";
import { githubUrl, siteUrl } from "../site";
import { SiteFrame } from "../site-shell";
import { InfiniteReleaseList } from "./infinite-release-list";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Release notes for RustCode, the agentic development environment (ADE) for coding agents.",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    title: "RustCode changelog",
    description:
      "Release notes for RustCode, the agentic development environment (ADE) for coding agents.",
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
    <SiteFrame current="/changelog">
      <div className="wrap">
        <div className="page-head">
          <h1>Changelog</h1>
          <p>
            Release notes for RustCode, the agentic development environment
            (ADE) for coding agents.
          </p>
          <a
            className="text-link"
            href={`${githubUrl}/releases`}
            target="_blank"
            rel="noopener noreferrer"
          >
            All GitHub releases ↗
          </a>
        </div>

        <div className="release-column">
          {releases.length > 0 ? (
            <InfiniteReleaseList
              initialReleases={releases}
              initialHasMore={hasMore}
            />
          ) : (
            <p className="empty-note">
              Release notes are temporarily unavailable. The latest releases are
              on GitHub.
            </p>
          )}
        </div>
      </div>
    </SiteFrame>
  );
}
