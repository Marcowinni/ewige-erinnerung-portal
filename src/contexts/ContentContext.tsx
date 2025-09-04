import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useMemo,
} from "react";
import { getContent, getSharedContent, getModeContent, Language, Mode, ContentData, SharedContent, ModeContent } from "@/data/content";

interface ContentContextType {
  // Language management
  language: Language;
  setLanguage: (language: Language) => void;
  
  // Mode management
  mode: Mode;
  setMode: (mode: Mode) => void;
  isPetMode: boolean;
  
  // Content access
  fullContent: ContentData;
  sharedContent: SharedContent;
  modeContent: ModeContent;
  
  // Legacy helper (for backwards compatibility during migration)
  t: (key: string) => string;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("de");
  const [mode, setMode] = useState<Mode>("human");

  const isPetMode = mode === "pet";

  // Get content based on current language
  const fullContent = useMemo(() => getContent(language), [language]);
  const sharedContent = useMemo(() => getSharedContent(language), [language]);
  const modeContent = useMemo(() => getModeContent(language, mode), [language, mode]);

  // Legacy t function for backwards compatibility
  const t = useMemo(() => {
    return (key: string): string => {
      const keys = key.split('.');
      
      // Try to find the key in shared content first
      let value: any = sharedContent;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // If not found in shared, try mode content
          value = modeContent;
          for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
              value = value[k];
            } else {
              return key; // Return key if not found
            }
          }
          break;
        }
      }
      
      return typeof value === 'string' ? value : key;
    };
  }, [sharedContent, modeContent]);

  return (
    <ContentContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        mode, 
        setMode, 
        isPetMode, 
        fullContent, 
        sharedContent, 
        modeContent, 
        t 
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};

// Legacy hooks for backwards compatibility
export const useLanguage = () => {
  const { language, setLanguage, t } = useContent();
  return { language, setLanguage, t };
};

export const usePetMode = () => {
  const { mode, setMode, isPetMode, modeContent } = useContent();
  return { 
    mode, 
    setMode, 
    isPetMode, 
    productContent: modeContent // Legacy name
  };
};