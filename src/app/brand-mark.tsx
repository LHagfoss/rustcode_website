"use client";

import { DrawablyBadge } from "drawably/react";

export function BrandMark() {
  return (
    <DrawablyBadge
      className="brand-mark"
      variant="scribble"
      seed={11}
      aria-hidden="true"
    >
      &gt;_
    </DrawablyBadge>
  );
}
