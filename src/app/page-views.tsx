"use client";

import { useEffect, useState } from "react";

const format = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function PageViews() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/page-views", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Page view request failed");
        }
        return response.json() as Promise<{ pageviews?: unknown }>;
      })
      .then(({ pageviews }) => {
        if (typeof pageviews === "number") {
          setViews(pageviews);
        }
      })
      .catch(() => setViews(null));

    return () => controller.abort();
  }, []);

  return (
    <span className="page-views" aria-live="polite">
      {views === null ? "" : `${format.format(views)} views`}
    </span>
  );
}
