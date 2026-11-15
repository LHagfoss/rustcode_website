---
name: RustCode
description: Dark, precise marketing site for RustCode, the coding-agent orchestration app, and its terminal harness. Identity taken from the block-built "rc" logo.
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
    fontSize: "clamp(2.8rem, 6.4vw, 5.25rem)"
    fontWeight: 640
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  section-heading:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.1rem)"
    fontWeight: 630
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    use: "commands, versions, branch names, platform strings only"
rounded:
  small: "2px"
  control: "4px"
  panel: "6px"
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
- **Square corners.** 2px on chips, 4px on controls, 6px on panels and
  screenshots. No pills.
- **Rules, not cards.** Sections are divided by 1px hairlines. Feature columns
  sit in a ruled row; product links are a screenshot plus copy, not a card.
- **Left-aligned.** Headlines and ledes read from the left edge; the hero
  pairs the install box with a side column of facts (harnesses, licence,
  data).
- **Mono only for real code**: commands, versions, branch names, platform
  strings.
- **One motion moment.** The hero screenshot reveals once on load
  (clip-path + blur, exponential ease-out). Everything else is short colour
  transitions. All of it switches off under `prefers-reduced-motion`.
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
