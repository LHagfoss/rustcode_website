---
name: RustCode
description: Dark, hand-drawn visual system for RustCode, the coding-agent orchestration app.
colors:
  midnight-paper: "#0d141c"
  chalk-text: "#e9eff4"
  heading-chalk: "#f2f7fa"
  soft-copy: "#a8b9c6"
  muted-copy: "#93a6b5"
  chalk-blue: "#7fc0e6"
  bright-chalk-blue: "#a5d7f2"
  sketch-ink: "#8ab4d0"
  prompt-amber: "#e7bd75"
  control-surface: "#18232f"
  command-well: "#0a1017"
  command-text: "#dfe9f2"
  drawably-paper: "#111a24"
  panel-glaze: "rgba(255, 255, 255, 0.03)"
typography:
  display:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "clamp(3.2rem, 6.2vw, 6rem)"
    fontWeight: 650
    lineHeight: 0.97
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "clamp(1.6rem, 3vw, 2.35rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "14.5px"
    lineHeight: 1.7
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  small: "10px"
  control: "12px"
  media: "14px"
  release: "16px"
  card: "20px"
  pill: "999px"
components:
  button-outline:
    textColor: "{colors.sketch-ink}"
    rounded: "{rounded.small}"
    padding: "6px 12px"
  button-solid:
    backgroundColor: "{colors.sketch-ink}"
    textColor: "{colors.drawably-paper}"
    rounded: "{rounded.small}"
  platform-tabs:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "#8fa3b2"
    rounded: "{rounded.pill}"
    padding: "5px"
  install-panel:
    backgroundColor: "{colors.panel-glaze}"
    rounded: "{rounded.card}"
    padding: "16px"
  release-badge:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "#9db2c0"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  command-line:
    backgroundColor: "{colors.command-well}"
    textColor: "{colors.command-text}"
    rounded: "{rounded.media}"
    padding: "15px 16px"
  feature-list:
    textColor: "{colors.soft-copy}"
    padding: "0"
  product-frame:
    backgroundColor: "{colors.panel-glaze}"
    rounded: "{rounded.card}"
    padding: "10px"
  terminal-frame:
    backgroundColor: "{colors.panel-glaze}"
    rounded: "{rounded.card}"
    padding: "8px"
---

# Design System: RustCode

## Overview

**Creative North Star: "A Sketchbook Flipped to Night"**

RustCode's site translates its hand-drawn control identity into a dark developer workspace. Midnight paper and chalk-blue SVG marks hold the page together; Geist Sans keeps the message clear, while Geist Mono gives commands and compact metadata an editor-like cadence. Sketches sit on real HTML controls and surfaces instead of replacing their behavior.

Depth stays restrained. Translucent washes separate key panels from the page, and deeper shadows appear beneath product captures. Rounded geometry softens the interface while irregular SVG strokes retain the notebook character. Real product captures and plain, platform-accurate language are the site's visual material.

**Key Characteristics:**
- Midnight ground with cool chalk-blue ink.
- Geist Sans for copy; Geist Mono for commands and compact labels.
- Native HTML semantics under Drawably's hand-drawn SVG chrome.
- Rounded frames and restrained, media-led shadows.
- Amber stays on the shell prompt.

## Colors

Cool chalk blues carry both interface emphasis and pen marks. Neutral text separates headings, body copy, and metadata; the only warm accent marks command entry.

### Primary
- **Chalk Blue** (colors.chalk-blue): Links, selected platform labels, caret, and action emphasis.
- **Sketch Ink** (colors.sketch-ink): Drawably outlines, fills, annotations, and dividers.
- **Bright Chalk Blue** (colors.bright-chalk-blue): Hover and selected text where emphasis needs more contrast.

### Secondary
- **Prompt Amber** (colors.prompt-amber): The shell prompt glyph immediately before the install command.

### Neutral
- **Midnight Paper** (colors.midnight-paper): Page and browser ground.
- **Chalk Text** (colors.chalk-text) and **Heading Chalk** (colors.heading-chalk): Default copy and high-prominence headings.
- **Soft Copy** (colors.soft-copy) and **Muted Copy** (colors.muted-copy): Explanatory copy, secondary notes, and metadata.
- **Control Surface** (colors.control-surface): Filled neutral actions such as the GitHub star control.
- **Command Well** (colors.command-well) with **Command Text** (colors.command-text): Recessed installer command display.
- **Drawably Paper** (colors.drawably-paper): Dark foreground used with a filled sketch stroke.
- **Panel Glaze** (colors.panel-glaze): Light translucent wash behind install and product panels.

**The One Amber Mark Rule.** Keep amber on the shell prompt glyph; blue carries the rest of the interface emphasis.

## Typography

**Display Font:** Geist (Arial, Helvetica, sans-serif fallback)

**Body Font:** Geist (Arial, Helvetica, sans-serif fallback)
**Label/Mono Font:** Geist Mono (ui-monospace, monospace fallback)

**Character:** Geist keeps product claims direct and readable. Geist Mono marks commands, platform labels, and version metadata without turning paragraph copy into terminal text. Drawably Pen is not loaded.

### Hierarchy
- **Display** (650, clamp(3.2rem, 6.2vw, 6rem), 0.97 line-height, -0.04em): The landing-page hero headline.
- **Headline** (650, clamp(1.6rem, 3vw, 2.35rem), 1.08 line-height, -0.03em): Section and product-summary headings.
- **Title** (650, 19–20px, -0.02em): Install-panel and two-surface card headings.
- **Body** (14.5px, 1.7 line-height): General explanatory copy; hero copy rises to 17px on desktop and 16px on small screens. Paragraph measure is capped between 320px and 650px by context.
- **Label** (500–600, 10–12px, normal or -0.01em tracking, sentence case): Geist Mono for platform names, commands, release metadata, and compact controls.

**The Terminal Spec Rule.** Reserve Geist Mono for commands, platform labels, and compact metadata; keep explanatory prose in Geist Sans.

## Layout

The page uses a centered, full-width content column capped by Tailwind's 7xl container. Gutters are 24px by default and grow to 40px at the small breakpoint. The landing hero becomes two columns at 960px and wider, with a 72px desktop gap; below that, product proof and the installer stack in reading order. At 600px and below, vertical hero padding tightens, the install panel and two-surface panel reduce their internal padding, and footer metadata stacks.

The ways-to-work panel changes to two columns at 780px, with a quiet one-pixel divider. The content panel and changelog measure cap at 980px. Preserve 320px as the minimum page width. Keep image frames flexible and constrain their internal images to the available width; let the command line scroll horizontally instead of forcing the page wider.

## Elevation & Depth

This is a tonal system with selective shadows. Most content surfaces stay flat or use a faint white wash; stronger lift belongs to the real product captures. The install panel uses a broad, soft shadow (0 24px 56px, rgba(0, 0, 0, 0.34)); the desktop capture uses 0 30px 70px at 50% black, and the terminal capture uses 0 22px 48px at 55% black. Ways and release panels have no box shadow.

**The Media Shadow Rule.** Keep the strongest elevation beneath product captures; explanatory and changelog surfaces stay tonal and quiet.

## Shapes

The shape language pairs rounded geometry with irregular SVG pen outlines. Card frames use the card radius token; controls use the smaller control radius, screenshots use the media radius, and badges and tabs use pill silhouettes. The changelog release item has its own intermediate radius. Drawably's rough button and card contours use their own smaller renderer radii inside those host shapes. There are no CSS-border substitutes for the sketched control frame: Drawably draws real SVG chrome around native elements.

**The Native Sketch Rule.** Keep each control semantic and interactive in HTML, with its hand-drawn outline rendered as SVG chrome.

## Components

### Buttons
- **Character:** Compact, confident actions with a visible pen outline.
- **Typography:** Copy and platform buttons use Geist Mono; the header star control retains Drawably's Inter/system UI stack.
- **Shape:** Copy actions use the small radius token; the header star action uses the control radius token. The rough button contour is drawn with an 8px renderer radius.
- **Primary:** The install action is an outline Drawably button with monospaced copy, a 32px minimum height, and 6px 12px padding.
- **Hover / Focus:** Drawably lifts buttons by 1px on hover and sinks them by 1px with a slight scale-down on press. The outline washes with the stroke color at 10% on hover. Keyboard focus stays visible with a 2px accent outline and 3px offset.
- **Success / Disabled:** Copy success switches to the filled sketch variant. Disabled Drawably buttons dim to 45% opacity; loading uses progress cursor and faster boil.

### Chips / Badges
- **Style:** The release badge is a pill with a faint light wash, muted blue-gray text, and no CSS border.
- **State:** It carries the current release version, falling back to “latest release.”

### Cards / Containers
- **Corner Style:** The install panel and screenshot frames use the card radius token.
- **Background:** Install and screenshot frames use the panel glaze; the ways panel and changelog cards use a slightly quieter wash.
- **Shadow Strategy:** Follow the Media Shadow Rule. The install panel has a broad lift; media frames carry the deepest lift.
- **Border:** Drawably Card renders the rough SVG edge with a 10px renderer radius; the ways and changelog surfaces remain borderless tonal layers.
- **Internal Padding:** The install card uses Drawably's 16px base padding, with a tighter 19px 17px 18px on small screens. Product image frames use 10px and 8px padding.

### Inputs / Fields
- There is no editable text field on this site. The installer command is a code display, not an input; keep it selectable and horizontally scrollable.

### Navigation
- The header pairs a small sketched “>_” brand mark and monospaced wordmark with a Drawably star button.
- Text links use chalk-blue monospaced type with an underline offset from the text. Hover shifts to the brighter blue.
- Platform choice is a tablist inside the install panel, not a separate site navigation bar; it uses a pill track with an SVG underline on the active tab.

### Signature Components
- **Installer panel:** Platform tabs replace the displayed command; copy success changes the button to the filled sketch state. If clipboard access fails, keep the command visible and show manual-copy recovery text.
- **Product frames:** The real desktop screenshot leads the pair; the terminal harness screenshot remains a smaller, separately readable card. Keep the image and figure caption attached as one unit.

## Do's and Don'ts

### Do:
- **Do** keep the page on midnight paper and use chalk-blue roles for interactive emphasis and Drawably strokes.
- **Do** attach Drawably chrome to real HTML controls and containers; theme it with the Drawably custom properties.
- **Do** keep the amber accent on the shell prompt glyph.
- **Do** use the real desktop and terminal screenshots when showing product surfaces, and state platform support literally.
- **Do** preserve visible keyboard focus and respect prefers-reduced-motion.

### Don't:
- **Don't** substitute CSS borders for Drawably's sketched SVG control chrome or restyle the library's SVG paths.
- **Don't** apply Drawably Pen unless the user asks for that font.
- **Don't** spread heavy shadows across explanatory cards, release rows, or list items.
- **Don't** fabricate testimonials, customer logos, pricing, benchmarks, or usage claims.
