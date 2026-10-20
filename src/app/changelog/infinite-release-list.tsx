"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Release } from "../releases";
import { ReleaseList } from "./release-list";

type ReleasesPage = {
  releases?: unknown;
  hasMore?: unknown;
};

export function InfiniteReleaseList({
  initialReleases,
  initialHasMore,
}: {
  initialReleases: Release[];
  initialHasMore: boolean;
}) {
  const [releases, setReleases] = useState(initialReleases);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(2);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const inFlightRef = useRef(false);
  const loadMore = useCallback(async () => {
    if (inFlightRef.current || !hasMore) {
      return;
    }

    inFlightRef.current = true;
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`/api/releases?page=${page}`);
      if (!response.ok) {
        throw new Error("Could not load more releases");
      }

      const result = (await response.json()) as ReleasesPage;
      const nextReleases = Array.isArray(result.releases)
        ? (result.releases as Release[])
        : [];
      const receivedTags = new Set(nextReleases.map((release) => release.tag));

      setReleases((current) => {
        const existingTags = new Set(current.map((release) => release.tag));
        return [
          ...current,
          ...nextReleases.filter((release) => !existingTags.has(release.tag)),
        ];
      });

      setPage((currentPage) => currentPage + 1);
      setHasMore(
        result.hasMore === true && receivedTags.size > 0 && page < 100,
      );
    } catch {
      setError(true);
    } finally {
      inFlightRef.current = false;
      setLoading(false);
    }
  }, [hasMore, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (
      !sentinel ||
      !hasMore ||
      page > 100 ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadMore();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore, page]);

  return (
    <>
      <ReleaseList releases={releases} />
      {hasMore && (
        <div className="release-load-more" ref={sentinelRef}>
          {error && (
            <p className="changelog-empty" role="alert">
              Couldn&apos;t load more releases. Please try again.
            </p>
          )}
          <button
            className="release-load-more-button"
            type="button"
            onClick={() => void loadMore()}
            disabled={loading}
          >
            {loading ? "Loading releases…" : error ? "Try again" : "Load more"}
          </button>
          <span className="sr-only" aria-live="polite">
            {loading
              ? "Loading more releases"
              : `${releases.length} releases loaded`}
          </span>
        </div>
      )}
    </>
  );
}
