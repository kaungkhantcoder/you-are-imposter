import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/hooks/useLang";
import { LanguageToggle } from "@/components/game/LanguageToggle";
import { Users, Wifi, Eye, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-2 flex items-center gap-3"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-game text-4xl">
          🕵️
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-1 text-center text-3xl font-black text-primary-foreground tracking-tight"
      >
        {t("Who is the", "ဘယ်သူက")}
      </motion.h1>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-2 text-center text-4xl font-black text-primary tracking-tight"
      >
        {t("Imposter?", "သူလျှို?")}
      </motion.h1>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-10 text-center text-muted-foreground font-semibold"
      >
        {t("Find the spy among your friends!", "မင်းသူငယ်ချင်းထဲက သူလျှိုကို ရှာ!")}
      </motion.p>

      <div className="flex w-full max-w-xs flex-col gap-4">
        <motion.button
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/setup")}
          className="flex items-center gap-3 rounded-2xl bg-primary px-6 py-4 font-extrabold text-primary-foreground shadow-game transition-all active:translate-y-[2px] active:shadow-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20">
            <Users className="h-5 w-5" />
          </div>
          <div className="text-left">
            <div className="text-lg">{t("Press & Play", "နှိပ်ပြီးကစား")}</div>
            <div className="text-xs font-semibold opacity-80">{t("Play on one device", "စက်တစ်ခုတည်းနဲ့ ကစား")}</div>
          </div>
        </motion.button>

        <motion.button
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/online")}
          className="flex items-center gap-3 rounded-2xl bg-secondary px-6 py-4 font-extrabold text-secondary-foreground shadow-blue transition-all active:translate-y-[2px] active:shadow-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-foreground/20">
            <Wifi className="h-5 w-5" />
          </div>
          <div className="text-left">
            <div className="text-lg">{t("Online", "အွန်လိုင်း")}</div>
            <div className="text-xs font-semibold opacity-80">{t("Join with room code", "အခန်းကုဒ်ဖြင့် ဝင်ရောက်ပါ")}</div>
          </div>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex items-center gap-2 text-xs text-muted-foreground font-semibold"
      >
        <Eye className="h-3.5 w-3.5" />
        {t("Find. Discuss. Vote.", "ရှာ။ ဆွေးနွေး။ မဲပေး။")}
        <Sparkles className="h-3.5 w-3.5 text-game-yellow" />
      </motion.div>
    </div>
  );
};

export default Index;
