"use client";

import { useEffect, useState } from "react";
import { githubUrl } from "./site";

const format = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function GithubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://api.github.com/repos/LHagfoss/rustcode", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("GitHub request failed");
        }
        return response.json() as Promise<{ stargazers_count?: unknown }>;
      })
      .then((repository) => {
        if (typeof repository.stargazers_count === "number") {
          setStars(repository.stargazers_count);
        }
      })
      .catch(() => setStars(null));

    return () => controller.abort();
  }, []);

  return (
    <a
      className="stars"
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        stars === null
          ? "Star RustCode on GitHub"
          : `Star RustCode on GitHub, ${format.format(stars)} stars`
      }
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.6l2.9 5.86 6.47.94-4.68 4.56 1.1 6.44L12 17.36 6.21 20.4l1.1-6.44-4.68-4.56 6.47-.94L12 2.6z" />
      </svg>
      <span>{stars === null ? "GitHub" : format.format(stars)}</span>
    </a>
  );
}
