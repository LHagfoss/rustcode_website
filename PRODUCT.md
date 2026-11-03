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

RustCode is the open source orchestration app for coding agents: one desktop
app that runs several agents side by side, plus the `rustcode` terminal
harness. Success for this surface is a visitor who understands within seconds
that RustCode is an orchestration app (not a chat wrapper), sees the real
product, and copies the install command.

## Positioning

"One app for your coding agents." Every thread picks its agent (harness),
model and effort; threads can use separate git worktrees to isolate parallel
changes; an agent can start and message other threads; approvals,
per-turn checkpoints and review keep the human in control. The mechanism a
neighbor cannot copy truthfully: the same core drives both the Tauri desktop
orchestrator and the installed, optional `rustcode` terminal harness.

## Operating Context

- Main repo: `~/code/rustcode` (GitHub: LHagfoss/rustcode), Apache-2.0.
- Desktop app: `apps/desktop` — Tauri 2 + React webview, spawns
  `rustcode --acp` as a sidecar (`docs/desktop.md`).
- Terminal harness: `rustcode/tui` crate, the `rustcode` binary; inline by
  default, fullscreen opt-in (`docs/frontends.md`).
- Install: one-line installers put the `rustcode` CLI on the machine and,
  unless `--no-app`, the desktop app as well (`docs/install.md`). The TUI is
  installed alongside and optional to use (stated in the user's brief).
- This site: Next.js 16 + drawably hand-drawn UI library, deployed on Vercel
  at https://rustcode.lhagfoss.com.

## Capabilities and Constraints

- Surfaces: landing page (`/`), changelog (`/changelog`), install command
  copy, GitHub star count, release/version feed from GitHub.
- Desktop app platforms: macOS Apple silicon, Linux x86_64, Windows x64.
  The terminal harness also supports Linux ARM64.
- Terminology: thread, harness, effort, worktree, fan-out, orchestrator,
  checkpoint, approval — use the product's own words.
- Constraint: the site must keep the drawably hand-drawn control language
  (repo AGENTS.md); controls are real HTML elements with SVG chrome.
- Open decision: none blocking — visual direction for this round is pinned by
  the user's brief (dark mode, rounder geometry, new images/layout).

## Brand Commitments

- Name: RustCode. Voice: calm, concrete, developer-to-developer.
- Binding: the drawably sketch identity (hand-drawn SVG chrome over real
  controls) must stay; no CSS-border fakery of controls.
- Binding from the brief: dark-mode UI, rounder geometry, imagery showing the
  orchestration app and the optional terminal harness.
- Assets: `public/images/rustcode-logo.png` (icon), `readme-desktop.png`
  (Tauri app screenshot from the main repo), and `tui.png` (terminal harness
  screenshot).

## Evidence on Hand

- Real screenshots: `public/images/readme-desktop.png` (1280×960),
  `public/images/tui.png` (1078×838), `public/images/rustcode-logo.png`.
- Live data: GitHub stars, GitHub releases/changelog, Vercel page views.
- Absences that must not be fabricated: no testimonials, no customer logos, no
  pricing, no benchmarks, no usage numbers beyond public GitHub stars.

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
focus, semantic HTML, `prefers-reduced-motion` respected (drawably already
freezes boil and hover re-sketch under it). No product-specific a11y standard
was stated by the user.
