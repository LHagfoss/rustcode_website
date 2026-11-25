import Link from "next/link";
import type { CSSProperties } from "react";
import { AppShowcase } from "./app-showcase";
import { HarnessIcon, type HarnessId } from "./harness-icons";
import { InstallBox } from "./install-box";
import { getReleases } from "./releases";
import {
  githubUrl,
  siteDescription,
  siteImage,
  siteName,
  siteUrl,
} from "./site";
import { SiteFrame } from "./site-shell";
export const revalidate = 900;
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
      applicationSubCategory: "Agentic development environment (ADE)",
      operatingSystem: "macOS, Linux, Windows",
      license: "https://www.apache.org/licenses/LICENSE-2.0",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Per-thread agent, model and effort",
        "Parallel threads in separate git worktrees",
        "Threads that start and message other threads",
        "Approvals, per-turn checkpoints and review",
      ],
      sameAs: [githubUrl],
    },
  ],
};

const harnesses: { id: HarnessId; name: string; tag: string }[] = [
  { id: "claude", name: "Claude Code", tag: "anthropic" },
  { id: "codex", name: "Codex", tag: "openai" },
  { id: "gemini", name: "Gemini CLI", tag: "google" },
  { id: "opencode", name: "OpenCode", tag: "open source" },
  { id: "pi", name: "Pi", tag: "open source" },
  { id: "rustcode", name: "RustCode", tag: "built in" },
];

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M3 8.5l3.2 3L13 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubMark() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

function Checklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="checklist" data-stagger>
      {items.map((item) => (
        <li key={item}>
          <Check />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function Home() {
  const { version } = await getReleases().catch(() => ({ version: null }));
  return (
    <SiteFrame current="/">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <section className="home-hero" aria-labelledby="hero-title">
        <div className="home-hero-grid" aria-hidden="true" />
        <div className="container home-hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow" data-rise>
              <span className="hero-stack" aria-hidden="true">
                {harnesses.map((h, index) => (
                  <span
                    key={h.id}
                    className="hero-stack-icon"
                    style={{ "--i": index } as CSSProperties}
                  >
                    <HarnessIcon id={h.id} />
                  </span>
                ))}
              </span>
              Six harnesses, one window
            </p>
            <h1 id="hero-title" className="display home-title">
              <span data-rise style={{ "--d": "60ms" } as CSSProperties}>
                The open-source
              </span>{" "}
              <span data-rise style={{ "--d": "140ms" } as CSSProperties}>
                development environment
              </span>{" "}
              <span
                className="home-title-accent"
                data-rise
                style={{ "--d": "220ms" } as CSSProperties}
              >
                for coding agents.
              </span>
            </h1>
          </div>
          <div
            className="hero-aside"
            data-rise
            style={{ "--d": "320ms" } as CSSProperties}
          >
            <p className="home-sub">
              Run Claude Code, Codex, Gemini CLI, OpenCode, Pi and our own
              harness side by side in one desktop app. Local-first. No account.
            </p>
            <div className="home-actions">
              <a
                className="btn btn-primary btn-lg"
                href="#install"
                data-hero-cta
              >
                <svg
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    d="M8 2v8.5M4.5 7.5L8 11l3.5-3.5M3 14h10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Install RustCode
              </a>
              <a
                className="btn btn-ghost btn-lg"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubMark />
                Source
              </a>
            </div>
            <p className="home-also">
              Also in your terminal: <Link href="/tui">rustcode TUI</Link>
            </p>
          </div>
        </div>
        <div
          className="container"
          data-rise
          style={{ "--d": "460ms" } as CSSProperties}
        >
          <AppShowcase />
        </div>
      </section>

      <section className="sec" aria-labelledby="harness-title">
        <div className="container">
          <div className="sec-head" data-reveal>
            <h2 id="harness-title" className="display sec-title">
              Bring your own harness
            </h2>
            <p className="sec-lede">
              RustCode doesn&apos;t resell tokens. Sign in to the agents you
              already use, then pick the harness, model and effort for each
              thread.
            </p>
          </div>
          <ul className="harness-row" data-reveal data-stagger>
            {harnesses.map((h) => (
              <li key={h.name} className="harness-cell">
                <span className="harness-glyph" aria-hidden="true">
                  <HarnessIcon id={h.id} />
                </span>
                <span className="harness-meta">
                  <strong>{h.name}</strong>
                  <code>{h.tag}</code>
                </span>
              </li>
            ))}
          </ul>
          <ul className="harness-foot" data-reveal data-stagger>
            <li>
              <Check /> Your subscriptions, your keys.
            </li>
            <li>
              <Check /> Switch harness per thread.
            </li>
            <li>
              <Check /> Threads stay on your machine.
            </li>
          </ul>
        </div>
      </section>

      <section className="sec" aria-labelledby="parallel-title">
        <div className="container feature">
          <div className="feature-visual" aria-hidden="true" data-reveal>
            <div className="card ui-card">
              <div className="ui-card-head">
                <span>Threads</span>
                <span className="ui-dim">rustcode</span>
              </div>
              <ul className="ui-threads" data-stagger>
                <li>
                  <span className="ui-dot is-run" />
                  <span className="ui-thread-title">Add release feed</span>
                  <code>Claude Code · high</code>
                  <span className="ui-status">Running</span>
                </li>
                <li>
                  <span className="ui-dot is-wait" />
                  <span className="ui-thread-title">Fix Windows installer</span>
                  <code>Codex · medium</code>
                  <span className="ui-status is-wait">Approval</span>
                </li>
                <li>
                  <span className="ui-dot is-ok" />
                  <span className="ui-thread-title">Write changelog page</span>
                  <code>RustCode · low</code>
                  <span className="ui-status is-ok">Ready</span>
                </li>
              </ul>
              <div className="ui-branch">
                <code>⎇ wt/release-feed</code>
                <code>⎇ wt/win-installer</code>
                <code>⎇ wt/changelog</code>
              </div>
            </div>
          </div>
          <div className="feature-copy" data-reveal>
            <h2 id="parallel-title" className="display sec-title">
              Parallel threads.
              <br />
              Separate worktrees.
            </h2>
            <p className="sec-lede">
              Give each thread its own git worktree, so parallel work never
              lands in the same checkout. Agents can start and message other
              threads to fan out a task.
            </p>
            <Checklist
              items={[
                "Harness, model and effort per thread",
                "One git worktree per thread",
                "Threads that start and message threads",
                "Everything in view in one window",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="review-title">
        <div className="container feature is-reverse">
          <div className="feature-visual" aria-hidden="true" data-reveal>
            <div className="card ui-card">
              <div className="ui-card-head">
                <span>Fix Windows installer</span>
                <span className="ui-ok">Ready</span>
              </div>
              <p className="ui-sub">
                <code>⎇ wt/win-installer → main · +42 −9 · 3 turns</code>
              </p>
              <ul className="ui-files" data-stagger>
                <li>
                  <code>install.ps1</code>
                  <code>
                    <em>+31</em> <i>−6</i>
                  </code>
                </li>
                <li>
                  <code>src/app/install-box.tsx</code>
                  <code>
                    <em>+9</em> <i>−3</i>
                  </code>
                </li>
                <li>
                  <code>README.md</code>
                  <code>
                    <em>+2</em> <i>−0</i>
                  </code>
                </li>
              </ul>
              <div className="ui-card-actions">
                <span className="ui-btn">Checkpoints</span>
                <span className="ui-btn">Review diff</span>
                <span className="ui-btn is-solid">Merge PR</span>
              </div>
            </div>
            <div className="ui-connector" />
            <div className="ui-approval">
              <span>
                Run <code>pwsh ./install.ps1 -DryRun</code>?
              </span>
              <span className="ui-btn">Deny</span>
              <span className="ui-btn is-solid">Approve</span>
            </div>
          </div>
          <div className="feature-copy" data-reveal>
            <h2 id="review-title" className="display sec-title">
              Stay in the loop,
              <br />
              from prompt to PR.
            </h2>
            <p className="sec-lede">
              Agents ask before they act. Step back to any turn, review the diff
              and merge the pull request without leaving the app.
            </p>
            <Checklist
              items={[
                "Approval requests you answer inline",
                "Per-turn checkpoints to roll back to",
                "Diff review before anything ships",
                "Pull requests through review and merge",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="open-title">
        <div className="container">
          <h2
            id="open-title"
            className="display sec-title is-center"
            data-reveal
          >
            Don&apos;t like something?
            <br />
            Change it.
          </h2>
          <div className="open-grid">
            <div className="card open-term" aria-hidden="true" data-reveal>
              <div className="open-term-head">
                <span />
                <span />
                <span />
                <span className="open-term-title">~/code</span>
              </div>
              <div className="open-term-body" data-stagger>
                <div>
                  <span className="prompt">$</span>git clone
                  https://github.com/LHagfoss/rustcode
                </div>
                <div className="dim">✓ Cloned into ./rustcode</div>
                <div>
                  <span className="prompt">$</span>cargo build -p rustcode-tui
                  --bin rustcode
                </div>
                <div className="dim">✓ Finished dev profile</div>
                <div>
                  <span className="prompt">$</span>cd apps/desktop &amp;&amp;
                  bun install
                </div>
                <div>
                  <span className="prompt">$</span>bun tauri dev
                </div>
                <div className="dim">▲ RustCode desktop is running</div>
                <div>
                  <span className="prompt">$</span>
                  <span className="cursor" />
                </div>
              </div>
            </div>
            <div className="card open-side" data-reveal>
              <ul className="open-list">
                <li>
                  <Check />
                  <span>
                    <strong>Read every line.</strong> Desktop app, harness and
                    terminal UI share one Rust core.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <strong>Keep it local.</strong> Threads, settings and usage
                    live on your machine.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <strong>Fork it.</strong> Apache-2.0. No RustCode account
                    required.
                  </span>
                </li>
              </ul>
              <p className="open-meta">
                <code>Apache-2.0 · {version ?? "latest release"}</code>
              </p>
              <div className="open-actions">
                <a
                  className="btn btn-primary"
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubMark />
                  Fork on GitHub
                </a>
                <Link className="btn btn-ghost" href="/changelog">
                  Changelog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec home-cta" aria-labelledby="cta-title">
        <div className="home-hero-grid" aria-hidden="true" />
        <div className="container home-cta-inner" data-reveal>
          <h2 id="cta-title" className="display home-cta-title">
            Your agents deserve
            <br />
            better than a terminal tab.
          </h2>
          <p className="home-sub">
            Free and open source. Install it, sign in to the harnesses you
            already pay for, and let your agents get to work.
          </p>
          <InstallBox
            anchor="install"
            version={version}
            note={
              <>
                Installs the desktop app and the <code>rustcode</code> command.
                macOS Apple silicon · Linux x86_64 · Windows x64.
              </>
            }
          />
        </div>
      </section>
    </SiteFrame>
  );
}
