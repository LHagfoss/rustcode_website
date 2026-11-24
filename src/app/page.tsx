import Image from "next/image";
import Link from "next/link";
import { CtaBlock } from "./cta";
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

const harnesses = [
  ["Claude Code", "Anthropic harness"],
  ["Codex", "OpenAI harness"],
  ["Gemini CLI", "Google harness"],
  ["OpenCode", "Open source harness"],
  ["Pi", "Open source harness"],
  ["RustCode", "Built-in harness"],
];
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
        <section className="ade-hero" aria-labelledby="hero-title">
          <h1 id="hero-title">
            Your coding agents.
            <br />
            <span>One development environment.</span>
          </h1>
          <div className="hero-intro">
            <p>
              RustCode is a local-first agentic development environment (ADE).
              Run the coding agents you already use, plus our built-in harness,
              in one desktop app. Keep parallel work in view, from the first
              prompt to the reviewed diff.
            </p>
            <a className="nav-cta" href="#install">
              Install RustCode <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <figure className="desktop-reveal">
          <div className="reveal-label">
            <span>RustCode / Desktop</span>
            <span>Local-first · Apache-2.0</span>
          </div>
          <div className="shot-frame">
            <Image
              src="/images/readme-desktop.png"
              alt="RustCode desktop GUI showing project threads, an agent conversation and the prompt composer"
              width={1163}
              height={765}
              sizes="(min-width: 1200px) 1100px, 100vw"
              priority
            />
          </div>
          <figcaption>
            One workspace for your threads, conversations and changes.
          </figcaption>
        </figure>
        <section className="harness-section" aria-labelledby="harness-title">
          <div className="split">
            <h2 id="harness-title">
              Keep your harness.
              <br />
              Choose it per thread.
            </h2>
            <p>
              Claude Code, Codex, Gemini CLI, OpenCode, Pi or RustCode itself.
              Each thread gets its own harness, model and effort. Sign in to
              each agent once, then choose the right setup for the work.
            </p>
          </div>
          <ul className="harness-grid">
            {harnesses.map(([name, detail]) => (
              <li key={name}>
                <span className="harness-block" aria-hidden="true" />
                <strong>{name}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="thread-section" aria-labelledby="thread-title">
          <div className="split">
            <h2 id="thread-title">
              Start a thread.
              <br />
              Give it room to work.
            </h2>
            <p>
              One task can become several threads. Agents can start and message
              other threads, so delegation and fan-out stay connected to the
              work you are directing.
            </p>
          </div>
          <ol className="thread-flow">
            <li>
              <span>01 / Configure</span>
              <h3>Pick the harness.</h3>
              <p>
                Choose a model and effort for the task. Keep a conversation and
                its context together in a thread.
              </p>
            </li>
            <li>
              <span>02 / Run in parallel</span>
              <h3>Branch the work.</h3>
              <p>
                Give a thread its own git worktree. Delegate to other threads
                without mixing their changes into the same checkout.
              </p>
            </li>
            <li>
              <span>03 / Review</span>
              <h3>Stay in the loop.</h3>
              <p>
                Handle approval requests, return to per-turn checkpoints and
                review the diff. Bring the work through review and merge PRs.
              </p>
            </li>
          </ol>
        </section>
        <section className="install-section" aria-labelledby="install-title">
          <div>
            <h2 id="install-title">
              On your machine.
              <br />
              Under your control.
            </h2>
            <p>
              Open source under Apache-2.0. Threads, settings and usage live
              locally. No RustCode account required.
            </p>
            <p className="platform-note">
              Desktop: macOS Apple silicon · Linux x86_64 · Windows x64.
            </p>
          </div>
          <InstallBox
            anchor="install"
            version={version}
            note={
              <>
                Installs the desktop app and the <code>rustcode</code> command.
                Linux ARM64 gets the command only.
              </>
            }
          />
        </section>
        <aside className="terminal-secondary">
          <div>
            <h2>Prefer a terminal?</h2>
            <p>
              The optional terminal UI is installed alongside the desktop app.
              Use the built-in harness inline or fullscreen.
            </p>
          </div>
          <Link className="text-link" href="/tui">
            Explore the terminal UI →
          </Link>
        </aside>
        <CtaBlock
          id="home-cta"
          version={version}
          title="Put your agents to work."
          copy="Open a project, start a thread and choose your harness."
          note={<>Desktop app + optional terminal UI. Free and open source.</>}
        />
      </div>
    </SiteFrame>
  );
}
