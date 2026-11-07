import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InstallBox } from "../install-box";
import { getReleases } from "../releases";
import { githubUrl, siteUrl } from "../site";
import { SiteFrame } from "../site-shell";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Terminal harness",
  description:
    "rustcode is the terminal UI that ships with RustCode: the built-in coding agent inline by default, fullscreen when you want it, on any model including local ones through Ollama.",
  alternates: {
    canonical: "/tui",
  },
  openGraph: {
    title: "RustCode terminal harness",
    description:
      "The rustcode terminal UI: inline by default, fullscreen when you want it, on any model including local ones through Ollama.",
    url: `${siteUrl}/tui`,
    type: "website",
    images: [
      {
        url: "/images/tui.png",
        width: 1078,
        height: 838,
        alt: "The RustCode terminal harness answering a prompt",
      },
    ],
  },
};

export default async function TuiPage() {
  const { version } = await getReleases().catch(() => ({ version: null }));

  return (
    <SiteFrame current="/tui">
      <div className="wrap">
        <section className="page-head" aria-labelledby="tui-title">
          <h1 id="tui-title">The same agent, in your terminal.</h1>
          <p className="hero-lede">
            <code>rustcode</code> is the terminal UI the installer puts next to
            the app. It runs the built-in harness on any model you have
            configured, including local ones through Ollama, inline by default
            and fullscreen when you want it.
          </p>

          <InstallBox
            anchor="install"
            seed={40}
            version={version}
            note={
              <>
                Installs the <code>rustcode</code> command and the desktop app.
                Add <code>--no-app</code> to install the command alone; Linux
                ARM64 gets the command only.
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
            <Link className="text-link" href="/">
              The desktop app →
            </Link>
          </div>
        </section>

        <figure className="shot">
          <div className="shot-frame">
            <Image
              src="/images/tui.png"
              alt="The RustCode terminal harness: a prompt, the agent's reasoning steps, a tool call and the input bar"
              width={1078}
              height={838}
              sizes="(min-width: 1100px) 1036px, 100vw"
              priority
            />
          </div>
          <figcaption>
            The inline UI: your prompt, the agent&apos;s steps and tool calls,
            and the input bar at the bottom.
          </figcaption>
        </figure>

        <section
          className="sections"
          aria-label="How the terminal harness works"
        >
          <article className="section">
            <h2>Inline by default</h2>
            <p>
              The UI draws in the pane you started it from and leaves your shell
              history where it was. Fullscreen is opt-in for when the
              conversation needs the whole window.
            </p>
            <ul>
              <li>Your prompt and scrollback stay in place.</li>
              <li>Fullscreen only when you ask for it.</li>
            </ul>
          </article>

          <article className="section">
            <h2>Three entry points</h2>
            <dl className="entries">
              <div className="entry">
                <dt>
                  <code>rustcode</code>
                </dt>
                <dd>The terminal UI in this project.</dd>
              </div>
              <div className="entry">
                <dt>
                  <code>rustcode --prompt &quot;…&quot;</code>
                </dt>
                <dd>One prompt on the built-in harness, no UI.</dd>
              </div>
              <div className="entry">
                <dt>
                  <code>rustcode --acp</code>
                </dt>
                <dd>Serve ACP over stdio; the desktop app uses this.</dd>
              </div>
            </dl>
          </article>

          <article className="section">
            <h2>Any model you have</h2>
            <p>
              The harness runs on the models you already have access to, through
              the providers you already configured, including local models
              through Ollama. Commands run inside an OS sandbox.
            </p>
            <ul>
              <li>Bring your own provider, key or local model.</li>
              <li>An OS sandbox around the commands it runs.</li>
            </ul>
          </article>

          <article className="section">
            <h2>Ships with the app</h2>
            <p>
              The terminal harness and the desktop app share one core, and one
              installer. Use whichever fits the task; both come from the same
              command.
            </p>
            <ul>
              <li>No second install and no second account.</li>
              <li>Installed alongside the app, optional to use.</li>
            </ul>
          </article>
        </section>

        <div className="platforms">
          <span>
            Terminal: Linux x86_64 · Linux ARM64 · macOS Apple silicon · Windows
            x64
          </span>
          <span>
            Desktop app: macOS Apple silicon · Linux x86_64 · Windows x64
          </span>
        </div>

        <aside className="crosslink">
          <p>
            Want the window instead? The desktop app runs the same threads with
            worktrees, fan-out, approvals and review.
          </p>
          <Link className="text-link" href="/">
            RustCode app →
          </Link>
        </aside>

        <section className="cta" aria-labelledby="tui-cta-title">
          <h2 id="tui-cta-title">Install the command.</h2>
          <p>
            One installer, both surfaces. The <code>rustcode</code> command is
            all you need if the terminal is where you work.
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
