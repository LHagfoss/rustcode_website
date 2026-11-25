# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers who run AI coding agents (Claude Code, Codex, Gemini CLI, OpenCode)
on real codebases and want to run several at once without losing control.
Situated at a desk, in a dark editor/terminal environment, evaluating whether
RustCode fits their workflow. (Inferred from the brief and the main repo's
README; not separately confirmed with the user.)

## Product Purpose

RustCode is the open source agentic development environment (ADE) for
coding agents: one desktop app that runs several agents side by side, plus the `rustcode` terminal
harness. Success for this surface is a visitor who understands within seconds
that RustCode is an ADE, an agentic development environment (not a chat
wrapper), sees the real
product, and copies the install command.

## Positioning

"Your coding agents. One development environment." Every thread picks its agent (harness),
model and effort; threads can use separate git worktrees to isolate parallel
changes; an agent can start and message other threads; approvals,
per-turn checkpoints and review keep the human in control. The mechanism a
neighbor cannot copy truthfully: the same core drives both the Tauri desktop
ADE and the installed, optional `rustcode` terminal harness.

## Operating Context

- Main repo: `~/code/rustcode` (GitHub: LHagfoss/rustcode), Apache-2.0.
- Desktop app: `apps/desktop` — Tauri 2 + React webview, spawns
  `rustcode --acp` as a sidecar (`docs/desktop.md`).
- Terminal harness: `rustcode/tui` crate, the `rustcode` binary; inline by
  default, fullscreen opt-in (`docs/frontends.md`).
- Install: one-line installers put the `rustcode` CLI on the machine and,
  unless `--no-app`, the desktop app as well (`docs/install.md`). The TUI is
  installed alongside and optional to use (stated in the user's brief).
- This site: Next.js 16 with plain CSS (no component library), deployed on Vercel
  at https://rustcode.lhagfoss.com.

## Capabilities and Constraints

- Surfaces: the app's landing page (`/`), the terminal harness page (`/tui`),
  changelog (`/changelog`), install command copy, latest-release chip in the header,
  release/version feed from GitHub. `/` is about the desktop app only; the TUI
  has its own page.
- Desktop app platforms: macOS Apple silicon, Linux x86_64, Windows x64.
  The terminal harness also supports Linux ARM64.
- Terminology: thread, harness, effort, worktree, fan-out, ADE,
  checkpoint, approval — use the product's own words.
- Constraint: no third-party UI component library; controls are plain
  semantic HTML styled from the site's own tokens.
- Open decision: none blocking — visual direction is pinned by the brief:
  near-black ground, one accent, generous whitespace, a 1100px column, real
  screenshots, roughly 300–450 words of copy per marketing page.

## Brand Commitments

- Name: RustCode. Voice: calm, concrete, developer-to-developer.
- Binding: the identity comes from the logo: block-built "rc" mark, slate
  blue and warm off-white on near-black, square crisp geometry.
- Binding from the brief: dark-mode UI, restrained accent, imagery showing the
  desktop ADE (`/`) and the optional terminal harness (`/tui`).
- Assets: `public/images/rustcode-logo.png` (icon), `app-thread.png`,
  `app-dashboard.png`, `app-jobs.png` (desktop app screenshots), and `tui.png` (terminal harness
  screenshot).

## Evidence on Hand

- Real screenshots: `public/images/app-{thread,dashboard,jobs}.png`
  (3024×1716, captured from the desktop app's mock window:
  `bun run mock-window open` in `apps/desktop` of the main repo),
  `public/images/tui.png` (1078×838, real terminal capture; the README's readme-tui.png is a desktop screenshot), `public/images/rustcode-logo.png`.
- Live data: GitHub releases/changelog (header version chip), Vercel page views.
- Absences that must not be fabricated: no testimonials, no customer logos, no
  pricing, no benchmarks, no usage numbers.

## Product Principles

1. Show the real product — real screenshots and live GitHub data, never
   mockups or invented proof.
2. Speak the product's own language (threads, harnesses, worktrees, fan-out);
   no marketing inflation.
3. The install command is the primary action; every section earns its place
   toward it or toward understanding what gets installed.
4. Open source, local-first, and platform-truthful (desktop: macOS Apple
   silicon · Linux x86_64 · Windows x64; terminal: Linux ARM64 too) are
   stated plainly, never embellished.

## Accessibility & Inclusion

Body/secondary text ≥ 4.5:1 contrast on the dark ground, visible keyboard
focus, semantic HTML, `prefers-reduced-motion` respected (the screenshot reveal
and hover transitions switch off under it). No product-specific a11y standard
was stated by the user.
