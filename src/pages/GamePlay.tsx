import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { LanguageToggle } from "@/components/game/LanguageToggle";
import { useGameSession } from "@/hooks/useGameSession";
import { Eye, EyeOff, ArrowRight, MessageCircle, Vote, Trophy, RotateCcw, Home, ChevronDown } from "lucide-react";

export default function GamePlay() {
  const navigate = useNavigate();
  const { t } = useLang();
  const { session, markViewed, nextPlayer, setPhase, castVote, resetGame } = useGameSession();

  // If no session, redirect to setup
  useEffect(() => {
    if (!session) navigate("/setup");
  }, [session, navigate]);

  if (!session) return null;

  const currentPlayer = session.players[session.currentPlayerIndex];

  return (
    <div className="min-h-screen bg-background px-4 pb-8">
      <div className="flex items-center justify-between pt-4">
        <div className="text-xs font-bold text-muted-foreground rounded-lg bg-card px-3 py-1.5 shadow-card-game">
          ID: {session.sessionId}
        </div>
        <LanguageToggle />
      </div>

      <div className="mx-auto mt-4 max-w-md">
        <AnimatePresence mode="wait">
          {session.phase === "viewing" && (
            <ViewingPhase
              key="viewing"
              player={currentPlayer}
              playerIndex={session.currentPlayerIndex}
              totalPlayers={session.players.length}
              word={session.word}
              hint={session.imposterHint}
              hintMm={session.imposterHintMm}
              onViewed={() => markViewed(session.currentPlayerIndex)}
              onNext={nextPlayer}
              t={t}
            />
          )}
          {session.phase === "discussion" && (
            <DiscussionPhase key="discussion" onStartVoting={() => setPhase("voting")} t={t} />
          )}
          {session.phase === "voting" && (
            <VotingPhase
              key="voting"
              players={session.players}
              votes={session.votes}
              onVote={castVote}
              onFinish={() => setPhase("result")}
              t={t}
            />
          )}
          {session.phase === "result" && (
            <ResultPhase
              key="result"
              session={session}
              onPlayAgain={() => { resetGame(); navigate("/setup"); }}
              onHome={() => { resetGame(); navigate("/"); }}
              t={t}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Viewing Phase ---
function ViewingPhase({
  player, playerIndex, totalPlayers, word, hint, hintMm, onViewed, onNext, t,
}: {
  player: { name: string; isImposter: boolean; hasViewed: boolean };
  playerIndex: number;
  totalPlayers: number;
  word: { en: string; mm: string };
  hint: string;
  hintMm: string;
  onViewed: () => void;
  onNext: () => void;
  t: (en: string, mm: string) => string;
}) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    onViewed();
  };

  const handleNext = () => {
    setRevealed(false);
    onNext();
  };

  return (
    <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} className="flex flex-col items-center pt-4">
      {/* Progress */}
      <div className="mb-4 flex w-full gap-1.5">
        {Array.from({ length: totalPlayers }).map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full ${i <= playerIndex ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      <p className="mb-2 text-sm font-bold text-primary-foreground">
        {t("Player", "ကစားသူ")} {playerIndex + 1} / {totalPlayers}
      </p>

      <motion.div layout className="mb-4 text-center">
        <h2 className="text-2xl text-primary-foreground  font-black">{player.name}</h2>
        <p className="text-sm text-muted-foreground font-semibold">
          {t("Tap the card to see your role", "သင့်အခန်းကဏ္ဍကို ကြည့်ရန် ကတ်ကို နှိပ်ပါ")}
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        layout
        className={`relative w-full max-w-xs overflow-hidden rounded-3xl p-6 text-center shadow-card-game ${
          revealed
            ? player.isImposter
              ? "text-red-300"
              : "text-green-300"
            : "bg-card cursor-pointer"
        }`}
        onClick={!revealed ? handleReveal : undefined}
        whileTap={!revealed ? { scale: 0.97 } : {}}
      >
        {!revealed ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <EyeOff className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-bold text-muted-foreground">
              {t("Tap to reveal", "ဖွင့်ကြည့်ရန် နှိပ်ပါ")}
            </p>
            <ChevronDown className="h-5 w-5 animate-bounce text-muted-foreground" />
          </div>
        ) : (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-3 py-4">
            <div className="text-5xl">{player.isImposter ? "🕵️" : "✅"}</div>
            <h3 className="text-xl font-black">
              {player.isImposter ? t("You are the IMPOSTER!", "သင်သည် သူလျှို ဖြစ်သည်!") : t("You are INNOCENT", "သင်သည် အပြစ်ကင်းသူ")}
            </h3>

            {player.isImposter ? (
              <div className="rounded-2xl bg-primary-foreground/20 p-4">
                <p className="mb-1 text-xs font-bold opacity-80">{t("Your hint", "သဲလွန်စ")}</p>
                <p className="text-lg font-black">{hint}</p>
                <p className="text-base font-bold opacity-90">{hintMm}</p>
              </div>
            ) : (
              <div className="rounded-2xl bg-primary-foreground/20 p-4">
                <p className="mb-1 text-xs font-bold opacity-80">{t("Your word", "သင့်စကားလုံး")}</p>
                <p className="text-2xl font-black">{word.en}</p>
                <p className="text-lg font-bold opacity-90">{word.mm}</p>
              </div>
            )}

            <p className="mt-2 text-xs font-semibold opacity-70">
              {t("Remember and pass the device!", "မှတ်ထားပြီး ဖုန်းပေးလိုက်ပါ!")}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Next button only after viewing */}
      {revealed && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleNext}
          className="mt-6 flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 font-extrabold text-accent-foreground shadow-yellow active:translate-y-[2px] active:shadow-none"
        >
          {playerIndex + 1 < totalPlayers ? (
            <>
              {t("Next Player", "နောက်ကစားသူ")} <ArrowRight className="h-5 w-5" />
            </>
          ) : (
            <>
              {t("Start Discussion!", "ဆွေးနွေးမှု စတင်!")} <MessageCircle className="h-5 w-5" />
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
}

// --- Discussion Phase ---
function DiscussionPhase({ onStartVoting, t }: { onStartVoting: () => void; t: (en: string, mm: string) => string }) {
  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center pt-12">
      <div className="mb-4 text-6xl">💬</div>
      <h2 className="mb-2 text-2xl text-primary-foreground  font-black">{t("Discussion Time!", "ဆွေးနွေးချိန်!")}</h2>
      <p className="mb-2 text-center text-muted-foreground font-semibold max-w-xs">
        {t(
          "Each player describes the word without saying it directly. The imposter must bluff!",
          "ကစားသူတိုင်း စကားလုံးကို တိုက်ရိုက်မပြောဘဲ ဖော်ပြပါ။ သူလျှိုက ချော့မော့ပြောရမည်!"
        )}
      </p>
      <div className="my-6 rounded-2xl bg-game-yellow-light p-4 text-center">
        <p className="text-sm font-bold">💡 {t("Tip: Ask questions to find the imposter!", "အကြံပေးချက်: သူလျှိုကို ရှာဖို့ မေးခွန်းများမေးပါ!")}</p>
      </div>
      <button
        onClick={onStartVoting}
        className="flex items-center gap-2 rounded-2xl bg-game-red px-8 py-4 font-extrabold text-primary-foreground shadow-red active:translate-y-[2px] active:shadow-none"
      >
        <Vote className="h-5 w-5" />
        {t("Start Voting!", "မဲပေးစ!")}
      </button>
    </motion.div>
  );
}

// --- Voting Phase ---
function VotingPhase({
  players, votes, onVote, onFinish, t,
}: {
  players: { id: number; name: string }[];
  votes: Record<number, number>;
  onVote: (voterId: number, targetId: number) => void;
  onFinish: () => void;
  t: (en: string, mm: string) => string;
}) {
  const [currentVoter, setCurrentVoter] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const voter = players[currentVoter];
  const allVoted = currentVoter >= players.length;

  const confirmVote = () => {
    if (selected === null) return;
    onVote(voter.id, selected);
    setSelected(null);
    setCurrentVoter((v) => v + 1);
  };

  if (allVoted) {
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center pt-12">
        <div className="mb-4 text-5xl">🗳️</div>
        <h2 className="mb-6 text-2xl font-black">{t("All votes in!", "မဲအားလုံး ထည့်ပြီး!")}</h2>
        <button onClick={onFinish} className="rounded-2xl bg-primary px-8 py-4 font-extrabold text-primary-foreground shadow-game active:translate-y-[2px] active:shadow-none">
          <Trophy className="mr-2 inline h-5 w-5" />
          {t("See Results!", "ရလဒ်ကြည့်!")}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="pt-4">
      <h2 className="mb-1 text-xl font-black">{voter.name}</h2>
      <p className="mb-4 text-sm text-primary-foreground font-semibold">{t("Who is the imposter?", "ဘယ်သူက သူလျှို?")}</p>

      <div className="mb-4 space-y-2">
        {players
          .filter((p) => p.id !== voter.id)
          .map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`w-full rounded-2xl px-4 py-3 text-left font-bold transition-all ${
                selected === p.id
                  ? "bg-game-red text-primary-foreground shadow-red"
                  : "bg-card shadow-card-game"
              }`}
            >
              {p.name}
            </button>
          ))}
      </div>

      <button
        onClick={confirmVote}
        disabled={selected === null}
        className="w-full rounded-2xl bg-primary py-4 font-extrabold text-primary-foreground shadow-game disabled:opacity-40 active:translate-y-[2px] active:shadow-none"
      >
        {t("Confirm Vote", "မဲအတည်ပြု")}
      </button>
    </motion.div>
  );
}

// --- Result Phase ---
function ResultPhase({
  session, onPlayAgain, onHome, t,
}: {
  session: NonNullable<ReturnType<typeof useGameSession>["session"]>;
  onPlayAgain: () => void;
  onHome: () => void;
  t: (en: string, mm: string) => string;
}) {
  // Count votes
  const voteCounts: Record<number, number> = {};
  Object.values(session.votes).forEach((targetId) => {
    voteCounts[targetId] = (voteCounts[targetId] || 0) + 1;
  });

  const maxVotes = Math.max(...Object.values(voteCounts), 0);
  const mostVoted = Object.entries(voteCounts)
    .filter(([, count]) => count === maxVotes)
    .map(([id]) => Number(id));

  const imposters = session.players.filter((p) => p.isImposter);
  const imposterCaught = imposters.some((imp) => mostVoted.includes(imp.id));

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center pt-8">
      <div className="mb-4 text-6xl">{imposterCaught ? "🎉" : "😈"}</div>
      <h2 className="mb-2 text-2xl text-primary-foreground font-black">
        {imposterCaught
          ? t("Imposter Caught!", "သူလျှို အဖမ်းခံရ!")
          : t("Imposter Wins!", "သူလျှို အနိုင်ရ!")}
      </h2>

      <div className="mb-4 w-full max-w-xs rounded-2xl bg-card p-4 shadow-card-game">
        <p className="mb-2 text-center text-sm font-bold text-muted-foreground">{t("The word was", "စကားလုံးက")}</p>
        <p className="text-center text-2xl font-black text-primary">{session.word.en}</p>
        <p className="text-center text-lg font-bold text-muted-foreground">{session.word.mm}</p>
      </div>

      <div className="mb-4 w-full max-w-xs">
        <p className="mb-2 text-center text-sm font-bold text-muted-foreground">{t("Imposters", "သူလျှိုများ")}</p>
        {imposters.map((imp) => (
          <div key={imp.id} className="mb-1 rounded-xl bg-game-red-light px-4 py-2 text-center font-bold">
            🕵️ {imp.name}
          </div>
        ))}
      </div>

      <div className="mb-6 w-full max-w-xs">
        <p className="mb-2 text-center text-sm font-bold text-muted-foreground">{t("Votes", "မဲများ")}</p>
        {session.players.map((p) => (
          <div key={p.id} className="mb-1 flex items-center justify-between rounded-xl bg-card px-4 py-2 shadow-card-game">
            <span className="font-bold">{p.name}</span>
            <span className="rounded-lg bg-muted px-2 py-0.5 text-sm font-bold">
              {voteCounts[p.id] || 0} {t("votes", "မဲ")}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onPlayAgain} className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-extrabold text-primary-foreground shadow-game active:translate-y-[2px] active:shadow-none">
          <RotateCcw className="h-4 w-4" />
          {t("Play Again", "ထပ်ကစား")}
        </button>
        <button onClick={onHome} className="flex items-center gap-2 rounded-2xl bg-muted px-6 py-3 font-extrabold active:translate-y-[2px]">
          <Home className="h-4 w-4" />
          {t("Home", "ပင်မ")}
        </button>
      </div>
    </motion.div>
  );
}
