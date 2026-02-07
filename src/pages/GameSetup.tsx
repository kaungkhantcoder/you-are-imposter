import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { LanguageToggle } from "@/components/game/LanguageToggle";
import { categories } from "@/data/words";
import { getMaxImposters } from "@/lib/gameLogic";
import { useGameSession } from "@/hooks/useGameSession";
import { ArrowLeft, Plus, Minus, Check, Users, Shuffle, Play } from "lucide-react";

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 17;
const MIN_CATEGORIES = 3;

export default function GameSetup() {
  const navigate = useNavigate();
  const { t } = useLang();
  const { startGame } = useGameSession();

  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(
    Array.from({ length: 4 }, (_, i) => `${t("Player", "ကစားသူ")} ${i + 1}`)
  );
  const [imposterCount, setImposterCount] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categories.map((c) => c.id)
  );
  const [step, setStep] = useState<"players" | "categories" | "ready">("players");

  const updatePlayerCount = (delta: number) => {
    const newCount = Math.min(MAX_PLAYERS, Math.max(MIN_PLAYERS, playerCount + delta));
    setPlayerCount(newCount);
    setPlayerNames((prev) => {
      if (newCount > prev.length) {
        return [...prev, ...Array.from({ length: newCount - prev.length }, (_, i) => `${t("Player", "ကစားသူ")} ${prev.length + i + 1}`)];
      }
      return prev.slice(0, newCount);
    });
    const maxImp = getMaxImposters(newCount);
    if (imposterCount > maxImp) setImposterCount(maxImp);
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const canProceedCategories = selectedCategories.length >= MIN_CATEGORIES;

  const handleStart = () => {
    const session = startGame(playerNames, imposterCount, selectedCategories);
    navigate(`/play/${session.sessionId}`);
  };

  const maxImposters = getMaxImposters(playerCount);

  return (
    <div className="min-h-screen bg-background px-4 pb-8">
      <div className="flex items-center justify-between pt-4">
        <button onClick={() => step === "players" ? navigate("/") : setStep("players")} className="flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-card-game">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <LanguageToggle />
      </div>

      {/* Progress */}
      <div className="mx-auto mt-4 flex max-w-md gap-2">
        {["players", "categories", "ready"].map((s, i) => (
          <div key={s} className={`h-2 flex-1 rounded-full transition-all ${
            (step === "players" && i === 0) || (step === "categories" && i <= 1) || step === "ready"
              ? "bg-primary" : "bg-muted"
          }`} />
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-md">
        <AnimatePresence mode="wait">
          {step === "players" && (
            <motion.div key="players" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}>
              <h2 className="mb-6 text-2xl text-primary-foreground  font-black">{t("Players", "ကစားသူများ")}</h2>

              {/* Player count */}
              <div className="mb-4 flex items-center justify-between rounded-2xl bg-card p-4 shadow-card-game">
                <span className="font-bold">{t("Number of Players", "ကစားသူ အရေအတွက်")}</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => updatePlayerCount(-1)} disabled={playerCount <= MIN_PLAYERS} className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted font-bold disabled:opacity-30">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-xl font-black">{playerCount}</span>
                  <button onClick={() => updatePlayerCount(1)} disabled={playerCount >= MAX_PLAYERS} className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground disabled:opacity-30">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Imposter count */}
              <div className="mb-4 flex items-center justify-between rounded-2xl bg-card p-4 shadow-card-game">
                <span className="font-bold">{t("Imposters", "သူလျှိုများ")} 🕵️</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setImposterCount(Math.max(1, imposterCount - 1))} disabled={imposterCount <= 1} className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted font-bold disabled:opacity-30">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-xl font-black">{imposterCount}</span>
                  <button onClick={() => setImposterCount(Math.min(maxImposters, imposterCount + 1))} disabled={imposterCount >= maxImposters} className="flex h-8 w-8 items-center justify-center rounded-lg bg-game-red font-bold text-primary-foreground disabled:opacity-30">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Player names */}
              <div className="mb-4 space-y-2">
                {playerNames.map((name, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl bg-card px-3 py-2 shadow-card-game">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-game-green-light text-sm font-black text-game-green">
                      {i + 1}
                    </div>
                    <input
                      value={name}
                      onChange={(e) => {
                        const updated = [...playerNames];
                        updated[i] = e.target.value;
                        setPlayerNames(updated);
                      }}
                      maxLength={20}
                      className="flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-muted-foreground"
                      placeholder={`${t("Player", "ကစားသူ")} ${i + 1}`}
                    />
                  </div>
                ))}
              </div>

              <button onClick={() => setStep("categories")} className="w-full rounded-2xl bg-primary py-4 font-extrabold text-primary-foreground shadow-game active:translate-y-[2px] active:shadow-none">
                {t("Next", "ဆက်လုပ်ပါ")} →
              </button>
            </motion.div>
          )}

          {step === "categories" && (
            <motion.div key="categories" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}>
              <h2 className="mb-2 text-2xl text-primary-foreground font-black">{t("Categories", "အမျိုးအစားများ")}</h2>
              <p className="mb-4 text-sm text-muted-foreground font-semibold">
                {t(`Choose at least ${MIN_CATEGORIES} categories`, `အနည်းဆုံး ${MIN_CATEGORIES} ခု ရွေးပါ`)}
              </p>

              <div className="mb-4 flex gap-2">
                <button onClick={() => setSelectedCategories(categories.map((c) => c.id))} className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">
                  {t("Select All", "အားလုံးရွေး")}
                </button>
                <button onClick={() => setSelectedCategories([])} className="rounded-xl bg-muted px-4 py-2 text-xs font-bold">
                  {t("Clear", "ရှင်းပါ")}
                </button>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                {categories.map((cat) => {
                  const selected = selectedCategories.includes(cat.id);
                  return (
                    <motion.button
                      key={cat.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleCategory(cat.id)}
                      className={`relative flex flex-col items-center gap-1 rounded-2xl p-4 font-bold transition-all ${
                        selected
                          ? "bg-primary text-primary-foreground shadow-game"
                          : "bg-card shadow-card-game"
                      }`}
                    >
                      {selected && (
                        <div className="absolute top-2 right-2">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-sm">{t(cat.name, cat.nameMm)}</span>
                    </motion.button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep("ready")}
                disabled={!canProceedCategories}
                className="w-full rounded-2xl bg-primary py-4 font-extrabold text-primary-foreground shadow-game disabled:opacity-40 active:translate-y-[2px] active:shadow-none"
              >
                {t("Next", "ဆက်လုပ်ပါ")} →
              </button>
            </motion.div>
          )}

          {step === "ready" && (
            <motion.div key="ready" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center pt-8">
              <div className="mb-6 text-6xl">🕵️‍♂️</div>
              <h2 className="mb-2 text-2xl text-primary-foreground font-black">{t("Ready to Play!", "ကစားဖို့ အဆင်သင့်!")}</h2>
              <div className="mb-6 space-y-2 text-center text-muted-foreground font-semibold">
                <p><Users className="mr-1 inline h-4 w-4" /> {playerCount} {t("players", "ကစားသူများ")} • {imposterCount} {t("imposter(s)", "သူလျှို")}</p>
                <p><Shuffle className="mr-1 inline h-4 w-4" /> {selectedCategories.length} {t("categories", "အမျိုးအစားများ")}</p>
              </div>

              <button
                onClick={handleStart}
                className="flex items-center gap-2 rounded-2xl bg-primary px-10 py-5 text-xl font-black text-primary-foreground shadow-game active:translate-y-[2px] active:shadow-none"
              >
                <Play className="h-6 w-6" />
                {t("Start Game!", "ကစားမယ်!")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
