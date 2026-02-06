import { useLang } from "@/hooks/useLang";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm font-bold shadow-card-game transition-all hover:scale-105 active:scale-95"
    >
      <Globe className="h-4 w-4" />
      {lang === "en" ? "EN" : "MM"}
    </button>
  );
}
