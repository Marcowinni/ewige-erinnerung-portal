// src/contexts/PetModeContext.tsx

import type { ReactNode } from "react";
import { useContent } from "@/contexts/ContentContext";
import type { ProductsContent } from "@/data/content/types";

/**
 * Legacy-Typen für alten Code:
 * - Mode: nur 'human' | 'pet' (Surprise wird hier bewusst ausgeklammert)
 * - ProductContent: Alias auf das neue ProductsContent
 */
export type Mode = "human" | "pet";
export type ProductContent = ProductsContent;

/**
 * Früher eigener Provider – jetzt nur noch eine Hülle,
 * weil der eigentliche Zustand aus dem ContentContext kommt.
 * So müssen Aufrufer ihre App-Struktur nicht ändern.
 */
export const PetModeProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

/**
 * Legacy-Hook, der auf den neuen ContentContext adaptiert.
 * Gibt dieselben Felder zurück wie früher:
 * - mode, setMode, isPetMode
 * - productContent  (entspricht jetzt modeContent.products)
 */
export const usePetMode = () => {
  const { mode, setMode, isPetMode, modeContent } = useContent();

  // Nur zur Typkompatibilität mit altem Code:
  const legacyMode = (mode === "pet" ? "pet" : "human") as Mode;

  return {
    mode: legacyMode,
    setMode: (m: Mode) => setMode(m), // Narrow -> Wide ist ok ('human'|'pet' ⊂ 'human'|'pet'|'surprise')
    isPetMode,
    productContent: modeContent.products as ProductContent,
  };
};
