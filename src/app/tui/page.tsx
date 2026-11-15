import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBlock } from "../cta";
import { FeatureCard } from "../feature-card";
import { InstallBox } from "../install-box";
import { getReleases } from "../releases";
import { githubUrl, siteUrl } from "../site";
import { SiteFrame } from "../site-shell";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Optional terminal UI",
  description:
    "The optional terminal UI installed alongside the RustCode desktop orchestration app: the built-in coding agent inline by default, fullscreen when you want it, on any model including local ones through Ollama.",
  twitter: {
    card: "summary_large_image",
    title: "RustCode — Optional terminal UI",
    description:
      "The optional terminal companion to the RustCode desktop orchestration app.",
    images: ["/images/tui.png"],
  },
  alternates: {
    canonical: "/tui",
  },
  openGraph: {
    title: "RustCode — Optional terminal UI",
    description:
      "The rustcode terminal UI: inline by default, fullscreen when you want it, on any model including local ones through Ollama.",
    url: `${siteUrl}/tui`,
    type: "website",
    images: [
      {
        url: "/images/tui.png",
        width: 1078,
        height: 838,
        alt: "RustCode running a thread",
      },
    ],
  },
};

function PromptIcon() {
  return (
    <svg
      className="mini-icon"
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4.5 5 3.5 3-3.5 3M9 11h3" />
    </svg>
  );
}

export default async function TuiPage() {
  const { version } = await getReleases().catch(() => ({ version: null }));

  return (
    <SiteFrame current="/tui">
      <div className="wrap">
        <section className="hero" aria-labelledby="tui-title">
          <div className="hero-main">
            <h1 id="tui-title">The same agent, in your terminal.</h1>
            <p className="hero-lede">
              <code>rustcode</code> is the terminal UI the installer puts next
              to the app. It runs the built-in harness on any model you have
              configured, including local ones through Ollama, inline by default
              and fullscreen when you want it.
            </p>

            <InstallBox
              anchor="install"
              version={version}
              note={
                <>
                  Installs the <code>rustcode</code> command and the desktop
                  app. Add <code>--no-app</code> to install the command alone;
                  Linux ARM64 gets the command only.
                </>
              }
            />
          </div>

          <aside className="hero-side" aria-labelledby="platform-title">
            <h2 id="platform-title" className="side-title">
              Runs on
            </h2>
            <ul className="harness-list">
              <li>Linux x86_64</li>
              <li>Linux ARM64</li>
              <li>macOS Apple silicon</li>
              <li>Windows x64</li>
            </ul>
            <a
              className="text-link"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source on GitHub
              <span aria-hidden="true"> ↗</span>
            </a>
          </aside>
        </section>
      </div>

      <section className="shot-band" aria-label="The RustCode terminal harness">
        <div className="wrap shot-wrap">
          <figure className="hero-shot">
            <div className="shot-frame">
              <Image
                src="/images/tui.png"
                alt="RustCode with a thread open: the chat list on the left and the composer on the right"
                width={1078}
                height={838}
                sizes="(min-width: 1280px) 1240px, 100vw"
                priority
              />
            </div>
            <figcaption>
              A prompt, the agent&apos;s steps and tool calls, and the input bar
              at the bottom.
            </figcaption>
          </figure>
          <div className="shot-strip">
            <span>Inline by default · fullscreen on request</span>
            <span>Any provider · Ollama · OS sandbox</span>
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="parallel" aria-labelledby="tui-parallel-title">
          <div className="split">
            <h2 id="tui-parallel-title">Inline, not a takeover.</h2>
            <p>
              The UI draws in the pane you started it from and leaves your shell
              history where it was. Fullscreen is opt-in for when the
              conversation needs the whole window.
            </p>
          </div>

          <div className="feature-row">
            <FeatureCard
              title="Inline by default"
              tile={
                <div className="mini mini-terminal">
                  <div className="mini-term-bar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="mini-term-line">
                    <span className="mini-prompt">$</span> rustcode
                  </div>
                  <div className="mini-term-line is-muted">
                    › explain this codebase
                  </div>
                  <div className="mini-term-cursor" />
                </div>
              }
            >
              Your prompt and scrollback stay in place. Fullscreen only when you
              ask for it.
            </FeatureCard>

            <FeatureCard
              title="Three entry points"
              tile={
                <div className="mini mini-entries">
                  <div className="mini-entry">
                    <PromptIcon />
                    <code>rustcode</code>
                    <span className="mini-chip">UI</span>
                  </div>
                  <div className="mini-entry">
                    <PromptIcon />
                    <code>--prompt &quot;…&quot;</code>
                    <span className="mini-chip">one-shot</span>
                  </div>
                  <div className="mini-entry">
                    <PromptIcon />
                    <code>--acp</code>
                    <span className="mini-chip">stdio</span>
                  </div>
                </div>
              }
            >
              The UI, one prompt on the built-in harness, or ACP over stdio for
              the app.
            </FeatureCard>

            <FeatureCard
              title="Any model you have"
              tile={
                <div className="mini mini-models">
                  <div className="mini-chips">
                    <span className="mini-chip is-strong">OpenAI</span>
                    <span className="mini-chip">Anthropic</span>
                    <span className="mini-chip">Ollama</span>
                  </div>
                  <div className="mini-line w-80" />
                  <div className="mini-line w-45" />
                  <div className="mini-saved">
                    <span className="mini-dot" />
                    local model · sandboxed
                  </div>
                </div>
              }
            >
              Bring your own provider, key or local model. Commands run inside
              an OS sandbox.
            </FeatureCard>
          </div>
        </section>

        <section className="surfaces" aria-labelledby="tui-surfaces-title">
          <div className="section-heading">
            <h2 id="tui-surfaces-title">One installer, both surfaces.</h2>
            <p>
              The terminal harness and the desktop app share one core and one
              command.
            </p>
          </div>

          <div className="product-grid">
            <Link className="product-card" href="/">
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
                <h3>The orchestration window</h3>
                <p>
                  Threads, worktrees, approvals and review, with every agent in
                  one sidebar.
                </p>
                <span className="product-link">Open the app page →</span>
              </div>
            </Link>

            <article className="product-card" aria-current="page">
              <div className="product-media">
                <Image
                  src="/images/tui.png"
                  alt=""
                  width={1078}
                  height={838}
                  sizes="(min-width: 860px) 540px, 100vw"
                />
              </div>
              <div className="product-copy">
                <h3>The same agent, inline</h3>
                <p>
                  Inline by default, fullscreen when you want it, on any model
                  you have configured.
                </p>
                <span className="product-link">On this page</span>
              </div>
            </article>
          </div>
        </section>

        <CtaBlock
          id="tui-cta"
          version={version}
          title="Put the command on your machine."
          copy="One installer, both surfaces. Add --no-app if the terminal is all you want."
          note={
            <>
              Installs the <code>rustcode</code> command and the desktop app.
              Linux ARM64 gets the command only.
            </>
          }
        />
      </div>
    </SiteFrame>
  );
}
