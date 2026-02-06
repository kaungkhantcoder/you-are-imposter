import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "mm";

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (en: string, mm: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  toggleLang: () => {},
  t: (en) => en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang((l) => (l === "en" ? "mm" : "en"));
  const t = (en: string, mm: string) => (lang === "en" ? en : mm);

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
