import Image from "next/image";
import Link from "next/link";
import { CtaBlock } from "./cta";
import { type FaqItem, FaqList } from "./faq";
import { FeatureCard } from "./feature-card";
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

const harnesses = [
  "Claude Code",
  "Codex",
  "Gemini CLI",
  "OpenCode",
  "Pi",
] as const;

const faq: readonly FaqItem[] = [
  {
    question: "Is RustCode free?",
    answer:
      "Yes. RustCode is open source under Apache-2.0, with no account, subscription or usage fee. You pay your model provider, if you use one.",
  },
  {
    question: "Which agents can I run?",
    answer:
      "Claude Code, Codex, Gemini CLI, OpenCode, Pi or RustCode's built-in harness. Each thread picks its own harness, model and effort.",
  },
  {
    question: "Which platforms are supported?",
    answer:
      "The desktop app runs on macOS Apple silicon, Linux x86_64 and Windows x64. The rustcode command also runs on Linux ARM64.",
  },
  {
    question: "Do I need the terminal harness?",
    answer:
      "No. The installer puts both on your machine; the app does not depend on the terminal UI. Add --no-app to install the command alone.",
  },
  {
    question: "Where does my data live?",
    answer:
      "On your machine, local-first: threads, settings and usage. Agents talk to their own providers directly, and RustCode has no account to create.",
  },
];

function BranchIcon() {
  return (
    <svg
      className="mini-icon"
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <circle cx="4" cy="3.5" r="1.6" />
      <circle cx="4" cy="12.5" r="1.6" />
      <circle cx="12" cy="5.5" r="1.6" />
      <path d="M4 5.2v5.6M12 7.2v.3a3 3 0 0 1-3 3H6.8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mini-icon"
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3.4 8.4 3 3 6.2-7" />
    </svg>
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
          </div>

          <div className="harness-line">
            <span className="harness-label">Works with</span>
            <ul>
              {harnesses.map((harness) => (
                <li key={harness}>{harness}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="shot-band" aria-label="The RustCode desktop app">
        <div className="wrap shot-wrap">
          <figure className="hero-shot">
            <div className="shot-frame">
              <Image
                src="/images/readme-desktop.png"
                alt="The RustCode desktop app with a thread open: the thread list on the left and the agent's composer on the right"
                width={1163}
                height={765}
                sizes="(min-width: 1280px) 1240px, 100vw"
                priority
              />
            </div>
            <figcaption>
              Threads on the left, the active conversation and its changes on
              the right.
            </figcaption>
          </figure>
          <div className="shot-strip">
            <span>macOS Apple silicon · Linux x86_64 · Windows x64</span>
            <span>Apache-2.0 · local-first</span>
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="parallel" aria-labelledby="parallel-title">
          <div className="split">
            <h2 id="parallel-title">Run several agents at once.</h2>
            <p>
              Start a thread, pick its harness, model and effort, then let a
              second thread work next to it. RustCode keeps every conversation,
              worktree and approval in one window.
            </p>
          </div>

          <div className="feature-row">
            <FeatureCard
              index="01"
              title="Per-thread agent, model and effort"
              tile={
                <div className="mini mini-thread">
                  <div className="mini-head">
                    <span className="mini-dot" />
                    <span className="mini-title">New thread</span>
                    <span className="mini-chip">High</span>
                  </div>
                  <div className="mini-input">What should we build?</div>
                  <div className="mini-chips">
                    <span className="mini-chip is-strong">Claude Code</span>
                    <span className="mini-chip">claude-opus-4.5</span>
                  </div>
                  <div className="mini-line w-80" />
                  <div className="mini-line w-55" />
                </div>
              }
            >
              Sign in to each agent once. Switch harness, model and effort per
              thread, not per app.
            </FeatureCard>

            <FeatureCard
              index="02"
              title="A worktree per thread"
              tile={
                <div className="mini mini-worktree">
                  <div className="mini-branch">
                    <BranchIcon />
                    <span>feat/parallel-layout</span>
                    <span className="mini-chip">thread 3</span>
                  </div>
                  <div className="mini-branch is-muted">
                    <BranchIcon />
                    <span>feat/site-copy</span>
                    <span className="mini-chip">thread 4</span>
                  </div>
                  <div className="mini-line w-70" />
                </div>
              }
            >
              Run a thread in its own git worktree. Parallel changes stay
              isolated, so you compare branches and merge the one that works.
            </FeatureCard>

            <FeatureCard
              index="03"
              title="Approvals before anything lands"
              tile={
                <div className="mini mini-approval">
                  <div className="mini-command">
                    <span className="mini-prompt">$</span>
                    <code>rm -rf dist</code>
                  </div>
                  <div className="mini-actions">
                    <span className="mini-approve">Approve</span>
                    <span className="mini-deny">Deny</span>
                  </div>
                  <div className="mini-saved">
                    <CheckIcon />
                    checkpoint saved
                  </div>
                </div>
              }
            >
              Commands wait for you. Every turn leaves a checkpoint, and the
              diff is reviewed in the thread before it lands.
            </FeatureCard>
          </div>
        </section>

        <section className="surfaces" aria-labelledby="surfaces-title">
          <div className="section-heading">
            <h2 id="surfaces-title">Two surfaces. One installer.</h2>
            <p>
              Use the window for orchestration, the command for everything else.
              Both ship together.
            </p>
          </div>

          <div className="product-grid">
            <article className="product-card" aria-current="page">
              <div className="product-media">
                <Image
                  src="/images/readme-desktop.png"
                  alt=""
                  width={1163}
                  height={765}
                  sizes="(min-width: 860px) 540px, 100vw"
                />
              </div>
              <div className="product-copy">
                <span className="product-kicker">
                  Desktop app · you are here
                </span>
                <h3>The orchestration window</h3>
                <p>
                  Threads, worktrees, approvals and review, with every agent in
                  one sidebar.
                </p>
                <span className="product-link">On this page</span>
              </div>
            </article>

            <Link className="product-card" href="/tui">
              <div className="product-media">
                <Image
                  src="/images/tui.png"
                  alt=""
                  width={1163}
                  height={838}
                  sizes="(min-width: 860px) 540px, 100vw"
                />
              </div>
              <div className="product-copy">
                <span className="product-kicker">Terminal harness</span>
                <h3>The same agent, inline</h3>
                <p>
                  Inline by default, fullscreen when you want it, on any model
                  you have configured.
                </p>
                <span className="product-link">Open the TUI page →</span>
              </div>
            </Link>
          </div>
        </section>

        <section className="faq-section" aria-labelledby="faq-title">
          <div className="faq-intro">
            <h2 id="faq-title">Questions, answered.</h2>
            <p>
              Short answers about the app, the agents and what gets installed.
            </p>
            <a
              className="text-link"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the source ↗
            </a>
          </div>
          <FaqList items={faq} />
        </section>

        <CtaBlock
          id="home-cta"
          version={version}
          seed={80}
          title="Install it and open a thread."
          copy="One command installs the desktop app and the rustcode command. Open a thread and pick the agent."
          note={
            <>
              Installs both surfaces. Add <code>--no-app</code> for the command
              alone.
            </>
          }
        />
      </div>
    </SiteFrame>
  );
}
