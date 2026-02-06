import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { LanguageToggle } from "@/components/game/LanguageToggle";
import { ArrowLeft, Wifi, Users, Copy } from "lucide-react";
import { generateRoomCode } from "@/lib/gameLogic";

export default function OnlineMode() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [tab, setTab] = useState<"create" | "join">("join");
  const [roomCode, setRoomCode] = useState("");
  const [generatedCode] = useState(generateRoomCode);

  return (
    <div className="min-h-screen bg-background px-4 pb-8">
      <div className="flex items-center justify-between pt-4">
        <button onClick={() => navigate("/")} className="flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-card-game">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <LanguageToggle />
      </div>

      <div className="mx-auto mt-8 max-w-md">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="mb-6 flex items-center gap-3">
            <Wifi className="h-6 w-6 text-secondary" />
            <h1 className="text-2xl font-black">{t("Online Mode", "အွန်လိုင်းမုဒ်")}</h1>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex rounded-2xl bg-muted p-1">
            <button
              onClick={() => setTab("join")}
              className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
                tab === "join" ? "bg-card shadow-card-game" : ""
              }`}
            >
              {t("Join Room", "အခန်းဝင်")}
            </button>
            <button
              onClick={() => setTab("create")}
              className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
                tab === "create" ? "bg-card shadow-card-game" : ""
              }`}
            >
              {t("Create Room", "အခန်းဖန်တီး")}
            </button>
          </div>

          {tab === "join" ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-card p-6 shadow-card-game">
                <label className="mb-2 block text-sm font-bold text-muted-foreground">
                  {t("Room Code", "အခန်းကုဒ်")}
                </label>
                <input
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  placeholder="ABC123"
                  className="w-full rounded-xl bg-muted px-4 py-3 text-center text-2xl font-black tracking-widest outline-none placeholder:text-muted-foreground/40"
                />
              </div>
              <button
                disabled={roomCode.length < 6}
                className="w-full rounded-2xl bg-secondary py-4 font-extrabold text-secondary-foreground shadow-blue disabled:opacity-40 active:translate-y-[2px] active:shadow-none"
              >
                <Users className="mr-2 inline h-5 w-5" />
                {t("Join Game", "ကစားပွဲ ဝင်ပါ")}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl bg-card p-6 shadow-card-game text-center">
                <p className="mb-2 text-sm font-bold text-muted-foreground">{t("Your Room Code", "သင့်အခန်းကုဒ်")}</p>
                <p className="text-4xl font-black tracking-widest text-primary">{generatedCode}</p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(generatedCode)}
                className="w-full rounded-2xl bg-muted py-3 font-bold active:translate-y-[2px]"
              >
                <Copy className="mr-2 inline h-4 w-4" />
                {t("Copy Code", "ကုဒ်ကူးပါ")}
              </button>
              <div className="rounded-2xl bg-game-yellow-light p-4 text-center">
                <p className="text-sm font-bold">
                  🚧 {t("Online mode coming soon! Use Press & Play for now.", "အွန်လိုင်းမုဒ် မကြာမီလာမည်! လောလောဆယ် Press & Play ကိုသုံးပါ။")}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
