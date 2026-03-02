"use client";

import { useState, useEffect } from "react";
import { extractColors, generateStablePalette } from "../lib/color-extractor";
import { DEFAULT_COLORS } from "../lib/constants";
import type { Artwork } from "../types/artwork";

export function useColorExtraction(
  artworks: Artwork[],
): Record<number, string[]> {
  const [colors, setColors] = useState<Record<number, string[]>>({});

  useEffect(() => {
    artworks.forEach((artwork) => {
      extractColors(artwork.image).then((extractedColors) => {
        setColors((prev) => ({ ...prev, [artwork.id]: extractedColors }));
      });
    });
  }, [artworks]);

  return colors;
}

export function useCurrentColors(
  colors: Record<number, string[]>,
  artworks: Artwork[],
  artworkId: number | undefined,
): string[] {
  const extracted = colors[artworkId ?? -1];
  const isDefaultExtraction =
    extracted &&
    extracted.length >= 3 &&
    extracted.every((color, index) => color === DEFAULT_COLORS[index]);

  if (extracted && extracted.length >= 3 && !isDefaultExtraction) {
    return extracted;
  }

  const current = artworks.find((item) => item.id === artworkId);
  if (current?.palette) return [...current.palette];
  if (current?.image) return generateStablePalette(current.image);

  return [...DEFAULT_COLORS];
}
