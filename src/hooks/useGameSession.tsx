import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { GameSession, createGameSession } from "@/lib/gameLogic";

interface GameSessionContextType {
  session: GameSession | null;
  startGame: (playerNames: string[], imposterCount: number, categoryIds: string[]) => GameSession;
  markViewed: (playerIndex: number) => void;
  nextPlayer: () => void;
  setPhase: (phase: GameSession["phase"]) => void;
  castVote: (voterId: number, targetId: number) => void;
  resetGame: () => void;
}

const GameSessionContext = createContext<GameSessionContextType | null>(null);

export function GameSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<GameSession | null>(null);

  const startGame = useCallback(
    (playerNames: string[], imposterCount: number, categoryIds: string[]) => {
      const newSession = createGameSession(playerNames, imposterCount, categoryIds);
      setSession(newSession);
      return newSession;
    },
    []
  );

  const markViewed = useCallback((playerIndex: number) => {
    setSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        players: prev.players.map((p, i) =>
          i === playerIndex ? { ...p, hasViewed: true } : p
        ),
      };
    });
  }, []);

  const nextPlayer = useCallback(() => {
    setSession((prev) => {
      if (!prev) return prev;
      const next = prev.currentPlayerIndex + 1;
      if (next >= prev.players.length) {
        return { ...prev, phase: "discussion" as const };
      }
      return { ...prev, currentPlayerIndex: next };
    });
  }, []);

  const setPhase = useCallback((phase: GameSession["phase"]) => {
    setSession((prev) => (prev ? { ...prev, phase } : prev));
  }, []);

  const castVote = useCallback((voterId: number, targetId: number) => {
    setSession((prev) => {
      if (!prev) return prev;
      return { ...prev, votes: { ...prev.votes, [voterId]: targetId } };
    });
  }, []);

  const resetGame = useCallback(() => setSession(null), []);

  return (
    <GameSessionContext.Provider value={{ session, startGame, markViewed, nextPlayer, setPhase, castVote, resetGame }}>
      {children}
    </GameSessionContext.Provider>
  );
}

export function useGameSession() {
  const ctx = useContext(GameSessionContext);
  if (!ctx) throw new Error("useGameSession must be used within GameSessionProvider");
  return ctx;
}
