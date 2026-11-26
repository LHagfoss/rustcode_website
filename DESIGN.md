---
name: RustCode
description: Dark, precise marketing site for RustCode, the agentic development environment (ADE), and its terminal harness. Identity taken from the block-built "rc" logo.
colors:
  ground: "#0d0d0f"
  band: "#111114"
  surface: "#141417"
  surface-raised: "#19191d"
  well: "#0a0a0c"
  paper: "#f0e6e1"
  soft-copy: "#c4bcb8"
  muted-copy: "#a39d9a"
  quiet-copy: "#8a8481"
  slate: "#4a6577"
  accent: "#9cbcd0"
  rule: "rgba(240, 230, 225, 0.09)"
  rule-strong: "rgba(240, 230, 225, 0.18)"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(30px, 3.2vw, 40px)"
    fontWeight: 420
    lineHeight: 1.18
    letterSpacing: "-0.025em"
  section-heading:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(24px, 2.3vw, 28px)"
    fontWeight: 420
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    use: "commands, versions, branch names, platform strings only"
rounded:
  card: "4px"
  window: "8px"
  action: "999px"
---

# RustCode site design

## World

The logo is the source: an "rc" built from flat rectangles, slate blue for the
r and warm off-white for the c, on near-black. The site carries that into
square, crisp geometry, warm paper-coloured text instead of cool white, and
slate as the only hue. No component library: every control is semantic HTML
styled in `src/app/globals.css`.

## Rules

- **Slate is structure, light slate is signal.** `--slate` fills the logo's r,
  list markers, release bullets and text selection. `--accent` (a lighter
  slate that clears 4.5:1) is for links, the active tab bar, the `$` prompt
  and the copied state. No other hue.
- **Quiet type.** Headings are regular weight (around 420), small and
  two-tone: the title in paper, the line under it in `--muted` at the same
  size. No giant bold display type on the homepage. The layout follows
  cursor.com/product.
- **Pills for actions, square for panels.** Buttons and header actions are
  pills (solid paper, or a 1px outline). Cards are 4px, app windows 8-10px.
- **Cards with wells.** Feature rows are three cards: title, one muted line,
  an optional accent link, then a slate-tinted well holding a crop of the app
  (a mini window or a real screenshot) that runs off its right and bottom
  edge. Cards share rows through subgrid so the wells line up.
- **Tinted stage.** The hero screenshot and the install box sit on a full
  container-width slate gradient panel.
- **One big wordmark.** The only large type is the footer's "RustCode",
  full-bleed and cut off at the baseline, filled with a light-to-shadow
  gradient and a soft white highlight. It is decoration (`aria-hidden`).
- **Left-aligned.** Every heading and lede reads from the left edge.
- **Mono only for real code**: commands, versions, branch names, platform
  strings.
- **Little motion.** The hero rises in once on load and sections fade up
  16px as they scroll in. Everything else is short colour transitions. All of it switches off under `prefers-reduced-motion`.
- **Real product only.** Screenshots from the app and terminal; no mockups,
  testimonials, logos or invented numbers.

## Components

- **Brand mark:** `brand-mark.tsx`, the logo's rectangles as a crisp SVG.
- **Install box:** surface panel with text tabs (2px accent bar under the
  active one), a recessed command well, and a Copy button that fills with
  the accent once copied. Errors show inline in `--error`.
- **Feature column:** a mini UI tile on `--band` above a title and two lines
  of copy.
- **FAQ:** native `<details>` with a drawn plus/minus.
- **Changelog:** a two-column ruled list, tag and date on the left, notes with
  square slate bullets on the right.

## Homepage

A split hero on a faint grid: on the left a pill with the six harness marks
stacked (real logos from `harness-icons.tsx`, the same set the desktop app
bundles) above a left-aligned headline whose last line is muted; on the right
the subhead, a filled blue primary button (`.btn-primary`, the one place a
saturated blue is used) and a ghost Source button. Under it, `AppShowcase`: a
window of real app screenshots (Threads / Dashboard / Jobs) with a floating dock:
a dot per view, the active one a labelled pill that fills over 7s, then the
next view slides and un-blurs in. Hover or off-screen pauses it; picking a
dot or the arrow keys stops it; reduced motion never starts it.
Below: a six-cell ruled harness row with a checklist footer, two split
feature sections with small illustrative UI cards (threads + worktrees;
diff review + approval), an open-source terminal card with real build
commands beside a checklist, and a centred closing CTA holding the install
box. Testimonials are deliberately absent: no invented proof. Homepage
tokens are neutral (near-black `#050506`, `#f5f5f5` text, 8px/12px radii).
