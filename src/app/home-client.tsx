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
import { BrandMark } from "./brand-mark";
import { ReleaseList } from "./changelog/release-list";
import type { Release } from "./releases";
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
      applicationSubCategory: "Coding agent orchestration app",
      operatingSystem: "macOS, Linux, Windows",
      featureList: [
        "Multi-agent orchestration in one desktop app",
        "Optional worktree isolation for threads, fan-out and comparison",
        "Terminal harness installed alongside, optional to use",
        "Local-first with Ollama and OpenAI-compatible APIs",
      ],
      sameAs: [githubUrl],
    },
  ],
};

export default function HomeClient({
  version,
  releases,
}: {
  version: string | null;
  releases: Release[];
}) {
  const [copied, setCopied] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
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
    setCopied(null);
    setCopyError(null);
    try {
      await navigator.clipboard.writeText(command);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopyError(id);
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
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 sm:py-8">
        <header className="site-header">
          <a className="brand" href="/" aria-label="RustCode home">
            <BrandMark />
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
            <svg
              className="star-icon"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3 2.7 5.45 6.02.87-4.36 4.25 1.03 6-5.39-2.84-5.39 2.84 1.03-6-4.36-4.25 6.02-.87L12 3Z" />
            </svg>
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
            <h1>
              <span className="accent">One app</span> for your
              <br />
              <DrawablyUnderline seed={22}>coding agents</DrawablyUnderline>.
            </h1>
            <p className="hero-description">
              <DrawablyHighlight seed={23}>RustCode</DrawablyHighlight> runs
              Claude Code, Codex, Gemini CLI, OpenCode — or its own agent — side
              by side in one desktop app. Each thread picks its harness, model
              and effort.
            </p>

            <DrawablyCard
              className="install-card"
              seed={30}
              aria-label="Install RustCode"
            >
              <div className="install-card-header">
                <div>
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
                {copyError === selectedInstaller.id && (
                  <output className="copy-error" aria-live="polite">
                    Copy failed. Select and copy the command manually.
                  </output>
                )}
              </div>
              <p className="install-note">
                The installer installs the desktop app and the{" "}
                <code className="way-inline-code">rustcode</code> command
                together. The terminal UI is optional to use; Linux ARM64 gets
                the command only.
              </p>
            </DrawablyCard>

            <DrawablyList className="feature-list" marker="check" seed={40}>
              <li>
                Use separate git worktrees to keep parallel threads isolated.
              </li>
              <li>
                Fan out, compare and merge — with approvals and per-turn
                checkpoints before anything lands.
              </li>
              <li>
                Open source and local-first, with Ollama and OpenAI-compatible
                APIs.
              </li>
            </DrawablyList>
          </div>

          <div className="product-showcase">
            <DrawablyCard className="desktop-card" seed={50}>
              <figure className="desktop-figure">
                <Image
                  className="desktop-image"
                  src="/images/readme-desktop.png"
                  alt="The RustCode desktop app with a thread open"
                  width={1280}
                  height={960}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  priority
                />
                <figcaption className="desktop-caption">
                  <span>The orchestrator — every thread, side by side</span>
                  <span className="desktop-caption-platform">
                    Tauri desktop
                  </span>
                </figcaption>
              </figure>
            </DrawablyCard>
            <DrawablyCard className="terminal-card" seed={53}>
              <figure className="terminal-figure">
                <figcaption className="terminal-label">
                  <code>rustcode</code>
                  <span>Terminal harness</span>
                </figcaption>
                <Image
                  className="terminal-image"
                  src="/images/tui.png"
                  alt="RustCode's terminal harness showing an agent response"
                  width={1078}
                  height={838}
                  sizes="(min-width: 1024px) 20vw, 78vw"
                />
              </figure>
            </DrawablyCard>
            <p className="terminal-caption">
              The terminal command ships with the app.{" "}
              <DrawablyCircle seed={52}>The TUI is optional.</DrawablyCircle>
            </p>
          </div>
        </section>

        <section className="ways" aria-labelledby="ways-title">
          <DrawablyDivider className="ways-divider" seed={55} />
          <div className="ways-heading">
            <h2 id="ways-title">One install, two ways to work</h2>
            <p>
              The installer sets up both surfaces. Drive from the window, drop
              into the terminal — or run both at once.
            </p>
          </div>
          <DrawablyCard className="ways-panel" seed={58}>
            <div className="way">
              <h3>The orchestration app</h3>
              <p>
                A Tauri desktop app that hosts every thread. Pick the harness,
                model and effort per thread, watch what runs and what waits for
                you, and let agents start and message each other.
              </p>
              <DrawablyList className="feature-list" marker="check" seed={56}>
                <li>Start threads in separate worktrees to isolate changes.</li>
                <li>Fan out and compare results side by side.</li>
                <li>Approvals and checkpoints before changes land.</li>
              </DrawablyList>
            </div>
            <div className="way-divider" aria-hidden="true" />
            <div className="way">
              <h3>The terminal harness</h3>
              <p>
                <code>rustcode</code> is installed alongside the app and
                entirely optional. The same agent, in your terminal — inline by
                default, fullscreen when you want it.
              </p>
              <DrawablyList className="feature-list" marker="check" seed={57}>
                <li>Any model, including local ones through Ollama.</li>
                <li>Inline by default; fullscreen is opt-in.</li>
                <li>No dashboard, no lock-in — it&apos;s your shell.</li>
              </DrawablyList>
            </div>
          </DrawablyCard>
        </section>

        <section
          className="product-summary"
          aria-labelledby="product-summary-title"
        >
          <div>
            <h2 id="product-summary-title">
              Open source, local-first, on your machine
            </h2>
            <p>
              The desktop app runs on macOS Apple silicon, Linux x86_64 and
              Windows x64. The terminal harness also supports Linux ARM64.
              Approvals, per-turn checkpoints and review keep you in control.
            </p>
          </div>
          <a
            className="github-link"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the open-source project
            <svg
              className="external-icon"
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 2h5v5M14 2 7 9M12 9v4H3V4h4" />
            </svg>
          </a>
        </section>

        {releases.length > 0 && (
          <section className="changelog" aria-labelledby="changelog-title">
            <div className="changelog-heading">
              <div>
                <h2 id="changelog-title">What&apos;s new in RustCode</h2>
              </div>
              <a className="github-link" href="/changelog">
                View changelog
                <svg
                  className="external-icon"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 2h5v5M14 2 7 9M12 9v4H3V4h4" />
                </svg>
              </a>
            </div>
            <ReleaseList releases={releases} />
          </section>
        )}

        <DrawablyDivider className="footer-divider" seed={60} />
        <footer className="site-footer">
          <span>Open source under Apache-2.0.</span>
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
