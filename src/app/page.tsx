import Image from "next/image";
import Link from "next/link";
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
import { Underline } from "./sketch";

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
      applicationSubCategory: "Coding agent orchestration app",
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
      <div className="wrap">
        <section className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title">
            One app for your <Underline seed={7}>coding agents</Underline>.
          </h1>
          <p className="hero-lede">
            RustCode runs Claude Code, Codex, Gemini CLI, OpenCode, Pi and its
            own harness side by side in one desktop window. Every thread picks
            its agent, model and effort.
          </p>

          <InstallBox
            anchor="install"
            version={version}
            note={
              <>
                Installs the desktop app and the <code>rustcode</code> command.
                The terminal UI is optional to use; Linux ARM64 gets the command
                only.
              </>
            }
          />

          <div className="hero-links">
            <a
              className="text-link"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source on GitHub ↗
            </a>
            <Link className="text-link" href="/tui">
              Terminal harness →
            </Link>
          </div>
        </section>

        <figure className="shot">
          <div className="shot-frame">
            <Image
              src="/images/readme-desktop.png"
              alt="The RustCode desktop app with a thread open: the thread list on the left, the agent's conversation and changed files on the right"
              width={1280}
              height={960}
              sizes="(min-width: 1100px) 1036px, 100vw"
              priority
            />
          </div>
          <figcaption>
            Threads on the left, the active conversation and its changed files
            on the right.
          </figcaption>
        </figure>

        <section className="sections" aria-label="What RustCode does">
          <article className="section">
            <h2>A thread is a workspace</h2>
            <p>
              Pick the agent, model and effort per thread, and switch when the
              task changes. Sign in to each agent once; RustCode keeps the
              sessions, settings and usage in one place.
            </p>
            <ul>
              <li>
                Claude Code, Codex, Gemini CLI, OpenCode, Pi or the built-in
                harness.
              </li>
              <li>Model and effort chosen per thread, not per app.</li>
            </ul>
          </article>

          <article className="section">
            <h2>Parallel work in worktrees</h2>
            <p>
              Run a thread in its own git worktree and it cannot touch the one
              next to it. Fan out one task, compare the results, merge the
              branch that works.
            </p>
            <ul>
              <li>Isolated worktree per thread, opt-in.</li>
              <li>Every running and waiting thread in the sidebar.</li>
            </ul>
          </article>

          <article className="section">
            <h2>Agents can start agents</h2>
            <p>
              A thread can open another thread and message it, so a large task
              splits into smaller ones without you copying prompts between
              windows.
            </p>
            <ul>
              <li>Start and message other threads from a thread.</li>
              <li>Fan out, then compare the results side by side.</li>
            </ul>
          </article>

          <article className="section">
            <h2>Review before anything lands</h2>
            <p>
              Approvals gate the commands an agent wants to run, every turn
              leaves a checkpoint, and the changes are reviewed in the thread
              before they land.
            </p>
            <ul>
              <li>Approve commands and edits as they come up.</li>
              <li>Diffs and changed files kept in the conversation.</li>
            </ul>
          </article>
        </section>

        <div className="platforms">
          <span>Desktop: macOS Apple silicon · Linux x86_64 · Windows x64</span>
          <span>Apache-2.0 · local-first</span>
        </div>

        <aside className="crosslink">
          <p>
            Prefer the terminal? The same installer puts the{" "}
            <code>rustcode</code> TUI on your machine: inline by default,
            fullscreen when you want it.
          </p>
          <Link className="text-link" href="/tui">
            rustcode TUI →
          </Link>
        </aside>

        <section className="cta" aria-labelledby="cta-title">
          <h2 id="cta-title">Install it and open a thread.</h2>
          <p>
            One command installs the app and the <code>rustcode</code> command.
            Open a thread and pick the agent.
          </p>
          <div className="hero-links">
            <a className="text-link" href="#install">
              Install RustCode →
            </a>
            <a
              className="text-link"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            <Link className="text-link" href="/changelog">
              Changelog
            </Link>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
