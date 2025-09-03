import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useMemo,
} from "react";
import {
  humanContent,
  petContent,
  type ProductContent,
} from "@/data/productContent";

export type Mode = "human" | "pet";

interface PetModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  isPetMode: boolean;
  productContent: ProductContent;
}

const PetModeContext = createContext<PetModeContextType | undefined>(undefined);

export const PetModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>("human");

  const isPetMode = mode === "pet";

  // Wählt je nach Modus den passenden Content
  const productContent = useMemo<ProductContent>(
    () => (isPetMode ? petContent : humanContent),
    [isPetMode]
  );

  return (
    <PetModeContext.Provider value={{ mode, setMode, isPetMode, productContent }}>
      {children}
    </PetModeContext.Provider>
  );
};

export const usePetMode = () => {
  const context = useContext(PetModeContext);
  if (!context) {
    throw new Error("usePetMode must be used within a PetModeProvider");
  }
  return context;
};
