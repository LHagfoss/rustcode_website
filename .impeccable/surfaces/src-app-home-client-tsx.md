---
version: 1
slug: "src-app-home-client-tsx"
primary_target: "src/app/home-client.tsx"
related_targets: []
---

# Surface brief — landing page (`/`)

## Scope and visitor mode

Persuade. Single landing page (plus the changelog route it links) for
first-time visitors deciding whether RustCode fits their workflow. Primary
action: copy the install command. Secondary: star the repo, read the
changelog.

## Audience, job, proof

Developers running AI coding agents on real codebases who want several at
once, in control. They must believe RustCode is an orchestration app — not a
chat wrapper — within one viewport. Proof: the real Tauri desktop screenshot
(`public/images/readme-desktop.png`), the real terminal harness
(`public/images/tui.png`), live GitHub stars, live release feed.

## Constraints

- Keep the drawably hand-drawn control language (AGENTS.md binding): real
  HTML controls, SVG chrome, no CSS-border fakery.
- User brief pins: dark mode, rounder geometry, reworked layout, imagery
  showing the orchestration app and the installed/optional harness.
- No invented claims: no testimonials, pricing, benchmarks, or usage numbers.
- Product truth preserved from `~/code/rustcode` README/docs.

## Direction contract

THESIS: RustCode is one app that orchestrates every coding agent — the page
proves it with the real dark desktop app first, and presents the installed,
optional `rustcode` terminal harness as the second surface. It refuses the
category default: a lone terminal screenshot under an "AI coding agent"
headline.

OWN-WORLD: The incumbent hand-drawn sketchbook flipped to night — light
chalk-blue ink (stroke `#8ab4d0`) on deep midnight paper (`#0d141c`), Geist
display type, 14–20px radii under every sketch outline, a single amber accent
kept only where a prompt lives.

STORY: Visitor reads "One app for your coding agents.", sees the real
orchestrator with threads running, learns one install ships the app plus the
optional terminal command, copies the command — or stars the repo.

FIRST VIEWPORT: Header (brand mark + star counter). Two-column desktop hero:
left column H1 "One app for your coding agents." with a sketched underline, a
two-sentence description, then the rounded install panel (platform tabs,
copyable command, release badge); right column the desktop screenshot in a
rounded sketch frame with the terminal screenshot floating over its
lower-right corner and a circled annotation caption below. On narrow screens,
the title and description lead into the real app screenshot, followed by the
rounded install panel and copy action; the optional terminal becomes a separate,
readable card beneath the install panel.

SIGNATURE INTERACTION: Platform tabs switch the exact installer command; the
copy control confirms success and gives a manual recovery when clipboard access
fails.

MOTION: A short panel change uses a visible starting state and a single
exponential ease-out shift; reduced-motion settings disable it.

FORM: Surface roll key `17a7d977` dealt grounded structures 5, 1 and 7, with 5
leading. The user's full-send instruction delegates the open composition
choice; structure 5 is selected because the real desktop app is the first
product proof, the install follows it, and the terminal remains secondary and
optional. The user's pinned constraints — dark mode, rounder Drawably chrome,
the Tauri app, and the optional terminal harness — stay in force. This is a
code-led build with no approved comp.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.
