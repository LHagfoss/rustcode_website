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

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeInstaller, setActiveInstaller] =
    useState<(typeof installers)[number]["id"]>("macos");
  const [stars, setStars] = useState<number | null>(null);
  const [pageViews, setPageViews] = useState<number | null>(null);
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
    window.open(
      "https://github.com/LHagfoss/rustcode",
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main className="drawably-page min-h-screen overflow-hidden">
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

          <div className="github-actions">
            <DrawablyButton
              className="github-button"
              variant="outline"
              tone="neutral"
              seed={12}
              onClick={openGithub}
            >
              <svg
                className="github-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.45 11.45 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.76.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
              </svg>
              <span className="github-label">GitHub</span>
            </DrawablyButton>

            <DrawablyButton
              className="star-button"
              variant="outline"
              tone="neutral"
              seed={13}
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
          </div>
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
              <span className="accent">Your agent.</span>
            </h1>
            <p className="hero-description">
              <DrawablyHighlight seed={23}>RustCode</DrawablyHighlight> is a
              fast, native terminal agent for pair programming directly in the
              projects you already know.
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
                  latest release
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
              <li>Open source, local-first, and built for calm focus.</li>
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
