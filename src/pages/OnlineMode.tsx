import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Copy, Crown, Play, Users, Vote, Wifi } from "lucide-react";
import { LanguageToggle } from "@/components/game/LanguageToggle";
import { useLang } from "@/hooks/useLang";
import { categories } from "@/data/words";
import { getMaxImposters } from "@/lib/gameLogic";
import {
  createRoom,
  getClientId,
  joinRoom,
  leaveRoom,
  OnlineRoom,
  readRoom,
  resetRoomToLobby,
  startRoomGame,
  subscribeToRoom,
  updateRoom,
} from "@/lib/onlineRoom";

type Tab = "join" | "create";

function getWinningPlayerIds(room: OnlineRoom) {
  const counts: Record<string, number> = {};
  Object.values(room.votes).forEach((targetId) => {
    counts[targetId] = (counts[targetId] || 0) + 1;
  });

  const maxVotes = Math.max(0, ...Object.values(counts));
  return Object.entries(counts)
    .filter(([, count]) => count === maxVotes)
    .map(([playerId]) => playerId);
}

export default function OnlineMode() {
  const navigate = useNavigate();
  const { t } = useLang();

  const [tab, setTab] = useState<Tab>("join");
  const [playerName, setPlayerName] = useState("");
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [currentCode, setCurrentCode] = useState<string | null>(null);
  const [room, setRoom] = useState<OnlineRoom | null>(null);
  const [error, setError] = useState("");

  const clientId = useMemo(() => getClientId(), []);
  const me = room?.players.find((player) => player.id === clientId) ?? null;
  const isHost = room?.hostId === clientId;

  useEffect(() => {
    if (!currentCode) return;

    setRoom(readRoom(currentCode));
    return subscribeToRoom(currentCode, () => {
      setRoom(readRoom(currentCode));
    });
  }, [currentCode]);

  useEffect(() => {
    if (room === null && currentCode) {
      setCurrentCode(null);
    }
  }, [room, currentCode]);

  const createOnlineRoom = () => {
    if (!playerName.trim()) {
      setError(t("Enter your name first.", "အရင်ဆုံး သင့်နာမည်ထည့်ပါ။"));
      return;
    }

    const newRoom = createRoom(playerName, clientId);
    setError("");
    setCurrentCode(newRoom.code);
    setRoom(newRoom);
    setRoomCodeInput(newRoom.code);
  };

  const joinOnlineRoom = () => {
    if (!playerName.trim()) {
      setError(t("Enter your name first.", "အရင်ဆုံး သင့်နာမည်ထည့်ပါ။"));
      return;
    }

    const result = joinRoom(roomCodeInput, playerName, clientId);
    if ("error" in result) {
      setError(
        result.error === "missing"
          ? t("Room not found.", "အခန်းမတွေ့ပါ။")
          : t("Invalid name.", "နာမည် မမှန်ပါ။")
      );
      return;
    }

    setError("");
    setCurrentCode(result.room.code);
    setRoom(result.room);
  };

  const copyCode = async () => {
    if (!room) return;
    await navigator.clipboard.writeText(room.code);
  };

  const handleLeaveRoom = () => {
    if (!room) return;
    leaveRoom(room.code, clientId);
    setRoom(null);
    setCurrentCode(null);
  };

  const toggleCategory = (categoryId: string) => {
    if (!room || !isHost || room.phase !== "lobby") return;

    updateRoom(room.code, (currentRoom) => {
      const selected = currentRoom.selectedCategories.includes(categoryId);
      const selectedCategories = selected
        ? currentRoom.selectedCategories.filter((id) => id !== categoryId)
        : [...currentRoom.selectedCategories, categoryId];

      if (selectedCategories.length === 0) return currentRoom;

      return {
        ...currentRoom,
        selectedCategories,
      };
    });
  };

  const voteForPlayer = (targetId: string) => {
    if (!room || !me || room.phase !== "voting") return;

    updateRoom(room.code, (currentRoom) => {
      const votes = {
        ...currentRoom.votes,
        [clientId]: targetId,
      };
      const allVotesSubmitted = currentRoom.players.every((player) => votes[player.id]);

      return {
        ...currentRoom,
        votes,
        phase: allVotesSubmitted ? "result" : currentRoom.phase,
      };
    });
  };

  const markRoleViewed = () => {
    if (!room || !me || room.phase !== "roles") return;

    updateRoom(room.code, (currentRoom) => ({
      ...currentRoom,
      players: currentRoom.players.map((player) =>
        player.id === clientId ? { ...player, hasViewed: true } : player
      ),
    }));
  };

  const allViewed = room?.players.every((player) => player.hasViewed) ?? false;
  const maxImposters = room ? getMaxImposters(room.players.length) : 1;
  const minimumPlayersReady = (room?.players.length ?? 0) >= 3;

  return (
    <div className="min-h-screen bg-background px-4 pb-8">
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => (room ? handleLeaveRoom() : navigate("/"))}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-card-game"
        >
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

          {!room ? (
            <>
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

              <div className="space-y-4 rounded-3xl bg-card p-5 shadow-card-game">
                <div>
                  <label className="mb-2 block text-sm font-bold text-muted-foreground">
                    {t("Your Name", "သင့်နာမည်")}
                  </label>
                  <input
                    value={playerName}
                    onChange={(event) => setPlayerName(event.target.value)}
                    maxLength={20}
                    className="w-full rounded-xl bg-muted px-4 py-3 font-bold outline-none"
                    placeholder={t("Enter your name", "သင့်နာမည်ထည့်ပါ")}
                  />
                </div>

                {tab === "join" && (
                  <div>
                    <label className="mb-2 block text-sm font-bold text-muted-foreground">
                      {t("Room Code", "အခန်းကုဒ်")}
                    </label>
                    <input
                      value={roomCodeInput}
                      onChange={(event) => setRoomCodeInput(event.target.value.toUpperCase())}
                      maxLength={6}
                      className="w-full rounded-xl bg-muted px-4 py-3 text-center text-2xl font-black tracking-widest outline-none"
                      placeholder="ABC123"
                    />
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl bg-game-red-light px-4 py-3 text-sm font-bold text-game-red">
                    {error}
                  </div>
                )}

                <button
                  onClick={tab === "create" ? createOnlineRoom : joinOnlineRoom}
                  disabled={tab === "join" && roomCodeInput.length !== 6}
                  className="w-full rounded-2xl bg-secondary py-4 font-extrabold text-secondary-foreground shadow-blue disabled:opacity-40 active:translate-y-[2px] active:shadow-none"
                >
                  {tab === "create"
                    ? t("Create and Host", "ဖန်တီးပြီး စတင်ပါ")
                    : t("Join Game", "ကစားပွဲ ဝင်ပါ")}
                </button>
              </div>

              <div className="mt-4 rounded-2xl bg-game-yellow-light p-4 text-sm font-bold">
                {t(
                  "This online mode works through browser room sync. Best for testing in multiple tabs or the same browser profile.",
                  "ဒီ online mode က browser room sync နဲ့ အလုပ်လုပ်ပါတယ်။ Tab များစွာ သို့မဟုတ် browser profile တစ်ခုတည်းနဲ့ စမ်းသပ်ရန် အကောင်းဆုံးပါ။"
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="rounded-3xl bg-card p-5 shadow-card-game">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-muted-foreground">
                      {t("Room Code", "အခန်းကုဒ်")}
                    </p>
                    <p className="text-3xl font-black tracking-widest text-primary">{room.code}</p>
                  </div>
                  <button
                    onClick={copyCode}
                    className="rounded-xl bg-muted px-4 py-2 text-sm font-bold active:translate-y-[2px]"
                  >
                    <Copy className="mr-2 inline h-4 w-4" />
                    {t("Copy", "ကူးပါ")}
                  </button>
                </div>

                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {room.players.length} {t("players in room", "အခန်းထဲ ကစားသူ")}
                </div>

                <div className="space-y-2">
                  {room.players.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3"
                    >
                      <span className="font-bold">
                        {player.name} {player.id === clientId ? `(${t("You", "သင်")})` : ""}
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {player.isHost ? (
                          <>
                            <Crown className="mr-1 inline h-4 w-4" />
                            {t("Host", "Host")}
                          </>
                        ) : player.hasViewed ? (
                          <>
                            <Check className="mr-1 inline h-4 w-4" />
                            {t("Ready", "အဆင်သင့်")}
                          </>
                        ) : (
                          t("Waiting", "စောင့်နေ")
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {room.phase === "lobby" && (
                <div className="space-y-4 rounded-3xl bg-card p-5 shadow-card-game">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{t("Imposters", "သူလျှိုများ")}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          isHost &&
                          updateRoom(room.code, (currentRoom) => ({
                            ...currentRoom,
                            imposterCount: Math.max(1, currentRoom.imposterCount - 1),
                          }))
                        }
                        disabled={!isHost || room.imposterCount <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-lg font-black disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xl font-black">{room.imposterCount}</span>
                      <button
                        onClick={() =>
                          isHost &&
                          updateRoom(room.code, (currentRoom) => ({
                            ...currentRoom,
                            imposterCount: Math.min(maxImposters, currentRoom.imposterCount + 1),
                          }))
                        }
                        disabled={!isHost || room.imposterCount >= maxImposters}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-black text-primary-foreground disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-bold text-muted-foreground">
                      {t("Categories", "အမျိုးအစားများ")}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => {
                        const selected = room.selectedCategories.includes(category.id);
                        return (
                          <button
                            key={category.id}
                            onClick={() => toggleCategory(category.id)}
                            disabled={!isHost}
                            className={`rounded-2xl px-3 py-3 text-sm font-bold transition-all ${
                              selected ? "bg-primary text-primary-foreground" : "bg-muted"
                            } ${!isHost ? "opacity-90" : ""}`}
                          >
                            {category.icon} {t(category.name, category.nameMm)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isHost ? (
                    <button
                      onClick={() => startRoomGame(room.code)}
                      disabled={!minimumPlayersReady || room.selectedCategories.length === 0}
                      className="w-full rounded-2xl bg-primary py-4 font-extrabold text-primary-foreground shadow-game disabled:opacity-40 active:translate-y-[2px] active:shadow-none"
                    >
                      <Play className="mr-2 inline h-5 w-5" />
                      {minimumPlayersReady
                        ? t("Start Online Game", "Online ကစားပွဲ စတင်ပါ")
                        : t("Need at least 3 players", "အနည်းဆုံး ၃ ယောက် လိုသည်")}
                    </button>
                  ) : (
                    <div className="rounded-2xl bg-muted px-4 py-4 text-center text-sm font-bold text-muted-foreground">
                      {t("Waiting for the host to start the game.", "Host က စတင်မည့်အထိ စောင့်ပါ။")}
                    </div>
                  )}
                </div>
              )}

              {room.phase === "roles" && me && room.word && (
                <div className="space-y-4 rounded-3xl bg-card p-5 text-center shadow-card-game">
                  <p className="text-sm font-bold text-muted-foreground">
                    {t("Your secret role", "သင့်လျှို့ဝှက်အခန်းကဏ္ဍ")}
                  </p>

                  {me.isImposter ? (
                    <>
                      <div className="text-5xl">🕵️</div>
                      <h2 className="text-2xl font-black text-game-red">
                        {t("You are the IMPOSTER", "သင်က သူလျှို")}
                      </h2>
                      <div className="rounded-2xl bg-game-red-light p-4">
                        <p className="text-xs font-bold text-muted-foreground">
                          {t("Hint", "သဲလွန်စ")}
                        </p>
                        <p className="text-xl font-black">{room.imposterHint}</p>
                        <p className="font-bold">{room.imposterHintMm}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-5xl">✅</div>
                      <h2 className="text-2xl font-black text-game-green">
                        {t("You are INNOCENT", "သင်က အပြစ်ကင်းသူ")}
                      </h2>
                      <div className="rounded-2xl bg-game-green-light p-4">
                        <p className="text-xs font-bold text-muted-foreground">
                          {t("Word", "စကားလုံး")}
                        </p>
                        <p className="text-2xl font-black">{room.word.en}</p>
                        <p className="font-bold">{room.word.mm}</p>
                      </div>
                    </>
                  )}

                  <button
                    onClick={markRoleViewed}
                    disabled={me.hasViewed}
                    className="w-full rounded-2xl bg-accent py-4 font-extrabold text-accent-foreground shadow-yellow disabled:opacity-40 active:translate-y-[2px] active:shadow-none"
                  >
                    {me.hasViewed
                      ? t("Marked as ready", "အသင့်ဖြစ်ပြီ")
                      : t("I saw my role", "ကျွန်တော်/ကျွန်မ ကြည့်ပြီးပါပြီ")}
                  </button>

                  {isHost && allViewed ? (
                    <button
                      onClick={() =>
                        updateRoom(room.code, (currentRoom) => ({
                          ...currentRoom,
                          phase: "discussion",
                        }))
                      }
                      className="w-full rounded-2xl bg-primary py-4 font-extrabold text-primary-foreground shadow-game active:translate-y-[2px] active:shadow-none"
                    >
                      {t("Start Discussion", "ဆွေးနွေးမှု စတင်")}
                    </button>
                  ) : (
                    <div className="rounded-2xl bg-muted px-4 py-3 text-sm font-bold text-muted-foreground">
                      {allViewed
                        ? t("Waiting for host to continue.", "Host ဆက်လုပ်မည့်အထိ စောင့်ပါ။")
                        : t("Waiting for all players to view their roles.", "ကစားသူအားလုံး မိမိ role ကြည့်ပြီးရန် စောင့်ပါ။")}
                    </div>
                  )}
                </div>
              )}

              {room.phase === "discussion" && (
                <div className="space-y-4 rounded-3xl bg-card p-5 text-center shadow-card-game">
                  <div className="text-5xl">💬</div>
                  <h2 className="text-2xl font-black">{t("Discussion Time", "ဆွေးနွေးချိန်")}</h2>
                  <p className="font-semibold text-muted-foreground">
                    {t(
                      "Describe the word without saying it directly. The imposter must bluff.",
                      "စကားလုံးကို တိုက်ရိုက်မပြောဘဲ ဖော်ပြပါ။ သူလျှိုက ချော့မော့ပြောရမည်။"
                    )}
                  </p>
                  {isHost ? (
                    <button
                      onClick={() =>
                        updateRoom(room.code, (currentRoom) => ({
                          ...currentRoom,
                          phase: "voting",
                          votes: {},
                        }))
                      }
                      className="w-full rounded-2xl bg-game-red py-4 font-extrabold text-primary-foreground shadow-red active:translate-y-[2px] active:shadow-none"
                    >
                      <Vote className="mr-2 inline h-5 w-5" />
                      {t("Start Voting", "မဲပေးစ")}
                    </button>
                  ) : (
                    <div className="rounded-2xl bg-muted px-4 py-4 text-sm font-bold text-muted-foreground">
                      {t("Waiting for host to open voting.", "Host က မဲပေးစနစ်ဖွင့်မည့်အထိ စောင့်ပါ။")}
                    </div>
                  )}
                </div>
              )}

              {room.phase === "voting" && me && (
                <div className="space-y-4 rounded-3xl bg-card p-5 shadow-card-game">
                  <h2 className="text-center text-2xl font-black">{t("Vote", "မဲပေး")}</h2>
                  <p className="text-center text-sm font-bold text-muted-foreground">
                    {room.votes[clientId]
                      ? t("Your vote is locked in.", "သင့်မဲကို အတည်ပြုပြီးပါပြီ။")
                      : t("Pick who you think is the imposter.", "ဘယ်သူက သူလျှိုလဲ ရွေးပါ။")}
                  </p>

                  <div className="space-y-2">
                    {room.players
                      .filter((player) => player.id !== clientId)
                      .map((player) => (
                        <button
                          key={player.id}
                          onClick={() => voteForPlayer(player.id)}
                          disabled={Boolean(room.votes[clientId])}
                          className={`w-full rounded-2xl px-4 py-3 text-left font-bold ${
                            room.votes[clientId] === player.id
                              ? "bg-game-red text-primary-foreground"
                              : "bg-muted"
                          } disabled:opacity-80`}
                        >
                          {player.name}
                        </button>
                      ))}
                  </div>

                  <div className="rounded-2xl bg-muted px-4 py-3 text-sm font-bold text-muted-foreground">
                    {Object.keys(room.votes).length} / {room.players.length} {t("votes submitted", "မဲတင်ပြီး")}
                  </div>
                </div>
              )}

              {room.phase === "result" && room.word && (
                <div className="space-y-4 rounded-3xl bg-card p-5 shadow-card-game">
                  {(() => {
                    const winningPlayerIds = getWinningPlayerIds(room);
                    const imposters = room.players.filter((player) => player.isImposter);
                    const imposterCaught = imposters.some((player) => winningPlayerIds.includes(player.id));

                    return (
                      <>
                        <div className="text-center">
                          <div className="mb-3 text-5xl">{imposterCaught ? "🎉" : "😈"}</div>
                          <h2 className="text-2xl font-black">
                            {imposterCaught
                              ? t("Imposter Caught", "သူလျှို အဖမ်းခံရ")
                              : t("Imposter Wins", "သူလျှို အနိုင်ရ")}
                          </h2>
                        </div>

                        <div className="rounded-2xl bg-muted p-4 text-center">
                          <p className="text-xs font-bold text-muted-foreground">
                            {t("The word was", "စကားလုံးက")}
                          </p>
                          <p className="text-2xl font-black text-primary">{room.word.en}</p>
                          <p className="font-bold">{room.word.mm}</p>
                        </div>

                        <div>
                          <p className="mb-2 text-sm font-bold text-muted-foreground">
                            {t("Imposters", "သူလျှိုများ")}
                          </p>
                          <div className="space-y-2">
                            {imposters.map((player) => (
                              <div key={player.id} className="rounded-2xl bg-game-red-light px-4 py-3 font-bold">
                                🕵️ {player.name}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="mb-2 text-sm font-bold text-muted-foreground">
                            {t("Votes", "မဲများ")}
                          </p>
                          <div className="space-y-2">
                            {room.players.map((player) => {
                              const voteCount = Object.values(room.votes).filter((vote) => vote === player.id).length;
                              return (
                                <div key={player.id} className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
                                  <span className="font-bold">{player.name}</span>
                                  <span className="text-sm font-bold">
                                    {voteCount} {t("votes", "မဲ")}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {isHost ? (
                          <button
                            onClick={() => resetRoomToLobby(room.code)}
                            className="w-full rounded-2xl bg-primary py-4 font-extrabold text-primary-foreground shadow-game active:translate-y-[2px] active:shadow-none"
                          >
                            {t("Back to Lobby", "Lobby သို့ပြန်မည်")}
                          </button>
                        ) : (
                          <div className="rounded-2xl bg-muted px-4 py-4 text-center text-sm font-bold text-muted-foreground">
                            {t("Waiting for host to reset the room.", "Host က အခန်းကို reset လုပ်မည့်အထိ စောင့်ပါ။")}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
