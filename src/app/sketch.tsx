"use client";

import { DrawablyUnderline } from "drawably/react";
import type { ReactNode } from "react";

// drawably/react uses hooks and ships without a "use client" directive, so the
// handful of decorations used by server pages are re-exported from here.
export function Underline({
  children,
  seed,
}: {
  children: ReactNode;
  seed: number;
}) {
  return <DrawablyUnderline seed={seed}>{children}</DrawablyUnderline>;
}
