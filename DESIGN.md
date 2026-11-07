---
name: RustCode
description: Dark, restrained marketing site for RustCode, the coding-agent orchestration app, and its terminal harness.
colors:
  ground: "#0a0a0b"
  band: "#0d0d0f"
  surface: "#121214"
  surface-raised: "#17171a"
  well: "#0c0c0e"
  text: "#ededed"
  soft-copy: "#b6b6bc"
  muted-copy: "#9a9aa0"
  quiet-copy: "#7c7c84"
  chalk-blue: "#a9c7dd"
  rule: "rgba(255, 255, 255, 0.08)"
  rule-strong: "rgba(255, 255, 255, 0.16)"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 5.3rem)"
    fontWeight: 650
    lineHeight: 0.98
    letterSpacing: "-0.055em"
  section-heading:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4vw, 3.3rem)"
    fontWeight: 620
    lineHeight: 1.02
    letterSpacing: "-0.045em"
  card-title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16.5px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15.5px"
    lineHeight: 1.75
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "11.5px"
    fontWeight: 500
    lineHeight: 1.6
rounded:
  control: "10px"
  tile: "12px"
  card: "18px"
  panel: "20px"
  cta: "24px"
  pill: "999px"
components:
  install-box:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    width: "620px max"
  command-well:
    backgroundColor: "{colors.well}"
    rounded: "{rounded.control}"
    padding: "8px 8px 8px 13px"
  nav-cta:
    backgroundColor: "{colors.text}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    padding: "7px 15px"
  screenshot-frame:
    backgroundColor: "#151517"
    rounded: "22px"
    padding: "10px"
  feature-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "10px"
  product-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "10px"
  cta-block:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.cta}"
    padding: "64px 32px 52px"
---

# Design System: RustCode

## Overview

**Creative North Star: "A Quiet Workshop at Night"**

The site is a near-black document with one cool accent, generous vertical
rhythm, soft rounded surfaces and real product screenshots. It borrows the
calm editorial composition of the ParalX site — a centered hero, a wide framed
product image, a split intro with three small cards, a two-card surface row, a
split FAQ, a contained call to action and a footer with a huge faint wordmark —
and translates it to dark for a developer tool.

The site covers two surfaces: the desktop orchestration app at `/` and the
terminal harness at `/tui`. Both share the header, footer, install box,
feature row, product row, CTA block and FAQ/section rhythm; each page changes
its hero, screenshot and copy.

**Key Characteristics:**
- Near-black ground (`#0a0a0b`) with raised card surfaces and hairline rules.
- Centered, heavy, tightly tracked display type.
- Real screenshots in a soft rounded frame on a subtly tinted band.
- One accent: chalk blue, used for sketches, links, active tabs and tiny UI
  fragments. No second hue, gradient, glow or blob.
- Drawably hand-drawn chrome on real controls only: the install box, its tabs
  and copy button, the brand badge and the changelog load-more button.
- Miniature product UI fragments drawn in HTML/CSS inside feature tiles, never
  stock art or icon grids.

## Colors

### Primary
- **Chalk Blue** (`#a9c7dd`): drawably strokes, text links on hover, the active
  platform tab, the command prompt, the approve chip and small check marks.

### Neutral
- **Ground** (`#0a0a0b`): page background.
- **Band** (`#0d0d0f`): the full-bleed band behind the hero screenshot.
- **Surface** (`#121214`): install box, feature cards, product cards, CTA block.
- **Surface Raised** (`#17171a`): the tile inside a feature card.
- **Well** (`#0c0c0e`): the recessed command line and mini UI rows.
- **Text** (`#ededed`): headings and primary copy.
- **Soft Copy** (`#b6b6bc`): hero lede and section paragraphs.
- **Muted Copy** (`#9a9aa0`): card copy, nav links, captions, footer links.
- **Quiet Copy** (`#7c7c84`): metadata, versions, indices and micro-labels.
- **Rule** / **Rule Strong**: hairline borders; cards use `--rule` only.

**The One Accent Rule.** Chalk blue or nothing. No second hue, no gradient, no
glow. Error copy is the only exception.

## Typography

**Display / Body Font:** Geist (system sans fallback).
**Mono Font:** Geist Mono (ui-monospace fallback).

Drawably Pen is not loaded and not applied.

### Hierarchy
- **Display** (650, `clamp(2.75rem, 7vw, 5.3rem)`, 0.98, -0.055em, max 17ch):
  the centered home and TUI headlines. Two lines on desktop.
- **Section heading** (620, `clamp(2.1rem, 4vw, 3.3rem)`, 1.02): split
  intros, the centered two-surface heading, the FAQ and CTA headings.
- **Page head** (`clamp(2.6rem, 6vw, 4.4rem)`): the changelog.
- **Card title** (600, 16.5px, -0.02em): feature cards; product titles are
  22px.
- **Body** (15.5px, 1.75): split and section copy. The hero lede is 17.5px
  (16px below 720px) and caps at 640px. Card copy is 13.5–14px.
- **Mono** (500–600, 10.5–14px): commands, platform strips, feature indices,
  kickers, footer metadata and inline code.

**The Terminal Spec Rule.** Mono is for commands, labels and metadata. Prose
never turns into terminal text.

## Layout

One centered column, `max-width: 1160px`, 24px gutters (18px below 560px). The
screenshot band widens to 1280px. The home page is a stack:

1. Sticky header (66px): brand left; nav, live star count and a solid white
   Install pill right. Below 720px the nav drops to a second row.
2. Centered hero: display headline, 640px lede, centered install box, GitHub
   link and a tiny harness list.
3. Full-bleed tinted band: framed 1163×765 screenshot, one caption line and a
   metadata strip.
4. Split intro ("Run several agents at once.") and a three-card feature row.
5. Centered two-surface heading and a two-card product row.
6. Split FAQ: heading and link left, native `<details>` accordion right.
7. Rounded CTA block with the install command again.
8. Footer: brand intro, three link columns, a huge faint wordmark and a
   one-line bottom bar.

`/tui` follows the same rhythm: hero, framed screenshot, split with three
cards, two-surface row, CTA. `/changelog` uses the same header and footer with
a centered page head and an 840px release column.

**The Rhythm Rule.** Sections are separated by 80–120px of space, not by
extra rules. Cards carry the only borders.

## Elevation & Depth

Flat surfaces with hairline borders. The screenshot frame gets one deep, soft
shadow (`0 60px 130px -80px #000`) to lift it off the band; the install box gets
a smaller one. Cards are flat. No glows.

## Shapes

Drawably draws its own contours on the install box, its tabs, the copy button
and the brand badge. Everything else is a rounded surface: 12px tiles, 18px
feature cards, 20px product cards, 24px CTA block, 999px nav pill.

**The Native Sketch Rule.** Drawably chrome sits on real HTML controls. No CSS
border may imitate it. Miniature UI inside feature tiles is illustration, not a
control.

## Components

### Header
- Brand: a sketched `>_` badge plus the RustCode wordmark in mono.
- Nav: App, TUI, Changelog (13.5px). The current page is full white.
- GitHub stars: icon plus compact live count, muted, no pill.
- Install: solid white pill link to `/#install`. Hover lifts 1px.
- Sticky with a translucent near-black background and a hairline bottom rule.

### Install box
- Drawably card on `--surface`, 620px max, centered.
- Platform tabs are text buttons with a sketched underline on the active one.
- The current release sits opposite in quiet mono.
- The command is a recessed well with a chalk-blue `$` and a Drawably outline
  Copy button; copying turns it solid and says "Copied" for 1.8s. A failed
  clipboard shows an inline manual-copy message.
- Below 720px the command wraps and the copy button drops underneath, right
  aligned.
- The note explains what gets installed, including `--no-app` on `/tui`.

### Screenshot band
- Full-bleed `--band` with top and bottom rules; 48px of padding.
- Frame: 10px padding, 1px `--rule-strong`, 22px radius, `#151517`, image at
  13px radius.
- One centered caption line, then a ruled strip with platforms and license.
- `/` uses `readme-desktop.png`; `/tui` uses `tui.png`.

### Feature row
- Three cards, equal height, 16px gap.
- Each card: 172px tile (`--surface-raised`) with a miniature UI fragment, then
  a mono index, a title and two lines of copy.
- Fragments: a mini thread composer with model chips; two branch rows; a
  command with Approve/Deny and a checkpoint line.
- Below 860px the cards stack and the tile moves beside the copy; below 560px
  the tile sits on top.

### Product row
- Two large cards, 16px gap, image area on top (16:10 crop, 12px radius).
- 10px padding, 20px radius, `--surface`; hover lifts 2px and strengthens the
  border. The link card's bottom label underlines on hover.
- One card is the current page and says "You are here" / "On this page".

### FAQ
- Split: heading, short paragraph and one link left; accordion right.
- Native `<details>`; summary is 15.5px/550 with a CSS plus that loses its
  vertical stroke when open. Answer is 14px muted, max 62ch.
- Rows are separated by 1px rules; no card.

### CTA block
- Contained surface, 24px radius, 64px padding, centered copy, the install box
  and a GitHub link. Reuses the same install component as the hero.

### Changelog
- Centered page head with GitHub link.
- 840px column: mono tag, quiet date, dash-marked notes, ruled rows.
- "Load more" is a Drawably outline button; infinite scroll and the release
  API are unchanged.

### Footer
- Brand intro left, three mono-labelled link columns right (Product, Project,
  Install).
- A huge faint "RustCode" wordmark (`rgba(255,255,255,0.055)`,
  `clamp(50px, 16vw, 232px)`) spans the width, never clipped.
- Bottom bar: copyright/license/views left; GitHub, TUI, Changelog right.
  Wraps without overflowing at 375px.

## Do's and Don'ts

### Do:
- **Do** keep the page on `#0a0a0b` with chalk blue as the only accent.
- **Do** show the real screenshots and real GitHub numbers.
- **Do** use the product's words: thread, harness, model, effort, worktree,
  fan-out, checkpoint, approval.
- **Do** keep Drawably on real controls and theme it with its custom
  properties.
- **Do** keep focus visible and respect `prefers-reduced-motion` (Drawably
  handles its own freeze).
- **Do** keep the hero centered and the product image wide; the contrast
  between centered campaigns and left-aligned split sections carries the page.

### Don't:
- **Don't** add gradients, glows, decorative blobs, icon-grid feature cards or
  emoji.
- **Don't** invent testimonials, customer logos, pricing, benchmarks or usage
  numbers.
- **Don't** fake Drawably's control chrome with CSS borders.
- **Don't** load or apply Drawably Pen.
- **Don't** use stock art or stock screenshots; the mini tiles are drawn from
  the product's own vocabulary.
- **Don't** reintroduce Tailwind utility classes on marketing markup; the
  styles live in `globals.css` as semantic classes.
