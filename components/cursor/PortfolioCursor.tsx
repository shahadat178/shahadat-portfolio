"use client";

import { EmojiCursor } from "@/components/cursor/EmojiCursor";
import { LiquidCursor } from "@/components/cursor/LiquidCursor";
import { OrbitTimeCursor } from "@/components/cursor/OrbitTimeCursor";
import type { PointerMode } from "@/types/portfolio";

type PortfolioCursorProps = Readonly<{
  mode: PointerMode;
}>;

export function PortfolioCursor({ mode }: PortfolioCursorProps) {
  if (mode === "liquid") {
    return <LiquidCursor />;
  }

  if (mode === "crystal") {
    return <EmojiCursor />;
  }

  if (mode === "orbit") {
    return <OrbitTimeCursor />;
  }

  return null;
}
