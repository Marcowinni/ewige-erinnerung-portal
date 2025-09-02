import { createContext, useContext, useState, type ReactNode } from 'react';

export type Mode = 'human' | 'pet';

interface PetModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  isPetMode: boolean;
}

const PetModeContext = createContext<PetModeContextType | undefined>(undefined);

export const PetModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>('human');

  return (
    <PetModeContext.Provider 
      value={{ 
        mode, 
        setMode, 
        isPetMode: mode === 'pet' 
      }}
    >
      {children}
    </PetModeContext.Provider>
  );
};

export const usePetMode = () => {
  const context = useContext(PetModeContext);
  if (!context) {
    throw new Error('usePetMode must be used within a PetModeProvider');
  }
  return context;
};