import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useMemo,
} from "react";
import {
  getContent,
  getSharedContent,
  getModeContent,
  Language,
  Mode,
  ContentData,
  SharedContent,
  ModeContent,
} from "@/data/content";

/** ---------- Deep Merge Utility (immutabel) ---------- */
function isPlainObject(v: unknown): v is Record<string, any> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function deepMerge<T extends Record<string, any>, U extends Record<string, any>>(
  base: T,
  override: U
): T {
  const out: any = Array.isArray(base) ? [...base] : { ...base };

  for (const key of Object.keys(override || {})) {
    const bv = (base as any)[key];
    const ov = (override as any)[key];

    if (isPlainObject(bv) && isPlainObject(ov)) {
      out[key] = deepMerge(bv, ov);
    } else if (Array.isArray(bv) && Array.isArray(ov)) {
      // Strategie: Override ersetzt Array (überschaubar & erwartbar für Copy)
      out[key] = [...ov];
    } else {
      out[key] = ov;
    }
  }
  return out as T;
}

/** ---------- Context Typ ---------- */
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

  // Legacy helper (für schrittweise Migration)
  t: (key: string) => string;

  /**
   * Merged Copy Helper für Komponenten wie den MemoryUploader:
   * Übergib deine Fallbacks (DEFAULT_COPY), zurück kommt DEFAULT_COPY
   * + Überschreibungen aus dem aktuellen Mode (modeContent.uploaderCopy).
   */
  getUploaderCopy: <T extends Record<string, any>>(defaults: T) => T;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("de");
  const [mode, setMode] = useState<Mode>("human");

  const isPetMode = mode === "pet";

  // Content basierend auf Sprache/Modus laden
  const fullContent = useMemo(() => getContent(language), [language]);
  const sharedContent = useMemo(() => getSharedContent(language), [language]);
  const modeContent = useMemo(
    () => getModeContent(language, mode),
    [language, mode]
  );

  // ---------- t(): Pfad-Resolver mit Aliasen für Rückwärtskompatibilität ----------
  const t = useMemo(() => {
    // Aliase: erlauben alte Keys wie "nav.*" und "about.*"
    const aliasRoots: Record<string, string> = {
      nav: "shared.navigation",     // t('nav.start') -> shared.navigation.start
      about: "shared.aboutPage",     // t('about.story.title') -> shared.aboutPage.story.title
    };

    const walk = (obj: any, path: string[]): any => {
      let cur: any = obj;
      for (const k of path) {
        if (cur && typeof cur === "object" && k in cur) {
          cur = cur[k];
        } else {
          return undefined;
        }
      }
      return cur;
    };

    return (key: string): string => {
      const rawPath = key.split(".");
      const root = rawPath[0];

      // ggf. Alias anwenden
      const resolved =
        root in aliasRoots
          ? (aliasRoots[root] + "." + rawPath.slice(1).join(".")).split(".")
          : rawPath;

      // 1) shared prüfen
      const fromShared = walk(sharedContent as any, resolved);
      if (typeof fromShared === "string") return fromShared;

      // 2) mode prüfen
      const fromMode = walk(modeContent as any, resolved);
      if (typeof fromMode === "string") return fromMode;

      // 3) Fallback: Key anzeigen (hilfreich zum Debuggen)
      return key;
    };
  }, [sharedContent, modeContent]);

  /**
   * getUploaderCopy: merged DEFAULT_COPY mit modeContent.uploaderCopy
   * -> zentralisiert alle Uploader-Texte pro Sprache/Modus in de.ts/en.ts...
   */
  const getUploaderCopy = useMemo(() => {
    return <T extends Record<string, any>>(defaults: T): T => {
      const overrides = (modeContent as any)?.uploaderCopy ?? {};
      // kein Mutieren der Defaults
      const clone = deepMerge({} as T, defaults);
      return deepMerge(clone, overrides);
    };
  }, [modeContent]);

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
        t,
        getUploaderCopy,
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

// Legacy hooks für Kompatibilität
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
    productContent: modeContent, // Legacy Name
  };
};
