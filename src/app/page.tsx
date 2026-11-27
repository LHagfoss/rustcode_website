import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { AppShowcase } from "./app-showcase";
import { HarnessIcon, type HarnessId } from "./harness-icons";
import { InstallBox } from "./install-box";
import { getReleases, type Release } from "./releases";
import {
  githubUrl,
  siteAlternateNames,
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
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      alternateName: siteAlternateNames,
      url: siteUrl,
      logo: `${siteUrl}/images/rustcode-logo.png`,
      sameAs: [githubUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      alternateName: siteAlternateNames,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: siteName,
      alternateName: siteAlternateNames,
      publisher: { "@id": `${siteUrl}/#organization` },
      downloadUrl: `${githubUrl}/releases/latest`,
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
  { id: "claude", name: "Claude Code", tag: "Anthropic" },
  { id: "codex", name: "Codex", tag: "OpenAI" },
  { id: "gemini", name: "Gemini CLI", tag: "Google" },
  { id: "opencode", name: "OpenCode", tag: "Open source" },
  { id: "pi", name: "Pi", tag: "Open source" },
  { id: "rustcode", name: "RustCode", tag: "Built in" },
];

type CardLink = { href: string; label: string; external?: boolean };

// A Cursor-style feature card: a title, one muted line, a link and a tinted
// well holding a small piece of the product. The well's content bleeds off
// its right and bottom edges, so it reads as a crop of the real app.
function Card({
  title,
  body,
  link,
  children,
}: {
  title: string;
  body: string;
  link?: CardLink;
  children: ReactNode;
}) {
  return (
    <article className="cx-card">
      <h3>{title}</h3>
      <p>{body}</p>
      {link &&
        (link.external ? (
          <a
            className="cx-link"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <Link className="cx-link" href={link.href}>
            {link.label} <span aria-hidden="true">→</span>
          </Link>
        ))}
      {!link && <span />}
      <div className="cx-well" aria-hidden="true">
        {children}
      </div>
    </article>
  );
}

function Window({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className ? `cx-win ${className}` : "cx-win"}>
      <div className="cx-win-bar">
        <span />
        <span />
        <span />
        {title && <em>{title}</em>}
      </div>
      <div className="cx-win-body">{children}</div>
    </div>
  );
}

function SectionHead({
  id,
  title,
  sub,
}: {
  id: string;
  title: string;
  sub: string;
}) {
  return (
    <header className="cx-head" data-reveal>
      <h2 id={id}>{title}</h2>
      <p>{sub}</p>
    </header>
  );
}

export default async function Home() {
  const { version, releases } = await getReleases().catch(() => ({
    version: null,
    releases: [] as Release[],
  }));
  const recent = releases.slice(0, 4);
  return (
    <SiteFrame current="/">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <section className="cx-hero" aria-labelledby="hero-title">
        <div className="container">
          <p className="cx-eyebrow" data-rise>
            Agentic development environment
          </p>
          <h1
            id="hero-title"
            className="cx-hero-title"
            data-rise
            style={{ "--d": "60ms" } as CSSProperties}
          >
            Every coding agent, one window
          </h1>
          <p
            className="cx-hero-sub"
            data-rise
            style={{ "--d": "120ms" } as CSSProperties}
          >
            Run Claude Code, Codex and more side by side, open source and
            local-first.
          </p>
          <div
            className="cx-actions"
            data-rise
            style={{ "--d": "180ms" } as CSSProperties}
          >
            <a className="pill pill-solid" href="#install">
              Install RustCode <span aria-hidden="true">↓</span>
            </a>
            <a
              className="pill pill-line"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View source <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div
          className="container"
          data-rise
          style={{ "--d": "300ms" } as CSSProperties}
        >
          <div className="cx-stage">
            <AppShowcase />
          </div>
        </div>
      </section>

      <section className="cx-sec" aria-labelledby="harness-title">
        <div className="container">
          <SectionHead
            id="harness-title"
            title="Bring your own harness"
            sub="Sign in to the agents you already pay for. RustCode doesn't resell tokens."
          />
          <div className="cx-grid" data-reveal data-stagger>
            <Card
              title="Six harnesses"
              body="Claude Code, Codex, Gemini CLI, OpenCode, Pi and our own, behind one composer."
            >
              <Window title="New thread">
                <ul className="mx-pick">
                  {harnesses.map((h, index) => (
                    <li key={h.id} data-on={index === 0 || undefined}>
                      <span className="mx-icon">
                        <HarnessIcon id={h.id} />
                      </span>
                      {h.name}
                      <small>{h.tag}</small>
                    </li>
                  ))}
                </ul>
              </Window>
            </Card>
            <Card
              title="Model and effort per thread"
              body="Pick the harness, model and reasoning effort for each thread, not once for the app."
            >
              <Window title="Threads">
                <ul className="mx-rows">
                  <li>
                    <span className="mx-dot is-run" />
                    Add release feed
                    <small>Claude Code · high</small>
                  </li>
                  <li>
                    <span className="mx-dot is-wait" />
                    Fix Windows installer
                    <small>Codex · medium</small>
                  </li>
                  <li>
                    <span className="mx-dot is-ok" />
                    Write changelog page
                    <small>RustCode · low</small>
                  </li>
                  <li className="is-dim">
                    <span className="mx-dot" />
                    Audit dependencies
                    <small>Gemini CLI · low</small>
                  </li>
                </ul>
              </Window>
            </Card>
            <Card
              title="Desktop or terminal"
              body="The same threads in the desktop app or in the rustcode terminal UI."
              link={{ href: "/tui", label: "rustcode TUI" }}
            >
              <div className="mx-shot is-fit">
                <Image
                  src="/images/tui-card.png"
                  alt=""
                  width={640}
                  height={480}
                  sizes="(min-width: 1240px) 380px, 90vw"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="cx-sec" aria-labelledby="parallel-title">
        <div className="container">
          <SectionHead
            id="parallel-title"
            title="Run agents in parallel"
            sub="Each thread gets its own git worktree, so parallel work never lands in the same checkout."
          />
          <div className="cx-grid" data-reveal data-stagger>
            <Card
              title="One worktree per thread"
              body="Branches stay apart until you merge them. Nothing collides on disk."
            >
              <Window title="Worktrees">
                <ul className="mx-rows is-mono">
                  <li>
                    ⎇ wt/release-feed<small>+128 −14</small>
                  </li>
                  <li>
                    ⎇ wt/win-installer<small>+42 −9</small>
                  </li>
                  <li>
                    ⎇ wt/changelog<small>+77 −0</small>
                  </li>
                  <li className="is-dim">
                    ⎇ main<small>clean</small>
                  </li>
                </ul>
              </Window>
            </Card>
            <Card
              title="Threads that start threads"
              body="An agent can fan a task out, start other threads and message them as they work."
            >
              <Window title="Plan the 1.0 release">
                <p className="mx-label">Started 3 threads</p>
                <ul className="mx-rows">
                  <li>
                    <span className="mx-dot is-run" />
                    Draft release notes
                    <small>Writing</small>
                  </li>
                  <li>
                    <span className="mx-dot is-run" />
                    Bump versions
                    <small>Editing</small>
                  </li>
                  <li>
                    <span className="mx-dot is-ok" />
                    Smoke-test installers
                    <small>Done</small>
                  </li>
                </ul>
              </Window>
            </Card>
            <Card
              title="Scheduled jobs"
              body="Agents that run on a schedule, on any of your paired machines."
            >
              <div className="mx-shot is-left">
                <Image
                  src="/images/app-jobs.png"
                  alt=""
                  width={3024}
                  height={1716}
                  sizes="(min-width: 1240px) 760px, 180vw"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="cx-sec" aria-labelledby="review-title">
        <div className="container">
          <SectionHead
            id="review-title"
            title="From prompt to pull request"
            sub="Agents ask before they act. Review every change before it ships."
          />
          <div className="cx-grid" data-reveal data-stagger>
            <Card
              title="Approvals"
              body="Commands, edits and reads wait for you. Answer inline and keep going."
            >
              <Window title="Fix Windows installer">
                <p className="mx-text">
                  The installer exits early on PowerShell 5. I&apos;ll run a dry
                  run to confirm the fix.
                </p>
                <div className="mx-ask">
                  <p>
                    Run <code>pwsh ./install.ps1 -DryRun</code>?
                  </p>
                  <div>
                    <span className="mx-btn">Deny</span>
                    <span className="mx-btn is-solid">Approve</span>
                  </div>
                </div>
              </Window>
            </Card>
            <Card
              title="Checkpoints"
              body="Every turn is a checkpoint. Step back to any of them if a change goes wrong."
            >
              <Window title="Checkpoints">
                <ul className="mx-rows is-list">
                  <li>
                    Reproduce the crash<small>Turn 1</small>
                  </li>
                  <li>
                    Patch the PATH lookup<small>Turn 2</small>
                  </li>
                  <li data-on>
                    Add a dry-run flag<small>Turn 3</small>
                  </li>
                  <li className="is-dim">
                    Update the README<small>Turn 4</small>
                  </li>
                </ul>
              </Window>
            </Card>
            <Card
              title="Review and merge"
              body="Read the diff, open the pull request and merge it without leaving the app."
            >
              <Window title="wt/win-installer → main">
                <ul className="mx-rows is-mono">
                  <li>
                    install.ps1
                    <small>
                      <b>+31</b> −6
                    </small>
                  </li>
                  <li>
                    src/app/install-box.tsx
                    <small>
                      <b>+9</b> −3
                    </small>
                  </li>
                  <li>
                    README.md
                    <small>
                      <b>+2</b> −0
                    </small>
                  </li>
                </ul>
                <div className="mx-actions">
                  <span className="mx-btn">Review diff</span>
                  <span className="mx-btn is-solid">Merge PR</span>
                </div>
              </Window>
            </Card>
          </div>
        </div>
      </section>

      <section className="cx-sec" aria-labelledby="open-title">
        <div className="container">
          <SectionHead
            id="open-title"
            title="Open source, local-first"
            sub="Don't like something? Read the code, change it and build your own."
          />
          <div className="cx-grid" data-reveal data-stagger>
            <Card
              title="Read every line"
              body="The desktop app, harness and terminal UI share one Rust core."
              link={{
                href: githubUrl,
                label: "Source on GitHub",
                external: true,
              }}
            >
              <Window title="~/code" className="is-term">
                <p>
                  <span>$</span> git clone github.com/LHagfoss/rustcode
                </p>
                <p className="is-dim">✓ Cloned into ./rustcode</p>
                <p>
                  <span>$</span> cd apps/desktop &amp;&amp; bun install
                </p>
                <p>
                  <span>$</span> bun tauri dev
                </p>
                <p className="is-dim">▲ RustCode desktop is running</p>
              </Window>
            </Card>
            <Card
              title="Keep it local"
              body="Threads, settings and usage live on your machine. No RustCode account."
            >
              <div className="mx-shot is-left">
                <Image
                  src="/images/app-dashboard.png"
                  alt=""
                  width={3024}
                  height={1716}
                  sizes="(min-width: 1240px) 760px, 180vw"
                />
              </div>
            </Card>
            <Card
              title="Apache-2.0"
              body="Fork it, ship it, change it. Every release is on GitHub."
              link={{ href: "/changelog", label: "Changelog" }}
            >
              <Window title="Releases">
                <ul className="mx-rows is-list">
                  {recent.length > 0 ? (
                    recent.map((release, index) => (
                      <li
                        key={release.tag}
                        data-on={index === 0 || undefined}
                        className={index > 0 ? "is-dim" : undefined}
                      >
                        {release.tag}
                        <small>
                          {release.publishedAt
                            ? new Date(release.publishedAt).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" },
                              )
                            : ""}
                        </small>
                      </li>
                    ))
                  ) : (
                    <li data-on>
                      Latest release<small>GitHub</small>
                    </li>
                  )}
                </ul>
              </Window>
            </Card>
          </div>
        </div>
      </section>

      <section className="cx-sec cx-final" aria-labelledby="cta-title">
        <div className="container">
          <SectionHead
            id="cta-title"
            title="Try RustCode now"
            sub="Free and open source. Sign in to the harnesses you already use."
          />
          <div className="cx-stage is-install" data-reveal>
            <InstallBox
              anchor="install"
              version={version}
              note={
                <>
                  Installs the desktop app and the <code>rustcode</code>{" "}
                  command. macOS Apple silicon · Linux x86_64 · Windows x64.
                </>
              }
            />
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
