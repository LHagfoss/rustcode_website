---
name: RustCode
description: Dark, restrained visual system for RustCode, the coding-agent orchestration app, and its terminal harness.
colors:
  ground: "#0a0b0d"
  raised: "#101216"
  well: "#0d0f12"
  text: "#f2f4f6"
  soft-copy: "#a8aeb6"
  muted-copy: "#838a93"
  chalk-blue: "#a9c7dd"
  rule: "rgba(255, 255, 255, 0.09)"
  rule-strong: "rgba(255, 255, 255, 0.18)"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.4rem)"
    fontWeight: 640
    lineHeight: 1.02
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18.5px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  page-title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 3.4rem)"
    fontWeight: 640
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14.5px"
    lineHeight: 1.62
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "12.5px"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  control: "10px"
  frame: "16px"
  pill: "999px"
components:
  install-box:
    backgroundColor: "rgba(255, 255, 255, 0.028)"
    rounded: "{rounded.frame}"
    width: "660px max"
  command-well:
    backgroundColor: "{colors.well}"
    rounded: "{rounded.control}"
    padding: "8px 8px 8px 13px"
  copy-button:
    textColor: "{colors.soft-copy}"
    rounded: "8px"
    padding: "4px 10px"
  stars-chip:
    textColor: "{colors.muted-copy}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  screenshot-frame:
    backgroundColor: "rgba(255, 255, 255, 0.018)"
    rounded: "{rounded.frame}"
    padding: "8px"
---

# Design System: RustCode

## Overview

**Creative North Star: "A Quiet Workshop at Night"**

The site is a near-black document with one cool accent, plenty of space, and
real product screenshots. It reads like a README from a project that respects
the reader: a short headline, a command to copy, then plain sections in the
product's own vocabulary. Drawably's hand-drawn chrome appears only where it
belongs — on the install command's card, its platform tabs, its copy button,
and one underline in the hero.

The site covers two surfaces: the desktop orchestration app at `/` and the
terminal harness at `/tui`. They share the header, the footer, the install box
and the section grid; each page only changes its hero, screenshot and copy.

**Key Characteristics:**
- Near-black ground (`#0a0b0d`), white copy, one chalk-blue accent.
- Geist for prose, Geist Mono for commands, platforms and metadata.
- Drawably sketches on real controls, used sparingly.
- Real screenshots, live GitHub data, literal platform lists.
- Horizontal rules instead of cards; no gradients, glows, blobs or icon grids.

## Colors

### Primary
- **Chalk Blue** (`#a9c7dd`): links, the install prompt glyph, Drawably strokes,
  the active platform tab. The only accent on the page.

### Neutral
- **Ground** (`#0a0b0d`): page background.
- **Raised** (`#101216`): Drawably paper for filled buttons.
- **Well** (`#0d0f12`): the recessed command line inside the install box.
- **Text** (`#f2f4f6`): headings and primary copy.
- **Soft Copy** (`#a8aeb6`): paragraphs and list items.
- **Muted Copy** (`#838a93`): captions, metadata, footer, version labels.
- **Rule** / **Rule Strong**: one-pixel separators; no card borders.

**The One Accent Rule.** Chalk blue or nothing. No second hue, no gradient, no
glow. Amber, purple and status colors are gone from the marketing surfaces.

## Typography

**Display / Body Font:** Geist (system sans fallback).
**Mono Font:** Geist Mono (ui-monospace fallback).

Drawably Pen is not loaded and not applied.

### Hierarchy
- **Display** (640, `clamp(2.5rem, 6vw, 4.4rem)`, 1.02, -0.045em, max 15ch):
  the home hero headline. It breaks to two lines on desktop.
- **Page title** (640, `clamp(2.2rem, 5vw, 3.4rem)`, 1.04): `/tui` and
  `/changelog` headings.
- **Headline** (600, 18.5px, -0.015em): section and CTA headings.
- **Body** (14.5px, 1.62): section copy. The hero lede is 17px (16px below
  600px); paragraphs cap at 52–62ch.
- **Mono** (500–600, 11.5–13px): commands, tabs, platform lists, version
  labels, release tags, footer, all inline code.

**The Terminal Spec Rule.** Mono is for commands and metadata. Prose never
turns into terminal text.

## Layout

One centred column, `max-width: 1100px`, 24px gutters (20px below 600px).
The page is a stack: header (64px tall, one rule), hero, install box, one
full-width screenshot, a four-item section grid (single column, two columns at
840px), a platform line, a cross-link row, a closing CTA and a one-line footer.

Hero: 84px top padding on desktop, 52px on mobile. Headline, 22px gap, lede,
38px gap, install box, 20px gap, text links. Screenshot follows at 56px
(40px on mobile).

**The Horizontal Rule Rule.** Sections are separated by 1px rules, not cards,
shadows or background panels. Only the install box is a surface.

## Elevation & Depth

Flat by design. There are no box shadows anywhere on the marketing pages; the
screenshots carry their own captured depth. Separators are `rgba(255,255,255,
0.09)` and nothing else.

## Shapes

Drawably draws its own contours around a small set of host shapes: the install
box (16px), the copy button (8px), the platform tabs (underlined text), and the
hero underline. Everything else is rectangular with the document's rules. The
star chip and the release version are plain monospace text; the star chip uses
a 999px border, which is a link chip, not a control.

**The Native Sketch Rule.** Drawably chrome sits on real HTML controls. No CSS
border may imitate it.

## Components

### Header
- Brand: a small sketched `>_` badge plus the "RustCode" wordmark in mono.
- Navigation: App, TUI, Changelog — 13.5px sans links, the current page in
  full white. A GitHub stars chip (live count, falls back to "GitHub") closes
  the row.
- Below 600px the nav wraps under the brand on its own line; it never
  overflows.

### Install box
- Drawably card, `rgba(255,255,255,0.028)`, max 660px.
- Platform tabs are text buttons with a sketched underline on the active one.
  The current release tag sits opposite them in muted mono.
- The command is a recessed well with a chalk-blue `$` and a Drawably outline
  "Copy" button; copying switches it to the solid variant and says "Copied"
  for 1.8s. A failed clipboard shows an inline manual-copy message.
- Below 600px the command wraps onto its own lines and the copy button drops
  underneath, right-aligned.
- The note under the command explains what gets installed — including
  `--no-app` on `/tui`.

### Screenshots
- One frame per page: 8px padding, 1px rule, 16px radius, image at 9px radius.
- Caption in muted mono/sans below, one line.
- `/` uses `readme-desktop.png`; `/tui` uses `tui.png`.

### Sections
- Heading, one paragraph, up to two dashed-marker bullets.
- 32px vertical padding, 1px rule between rows; two columns from 840px with a
  64px gutter and no vertical rule. Section 3 and 4 take a top rule.

### Links
- Text links are chalk blue, mono, underlined with a 5px offset. The cross-link
  row pairs a sentence with one right-aligned link.

### Changelog
- Release rows: mono tag, muted date, disc-marked notes, ruled rows.
- "Load more" is a Drawably outline button; infinite scroll and the release
  API are unchanged.

### Footer
- One row, mono 11.5px: "Apache-2.0 · N views" on the left, GitHub, TUI,
  Changelog on the right. Wraps to two lines on mobile.

## Do's and Don'ts

### Do:
- **Do** keep the page on `#0a0b0d` with chalk blue as the only accent.
- **Do** show the real screenshots and real GitHub numbers.
- **Do** use the product's words: thread, harness, model, effort, worktree,
  fan-out, checkpoint, approval.
- **Do** keep Drawably on real controls and theme it with its custom
  properties.
- **Do** keep focus visible and respect `prefers-reduced-motion` (Drawably
  handles its own freeze).

### Don't:
- **Don't** add gradients, glows, decorative blobs, icon-grid feature cards,
  eyebrow labels above every section, or emoji.
- **Don't** invent testimonials, customer logos, pricing, benchmarks or usage
  numbers.
- **Don't** fake Drawably's control chrome with CSS borders.
- **Don't** load or apply Drawably Pen.
- **Don't** reintroduce Tailwind utility classes on marketing markup; the
  styles live in `globals.css` as semantic classes.
