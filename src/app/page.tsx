"use client";

import {
  DrawablyBadge,
  DrawablyButton,
  DrawablyCard,
  DrawablyCircle,
  DrawablyDivider,
  DrawablyHighlight,
  DrawablyList,
  DrawablyTabs,
  DrawablyUnderline,
} from "drawably/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  githubUrl,
  siteDescription,
  siteImage,
  siteName,
  siteUrl,
} from "./site";

const installers = [
  {
    id: "macos",
    name: "macOS",
    note: "Bash",
    command: "curl -fsSL https://rustcode.lhagfoss.com/install.sh | bash",
  },
  {
    id: "linux",
    name: "Linux",
    note: "Bash",
    command: "curl -fsSL https://rustcode.lhagfoss.com/install.sh | bash",
  },
  {
    id: "windows",
    name: "Windows",
    note: "PowerShell",
    command: "irm https://rustcode.lhagfoss.com/install.ps1 | iex",
  },
] as const;

type Release = {
  tag: string;
  name: string;
  url: string;
  publishedAt: string | null;
  notes: string[];
};

const releaseDateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatReleaseDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : releaseDateFormatter.format(date);
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: siteName,
      description: siteDescription,
      url: siteUrl,
      image: `${siteUrl}${siteImage}`,
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "Terminal user interface agent harness",
      operatingSystem: "macOS, Linux, Windows",
      featureList: [
        "Terminal pair programming",
        "Native performance",
        "OpenAI-compatible APIs",
        "Ollama support",
      ],
      sameAs: [githubUrl],
    },
  ],
};

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeInstaller, setActiveInstaller] =
    useState<(typeof installers)[number]["id"]>("macos");
  const [stars, setStars] = useState<number | null>(null);
  const [pageViews, setPageViews] = useState<number | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const selectedInstaller =
    installers.find((installer) => installer.id === activeInstaller) ??
    installers[0];
  const activeInstallerIndex = installers.findIndex(
    (installer) => installer.id === activeInstaller,
  );

  useEffect(() => {
    fetch("https://api.github.com/repos/LHagfoss/rustcode")
      .then((response) => {
        if (!response.ok) {
          throw new Error("GitHub request failed");
        }
        return response.json() as Promise<{ stargazers_count: number }>;
      })
      .then((repository) => setStars(repository.stargazers_count))
      .catch(() => setStars(null));
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/page-views")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Page view request failed");
        }
        return response.json() as Promise<{ pageviews?: unknown }>;
      })
      .then(({ pageviews }) => {
        if (!cancelled && typeof pageviews === "number") {
          setPageViews(pageviews);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPageViews(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/releases")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Releases request failed");
        }
        return response.json() as Promise<{
          version?: unknown;
          releases?: unknown;
        }>;
      })
      .then(({ version: latest, releases: entries }) => {
        if (cancelled) {
          return;
        }
        setVersion(typeof latest === "string" ? latest : null);
        setReleases(Array.isArray(entries) ? (entries as Release[]) : []);
      })
      .catch(() => {
        if (!cancelled) {
          setVersion(null);
          setReleases([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function copyCommand(id: string, command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  }

  function openGithub() {
    window.open(githubUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="drawably-page min-h-screen overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <div className="page-grain" aria-hidden="true" />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 sm:py-8">
        <header className="site-header">
          <a className="brand" href="/" aria-label="RustCode home">
            <DrawablyBadge
              className="brand-mark"
              variant="scribble"
              seed={11}
              aria-hidden="true"
            >
              &gt;_
            </DrawablyBadge>
            <span className="brand-name">
              <span>Rust</span>
              <span className="accent">Code</span>
            </span>
          </a>

          <DrawablyButton
            className="star-button"
            variant="outline"
            tone="neutral"
            seed={12}
            onClick={openGithub}
            aria-label="Star RustCode on GitHub"
          >
            <span className="star-icon" aria-hidden="true">
              ☆
            </span>
            <span>Star</span>
            {stars !== null && (
              <span className="star-count">
                {new Intl.NumberFormat().format(stars)}
              </span>
            )}
          </DrawablyButton>
        </header>

        <section className="hero-grid">
          <div className="hero-copy">
            <DrawablyBadge className="eyebrow" variant="scribble" seed={21}>
              Terminal pair programming
            </DrawablyBadge>
            <h1>
              Your codebase.
              <br />
              Your <DrawablyUnderline seed={22}>terminal</DrawablyUnderline>.
              <br />
              <span className="accent">Your AI coding agent.</span>
            </h1>
            <p className="hero-description">
              <DrawablyHighlight seed={23}>RustCode</DrawablyHighlight> is a
              lightweight, native terminal AI coding agent for pair programming
              directly in the projects you already know.
            </p>

            <DrawablyCard
              className="install-card"
              seed={30}
              aria-label="Install RustCode"
            >
              <div className="install-card-header">
                <div>
                  <p className="section-kicker">Get started</p>
                  <h2>Install RustCode</h2>
                </div>
                <DrawablyBadge className="release-badge" seed={31}>
                  {version ?? "latest release"}
                </DrawablyBadge>
              </div>

              <DrawablyTabs
                className="platform-tabs"
                active={activeInstallerIndex}
                seed={32}
                aria-label="Choose your platform"
              >
                {installers.map((installer) => (
                  <button
                    key={installer.id}
                    type="button"
                    role="tab"
                    aria-selected={activeInstaller === installer.id}
                    onClick={() => setActiveInstaller(installer.id)}
                  >
                    {installer.name}
                  </button>
                ))}
              </DrawablyTabs>

              <div
                className="platform-panel"
                key={selectedInstaller.id}
                role="tabpanel"
                aria-label={`${selectedInstaller.name} installer`}
              >
                <div className="command-meta">
                  <span>{selectedInstaller.note}</span>
                  <DrawablyButton
                    className="copy-button"
                    variant={
                      copied === selectedInstaller.id ? "solid" : "outline"
                    }
                    seed={34}
                    onClick={() =>
                      copyCommand(
                        selectedInstaller.id,
                        selectedInstaller.command,
                      )
                    }
                  >
                    {copied === selectedInstaller.id
                      ? "Copied"
                      : "Copy command"}
                  </DrawablyButton>
                </div>
                <code className="command-line">
                  <span className="command-prompt">$</span>
                  {selectedInstaller.command}
                </code>
              </div>
              <p className="install-note">
                The installer fetches the latest verified native release.
              </p>
            </DrawablyCard>

            <DrawablyList className="feature-list" marker="check" seed={40}>
              <li>Fast native performance, with no runtime to manage.</li>
              <li>
                Works in the terminal and inside the projects you already use.
              </li>
              <li>
                Open source, local-first, and compatible with Ollama and
                OpenAI-compatible APIs.
              </li>
            </DrawablyList>
          </div>

          <div className="terminal-column">
            <div className="terminal-halo" aria-hidden="true" />
            <DrawablyCard className="terminal-card" seed={50}>
              <div className="terminal-window">
                <div className="window-bar">
                  <div className="window-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="window-title">
                    <span>Rust</span>
                    <span className="accent">Code</span> — ~/project
                  </span>
                </div>
                <DrawablyDivider className="window-divider" seed={51} />
                <div className="terminal-image-wrap">
                  <Image
                    className="terminal-image"
                    src="/images/header.png"
                    alt="RustCode running in a terminal"
                    width={1078}
                    height={712}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />
                </div>
              </div>
            </DrawablyCard>
            <p className="terminal-caption">
              A calm interface for serious work.{" "}
              <DrawablyCircle seed={52}>No dashboard required.</DrawablyCircle>
            </p>
          </div>
        </section>

        <section
          className="product-summary"
          aria-labelledby="product-summary-title"
        >
          <div>
            <p className="section-kicker">Built for developers</p>
            <h2 id="product-summary-title">
              A native AI coding agent for your terminal
            </h2>
            <p>
              RustCode is a lightweight terminal user interface (TUI) agent
              harness for pair programming, codebase exploration, and everyday
              development. Run it on macOS, Linux, or Windows and connect it to
              Ollama or an OpenAI-compatible API.
            </p>
          </div>
          <a
            className="github-link"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the open-source project <span aria-hidden="true">↗</span>
          </a>
        </section>

        {releases.length > 0 && (
          <section className="changelog" aria-labelledby="changelog-title">
            <div className="changelog-heading">
              <div>
                <p className="section-kicker">Changelog</p>
                <h2 id="changelog-title">What&apos;s new in RustCode</h2>
              </div>
              <a
                className="github-link"
                href={`${githubUrl}/releases`}
                target="_blank"
                rel="noopener noreferrer"
              >
                All releases <span aria-hidden="true">↗</span>
              </a>
            </div>
            <ol className="release-list">
              {releases.map((release) => {
                const date = release.publishedAt
                  ? formatReleaseDate(release.publishedAt)
                  : null;

                return (
                  <li className="release-item" key={release.tag}>
                    <div className="release-meta">
                      <a
                        className="release-tag"
                        href={release.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {release.tag}
                      </a>
                      {release.publishedAt && date && (
                        <time
                          className="release-date"
                          dateTime={release.publishedAt}
                        >
                          {date}
                        </time>
                      )}
                    </div>
                    {release.notes.length > 0 && (
                      <ul className="release-notes">
                        {release.notes.map((note) => (
                          <li key={`${release.tag}-${note}`}>{note}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        <DrawablyDivider className="footer-divider" seed={60} />
        <footer className="site-footer">
          <span>Built for the command line.</span>
          <div className="site-footer-meta">
            <span className="page-view-count" aria-live="polite">
              {pageViews === null
                ? ""
                : `${new Intl.NumberFormat("en", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(pageViews)} views`}
            </span>
            <span className="platform-note">macOS · Linux · Windows</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
